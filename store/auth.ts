import { defineStore } from 'pinia';

interface UserPayloadInterface {
    email: string;
    name: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser({ email, name, password }: UserPayloadInterface) {
            const { data, pending }: any = await useFetch('http://localhost:3000/api/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    email,
                    name,
                    password,
                },
            });
            this.loading = pending;

            if (data.value) {
                const token = useCookie('token');
                token.value = data?.value?.token;
                this.authenticated = true;
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        },
    },
});