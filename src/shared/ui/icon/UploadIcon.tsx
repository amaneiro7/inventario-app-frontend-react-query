import Upload from './upload.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function UploadIcon({...props}:Props) {
  return (
    <i>
      <Upload {...props} />
    </i>
  )
}
