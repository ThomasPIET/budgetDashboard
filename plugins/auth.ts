// plugins/auth.ts
import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();

    const token = useCookie('token');
    if (token.value) {
        await authStore.fetchUserInfo();
    }
});