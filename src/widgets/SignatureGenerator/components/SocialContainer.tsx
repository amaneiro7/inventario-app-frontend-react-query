import { memo } from 'react'

export const SocialContainer = memo(({ children }: React.PropsWithChildren) => (
	<div className="border-azul flex flex-row items-center gap-0.5 rounded-full border p-1 py-0.5 pr-2 text-center">
		{children}
	</div>
))

SocialContainer.displayName = 'SocialContainer'
