<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">비밀번호 변경</div>
      <q-form class="q-gutter-y-md q-mt-md">
        <q-input type="password" outlined dense label="새로운 비밀번호"></q-input>
        <q-input type="password" outlined dense label="새로운 비밀번호 확인"></q-input>
      </q-form>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-space></q-space>
      <q-btn label="저장하기" flat color="primary"></q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup>
</script>