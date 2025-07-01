<template>
  <NuxtLayout name="community">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  layoutTransition: false, // NuxtLayout 을 루트 태그로 사용하기 위해 설정
})
</script>

<style scoped>

</style>