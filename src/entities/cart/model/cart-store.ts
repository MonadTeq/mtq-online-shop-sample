export interface CartLine {
  productId: string
  name: string
  price: number
  emoji: string
  tone: string
  quantity: number
}

export type CartLineInput = Omit<CartLine, "quantity">

const STORAGE_KEY = "acmeteq-cart"

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

/** Shopping cart store (persisted to localStorage) */
export const useCartStore = defineStore("cart", () => {
  const lines = ref<CartLine[]>(loadLines())

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))

  const subtotal = computed(() => lines.value.reduce((sum, line) => sum + line.price * line.quantity, 0))

  const isEmpty = computed(() => lines.value.length === 0)

  watch(lines, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, { deep: true })

  function add(input: CartLineInput, quantity = 1) {
    const existing = lines.value.find(line => line.productId === input.productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      lines.value.push({ ...input, quantity })
    }
  }

  function setQuantity(productId: string, quantity: number) {
    const line = lines.value.find(item => item.productId === productId)
    if (!line) return
    line.quantity = Math.max(1, quantity)
  }

  function remove(productId: string) {
    lines.value = lines.value.filter(line => line.productId !== productId)
  }

  function clear() {
    lines.value = []
  }

  return { lines, count, subtotal, isEmpty, add, setQuantity, remove, clear }
})
