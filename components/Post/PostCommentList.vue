<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <q-item v-for="item in items" :key="item.id" class="q-py-md">
      <q-item-section side top>
        <q-avatar size="sm">
          <img src="/images/boy-avatar.png" alt="">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="flex text-caption">
          <span>짐코딩</span>
          <span class="q-mx-xs">&middot;</span>
          <span class="text-grey-6">3일 전</span>
        </div>
        <div class="q-mt-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sunt perspiciatis doloremque comodi error, magnam cupiditate ipsum optio consequuntur neque, beatae, maiores delectus molestias cumque debitis sit? aliquid, iste modi.
        </div>
      </q-item-section>
      <q-item-section side top>
        <q-btn flat color="grey" icon="o_delete" round dense >        
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>