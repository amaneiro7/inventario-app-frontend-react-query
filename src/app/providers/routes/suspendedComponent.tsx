import { Loading } from '@/shared/ui/Loading'
import { Suspense } from 'react'

export const suspended = (Component: React.ElementType) => (
	<Suspense fallback={<Loading />}>
		<Component />
	</Suspense>
)
