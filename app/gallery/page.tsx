'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { Album, Photo } from '@/types/gallery';

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const albumsSnapshot = await getDocs(query(collection(db, 'albums'), orderBy('createdAt', 'desc')));
      const albumsData = albumsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Album[];
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error loading albums:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAlbumPhotos = async (album: Album) => {
    try {
      console.log('Loading photos for album:', album.name, 'ID:', album.id);
      setIsLoading(true);
      const photosSnapshot = await getDocs(
        query(collection(db, 'photos'), where('albumId', '==', album.id))
      );
      console.log('Found photos:', photosSnapshot.docs.length);
      const photosData = photosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
      })) as Photo[];
      
      // Sort by uploadedAt in JavaScript instead of Firestore
      photosData.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
      
      console.log('Photos data:', photosData);
      setPhotos(photosData);
      setSelectedAlbum(album);
    } catch (error) {
      console.error('Error loading photos:', error);
      alert('Error loading photos: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const backToAlbums = () => {
    setSelectedAlbum(null);
    setPhotos([]);
  };

  console.log('Current selectedPhoto:', selectedPhoto);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4 animate-fade-in-up drop-shadow-lg">
            My Travel Gallery 📸
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            {selectedAlbum ? selectedAlbum.name : 'Moments captured around Makati City'}
          </p>
        </div>

        {/* Back Button (shown when viewing album photos) */}
        {selectedAlbum && (
          <button
            onClick={backToAlbums}
            className="mb-8 px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Albums
          </button>
        )}

        {/* Albums Grid (shown when no album is selected) */}
        {!selectedAlbum && albums.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {albums.map((album) => (
              <div
                key={album.id}
                className="group bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-500 border border-gray-200 dark:border-slate-700"
              >
                {/* Album Cover */}
                <div className="h-64 relative overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500 dark:bg-slate-700">
                  {album.coverPhotoUrl ? (
                    <img 
                      src={album.coverPhotoUrl} 
                      alt={album.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>

                {/* Album Info */}
                <div className="p-6 bg-gray-50 dark:bg-slate-800/50">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {album.name}
                  </h3>
                  {album.description && (
                    <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                      {album.description}
                    </p>
                  )}
                  
                  {/* View Album Button */}
                  <button
                    onClick={() => loadAlbumPhotos(album)}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Album
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photos Grid (shown when album is selected) */}
        {selectedAlbum && photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-500 border border-gray-200 dark:border-slate-700"
              >
                <div className="h-72 relative overflow-hidden bg-gray-200 dark:bg-slate-700 cursor-pointer" onClick={() => {
                  console.log('Photo clicked:', photo);
                  setSelectedPhoto(photo);
                }}>
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300"></div>
                  
                  {/* View Image Button - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-slate-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg shadow-xl font-semibold flex items-center gap-2 transform group-hover:scale-100 scale-90 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Image
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-slate-800/50">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {photo.title}
                  </h3>
                  {photo.location && (
                    <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium flex items-center gap-1">
                      <span>📍</span> {photo.location}
                    </p>
                  )}
                  {photo.description && (
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{photo.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty States */}
        {!selectedAlbum && albums.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Albums Yet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create your first album from the admin panel!
              </p>
            </div>
          </div>
        )}

        {selectedAlbum && photos.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Photos in This Album</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add photos to this album from the admin panel!
              </p>
            </div>
          </div>
        )}

        {/* Instructions (only show when viewing albums) */}
        {!selectedAlbum && (
          <div className="mt-16 bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl p-10 border border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
              <span>ℹ️</span> About This Gallery
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Browse through my travel photo albums! Click "View Album" to see all photos in each collection.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                <strong className="text-blue-600 dark:text-blue-400">💡 Tip:</strong> To add more albums and photos, log in to the admin panel and navigate to Gallery Management.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[10001]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
              {selectedPhoto.location && (
                <p className="text-white/90 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedPhoto.location}
                </p>
              )}
              {selectedPhoto.description && (
                <p className="text-white/80">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
