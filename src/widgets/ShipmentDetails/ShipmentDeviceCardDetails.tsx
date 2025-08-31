import Typography from '@/shared/ui/Typography'

interface ShipmentDeviceCardDetailsProps {
	label: string
	value: string | null | undefined
}

export const ShipmentDeviceCardDetails = ({ label, value }: ShipmentDeviceCardDetailsProps) => (
	<Typography variant="span">
		{label}: <strong>{value ?? 'N/A'}</strong>
	</Typography>
)
