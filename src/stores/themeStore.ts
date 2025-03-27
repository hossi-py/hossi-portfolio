import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  const isSeasonThemeActive = ref(localStorage.getItem('season-theme') === 'on')

  const toggleDarkMode = () => {
    isDark.value = !isDark.value

    // 테마 변경 시 시즌 테마 종료
    if (isSeasonThemeActive.value) {
      isSeasonThemeActive.value = false
    }
  }

  const toggleSeasonTheme = () => {
    isSeasonThemeActive.value = !isSeasonThemeActive.value
  }

  watch(
    isDark,
    (newValue) => {
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark-mode', newValue)
    },
    { immediate: true },
  )

  watch(
    isSeasonThemeActive,
    (newValue) => {
      localStorage.setItem('season-theme', newValue ? 'on' : 'off')
    },
    { immediate: true },
  )

  return {
    isDark,
    toggleDarkMode,
    isSeasonThemeActive,
    toggleSeasonTheme,
  }
})
