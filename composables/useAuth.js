export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, isAuthenticated } = storeToRefs(authStore);

  const fetchWithAuth = async (url, options = {}) => {
    console.log('fetchWithAuth: start.');
    if (!isAuthenticated.value) {
      await navigateTo('/auth/login');
      return Promise.resolve({ data: null, error: null})
    } 
    return useFetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': user.value.token ? `Bearer ${user.value.token}` : undefined
      },
      onResponseError( { response }) {
        console.log('>>>onResponseError: response: ', response.status)
        if (response.status === 401 || response.status === 403) {
          const authStore = useAuthStore();
          const { signOut } = authStore;
          signOut();
        }
      }
    })
  }

  return {
    fetchWithAuth
  }
}