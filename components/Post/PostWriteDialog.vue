<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{width: '660px'}">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </q-toolbar>
      <q-separator></q-separator>
      <q-form @submit.prevent="handleSubmit">
        <q-card-section class="q-gutter-y-sm">
          <q-input 
            v-model="form.title" 
            outlined 
            placeholder="제목"
            :rules="[validateRequired]"></q-input>
          <q-select 
            v-model="form.category"
            outlined
            :options="categories"
            emit-value 
            map-options
            :rules="[validateRequired]"
            >
            <template v-if="!form.category" #selected>
              <span class="text-grey-7">카테고리를 선택하세요</span>
            </template>
          </q-select>
          <q-input v-model="form.content" type="textarea" outlined placeholder="내용을 작성해주세요~!"></q-input>
          <q-input 
            v-model="tagField" 
            outlined 
            placeholder="태그를 입력해주세요~! (입력 후 Enter)" 
            prefix="#"
            @keypress.enter.prevent="onRegistTag"
          />
          <q-chip 
            v-for="(tag, index) in form.tags" :key="tag" 
            outline 
            dense 
            color="teal" 
            removable 
            @remove="removeTag(index)">
            {{ tag }}
          </q-chip>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="취소하기"></q-btn>
          <q-btn 
            type="submit" 
            flat 
            label="저장하기" 
            color="primary" 
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
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
const emit = defineEmits(['success'])
const { createPost } = usePostStore();

const categories = getCategories();

const form = ref(getInitialForm());
const tagField = ref('');
const isLoading = ref(false);

// const router = useRouter()

const onRegistTag = (e) => {
  const tagValue = e.target.value.replace(/ /g, '');
  if (!tagValue) {
    return;
  }
  if (form.value.tags.length >= 10) {
    Notify.create({
      message: "태그는 10개 이상 등록할 수 없습니다.",
      type: 'warning'
    })
    return;
  }
  if (form.value.tags.includes(tagValue) === false) {
    form.value.tags = [...form.value.tags, tagValue]
  }
  e.target.value = '';
  console.log('from.value.tags: ', form.value.tags)
}

const handleSubmit = async () => {
  console.log('handleSubmit')
  if (!form.value.content) {
    Notify.create({
      message: "내용을 작성해주세요.",
      type: 'warning'
    })
    return;
  }

  try {
    isLoading.value = true;
    await createPost(
      form.value.title, 
      form.value.category, 
      form.value.content, 
      form.value.tags
    );
    Notify.create({
      message: "새글을 작성하였습니다.",
      type: 'info',
      color: "primary",
      position: "top"
    })
    // router.push(`/community/${postSlug}`)
    emit('success');
  } catch (err) {
    console.log(err)
    Notify.create({
      message: err.value.data.message,
      type: 'nagative'
    })
  } finally {
    isLoading.value = false;
  }
};

const removeTag = (index) => {
  const tags = [...form.value.tags];
  tags.splice(index, 1);
  form.value.tags = tags;
  tagField.value = '';
}

const onHide = () => {
  form.value = getInitialForm();
  tagField.value = '';
}

</script>