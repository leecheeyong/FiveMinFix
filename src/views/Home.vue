<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50"
  >
    <nav
      class="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div
        class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center"
          >
            <img src="/logo-black.png" alt="FiveMinFix Logo" class="w-8 h-8" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900">FiveMinFix</h1>
        </div>

        <div class="flex items-center gap-4">
          <router-link to="/login" class="btn-primary">Get Started</router-link>
        </div>
      </div>
    </nav>

    <section
      class="max-w-6xl mx-auto px-4 py-24 text-center relative overflow-hidden"
    >
      <div class="absolute inset-0 pointer-events-none z-0">
        <div
          class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary-200 to-accent-100 rounded-full opacity-30 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-accent-200 to-primary-100 rounded-full opacity-30 blur-3xl"
        ></div>
      </div>
      <div class="max-w-4xl mx-auto relative z-10">
        <div class="animate-slide-up">
          <h1
            class="text-4xl md:text-6xl font-semibold mb-4 leading-tight tracking-tight text-gray-900"
          >
            Beat Procrastination
          </h1>
          <h2
            class="text-lg md:text-2xl font-medium mb-8 tracking-wider text-accent-600 uppercase"
          >
            One Fix at a Time
          </h2>
          <p
            class="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Turn overwhelming tasks into manageable 5-minute fixes. Build
            momentum, maintain streaks, and level up your productivity with
            gamified micro-tasks.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <router-link
              to="/login"
              class="btn-primary text-xl px-10 py-5 glow-effect shadow-lg"
            >
              🚀 Start Your First Fix
            </router-link>
          </div>
          <div
            class="flex flex-wrap items-center justify-center gap-8 text-base text-gray-500 font-semibold"
          >
            <div class="flex items-center gap-2">
              <span class="text-3xl">⚡</span>
              <span>5-minute tasks</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-3xl">🔥</span>
              <span>Daily streaks</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-3xl">🎯</span>
              <span>Instant momentum</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="how-it-works"
      class="bg-gradient-to-br from-gray-50 to-white py-24"
    >
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
            How It Works
          </h2>
          <p class="text-2xl text-gray-700">
            Simple steps to transform your productivity
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div
            class="flex flex-col items-center bg-white/90 rounded-3xl shadow-lg p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                style="fill: white"
              >
                <path
                  d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"
                ></path>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
              </svg>
            </div>
            <div
              class="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mb-2"
            >
              1
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Add Your Tasks</h3>
            <p class="text-gray-600 text-center text-base">
              Create a list of 5-minute tasks you've been putting off
            </p>
          </div>
          <div
            class="flex flex-col items-center bg-white/90 rounded-3xl shadow-lg p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                style="fill: white"
              >
                <path
                  d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769zm-8.674.31a1 1 0 0 0-.578.347l-3.008 3.677L7.257 5.127l10.283 7.345-5.236 1.048z"
                ></path>
              </svg>
            </div>
            <div
              class="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full font-bold mb-2"
            >
              2
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Hit Start Fix</h3>
            <p class="text-gray-600 text-center text-base">
              Let the app randomly select your next micro-task
            </p>
          </div>
          <div
            class="flex flex-col items-center bg-white/90 rounded-3xl shadow-lg p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 12l2 2 4-4"
                />
              </svg>
            </div>
            <div
              class="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-700 rounded-full font-bold mb-2"
            >
              3
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              Complete & Earn
            </h3>
            <p class="text-gray-600 text-center text-base">
              Finish the task in 5 minutes and earn XP points
            </p>
          </div>
          <div
            class="flex flex-col items-center bg-white/90 rounded-3xl shadow-lg p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3"
                />
              </svg>
            </div>
            <div
              class="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full font-bold mb-2"
            >
              4
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Build Streaks</h3>
            <p class="text-gray-600 text-center text-base">
              Maintain daily momentum and level up your productivity
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-3 mb-4 md:mb-0">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center"
            >
              <img src="/logo.png" alt="FiveMinFix Logo" class="w-9 h-9" />
            </div>
            <div>
              <h3 class="text-xl font-bold">FiveMinFix</h3>
              <p class="text-gray-400 text-sm">
                Beat procrastination, one fix at a time
              </p>
            </div>
          </div>

          <div class="text-center md:text-right">
            <p class="text-gray-400 text-sm">
              Made with ❤️ by
              <a
                href="https://github.com/leecheeyong"
                target="_blank"
                class="text-gray-200 hover:underline"
                >Chee Yong Lee</a
              ><br />
              Project available as an open source under the terms of the
              <a
                href="https://github.com/leecheeyong/FiveMinFix/blob/main/LICENSE"
                target="_blank"
                class="text-gray-200 hover:underline"
                >MIT License</a
              >
            </p>
            <router-link
              to="/login"
              class="text-primary-400 hover:text-primary-300 text-sm"
            >
              Get Started →
            </router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
