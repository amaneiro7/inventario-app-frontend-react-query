import { memo  } from 'react'
import { LinkAsButton } from '../Button/LinkAsButton'
import { AddIcon } from '@/icon/AddIcon'

interface Props {
	searchInput?: React.ReactElement
	url: string
	isEdit?: boolean
}

export const SearchSection = memo(function ({ isEdit, searchInput, url }: Props) {
	return (
		<div className="w-full flex flex-col justify-end items-end md:flex-row md:justify-between gap-3">
			{searchInput}
			{isEdit && (
				<LinkAsButton
					color="orange"
					className="justify-self-end"
					text="Agregar nuevo"
					url={url}
					hoverTranslate
					size="content"
					buttonSize="large"
					icon={<AddIcon width={20} className="aspect-square fill-white stroke-[3px]" />}
				/>
			)}
		</div>
	)
})
