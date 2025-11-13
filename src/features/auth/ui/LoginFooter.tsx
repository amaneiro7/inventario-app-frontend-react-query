import Typography from '@/shared/ui/Typography'
import { memo } from 'react'

export const LoginFooter = memo(({ currentDate }: { currentDate: Date }) => {
	return (
		<footer>
			<Typography variant="p" option="small">
				Copyright © <strong>InventarioApp </strong>2024-
				{`${currentDate.getFullYear()}`}
			</Typography>
		</footer>
	)
})

LoginFooter.displayName = 'LoginFooter'
