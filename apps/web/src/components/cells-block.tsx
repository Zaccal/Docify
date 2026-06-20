'use client'

import { Button } from '@Docify/ui/components/button'
import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { Plus, Table, Trash } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMemo } from 'react'

import { useArray } from '@/hooks/useArray'
import type { BlockProps } from '@/types/block-props'
import type { Cell } from '@/types/cells.type'

import CreateDocumentCard from './create-document-card/index'

export default function CellsBlock({ errors }: BlockProps) {
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
    <CreateDocumentCard.Root>
      <input type="hidden" name="cellsLine" value={cellsLineValue} />
      <CreateDocumentCard.Header
        icon={Table}
        color="red"
        title="Динамические данные"
        description="Дополнительные данные для счет фактуры"
      />
      <CreateDocumentCard.Content>
        <div className="grid gap-4 space-y-4">
          {value.length === 0 ? (
            <p className="text-muted-foreground py-4 text-sm">Нет данных</p>
          ) : (
            value.map((cell, index) => (
              <div
                key={cell.id}
                className="grid w-full grid-cols-[1fr_1fr_auto] items-center gap-4"
              >
                <Field>
                  <FieldLabel htmlFor={`cellsLineKeys[${index}]`}>Ключ</FieldLabel>
                  <Input
                    id={`cellsLineKeys[${index}]`}
                    name={`cellsLineKeys[${index}]`}
                    aria-invalid={Boolean(errors?.cellsLine?.length)}
                    placeholder="Например: Цвет"
                    onChange={(e) => edit(index, { ...cell, key: e.target.value })}
                    value={cell.key}
                  />
                  <FieldError errors={errors?.cellsLine} />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`cellsLineValues[${index}]`}>Значение</FieldLabel>
                  <Input
                    id={`cellsLineValues[${index}]`}
                    name={`cellsLineValues[${index}]`}
                    aria-invalid={Boolean(errors?.cellsLine?.length)}
                    placeholder="Например: Синий"
                    onChange={(e) => edit(index, { ...cell, value: e.target.value })}
                    value={cell.value}
                  />

                  <FieldError errors={errors?.cellsLine} />
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
      </CreateDocumentCard.Content>
    </CreateDocumentCard.Root>
  )
}
