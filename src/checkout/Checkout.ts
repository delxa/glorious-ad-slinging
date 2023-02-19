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
   */
  calculateTotals (): void {
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
   */
  private calculateSubtotals (): number {
    const { items, inventory } = this.state
    // create a index of prices by sku for easy look-up
    const pricesBySku = inventory.reduce((a: any, c: InventoryItem): SkuPriceIndex => {
      return { ...a, [c.sku]: c.price }
    }, {})

    // total up items using a reduce
    return items.reduce((a: number, c: string) => {
      return a + pricesBySku[c]
    }, 0)
  }

  /**
   * Get the total discount value for the order based on pricing rules and cart contents. Mocked as 0 for now.
   * @returns {number} - The total value of discounts applied
   */
  private calculateDiscounts (): number {
    return 0
  }
}
