import { run } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { Observable } from 'rx'
const { just } = Observable

const main = ({ DOM, HTTP }) => ({
  DOM: HTTP.mergeAll()
    .map(res => res.text)
    .startWith('loading...')
    .map(text => <div>
      <h1>result: { text }</h1>
    </div>),
  HTTP: just({ url: '/graphql' })
})

run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
})


