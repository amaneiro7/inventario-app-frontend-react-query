import Typography from '@/shared/ui/Typography'
import { memo } from 'react'

export const LoginHeader = memo(({ date }: { date: string }) => {
	return (
		<header className="flex w-full flex-row items-end-safe justify-end px-2">
			<Typography
				align="right"
				transform="capitalize"
				color="black"
				weight="semibold"
				variant="p"
			>
				{date}
			</Typography>
		</header>
	)
})

LoginHeader.displayName = 'LoginHeader'
