import { memo } from "react"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    desc: string
}

export const DescriptionDesc = memo(({ desc, ...props }: Props) => {
    return (
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0' {...props}>{desc}</dd>
    )
}
)