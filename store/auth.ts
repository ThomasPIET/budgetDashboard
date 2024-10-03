import { defineStore } from 'pinia';

interface User {
    id: string;
    email: string;
    name: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        user: null as User | null,
    }),
    actions: {
        async authenticateUser({ email, password }: { email: string; password: string}) {
            this.loading = true;
            try {
                const response = await $fetch('/api/login', {
                    method: 'POST',
                    body: { email, password },
                });

                if (response.user && response.token) {
                    this.user = response.user;
                    this.authenticated = true;
                    const token = useCookie('token');
                    token.value = response.token;
                }
            } catch (error) {
                console.error('Erreur d\'authentification:', error);
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.user = null;
            this.authenticated = false;
            const token = useCookie('token');
            token.value = null;
        },

        async fetchUserInfo() {
            try {
                const user = await $fetch('/api/user');
                this.user = user;
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            }
        },
    },
});
