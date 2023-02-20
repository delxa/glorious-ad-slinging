import { SKU_CLASSIC, SKU_PREMIUM } from './constants'
import { handleNthItemDiscount, handleItemDiscount } from './discounts'

/** Convenience function to avoid string repetition */
function fillArrayWithItem (item: string, qty: number): string[] {
  const product = []
  while (product.length < qty) {
    product.push(item)
  }
  return product
}

const mockPrices = {
  [SKU_CLASSIC]: 10,
  [SKU_PREMIUM]: 20
}

describe('Discount Unit Tests', () => {
  describe('handleNthItemDiscount()', () => {
    const mockNthRule = {
      qty: 3,
      price: 0,
      sku: SKU_CLASSIC,
      type: 'test'
    }

    describe('given a qty parameter of 3', () => {
      test('No free item if 2 items', () => {
        const discountTotal = handleNthItemDiscount(mockNthRule, fillArrayWithItem(SKU_CLASSIC, 2), mockPrices)
        expect(discountTotal).toBe(0)
      })
      test('The third item is free with 3 items', () => {
        const discountTotal = handleNthItemDiscount(mockNthRule, fillArrayWithItem(SKU_CLASSIC, 3), mockPrices)
        expect(discountTotal).toBe(10)
      })
      test('Only the third item is free when 5 items', () => {
        const discountTotal = handleNthItemDiscount(mockNthRule, fillArrayWithItem(SKU_CLASSIC, 5), mockPrices)
        expect(discountTotal).toBe(10)
      })
      test('Two free items when 6 items', () => {
        const discountTotal = handleNthItemDiscount(mockNthRule, fillArrayWithItem(SKU_CLASSIC, 6), mockPrices)
        expect(discountTotal).toBe(20)
      })
    })
  })
  describe('given a mixed cart of ad types', () => {
    const mockNthRule = {
      qty: 3,
      price: 0,
      sku: SKU_PREMIUM,
      type: 'test'
    }

    test('3 classic and 2 premium ads gives no discount', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 3)
      const p = fillArrayWithItem(SKU_PREMIUM, 2)
      const discountTotal = handleNthItemDiscount(mockNthRule, [...c, ...p], mockPrices)
      expect(discountTotal).toBe(0)
    })
    test('3 classic and 3 premium ads discounts one of the premium ads', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 3)
      const p = fillArrayWithItem(SKU_PREMIUM, 3)
      const discountTotal = handleNthItemDiscount(mockNthRule, [...c, ...p], mockPrices)
      expect(discountTotal).toBe(20)
    })
    test('3 classic and 6 premium ads discounts two of the premium ads', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 3)
      const p = fillArrayWithItem(SKU_PREMIUM, 6)
      const discountTotal = handleNthItemDiscount(mockNthRule, [...c, ...p], mockPrices)
      expect(discountTotal).toBe(40)
    })
  })

  describe('handleItemDiscount()', () => {
    const mockTypeRule = {
      price: 15,
      sku: SKU_PREMIUM,
      type: 'test'
    }

    test('no ads of the target type yields no discount', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 3)
      const discountTotal = handleItemDiscount(mockTypeRule, c, mockPrices)
      expect(discountTotal).toBe(0)
    })
    test('a single of the target type yields a discount once', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 3)
      const p = fillArrayWithItem(SKU_PREMIUM, 1)
      const discountTotal = handleItemDiscount(mockTypeRule, [...c, ...p], mockPrices)
      expect(discountTotal).toBe(5)
    })
    test('several of the target type yields a discount multiple times', () => {
      const c = fillArrayWithItem(SKU_CLASSIC, 1)
      const p = fillArrayWithItem(SKU_PREMIUM, 2)
      const discountTotal = handleItemDiscount(mockTypeRule, [...c, ...p], mockPrices)
      expect(discountTotal).toBe(10)
    })
  })
})
