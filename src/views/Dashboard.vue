<template>
  <div class="min-h-screen bg-gray-50">
    <header
      class="backdrop-blur bg-white/60 border-b border-gray-200 shadow-lg rounded-b-2xl mb-8"
    >
      <div
        class="max-w-4xl w-full mx-auto px-2 md:px-6 py-4 md:py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <span
            class="text-2xl md:text-3xl font-extrabold text-primary-700 tracking-tight drop-shadow-sm"
            >FiveMinFix</span
          >
          <div
            class="streak-counter flex items-center gap-2 px-4 py-2 bg-orange-50/80 border border-orange-200 rounded-full shadow text-orange-600 font-semibold text-sm md:text-base"
          >
            <span class="text-xl md:text-2xl">🔥</span>
            <span>{{ userStats.streak }}-Day Streak!</span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto items-center"
        >
          <span
            v-if="user && user.email"
            class="text-gray-600 text-xs md:text-sm font-medium px-2"
            >{{ user.email }}</span
          >
          <router-link
            to="/tasks"
            class="bg-white/80 border border-primary-100 text-primary-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary-50 transition-colors shadow-none w-full md:w-auto text-center"
          >
            Manage Tasks
          </router-link>
          <button
            @click="handleLogout"
            class="bg-white/80 border border-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors shadow-none w-full md:w-auto"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl w-full mx-auto px-2 md:px-4 py-6 md:py-12">
      <div
        class="card mb-8 md:mb-10 rounded-2xl shadow-xl bg-white/70 backdrop-blur p-6 md:p-10 w-full"
      >
        <div class="text-center">
          <h2
            class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight"
          >
            Welcome back! 👋
          </h2>
          <p class="text-gray-700 mb-6 md:mb-8 text-base md:text-lg">
            Ready to tackle another 5-minute task?
          </p>

          <div class="max-w-md mx-auto mb-6 md:mb-8">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm md:text-base font-semibold text-primary-700"
                >Level {{ userStats.level }}</span
              >
              <span class="text-sm md:text-base text-gray-500"
                >{{ userStats.xp % 100 }}/100 XP</span
              >
            </div>
            <div
              class="w-full h-3 md:h-4 bg-primary-100/60 rounded-full overflow-hidden"
            >
              <div
                class="h-3 md:h-4 bg-gradient-to-r from-primary-400/80 to-accent-400/80 rounded-full transition-all duration-700"
                :style="{ width: `${userStats.xp % 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="card rounded-2xl shadow-xl bg-white/70 backdrop-blur p-6 md:p-10 mb-8 md:mb-10 w-full"
      >
        <div v-if="!currentTask || !showTask" class="text-center">
          <div class="mb-8 md:mb-10">
            <div
              class="w-20 md:w-24 h-20 md:h-24 bg-primary-100/70 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow"
            >
              <svg
                class="w-10 md:w-12 h-10 md:h-12 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              Ready for a quick fix?
            </h3>
            <p class="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Click below to get a random 5-minute task
            </p>
          </div>
          <button
            @click="getRandomTask"
            :disabled="loading || tasks.length === 0"
            class="bg-primary-600 hover:bg-primary-700 text-gray-900 rounded-lg px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            <span v-if="loading">Getting Task...</span>
            <span v-else-if="!loading && tasks.length === 0"
              >No Tasks Available</span
            >
            <span v-else>🎯 Start Fix</span>
          </button>
          <p v-if="!loading && tasks.length === 0" class="text-gray-500 mt-4">
            <router-link
              to="/tasks"
              class="text-primary-600 hover:text-primary-700 underline"
            >
              Add some tasks
            </router-link>
            to get started!
          </p>
        </div>

        <!-- Modal Overlay for Current Task -->
        <div
          v-if="currentTask && showTask"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-lg w-full mx-4 animate-slide-up relative"
          >
            <button
              @click="resetTask"
              class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h3
              class="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center"
            >
              Your 5-Minute Fix
            </h3>
            <div
              class="bg-gray-50/80 rounded-xl p-4 md:p-6 mb-4 md:mb-6 shadow-sm"
            >
              <p class="text-base md:text-lg text-gray-800 mb-2 font-semibold">
                {{ currentTask.title }}
              </p>
              <p class="text-gray-600">{{ currentTask.description }}</p>
              <div
                v-if="currentTask.tags && currentTask.tags.length > 0"
                class="flex flex-wrap gap-2 mt-4"
              >
                <span
                  v-for="tag in currentTask.tags"
                  :key="tag"
                  class="px-2 md:px-3 py-1 bg-primary-100/80 text-primary-800 rounded-full text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row gap-2 md:gap-4 justify-center"
            >
              <button
                @click="completeTask"
                :disabled="loading"
                class="bg-accent-600 hover:bg-accent-700 text-gray-900 rounded-lg px-6 py-3 font-semibold transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                ✅ Done (+5 XP)
              </button>
              <button
                @click="skipTask"
                :disabled="loading"
                class="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg px-6 py-3 font-semibold transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                ⏭️ Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 w-full min-w-[320px]"
        >
          <div
            class="card text-center rounded-2xl shadow bg-white/60 backdrop-blur p-4 md:p-6 border border-primary-100 w-full"
          >
            <div
              class="text-3xl md:text-4xl font-extrabold text-primary-600 mb-2"
            >
              {{ userStats.totalTasksCompleted }}
            </div>
            <div class="text-gray-700 text-sm md:text-base font-medium">
              Tasks Completed
            </div>
          </div>
          <div
            class="card text-center rounded-2xl shadow bg-white/60 backdrop-blur p-4 md:p-6 border border-accent-100 w-full"
          >
            <div
              class="text-3xl md:text-4xl font-extrabold text-accent-600 mb-2"
            >
              {{ userStats.level }}
            </div>
            <div class="text-gray-700 text-sm md:text-base font-medium">
              Current Level
            </div>
          </div>
          <div
            class="card text-center rounded-2xl shadow bg-white/60 backdrop-blur p-4 md:p-6 border border-orange-100 w-full"
          >
            <div
              class="text-3xl md:text-4xl font-extrabold text-orange-600 mb-2"
            >
              {{ userStats.xp }}
            </div>
            <div class="text-gray-700 text-sm md:text-base font-medium">
              Total XP
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useFirestore } from "../composables/useFirestore";

