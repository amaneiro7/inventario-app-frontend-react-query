import { memo } from 'react'
import Mail from './mail.svg?react'

export const MailIcon = memo(({...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <i>
      <Mail {...props} />
    </i>
  )
}
)