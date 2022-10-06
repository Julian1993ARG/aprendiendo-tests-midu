import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Calculadora } from '../Calculadora'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const operatios = ['-', '+', '/', '*']

const equalSign = '='

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
  it('Debe renderizar el boton C ', () => {
    render(<Calculadora />)
    screen.getByText('C')
  })
  it('Deberia renderizar un imput', () => {
    render(<Calculadora />)
    screen.getByRole('output')
  })
  it('Deberia el output tener el value 1 cuando este se presione', () => {
    render(<Calculadora />)

    const one = screen.getByText('1')
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
  it('Deberia el output tener el value de todos los numeros que se presionen', () => {
    render(<Calculadora />)

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
    render(<Calculadora />)

    const one = screen.getByText('1')
    fireEvent.click(one)
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+1')
  })
  it('Deberia borrar el output al presionar C', () => {
    render(<Calculadora />)
    const setOutput = screen.getByText('C')
    const one = screen.getByText('1')
    const input = screen.getByRole('output')
    fireEvent.click(one)
    fireEvent.click(setOutput)
    expect(input.value).toBe('')
  })
  it('Deberia devolver el resultado de la operacion', () => {
    render(<Calculadora />)

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
  afterEach(cleanup)
  it('No deberia permitir colocar un signo sino existe un numero', () => {
    render(<Calculadora />)

    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    fireEvent.click(sum)
    fireEvent.click(one)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1')
  })
  it('No deberia permitir colocar varios signos de operaciones seguidos', () => {
    render(<Calculadora />)

    const one = screen.getByText('1')
    const sum = screen.getByText('+')
    fireEvent.click(one)
    fireEvent.click(sum)
    fireEvent.click(sum)
    const input = screen.getByRole('output')
    expect(input.value).toBe('1+')
  })
  it('Deberia poder hacer otro calculo con el resultado de una operacion', () => {
    render(<Calculadora />)

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
})
