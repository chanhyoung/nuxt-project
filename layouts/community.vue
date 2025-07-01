<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header elevated class="bg-white text-grey-9">
      <q-toolbar>
        <q-toolbar-title>코딩 커뮤니티 클럽</q-toolbar-title>
        <q-separator dark vertical />
        <NuxtLink v-slot="{ navigate }" custom to="/community/settings">
          <q-btn stretch flat label="Settings" no-caps @click="navigate()" />
        </NuxtLink>
        <q-separator dark vertical />
        <NuxtLink v-slot="{ navigate }" custom to="/community">
          <q-btn stretch flat label="Community" no-caps @click="navigate()" />
        </NuxtLink>
      </q-toolbar>
    </q-header>
    <q-page-container :style="pageContainerStyle">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const pageContainerStyle = computed(() => ({
  maxWidth: '1080px',
  margin: '0 auto',
}))
</script>
