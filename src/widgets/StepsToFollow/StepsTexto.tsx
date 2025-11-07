import Typography from '@/shared/ui/Typography'
import { CheckIcon } from '@/shared/ui/icon/CheckIcon'
import { Tag } from '@/shared/ui/Tag'
import { type BackgroundType } from '@/shared/ui/Typography/types'
import { cn } from '@/shared/lib/utils'

interface StepsTextProps {
	requisito: string
	text: string
	icon?: React.ReactElement
	iconText?: string
	backgroundColor?: BackgroundType
}

export function StepsText({ requisito, text, iconText, icon, backgroundColor }: StepsTextProps) {
	const requisitoClass = requisito === 'obligatorio' ? 'bg-naranja-400' : 'bg-cancel'

	return (
		<div className="flex items-center gap-1">
			<CheckIcon
				width={24}
				className={cn('aspect-square rounded-full p-1 text-white', requisitoClass)}
			/>
			<Typography variant="p" className="flex flex-row items-center justify-center gap-1">
				<Typography color="gris" variant="span" transform="capitalize" weight="bold">
					{`${requisito}. `}
				</Typography>
				<Typography color="gris" variant="span">
					{text}
				</Typography>
				{icon ? (
					<Tag
						color="white"
						backgroundColor={backgroundColor}
						icon={icon}
						iconText={iconText}
					/>
				) : null}
			</Typography>
		</div>
	)
}
