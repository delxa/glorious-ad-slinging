const pricingRules = {
  SecondBite: [
    {
      type: 'nthItem',
      sku: 'classic',
      qty: 3,
      price: 0
    }
  ],
  'Axil Coffee Roasters': [
    {
      type: 'itemDiscount',
      sku: 'standout',
      price: 299.99
    }
  ],
  MYER: [
    {
      type: 'nthItem',
      sku: 'standout',
      qty: 5,
      price: 0
    },
    {
      type: 'itemDiscount',
      sku: 'premium',
      price: 389.99
    }
  ]
}
export default pricingRules
