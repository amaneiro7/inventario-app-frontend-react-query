import { lazy, memo } from "react"
// import { type DescriptionDesc } from "./DescriptionDesc"
// import { type EditHandle } from "../../page/user-management/profile/EditHandle"
// import { type ResetHandle } from "../../page/user-management/profile/Resethandle"
// import { type DeleteHandle } from "../../page/user-management/profile/Deletehandle"

const DesciptionTitle = lazy(async () => import("./DescriptionTitle").then(m => ({ default: m.DesciptionTitle })))

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  children?: React.ReactElement
  // children?: React.ReactElement<typeof DescriptionDesc | typeof EditHandle | typeof ResetHandle | typeof DeleteHandle>
}
export const DescriptionListElement = memo(({ title, children }: Props) => {
  return (
    <div className='min-h-10 overflow-hidden px-4 py-2 grid grid-cols-3 gap-4 justify-center items-center'>
      <DesciptionTitle title={title} />
      {children}
    </div>
  )
}
)