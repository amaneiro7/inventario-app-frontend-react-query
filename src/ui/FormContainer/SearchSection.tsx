import { lazy, memo, Suspense } from 'react'

interface Props {
	searchInput?: React.ReactElement
	url: string
	isEdit?: boolean
}

const LinkAsButton = lazy(
	async () =>
		await import('@/components/Button/LinkAsButton').then(m => ({
			default: m.LinkAsButton
		}))
)
const AddIcon = lazy(() => import('@/icon/AddIcon').then(m => ({ default: m.AddIcon })))

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
					icon={
						<Suspense
							fallback={
								<div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
							}
						>
							<AddIcon width={20} className="aspect-square fill-white stroke-[3px]" />
						</Suspense>
					}
				/>
			)}
		</div>
	)
})
