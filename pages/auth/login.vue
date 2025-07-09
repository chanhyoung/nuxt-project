<template>
  <q-page padding>
    <div class="flex flex-center column q-pt-xl">
      <div class="text-h2 q-mt-xl q-mb-md">Login</div>
      <p class="text-subtitle1 q-mb-xl">Hello :)</p>

      <div style="width: 400px">
        <q-form class="q-gutter-lg" @submit.prevent="handleLoginSubmit">
          <q-input 
            v-model="form.email" 
            filled 
            label="email"
          />

          <q-input 
            v-model="form.password" 
            filled 
            autocomplete="off" 
            type="password" 
            label="password" />

          <div v-if="error" class="text-red text-center">{{ error.message }}</div>
          <div class="q-mt-lg">
            <q-btn
              class="full-width"
              label="Login"
              type="submit"
              size="lg"
              color="primary"
              no-caps
              :loading="loading"
            />
          </div>
          <q-separator />
          <div class="q-mt-lg">
            <q-btn class="full-width" label="이메일 가입하기" color="primary" outline to="/auth/signup" />
          </div>
        </q-form>
      </div>  
    </div>
  </q-page>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
});

const { signIn } = useAuthStore();


const form = ref({
  email: '',
  password: '',
});

const error = ref<Error | null>(null);
const loading = ref(false);

const handleLoginSubmit = async () => {
  try {
    error.value = null;
    loading.value = true;

    await signIn(form.value.email, form.value.password);

    const { isAdmin } = storeToRefs(useAuthStore());
    const redirect = isAdmin.value ? '/admin' : '/';
        await navigateTo(redirect);

  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err;
    } else {
      throw Error;
    }
  } finally {
    loading.value = false;
  }
};
</script>