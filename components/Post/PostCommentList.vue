<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <q-item v-for="item in items" :key="item.id" class="q-py-md">
      <q-item-section side top>
        <q-avatar size="sm">
          <img src="/images/boy-avatar.png" alt="">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="flex text-caption">
          <span>{{ item.userId }}</span>
          <span class="q-mx-xs">&middot;</span>
          <span class="text-grey-6">{{ item.createdAt }}</span>
        </div>
        <div class="q-mt-sm">
          {{ item.message }}
        </div>
      </q-item-section>
      <q-item-section side top>
        <q-btn flat color="grey" icon="o_delete" round dense @click="handleDeleteComment(item.id)" >
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['deleted'])

const commentStore = useCommentStore();
const { deleteComment } = commentStore;

const handleDeleteComment = async (commentId) => {
  if (confirm('삭제 하시겠습니까?') === false) return;
  try {
    await deleteComment(commentId)
    Notify.create({
      message: '댓글을 삭제하였습니다.',
      type: 'info',
      color: 'primary',
      position: 'top',
    })
    emit("deleted", commentId)
  } catch (err) {
    console.log(err)
    Notify.create({
      message: err.value.data.message,
      type: 'nagative',
    })
  }
};
</script>