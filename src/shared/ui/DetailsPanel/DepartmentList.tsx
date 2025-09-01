import { memo } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion'
import { Badge } from '@/shared/ui/Badge'

interface DepartmentListProps {
	departments: (string | null)[]
}

export const DepartmentList = memo(({ departments }: DepartmentListProps) => {
	const filterNotNull = departments.filter(Boolean)
	if (!filterNotNull || filterNotNull.length === 0) {
		return null
	}

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>{`Departamentos en este piso (${filterNotNull.length})`}</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-wrap gap-2 p-1">
						{filterNotNull.map(
							(deparment, index) =>
								deparment && (
									<Badge key={index} variant="outline">
										{deparment}
									</Badge>
								)
						)}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
})

DepartmentList.displayName = 'DepartmentList'
