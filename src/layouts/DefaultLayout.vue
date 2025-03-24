<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div>
    <AppHeader />
    <AppSidebar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>
