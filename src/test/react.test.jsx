import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Calculadora } from '../Calculadora'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const operatios = ['+', '-', '/', '*']// Change these icons if you want to use another one

const equalSign = '='// Change this icon if you want to use another one

describe('<Calculadora/>', () => {
  beforeEach(() => { render(<Calculadora />) })
  afterEach(cleanup)// Cleanup cierra el render despues de cada test sino generaria una cola de renders
  it('Should render the title "Calculadora', () => {
    screen.getByText(/Calculadora/i)
  })
  it('Should render four rows with the numbers 9 to 0', () => {
    const rows = screen.getAllByRole('row')
    numbers.forEach(number => screen.getByText(number.toString()))
    expect(rows.length).toBe(4)
  })
  it('Should render all operations', () => {
    operatios.forEach(operation => screen.getByText(operation))
  })
  it('Should render an equal symbol = ', () => {
    screen.getByText(equalSign)
  })
  it('Should render a button C ', () => {
    screen.getByText('C')
  })
  it('Should render ←', () => {
    screen.getByText('←')
  })
  it('Should render an input', () => {
    screen.getByRole('output')
  })
  it('The output should have the value of all the numbers that are pressed', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const two = screen.getByText('2')
    fireEvent.click(two)
    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('output')
    expect(input.value).toBe('123')
  })
  it('Should the output render the symbols', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+1')
  })
  it('It should clear the output when pressing C', () => {
    const setOutput = screen.getByText('C')
    const one = screen.getByText('1')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(setOutput)
    expect(input.value).toBe('')
  })
  it('You should delete the last number by pressing ←', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText(operatios[0])
    const del = screen.getByText('←')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(del)
    expect(input.value).toBe('1')
  })
  it('It should return the result of the operation', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const sum = screen.getByText(operatios[0])
    fireEvent.click(sum)
    fireEvent.click(one)// 1 + 1
    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)
    const input = screen.getByRole('output')
    expect(input.value).toBe('2')
  })
})

describe('<Calculadora N2>', () => {
  beforeEach(() => { render(<Calculadora />) })
  afterEach(cleanup)
  it('It should not allow to get the result if the operation is wrong "1+ || 1*5+"', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText(operatios[0])
    const resu = screen.getByText('=')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(resu)
    expect(input.value).toBe('1+')
  })
  it('It should not allow placing a sign if there is no number', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText(operatios[0])
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
  it('It should not allow placing multiple trade signs in a row', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText(operatios[0])
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(sum)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+')
  })
  it('I should be able to do another operation with the result', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText(operatios[0])
    const equal = screen.getByText('=')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(one)
    fireEvent.click(equal)
    fireEvent.click(sum)
    fireEvent.click(one)
    expect(input.value).toBe('2+1')
  })
  it('It should render the keys pressed in the output only if they are numbers or symbols', () => {
    const input = screen.getByRole('output')
    fireEvent.focus(input)
    fireEvent.keyDown(input, {
      charCode: 49,
      code: 'Numpad1',
      key: '1'
    })
    fireEvent.keyDown(input, {
      charCode: 107,
      code: 'NumpadAdd',
      key: '+'
    })
    fireEvent.keyDown(input, {
      charCode: 49,
      code: 'Numpad1',
      key: '1'
    })
    fireEvent.keyDown(input, {
      charCode: 65,
      code: 'KeyA',
      key: 'a'
    })
    expect(input.value).toBe('1+1')
  })
  it('should delete the last number when press the key backspace', () => {
    const input = screen.getByRole('output')
    // fireEvent.focus(input)
    fireEvent.keyDown(input, {
      charCode: 49,
      code: 'Numpad1',
      key: '1'
    })
    fireEvent.keyDown(input, {
      charCode: 107,
      code: 'NumpadAdd',
      key: '+'
    })
    fireEvent.keyDown(input, {
      charCode: 49,
      code: 'Numpad1',
      key: '1'
    })
    fireEvent.keyDown(input, {
      charCode: 8,
      code: 'Backspace',
      key: 'Backspace'
    })
    expect(input.value).toBe('1+')
  })
  it('Pressing Enter should show the result', () => {
    const one = screen.getByText('1')
    const add = screen.getByText(operatios[0])
    fireEvent.click(one)
    fireEvent.click(add)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    fireEvent.keyDown(input, {
      charCode: 13,
      code: 'Enter',
      key: 'Enter'
    })
    expect(input.value).toBe('2')
  })
})
