<template>
  <q-page padding>
    <div :style="pageContainerStyle">
      <PostDetails />
      <q-separator class="q-my-xl"></q-separator>
      <PostComment />
    </div>
  </q-page>
</template>

<script setup lang="ts">
const pageContainerStyle = computed(() => ({
  maxWidth: '800px',
  margin: '0 auto',
}))
</script>