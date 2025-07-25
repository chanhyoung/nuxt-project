<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar
        v-model:category="searchParams.category"
        class="col-grow"
      ></PostLeftBar>
      <section class="col-7">
        <PostHeader v-model:sort="searchParams.sort"></PostHeader>
        <PostList :items="posts"></PostList>
        <!-- <div class="flex flex-center q-my-md q-ml-md">
          <q-btn
            v-if="!isLastPage"
            class="full-width"
            label="더보기"
            outline
            @click="loadMore"
          /> 
        </div>-->
        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>
      <PostRightBar
        v-model:tags="searchParams.tags"
        class="col-3"
        @open-write-dialog="openWriteDialog"
      ></PostRightBar>
      <PostWriteDialog
        v-model="postDialog"
        @success="writeSuccess"
      ></PostWriteDialog>
    </div>
  </q-page>
</template>

<script setup>
import { vIntersectionObserver } from '@vueuse/components'

const posts = ref([])
const postDialog = ref(false)
const { getPosts } = usePostStore()
const isLastPage = ref(false)

const searchParams = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  page: 1,
  limit: 5,
})

const loadPosts = async (searchParams, loadMore = false) => {
  try {
    const result = await getPosts(searchParams)
    // API 호출 실패 시 result가 undefined일 수 있으므로, 배열인지 확인합니다.
    if (!Array.isArray(result)) {
      return
    }

    if (loadMore) {
      posts.value = [...posts.value, ...result]
    } else {
      posts.value = result
    }
    if (result.length < searchParams.limit) {
      isLastPage.value = true
    }
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => [
    searchParams.value.category,
    searchParams.value.tags,
    searchParams.value.sort,
  ],
  () => {
    searchParams.value.page = 1
    isLastPage.value = false
    loadPosts(searchParams.value)
  },
  {
    deep: true,
    immediate: true,
  },
)

// const vIntersectionObserver = {
//   beforeMount: (el, binding) => {
//     const observer = new IntersectionObserver(binding.value)
//     observer.observe(el)
//   },
// }

const handleIntersectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && !isLastPage.value) {
    console.log('### handleIntersectionObserver ###')
    loadMore()
  }
}

const loadMore = () => {
  searchParams.value.page++
  loadPosts(searchParams.value, true)
}

const openWriteDialog = () => {
  postDialog.value = true
}

const writeSuccess = () => {
  postDialog.value = false
  searchParams.value.page = 1
  isLastPage.value = false
  loadPosts(searchParams.value)
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>
