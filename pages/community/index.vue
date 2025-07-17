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
        <div class="flex flex-center q-my-md q-ml-md">
          <q-btn
            v-if="!isLastPage"
            class="full-width"
            label="더보기"
            outline
            @click="loadMore"
          ></q-btn>
        </div>
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
const posts = ref([])
const postDialog = ref(false)
const { getPosts } = usePostStore()
const isLastPage = ref(false)

const searchParams = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  page: 1,
  limit: 2,
})

const loadPosts = async (searchParams, loadMore = false) => {
  const result = await getPosts(searchParams)
  if (loadMore) {
    posts.value = [...posts.value, ...result]
  } else {
    posts.value = result
  }
  if (result.length < searchParams.limit) {
    isLastPage.value = true
  }
}

const loadMore = () => {
  searchParams.value.page++
  loadPosts(searchParams.value, true)
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
