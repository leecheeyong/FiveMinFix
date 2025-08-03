<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50"
  >
    <header
      class="backdrop-blur bg-white/70 border-b border-gray-200 shadow-lg rounded-b-2xl mb-8"
    >
      <div
        class="max-w-4xl w-full mx-auto px-2 md:px-6 py-4 md:py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <router-link
            to="/dashboard"
            class="bg-gradient-to-r from-primary-100 to-accent-100 border border-primary-200 text-primary-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary-50 transition-colors shadow w-full md:w-auto text-center"
          >
            ← Back to Dashboard
          </router-link>
          <span
            class="text-xl md:text-2xl font-extrabold text-primary-700 tracking-tight drop-shadow-sm"
            >Task Manager</span
          >
        </div>
        <div
          class="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto items-center"
        >
          <span
            v-if="user && user.email"
            class="text-gray-600 text-xs md:text-sm font-medium px-2"
            >{{ user.email }}</span
          >
          <button
            @click="handleLogout"
            class="bg-white/90 border border-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors shadow w-full md:w-auto"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl w-full mx-auto px-2 md:px-4 py-6 md:py-12">
      <div
        class="card mb-8 md:mb-10 rounded-2xl shadow-xl bg-gradient-to-br from-primary-50 via-white to-accent-50/80 backdrop-blur p-6 md:p-8 border border-primary-100 w-full"
      >
        <h2
          class="text-xl md:text-2xl font-bold text-primary-700 mb-4 md:mb-6 tracking-tight"
        >
          Add New Task
        </h2>
        <form @submit.prevent="addTask" class="space-y-4 md:space-y-6">
          <div>
            <label class="block text-base font-semibold text-gray-800 mb-2"
              >Task Title</label
            >
            <input
              v-model="newTask.title"
              type="text"
              required
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-white placeholder-gray-400 transition"
              placeholder="e.g., Organize desk drawer"
            />
          </div>
          <div>
            <label class="block text-base font-semibold text-gray-800 mb-2"
              >Description</label
            >
            <textarea
              v-model="newTask.description"
              rows="3"
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-white placeholder-gray-400 transition"
              placeholder="Brief description of the task (optional)"
            ></textarea>
          </div>
          <div>
            <label class="block text-base font-semibold text-gray-800 mb-2"
              >Tags (comma separated)</label
            >
            <input
              v-model="tagInput"
              type="text"
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-white placeholder-gray-400 transition"
              placeholder="e.g., home, organize, quick"
            />
          </div>
          <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button
              type="submit"
              :disabled="loading || !newTask.title.trim()"
              class="rounded-lg px-6 py-3 text-base font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <span v-if="loading">Adding...</span>
              <span v-else>{{
                editingTask ? "Edit Task" : "Add New Task"
              }}</span>
            </button>
            <button
              v-if="editingTask"
              @click="cancelEdit"
              type="button"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-6 py-3 text-base font-semibold transition-colors shadow-none w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div
        class="card rounded-2xl shadow-xl bg-gradient-to-br from-accent-50 via-white to-primary-50/80 backdrop-blur p-6 md:p-8 border border-accent-100 w-full"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 gap-2"
        >
          <h2
            class="text-xl md:text-2xl font-bold text-accent-700 tracking-tight"
          >
            Your Tasks
          </h2>
          <div class="text-sm md:text-base text-gray-500">
            {{ tasks.length }} task(s)
          </div>
        </div>
        <div v-if="loading && tasks.length === 0" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
          ></div>
          <p class="text-gray-500 mt-2">Loading tasks...</p>
        </div>
        <div
          v-else-if="tasks.length === 0 && !loading"
          class="text-center py-8"
        >
          <div
            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p class="text-gray-500">
            No tasks yet. Add your first 5-minute task above!
          </p>
          <p v-if="error && error.length" class="text-red-500 mt-2">
            Error: {{ error }}
          </p>
        </div>
        <div v-else class="space-y-4 overflow-x-auto">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="task-card bg-white/90 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start shadow border border-gray-100 min-w-[260px] hover:shadow-lg transition-shadow group"
          >
            <div class="flex-1">
              <h3
                class="text-base md:text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors"
              >
                {{ task.title }}
              </h3>
              <p v-if="task.description" class="text-gray-600 mb-2">
                {{ task.description }}
              </p>
              <div
                v-if="task.tags && task.tags.length > 0"
                class="flex flex-wrap gap-2"
              >
                <span
                  v-for="tag in task.tags"
                  :key="tag"
                  class="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium border border-primary-200 shadow-sm"
                  >{{ tag }}</span
                >
              </div>
            </div>
            <div class="flex gap-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
              <button
                @click="editTask(task)"
                class="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Edit task"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="deleteTask(task.id)"
                class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useFirestore } from "../composables/useFirestore";

