import Typography from '@/shared/ui/Typography'
import { Badge } from '@/shared/ui/Badge'
import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'

interface ModelModalTitleProps {
	modelName: string
	brandName: string
	categoryName: string
}

export const ModelModalTitle = ({ brandName, categoryName, modelName }: ModelModalTitleProps) => {
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{<GetDeviceIcon categoryName={categoryName} size={24} />}
				{modelName}
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				<Badge variant="secondary" color="white">
					{brandName}
				</Badge>

				<Typography variant="span" option="small" className="font-mono">
					{categoryName}
				</Typography>
			</div>
		</div>
	)
}
