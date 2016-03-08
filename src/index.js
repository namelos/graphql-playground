import Rx from 'rxjs/Rx'
const { Observable } = Rx
const { of, from } = Observable
const log = console.log.bind(console)

const data = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2',
  'ITEM000005',
  'ITEM000005',
  'ITEM000005'
]

const dict = {
  ITEM000001: {
    name: 'ball',
    price: 1,
    unit: ''
  },
  ITEM000003: {
    name: 'apple',
    price: 5.5,
    unit: ''
  },
  ITEM000005: {
    name: 'coke',
    price: 3,
    unit: ''
  }
}

const parseString = item => {
  const pair = item.split('-')
  const category = pair[0]
  const quantity = parseInt(pair[1] || 1)
  return { category, quantity }
}
const categoryOfItem = item => item.category
const sumQuantity = (x, y) => ({ ...x, quantity: x.quantity + y.quantity })
const searchDict = item => ({ ...dict[item.category], ...item })
const subtotal = item => ({ subtotal: item.price * item.quantity, ...item })

const model$ = from(data)
  .map(parseString)
  .groupBy(categoryOfItem)
  .flatMap(item$ => item$.reduce(sumQuantity))
  .map(searchDict)
  .map(subtotal)

const subtotalOfItem = item => item.subtotal
const total = (x, y) => x + y

const total$ = model$
  .map(subtotalOfItem)
  .reduce(total)
  .subscribe(log)
