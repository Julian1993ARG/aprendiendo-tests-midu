/*
Debe devolver fizz si es multiplo de 3
debe devolver buzz si es multiplo de 5
debe devolver fizzbuzz si es multiplo de 3 y 5
*/

export default function fizzbuzz (num) {
  if (typeof num !== 'number') throw new Error()
  if (Number.isNaN(num)) throw new Error('El parametro debe ser un numero')
  if (!Number.isInteger(num)) throw new Error('El parametro debe ser un entero')
  const multiples = { 3: 'fizz', 5: 'buzz' }
  let salida = ''
  Object.entries(multiples).forEach(([multiple, word]) => {
    if (num % multiple === 0) salida += word
  })
  // El entries convierte el objeto en un [key,data], luego se recorre y se va comparando
  return salida === '' ? num : salida// Si se devuelve vacio es porque no entro a nungun if devuelve el numero
}
