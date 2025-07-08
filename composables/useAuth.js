export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, isAuthenticated } = storeToRefs(authStore);

  const useFetchWithAuth = async (url, options = {}) => {
    console.log('useFetchWithAuth: start.');
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

  const fetchWithAuth = async (url, options = {}) => {
    console.log('fetchWithAuth: start.');
    
    if (!isAuthenticated.value) {
      await navigateTo('/auth/login');
      return Promise.resolve({ data: null, error: null });
    }

    const data = await $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': user.value.token ? `Bearer ${user.value.token}` : undefined
      },
      onResponseError({ response }) {
        console.log('>>>onResponseError: response: ', response.status);
        if (response.status === 401 || response.status === 403) {
          const authStore = useAuthStore();
          const { signOut } = authStore;
          signOut();
        }
      }
    }).catch(error => {
      throw createError({
        statusCode: error.data.code,
        message: error.data.message,
        fatal: true
      });
    });

    return data.value;
  };

  return {
    fetchWithAuth,
    useFetchWithAuth
  }
}