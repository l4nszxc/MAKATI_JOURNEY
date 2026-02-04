export default function About() {
  const experiences = [
    {
      title: 'First Day in Makati',
      date: 'Add your date',
      description: 'Share your first impressions and experiences when you arrived in Makati City.',
      icon: '🌟',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Exploring the CBD',
      date: 'Add your date',
      description: 'Discovering the bustling business district, skyscrapers, and modern architecture.',
      icon: '🏢',
      color: 'from-blue-400 to-purple-500',
    },
    {
      title: 'Filipino Cuisine',
      date: 'Add your date',
      description: 'Trying authentic Filipino dishes and local favorites in restaurants and food markets.',
      icon: '🍜',
      color: 'from-red-400 to-pink-500',
    },
    {
      title: 'Cultural Discoveries',
      date: 'Add your date',
      description: 'Learning about Filipino culture, traditions, and meeting wonderful people.',
      icon: '🎭',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  const favorites = [
    { name: 'Favorite Restaurant', detail: 'Add your favorite spot', icon: '🍴' },
    { name: 'Favorite Place', detail: 'Where you love to spend time', icon: '📍' },
    { name: 'Favorite Activity', detail: 'What you enjoy doing most', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-16 border border-purple-100">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            About My Journey ✨
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-xl mb-6 leading-relaxed">
              Welcome! This is my personal space where I share my experiences
              living in Makati City, Philippines. From the stunning skyline to
              the vibrant culture, every day brings new adventures.
            </p>
            <p className="text-gray-700 text-xl mb-6 leading-relaxed">
              Makati is more than just a business hub – it's a city full of
              life, amazing food, friendly people, and countless stories waiting
              to be told.
            </p>
            <p className="text-gray-700 text-xl leading-relaxed">
              Through this website, I hope to capture and preserve the memories
              of my time here, sharing the beauty and experiences that make
              this city special. 🇵🇭
            </p>
          </div>
        </div>

        {/* Experiences Timeline */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            My Experiences 📚
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className={`text-5xl p-4 bg-gradient-to-br ${exp.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <span className="drop-shadow-lg">{exp.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-purple-600 mb-4 font-semibold text-lg">📅 {exp.date}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-white mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center">
            My Makati Favorites ❤️
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((fav, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all hover:scale-105 border border-white/30 shadow-xl">
                <div className="text-5xl mb-4">{fav.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{fav.name}</h3>
                <p className="text-white/90 text-lg">{fav.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Note */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>✏️</span> Personalize Your Story
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            This is your space! Edit the content in{' '}
            <code className="bg-white px-3 py-1 rounded-lg font-mono text-purple-600 font-semibold">app/about/page.tsx</code> to
            add your own experiences, dates, favorite places, and personal
            stories about your time in Makati City.
          </p>
        </div>
      </div>
    </div>
  );
}
