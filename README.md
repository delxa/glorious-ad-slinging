# glorious-ad-slinging

[![Tests](https://github.com/delxa/glorious-ad-slinging/actions/workflows/test.yml/badge.svg)](https://github.com/delxa/glorious-ad-slinging/actions/workflows/test.yml)

## Intro

I like to map out some of my thinking prior to cutting code and then follow up with specific comments around what has been implemented.

## Quickstart

This solution has been built in Javascript targeting Node.js v18.x.

Clone this repo and install dependencies:

```bash
git clone git@github.com:delxa/glorious-ad-slinging.git
cd glorious-ad-slinging
npm install
```

Run linting and tests: `npm run test`
Run demo UI: `npm run dev`

## Pre-implementation and design notes

Here's some initial thinking on the solution.

### Requirements

Breaking down a high-level, itemised list of what I think needs to be done:

- Checkout class with interfaces as described
- Basic inventory service with static representation of advertisement types
- Pricing rules engine that is extensible and supports two initial types of discounts:
  - nth Item Free
  - Item Discount
- Notation for pricing rules that maps the determines the available discounts and their parameters based on the customer

By way of the supporting requirements, I would like to include:

- Integration tests for asserting against the test scenarios documented
- Unit tests for the individual methods and helpers making up the class
- Typescript
- Linting, probably with Standard.js
- JSDoc comments, (Optionally, I may include the lib to generate the docs)

I would also like GitHub actions to trigger on each push to assert against the testing suite

### Approach

I think I'm going to go with a Front-end approach it will be easier to demonstrate the flexibility of the cart logic and the tooling to scaffold out a running app is good. Obvious downside is the installed size.

1. Get this readme committed ✅
2. Scaffold out a frontend Typescript / React app with Vite ✅
3. Write integration tests based on scenarios, adding JEST ✅
4. Establish the class and methods with types ✅
5. Add GHA workflow to run tests ✅
6. Main implementation ✅
7. Unit tests ✅
8. Doco and submission 

### Pricing rules

The most complex aspect of this solution is the pricing rules. This is where I anticipate any extension work will likely occur. A bit of up-front design work here is warranted.

Pricing rules consist of two elements:

- Conditions: Does this pricing rule apply to the cart based on the contents?
- Effect: What effect does this rule have on the total price or the item price?

For ease of describing pricing rules, these can be types with specific parameters that will map to condition and effect logic in the Pricing Engine

```javascript
const nthItemFreeRule = {
  type: 'nthItem',
  sku: 'classic',
  qty: 3,
  price: 0,
  maxDiscounted: 3
}

const itemDiscountRule = {
  type 'itemDiscount',
  sku: 'standout',
  price: 299.99
}
```

For the sake of versatility, `price` would actually be nice to be able to specify as either an absolute price, a relative decrease in price or a relative percentage decrease in price. Calling it `priceEffect` and some string-based notation is maybe a nice way to accomplish this while keeping TypeScript happy.

An important distinction between the two types of rules is the layer at which their conditions apply. `itemDiscount` rule applies regardless of the rest of the cart contents. `nthItem` condition is assserted against the cart having a certain quantity of the requisite ads.

## Implementation notes

- I kept the checkout state rather simple, especially in terms of the items, keeping them as a basic string array
- I added a basic rounding implementation that is used during totaling to ensure max of two decimal places
- Discount logic is stateless and easily built on. A few supporting unit tests here as this is the most crucial logic.
- I think Typescript has added a bit of lag around running the tests but definitely avoided a few snafus along the way
- Standard.js also caught a few gotchas and highlighted a few improvements.
- You can probably tell I like reducers a lot. 😂
- I would have loved to polish the UI more but it was more important to have just enough in place to demo.
- If I had more time, I would have liked to have exposed discounted pricing to the UI for Ad Tiers based on pricing rules.