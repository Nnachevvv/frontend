import { i18n } from 'next-i18next'

/**
 * Format money amounts
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns string
 */
export const money = (number: number, currency = 'BGN', divisionFactor = 100) => {
  return new Intl.NumberFormat(i18n?.language || 'bg-BG', { style: 'currency', currency }).format(
    number / divisionFactor,
  )
}

//TODO rework this
export const moneyWithThousandSeperator = (num: number) => {
  // Convert number to string and split it into integer and fractional parts
  if (num === undefined) {
    num = 0
  }

  const [integer, fractional] = num.toFixed(2).split('.')

  // Insert a space character every three digits in the integer part
  const integerWithSeparator = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  // Combine the integer and fractional parts with a decimal point
  const formattedNumber =
    fractional === '00' ? integerWithSeparator : `${integerWithSeparator}.${fractional}`

  return formattedNumber
}

export const moneyPublic = (
  number: number,
  currency = 'BGN',
  divisionFactor = 100,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
) => {
  if (!i18n?.language || i18n.language === 'bg' || i18n.language === 'bg-BG') {
    const amount = new Intl.NumberFormat('bg-BG', {
      style: 'decimal',
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(number / divisionFactor)

    if (currency === 'EUR') {
      return `${amount} €`
    }
    if (currency === 'USD') {
      return `${amount} $`
    }
    return `${amount} лв.`
  }
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(number / divisionFactor)
}

export const moneyPublicDecimals2 = (number: number, currency = 'BGN', divisionFactor = 100) => {
  return moneyPublic(number, currency, divisionFactor, 2, 2)
}

/**
 * Used for formatting a number into internal Money value
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns number
 */

export const toMoney = (number: number, divisionFactor = 100): number => {
  return number * divisionFactor
}

/**
 * Used for formatting Money to a number for display
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns number
 */
export const fromMoney = (number: number, divisionFactor = 100): number => {
  return number / divisionFactor
}
