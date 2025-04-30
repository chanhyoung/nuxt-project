import { RuntimeConfig } from '@nuxt/schema';
<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <PageTitle title="About"></PageTitle>
      <PageDescription description="Vue & Nuxt Mastery Class 웹은 Nuxt3로 만들어졌습니다."></PageDescription>
      <div class="column">
        <RouterLink to="/">RouterLink Home</RouterLink>
        <RouterLink to="https://youtube.com/@gymcoding"
          >RouterLink Youtube</RouterLink
        >
        <br />
        <NuxtLink to="/">NuxtLink Home</NuxtLink>
        <NuxtLink to="https://youtube.com/@gymcoding"
          >NuxtLink Youtube</NuxtLink
        >
      </div>
      <div class="q-gutter-y-sm q-mt-md">
        <div class="text-subtitle1 text-weight-bold">useCounterStore()</div>
        <div>{{ count }}</div>
        <div>{{ doubleCount }}</div>
        <div>
          <q-btn label="increment" @click="counterStore.increment()" />
        </div>
      </div>

      <div class="q-gutter-y-sm q-mt-md">
        <div class="text-subtitle1 text-weight-bold">local vs sesstion storage</div>
        <q-input v-model="localStorageColor" outlined></q-input>
        <q-input v-model="sessionStorageColor" outlined></q-input>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);

const localStorageColor = useLocalStorage('color-key', null);
const sessionStorageColor = useSessionStorage('color-key', null);

const config = useRuntimeConfig();
console.log('about config: ', config.public.clientConfigValue)
</script>
