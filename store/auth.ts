// store/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCookie } from '#app';

interface User {
    id: string;
    email: string;
    name: string;
}

export const useAuthStore = defineStore('auth', () => {
    const tokenCookie = useCookie('token');

    const authenticated = ref(false);
    const loading = ref(false);
    const user = ref<User | null>(null);

    const authenticateUser = async ({ email, password }: { email: string; password: string }) => {
        loading.value = true;
        try {
            const response = await globalThis.$fetch('/api/login', {
                method: 'POST',
                body: { email, password },
            });

            if (response.user && response.token) {
                user.value = response.user;
                authenticated.value = true;
                tokenCookie.value = response.token;
            }
        } catch (error) {
            console.error('Erreur d\'authentification:', error);
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
        authenticated.value = false;
        tokenCookie.value = null;
    };

    const fetchUserInfo = async () => {
        if (!tokenCookie.value) {
            logout();
            return;
        }

        try {
            const userData = await globalThis.$fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${tokenCookie.value}`,
                },
            });
            user.value = userData;
            authenticated.value = true;
        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);
            logout();
        }
    };

    return {
        user,
        authenticated,
        loading,
        authenticateUser,
        logout,
        fetchUserInfo,
    };
});
