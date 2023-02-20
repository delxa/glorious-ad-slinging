import { FC, useState } from 'react'
import './App.css'
import Checkout from './checkout/Checkout'
import inventory from './data/inventory'
import pricingRules from './data/pricingRules'

const co = new Checkout(pricingRules.Carsales)

const App: FC = () => {
  const [checkoutState, setCheckoutState] = useState(co.getState())
  const { subtotal, discountTotal, total } = checkoutState.totals

  // Cheeky action to hook in to UI
  const addCartItem = (sku: string): void => {
    co.add(sku)
    setCheckoutState(co.getState())
  }

  const emptyCart = (): void => {
    co.empty()
    setCheckoutState(co.getState())
  }

  return (
    <div className='App'>
      <h1>Glorious Ad Slinging 💰</h1>
      <div className='cardstack'>
        {inventory.map(({ sku, price, name, description }, idx) => (
          <div className='card' key={`${sku}-${idx}`}>
            <h3>{name}</h3>
            <h5>from <em>${price}</em></h5>
            <p>{description}</p>
            <p><button onClick={() => addCartItem(sku)}>Add to cart</button></p>
          </div>
        ))}
      </div>
      <div>
        <h4>Pricing Rules</h4>
        <p>These are from the Carsales example.</p>
        <div className='pricingJson'>
          <pre>{JSON.stringify(pricingRules.Carsales, null, 2)}</pre>
        </div>
      </div>
      <div className='cart'>
        <table>
          <tbody>
            <tr>
              <th>Subtotal</th>
              <td>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Discount Total</th>
              <td><em>${discountTotal.toFixed(2)}</em></td>
            </tr>
            <tr>
              <th>Total</th>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => emptyCart()}>Empty cart</button>
      </div>
    </div>
  )
}

export default App
