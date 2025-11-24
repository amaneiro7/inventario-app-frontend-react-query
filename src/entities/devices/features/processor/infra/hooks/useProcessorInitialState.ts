import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { adaptProcessorData } from './adaptProcessorData'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode, useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultProcessor } from '../reducers/processorFormReducer'
import { type ProcessorDto } from '../../domain/dto/Processor.dto'

const get = new ProcessorGetter(new ProcessorGetService())

export function useProcessorInitialState(defaultState: DefaultProcessor): {
	initialState: DefaultProcessor
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	resetState: () => void
	onRetry: () => void
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const mode = useGetFormMode()
	const [isNotFound, setIsNotFound] = useState<boolean>(false)
	const initialDataFromState = location.state?.processor
		? adaptProcessorData(location.state.processor)
		: undefined

	const {
		data: processorData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery<ProcessorDto, Error, DefaultProcessor>({
		queryKey: ['processor', id],
		queryFn: () => {
			if (!id) {
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id,
		retry: false,
		select: data => adaptProcessorData(data)
	})

	// 💡 OPTIMIZACIÓN 4: Sincronizar el estado local (state) con los datos de RQ
	// Esta es la única razón por la que necesitamos un estado local después de la carga inicial
	const [state, setState] = useState<DefaultProcessor>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('processor')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error', { replace: true })
			return
		}

		if (error instanceof NotFoundError && error.statusCode === 404) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		if (processorData) {
			setState(processorData)
		}
	}, [mode, error, processorData, location.state, defaultState, navigate])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('processor')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaultState
			})
		} else if (id) {
			await refetch()
		}
	}, [defaultState, mode, refetch, id])

	// Aseguramos que isNotFound se resetee cuando se intente recargar
	const onRetry = useCallback(() => {
		setIsNotFound(false)
		refetch()
	}, [refetch, setIsNotFound])

	return {
		mode,
		initialState: state,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry
	}
}
