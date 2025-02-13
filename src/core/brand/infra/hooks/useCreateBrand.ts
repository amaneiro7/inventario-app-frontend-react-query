import { useActionState, useCallback, useContext, useLayoutEffect, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'
import { BrandCreator } from '@/core/brand/application/BrandCreator'
import { BrandSaveService } from '@/core/brand/infra/service/brandSave.service'
import { initialBrandState, brandFormReducer, Action } from '@/reducers/brandFormReducer'
import { brandAction } from '@/core/brand/infra/actions/brandActions'
import { usePrevious } from '@/hooks/utils/usePrevious'
import { useBrandInitialState } from './useBrandInitialState'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

export function useCreateBrand(defaulState?: BrandParams) {
	const { events } = useContext(EventContext)

	const create = useCallback(
		async (formData: BrandParams) => {
			const data = await new BrandCreator(new BrandSaveService(), events).create(formData)
			return data
		},
		[events]
	)

	const { initialState, mode, resetState } = useBrandInitialState(
		defaulState ?? initialBrandState
	)
	const prevState = usePrevious(initialState)
	const [formData, dispatch] = useReducer(brandFormReducer, initialBrandState)
	const [state, formAction] = useActionState(brandAction, undefined)

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
		event.stopPropagation()
		event.stopPropagation()
		await create(formData).finally(() => {
			resetState()
		})
	}

	return {
		formData,
		formAction,
		mode,
		resetForm,
		success: state?.success,
		errorMessage: state?.message,
		handleSubmit,
		handleChange
	}
}
