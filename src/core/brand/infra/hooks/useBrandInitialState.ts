import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BrandGetter } from '@/core/brand/application/BrandGetter'
import { BrandGetService } from '@/core/brand/infra/service/brandGet.service'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

export function useBrandInitialState(defaulState: BrandParams): {
	initialState: BrandParams
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<BrandParams>(defaulState)
	const mode: 'edit' | 'add' = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	const repository = useMemo(() => new BrandGetService(), [])
	const get = useMemo(() => new BrandGetter(repository), [repository])

	const { data: brandData, refetch } = useQuery({
		queryKey: ['brand', id],
		queryFn: () => {
			if (id) return get.execute({ id })
		},
		enabled: !!id && mode === 'edit' && !location?.state?.brand
	})

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('brand')) {
			setState(defaulState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		} else if (location?.state?.brand) {
			const brand = location.state.brand
			setState(brand)
		} else {
			if (brandData) {
				setState(brandData)
			}
		}
	}, [mode, brandData, location.state, defaulState, navigate])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('brand')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaulState
			})
		} else {
			const { data } = await refetch()
			if (data) {
				setState(data)
			}
		}
	}, [defaulState, location.pathname, mode, refetch])

	return {
		mode,
		initialState: state,
		resetState
	}
}
