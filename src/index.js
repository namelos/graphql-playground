import { run } from '@cycle/core'
import { div, label, input, hr, h1, makeDOMDriver } from '@cycle/dom'

const main = ({ DOM }) => ({
  DOM: DOM.select('.field').events('input')
    .map(ev => ev.target.value)
    .startWith('')
    .map(name =>
      div([
        label('Name:'),
        input('.field', {attributes: {type: 'text'}}),
        hr(),
        h1('Hello ' + name),
      ])
    )
})

run(main, { DOM: makeDOMDriver(document.getElementById('app')) })
