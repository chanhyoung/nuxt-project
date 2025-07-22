export const useCourseStore = defineStore('course', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getCourses = async () => {
    console.log('>>>getCourses: start.')
    const { data, error } = await useFetch(`${apiBase}/courses`)

    if (error.value) {
      if (error.value.data) {
        throw createError({
          statusCode: error.value.data.code,
          message: error.value.data.message,
          fatal: true,
        })
      } else {
        throw createError({
          statusCode: 500,
          message: '서버 연결 오류입니다.',
          fatal: true,
        })
      }
    }

    console.log('>>>getCourses: end.')
    return {
      courses: data.value,
    }
  }

  const getCourse = async (courseSlug: string) => {
    console.log('>>>getCourse: start.')
    console.log('>>>courseSlug: ', courseSlug)
    const { useFetchWithAuth } = useAuth()
    const { data, error } = await useFetchWithAuth(
      `${apiBase}/courses/${courseSlug}`,
    )
    if (data === null || error === null) return

    if (error.value) {
      throw createError({
        statusCode: error.value.data.code,
        message: error.value.data.message,
        fatal: true,
      })
    }

    console.log('>>>getCourse: end.')
    return data.value
  }

  return {
    getCourses,
    getCourse,
  }
})
