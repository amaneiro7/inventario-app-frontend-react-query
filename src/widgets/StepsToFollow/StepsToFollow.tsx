import { lazy, memo } from 'react'

const DetailsBoxWrapper = lazy(async () =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const DetailsWrapper = lazy(async () =>
	import('@/shared/ui/DetailsWrapper/DetailsWrapper').then(m => ({ default: m.DetailsWrapper }))
)
const Typography = lazy(async () => import('@/shared/ui/Typography'))

export const StepsToFollow = memo(({ children }: React.PropsWithChildren) => {
	return (
		<DetailsWrapper borderColor="orange">
			<DetailsBoxWrapper>
				<Typography color="black" variant="p" weight="bold">
					Pasos a Seguir:
				</Typography>
				<div className="flex flex-col gap-3">{children}</div>
			</DetailsBoxWrapper>
		</DetailsWrapper>
	)
})
