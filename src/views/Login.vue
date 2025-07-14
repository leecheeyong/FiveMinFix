<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50"
  >
    <div class="max-w-md w-full mx-4">
      <div class="card p-8 rounded-2xl shadow-xl bg-white/95">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            FiveMinFix
          </h1>
          <p class="text-gray-700 text-base">
            Beat procrastination, one task at a time
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="space-y-6"
          autocomplete="on"
          aria-label="Sign in or sign up form"
        >
          <div>
            <label
              for="email"
              class="block text-base font-semibold text-gray-800 mb-2"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-gray-50 placeholder-gray-400 transition"
              placeholder="Enter your email"
              autocomplete="email"
              aria-label="Email address"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-base font-semibold text-gray-800 mb-2"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-gray-900 bg-gray-50 placeholder-gray-400 transition"
              placeholder="Enter your password"
              autocomplete="current-password"
              aria-label="Password"
            />
          </div>

          <div
            v-if="error"
            class="bg-red-50 border border-red-300 rounded-lg p-3"
            role="alert"
          >
            <p class="text-red-700 text-base">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary-100 hover:bg-primary-200 text-gray-900 font-extrabold text-lg py-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg border-2 border-primary-300"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            aria-busy="loading"
            aria-label="Submit login or signup form"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="animate-spin h-5 w-5 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="ml-2">Loading...</span>
            </span>
            <span v-else>
              {{ isLogin ? "Sign In" : "Sign Up" }}
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <button
            @click="toggleMode"
            class="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded transition"
            aria-label="Toggle sign in or sign up mode"
          >
            {{
              isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { signIn, signUp, user } = useAuth();

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const isSignUp = ref(false);

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  error.value = "";
};

const handleSubmit = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = "";

  try {
    const result = isSignUp.value
      ? await signUp(email.value, password.value)
      : await signIn(email.value, password.value);

    if (result.error) {
      error.value = result.error;
    } else {
      router.push("/dashboard");
    }
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => user.value,
  (val) => {
    if (val) {
      router.push("/dashboard");
    }
  },
);
</script>
