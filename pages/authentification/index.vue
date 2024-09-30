<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { authenticateUser } = authStore;
const { authenticated } = storeToRefs(authStore);

const user = ref({
  email: '',
  name: '',
  password: ''
})

const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  if (authenticated.value) {
    router.push('/');
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
            <Label for="name">Name</Label>
            <Input
                id="name"
                v-model="user.name"
                type="text"
                placeholder="John Doe"
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
          <Button type="submit" class="w-full">Login</Button>
        </form>
        <div class="text-center text-sm">
          Don't have an account?
          <a href="#" class="underline underline-offset-4 hover:text-primary">
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block lg:flex-1">
      <!-- Placeholder for login image -->
    </div>
  </div>
</template>