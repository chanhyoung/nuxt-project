// 타입 정의
interface GetPostsParams {
  category?: string | null;
  tags?: string[] | null;
  sort?: string;
  page?: number;
  limit?: number;
}

interface CreatePostData {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

export const usePostStore = defineStore('post', () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const createPost = async(postData: CreatePostData) => {
    console.log('createPost')
    const { fetchWithAuth } = useAuth();
    await fetchWithAuth(`${apiBase}/posts`, {
      method: 'POST',
      body: {
        "title": postData.title,
        "category": postData.category,
        "content": postData.content,
        "tags": postData.tags
      }
    })
  };

  const updatePost = async(postId: string, title: string, category: string, content: string, tags: string[]) => {
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

  const deletePost = async(postId: string) => {
    console.log('deletePost')
    const { fetchWithAuth } = useAuth();
    await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'DELETE'
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

  const getPosts = async (params?: GetPostsParams) => {
    console.log('>>>getPosts: start.', params);
    const { fetchWithAuth } = useAuth();

    // const searchParams = new URLSearchParams();
    // if (params?.category) {
    //   searchParams.append('category', params.category);
    // }

    // if (params?.sort) {
    //   searchParams.append('sort', params.sort);
    // }

    // const url = `${apiBase}/posts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    // console.log('Final URL:', url);

    const data = await fetchWithAuth(`${apiBase}/posts/search`, {
      method: 'POST',
      body: {
        category: params?.category,
        tags: params?.tags,
        sort: params?.sort,
        page: params?.page,
        limit: params?.limit,
      },
    })

    return data;
  };

  const getTags = async () => {
    console.log('>>>getTags: start.');
    const { fetchWithAuth } = useAuth();

    const data = await fetchWithAuth(`${apiBase}/posts/tags`, {
      method: 'GET',
    })

    return data;
  };


  return {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    getTags,
  };
});