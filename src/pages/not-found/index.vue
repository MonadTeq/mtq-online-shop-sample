<script lang="ts" setup>
import { Button } from "@/shared/ui"
</script>

<template>
  <div class="not-found">
    <div class="not-found__code">404</div>
    <h1 class="not-found__title">Page not found</h1>
    <p class="not-found__text">The page you are looking for doesn't exist or has been moved.</p>
    <router-link to="/">
      <Button variant="primary">Back to home</Button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  min-height: 60vh;
  padding: var(--space-5);
  text-align: center;
}

.not-found__code {
  color: var(--color-action-primary);
  font-size: 96px;
  font-weight: 800;
  line-height: 1;
}

.not-found__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 700;
}

.not-found__text {
  margin: 0;
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
}
</style>
