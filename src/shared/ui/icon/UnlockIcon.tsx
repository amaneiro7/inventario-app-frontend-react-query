import { memo } from 'react'
import Unlock from './unlock.svg?react'

export const UnlockIcon = memo(({...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <i>
      <Unlock {...props} />
    </i>
  )
})