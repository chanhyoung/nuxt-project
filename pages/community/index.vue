<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow"></PostLeftBar>
      <section class="col-7"> 
        <PostHeader></PostHeader>
        <PostList :items="posts"></PostList>
      </section>
      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog"></PostRightBar>
      <PostWriteDialog v-model="postDialog"></PostWriteDialog>
    </div>
  </q-page>
</template>

<script setup>
  const posts = Array.from(Array(20), (_, index) => ({
    id: index,
    title: 'Vue3 Firebase 강의 ' + index,
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt
    perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur
    neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.`,
    readCount: 1,
    commentCount: 2,
    likeCount: 3,
    bookmarkCount: 4,
    tags: ['html', 'css', 'javascript'],
    uid: 'uid',
    category: '카테고리'
  }));

  const postDialog = ref(false);

  const openWriteDialog = () => {
    postDialog.value = true;
  }
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>