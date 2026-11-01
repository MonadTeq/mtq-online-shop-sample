import { CATEGORIES, PRODUCTS } from "./product"
import type { Product } from "./product"

/** Product catalog store (static mock data; ready to be swapped for an API-backed store) */
export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>(PRODUCTS)

  const categories = computed(() => CATEGORIES)

  function getById(id: string) {
    return products.value.find(product => product.id === id)
  }

  return { products, categories, getById }
})
