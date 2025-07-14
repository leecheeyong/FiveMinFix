<template>
  <div class="min-h-screen bg-gray-50">
    <header
      class="backdrop-blur bg-white/60 border-b border-gray-200 shadow-lg rounded-b-2xl mb-8"
    >
      <div
        class="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center"
      >
        <div class="flex items-center gap-4">
          <router-link
            to="/dashboard"
            class="bg-white/80 border border-primary-100 text-primary-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary-50 transition-colors shadow-none"
          >
            ← Back to Dashboard
          </router-link>
          <span
            class="text-2xl md:text-3xl font-extrabold text-primary-700 tracking-tight drop-shadow-sm"
            >Task Manager</span
          >
        </div>

        <button
          @click="handleLogout"
          class="bg-white/80 border border-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors shadow-none"
        >
          Sign Out
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-12">
      <div
        class="card mb-10 rounded-2xl shadow-xl bg-white/70 backdrop-blur p-8 border border-primary-100"
      >
        <h2 class="text-2xl font-bold text-primary-700 mb-6 tracking-tight">
          Add New Task
        </h2>

        <form @submit.prevent="addTask" class="space-y-6">
          <div>
            <label class="block text-base font-semibold text-gray-800 mb-2"
              >Task Title</label
            >
            <input
              v-model="newTask.title"
              type="text"
              required
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-gray-50 placeholder-gray-400 transition"
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
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-gray-50 placeholder-gray-400 transition"
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
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-gray-50 placeholder-gray-400 transition"
              placeholder="e.g., home, organize, quick"
            />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="loading || !newTask.title.trim()"
              class="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-6 py-3 text-base font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Adding...</span>
              <span v-else>Add Task</span>
            </button>

            <button
              v-if="editingTask"
              @click="cancelEdit"
              type="button"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-6 py-3 text-base font-semibold transition-colors shadow-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div
        class="card rounded-2xl shadow-xl bg-white/70 backdrop-blur p-8 border border-accent-100"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-accent-700 tracking-tight">
            Your Tasks
          </h2>
          <div class="text-base text-gray-500">{{ tasks.length }} task(s)</div>
        </div>

        <div v-if="loading && tasks.length === 0" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
          ></div>
          <p class="text-gray-500 mt-2">Loading tasks...</p>
        </div>

        <div v-else-if="tasks.length === 0" class="text-center py-8">
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
              ></path>
            </svg>
          </div>
          <p class="text-gray-500">
            No tasks yet. Add your first 5-minute task above!
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="task-card bg-white/80 rounded-xl p-5 flex justify-between items-start shadow border border-gray-100"
          >
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
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
                  class="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="flex gap-2 ml-4">
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
                  ></path>
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
                  ></path>
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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useFirestore } from "../composables/useFirestore";

const router = useRouter();
const { user, logout } = useAuth();
const {
  addTask: addTaskToFirestore,
  getTasks,
  updateTask,
  deleteTask: deleteTaskFromFirestore,
} = useFirestore();

const tasks = ref([]);
const loading = ref(false);
const editingTask = ref(null);

const newTask = ref({
  title: "",
  description: "",
});

const tagInput = ref("");

const parsedTags = computed(() => {
  return tagInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
});

const loadTasks = async () => {
  if (!user.value) return;

  loading.value = true;
  const result = await getTasks(user.value.uid);
  if (result.success) {
    tasks.value = result.data;
  }
  loading.value = false;
};

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
      const index = tasks.value.findIndex((t) => t.id === editingTask.value.id);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...taskData };
      }
      editingTask.value = null;
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
    tasks.value = tasks.value.filter((t) => t.id !== taskId);
  }
};

const handleLogout = async () => {
  await logout();
  router.push("/login");
};

onMounted(loadTasks);
</script>
