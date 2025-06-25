import type { UserWithoutPassword } from '~/types/user';

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const authCookie = useCookie<Maybe<UserWithoutPassword>>('_auth');
  const authUser = ref<Maybe<UserWithoutPassword>>();
  const data = ref();

  const signIn = async(email: string, password: string) => {
    console.log('signIn')
    const fetData = await $fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      body: {
        email,
        password,
      }
    }).catch(error => {
      throw createError({
        statusCode: error.data.code,
        message: error.data.message,
        fatal: true
      });
    });

    data.value = fetData;

    const foundUser = {
      id: '',
      email: email,
      roles: ['ADMIN'],
      token: data.value.accessToken
    }

    setUser(foundUser);
  };

  const setUser = (user: Maybe<UserWithoutPassword>) => {
    authCookie.value = user;
    authUser.value = user;
  };

  const signOut = async() => {
    authCookie.value = null;
    setUser(null);
    navigateTo("/");
  };

  const fetchUser = async () => {
    if (authCookie.value) {
      setUser(authCookie.value);
    }
  }

  const signUp = async(name: string, email: string, password: string) => {
    console.log('signUp')
    const fetData = await $fetch(`${apiBase}/auth/signup`, {
      method: 'POST',
      body: {
        name,
        email,
        password,
      }
    }).catch(error => {
      throw createError({
        statusCode: error.data.code,
        message: error.data.message,
        fatal: true
      });
    });

    console.log('>>>fetchData:', fetData)
  };


  return {
    user: authUser,
    isAuthenticated: computed(() => !!authUser.value),
    isAdmin: computed(() =>
      !authUser.value ? false : authUser.value.roles.includes('ADMIN'),
    ),
    signIn,
    signUp,
    signOut,
    fetchUser,
  };
});