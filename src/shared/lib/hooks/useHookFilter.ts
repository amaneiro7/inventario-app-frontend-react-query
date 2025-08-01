import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OrderTypes } from '@/entities/shared/domain/criteria/OrderType'

/**
 * @interface UseFilterConfig
 * @template T
 * @description Configuration object for the {@link useGenericFilter} hook.
 * @property {number} defaultPageSize - The default number of items per page.
 * @property {(keyof T)[]} filterKeys - An array of keys from the generic type `T` that represent filterable fields.
 */
interface UseFilterConfig<T> {
	defaultPageSize: number
	filterKeys: (keyof T)[]
}
/**
 * @template T
 * @param {UseFilterConfig<T>} config - The configuration object for the filter.
 * @returns {object} An object containing filter values, pagination state, and handler functions.
 * @property {T} filters - An object containing the current filter values derived from the URL query parameters.
 * @property {number} pageSize - The current page size, either from the URL or the {@link UseFilterConfig.defaultPageSize}.
 * @property {number | undefined} pageNumber - The current page number from the URL, or undefined if not present.
 * @property {function(field: string): Promise<void>} handleSort - A function to handle sorting by a specific field, updating the URL.
 * @property {function(): void} cleanFilters - A function to remove all filter parameters from the URL.
 * @property {function(name: string, value: string | number): void} handleChange - A function to handle changes in filter values, updating the URL and resetting the page number to 1.
 * @property {function(pageSize: number): void} handlePageSize - A function to set the page size in the URL and reset the page number to 1.
 * @property {function({ selected: number }): void} handlePageClick - A function to handle page clicks from a pagination component, updating the page number in the URL.
 */
export function useGenericFilter<T>(config: UseFilterConfig<T>) {
	const [searchParams, setSearchParams] = useSearchParams()
	/**
	 * @function getFilterValue
	 * @template K
	 * @param {K} key - The key of the filter value to retrieve from the URL query parameters.
	 * @returns {T[K]} The filter value associated with the given key, or undefined if not present.
	 */
	const getFilterValue = useCallback(
		<K extends keyof T>(key: K): T[K] => {
			return searchParams.get(key as string) as T[K]
		},
		[searchParams]
	)
	/**
	 * @function setFilters
	 * @param {Partial<T>} filters - An object containing the filter values to set in the URL query parameters.
	 * Values of `null`, `undefined`, or empty strings will remove the corresponding parameter.
	 */
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
	/**
	 * @function setPageNumber
	 * @param {number | undefined} page - The page number to set in the URL. If undefined, the 'pageNumber' parameter is removed.
	 */
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

	/**
	 * @function setPageSize
	 * @param {number} pageSize - The number of items per page to set in the URL.
	 */
	const setPageSize = useCallback(
		(pageSize: number) => {
			setSearchParams(params => {
				params.set('pageSize', pageSize.toString())
				return params
			})
		},
		[setSearchParams]
	)

	/**
	 * @function cleanFilters
	 * @description Removes all filter-related parameters from the URL query.
	 */
	const cleanFilters = useCallback(() => {
		setSearchParams(new URLSearchParams())
	}, [searchParams])

	/**
	 * @async
	 * @function handleSort
	 * @param {string} field - The field to sort by. Toggles the sort order (ASC/DESC) in the URL.
	 */
	const handleSort = useCallback(
		async (field: string) => {
			setSearchParams(params => {
				if (field === '') {
					params.delete('orderBy')
					params.delete('orderType')
					return params
				}
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

	/**
	 * @function handleChange
	 * @param {string} name - The name of the filter field.
	 * @param {string | number} value - The new value for the filter. Updates the URL and resets the page number to 1.
	 */
	const handleChange = useCallback(
		(name: string, value: string | number) => {
			setFilters({ [name]: value } as Partial<T>)
			setPageNumber(undefined)
		},
		[setFilters, setPageNumber]
	)

	/**
	 * @function handlePageSize
	 * @param {number} pageSize - The new number of items per page. Updates the URL and resets the page number to 1.
	 */
	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	/**
	 * @function handlePageClick
	 * @param {{ selected: number }} { selected } - The object containing the index of the selected page (0-based). Updates the page number in the URL (1-based).
	 */
	const handlePageClick = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)

	/**
	 * @type {T}
	 * @description An object containing the current filter values derived from the URL query parameters.
	 */
	const filters: T = config.filterKeys.reduce((acc, key) => {
		acc[key] = getFilterValue(key)
		return acc
	}, {} as T)

	/**
	 * @type {number | undefined}
	 * @description The current page number from the URL, or undefined if not present.
	 */
	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined

	/**
	 * @type {number}
	 * @description The current page size, either from the URL or the {@link UseFilterConfig.defaultPageSize}.
	 */
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
