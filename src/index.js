import { run } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'

run(({ DOM, HTTP }) => ({
  DOM: HTTP.mergeAll().map(res => res.text).startWith('please type url:')
    .map(text => <div>
      <input type="text" className="input" />
      <h1>response: { text }</h1>
    </div>),
  HTTP: DOM.select('.input').events('input').map(e => e.target.value)
    .map(val => ({ url: val, method: 'GET' }))
}), {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
})


