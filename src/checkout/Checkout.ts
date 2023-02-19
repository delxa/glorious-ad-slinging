/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* Will remove the above later once I've resolved this. */
import inventory from '../data/inventory'

export const DISCOUNT_NTH_ITEM = 'nthItem'
export const DISCOUNT_ITEM_DISCOUNT = 'itemDiscount'

interface PricingRule {
  type: string
  sku: string
  price: number
  qty?: number
}

interface InventoryItem {
  sku: string
  price: number
  currency: string
  name: string
  description: string
}

interface SkuPriceIndex {
  [key: string]: number
}

/**
 * Checkout offers behaviors consistent with the way many checkouts behave, as well as some discounting logic
 */
export default class Checkout {
  // Not yet sure of the shape of the state type so going to leave as `any` for now.
  private state: any

  /**
   * Returns a new instance of the checkout with the given pricing rules
   * @param {Object} pricingRules - A map of companies and their discount entitlements
   * @constructor
   */
  constructor (pricingRules: PricingRule[] = []) {
    this.state = {
      pricingRules,
      inventory,
      skuPrices: this.indexPricesBySku(inventory),
      items: [],
      totals: {
        subtotal: 0,
        discountTotal: 0,
        total: 0
      }
    }
  }

  /**
   * Add a listing type to cart, based on the given SKU. This will cause a recalculation of discount/total states.
   * @param {string} sku - The SKU of the Ad Type to add to the cart
   * @returns {Checkout} - Returns this to allow chaining of add items
   * @public
   */
  add (sku: string): Checkout {
    const state = this.state
    const { items } = state

    // Set new state
    this.setState({
      ...state,
      items: [...items, sku]
    })

    // Trigger retotal event
    this.calculateTotals()
    return this
  }

  /**
   * Returns the total of the cart including any applied discounts.
   * @returns {number} The total amount owing, given the cart contents and applied discount
   * @public
   */
  total (): number {
    return this.state.totals.total
  }

  /**
   * Set the state of the checkout component to the one given
   * @param {any} nextState - The state that will replace this one.
   * @private
   */
  private setState (nextState: any): void {
    this.state = nextState
  }

  /**
   * Updates the totals based on the cart items and applicable discounts
   * @private
   */
  private calculateTotals (): void {
    const state = this.state

    // Derrive new totalState
    const subtotal = this.calculateSubtotals()
    const discount = this.calculateDiscounts()
    const total = subtotal - discount
    const totals = {
      subtotal,
      discount,
      total
    }

    // Set new state
    this.setState({
      ...state,
      totals
    })
  }

  /**
   * Calculate the subtotal for the cart based on the items
   * @returns {number} - The subtotal for the cart contents
   * @private
   */
  private calculateSubtotals (): number {
    const { items, skuPrices } = this.state

    // total up items using a reduce
    return items.reduce((a: number, c: string) => {
      return a + skuPrices[c]
    }, 0)
  }

  /**
   * Get the total discount value for the order based on pricing rules and cart contents. Mocked as 0 for now.
   * @returns {number} - The total value of discounts applied
   * @private
   */
  private calculateDiscounts (): number {
    const { items, pricingRules, skuPrices } = this.state

    // evaluate pricing rules
    return pricingRules.reduce((a: number, c: PricingRule) => {
      switch (c.type) {
        case DISCOUNT_NTH_ITEM:
          return a + this.handleNthItemDiscount(c, items, skuPrices)
        case DISCOUNT_ITEM_DISCOUNT:
          return a + this.handleItemDiscount(c, items, skuPrices)
        default:
          // Undefined discount type. Probably should throw an exception.
          return a
      }
    }, 0)
  }

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
  private handleNthItemDiscount (ruleParams: PricingRule, cartItems: string[], skuPrices: SkuPriceIndex): number {
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
  private handleItemDiscount (ruleParams: PricingRule, cartItems: string[], skuPrices: SkuPriceIndex): number {
    const { sku, price } = ruleParams
    const fullPrice = skuPrices[sku]
    const applicableItems = cartItems.filter(item => item === sku)
    const numberTimesApplied = applicableItems.length
    return numberTimesApplied * (fullPrice - price)
  }

  /**
   * Pure function to reduce a list of inventory to a map of prices indexed by sku
   * @param {InventoryItem[]} inventory - The list of inventory items to index
   * @returns {SkuPriceIndex} - The index of prices
   */
  private indexPricesBySku (inventory: InventoryItem[]): SkuPriceIndex {
    return inventory.reduce((a: any, c: InventoryItem) => {
      return { ...a, [c.sku]: c.price }
    }, {})
  }
}
