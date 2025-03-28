import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapsed = ref(false)

  const savedState = localStorage.getItem('sidebar-collapsed')
  if (savedState !== null) {
    isCollapsed.value = JSON.parse(savedState)
  }

  watch(isCollapsed, (newValue) => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newValue))
  })

  // 상태 토글 함수
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, toggleSidebar }
})
