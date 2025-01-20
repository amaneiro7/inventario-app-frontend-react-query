import { lazy, memo } from "react"
import { type DescriptionListElement } from "./DescriptionListElement"

const Typography = lazy(async () => await import("@/components/Typography"))

interface Props {
    title: string
    children: React.ReactElement<typeof DescriptionListElement>[]
}

export const DetailsInfo = memo(({ title, children }: Props) => {
    return (
        <div className='fit w-full p-4 flex justify-center bg-white rounded-2xl shadow'>
            <div className='w-1/2 h-full rounded shadow-lg shadow-slate-400'>
                <Typography color="white" className='w-full rounded-t px-4 py-2 bg-azul'>{title}</Typography>
                <dl className='divide-y divide-gray-300'>
                    {children}
                </dl>
            </div>
        </div>

    )
})