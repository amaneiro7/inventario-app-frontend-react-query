import ArrowLeftBadge from './arrow-left-badge.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ArrowLeftBadgeIcon({...props}: Props) {
  return (
    <i className='grid place-content-center'>
      <ArrowLeftBadge {...props} />
    </i>
  )
}
