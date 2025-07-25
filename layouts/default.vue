<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>Vue Master Course</q-toolbar-title>
        <q-separator dark vertical />
        <ClientOnly>
          <NuxtLink v-slot="{ navigate }" custom to="/">
            <q-btn
              stretch
              flat
              :label="$t('home')"
              no-caps
              @click="navigate()"
            />
          </NuxtLink>
          <q-separator dark vertical />
          <NuxtLink v-slot="{ navigate }" custom to="/about">
            <q-btn
              stretch
              flat
              :label="$t('about')"
              no-caps
              @click="navigate()"
            />
          </NuxtLink>
          <q-separator dark vertical />
          <NuxtLink v-slot="{ navigate }" custom to="/community">
            <q-btn
              stretch
              flat
              :label="$t('community')"
              no-caps
              @click="navigate()"
            />
          </NuxtLink>
          <!-- <q-btn
          stretch
          flat
          :label="$t('youtube')"
          no-caps
          @click="moveYoutube"
        /> -->
          <q-separator dark vertical />
          <NuxtLink v-slot="{ navigate }" custom to="/admin">
            <q-btn
              stretch
              flat
              :label="$t('admin')"
              no-caps
              @click="navigate()"
            />
          </NuxtLink>
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat no-caps :label="selectedLanguageName">
            <q-list padding dense>
              <q-item
                v-for="{ code, name } in languages"
                :key="code"
                v-close-popup
                clickable
                :active="code === $i18n.locale"
                @click="$i18n.locale = code"
              >
                <q-item-section>
                  <q-item-label>{{ name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-separator dark vertical />
          <NuxtLink
            v-if="!isAuthenticated"
            v-slot="{ navigate }"
            custom
            to="/auth/login"
          >
            <q-btn
              stretch
              flat
              :label="$t('login')"
              no-caps
              @click="navigate()"
            />
          </NuxtLink>
          <template v-else>
            <q-btn
              stretch
              flat
              :label="$t('logout')"
              no-caps
              @click="signOut()"
            />
            <NuxtLink v-slot="{ navigate }" custom to="/mypage/profile">
              <q-btn round flat @click="navigate()">
                <q-avatar>
                  <img src="/images/boy-avatar.png" alt="" />
                </q-avatar>
              </q-btn>
            </NuxtLink>
          </template>
        </ClientOnly>
      </q-toolbar>
    </q-header>
    <q-page-container :style="pageContainerStyle">
      <q-banner v-if="isAuthenticated" class="bg-primary text-white">
        {{ user }}
      </q-banner>

      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const { signOut } = authStore

const pageContainerStyle = computed(() => ({
  maxWidth: '1080px',
  margin: '0 auto',
}))

// const moveYoutube = async () => {
//   await navigateTo('https://youtube.com/@gymcoding', {
//     external: true,
//     open: { target: '_blank' },
//   })
// }

interface Language {
  name: string
  code: 'en' | 'ko'
}

const languages = ref<Language[]>([
  { name: 'English', code: 'en' },
  { name: '한국어', code: 'ko' },
])

const { locale } = useI18n()

const selectedLanguageName = computed(
  () => languages.value.find(lang => lang.code === locale.value)?.name,
)

watch(locale, val => (useCookie('locale').value = val))
</script>
