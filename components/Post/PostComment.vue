<template>
  <div>
    <div class="text-subtitle text-weight-bold q-mb-lg">{{ postSlug }} - 댓글 6</div>
    <div v-if="isActive">
      <q-form @submit.prevent="handleAddComment">
        <q-input
          v-model="message"
          type="textarea"
          outlined
          :rules="[validateRequired]"
        ></q-input>
        <div class="flex justify-end q-gutter-x-sm q-mt-sm">
          <q-btn label="취소" color="dark" unelevated @click="toggleActive"></q-btn>
          <q-btn type="submit" label="등록" color="primary" unelevated></q-btn>
        </div>
      </q-form>
    </div>
    <q-card v-if="!isActive" class="cursor-pointer" flat bordered @click="toggleActive">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="/images/boy-avatar.png" alt="">
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </q-card>

    <PostCommentList :items="comments" @success="loadComments()" />
  </div>
</template>

<script setup>
const route = useRoute()
const postSlug = route.params.postSlug
console.log('postSlug', postSlug)
const comments = ref([])

const isActive = ref(false);
const isLoading = ref(false);
const message = ref('');


const authStore = useAuthStore();
const commentStore = useCommentStore();
const { createComment, getComments } = commentStore;


const toggleActive = () => (isActive.value = !isActive.value);

const loadComments = async () => {
  try {
    const result = await getComments(postSlug)
    comments.value = result // .value를 사용하여 반응형 데이터 업데이트
  } catch (error) {
    console.error('Failed to load posts:', error)
    comments.value = []
  }
}

await loadComments();

const handleAddComment = async () => {
  try {
    isLoading.value = true;  
    await createComment(postSlug, {
      message: message.value,
      userId: authStore.user.id,
    });
    message.value = '';
    toggleActive();
    Notify.create({
      message: "댓글을 작성하였습니다.",
      type: 'info',
      color: "primary",
      position: "top"
    })
    await loadComments();
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