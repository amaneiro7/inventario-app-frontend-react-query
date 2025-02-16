import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { ProcessorFrequency } from '../../domain/value-object/ProcessorFrequency'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

export function useProcessorInitialState(defaulState: ProcessorParams): {
	initialState: ProcessorParams
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<ProcessorParams>(defaulState)

	const repository = useMemo(() => new ProcessorGetService(), [])
	const get = useMemo(() => new ProcessorGetter(repository), [repository])

	const mode: 'edit' | 'add' = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	const { data: processorData, refetch } = useQuery({
		queryKey: ['processor', id],
		queryFn: () => {
			if (id) return get.execute({ id })
		},
		enabled: !!id && mode === 'edit' && !location?.state?.processor
	})

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('processor')) {
			setState(defaulState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		} else if (location.state?.data) {
			const processor = location.state.data
			setState(processor)
		} else {
			if (processorData) {
				const parseFrequency = ProcessorFrequency.convertToNumber(processorData.frequency)
				const state: ProcessorParams = { ...processorData, frequency: parseFrequency }
				setState(state)
			}
		}
	}, [mode, processorData, location.state, defaulState, navigate])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('processor')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaulState
			})
		} else {
			const { data } = await refetch()
			if (data) {
				const parseFrequency = ProcessorFrequency.convertToNumber(data.frequency)
				const state: ProcessorParams = { ...data, frequency: parseFrequency }
				setState(state)
			}
		}
	}, [defaulState, location.pathname, mode, refetch])

	return {
		mode,
		initialState: state,
		resetState
	}
}
