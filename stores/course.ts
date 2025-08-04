export const useCourseStore = defineStore('course', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const { fetchNoAuth, fetchWithAuth } = useAuth()

  // const getCourses = async () => {
  //   console.log('>>>getCourses: start.', apiBase)
  //   const { data, error } = await useFetch(`${apiBase}/courses`)

  //   if (error.value) {
  //     if (error.value.data) {
  //       throw createError({
  //         statusCode: error.value.data.code,
  //         message: error.value.data.message,
  //         fatal: true,
  //       })
  //     } else {
  //       throw createError({
  //         statusCode: 500,
  //         message: '서버 연결 오류입니다.',
  //         fatal: true,
  //       })
  //     }
  //   }

  //   console.log('>>>getCourses: end.')
  //   return {
  //     courses: data.value,
  //   }
  // }

  const getCourses = async () => {
    console.log('>>>getCourses: start.')

    const data = await fetchNoAuth(`${apiBase}/courses`, {
      method: 'GET',
    })

    console.log('>>>getCourses: end.')
    return data
  }

  const getCourse = async (courseSlug: string) => {
    console.log('>>>getCourse: start.')
    console.log('>>>courseSlug: ', courseSlug)
    const data = await fetchWithAuth(`${apiBase}/courses/${courseSlug}`)

    console.log('>>>getCourse: end.')
    return data
  }

  return {
    getCourses,
    getCourse,
  }
})
