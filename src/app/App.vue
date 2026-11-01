<script lang="ts" setup>
import { useTheme } from "@/features/theme"

const { initTheme } = useTheme()

// Initialize the theme
initTheme()
</script>

<template>
  <router-view />
</template>
