<template>
  <q-page padding>
    <div>TiptapEditor test</div>
    <input v-model="contentModel" type="text">
    <div>
      {{ contentModel }}
    </div>
    <q-separator></q-separator>
    <q-card class="tiptap" flat bordered>
      <TiptapEditor v-model="contentModel" class="editor__content" />
    </q-card>
  </q-page>
</template>

<script setup>
const contentModel = ref('')
</script>