const router = useRouter();
const { user, logout, isAuthReady } = useAuth();
const {
  addTask: addTaskToFirestore,
  getTasks,
  updateTask,
  deleteTask: deleteTaskFromFirestore,
  error,
} = useFirestore();

const tasks = ref([]);
const loading = ref(false);
const editingTask = ref(null);

const newTask = ref({
  title: "",
  description: "",
});

const tagInput = ref("");

const loadTasks = async () => {
  if (typeof isAuthReady !== "undefined" && !isAuthReady?.value) {
    console.log("TaskManager.vue: Auth not ready, skipping loadTasks");
    return;
  }
  if (!user.value) {
    console.log("TaskManager.vue: No user, cannot load tasks");
    return;
  }
  loading.value = true;
  console.log("TaskManager.vue: Loading tasks for user", user.value.uid);
  const result = await getTasks(user.value.uid);
  console.log("TaskManager.vue: getTasks result", result);
  if (result.success) {
    tasks.value = result.data;
    console.log("TaskManager.vue: tasks after load", tasks.value);
  } else {
    console.error("Failed to load tasks:", result.error);
  }
  loading.value = false;
};

watch(
  [
    () => (typeof isAuthReady !== "undefined" ? isAuthReady?.value : true),
    () => user.value,
  ],
  ([ready, val], [prevReady, prevVal]) => {
    if (ready && val === null && prevVal !== null) {
      router.push("/login");
    }
    if (ready && val) {
      loadTasks();
    }
  },
  { immediate: true },
);

onMounted(() => {
  loadTasks();
});

const parsedTags = computed(() => {
  return tagInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
});

const addTask = async () => {
  if (!user.value || !newTask.value.title.trim()) return;

  loading.value = true;

  const taskData = {
    title: newTask.value.title.trim(),
    description: newTask.value.description.trim(),
    tags: parsedTags.value,
  };

  if (editingTask.value) {
    const result = await updateTask(
      user.value.uid,
      editingTask.value.id,
      taskData,
    );
    if (result.success) {
      editingTask.value = null;
      await loadTasks();
    }
  } else {
    const result = await addTaskToFirestore(user.value.uid, taskData);
    if (result.success) {
      await loadTasks();
    }
  }

  newTask.value = { title: "", description: "" };
  tagInput.value = "";
  loading.value = false;
};

const editTask = (task) => {
  editingTask.value = task;
  newTask.value = {
    title: task.title,
    description: task.description || "",
  };
  tagInput.value = task.tags ? task.tags.join(", ") : "";
};

const cancelEdit = () => {
  editingTask.value = null;
  newTask.value = { title: "", description: "" };
  tagInput.value = "";
};

const deleteTask = async (taskId) => {
  if (!user.value || !confirm("Are you sure you want to delete this task?"))
    return;

  const result = await deleteTaskFromFirestore(user.value.uid, taskId);
  if (result.success) {
    await loadTasks();
  }
};

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>
