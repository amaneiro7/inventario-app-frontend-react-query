import { memo, Suspense } from 'react'
import { LinkAsButton } from '../Button/LinkAsButton'
import { AddIcon } from '@/icon/AddIcon'
import { InputFallback } from '../Loading/InputFallback'

interface Props {
	searchInput?: React.ReactElement
	url: string
	isEdit?: boolean
}

export const SearchSection = memo(function ({ isEdit, searchInput, url }: Props) {
	return (
		<div className="flex w-full flex-col items-center justify-start gap-3 md:flex-row md:justify-between">
			<Suspense fallback={<InputFallback />}>{searchInput}</Suspense>
			{isEdit && (
				<LinkAsButton
					color="orange"
					className="justify-self-end"
					text="Agregar nuevo"
					url={url}
					hoverTranslate
					size="content"
					buttonSize="medium"
					icon={<AddIcon width={20} className="aspect-square fill-white stroke-[3px]" />}
				/>
			)}
		</div>
	)
})
