<template>
  <q-card class="q-pa-lg" flat bordered>
    <div class="flex q-mb-md">
      <q-btn
        icon="arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      ></q-btn>
      <q-space></q-space>
      <q-btn
        icon="favorite_border"
        flat
        round
        dense
        color="red"
        size="16px"
      ></q-btn>
      <q-btn
        icon="bookmark_border"
        flat
        round
        dense
        color="blue"
        size="16px"
      ></q-btn>
    </div>
    <div class="flex items-center">
      <q-avatar size="sm">
        <img src="/images/boy-avatar.png" alt="" />
      </q-avatar>
      <div class="q-ml-md">
        <div>짐코딩</div>
        <div class="text-grey-6">{{ post.createdAt }}</div>
      </div>
      <q-space></q-space>
      <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item v-close-popup clickable :to="`/community/${postSlug}/edit`">
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="handleDeletePost">
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="q-mt-md text-h5 text-weight-bold">
      {{ post.title }}
    </div>
    <div class="flex items-center text-teal">
      <q-chip class="q-mr-sm" dense color="primary" text-color="white">
        {{ post.category }}
      </q-chip>
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}&nbsp;</span>
    </div>
    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <PostIcon
        name="o_visibility"
        :label="post.readCount"
        tooltip="조회수"
      ></PostIcon>
      <PostIcon
        name="o_sms"
        :label="post.commentCount"
        tooltip="댓글수"
      ></PostIcon>
      <PostIcon
        name="favorite_border"
        :label="post.likeCount"
        tooltip="좋아요"
      ></PostIcon>
      <PostIcon
        name="bookmark_border"
        :label="post.bookmarkCount"
        tooltip="북마크"
      ></PostIcon>
    </div>
    <q-separator class="q-my-lg"></q-separator>
    <pre>{{ post.content }}</pre>
  </q-card>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const postSlug = route.params.postSlug
const post = ref(null)

const { getPost, deletePost } = usePostStore()

const result = await getPost(postSlug)
post.value = result
console.log('post: ', post.value)
// post.value = result

const handleDeletePost = async () => {
  if (confirm('삭제 하시겠습니까?') === false) return;
  try {
    await deletePost(postSlug)
    Notify.create({
      message: '글을 삭제하였습니다.',
      type: 'info',
      color: 'primary',
      position: 'top',
    })
    router.push('/community')
  } catch (err) {
    console.log(err)
    Notify.create({
      message: err.value.data.message,
      type: 'nagative',
    })
  }
};
</script>
