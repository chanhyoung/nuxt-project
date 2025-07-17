<template>
  <div class="q-pa-md">
    <div class="row q-gutter-md">
      <div v-for="item in items" :key="item.id" class="col-12">
        <q-card
          class="cursor-pointer"
          clickable
          @click="$router.push(`/community/${item.id}`)"
        >
          <q-card-section class="q-pt-md">
            <div class="row">
              <div class="col-auto q-pr-md">
                <q-avatar>
                  <img src="/images/boy-avatar.png" alt="" />
                </q-avatar>
              </div>
              <div class="col">
                <div class="flex items-center">
                  <span
                    >닉네임&nbsp;&middot;&nbsp;{{
                      formatRelativeTime(item.createdAt)
                    }}</span
                  >
                  <q-chip
                    class="q-ml-sm"
                    dense
                    color="primary"
                    text-color="white"
                  >
                    {{ item.category }}
                  </q-chip>
                </div>
                <div class="text-h6 q-mt-sm">{{ item.title }}</div>
                <div class="text-primary text-caption">
                  <span v-for="tag in item.tags" :key="tag" class="q-mr-sm"
                    >#{{ tag }}</span
                  >
                </div>
                <div class="text-grey-6 q-my-sm ellipsis-2-lines">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pt-none">
            <div class="row full-width">
              <div class="col-3">
                <div class="flex flex-center">
                  <PostIcon
                    name="o_visibility"
                    :label="item.readCount"
                    tooltip="조회수"
                  ></PostIcon>
                </div>
              </div>
              <div class="col-3">
                <div class="flex flex-center">
                  <PostIcon
                    name="o_sms"
                    :label="item.commentCount"
                    tooltip="댓글수"
                  ></PostIcon>
                </div>
              </div>
              <div class="col-3">
                <div class="flex flex-center">
                  <q-btn class="full-width" flat dense @click.prevent="">
                    <PostIcon
                      name="favorite_border"
                      :label="item.likeCount"
                      tooltip="좋아요"
                    ></PostIcon>
                  </q-btn>
                </div>
              </div>
              <div class="col-3">
                <div class="flex flex-center">
                  <q-btn class="full-width" flat dense @click.prevent="">
                    <PostIcon
                      name="bookmark_border"
                      :label="item.bookmarkCount"
                      tooltip="북마크"
                    ></PostIcon>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
