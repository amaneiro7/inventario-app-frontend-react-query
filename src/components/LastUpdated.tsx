import { useMemo } from 'react'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { formattedDate } from '@/utils/formatDate'
import Typography from './Typography'

export function LastUpdated({ updatedAt }: { updatedAt: string | Date }) {
	const formattedUpdatedAt = useMemo(() => formattedDate(updatedAt), [updatedAt])
	const relativeTime = useMemo(() => getRelativeTime(updatedAt), [updatedAt])
	return (
		<Typography variant="span" option="small" className="block">
			Actualizado <strong>{relativeTime}</strong> <br />
			el <strong>{formattedUpdatedAt}</strong>
		</Typography>
	)
}
