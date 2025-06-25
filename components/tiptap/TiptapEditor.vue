<template>
  <TiptapEditorMenu :editor="editor"></TiptapEditorMenu>
  <q-separator></q-separator>
  <editor-content :editor="editor" v-bind="$attrs" />
</template>

<script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Placeholder from '@tiptap/extension-placeholder'
  import { Color } from '@tiptap/extension-color'
  import TextStyle from '@tiptap/extension-text-style'
  import Link from '@tiptap/extension-link'
  import Image from '@tiptap/extension-image'

  console.log("TiptapEditor.vue~~")

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
  });

  const emit = defineEmits(['update:modelValue'])

  const editor = useEditor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '마트다운을 이용해서 편리하게 글을 작성하세요.'
      }),
      Color,
      TextStyle,
      Link,
      Image,
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML())
    }
  });

  watch(
    () => props.modelValue,
    value => {
      const isSame = editor.value.getHTML() === value;
      if (isSame) {
        return;
      }
      editor.value.commands.setContent(value, false);
    }
  )
</script>

<style lang='scss'>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
