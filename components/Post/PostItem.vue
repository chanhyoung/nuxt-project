<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/community/${id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="/images/boy-avatar.png" alt="">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex item-center">
        <span>닉네임&nbsp;&middot;&nbsp;3일 전</span>
        <q-chip class="q-ml-sm" dense color="primary" text-color="white">
          {{ category  }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="o_visibility" :label="readCount" tooltip="조회수"></PostIcon>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="o_sms" :label="commentCount" tooltip="댓글수"></PostIcon>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="">
              <PostIcon name="favorite_border" :label="likeCount" tooltip="좋아요"></PostIcon>
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="">
              <PostIcon name="bookmark_border" :label="bookmarkCount" tooltip="북마크"></PostIcon>
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  readCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  bookmarkCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String
  },
  createTime: {
    type: Date
  },
  tags: {
    type: Array,
    default: () => []
  },

})
</script>