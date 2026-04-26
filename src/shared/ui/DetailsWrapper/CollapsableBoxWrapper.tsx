import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion'
import { cn } from '@/shared/lib/utils'

interface CollapsableBoxWrapperProps extends React.PropsWithChildren {
	title?: string
	className?: string
	isDefaultOpen?: boolean
}

export default function CollapsableBoxWrapper({
	children,
	title = 'Filtros de búsqueda',
	className,
	isDefaultOpen = false
}: CollapsableBoxWrapperProps) {
	return (
		<Accordion
			type="single"
			collapsible
			className={cn('w-full', className)}
			defaultValue={isDefaultOpen ? 'item-1' : undefined}
		>
			<AccordionItem value="item-1" className="border-none">
				<AccordionTrigger className="text-azul py-2 text-sm font-semibold tracking-wider normal-case hover:no-underline focus:ring-0">
					{title}
				</AccordionTrigger>
				<AccordionContent className="pt-4 pb-1">{children}</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
