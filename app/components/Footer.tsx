export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white mt-auto border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <p className="text-2xl font-bold mb-3 text-white">
            🌏 My Makati Journey
          </p>
          <p className="text-gray-300 text-base mb-2">
            Capturing memories and experiences in Makati City, Philippines 🇵🇭
          </p>
          <div className="flex justify-center gap-6 mt-6 mb-4">
            <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a>
            <a href="/gallery" className="text-gray-400 hover:text-purple-400 transition-colors">Gallery</a>
            <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} All rights reserved • Made with ❤️ in Makati
          </p>
        </div>
      </div>
    </footer>
  );
}
