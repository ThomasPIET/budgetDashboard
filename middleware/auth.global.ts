import {useAuthStore} from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie('token');

    if (token.value) {
        authenticated.value = true;
    }

    if (authenticated.value && to.name === 'authentification') {
        return navigateTo('/');
    }

    if (!authenticated.value && to.name !== 'authentification') {
        console.log('redirecting to authentification'); //debug
        return navigateTo('/authentification');
    }
});