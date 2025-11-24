import { memo } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion'

interface GroupedTransferListProps {
	title: string
}

export const GroupedTransferList = memo(
	({ title, children }: React.PropsWithChildren<GroupedTransferListProps>) => {
		return (
			<Accordion
				type="single"
				collapsible
				className="my-2 w-full rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
			>
				<AccordionItem value={title} className="border-b-0">
					<AccordionTrigger className='group cursor-pointer rounded-lg px-4 py-3 text-left font-semibold text-gray-800 transition-colors ease-in-out hover:bg-gray-50 hover:no-underline data-[state="open"]:rounded-t-lg data-[state="open"]:rounded-b-none'>
						{title}
					</AccordionTrigger>
					<AccordionContent className="p-0">
						<ul
							role="list"
							className="flex w-full flex-col divide-y divide-gray-100 border-t border-gray-200"
						>
							{children}
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		)
	}
)

GroupedTransferList.displayName = 'GroupedTransferList'
