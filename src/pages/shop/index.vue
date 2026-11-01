<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue"
import { Pagination, Select } from "@/shared/ui"
import { ProductCard } from "@/widgets/product-card"
import { useCatalog } from "@/features/catalog"
import { useProductStore } from "@/entities/product"
import type { SortOption } from "@/features/catalog"

const route = useRoute()

const productStore = useProductStore()

const { searchQuery, activeCategory, sortBy, filteredProducts, setCategory, setSearchQuery, setSort } = useCatalog()

const categories = computed(() => productStore.categories)

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" }
]

const page = ref(1)

const pageSize = 8

const total = computed(() => filteredProducts.value.length)

const pagedProducts = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

watch(filteredProducts, () => {
  page.value = 1
})

// Sync initial state from the URL query (header search and home category chips navigate here)
watch(
  () => route.query,
  (query) => {
    setSearchQuery(typeof query.q === "string" ? query.q : "")
    setCategory(typeof query.category === "string" ? query.category : null)
  },
  { immediate: true }
)

function selectCategory(category: string | null) {
  setCategory(category)
}

function onSort(value: string | number | undefined) {
  if (value) setSort(value as SortOption)
}
</script>

<template>
  <div class="shop">
    <div class="shop__inner">
      <div class="shop__header">
        <h1 class="shop__title">Shop</h1>
        <div class="shop__toolbar">
          <el-input v-model="searchQuery" placeholder="Search products…" clearable class="shop__search">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <Select :model-value="sortBy" :options="sortOptions" :clearable="false" class="shop__sort" @update:model-value="onSort" />
        </div>
      </div>

      <div class="shop__categories">
        <button
          type="button"
          class="shop__chip"
          :class="{ 'shop__chip--active': activeCategory === null }"
          @click="selectCategory(null)"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="shop__chip"
          :class="{ 'shop__chip--active': activeCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <div class="product-grid">
        <ProductCard v-for="product in pagedProducts" :key="product.id" :product="product" />
      </div>

      <div v-if="total > pageSize" class="shop__pagination">
        <Pagination v-model="page" :total="total" :page-size="pageSize" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop {
  padding: var(--space-5) 0;
}

.shop__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.shop__title {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 800;
}

.shop__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.shop__search {
  flex: 1;
  max-width: 360px;
}

.shop__sort {
  width: 220px;
}

.shop__categories {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.shop__chip {
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

  &--active {
    border-color: var(--color-action-primary);
    background-color: var(--color-action-primary);
    color: var(--white);
  }
}

.shop__pagination {
  display: flex;
  justify-content: center;
  margin-top: var(--space-5);
}
</style>
