<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import { ProductCard } from "@/widgets/product-card"
import { useProductStore } from "@/entities/product"
import { useAddToCart } from "@/features/cart"

const route = useRoute()

const productStore = useProductStore()

const { addToCart } = useAddToCart()

const product = computed(() => productStore.getById(String(route.params.id)))

const quantity = ref(1)

const related = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(item => item.category === product.value!.category && item.id !== product.value!.id)
    .slice(0, 4)
})

function onAdd() {
  if (!product.value) return
  addToCart(product.value, quantity.value)
}
</script>

<template>
  <div class="detail">
    <div class="detail__inner">
      <template v-if="product">
        <div class="detail__main">
          <div class="detail__media" :class="`detail__media--${product.tone}`">
            <span class="detail__emoji">{{ product.emoji }}</span>
          </div>

          <div class="detail__info">
            <span class="detail__category">{{ product.category }}</span>
            <h1 class="detail__name">{{ product.name }}</h1>

            <div class="detail__rating">
              <span class="detail__star">★</span>
              <span>{{ product.rating }}</span>
              <span class="detail__reviews">{{ product.reviewCount }} reviews</span>
            </div>

            <div class="detail__prices">
              <span class="detail__price">{{ formatCurrency(product.price) }}</span>
              <span v-if="product.compareAtPrice" class="detail__price-old">
                {{ formatCurrency(product.compareAtPrice) }}
              </span>
            </div>

            <p class="detail__description">{{ product.description }}</p>

            <ul class="detail__features">
              <li v-for="feature in product.features" :key="feature" class="detail__feature">{{ feature }}</li>
            </ul>

            <div class="detail__actions">
              <el-input-number v-model="quantity" :min="1" :max="product.stock" />
              <Button variant="primary" size="lg" @click="onAdd">Add to cart</Button>
            </div>

            <span class="detail__stock">In stock: {{ product.stock }} units</span>
          </div>
        </div>

        <section v-if="related.length" class="detail__related">
          <h2 class="detail__related-title">Related products</h2>
          <div class="product-grid">
            <ProductCard v-for="product in related" :key="product.id" :product="product" />
          </div>
        </section>
      </template>

      <el-empty v-else description="Product not found">
        <router-link to="/shop">
          <Button variant="primary">Back to shop</Button>
        </router-link>
      </el-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  padding: var(--space-5) 0;
}

.detail__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.detail__main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
  margin-bottom: var(--space-5);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.detail__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  border-radius: var(--radius-lg);

  &--sky {
    background: linear-gradient(135deg, #dbeafe, #93c5fd);
  }

  &--violet {
    background: linear-gradient(135deg, #ede9fe, #c4b5fd);
  }

  &--emerald {
    background: linear-gradient(135deg, #d1fae5, #6ee7b7);
  }

  &--amber {
    background: linear-gradient(135deg, #fef3c7, #fcd34d);
  }

  &--rose {
    background: linear-gradient(135deg, #ffe4e6, #fda4af);
  }

  &--slate {
    background: linear-gradient(135deg, #e2e8f0, #94a3b8);
  }
}

.detail__emoji {
  font-size: 140px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.detail__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.detail__category {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail__name {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
}

.detail__rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
}

.detail__star {
  color: var(--color-status-warning);
}

.detail__reviews {
  color: var(--color-text-secondary);
}

.detail__prices {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.detail__price {
  color: var(--color-text-primary);
  font-size: 32px;
  font-weight: 800;
}

.detail__price-old {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  text-decoration: line-through;
}

.detail__description {
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
  line-height: 1.6;
}

.detail__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail__feature {
  position: relative;
  padding-left: var(--space-4);
  color: var(--color-text-regular);
  font-size: var(--font-size-md);

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-status-success);
  }
}

.detail__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.detail__stock {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.detail__related {
  margin-top: var(--space-5);
}

.detail__related-title {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: 22px;
  font-weight: 700;
}
</style>
