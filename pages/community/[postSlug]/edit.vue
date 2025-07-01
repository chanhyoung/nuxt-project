<template>
  <q-page padding :style="pageContainerStyle">
    <q-card flat bordered>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator></q-separator>
      <q-form @submit.prevent>
        <q-card-section class="q-gutter-y-sm">
          <q-input v-model="form.title" outlined placeholder="제목"></q-input>
          <q-select 
            v-model="form.category"
            outlined
            :options="categories"
            emit-value 
            map-options>
            <template v-if="!form.category" #selected>
              <span class="text-grey-7">카테고리를 선택하세요</span>
            </template>
          </q-select>
          <q-input v-model="form.content" type="textarea" outlined placeholder="내용을 작성해주세요~!"></q-input>
          <q-input v-model="tagField" outlined placeholder="태그를 입력해주세요~! (입력 후 Enter)" prefix="#"></q-input>
          <q-chip outline dense color="teal" removable @remove="removeTag">vuejs</q-chip>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn v-close-popup type="submit" flat label="취소하기"></q-btn>
          <q-btn type="submit" flat label="저장하기" color="primary"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
})
</script>
<script setup>
const pageContainerStyle = computed(() => ({
  maxWidth: '800px',
  margin: '0 auto',
}))

const categories = getCategories();

const form = ref(getInitialForm());
const tagField = ref('');

const removeTag = () => {
  console.log("removeTag")
}

const onHide = () => {
  form.value = getInitialForm();
  tagField.value = '';
}

</script>