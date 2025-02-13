import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'
import { type ProcessorId } from '../../domain/value-object/ProcessorId'

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

	const getProcessor = useCallback(async ({ id }: { id: Primitives<ProcessorId> }) => {
		const { data, isLoading, isError } = useQuery({
			queryKey: ['processor', id],
			queryFn: async () => await get.execute({ id })
		})

		return {
			data,
			isLoading,
			isError
		}
	}, [])

	const mode: 'edit' | 'add' = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	const fetchProcessor = useCallback(() => {
		if (!id) {
			navigate('/error')
			return
		}
		getProcessor({ id })
			.then(processor => {
				const { data } = processor
				if (data) setState(data)
			})
			.catch(error => {
				console.error('useProcessorInitialState', error)
			})
	}, [getProcessor, id])

	const resetState = useCallback(() => {
		if (!location.pathname.includes('processor')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaulState
			})
		} else {
			fetchProcessor()
		}
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('processor')) {
			setState(defaulState)
			return
		}

		if (!location.state?.state) {
			fetchProcessor()
		} else {
			const processor = location.state.processor
			setState(processor)
		}
	}, [])

	return {
		mode,
		initialState: state,
		resetState
	}
}
