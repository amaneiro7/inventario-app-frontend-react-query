import Typography from '@/shared/ui/Typography'

export const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
	<Typography color="gris" option="small" variant="p">
		{label}: <strong>{value}</strong>
	</Typography>
)
