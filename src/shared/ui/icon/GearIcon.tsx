import Gear from './gear.svg?react'

export function GearIcon({...props}: React.SVGProps<SVGSVGElement>) {
  return (
    <i>
      <Gear {...props} />
    </i>
  )
}
