import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { ProcessorFrequency } from '../../domain/value-object/ProcessorFrequency'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

const repository = new ProcessorGetService()
const get = new ProcessorGetter(repository)

export function useProcessorInitialState(defaultState: ProcessorParams): {
	initialState: ProcessorParams
	resetState: () => void
	mode: 'edit' | 'add'
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<ProcessorParams>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const mode = useGetFormMode()

	const {
		data: processorData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['processor', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.processor,
		retry: false
	})

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('processor')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}
		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}
		if (location.state?.processor) {
			setState(location.state.processor)
		} else if (processorData) {
			setState({
				...processorData,
				frequency: ProcessorFrequency.convertToNumber(processorData.frequency)
			})
		}
	}, [mode, processorData, location.state, defaultState, navigate])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('processor')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaultState
			})
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				setState({
					...data,
					frequency: ProcessorFrequency.convertToNumber(data.frequency)
				})
			}
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	return {
		mode,
		initialState: state,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry: refetch
	}
}
