import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export const useAuth = () => {
    const authStore = useAuthStore();
    const { user, authenticated, loading } = storeToRefs(authStore);
    const { authenticateUser, logout, fetchUserInfo } = authStore;

    return {
        user,
        authenticated,
        loading,
        authenticateUser,
        logout,
        fetchUserInfo,
    };
};