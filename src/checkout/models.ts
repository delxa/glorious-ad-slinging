export interface PricingRule {
  type: string
  sku: string
  price: number
  qty?: number
}

export interface InventoryItem {
  sku: string
  price: number
  currency: string
  name: string
  description: string
}

export interface SkuPriceIndex {
  [key: string]: number
}

export interface CartTotals {
  subtotal: number
  discountTotal: number
  total: number
}

export interface CheckoutState {
  pricingRules: PricingRule[]
  inventory: InventoryItem[]
  skuPrices: SkuPriceIndex
  items: string[]
  totals: CartTotals
}
