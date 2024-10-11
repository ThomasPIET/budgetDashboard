import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  const isProtectedRoute =
    !["authentification"].includes(to.name!) &&
    !["register"].includes(to.name!);

  if (
    (authenticated.value && to.name === "authentification") ||
    (authenticated.value && to.name === "register")
  ) {
    return navigateTo("/");
  }

  if (!authenticated.value && isProtectedRoute) {
    return navigateTo("/authentification");
  }
});
