import Typography from '@/shared/ui/Typography'

interface ShipmentDeviceCardDetailsProps {
	label: string
	value: string | null | undefined
}

export const DeviceSummaryCardDetails = ({ label, value }: ShipmentDeviceCardDetailsProps) => (
	<Typography variant="p" option="tiny" color="gris">
		{label}: <strong>{value ?? 'N/A'}</strong>
	</Typography>
)
