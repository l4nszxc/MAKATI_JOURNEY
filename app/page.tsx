export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
            Welcome to My Makati Journey
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Exploring the vibrant life and culture of Makati City, Philippines 🇵🇭
          </p>
          <a
            href="/gallery"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/50 animate-fade-in-up"
            style={{animationDelay: '0.4s'}}
          >
            View My Gallery ✨
          </a>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Discover My Journey
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📸</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Travel Photos</h3>
            <p className="text-gray-600 leading-relaxed">
              Capturing beautiful moments and scenic views around Makati's stunning landscapes
            </p>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-200">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏙️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">City Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Experiencing the urban culture, food scenes, and dynamic lifestyle of Makati City
            </p>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-200">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">✨</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">My Story</h3>
            <p className="text-gray-600 leading-relaxed">
              Sharing personal experiences, adventures, and unforgettable memories in the Philippines
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Me on This Adventure! 🌏
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Follow my journey through the streets, food, and culture of Makati City
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/gallery"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Gallery
            </a>
            <a
              href="/about"
              className="bg-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-900 transition-colors shadow-lg"
            >
              Read My Story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
