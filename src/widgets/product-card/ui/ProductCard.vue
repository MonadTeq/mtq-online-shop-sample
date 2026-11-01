<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import { useAddToCart } from "@/features/cart"
import type { Product } from "@/entities/product"

const props = defineProps<{
  product: Product
}>()

const { addToCart } = useAddToCart()
</script>

<template>
  <article class="product-card">
    <router-link
      :to="`/product/${props.product.id}`"
      class="product-card__media"
      :class="`product-card__media--${props.product.tone}`"
    >
      <span class="product-card__emoji">{{ props.product.emoji }}</span>
      <span v-if="props.product.isNew" class="product-card__flag">New</span>
    </router-link>

    <div class="product-card__body">
      <span class="product-card__category">{{ props.product.category }}</span>
      <router-link :to="`/product/${props.product.id}`" class="product-card__name">
        {{ props.product.name }}
      </router-link>
      <div class="product-card__rating">
        <span class="product-card__star">★</span>
        <span>{{ props.product.rating }}</span>
        <span class="product-card__reviews">({{ props.product.reviewCount }})</span>
      </div>

      <div class="product-card__footer">
        <div class="product-card__prices">
          <span class="product-card__price">{{ formatCurrency(props.product.price) }}</span>
          <span v-if="props.product.compareAtPrice" class="product-card__price-old">
            {{ formatCurrency(props.product.compareAtPrice) }}
          </span>
        </div>
        <Button variant="primary" size="sm" @click="addToCart(props.product)">Add</Button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: var(--el-box-shadow-light, 0 0 12px rgba(0, 0, 0, 0.12));
    transform: translateY(-2px);
  }
}

.product-card__media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;

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

.product-card__emoji {
  font-size: 64px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}

.product-card__flag {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-action-primary);
  color: var(--white);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.product-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.product-card__category {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__name {
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: 1.3;

  &:hover {
    color: var(--color-action-primary);
  }
}

.product-card__rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-regular);
  font-size: var(--font-size-sm);
}

.product-card__star {
  color: var(--color-status-warning);
}

.product-card__reviews {
  color: var(--color-text-secondary);
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-card__prices {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.product-card__price {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.product-card__price-old {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-decoration: line-through;
}
</style>
