import { useCartStore } from "@/entities/cart"
import type { Product } from "@/entities/product"

/** Add-to-cart scenario: adds a product to the cart and confirms with a toast */
export function useAddToCart() {
  const cartStore = useCartStore()

  function addToCart(product: Product, quantity = 1) {
    cartStore.add(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        tone: product.tone
      },
      quantity
    )
    ElMessage.success(`${product.name} added to cart`)
  }

  return { addToCart }
}
