<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar
        v-model:category="params.category"
        class="col-grow"
      ></PostLeftBar>
      <section class="col-7">
        <PostHeader></PostHeader>
        <PostList :items="posts"></PostList>
      </section>
      <PostRightBar
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
// posts를 반응형 데이터로 선언
const posts = ref([])
const { getPosts } = usePostStore()
// 초기 데이터 로드
const loadPosts = async (category = null) => {
  try {
    const result = await getPosts(category)
    posts.value = result // .value를 사용하여 반응형 데이터 업데이트
  } catch (error) {
    console.error('Failed to load posts:', error)
    posts.value = []
  }
}

await loadPosts()

const params = ref({
  category: null,
})

// params 변경 감지
watch(
  params,
  async () => {
    await loadPosts(params.value.category)
  },
  {
    deep: true,
  },
)

console.log('posts: ', posts)

const postDialog = ref(false)

const openWriteDialog = () => {
  postDialog.value = true
}

const writeSuccess = async () => {
  postDialog.value = false
  await loadPosts()
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>
