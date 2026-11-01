const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})

/** Format a number as USD currency */
export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}
