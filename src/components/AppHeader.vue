<script setup lang="ts">
import { useDarkMode } from '@/composables/darkMode'
import CustomIcon from './icons/CustomIcon.vue'

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo -->
      <!-- GNB -->
      <nav>
        <ul class="header-items">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/components">Components</router-link></li>
          <li><router-link to="/projects">Projects</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li>
            <CustomIcon @click="toggleDarkMode">
              {{ isDark ? '🌙' : '☀️' }}
            </CustomIcon>
          </li>
          <li>
            <CustomIcon active>☀️</CustomIcon>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 헤더 스타일 */
.header {
  width: 100%;
  border-bottom: 1px solid transparent;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 1100;
  background: transparent;
  backdrop-filter: blur(5px); /* 이거! */
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.header-inner {
  align-items: center;
  display: flex;
  height: var(--header-height);
  justify-content: space-between;
  padding: 0 4rem;
}

.header-items {
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 0.5rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* 네비게이션 스타일 */
nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
}

nav ul li {
  font-size: 1rem;
  font-weight: bold;
}

nav ul li a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

nav ul li a:hover {
  color: var(--primary-color);
}
</style>
