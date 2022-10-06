import { describe, it, expect } from 'vitest'
import fizzbuzz from '../fizzbuzz'

describe.skip('Fizzbuzz', () => {
  it('deberia ser una funcion', () => {
    expect(typeof fizzbuzz).toBe('function')
  })
  it('deberia lanzar un error si el parametro no existe', () => {
    expect(() => fizzbuzz()).toThrow()
  })
  it('Lanzar error si no se pasa un numero como parametro', () => {
    expect(() => fizzbuzz(NaN)).toThrow('El parametro debe ser un numero')
  })
  it('Lanzar error si no se un decimal como parametro', () => {
    expect(() => fizzbuzz(1.5)).toThrow('El parametro debe ser un entero')
  })
  it('Debe devolver 1 si 1 es pasado por parametro', () => {
    expect(fizzbuzz(1)).toBe(1)
  })
  it('Debe devolver 2 si 2 es pasado por parametro', () => {
    expect(fizzbuzz(2)).toBe(2)
  })
  it('Si se pasa 3 por parametro deberia devolver fizz', () => {
    expect(fizzbuzz(3)).toBe('fizz')
    expect(fizzbuzz(6)).toBe('fizz')
    expect(fizzbuzz(9)).toBe('fizz')
  })
  it('Si se pasa 5 por parametro deberia devolver buzz', () => {
    expect(fizzbuzz(5)).toBe('buzz')
    expect(fizzbuzz(10)).toBe('buzz')
  })
  it('Si se pasa 15 por parametro deberia devolver fizzbuzz', () => {
    expect(fizzbuzz(15)).toBe('fizzbuzz')
    expect(fizzbuzz(30)).toBe('fizzbuzz')
  })
})
