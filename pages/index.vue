<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <PageTitle title="All Courses"></PageTitle>
      <PageDescription
        description="웹 개발 입문부터 실전까지 학습해보세요!"
      ></PageDescription>
    </div>
    <div class="row q-col-gutter-lg">
      <div
        v-for="{ courseSlug, title, subtitle, thumbnail } in courses"
        :key="courseSlug"
        class="col-12 col-md-4 col-sm-6"
      >
        <NuxtLink v-slot="{ navigate }" custom :to="`course/${courseSlug}`">
          <CourseCard
            :title="title"
            :subtitle="subtitle"
            :thumbnail="thumbnail"
            @click="navigate"
          ></CourseCard>
        </NuxtLink>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const courses = ref([])
const { getCourses } = useCourseStore()
const error = ref(null)

onMounted(async () => {
  console.log('>>>mounted: start.')
  try {
    const result = await getCourses()
    courses.value = result || []
  } catch (err) {
    console.error('Failed to fetch courses:', err)
    error.value = err
  } finally {
    console.log('>>>mounted: end.')
  }
})
</script>

<style lang="scss" scoped></style>
