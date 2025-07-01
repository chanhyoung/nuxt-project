export const useDefaultLocale = (fallback = 'en') => {
  const locale = ref(fallback);

  if (!import.meta.server) 
    locale.value = navigator.language.split('-')[0]

  return locale;
}