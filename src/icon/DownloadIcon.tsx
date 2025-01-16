import Download from './download.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function DownloadIcon({...props}:Props) {
  return (
    <i>
      <Download {...props} />
    </i>
  )
}
