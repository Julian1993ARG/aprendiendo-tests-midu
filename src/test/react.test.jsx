import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useState } from 'react'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const operatios = ['-', '+', '/', '*']
const rows = [
  [7, 8, 9],
  [6, 5, 4],
  [3, 2, 1],
  [0]
]

const Calculadora = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <h1>Calculadora</h1>
      <div role='grid'>
        <input role='output' value={value} readOnly />
        {
          rows.map((row, inx) => (
            <div key={inx} role='row'>
              {row.map(number => (<button onClick={() => setValue(number)} key={number}>{number}</button>))}
            </div>
          ))
        }
        {operatios.map((operation, i) => <span key={i}>{operation}</span>)}
      </div>
      <span>=</span>
    </>
  )
}

describe('Calculadora', () => {
  afterEach(cleanup)// Cleanup cierra el render despues de cada test sino generaria una cola de renders
  it('Deberia renderizar el componente', () => {
    render(<Calculadora />)
  })
  it('deberia tener un titulo Calculadora', () => {
    render(<Calculadora />)
    screen.getByText('Calculadora')
  })
  it('Deberia renderizar los numeros del 0 al 9', () => {
    render(<Calculadora />)
    numbers.forEach(number => screen.getByText(number))
  })
  it('Deberia renderizar 4 filas con los numeros', () => {
    render(<Calculadora />)
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })
  it('Deberia renderizar todas las operaciones', () => {
    render(<Calculadora />)
    operatios.forEach(operation => screen.getByText(operation))
  })
  it('Deberia renderizar el simbolo = ', () => {
    render(<Calculadora />)
    screen.getByText('=')
  })
  it('Deberia renderizar un imput', () => {
    render(<Calculadora />)
    screen.getByRole('output')
  })
  it('Deberia el input tener el value 1 cuando este se presione', () => {
    render(<Calculadora />)

    const one = screen.getByText('1')
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
})
