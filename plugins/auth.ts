// plugins/auth.ts
import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/store/auth';


export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();

    const token = useCookie('token');
    if (token.value) {
        try {
            await authStore.fetchUserInfo();
        } catch (error) {
            console.error('Error fetching user info:', error);
            authStore.logout();
        }
    } else {
        console.log('No token found, user not authenticated');
    }
});
