export const usePostStore = defineStore('post', () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const createPost = async(title: string, category: string, content: string, tags: []) => {
    console.log('createPost')
    const { fetchWithAuth } = useAuth();
    await fetchWithAuth(`${apiBase}/posts`, {
      method: 'POST',
      body: {
        "title": title,
        "category": category,
        "content": content,
        "tags": tags
      }
    })
  };

  const getPosts = async (category: string) => {
    console.log('>>>getPosts: start.', category);
    const { fetchWithAuth } = useAuth();
    const data = await fetchWithAuth(`${apiBase}/posts?category=${category}`, {
      method: 'GET'
    })

    return data;
  };

  // const getPosts = async () => {
  //   console.log('>>>getPosts: start.');
  //   const { useFetchWithAuth } = useAuth();
  //   const { data, error } = await useFetchWithAuth(`${apiBase}/posts`, {
  //     method: 'GET'
  //   })

  //   if (data === null || error === null) return;

  //   if (error.value) {
  //     throw createError({
  //       statusCode: error.value.data.code,
  //       message: error.value.data.message,
  //       fatal: true
  //     });
  //   }

  //   console.log('>>>getCourse: end.');
  //   return data.value
  // };

  return {
    createPost,
    getPosts,
  };
});