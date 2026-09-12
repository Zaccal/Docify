import type { generateMockData } from './generate-mock-data'
import { parseRussianDate } from './prase-russian-date'

export function getExpectedExcelData(mock: ReturnType<typeof generateMockData>) {
  return [
    {
      filename: 'Приходный ордер',
      values: [
        mock.enumeration,
        mock.fullnameClient,
        mock.organization,
        mock.address,
        mock.index,
        mock.city,
        parseRussianDate(mock.documentDate[0]!),
        parseRussianDate(mock.documentDate[1]!)
      ]
    },
    {
      filename: 'Счет фактура',
      values: [
        mock.enumeration,
        mock.fullnameClient,
        mock.organization,
        mock.bin,
        parseRussianDate(mock.documentDate[0]!),
        parseRussianDate(mock.documentDate[1]!)
      ]
    },
    {
      filename: 'Акт',
      values: [mock.enumeration, mock.fullnameClient, mock.organization, mock.address]
    }
  ]
}
