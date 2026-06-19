import { useState } from 'react'

export function useArray<T>(initialValue: T[] = []) {
  const [value, setValue] = useState<T[]>(initialValue)

  function push(item: T) {
    setValue((currentValue) => [...currentValue, item])
  }

  function remove(index: number) {
    setValue((currentValue) => currentValue.filter((_, i) => i !== index))
  }

  function replace(index: number, item: T) {
    setValue((currentValue) => currentValue.map((v, i) => (i === index ? item : v)))
  }

  function clear() {
    setValue([])
  }

  function getValue() {
    return value
  }

  function edit(index: number, item: T) {
    setValue((currentValue) => currentValue.map((v, i) => (i === index ? item : v)))
  }

  return {
    value,
    push,
    remove,
    replace,
    clear,
    getValue,
    edit
  }
}
