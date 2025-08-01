import ArrowRightBadge from './arrow-right-badge.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ArrowRightBadgeIcon({...props}: Props) {
  return (
    <i className='grid place-content-center'>
      <ArrowRightBadge {...props} />
    </i>
  )
}
