import { lazy, memo } from 'react'

const StatusProgress = lazy(() =>
	import('@/shared/ui/StatusProgress').then(m => ({ default: m.StatusProgress }))
)
const DetailsPanelCard = lazy(() =>
	import('../DetailsPanelCard').then(m => ({ default: m.DetailsPanelCard }))
)

interface PanelStatsProps {
	onlineCount: number
	offlineCount: number
	total: number
	percentageTitle: string
	totalCountTitle: string
	noEquipmentOrLinksMessage: string
}

export const PanelStats = memo(
	({
		onlineCount,
		offlineCount,
		total,
		percentageTitle,
		totalCountTitle,
		noEquipmentOrLinksMessage
	}: PanelStatsProps) => {
		if (total === 0) {
			return (
				<DetailsPanelCard
					id="no-equipment-card-title"
					title={noEquipmentOrLinksMessage}
					role="status"
					color="azul"
					aria-live="polite"
					value={''}
				/>
			)
		}

		const percentage = total > 0 ? (onlineCount / total) * 100 : 0

		return (
			<>
				<DetailsPanelCard
					id="active-percentage-card-title"
					title={percentageTitle}
					role="status"
					color="azul"
					value={`${percentage.toFixed(1)}%`}
					aria-live="polite"
				/>
				{/* Counts Grid */}
				<div className="grid grid-cols-2 gap-2">
					<DetailsPanelCard
						id="active-count-title"
						title="Activos"
						color="verde"
						className="text-center"
						value={`${onlineCount}`}
						aria-live="polite"
					/>
					<DetailsPanelCard
						id="inactive-count-title"
						color="rojo"
						title="Inactivos"
						className="text-center"
						value={`${offlineCount}`}
						aria-live="polite"
					/>
				</div>
				<DetailsPanelCard
					id="total-count-title"
					color="black"
					title={totalCountTitle}
					className="text-center"
					value={`${total}`}
					aria-live="polite"
				/>

				{/* Progress bar */}
				<StatusProgress
					id="network-status-label"
					aria-labelledby="network-status-label"
					label="Estado de la Red"
					role="group"
					aria-label="Progreso de estado de la red"
					total={total}
					value={onlineCount}
					indicatorColor="bg-verde"
				/>
			</>
		)
	}
)

PanelStats.displayName = 'PanelStats'
