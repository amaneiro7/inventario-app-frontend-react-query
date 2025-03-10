import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { ProcessorFrequency } from '../../domain/value-object/ProcessorFrequency'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

const repository = new ProcessorGetService()
const get = new ProcessorGetter(repository)

export function useProcessorInitialState(defaultState: ProcessorParams): {
	initialState: ProcessorParams
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<ProcessorParams>(defaultState)

	const mode = useGetFormMode()

	const { data: processorData, refetch } = useQuery({
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
		resetState
	}
}
