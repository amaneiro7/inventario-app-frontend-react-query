import { lazy, type JSX } from 'react'
import { BackgroundType } from '../Typography/types'

const Typography = lazy(async () => await import('@/components/Typography'))
const Tag = lazy(async () => await import('@/components/Tag').then(m => ({ default: m.Tag })))
const CheckIcon = lazy(
	async () => await import('@/icon/CheckIcon').then(m => ({ default: m.CheckIcon }))
)

interface Props {
	requisito: keyof typeof Requisito
	text: string
	icon?: JSX.Element
	iconText?: string
	backgroundColor?: BackgroundType
}

const Requisito = {
	obligatorio: 'bg-naranja-400',
	opcional: 'bg-cancel'
}

export function StepsText({ requisito, text, iconText, icon, backgroundColor }: Props) {
	return (
		<div className="flex gap-1 items-center">
			<CheckIcon
				width={24}
				className={`${Requisito[requisito]} aspect-square text-white rounded-full p-1`}
			/>
			<Typography variant="p" className="flex flex-row gap-1 items-center justify-center">
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
