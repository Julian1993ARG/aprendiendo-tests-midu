import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Calculadora } from '../Calculadora'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const operatios = ['-', '+', '/', '*']

const equalSign = '='

describe('Calculadora', () => {
  beforeEach(() => { render(<Calculadora />) })
  afterEach(cleanup)// Cleanup cierra el render despues de cada test sino generaria una cola de renders
  it('Deberia renderizar el componente', () => {

  })
  it('deberia tener un titulo Calculadora', () => {
    screen.getByText('Calculadora')
  })
  it('Deberia renderizar los numeros del 0 al 9', () => {
    numbers.forEach(number => screen.getByText(number))
  })
  it('Deberia renderizar 4 filas con los numeros', () => {
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })
  it('Deberia renderizar todas las operaciones', () => {
    operatios.forEach(operation => screen.getByText(operation))
  })
  it('Deberia renderizar el simbolo = ', () => {
    screen.getByText('=')
  })
  it('Debe renderizar el boton C ', () => {
    screen.getByText('C')
  })
  it('Debe renderizar ←', () => {
    screen.getByText('←')
  })
  it('Deberia renderizar un imput', () => {
    screen.getByRole('output')
  })
  it('Deberia el output tener el value 1 cuando este se presione', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
  it('Deberia el output tener el value de todos los numeros que se presionen', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const two = screen.getByText('2')
    fireEvent.click(two)
    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('output')
    expect(input.value).toBe('123')
  })
  it('Deberia el output renderizar los simbolos', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+1')
  })
  it('Deberia borrar el output al presionar C', () => {
    const setOutput = screen.getByText('C')
    const one = screen.getByText('1')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(setOutput)
    expect(input.value).toBe('')
  })
  it('Deberia borrar el ultimo numero al presionar ←', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    const del = screen.getByText('←')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(del)
    expect(input.value).toBe('1')
  })
  it('Deberia devolver el resultado de la operacion', () => {
    const one = screen.getByText('1')
    fireEvent.click(one)
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)// 1 + 1
    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)
    const input = screen.getByRole('output')
    expect(input.value).toBe('2')
  })
})

describe('Test nivel medio', () => {
  beforeEach(() => { render(<Calculadora />) })
  afterEach(cleanup)
  it('No deberia permitir obtener el resultado si la operacion es incorrecta "1+ || 1*5+"', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    const resu = screen.getByText('=')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(resu)
    expect(input.value).toBe('1+')
  })
  it('No deberia permitir colocar un signo sino existe un numero', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
  it('No deberia permitir colocar varios signos de operaciones seguidos', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(sum)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+')
  })
  it('Deberia poder hacer otro calculo con el resultado de una operacion', () => {
    const one = screen.getByText('1')
    const sum = screen.getByText('+')
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
  it('Deberia renderizar las teclas presionadas en el output solo si son numeros o simbolos', () => {
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
  it('Al presionar enter debe mostrar el resultado', () => {
    const one = screen.getByText('1')
    const add = screen.getByText('+')
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
