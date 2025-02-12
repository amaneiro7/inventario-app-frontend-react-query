import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useGetFormMode = () => {
	const location = useLocation()
	const mode: 'edit' | 'add' = useMemo(() => {
		return location.pathname.includes('edit') ? 'edit' : 'add'
	}, [location.pathname])

	return mode
}
