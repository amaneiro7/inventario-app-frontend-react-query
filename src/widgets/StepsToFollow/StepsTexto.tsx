import Typography from '@/shared/ui/Typography'
import { CheckIcon } from '@/shared/ui/icon/CheckIcon'
import { Tag } from '@/shared/ui/Tag'
import { type BackgroundType } from '@/shared/ui/Typography/types'

interface StepsTextProps {
	requisito: keyof typeof Requisito
	text: string
	icon?: React.ReactElement
	iconText?: string
	backgroundColor?: BackgroundType
}

const Requisito = {
	obligatorio: 'bg-naranja-400',
	opcional: 'bg-cancel'
}

export function StepsText({ requisito, text, iconText, icon, backgroundColor }: StepsTextProps) {
	return (
		<div className="flex items-center gap-1">
			<CheckIcon
				width={24}
				className={`${Requisito[requisito]} aspect-square rounded-full p-1 text-white`}
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
					></Tag>
				) : null}
			</Typography>
		</div>
	)
}
