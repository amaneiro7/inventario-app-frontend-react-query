import { memo } from 'react'
import { Icon, type IconName } from '@/shared/ui/icon/Icon'
import { cn } from '@/shared/lib/utils'

interface InfoItemProps {
	icon: IconName
	label: string
	value: string
	className?: string
	iconClassName?: string
}

export const InfoItem = memo(({ icon, label, value, className, iconClassName }: InfoItemProps) => {
	return (
		<span className={cn(`inline-flex items-center ${className}`)}>
			<Icon
				name={icon}
				className={cn(
					'bg-verde mr-1.5 h-4 w-4 flex-shrink-0 rounded-full p-0.5 text-white',
					iconClassName
				)}
				aria-hidden="true"
			/>
			<span className="mr-1">{label}</span>
			<span className="font-semibold">{value}</span>
		</span>
	)
})

InfoItem.displayName = 'InfoItem'
