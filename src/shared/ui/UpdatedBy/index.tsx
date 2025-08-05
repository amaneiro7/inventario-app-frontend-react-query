import { memo, useMemo } from 'react'
import { lastHistoryUpdated } from '@/shared/lib/utils/lastHistoryUpdated'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'

export const UpdatedBy = memo(({ history }: { history: HistoryDto[] }) => {
	const sortHistroy = useMemo(() => lastHistoryUpdated(history), [history])
	return (
		<span className="block">
			Realizado por <strong>{sortHistroy?.user?.email ?? 'root'}</strong>{' '}
		</span>
	)
})
