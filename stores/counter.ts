// @pinia/nuxt 모듈로 인해 기본적으로 auto-imports 지원
// import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const name = ref('Eduardo');
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});