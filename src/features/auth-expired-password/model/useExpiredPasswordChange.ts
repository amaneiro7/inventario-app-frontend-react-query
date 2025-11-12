import { useCallback, useMemo, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from './useAuthStore'
import {
	changePasswordFormReducer,
	initialChangePasswordState
} from '../reducers/changePasswordFormReducer'
import { ExpiredPasswordChangeService } from '../service/expiredPasswordChange.service'
import { ChangePassword } from '@/entities/user/application/ChangePassword'

export function useExpiredPasswordChange() {
	const navigate = useNavigate()
	const { tempToken, setTempToken, events } = useAuthStore()
	const [state, dispatch] = useReducer(changePasswordFormReducer, initialChangePasswordState)

	const changePasswordService = useMemo(() => {
		const service = new ExpiredPasswordChangeService()
		return new ChangePassword(service, events)
	}, [events])

	const handleChange = useCallback((field: string, value: string) => {
		dispatch({ type: 'update_field', payload: { field, value } })
	}, [])

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			dispatch({ type: 'start_submit' })

			if (!tempToken) {
				events.notify({
					type: 'error',
					message: 'Token temporal no encontrado. Por favor, inicie sesión de nuevo.'
				})
				dispatch({ type: 'end_submit' })
				navigate('/login')
				return
			}

			try {
				await changePasswordService.execute({
					newPassword: state.formData.newPassword,
					tempToken
				})
				events.notify({
					type: 'success',
					message: 'Contraseña actualizada con éxito. Por favor, inicie sesión de nuevo.'
				})
				setTempToken(null) // Limpiar el token temporal
				navigate('/login')
			} catch (error) {
				// El error ya es notificado por el EventManager en la capa de aplicación
			} finally {
				dispatch({ type: 'end_submit' })
			}
		},
		[state.formData, tempToken, changePasswordService, navigate, setTempToken, events]
	)

	return {
		state,
		isSubmitting: state.isSubmitting,
		errors: state.errors,
		formData: state.formData,
		handleChange,
		handleSubmit
	}
}
