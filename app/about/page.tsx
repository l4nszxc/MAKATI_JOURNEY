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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Section */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl p-10 mb-16 border border-gray-200 dark:border-slate-700">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-8 drop-shadow-lg">
            About My Journey ✨
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-200 text-xl mb-6 leading-relaxed">
              Welcome! This is my personal space where I share my experiences
              living in Makati City, Philippines. From the stunning skyline to
              the vibrant culture, every day brings new adventures.
            </p>
            <p className="text-gray-700 dark:text-gray-200 text-xl mb-6 leading-relaxed">
              Makati is more than just a business hub – it's a city full of
              life, amazing food, friendly people, and countless stories waiting
              to be told.
            </p>
            <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed">
              Through this website, I hope to capture and preserve the memories
              of my time here, sharing the beauty and experiences that make
              this city special. 🇵🇭
            </p>
          </div>
        </div>

        {/* Experiences Timeline */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            My Experiences 📚
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-6">
                  <div className={`text-5xl p-4 bg-gradient-to-br ${exp.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <span className="drop-shadow-lg">{exp.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-semibold text-lg">📅 {exp.date}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:via-gray-900 dark:to-slate-900 rounded-3xl shadow-2xl p-12 mb-16 border border-gray-200 dark:border-slate-700">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">
            My Makati Favorites ❤️
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((fav, index) => (
              <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-white dark:hover:bg-slate-700 transition-all hover:scale-105 border border-gray-300 dark:border-slate-600 shadow-xl hover:shadow-purple-500/30">
                <div className="text-5xl mb-4">{fav.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{fav.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{fav.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Note */}
        <div className="bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>✏️</span> Personalize Your Story
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            This is your space! Edit the content in{' '}
            <code className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded-lg font-mono text-gray-800 dark:text-white font-semibold">app/about/page.tsx</code> to
            add your own experiences, dates, favorite places, and personal
            stories about your time in Makati City.
          </p>
        </div>
      </div>
    </div>
  );
}
