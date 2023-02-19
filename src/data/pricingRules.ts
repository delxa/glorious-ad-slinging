import { SKU_CLASSIC, SKU_STANDOUT, SKU_PREMIUM } from './inventory'
import { DISCOUNT_NTH_ITEM, DISCOUNT_ITEM_DISCOUNT } from '../checkout/Checkout'

const pricingRules = {
  SecondBite: [
    {
      type: DISCOUNT_NTH_ITEM,
      sku: SKU_CLASSIC,
      qty: 3,
      price: 0
    }
  ],
  'Axil Coffee Roasters': [
    {
      type: DISCOUNT_ITEM_DISCOUNT,
      sku: SKU_STANDOUT,
      price: 299.99
    }
  ],
  MYER: [
    {
      type: DISCOUNT_NTH_ITEM,
      sku: SKU_STANDOUT,
      qty: 5,
      price: 0
    },
    {
      type: DISCOUNT_ITEM_DISCOUNT,
      sku: SKU_PREMIUM,
      price: 389.99
    }
  ]
}
export default pricingRules
