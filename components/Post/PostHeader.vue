<template>
  <div class="flex items-center q-mb-lg">
    <div class="text-h5">커뮤니티 목록</div>
    <q-space></q-space>
    <q-tabs narrow-indicator dense>
      <q-tab :raple="false" label="최신순" name="createTime"></q-tab>
      <q-tab :raple="false" label="조회순" name="readCount"></q-tab>
      <q-tab :raple="false" label="좋아요순" name="likeCount"></q-tab>
    </q-tabs>
  </div>
</template>

<script setup>
</script>