import { evaluate } from 'mathjs'
import { useState } from 'react'

const operatios = ['-', '+', '/', '*']
const rows = [
  [7, 8, 9],
  [6, 5, 4],
  [3, 2, 1],
  [0]
]
const equalSign = '='

export const Calculadora = () => {
  const [value, setValue] = useState('')

  const addOutputNumber = op => {
    console.log(op)
    setValue(value.toString().concat(op))
  }
  const addOutputOperation = op => {
    if (value.length) {
      const last = value.split('').pop()
      if (!isNaN(parseInt(last))) { setValue(value.concat(op)) }
    }
  }
  const result = op => {
    const last = value.split('').pop()
    !isNaN(parseInt(last)) && setValue(evaluate(op).toString())
  }
  const onKeyDown = e => {
    e.key === 'Enter' && result(value)
    !isNaN(parseInt(e.key)) && addOutputNumber(e.key)

    const simbol = operatios.find(operator => operator === e.key)
    simbol && addOutputOperation(e.key)
  }
  const deleteLast = () => {
    console.log('Aqui2')
    if (value.length) {
      console.log('Aqui')
      setValue(value.substring(0, value.length - 1))
    }
  }

  return (
    <div>
      <h1>Calculadora</h1>
      <div role='grid' onKeyDown={onKeyDown}>
        <input role='output' value={value} readOnly />
        <button onClick={deleteLast}>←</button>
        {
          rows.map((row, inx) => (
            <div key={inx} role='row'>
              {row.map(number => (<button onClick={() => addOutputNumber(number)} key={number}>{number}</button>))}
            </div>
          ))
        }
        {operatios.map((operation, i) => <button onClick={() => addOutputOperation(operation)} key={i}>{operation}</button>)}
        <button onClick={() => setValue('')}>C</button>
      </div>
      <button onClick={() => result(value)}>{equalSign}</button>
    </div>
  )
}
