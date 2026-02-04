export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up text-white drop-shadow-2xl">
                Welcome to My Makati Journey
              </h1>
              <p className="text-xl md:text-2xl mb-10 font-light animate-fade-in-up text-white dark:text-gray-200" style={{animationDelay: '0.2s'}}>
                Exploring the vibrant life and culture of Makati City, Philippines 🇵🇭
              </p>
              <a
                href="/gallery"
                className="inline-block bg-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-purple-600 dark:text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:from-blue-600 dark:hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-2xl animate-fade-in-up"
                style={{animationDelay: '0.4s'}}
              >
                View My Gallery ✨
              </a>
            </div>

            {/* Group Photo */}
            <div className="flex justify-center md:justify-end animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
                
                {/* Image container */}
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-2 shadow-2xl">
                  <img 
                    src="/group-photo.jpg" 
                    alt="Our Group in Makati" 
                    className="relative rounded-2xl w-full max-w-2xl h-auto object-cover shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Discover My Journey
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group text-center p-8 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 dark:hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 border border-blue-200 dark:border-slate-700">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📸</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Travel Photos</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Capturing beautiful moments and scenic views around Makati's stunning landscapes
            </p>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 border border-purple-200 dark:border-slate-700">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏙️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">City Life</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experiencing the urban culture, food scenes, and dynamic lifestyle of Makati City
            </p>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-white to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/40 dark:hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-2 border border-pink-200 dark:border-slate-700">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">✨</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">My Story</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Sharing personal experiences, adventures, and unforgettable memories in the Philippines
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-gray-100 to-blue-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-16 border-t border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Join Me on This Adventure! 🌏
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Follow my journey through the streets, food, and culture of Makati City
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/gallery"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Browse Gallery
            </a>
            <a
              href="/about"
              className="bg-white dark:bg-slate-700 text-gray-800 dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-lg border border-gray-300 dark:border-slate-600"
            >
              Read My Story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
