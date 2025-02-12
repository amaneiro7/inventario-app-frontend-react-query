import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetter } from '@/core/brand/application/BrandGetter'
import { BrandGetService } from '@/core/brand/infra/brandGet.service'
import { type BrandId } from '@/core/brand/domain/value-object/BrandId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

export function useCreateBrand(defaulState: BrandParams): {
	initialState: BrandParams
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<BrandParams>(defaulState)

	const repository = useMemo(() => new BrandGetService(), [])
	const get = useMemo(() => new BrandGetter(repository), [repository])

	const getBrand = useCallback(async ({ id }: { id: Primitives<BrandId> }) => {
		const { data, isLoading, isError } = useQuery({
			queryKey: ['brand', id],
			queryFn: async () => await get.execute({ id })
		})

		return {
			data,
			isLoading,
			isError
		}
	}, [])

	const mode: 'edit' | 'add' = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	const fetchBrand = useCallback(() => {
		if (!id) {
			navigate('/error')
			return
		}
		getBrand({ id })
			.then(brand => {
				const { data } = brand
				if (data) setState({ id: data?.id, name: data?.name })
			})
			.catch(error => {
				console.error('useBrandInitialState', error)
			})
	}, [getBrand, id])

	const resetState = useCallback(() => {
		if (location.pathname.includes('brand')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaulState
			})
		} else {
			fetchBrand()
		}
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('brand')) {
			setState(defaulState)
			return
		}

		if (!location.state?.state) {
			fetchBrand()
		} else {
			const brand = location.state.brand
			setState(brand)
		}
	}, [])

	return {
		mode,
		initialState: state,
		resetState
	}
}
