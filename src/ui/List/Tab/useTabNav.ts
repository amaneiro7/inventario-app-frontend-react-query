import { useMemo } from 'react'

interface UseTabNavProps {
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	total?: number
}

export const useTabNav = ({ defaultPageSize, pageNumber, pageSize, total }: UseTabNavProps) => {
	const getPaginationRange = useMemo(() => {
		const start = pageSize && pageNumber ? pageSize * (pageNumber - 1) + 1 : 1
		const calculatedEnd =
			pageSize && pageNumber ? pageSize * pageNumber : (defaultPageSize ?? 25)
		const end = total !== undefined ? Math.min(total, calculatedEnd) : calculatedEnd

		return { start, end }
	}, [pageSize, pageNumber, defaultPageSize, total])

	return {
		getPaginationRange
	}
}
