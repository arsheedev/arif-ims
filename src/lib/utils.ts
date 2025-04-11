import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const IDR = new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR'
})

export const formatDate = new Intl.DateTimeFormat('id', { dateStyle: 'long' })
