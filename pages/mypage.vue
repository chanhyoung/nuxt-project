<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-4">
        <q-card flat bordered>
          <q-list bordered separator>
            <q-item v-ripple clickable to="/mypage/profile">
              <q-item-section avatar>
                <q-icon name="o_account_circle"></q-icon>
              </q-item-section>
              <q-item-section>
                프로필
              </q-item-section>
            </q-item>
            <q-item v-ripple clickable to="/mypage/password">
              <q-item-section avatar>
                <q-icon name="o_lock"></q-icon>
              </q-item-section>
              <q-item-section>
                비밀번호 변경
              </q-item-section>
            </q-item>
            <q-item v-ripple clickable to="/mypage/bookmark">
              <q-item-section avatar>
                <q-icon name="bookmark_border"></q-icon>
              </q-item-section>
              <q-item-section>
                북마크
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col">
        <NuxtPage />
      </div>
    </div>

  </q-page>
</template>

