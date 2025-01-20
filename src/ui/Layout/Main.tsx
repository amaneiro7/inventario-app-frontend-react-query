import { memo } from "react"
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLElement>

export const Main = memo(({ children, ...props }: React.PropsWithChildren<Props>) => {
    return (
        <main className="max-w-full max-h-min flex flex-col px-8 pt-4 pb-0 md:flex-1" {...props}>
            {children}
        </main>
    )
})

