<script lang="ts" setup>
import { SiteHeader } from "@/widgets/site-header"
import { SiteFooter } from "@/widgets/site-footer"
import { CartDrawer } from "@/widgets/cart-drawer"

// Whether the cart drawer is open (shared between the header trigger and the drawer)
const isCartOpen = ref(false)

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}
</script>

<template>
  <div class="storefront">
    <SiteHeader @toggle-cart="toggleCart" />
    <main class="storefront__main">
      <router-view />
    </main>
    <SiteFooter />
    <CartDrawer v-model="isCartOpen" />
  </div>
</template>

<style lang="scss" scoped>
.storefront {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.storefront__main {
  flex: 1;
}
</style>
