import { useCallback, useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultEmployee,
	type Action,
	initialEmployeeState,
	employeeFormReducer
} from '../reducers/employeeFormReducer'
import { type Params } from '../../domain/dto/Employee.dto'
import { EmployeeSaveService } from '../service/employeeSave.service'
import { EmployeeCreator } from '../../application/EmployeeCreator'
import { useEmployeeInitialState } from './useEmployeeInitialState'

export function useCreateEmployee(defaultState?: DefaultEmployee) {
	const { initialState, mode, resetState } = useEmployeeInitialState(
		defaultState ?? initialEmployeeState.formData
	)
	const { events } = useContext(EventContext)

	const create = useMemo(
		() => async (formData: Params) => {
			return await new EmployeeCreator(new EmployeeSaveService(), events).create(formData)
		},
		[events]
	)

	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		employeeFormReducer,
		initialEmployeeState
	)
	const key = useMemo(
		() =>
			`Employee${initialEmployeeState?.formData?.id ? initialEmployeeState.formData.id : ''}`,
		[formData?.id]
	)

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
	}, [prevState, initialState])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset' || name === 'departamentoId') return
		dispatch({ type: name, payload: { value } })
	}, [])

	const handleDepartment = useCallback(
		async ({ value, centroCostoId }: { value: string; centroCostoId: string }) => {
			dispatch({
				type: 'departamentoId',
				payload: { value, centroCostoId }
			})
		},
		[]
	)

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			await create(formData as never).then(() => {
				resetState()
			})
		},
		[create, formData, resetState]
	)

	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		resetForm,
		handleSubmit,
		handleChange,
		handleDepartment
	}
}
