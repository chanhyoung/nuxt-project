<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <PostCommentItem v-for="item in items" :key="item.id" v-bind="item"></PostCommentItem>
  </q-list>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>