import { memo, Suspense } from 'react'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'
import { AddIcon } from '@/shared/ui/icon/AddIcon'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

interface Props {
	searchInput?: React.ReactElement
	url: string
	isEdit?: boolean
	text?: string
}

export const SearchSection = memo(({ isEdit, searchInput, url, text = 'Agregar nuevo' }: Props) => {
	return (
		<div className="flex w-full flex-col items-center justify-start gap-3 md:flex-row md:justify-between">
			<Suspense fallback={<InputFallback />}>{searchInput}</Suspense>
			{isEdit && (
				<LinkAsButton
					color="orange"
					className="justify-self-end"
					text={text}
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
