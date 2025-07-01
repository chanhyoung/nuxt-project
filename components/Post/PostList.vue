<template>
  <q-list bordered separator>
    <PostItem v-for="item in items" :key="item.id" v-bind="item">
    </PostItem>
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