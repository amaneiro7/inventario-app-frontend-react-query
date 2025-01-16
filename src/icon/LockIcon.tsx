import { memo } from 'react'
import Lock from './lock.svg?react'

export const LockIcon = memo(({...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <i>
      <Lock {...props} />
    </i>
  )
}
)