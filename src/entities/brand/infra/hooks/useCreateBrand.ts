import { useCallback, useLayoutEffect, useReducer } from 'react'
import { BrandCreator } from '@/entities/brand/application/BrandCreator'
import { BrandSaveService } from '@/entities/brand/infra/service/brandSave.service'
import {
	type Action,
	initialBrandState,
	brandFormReducer
} from '@/entities/brand/infra/reducers/brandFormReducer'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useBrandInitialState } from './useBrandInitialState'
import { type BrandParams } from '@/entities/brand/domain/dto/Brand.dto'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

export function useCreateBrand(defaultState?: BrandParams) {
	const key = `brand${initialBrandState?.formData?.id ? initialBrandState.formData.id : ''}`
	const { events } = useAuthStore.getState()

	const create = async (formData: BrandParams) => {
		return await new BrandCreator(new BrandSaveService(), events).create(formData)
	}

	const { initialState, mode, resetState } = useBrandInitialState(
		defaultState ?? initialBrandState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(brandFormReducer, initialBrandState)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialBrandState])

	const handleChange = (name: Action['type'], value: string) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData).then(() => {
			resetState()
		})
	}

	return {
		key,
		formData,
		mode,
		errors,
		resetForm,
		handleSubmit,
		handleChange
	}
}
