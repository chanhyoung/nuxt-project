<template>
  <q-page padding>
    <div class="flex flex-center column q-pt-xl">
      <div class="text-h2 text-weight-bold q-my-xl q-mb-md">Sign up</div>

      <div style="width: 400px">

        <q-form class="q-gutter-lg" @submit.prevent="handleSignupSubmit">
          <q-input 
            v-model="form.name" 
            filled 
            placeholder="이름" 
            hide-bottom-space 
            :rule="[validateRequired]" 
          />

          <q-input 
            v-model="form.email" 
            filled 
            placeholder="이메일" 
            hide-bottom-space 
            :rule="[validateRequired]" 
          />

          <q-input 
            v-model="form.password" 
            filled type="password" 
            placeholder="비밀번호" 
            hide-bottom-space :rule="[validateRequired]" />

          <q-input 
            v-model="passwordConfirm" 
            filled 
            type="password" 
            placeholder="비밀번호 확인" 
            hide-bottom-space 
            :rules="[
              validateRequired, 
              val => validatePasswordConfirm(form.password, val)
            ]" 
          />

          <div v-if="error" class="text-red text-center">{{ error.message }}</div>
          <div class="q-mt-lg">
            <q-btn
              class="full-width"
              label="Signup"
              type="submit"
              size="lg"
              color="primary"
              no-caps
              :loading="loading"
            />
          </div>
          <q-separator />
          <div class="q-mt-lg">
            <q-btn class="full-width" label="로그인" color="primary" outline to="/auth/login" />
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

const { signUp } = useAuthStore();

const passwordConfirm = ref('');

const form = ref({
  name: '',
  email: '',
  password: '',
});

const error = ref<Error | null>(null);
const loading = ref(false);

const handleSignupSubmit = async () => {
  try {
    error.value = null;
    loading.value = true;

    await signUp(form.value.name, form.value.email, form.value.password);

    await navigateTo("/");

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