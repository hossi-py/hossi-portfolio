import { onMounted, ref } from 'vue'

export function useDarkMode() {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark-mode', isDark.value)
  }

  onMounted(() => {
    document.documentElement.classList.toggle('dark-mode', isDark.value)
  })

  return { isDark, toggleDarkMode }
}
