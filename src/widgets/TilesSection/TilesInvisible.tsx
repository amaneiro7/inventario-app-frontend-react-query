import { memo } from "react";
import { type TilesInvisibleInfo } from "./TilesInvisibleInfo";

interface Props {
    children: React.ReactElement<typeof TilesInvisibleInfo>[]
}
export const TilesInvisible = memo(({ children }: Props) => {
    return (
        <div className='opacity-0 absolute top-0 left-0 w-full h-full flex text-white text-left group-hover:opacity-100 group-hover:pointer-events-auto p-4 flex-wrap content-center transition-all duration-500 ease-in-out'>
            <h4 className='w-full p-2 text-lg mx-2 font-medium'>
                <div className='flex flex-wrap text-white'>
                    <ul className='pl-2 mt-0 mb-2'>{children}</ul>
                </div>
            </h4>
        </div>
    )
})