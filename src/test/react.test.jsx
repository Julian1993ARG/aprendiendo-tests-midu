import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const operatios = ['-', '+', '/', '*']
const rows = [
  [7, 8, 9],
  [6, 5, 4],
  [3, 2, 1],
  [0]
]
const Calculadora = () => {
  return (
    <>
      <h1>Calculadora</h1>
      <div role='grid'>
        {
          rows.map((row, inx) => (
            <div key={inx} role='row'>
              {row.map(number => (<span key={number}>{number}</span>))}
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
  it('Deberia reenderizar el componente', () => {
    render(<Calculadora />)
  })
  it('deberia tener un titulo Calculadora', () => {
    render(<Calculadora />)
    screen.getByText('Calculadora')
  })
  it('Deberia reenderizar los numeros del 0 al 9', () => {
    render(<Calculadora />)
    numbers.forEach(number => screen.getByText(number))
  })
  it('Deberia reenderizar 4 filas con los numeros', () => {
    render(<Calculadora />)
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })
  it('Deberia reenderizar todas las operaciones', () => {
    render(<Calculadora />)
    operatios.forEach(operation => screen.getByText(operation))
  })
  it('Deberia reenderizar el simbolo = ', () => {
    render(<Calculadora />)
    screen.getByText('=')
  })
})
