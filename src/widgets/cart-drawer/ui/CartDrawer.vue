<script lang="ts" setup>
import { Button } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import { useCartStore } from "@/entities/cart"
import { CART_PATH, CHECKOUT_PATH } from "@/shared/constants"

const model = defineModel<boolean>({ default: false })

const router = useRouter()

const cartStore = useCartStore()

const { lines, count, subtotal, isEmpty } = storeToRefs(cartStore)

function goCheckout() {
  model.value = false
  router.push(CHECKOUT_PATH)
}

function goCart() {
  model.value = false
  router.push(CART_PATH)
}
</script>

<template>
  <el-drawer v-model="model" direction="rtl" size="420px" :title="`Your Cart (${count})`">
    <div v-if="isEmpty" class="cart-drawer__empty">
      <el-empty description="Your cart is empty" />
      <Button variant="primary" @click="goCart">Browse products</Button>
    </div>

    <template v-else>
      <ul class="cart-drawer__list">
        <li v-for="line in lines" :key="line.productId" class="cart-drawer__item">
          <div class="cart-drawer__thumb" :class="`cart-drawer__thumb--${line.tone}`">{{ line.emoji }}</div>
          <div class="cart-drawer__info">
            <span class="cart-drawer__name">{{ line.name }}</span>
            <span class="cart-drawer__price">{{ formatCurrency(line.price) }}</span>
            <div class="cart-drawer__controls">
              <el-input-number
                :model-value="line.quantity"
                :min="1"
                size="small"
                @update:model-value="cartStore.setQuantity(line.productId, $event ?? 1)"
              />
              <button type="button" class="cart-drawer__remove" @click="cartStore.remove(line.productId)">
                Remove
              </button>
            </div>
          </div>
          <span class="cart-drawer__line-total">{{ formatCurrency(line.price * line.quantity) }}</span>
        </li>
      </ul>

      <div class="cart-drawer__footer">
        <div class="cart-drawer__subtotal">
          <span>Subtotal</span>
          <span class="cart-drawer__subtotal-value">{{ formatCurrency(subtotal) }}</span>
        </div>
        <Button variant="primary" size="lg" @click="goCheckout">Checkout</Button>
        <Button variant="secondary" size="lg" @click="goCart">View cart</Button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.cart-drawer__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-5);
}

.cart-drawer__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart-drawer__item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border-default);
}

.cart-drawer__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  font-size: 28px;

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

.cart-drawer__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
}

.cart-drawer__name {
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: 600;
}

.cart-drawer__price {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.cart-drawer__controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-1);
}

.cart-drawer__remove {
  border: none;
  background: transparent;
  color: var(--color-action-danger);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.cart-drawer__line-total {
  font-weight: 700;
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
}

.cart-drawer__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.cart-drawer__subtotal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
}

.cart-drawer__subtotal-value {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 700;
}
</style>
