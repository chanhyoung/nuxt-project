<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar
        v-model:category="params.category"
        class="col-grow"
      ></PostLeftBar>
      <section class="col-7">
        <PostHeader v-model:sort="params.sort"></PostHeader>
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
        v-model:tags="params.tags"
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

const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  page: 1,
  limit: 2,
})

const loadPosts = async (p, loadMore = false) => {
  const result = await getPosts(p)
  if (loadMore) {
    posts.value = [...posts.value, ...result]
  } else {
    posts.value = result
  }
  if (result.length < params.value.limit) {
    isLastPage.value = true
  }
}

const loadMore = () => {
  params.value.page++
  loadPosts(params.value, true)
}

watch(
  () => [params.value.category, params.value.tags, params.value.sort],
  () => {
    params.value.page = 1
    isLastPage.value = false
    loadPosts(params.value)
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
  params.value.page = 1
  isLastPage.value = false
  loadPosts(params.value)
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>
