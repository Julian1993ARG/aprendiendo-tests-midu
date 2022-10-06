import { describe, it, expect } from 'vitest'

function canconfigure (from, to) {
  if (typeof from !== 'string') throw new Error('debe ser una string')
  if (typeof to !== 'string') throw new Error('El segundo parametro debe ser una string')

  const sameLength = from.length === to.length
  const uniqueLetters = new Set(from).size === new Set(to).size
  if (!sameLength) return false
  if (!uniqueLetters) return false

  const transformations = {}

  for (let i = 0; i < from.length; i++) {
    const fromLetter = from[i]
    const toLetter = to[i]

    const storedLetter = transformations[fromLetter]
    if (storedLetter && storedLetter !== toLetter) return false

    transformations[fromLetter] = toLetter
  }

  return true
}
describe.skip('canReconfig', () => {
  it('El primer parametro debe ser una string', () => {
    expect(() => canconfigure(2)).toThrow('debe ser una string')
  })
  it('El segundo parametro debe ser una string', () => {
    expect(() => canconfigure('string', undefined)).toThrow('El segundo parametro debe ser una string')
  })
  it('Siempre deberia devolver un boolean', () => {
    expect(canconfigure('a', 'a')).toBeTypeOf('boolean')
  })
  it('Si los parametros tienen diferente cantidad de letras debe devolver false', () => {
    expect(canconfigure('aa', 'aaa')).toBe(false)
  })
  it('Si los parametros tienen diferente cantidad de letras pero estas son unicas debe devolver false', () => {
    expect(canconfigure('aab', 'ab')).toBe(false)
  })
  it('Debe devolver false si las letras no son unicas', () => {
    expect(canconfigure('abv', 'aaa')).toBe(false)
  })
  it('Deberia devolver false si no se respeta el orden', () => {
    expect(canconfigure('XBOX', 'XXBO')).toBe(false)
  })
})

// https://adventjs.dev/challenges/23 es de este reto
