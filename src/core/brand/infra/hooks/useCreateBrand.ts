import { useLayoutEffect, useReducer } from 'react'
import { BrandCreator } from '@/core/brand/application/BrandCreator'
import { BrandSaveService } from '@/core/brand/infra/service/brandSave.service'
import {
	type Action,
	initialBrandState,
	brandFormReducer
} from '@/core/brand/infra/reducers/brandFormReducer'
import { usePrevious } from '@/hooks/utils/usePrevious'
import { useBrandInitialState } from './useBrandInitialState'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'
import { useAuthStore } from '@/store/useAuthStore'

export function useCreateBrand(defaultState?: BrandParams) {
	const key = `processor${initialBrandState?.formData?.id ? initialBrandState.formData.id : ''}`
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

	const resetForm = () => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}

	const handleChange = (name: Action['type'], value: string) => {
		if (name === 'name') dispatch({ type: name, payload: { value } })
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
