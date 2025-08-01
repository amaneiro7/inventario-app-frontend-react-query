import Download from './download.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function DownloadIcon({ ...props }: Props) {
  return (
    <i>
      <Download {...props} />
    </i>
  )
}
