export default defineNuxtRouteMiddleware(() => {
  const { isAdmin, isAuthenticated } = storeToRefs(useAuthStore());

  if (!isAuthenticated.value) {
    return navigateTo('/auth/login');
  }
  if (!isAdmin.value) {
    return navigateTo('/');
  }
});