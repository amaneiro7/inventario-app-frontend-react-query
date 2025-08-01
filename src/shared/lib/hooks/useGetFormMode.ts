import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export type FormMode = 'edit' | 'add'

export function useGetFormMode(): FormMode {
	const location = useLocation()
	const mode: FormMode = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	return mode
}
