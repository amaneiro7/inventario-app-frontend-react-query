import { useMemo } from 'react'

export function LastUpdated({ updatedAt }: { updatedAt: string }) {
	const formattedUpdatedAt = useMemo(() => formattedDate(updatedAt), [updatedAt])
	return (
		<span className="block">
			Actualizado el <strong>{formattedUpdatedAt}</strong>{' '}
		</span>
	)
}

function formattedDate(date: string) {
	return new Date(date).toLocaleString()
}
