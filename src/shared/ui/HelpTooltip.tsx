import { lazy } from 'react'

const Tooltip = lazy(() => import('@/shared/ui/Tooltip').then(m => ({ default: m.Tooltip })))
const TooltipContent = lazy(() =>
	import('@/shared/ui/Tooltip').then(m => ({ default: m.TooltipContent }))
)
const TooltipTrigger = lazy(() =>
	import('@/shared/ui/Tooltip').then(m => ({ default: m.TooltipTrigger }))
)

export const HelpTooltip = ({ text }: { text: string }) => {
	return (
		<Tooltip>
			<TooltipTrigger
				type="button"
				className="mt-1 cursor-help rounded-full border border-gray-400 bg-gray-200 px-2 py-0.5 text-sm text-gray-600"
			>
				?
			</TooltipTrigger>
			<TooltipContent className="max-w-xs" side="right" align="center" sideOffset={10}>
				<p className="max-w-xs text-center">{text}</p>
			</TooltipContent>
		</Tooltip>
	)
}
