import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'

interface UseFilterConfig<T> {
	defaultPageSize: number
	filterKeys: (keyof T)[]
}
export function useGenericFilter<T>(config: UseFilterConfig<T>) {
	const [searchParams, setSearchParams] = useSearchParams()

	const getFilterValue = useCallback(
		<K extends keyof T>(key: K): T[K] => {
			return searchParams.get(key as string) as T[K]
		},
		[searchParams]
	)

	const setFilters = useCallback(
		(filters: Partial<T>) => {
			setSearchParams(params => {
				Object.entries(filters).forEach(([key, value]) => {
					if (!value) {
						params.delete(key)
					} else {
						params.set(key, String(value))
					}
				})
				return params
			})
		},
		[setSearchParams]
	)

	const setPageNumber = useCallback(
		(page?: number) => {
			setSearchParams(params => {
				if (!page) {
					params.delete('pageNumber')
				} else {
					params.set('pageNumber', page.toString())
				}
				return params
			})
		},
		[setSearchParams]
	)

	const setPageSize = useCallback(
		(pageSize: number) => {
			setSearchParams(params => {
				params.set('pageSize', pageSize.toString())
				return params
			})
		},
		[setSearchParams]
	)

	const cleanFilters = useCallback(() => {
		setSearchParams(new URLSearchParams())
	}, [searchParams])

	const handleSort = useCallback(
		async (field: string) => {
			setSearchParams(params => {
				const currentOrderBy = params.get('orderBy')
				const currentOrderType = params.get('orderType')
				if (currentOrderBy !== field) {
					params.set('orderBy', field)
					params.delete('orderType')
				} else if (!currentOrderType) {
					params.set('orderType', OrderTypes.DESC)
				} else if (currentOrderType === OrderTypes.DESC) {
					params.set('orderType', OrderTypes.ASC)
				} else {
					params.set('orderType', OrderTypes.DESC)
				}

				return params
			})
		},
		[setSearchParams]
	)

	const handleChange = useCallback(
		(name: string, value: string | number) => {
			setFilters({ [name]: value } as Partial<T>)
			setPageNumber(undefined)
		},
		[setFilters, setPageNumber]
	)

	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	const handlePageClick = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)

	const filters = config.filterKeys.reduce((acc, key) => {
		acc[key] = getFilterValue(key)
		return acc
	}, {} as T)

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: config.defaultPageSize

	return {
		...filters,
		pageSize,
		pageNumber,
		handleSort,
		cleanFilters,
		handleChange,
		handlePageSize,
		handlePageClick
	}
}
