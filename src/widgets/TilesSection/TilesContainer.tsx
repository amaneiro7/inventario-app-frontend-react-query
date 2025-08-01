import { TilesBox } from "./TilesBox"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<typeof TilesBox>[]
}

export function TilesContainer({ children, ...props }: Props) {
    return <div {...props} className='w-full md:max-w-6xl grid grid-cols-1 md:grid-cols-2'>{children}</div>
}
