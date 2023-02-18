export const SKU_CLASSIC = 'classic'
export const SKU_STANDOUT = 'standout'
export const SKU_PREMIUM = 'premium'
export const CURRENCY_AUD = 'AUD'
const inventory = [
  {
    sku: SKU_CLASSIC,
    price: 269.99,
    currency: CURRENCY_AUD,
    name: 'Classic Ad',
    description: 'Offers the most basic level of advertisement.'
  },
  {
    sku: SKU_STANDOUT,
    price: 322.99,
    currency: CURRENCY_AUD,
    name: 'Standout Ad',
    description: 'Allows advertisers to use a company logo and use a longer presentation text'
  },
  {
    sku: SKU_PREMIUM,
    price: 394.99,
    currency: CURRENCY_AUD,
    name: 'Premium Ad',
    description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility'
  }
]

export default inventory
