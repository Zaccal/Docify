'use client'

import { Button } from '@Docify/ui/components/button'
import { Field, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { Plus, Table, Trash } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMemo } from 'react'

import { useArray } from '@/hooks/useArray'
import type { Cell } from '@/types/cells.type'

export default function CellsBlock() {
  const { value, push, edit, remove } = useArray<Cell>()
  const cellsLineValue = useMemo(
    () =>
      JSON.stringify(
        Object.fromEntries(
          value
            .map((cell) => [cell.key.trim(), cell.value.trim()])
            .filter(([key, value]) => key && value)
        )
      ),
    [value]
  )

  function addCell() {
    const id = crypto.randomUUID()
    push({ id, key: '', value: '' })
  }

  return (
    <section className="bg-card mt-6 rounded-md p-4">
      <input type="hidden" name="cellsLine" value={cellsLineValue} />

      <div className="flex items-center gap-4">
        <div className="rounded-md bg-red-100 p-2 text-red-400">
          <HugeiconsIcon icon={Table} />
        </div>
        <div>
          <p>Динамические данные</p>
          <p className="text-muted-foreground text-sm">Дополнительные данные для счет фактуры</p>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="grid gap-4">
        {value.length === 0 ? (
          <p className="text-muted-foreground py-4 text-sm">Нет данных</p>
        ) : (
          value.map((cell, index) => (
            <div key={cell.id} className="grid w-full grid-cols-[1fr_1fr_auto] items-end gap-4">
              <Field>
                <FieldLabel>Ключ</FieldLabel>
                <Input
                  name={`cellsLineKeys[${index}]`}
                  placeholder="Например: Цвет"
                  onChange={(e) => edit(index, { ...cell, key: e.target.value })}
                  value={cell.key}
                />
              </Field>
              <Field>
                <FieldLabel>Значение</FieldLabel>
                <Input
                  name={`cellsLineValues[${index}]`}
                  placeholder="Например: Синий"
                  onChange={(e) => edit(index, { ...cell, value: e.target.value })}
                  value={cell.value}
                />
              </Field>
              <Button
                aria-label="Удалить строку"
                onClick={() => remove(index)}
                size="icon"
                type="button"
                variant="destructive"
              >
                <HugeiconsIcon icon={Trash} />
              </Button>
            </div>
          ))
        )}
      </div>

      <Separator className="my-3" />

      <Button size="sm" onClick={addCell} type="button">
        <HugeiconsIcon icon={Plus} /> Добавить
      </Button>
    </section>
  )
}
