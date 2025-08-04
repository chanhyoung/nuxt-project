<template>
  <q-page padding :style="pageContainerStyle">
    <q-card flat bordered>
      <q-toolbar>
        <q-toolbar-title>글수정</q-toolbar-title>
      </q-toolbar>
      <q-separator></q-separator>
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소하기" @click="cancel"></q-btn>
          <q-btn
            type="submit"
            flat
            label="수정하기"
            color="primary"
            :loading="isLoading"
          />
        </template>
      </PostForm>
    </q-card>
  </q-page>
</template>

<script>
const getInitialForm = () => ({
  id: '',
  title: '',
  category: '',
  content: '',
  tags: [],
})
</script>
<script setup>
const pageContainerStyle = computed(() => ({
  maxWidth: '800px',
  margin: '0 auto',
}))

const isLoading = ref(false)
const form = ref(getInitialForm())
const { getPost, updatePost } = usePostStore()
const route = useRoute()
const router = useRouter()

const result = await getPost(route.params.postSlug)
form.value = result
console.log('form.value: ', form.value)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    await updatePost(form.value.id, {
      title: form.value.title,
      category: form.value.category,
      content: form.value.content,
      tags: form.value.tags,
    })
    Notify.create({
      message: '글을 수정하였습니다.',
      type: 'info',
      color: 'primary',
      position: 'top',
    })
    router.push(`/community/${route.params.postSlug}`)
  } catch (err) {
    console.log(err)
    Notify.create({
      message: err.value.data.message,
      type: 'nagative',
    })
  } finally {
    isLoading.value = false
  }
}

const cancel = () => {
  router.push(`/community/${route.params.postSlug}`)
}
</script>
