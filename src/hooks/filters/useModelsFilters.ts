import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'
export function useModelsFilter() {
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: ModelFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof ModelFilters
				if (filters[filterKey] !== undefined) {
					params.set(filterKey, filters[filterKey] as string)
				}
				if (!filters[filterKey]) {
					params.delete(filterKey)
				}
			})
			return params
		})
	}, [])

	const setPageNumber = useCallback((page: number) => {
		setSearchParams(params => {
			params.set('pageNumber', page.toString())
			return params
		})
	}, [])

	const setPageSize = useCallback((pageSize: number) => {
		setSearchParams(params => {
			params.set('pageSize', pageSize.toString())
			return params
		})
	}, [])

	const cleanFilters = useCallback(() => {
		const newSearchParams = new URLSearchParams()

		setSearchParams(newSearchParams)
	}, [])

	const mainCategoryId = searchParams.get('mainCategoryId') as ModelFilters['mainCategoryId']
	const categoryId = searchParams.get('categoryId') as ModelFilters['categoryId']
	const name = searchParams.get('name') as ModelFilters['name']
	const brandId = searchParams.get('brandId') as ModelFilters['brandId']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: 1
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: ModelGetByCriteria.defaultPageSize

	return {
		mainCategoryId,
		categoryId,
		brandId,
		name,
		pageNumber,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
