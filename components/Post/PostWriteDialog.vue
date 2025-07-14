<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{width: '660px'}">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
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
          <q-btn v-close-popup flat label="취소하기"></q-btn>
          <q-btn 
            type="submit" 
            flat 
            label="저장하기" 
            color="primary" 
            :loading="isLoading"
          />
        </template>
      </PostForm>
    </q-card>
  </q-dialog>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
})
</script>
<script setup>
const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
}

const isLoading = ref(false);

const emit = defineEmits(['success'])

const { createPost } = usePostStore();

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await createPost(
      form.value.title, 
      form.value.category, 
      form.value.content, 
      form.value.tags
    );
    Notify.create({
      message: "새글을 작성하였습니다.",
      type: 'info',
      color: "primary",
      position: "top"
    })
    // router.push(`/community/${postSlug}`)
    emit('success');
  } catch (err) {
    console.log(err)
    Notify.create({
      message: err.value.data.message,
      type: 'nagative'
    })
  } finally {
    isLoading.value = false;
  }
};

</script>