<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { authenticateUser } = authStore;
const { authenticated, loading } = storeToRefs(authStore);

definePageMeta({
  layout: "no-header",
});

const user = ref({
  email: "",
  password: "",
});

const router = useRouter();
const error = ref<string | null>(null);

const login = async () => {
  error.value = null;
  loading.value = true;

  try {
    await authenticateUser(user.value);

    if (authenticated.value) {
      await router.push("/");
    } else {
      error.value = "Invalid email or password.";
      console.error("Login failed");
    }
  } catch (err: any) {
    if (err && err.data && err.data.statusMessage) {
      error.value = err.data.statusMessage;
    } else if (err && err.message) {
      error.value = err.message;
    } else {
      error.value = "An unknown error occurred during login.";
    }
    console.error("Login error:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row">
    <div class="flex flex-1 items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-[400px] space-y-6">
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form @submit.prevent="login" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="user.email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              v-model="user.password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? "Logging in..." : "Login" }}
          </Button>
        </form>
        <div v-if="error" class="text-red-500 text-center mt-4">
          {{ error }}
        </div>
        <div class="text-center text-sm">
          Don't have an account?
          <a
            href="/register"
            class="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block lg:flex-1">
      <!-- login image -->
    </div>
  </div>
</template>
