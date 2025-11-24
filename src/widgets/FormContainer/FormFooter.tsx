import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { LastUpdated } from '@/shared/ui/LastUpdated'
import { UpdatedBy } from '@/shared/ui/UpdatedBy'
import { HistoryDto } from '@/entities/history/domain/dto/History.dto'

interface FormFooterProps {
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
}

export const FormFooter = memo(({ lastUpdated, updatedBy }: FormFooterProps) => {
	return (
		<Typography variant="p" className="justify-self-end text-black/80">
			{lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}
			{updatedBy && updatedBy.length > 0 && <UpdatedBy history={updatedBy} />}
		</Typography>
	)
})

FormFooter.displayName = 'FormFooter'
