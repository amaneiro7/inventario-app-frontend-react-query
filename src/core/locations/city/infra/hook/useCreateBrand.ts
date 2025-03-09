import { useContext, useLayoutEffect, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'
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

export function useCreateBrand(defaulState?: BrandParams) {
	const key = `processor${initialBrandState?.formData?.id ? initialBrandState.formData.id : ''}`
	const { events } = useContext(EventContext)

	const create = async (formData: BrandParams) => {
		return await new BrandCreator(new BrandSaveService(), events).create(formData)
	}

	const { initialState, mode, resetState } = useBrandInitialState(
		defaulState ?? initialBrandState.formData
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
