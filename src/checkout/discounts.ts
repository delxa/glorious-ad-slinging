import {
  PricingRule,
  SkuPriceIndex
} from './models'
/**
 * DISCOUNT HANDLERS
 * These are intentionally stateless so as to be independent from the class and easily testable.
 * I may move these before I'm done.
 */

/**
 * Evaluate cart contents against the conditions for nthItemDiscounts and apply affects as required
 * @param {PricingRule} ruleParams - The parameters of the pricing rule to evaluate
 * @param {string[]} cartItems - The contents of the cart
 * @param {SkuPriceIndex} skuPrices - The unit costs as a map of prices to SKU
 * @returns The total value of discounts based on the conditions and effects
 * @private
 */
export function handleNthItemDiscount (ruleParams: PricingRule, cartItems: string[], skuPrices: SkuPriceIndex): number {
  const { sku, price, qty } = ruleParams
  if (qty === undefined) return 0
  const fullPrice = skuPrices[sku]
  const applicableItems = cartItems.filter(item => item === sku)
  const numberTimesApplied = Math.floor(applicableItems.length / qty)
  return numberTimesApplied * (fullPrice - price)
}

/**
 * Evaluate cart contents against the conditions for itemDiscounts and apply affects as required
 * @param {PricingRule} ruleParams - The parameters of the pricing rule to evaluate
 * @param {string[]} cartItems - The contents of the cart
 * @param {SkuPriceIndex} skuPrices - The unit costs as a map of prices to SKU
 * @returns The total value of discounts based on the conditions and effects
 * @private
 */
export function handleItemDiscount (ruleParams: PricingRule, cartItems: string[], skuPrices: SkuPriceIndex): number {
  const { sku, price } = ruleParams
  const fullPrice = skuPrices[sku]
  const applicableItems = cartItems.filter(item => item === sku)
  const numberTimesApplied = applicableItems.length
  return numberTimesApplied * (fullPrice - price)
}
