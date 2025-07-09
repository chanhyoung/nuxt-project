<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item 
          v-ripple="false" 
          clickable 
          :active="category === null"
          @click="changeCategory(null)"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item 
          v-for="cate in categories" 
          :key="cate.value" 
          v-ripple="false" 
          clickable
          :active="category === cate.value"
          @click="changeCategory(cate.value)"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:category']);

const changeCategory = value => {
  emit('update:category', value)
}
const categories = getCategories();
</script>