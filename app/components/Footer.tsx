export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <p className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌏 My Makati Journey
          </p>
          <p className="text-gray-300 text-base mb-2">
            Capturing memories and experiences in Makati City, Philippines 🇵🇭
          </p>
          <div className="flex justify-center gap-6 mt-6 mb-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a>
            <a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} All rights reserved • Made with ❤️ in Makati
          </p>
        </div>
      </div>
    </footer>
  );
}
