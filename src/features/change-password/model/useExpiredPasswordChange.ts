import { useCallback, useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	forceChangePasswordReducer,
	forceChangePasswordInitialState
} from '@/entities/user/infra/reducers/forceChangePassword.reducers'

import { ExpiredPasswordChangeService } from '@/entities/user/infra/service/expiredPasswordChange.service'
import { ForceChangePassword } from '@/entities/user/application/ForceChangePassword'

export function useExpiredPasswordChange() {
	const navigate = useNavigate()
	const { tempToken, setTempToken, events } = useAuthStore()

	const changePasswordService = useMemo(() => {
		const service = new ExpiredPasswordChangeService()
		return new ForceChangePassword(service, events)
	}, [events])

	const [state, dispatch] = useReducer(
		forceChangePasswordReducer,
		forceChangePasswordInitialState
	)

	const handleChange = useCallback((field: string, value: string) => {
		dispatch({ type: 'update_field', payload: { field, value } })
	}, [])

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event?.preventDefault()
			event?.stopPropagation()
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
					reTypePassword: state.formData.reTypePassword,
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
