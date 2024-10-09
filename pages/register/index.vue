<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '~/store/auth';

const user = ref({
  email: '',
  name: '',
  password: ''
});

const loading = ref(false);
const error = ref<string | null>(null);

const register = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await globalThis.$fetch('/api/register', {
      method: 'POST',
      body: {
        email: user.value.email,
        name: user.value.name,
        password: user.value.password,
      },
    });

    if (response) {
      //todo connecter l'utilisateur
      console.log('User created:', response);
    }
  } catch (err) {
    error.value = 'Error registering user';
    console.error('Registration error:', err);
  } finally {
    loading.value = false;
  }
};
</script>



<template>
  <div class="flex min-h-screen w-full flex-col lg:flex-row">
    <div class="hidden bg-muted lg:block lg:flex-1">
      <!-- register image -->
    </div>
    <div class="flex flex-1 items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-[400px] space-y-6">
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold">Create your account</h1>
          <p class="text-balance text-sm text-muted-foreground">
            Enter your info below to create your account
          </p>
        </div>
        <form @submit.prevent="register" class="grid gap-4">
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
            {{ loading ? 'Signing up...' : 'Sign up' }}
          </Button>        </form>
        <div class="text-center text-sm">
          Already have an account?
          <a href="/authentification" class="underline underline-offset-4 hover:text-primary">
            Sign in
          </a>
        </div>
      </div>
    </div>
  </div>
</template>