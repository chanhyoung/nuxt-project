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

  const updatePost = async(postId: string, title: string, category: string, content: string, tags: []) => {
    console.log('updatePost')
    const { fetchWithAuth } = useAuth();
    await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'PATCH',
      body: {
        "title": title,
        "category": category,
        "content": content,
        "tags": tags
      }
    })
  };

  const getPost = async (postId: string) => {
    console.log('>>>getPost: start.', postId);
    const { fetchWithAuth } = useAuth();

    const data = await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'GET'
    })

    return data;
  };

  const getPosts = async (category: string | null) => {
    console.log('>>>getPosts: start.', category);
    const { fetchWithAuth } = useAuth();

    const url = category 
      ? `${apiBase}/posts?category=${category}`
      : `${apiBase}/posts`;

    const data = await fetchWithAuth(url, {
      method: 'GET'
    })

    return data;
  };

  return {
    createPost,
    updatePost,
    getPost,
    getPosts,
  };
});