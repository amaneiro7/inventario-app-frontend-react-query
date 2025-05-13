import { memo } from 'react'
import { LinkAsButton } from '../Button/LinkAsButton'
import { AddIcon } from '@/icon/AddIcon'

interface Props {
	searchInput?: React.ReactElement
	url: string
	isEdit?: boolean
}

export const SearchSection = memo(({ isEdit, searchInput, url }: Props) => {
	return (
		<div className="flex w-full flex-col items-center justify-start gap-3 md:flex-row md:justify-between">
			{searchInput}
			{isEdit && (
				<LinkAsButton
					color="orange"
					className="justify-self-end"
					text="Agregar nuevo"
					to={url}
					hoverTranslate
					size="content"
					buttonSize="medium"
					icon={<AddIcon width={20} className="aspect-square fill-white stroke-[3px]" />}
				/>
			)}
		</div>
	)
})
