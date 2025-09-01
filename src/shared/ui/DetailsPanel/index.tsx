import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { usePanelText } from './usePanelText' // Hook para la lógica de texto
import { PanelHeader } from './PanelHeader'
import { PanelStats } from './PanelStats'
import { DepartmentList } from './DepartmentList'

interface DetailsPanelProps {
	selectedFloor: string | null
	panelTitleId: string
	panelDescriptionId: string
	onlineCount?: number
	total?: number
	offlineCount?: number
	isDataLoaded: boolean
	currentStateData: boolean
	departments?: (string | null)[]
	panelType: 'devices' | 'locations'
}

export const DetailsPanel = memo(
	({
		selectedFloor,
		panelDescriptionId,
		panelTitleId,
		offlineCount = 0,
		onlineCount = 0,
		total = 0,
		currentStateData,
		isDataLoaded,
		departments,
		panelType,
		children
	}: React.PropsWithChildren<DetailsPanelProps>) => {
		const {
			mainTitle,
			mainDescription,
			percentageTitle,
			totalCountTitle,
			noSelectionMessage,
			noEquipmentOrLinksMessage
		} = usePanelText(panelType, selectedFloor)

		return (
			<section
				className="h-withoutHeader flex flex-col space-y-2 overflow-y-auto p-1"
				aria-labelledby={panelTitleId}
				aria-describedby={panelDescriptionId}
				role="region"
			>
				<PanelHeader
					title={mainTitle}
					description={mainDescription}
					titleId={panelTitleId}
					descriptionId={panelDescriptionId}
				/>

				{isDataLoaded && currentStateData ? (
					<>
						<DepartmentList departments={departments ?? []} />
						<PanelStats
							onlineCount={onlineCount}
							offlineCount={offlineCount}
							total={total}
							percentageTitle={percentageTitle}
							totalCountTitle={totalCountTitle}
							noEquipmentOrLinksMessage={noEquipmentOrLinksMessage}
						/>
						{children}
					</>
				) : (
					<div className="text-muted-foreground p-8 text-center">
						<Typography>{noSelectionMessage}</Typography>
					</div>
				)}
			</section>
		)
	}
)

DetailsPanel.displayName = 'DetailsPanel'