const router = useRouter();
const { user, logout, isAuthReady } = useAuth();
const { getTasks, getUserStats, updateUserStats } = useFirestore();

const tasks = ref([]);
const currentTask = ref(null);
const showTask = ref(false);
const loading = ref(false);
const userStats = ref({
  xp: 0,
  level: 1,
  streak: 0,
  lastCompletedDate: null,
  totalTasksCompleted: 0,
});

watch(
  [() => isAuthReady && isAuthReady.value, () => user.value],
  ([ready, val]) => {
    if (ready && val === null) {
      router.push("/login");
    }
  },
  { immediate: true },
);

const loadTasks = async () => {
  if (!user.value) {
    console.log("loadTasks: no user");
    return;
  }
  console.log("loadTasks: fetching tasks for", user.value.uid);
  const result = await getTasks(user.value.uid);
  console.log("loadTasks: result", result);
  if (result.success) {
    tasks.value = result.data;
  } else {
    console.error("Failed to load tasks:", result.error);
  }
};

const loadUserStats = async () => {
  if (!user.value) return;

  const result = await getUserStats(user.value.uid);
  if (result.success) {
    userStats.value = result.data;
  }
};

const getRandomTask = async () => {
  if (tasks.value.length === 0) return;

  loading.value = true;

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * tasks.value.length);
    currentTask.value = tasks.value[randomIndex];
    showTask.value = true;
    loading.value = false;
  }, 500);
};

const completeTask = async () => {
  if (!currentTask.value || !user.value) return;

  loading.value = true;

  const newXP = userStats.value.xp + 5;
  const newLevel = Math.floor(newXP / 100) + 1;
  const today = new Date().toDateString();
  const lastCompleted = userStats.value.lastCompletedDate;

  let newStreak = userStats.value.streak;
  if (lastCompleted) {
    const lastDate = new Date(lastCompleted).toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    if (lastDate === yesterday) {
      newStreak += 1;
    } else if (lastDate !== today) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  await updateUserStats(user.value.uid, {
    xp: newXP,
    level: newLevel,
    streak: newStreak,
    lastCompletedDate: today,
    totalTasksCompleted: userStats.value.totalTasksCompleted + 1,
  });

  userStats.value = {
    ...userStats.value,
    xp: newXP,
    level: newLevel,
    streak: newStreak,
    lastCompletedDate: today,
    totalTasksCompleted: userStats.value.totalTasksCompleted + 1,
  };

  await resetTask();
  loading.value = false;
};

const skipTask = async () => {
  await resetTask();
};

const resetTask = async () => {
  currentTask.value = null;
  showTask.value = false;
  await loadTasks();
};

const handleLogout = async () => {
  await logout();
  router.push("/login");
};

onMounted(async () => {
  await loadUserStats();
});

watch(
  [() => isAuthReady && isAuthReady.value, () => user.value],
  async ([ready, val]) => {
    if (ready && val) {
      await loadTasks();
    }
    if (ready && val === null) {
      router.push("/login");
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.streak-counter {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(252, 211, 77, 0.1);
  border: 1px solid rgba(252, 211, 77, 0.3);
  color: #d97706;
  font-weight: 600;
  font-size: 0.875rem;
}

.card {
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-50 {
  z-index: 50;
}

.bg-black\/40 {
  background-color: rgba(0, 0, 0, 0.4);
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
