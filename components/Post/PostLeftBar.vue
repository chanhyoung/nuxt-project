<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item v-ripple="false" clickable :active="true">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item v-for="cate in categories" :key="cate.value" v-ripple="false" clickable>
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
const categories = getCategories();
</script>