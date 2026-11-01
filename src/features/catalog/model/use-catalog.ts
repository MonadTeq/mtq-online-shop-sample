import { useProductStore } from "@/entities/product"

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating"

/** Catalog browsing scenario: search, category filter and sorting over the product list */
export function useCatalog() {
  const productStore = useProductStore()

  const searchQuery = ref("")

  const activeCategory = ref<string | null>(null)

  const sortBy = ref<SortOption>("featured")

  const filteredProducts = computed(() => {
    let list = productStore.products

    const query = searchQuery.value.trim().toLowerCase()
    if (query) {
      list = list.filter(product => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query))
    }

    if (activeCategory.value) {
      list = list.filter(product => product.category === activeCategory.value)
    }

    const sorted = [...list]
    switch (sortBy.value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return sorted
  })

  function setCategory(category: string | null) {
    activeCategory.value = category
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSort(value: SortOption) {
    sortBy.value = value
  }

  return { searchQuery, activeCategory, sortBy, filteredProducts, setCategory, setSearchQuery, setSort }
}
