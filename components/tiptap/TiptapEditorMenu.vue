<template>
  <div v-if="editor" class="flex q-pa-xs" >
    <!-- <button :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
      Bold
    </button> 
    <button :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
      Italic
    </button>
    -->
    <q-btn 
      flat
      dense 
      icon="format_bold" 
      :disabled="!editor.can().chain().focus().toggleBold().run()" 
      :color="editor.isActive('bold') ? 'blue' : null" 
      @click="editor.chain().focus().toggleBold().run()"
    />
    <button :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
      Italic
    </button>
    <button :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
      Strike
    </button>
    <button :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
      Code
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      Clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      Clear nodes
    </button>
    <button :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">
      Paragraph
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
      H1
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
      H2
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
      H3
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
      H4
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
      H5
    </button>
    <button :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
      H6
    </button>
    <button :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
      Bullet list
    </button>
    <button :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
      Ordered list
    </button>
    <button :class="{ 'is-active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
      Code block
    </button>
    <button :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
      Blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      Horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      Hard break
    </button>
    <button :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">
      Undo
    </button>
    <button :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">
      Redo
    </button>
    <button :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }" @click="editor.chain().focus().setColor('#958DF1').run()">
      Purple
    </button>
    <button :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
      Set link
    </button>
    <button :disabled="!editor.isActive('link')" @click="editor.chain().focus().unsetLink().run()">
      Unset link
    </button>
    <q-btn flat dense icon="image" @click="handleImageMenu"></q-btn>
    <q-btn flat dense icon="photo_library"></q-btn>

  </div>
</template>


<script setup>
const props = defineProps({
  editor: {
    type: Object,
  },
});

const setLink = () => {
      const previousUrl = props.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        props.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    };

const handleImageMenu = () => {
  const url = window.prompt('URL');

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};
</script>

<style lang="scss" scoped></style>
