import React, { useState } from 'react'
import { CLearCacheUseCase } from '../../application/ClearCacheUseCase'
import { CLearCacheService } from '../service/adminClearCachet.service'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

const repository = new CLearCacheService()
const clearCacheUseCase = new CLearCacheUseCase(repository, useAuthStore.getState().events)

export const useClearCache = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [pattern, setPattern] = useState<string>('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPattern(event.target.value)
	}

	// Instanciamos el caso de uso con su implementación
	// En apps más grandes, esto vendría de un contenedor de dependencias

	const handleSubmit = async (event: React.SubmitEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setIsSubmitting(true)
		setSubmitError(null)
		try {
			await clearCacheUseCase.execute({ pattern })
			// Podrías retornar un éxito o mostrar una notificación
		} catch (err: any) {
			setSubmitError(err.message)
		} finally {
			setPattern('')
			setIsSubmitting(false)
		}
	}

	return { handleSubmit, handleChange, isSubmitting, submitError, pattern }
}
