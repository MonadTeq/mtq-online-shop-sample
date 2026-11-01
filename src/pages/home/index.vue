<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { ProductCard } from "@/widgets/product-card"
import { useProductStore } from "@/entities/product"
import { SHOP_PATH } from "@/shared/constants"

const router = useRouter()

const productStore = useProductStore()

const categories = computed(() => productStore.categories)

const bestSellers = computed(() => productStore.products.filter(product => product.isBestSeller))

const newArrivals = computed(() => productStore.products.filter(product => product.isNew))

function browseCategory(category: string) {
  router.push({ path: SHOP_PATH, query: { category } })
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero__inner">
        <h1 class="hero__title">Gear up with AcmeTeq</h1>
        <p class="hero__subtitle">Discover curated tech essentials — from audio to wearables — at prices you'll love.</p>
        <div class="hero__actions">
          <Button variant="primary" size="lg" :href="`#${SHOP_PATH}`">Shop now</Button>
          <Button variant="secondary" size="lg" :href="`#${SHOP_PATH}`">Browse categories</Button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2 class="section__title">Shop by category</h2>
        <div class="categories">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="categories__chip"
            @click="browseCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2 class="section__title">Best sellers</h2>
        <div class="product-grid">
          <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2 class="section__title">New arrivals</h2>
        <div class="product-grid">
          <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7c3aed 100%);
  color: var(--white);
}

.hero__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 72px var(--space-5);
}

.hero__title {
  margin: 0 0 var(--space-3);
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hero__subtitle {
  max-width: 520px;
  margin: 0 0 var(--space-5);
  font-size: var(--font-size-lg);
  opacity: 0.9;
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
}

.section {
  padding: var(--space-5) 0;
}

.section__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.section__title {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: 22px;
  font-weight: 700;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.categories__chip {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  background-color: var(--color-surface-default);
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-action-primary);
    color: var(--color-action-primary);
  }
}
</style>
