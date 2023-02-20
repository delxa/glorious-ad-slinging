import Checkout from './Checkout'
import pricingRules from '../data/pricingRules'
import { SKU_CLASSIC, SKU_STANDOUT, SKU_PREMIUM } from './constants'

// Integration tests for TDD
describe('Integration Tests', () => {
  test('Scenario 1 - Default', () => {
    const co = new Checkout()
    co
      .add(SKU_CLASSIC)
      .add(SKU_STANDOUT)
      .add(SKU_PREMIUM)
    expect(co.total()).toBe(987.97)
  })

  test('Scenario 2 - SecondBite', () => {
    const co = new Checkout(pricingRules.SecondBite)
    co
      .add(SKU_CLASSIC)
      .add(SKU_CLASSIC)
      .add(SKU_CLASSIC)
      .add(SKU_PREMIUM)
    expect(co.total()).toBe(934.97)
  })

  test('Scenario 3 - Axil Coffee Roasters', () => {
    const co = new Checkout(pricingRules['Axil Coffee Roasters'])
    co
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_PREMIUM)
    expect(co.total()).toBe(1294.96)
  })

  test('Scenario 4 - MYER (Bonus)', () => {
    const co = new Checkout(pricingRules.MYER)
    co
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_PREMIUM)
    expect(co.total()).toBe(1681.95)
  })

  test('Scenario 5 - Carsales (Ultra Bonus)', () => {
    const co = new Checkout(pricingRules.Carsales)
    co
      .add(SKU_CLASSIC)
      .add(SKU_CLASSIC)
      .add(SKU_CLASSIC) // 679.97
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT)
      .add(SKU_STANDOUT) // 1128.96
      .add(SKU_PREMIUM) // 359.99
    expect(co.total()).toBe(2168.92)
  })
})
