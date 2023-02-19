import Checkout from './Checkout'
import pricingRules from '../data/pricingRules'
import { SKU_CLASSIC, SKU_STANDOUT, SKU_PREMIUM } from '../data/inventory'

// Integration tests for TDD
test('Integration: Scenario 1 - Default', () => {
  const co = new Checkout()
  co
    .add(SKU_CLASSIC)
    .add(SKU_STANDOUT)
    .add(SKU_PREMIUM)
  expect(co.total()).toBe(987.97)
})

test('Integration: Scenario 2 - SecondBite', () => {
  const co = new Checkout(pricingRules.SecondBite)
  co
    .add(SKU_CLASSIC)
    .add(SKU_CLASSIC)
    .add(SKU_CLASSIC)
    .add(SKU_PREMIUM)
  expect(co.total()).toBe(934.97)
})

test('Integration: Scenario 3 - Axil Coffee Roasters', () => {
  const co = new Checkout(pricingRules['Axil Coffee Roasters'])
  co
    .add(SKU_STANDOUT)
    .add(SKU_STANDOUT)
    .add(SKU_STANDOUT)
    .add(SKU_PREMIUM)
  expect(co.total()).toBe(1294.96)
})

test('Integration: Scenario 4 - MYER (Bonus)', () => {
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
