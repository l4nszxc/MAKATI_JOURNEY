'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Album, Photo } from '@/types/gallery';

export default function GalleryManagementPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Albums state
  const [albums, setAlbums] = useState<Album[]>([]);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ name: '', description: '' });
  
  // Photos state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    location: '',
    file: null as File | null,
  });

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn !== 'true') {
      router.push('/');
    } else {
      setIsAuthenticated(true);
      loadAlbumsAndPhotos();
    }
    setIsLoading(false);
  }, [router]);

  const loadAlbumsAndPhotos = async () => {
    try {
      // Load albums
      const albumsSnapshot = await getDocs(collection(db, 'albums'));
      const albumsData = albumsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Album[];
      setAlbums(albumsData);

      // Load photos
      const photosSnapshot = await getDocs(collection(db, 'photos'));
      const photosData = photosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
      })) as Photo[];
      setPhotos(photosData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading albums and photos. Please check your Firebase configuration.');
    }
  };

  const handleCreateAlbum = async () => {
    if (!newAlbum.name.trim()) {
      alert('Please enter an album name');
      return;
    }

    try {
      const albumData = {
        name: newAlbum.name,
        description: newAlbum.description,
        createdAt: new Date(),
        coverPhotoUrl: '',
      };

      await addDoc(collection(db, 'albums'), albumData);
      setNewAlbum({ name: '', description: '' });
      setShowAlbumModal(false);
      loadAlbumsAndPhotos();
      alert('Album created successfully!');
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Error creating album. Please try again.');
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!confirm('Are you sure you want to delete this album and all its photos?')) {
      return;
    }

    try {
      // Delete all photos in the album
      const albumPhotos = photos.filter(p => p.albumId === albumId);
      for (const photo of albumPhotos) {
        await deletePhoto(photo.id, photo.imageUrl);
      }

      // Delete the album
      await deleteDoc(doc(db, 'albums', albumId));
      loadAlbumsAndPhotos();
      alert('Album deleted successfully!');
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Error deleting album. Please try again.');
    }
  };

  const handleUploadPhoto = async () => {
    if (!newPhoto.file || !selectedAlbumId || !newPhoto.title.trim()) {
      alert('Please fill in all required fields and select a photo');
      return;
    }

    setUploading(true);
    try {
      const album = albums.find(a => a.id === selectedAlbumId);
      
      // Upload file to local public folder via API
      const formData = new FormData();
      formData.append('file', newPhoto.file);
      formData.append('albumName', album?.name || 'default');

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const { imageUrl } = await uploadResponse.json();

      // Save photo metadata to Firestore
      const photoData = {
        albumId: selectedAlbumId,
        title: newPhoto.title,
        description: newPhoto.description,
        location: newPhoto.location,
        imageUrl,
        uploadedAt: new Date(),
      };

      await addDoc(collection(db, 'photos'), photoData);

      // Update album cover if it doesn't have one
      if (album && !album.coverPhotoUrl) {
        await updateDoc(doc(db, 'albums', selectedAlbumId), {
          coverPhotoUrl: imageUrl,
        });
      }

      setNewPhoto({ title: '', description: '', location: '', file: null });
      setShowPhotoModal(false);
      loadAlbumsAndPhotos();
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photoId: string, imageUrl: string) => {
    try {
      // Delete local file via API
      await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      // Delete from Firestore
      await deleteDoc(doc(db, 'photos', photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleDeletePhoto = async (photoId: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      await deletePhoto(photoId, imageUrl);
      loadAlbumsAndPhotos();
      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error deleting photo. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-white">Gallery Management</h1>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Albums Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Albums ({albums.length})
            </h2>
            <button
              onClick={() => setShowAlbumModal(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Album
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => {
              const albumPhotos = photos.filter(p => p.albumId === album.id);
              return (
                <div key={album.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-purple-500/50 transition-colors">
                  <div className="aspect-video bg-slate-700 relative">
                    {album.coverPhotoUrl ? (
                      <img src={album.coverPhotoUrl} alt={album.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{album.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{album.description}</p>
                    <p className="text-gray-500 text-xs mb-4">{albumPhotos.length} photos</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAlbumId(album.id);
                          setShowPhotoModal(true);
                        }}
                        className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                      >
                        Add Photo
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photos Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              All Photos ({photos.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {photos.map((photo) => {
              const album = albums.find(a => a.id === photo.albumId);
              return (
                <div key={photo.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="aspect-square bg-slate-700 relative">
                    <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeletePhoto(photo.id, photo.imageUrl)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">{photo.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{album?.name}</p>
                    {photo.location && (
                      <p className="text-gray-500 text-xs truncate mt-1">📍 {photo.location}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Create Album Modal */}
      {showAlbumModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]" 
            onClick={() => setShowAlbumModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-md px-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 border-2 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Create New Album</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Album Name *</label>
                  <input
                    type="text"
                    value={newAlbum.name}
                    onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Makati Adventures"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Description</label>
                  <textarea
                    value={newAlbum.description}
                    onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    rows={3}
                    placeholder="Describe your album..."
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAlbumModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAlbum}
                    className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Create Album
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Upload Photo Modal */}
      {showPhotoModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]" 
            onClick={() => setShowPhotoModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-md px-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 border-2 border-slate-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-4">Upload Photo</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Select Album *</label>
                  <select
                    value={selectedAlbumId}
                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Choose an album...</option>
                    {albums.map(album => (
                      <option key={album.id} value={album.id}>{album.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Photo Title *</label>
                  <input
                    type="text"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Sunset at Ayala"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Description</label>
                  <textarea
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="Describe the photo..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Ayala Triangle, Makati"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Photo File *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto({ ...newPhoto, file: e.target.files?.[0] || null })}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowPhotoModal(false)}
                    disabled={uploading}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadPhoto}
                    disabled={uploading}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Uploading...
                      </>
                    ) : (
                      'Upload Photo'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
