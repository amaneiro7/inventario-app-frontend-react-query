import { useMemo } from 'react'
import { usePresetMediaQueries } from '@/shared/lib/hooks/usePresetMediaQueries'

export function useTableComputer() {
	const { isSm, isMd, isLg, isXl, is1xl, is2xl, is4xl } = usePresetMediaQueries()

	const colSpan = useMemo(() => {
		let count = 4
		if (isSm) count++
		if (isMd) count++
		if (isLg) count += 2
		if (isXl) count++
		if (is1xl) count++
		if (is2xl) count++
		if (is4xl) count++
		return count
	}, [isSm, isMd, isLg, isXl, is1xl, is2xl, is4xl])
	return {
		colSpan
	}
}
