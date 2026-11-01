<script lang="ts" setup>
import { Button, Input, Label, Textarea } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import { useCartStore } from "@/entities/cart"
import { SHOP_PATH } from "@/shared/constants"

const cartStore = useCartStore()

const { lines, subtotal, count, isEmpty } = storeToRefs(cartStore)

const name = ref("")
const email = ref("")
const address = ref("")
const city = ref("")
const postalCode = ref("")
const cardNumber = ref("")
const cardExpiry = ref("")
const cardCvc = ref("")

const orderPlaced = ref(false)

const canSubmit = computed(
  () => Boolean(name.value && email.value && address.value && city.value && postalCode.value && cardNumber.value && cardExpiry.value && cardCvc.value)
)

function placeOrder() {
  if (!canSubmit.value || isEmpty.value) return
  orderPlaced.value = true
  cartStore.clear()
}
</script>

<template>
  <div class="checkout">
    <div class="checkout__inner">
      <h1 class="checkout__title">Checkout</h1>

      <div v-if="orderPlaced" class="checkout__success">
        <div class="checkout__success-icon">✅</div>
        <h2 class="checkout__success-title">Order placed!</h2>
        <p class="checkout__success-text">Thank you for shopping with AcmeTeq. A confirmation email is on its way.</p>
        <router-link :to="SHOP_PATH">
          <Button variant="primary">Continue shopping</Button>
        </router-link>
      </div>

      <div v-else-if="isEmpty" class="checkout__empty">
        <el-empty description="Your cart is empty" />
        <router-link :to="SHOP_PATH">
          <Button variant="primary">Browse products</Button>
        </router-link>
      </div>

      <div v-else class="checkout__layout">
        <form class="checkout__form" @submit.prevent="placeOrder">
          <section class="checkout__section">
            <h2 class="checkout__section-title">Contact</h2>
            <div class="checkout__field">
              <Label>Full name</Label>
              <Input v-model="name" placeholder="Jane Doe" />
            </div>
            <div class="checkout__field">
              <Label>Email</Label>
              <Input v-model="email" placeholder="jane@example.com" />
            </div>
          </section>

          <section class="checkout__section">
            <h2 class="checkout__section-title">Shipping address</h2>
            <div class="checkout__field">
              <Label>Address</Label>
              <Textarea v-model="address" :rows="2" placeholder="123 Main St" />
            </div>
            <div class="checkout__row">
              <div class="checkout__field">
                <Label>City</Label>
                <Input v-model="city" placeholder="Springfield" />
              </div>
              <div class="checkout__field">
                <Label>Postal code</Label>
                <Input v-model="postalCode" placeholder="12345" />
              </div>
            </div>
          </section>

          <section class="checkout__section">
            <h2 class="checkout__section-title">Payment</h2>
            <div class="checkout__field">
              <Label>Card number</Label>
              <Input v-model="cardNumber" placeholder="4242 4242 4242 4242" />
            </div>
            <div class="checkout__row">
              <div class="checkout__field">
                <Label>Expiry</Label>
                <Input v-model="cardExpiry" placeholder="MM/YY" />
              </div>
              <div class="checkout__field">
                <Label>CVC</Label>
                <Input v-model="cardCvc" placeholder="123" />
              </div>
            </div>
          </section>
        </form>

        <aside class="checkout__summary">
          <h2 class="checkout__summary-title">Order summary</h2>
          <ul class="checkout__items">
            <li v-for="line in lines" :key="line.productId" class="checkout__item">
              <span class="checkout__item-emoji">{{ line.emoji }}</span>
              <span class="checkout__item-name">{{ line.name }} × {{ line.quantity }}</span>
              <span class="checkout__item-total">{{ formatCurrency(line.price * line.quantity) }}</span>
            </li>
          </ul>
          <div class="checkout__summary-row">
            <span>Items</span>
            <span>{{ count }}</span>
          </div>
          <div class="checkout__summary-row checkout__summary-row--total">
            <span>Total</span>
            <span>{{ formatCurrency(subtotal) }}</span>
          </div>
          <Button variant="primary" size="lg" :disabled="!canSubmit" @click="placeOrder">Place order</Button>
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout {
  padding: var(--space-5) 0;
}

.checkout__inner {
  max-width: var(--v3-container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.checkout__title {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 800;
}

.checkout__layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-5);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.checkout__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.checkout__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
}

.checkout__section-title {
  margin: 0 0 var(--space-2);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.checkout__field {
  display: flex;
  flex-direction: column;
}

.checkout__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.checkout__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-default);
}

.checkout__summary-title {
  margin: 0 0 var(--space-1);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.checkout__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.checkout__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-regular);
  font-size: var(--font-size-sm);
}

.checkout__item-emoji {
  font-size: 20px;
}

.checkout__item-name {
  flex: 1;
}

.checkout__item-total {
  color: var(--color-text-primary);
  font-weight: 600;
}

.checkout__summary-row {
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

.checkout__success,
.checkout__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}

.checkout__success-icon {
  font-size: 64px;
}

.checkout__success-title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 800;
}

.checkout__success-text {
  max-width: 420px;
  margin: 0;
  color: var(--color-text-regular);
  font-size: var(--font-size-md);
}
</style>
