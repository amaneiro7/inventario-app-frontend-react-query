import Logout from './logout.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export const LogoutIcon = (({...props}:Props) => {
  return (
    <i>
      <Logout {...props} />
    </i>
  )
})
