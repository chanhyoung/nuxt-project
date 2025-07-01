<template>
  <q-card class="q-pa-lg" flat bordered>
    <div class="flex q-mb-md">
      <q-btn icon="arrow_back" flat round dense color="grey" size="16px"></q-btn>
      <q-space></q-space>
      <q-btn icon="favorite_border" flat round dense color="red" size="16px"></q-btn>
      <q-btn icon="bookmark_border" flat round dense color="blue" size="16px"></q-btn>
    </div>
    <div class="flex items-center">
      <q-avatar size="sm">
        <img src="/images/boy-avatar.png" alt="">
      </q-avatar>
      <div class="q-ml-md">
        <div>짐코딩</div>
        <div class="text-grey-6">3일 전</div>
      </div>
      <q-space></q-space>
      <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item v-close-popup clickable :to="`/community/${postSlug}/edit`">
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="q-mt-md text-h5 text-weight-bold">제목입니다 - {{ postSlug }}</div>
    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <PostIcon name="o_visibility" :label="1" tooltip="조회수"></PostIcon>
      <PostIcon name="o_sms" :label="2" tooltip="댓글수"></PostIcon>
      <PostIcon name="favorite_border" :label="3" tooltip="좋아요"></PostIcon>
      <PostIcon name="bookmark_border" :label="4" tooltip="북마크"></PostIcon>
    </div>
    <q-separator class="q-my-lg"></q-separator>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
    </div>
  </q-card>
</template>

<script setup>
const route = useRoute();
const postSlug = route.params.postSlug;
</script>