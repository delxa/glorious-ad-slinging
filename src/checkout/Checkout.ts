import inventory from '../data/inventory'

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
  constructor (pricingRules: any = []) {
    this.state = {
      pricingRules,
      inventory,
      items: [],
      totals: {
        items: [],
        appliedDiscounts: [],
        order: {
          subtotal: 0,
          discountTotal: 0,
          total: 0
        }
      },
      log: []
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
    return 0
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
    const nextState = this.state

    // Derrive new totalState

    // Set new state
    this.setState(nextState)
  }
}
