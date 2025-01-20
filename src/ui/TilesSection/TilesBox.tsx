import { lazy, Suspense } from "react";
import { type TilesInvisible } from "./TilesInvisible"
import { type TilesVisible } from "./TilesVisible"

interface Props {
    children: React.ReactElement<typeof TilesInvisible | typeof TilesVisible>[];
    img?: string;
}

const LazyCodeScrenImage = lazy(async () => import("@/components/Images/LazyCodeScreen").then((m) => ({ default: m.LazyCodeScrenImage })));
const LazyInventroyBoxes = lazy(async () => import("@/components/Images/LazyInventoryBoxes").then((m) => ({ default: m.LazyInventroyBoxes })));
const LazyOfficeNotebookImage = lazy(async () => import("@/components/Images/LazyOfficeNoteBookImg").then((m) => ({ default: m.LazyOfficeNotebookImage })));
const LazyOfficeTableDeskImg = lazy(async () => import("@/components/Images/LazyOfficeTableDeskImg").then((m) => ({ default: m.LazyOfficeTableDeskImg })));
const LazyDefaultImg = lazy(async () => import("@/components/Images/LazyDefaultImg").then((m) => ({ default: m.LazyDefaultImg })));
const LazyOfficeImg = lazy(async () => import("@/components/Images/LazyOffice1Image").then((m) => ({ default: m.LazyOfficeImage })));


type RenderImg = typeof LazyCodeScrenImage | typeof LazyInventroyBoxes | typeof LazyOfficeNotebookImage | typeof LazyOfficeTableDeskImg | typeof LazyDefaultImg | typeof LazyOfficeImg

export type TypeOFImg = keyof typeof renderImg

const renderImg = {
    inventoryBox: LazyInventroyBoxes,
    officeDesk: LazyOfficeTableDeskImg,
    codeScreen: LazyCodeScrenImage,
    officeNotebook: LazyOfficeNotebookImage,
    officeMac: LazyOfficeImg,
    default: LazyDefaultImg
};
export function TilesBox({ children, img }: Props & { img: TypeOFImg }) {
    const ImgToRender: RenderImg = renderImg[img] ?? LazyDefaultImg;
    return (
        <div className='overflow-hidden odd:text-white even:text-black group hover:before:-top-3/4 before:will-change-transform before:origin-center before:-rotate-[25deg] before:transition-all before:duration-700 before:ease-in-out before:absolute before:top-[200%] before:-left-3/4 before:w-[250%] before:block before:h-[220%] before:bg-naranja/85 relative w-full min-h72 h-72'>
            <Suspense fallback={<div className='w-full h-full animate-pulse bg-slate-400' />}>
                <ImgToRender className='object-cover object-center w-full h-full max-w-full align-middle b-0' />
            </Suspense>
            {children}
        </div>
    );
}
