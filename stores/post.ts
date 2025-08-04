// 타입 정의
interface GetPostsParams {
  category?: string | null
  tags?: string[] | null
  sort?: string
  page?: number
  limit?: number
}

interface CreatePostData {
  title: string
  category: string
  content: string
  tags: string[]
}

interface UpdatePostData {
  title: string
  category: string
  content: string
  tags: string[]
}

export const usePostStore = defineStore('post', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const { fetchWithAuth, useFetchWithAuth } = useAuth()

  // 공통 에러 처리 함수
  const handleFetchError = (
    error: any,
    defaultMessage = '서버 연결 오류입니다.',
  ) => {
    if (error?.value) {
      const errorData = error.value.data
      throw createError({
        statusCode: errorData?.code || 500,
        message: errorData?.message || defaultMessage,
        fatal: true,
      })
    }
  }

  // useFetch 결과 처리 헬퍼
  const processUseFetchResult = <T>(data: any, error: any, defaultValue: T) => {
    if (error?.value) {
      handleFetchError(error)
    }
    return data?.value || defaultValue
  }

  const createPost = async (postData: CreatePostData) => {
    console.log('createPost')
    await fetchWithAuth(`${apiBase}/posts`, {
      method: 'POST',
      body: postData,
    })
  }

  const updatePost = async (postId: string, postData: UpdatePostData) => {
    console.log('updatePost')
    await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'PATCH',
      body: postData,
    })
  }

  const deletePost = async (postId: string) => {
    console.log('deletePost')
    await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'DELETE',
    })
  }

  const getPost = async (postId: string) => {
    console.log('>>>getPost: start.', postId)
    return await fetchWithAuth(`${apiBase}/posts/${postId}`, {
      method: 'GET',
    })
  }

  const getPosts = async (params?: GetPostsParams) => {
    console.log('>>>getPosts: start.', params)

    const { data, error } = await useFetchWithAuth(`${apiBase}/posts/search`, {
      method: 'POST',
      body: {
        category: params?.category,
        tags: params?.tags,
        sort: params?.sort,
        page: params?.page,
        limit: params?.limit,
      },
    })

    console.log('>>>getPosts: end.')
    return processUseFetchResult(data, error, [])
  }

  const getTags = async () => {
    console.log('>>>getTags: start.')
    const { data, error } = await useFetchWithAuth(`${apiBase}/posts/tags`, {
      method: 'GET',
    })

    console.log('>>>getTags: end.')
    return processUseFetchResult(data, error, [])
  }

  return {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    getTags,
  }
})
