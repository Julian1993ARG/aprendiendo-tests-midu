import { describe, it, expect } from 'vitest'

function canconfigure (from, to) {
  if (!from) throw new Error('El primer parametro es requerido')
}
describe('canReconfig', () => {
  it('canConfigure debe ser una funcion', () => {
    expect(canconfigure).toBeTypeOf('function')
  })
  it('Sino se pasa el primer parametro debe dar error', () => {
    expect(() => canconfigure()).toThrow('El primer parametro es requerido')
  })
  it('Sino se pasa el segundo parametro debe dar error', () => {
    expect(() => canconfigure()).toThrow('El segundo parametro es requerido')
  })
})
