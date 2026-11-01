<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import { useCartStore } from "@/entities/cart"
import { CHECKOUT_PATH, SHOP_PATH } from "@/shared/constants"

const router = useRouter()

const cartStore = useCartStore()

const { lines, subtotal, count, isEmpty } = storeToRefs(cartStore)

function goCheckout() {
  router.push(CHECKOUT_PATH)
}
</script>

<template>
  <div class="cart">
    <div class="cart__inner">
      <h1 class="cart__title">Shopping cart</h1>

      <div v-if="isEmpty" class="cart__empty">
        <el-empty description="Your cart is empty" />
        <router-link :to="SHOP_PATH">
          <Button variant="primary">Browse products</Button>
        </router-link>
      </div>

      <template v-else>
        <div class="cart__layout">
          <div class="cart__lines">
            <div v-for="line in lines" :key="line.productId" class="cart__line">
              <div class="cart__thumb" :class="`cart__thumb--${line.tone}`">{{ line.emoji }}</div>
              <div class="cart__info">
                <span class="cart__name">{{ line.name }}</span>
                <span class="cart__unit">{{ formatCurrency(line.price) }} each</span>
              </div>
              <el-input-number
                :model-value="line.quantity"
                :min="1"
                size="small"
                @update:model-value="cartStore.setQuantity(line.productId, $event ?? 1)"
              />
              <span class="cart__total">{{ formatCurrency(line.price * line.quantity) }}</span>
              <button type="button" class="cart__remove" @click="cartStore.remove(line.productId)">Remove</button>
            </div>
            <button type="button" class="cart__clear" @click="cartStore.clear()">Clear cart</button>
          </div>

          <aside class="cart__summary">
            <h2 class="cart__summary-title">Order summary</h2>
            <div class="cart__summary-row">
              <span>Items</span>
              <span>{{ count }}</span>
            </div>
            <div class="cart__summary-row">
              <span>Subtotal</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="cart__summary-row cart__summary-row--total">
              <span>Total</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <Button variant="primary" size="lg" @click="goCheckout">Proceed to checkout</Button>
          </aside>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  padding: var(--space-5) 0;
}

.cart__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.cart__title {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 800;
}

.cart__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.cart__layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-5);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.cart__lines {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
  overflow: hidden;
}

.cart__line {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border-default);

  &:last-of-type {
    border-bottom: none;
  }
}

.cart__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  font-size: 32px;

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

.cart__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
}

.cart__name {
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: 600;
}

.cart__unit {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.cart__total {
  min-width: 90px;
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: 700;
  text-align: right;
}

.cart__remove {
  border: none;
  background: transparent;
  color: var(--color-action-danger);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.cart__clear {
  align-self: flex-end;
  margin: var(--space-3) var(--space-4);
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    color: var(--color-action-danger);
  }
}

.cart__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
}

.cart__summary-title {
  margin: 0 0 var(--space-1);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.cart__summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-regular);
  font-size: var(--font-size-md);

  &--total {
    padding-top: var(--space-3);
    border-top: 1px solid var(--color-border-default);
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
    font-weight: 700;
  }
}
</style>
