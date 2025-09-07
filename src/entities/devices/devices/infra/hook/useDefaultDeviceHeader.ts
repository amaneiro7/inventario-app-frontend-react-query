import { useMemo } from 'react'
import { usePresetMediaQueries } from '@/shared/lib/hooks/usePresetMediaQueries'

export function useDefaultDeviceHeader() {
	const { isSm, isMd, isLg, isXl, is1xl } = usePresetMediaQueries()

	const colSpan = useMemo(() => {
		let count = 4
		if (isSm) count++
		if (isMd) count++
		if (isLg) count++
		if (isXl) count++
		if (is1xl) count++
		return count
	}, [isSm, isMd, isLg, isXl, is1xl])
	return {
		colSpan
	}
}
