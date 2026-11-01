<script lang="ts" setup>
import { Search, ShoppingCart } from "@element-plus/icons-vue"
import ThemeSwitch from "@/features/theme"
import { useCartStore } from "@/entities/cart"
import { SHOP_PATH } from "@/shared/constants"

const emit = defineEmits<{
  (e: "toggle-cart"): void
}>()

const router = useRouter()

const cartStore = useCartStore()

const { count: cartCount } = storeToRefs(cartStore)

const query = ref("")

function submitSearch() {
  router.push({ path: SHOP_PATH, query: query.value.trim() ? { q: query.value.trim() } : {} })
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <router-link to="/" class="site-header__logo">
        <span class="site-header__logo-mark">🛍️</span>
        <span class="site-header__logo-text">AcmeTeq</span>
      </router-link>

      <nav class="site-header__nav">
        <router-link to="/" class="site-header__link">Home</router-link>
        <router-link to="/shop" class="site-header__link">Shop</router-link>
      </nav>

      <div class="site-header__search">
        <el-input v-model="query" placeholder="Search products…" clearable @keyup.enter="submitSearch">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <div class="site-header__actions">
        <ThemeSwitch />
        <button type="button" class="site-header__cart" aria-label="Open cart" @click="emit('toggle-cart')">
          <el-icon :size="22"><ShoppingCart /></el-icon>
          <span v-if="cartCount" class="site-header__cart-badge">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--v3-header-height);
  background-color: var(--color-surface-default);
  border-bottom: 1px solid var(--color-border-default);
}

.site-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  max-width: var(--v3-container-max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.site-header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.site-header__logo-mark {
  font-size: 24px;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: var(--space-4);
}

.site-header__link {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-text-regular);
  font-size: var(--font-size-md);

  &:hover {
    color: var(--color-action-primary);
    background-color: var(--color-surface-hover);
  }

  &.router-link-active {
    color: var(--color-action-primary);
  }
}

.site-header__search {
  flex: 1;
  max-width: 420px;
  margin-left: auto;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.site-header__cart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-full);
  background-color: transparent;
  color: var(--color-text-regular);
  cursor: pointer;

  &:hover {
    background-color: var(--color-surface-hover);
    color: var(--color-action-primary);
  }
}

.site-header__cart-badge {
  position: absolute;
  top: 2px;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-full);
  background-color: var(--color-action-primary);
  color: var(--white);
  font-size: var(--font-size-sm);
  line-height: 18px;
  text-align: center;
}
</style>
