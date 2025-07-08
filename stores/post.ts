export const usePostStore = defineStore('post', () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const createPost = async(title: string, category: string, content: string) => {
    console.log('createPost')
    const { fetchWithAuth } = useAuth();
    await fetchWithAuth(`${apiBase}/posts`, {
      method: 'POST',
      body: {
        "title": title,
        "category": category,
        "content": content,
        // "tags": tags
      }
    }).catch(error => {
      Notify.create({
        message: error.data.message,
        type: 'nagative'
      })
    });
  };


  return {
    createPost,
  };
});