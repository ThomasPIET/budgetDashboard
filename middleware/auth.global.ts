// middleware/auth.js
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuth();
  const token = useCookie("token");
  const { authenticated } = authStore;

  if (token.value) {
    authenticated.value = true;
  }

  const publicRoutes = ["authentification", "register"];

  if (
    authenticated.value &&
    (to.name === "authentification" || to.name === "register")
  ) {
    return navigateTo("/");
  }

  if (!authenticated.value && !publicRoutes.includes(to.name!)) {
    return navigateTo("/authentification");
  }

  if (authenticated.value) {
    try {
      await authStore.fetchUserInfo();

      const settings = authStore.user.value?.settings;

      if (
        !settings ||
        settings.startYear == null ||
        settings.lateIncome == null ||
        settings.savingsRate == null
      ) {
        if (to.path !== "/configuration") {
          console.log(
            "Les paramètres utilisateur sont incomplets, redirection vers la page de configuration",
          );
          return navigateTo("/configuration");
        }
      } else if (settings && to.path === "/configuration") {
        return navigateTo("/");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification des paramètres utilisateur:",
        error,
      );
      return navigateTo("/authentification");
    }
  }
});
