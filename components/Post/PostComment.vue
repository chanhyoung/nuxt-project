<template>
  <div>
    <div class="text-subtitle text-weight-bold q-mb-lg">댓글 6</div>
    <div v-if="isActive">
      <q-input type="textarea" class="bg-white" outlined></q-input>
      <div class="flex justify-end q-gutter-x-sm q-mt-sm">
        <q-btn label="취소" color="dark" unelevated @click="toggleActive"></q-btn>
        <q-btn label="등록" color="primary" unelevated></q-btn>
      </div>
    </div>
    <q-card v-if="!isActive" class="cursor-pointer" flat bordered @click="toggleActive">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="/images/boy-avatar.png" alt="">
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </q-card>

    <PostCommentList :items="comments" />
  </div>
</template>

<script setup>
const isActive = ref(false)
const toggleActive = () => (isActive.value = !isActive.value)

const comments = ref([
  {id: 1},
  {id: 2},
  {id: 3},
])
</script>