export default function Gallery() {
  // Placeholder images - replace with your actual travel photos
  const photos = [
    {
      id: 1,
      title: 'Makati Skyline',
      location: 'Makati CBD',
      description: 'Beautiful view of the city skyline',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 2,
      title: 'Ayala Triangle',
      location: 'Ayala Avenue',
      description: 'Peaceful green space in the heart of the city',
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 3,
      title: 'Greenbelt Park',
      location: 'Greenbelt Mall',
      description: 'Urban oasis with lush greenery',
      color: 'from-teal-400 to-green-500',
    },
    {
      id: 4,
      title: 'Bonifacio Global City',
      location: 'BGC',
      description: 'Modern architecture and urban design',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 5,
      title: 'Poblacion Nightlife',
      location: 'Poblacion',
      description: 'Vibrant street art and culture',
      color: 'from-orange-400 to-red-500',
    },
    {
      id: 6,
      title: 'Salcedo Market',
      location: 'Salcedo Village',
      description: 'Weekend food market experience',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in-up">
            My Travel Gallery 📸
          </h1>
          <p className="text-2xl text-gray-600">
            Moments captured around Makati City
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Placeholder for image - replace with actual images */}
              <div className={`bg-gradient-to-br ${photo.color} h-72 flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white text-7xl group-hover:scale-125 transition-transform duration-500">📷</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-blue-600 mb-3 font-medium flex items-center gap-1">
                  <span>📍</span> {photo.location}
                </p>
                <p className="text-gray-600 leading-relaxed">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Instructions */}
        <div className="mt-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span>📝</span> Add Your Photos
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            To add your actual travel photos:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-white/90 text-lg">
            <li className="pl-2">Create a <code className="bg-white/20 px-3 py-1 rounded-lg font-mono">public/images</code> folder in your project</li>
            <li className="pl-2">Add your photos to this folder</li>
            <li className="pl-2">Update the gallery data with image paths like <code className="bg-white/20 px-3 py-1 rounded-lg font-mono">/images/photo1.jpg</code></li>
            <li className="pl-2">Replace the placeholder divs with Next.js Image components</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
