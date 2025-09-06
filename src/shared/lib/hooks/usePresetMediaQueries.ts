import { useMediaQuery } from './useMediaQuery'

export const usePresetMediaQueries = () => {
	const isXs = useMediaQuery('(min-width: 475px)')
	const isSm = useMediaQuery('(min-width: 640px)')
	const isMd = useMediaQuery('(min-width: 768px)')
	const isLg = useMediaQuery('(min-width: 1024px)')
	const isXl = useMediaQuery('(min-width: 1280px)')
	const is1xl = useMediaQuery('(min-width: 1360px)')
	const is2xl = useMediaQuery('(min-width: 1536px)')
	const is3xl = useMediaQuery('(min-width: 1620px)')
	const is4xl = useMediaQuery('(min-width: 1920px)')
	const is5xl = useMediaQuery('(min-width: 2560px)')

	return {
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		is1xl,
		is2xl,
		is3xl,
		is4xl,
		is5xl
	}
}
