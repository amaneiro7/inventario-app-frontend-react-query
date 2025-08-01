import { lazy, Suspense } from 'react'
import { type TilesInvisible } from './TilesInvisible'
import { type TilesVisible } from './TilesVisible'

interface Props {
	children: React.ReactElement<typeof TilesInvisible | typeof TilesVisible>[]
	img?: string
}

const LazyCodeScrenImage = lazy(async () =>
	import('@/shared/ui/Images/LazyCodeScreen').then(m => ({ default: m.LazyCodeScrenImage }))
)
const LazyInventroyBoxes = lazy(async () =>
	import('@/shared/ui/Images/LazyInventoryBoxes').then(m => ({ default: m.LazyInventroyBoxes }))
)
const LazyOfficeNotebookImage = lazy(async () =>
	import('@/shared/ui/Images/LazyOfficeNoteBookImg').then(m => ({
		default: m.LazyOfficeNotebookImage
	}))
)
const LazyOfficeTableDeskImg = lazy(async () =>
	import('@/shared/ui/Images/LazyOfficeTableDeskImg').then(m => ({
		default: m.LazyOfficeTableDeskImg
	}))
)
const LazyDefaultImg = lazy(async () =>
	import('@/shared/ui/Images/LazyDefaultImg').then(m => ({ default: m.LazyDefaultImg }))
)
const LazyOfficeImg = lazy(async () =>
	import('@/shared/ui/Images/LazyOffice1Image').then(m => ({ default: m.LazyOfficeImage }))
)

type RenderImg =
	| typeof LazyCodeScrenImage
	| typeof LazyInventroyBoxes
	| typeof LazyOfficeNotebookImage
	| typeof LazyOfficeTableDeskImg
	| typeof LazyDefaultImg
	| typeof LazyOfficeImg

export type TypeOFImg = keyof typeof renderImg

const renderImg = {
	inventoryBox: LazyInventroyBoxes,
	officeDesk: LazyOfficeTableDeskImg,
	codeScreen: LazyCodeScrenImage,
	officeNotebook: LazyOfficeNotebookImage,
	officeMac: LazyOfficeImg,
	default: LazyDefaultImg
}
export function TilesBox({ children, img }: Props & { img: TypeOFImg }) {
	const ImgToRender: RenderImg = renderImg[img] ?? LazyDefaultImg
	return (
		<div className="group before:bg-naranja/85 min-h72 relative h-72 w-full overflow-hidden before:absolute before:top-[200%] before:-left-3/4 before:block before:h-[220%] before:w-[250%] before:origin-center before:-rotate-[25deg] before:transition-all before:duration-700 before:ease-in-out before:will-change-transform odd:text-white even:text-black hover:before:-top-3/4">
			<Suspense fallback={<div className="h-full w-full animate-pulse bg-slate-400" />}>
				<ImgToRender className="b-0 h-full w-full max-w-full object-cover object-center align-middle" />
			</Suspense>
			{children}
		</div>
	)
}
