export const useAuth = () => {
  const authStore = useAuthStore()
  const { user, isAuthenticated } = storeToRefs(authStore)

  // 공통 에러 핸들러
  const handleResponseError = ({ response }) => {
    console.log('Response error:', response.status)
    if (response.status === 401 || response.status === 403) {
      authStore.signOut()
    }
  }

  // 공통 헤더 생성 함수
  const createHeaders = (options = {}, includeAuth = false) => {
    const headers = { ...options.headers }

    if (includeAuth && user.value?.token) {
      headers.Authorization = `Bearer ${user.value.token}`
    }

    return headers
  }

  // 인증 체크 및 리다이렉트
  const checkAuthAndRedirect = async () => {
    if (!isAuthenticated.value) {
      await navigateTo('/auth/login')
      return false
    }
    return true
  }

  // useFetch 래퍼 (인증 포함)
  const useFetchWithAuth = async (url, options = {}) => {
    console.log('useFetchWithAuth: start')

    if (!(await checkAuthAndRedirect())) {
      return Promise.resolve({ data: null, error: null })
    }

    return useFetch(url, {
      ...options,
      headers: createHeaders(options, true),
      onResponseError: handleResponseError,
    })
  }

  // useFetch 래퍼 (인증 불포함)
  const useFetchNoAuth = (url, options = {}) => {
    console.log('useFetchNoAuth: start')

    return useFetch(url, {
      ...options,
      headers: createHeaders(options, false),
      onResponseError: handleResponseError,
    })
  }

  // $fetch 래퍼 (인증 포함)
  const fetchWithAuth = async (url, options = {}) => {
    console.log('fetchWithAuth: start')

    if (!(await checkAuthAndRedirect())) {
      return
    }

    try {
      return await $fetch(url, {
        ...options,
        headers: createHeaders(options, true),
        onResponseError: handleResponseError,
      })
    } catch (error) {
      // 네트워크 연결 오류나 기타 예상치 못한 오류만 처리
      if (!error.statusCode) {
        throw createError({
          statusCode: 500,
          message: '서버에 연결할 수 없습니다.',
          fatal: true,
        })
      }
      // HTTP 응답 에러는 그대로 전파
      throw error
    }
  }

  // $fetch 래퍼 (인증 불포함)
  const fetchNoAuth = async (url, options = {}) => {
    console.log('fetchNoAuth: start')

    try {
      return await $fetch(url, {
        ...options,
        headers: createHeaders(options, false),
        onResponseError: handleResponseError,
      })
    } catch (error) {
      // 네트워크 연결 오류나 기타 예상치 못한 오류만 처리
      if (!error.statusCode) {
        throw createError({
          statusCode: 500,
          message: '서버에 연결할 수 없습니다.',
          fatal: true,
        })
      }
      // HTTP 응답 에러는 그대로 전파
      throw error
    }
  }

  return {
    // 주요 fetch 함수들
    fetchWithAuth,
    fetchNoAuth,
    useFetchWithAuth,
    useFetchNoAuth,
  }
}
