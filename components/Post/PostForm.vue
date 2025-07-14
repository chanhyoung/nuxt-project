<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input 
        v-model="titleModel" 
        outlined 
        placeholder="제목"
        :rules="[validateRequired]"></q-input>
      <q-select 
        v-model="categoryModel"
        outlined
        :options="categories"
        emit-value 
        map-options
        :rules="[validateRequired]"
        >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요</span>
        </template>
      </q-select>
      <q-input 
        v-model="contentModel" 
        type="textarea" 
        outlined 
        placeholder="내용을 작성해주세요~!"
      />
      <q-input 
        outlined 
        placeholder="태그를 입력해주세요~! (입력 후 Enter)" 
        prefix="#"
        @keypress.enter.prevent="addTag"
      />
      <q-chip 
        v-for="(tag, index) in tags" :key="tag" 
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
      <slot name="actions" />
    </q-card-actions>
  </q-form>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  category: {
    type: String
  },
  content: {
    type: String
  },
  tags: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit'
])

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val)
});
const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val)
});
const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val)
});

const useTag = () => {

  const addTag = (e) => {
    const tagValue = e.target.value.replace(/ /g, '');
    if (!tagValue) {
      return;
    }
    if (props.tags.length >= 10) {
      Notify.create({
        message: "태그는 10개 이상 등록할 수 없습니다.",
        type: 'warning'
      })
      return;
    }
    if (props.tags.includes(tagValue) === false) {
      emit('update:tags', [...props.tags, tagValue]);
    }
    e.target.value = '';
  }
  
  const removeTag = (index) => {
    const model = [...props.tags];
    model.splice(index, 1);
    emit('update:tags', model)
  }

  return {
    addTag,
    removeTag
  }
}

const { addTag, removeTag} = useTag();

const categories = getCategories();

const handleSubmit = async () => {
  console.log('handleSubmit')
  if (!contentModel.value) {
    Notify.create({
      message: "내용을 작성해주세요.",
      type: 'warning'
    })
    return;
  }

  emit('submit');
};
</script>

<style lang="scss" scoped>

</style>