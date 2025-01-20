interface Props {
    title: string
    text: string
}

export function TableCellDescInfo({ title, text }: Props) {
  return (
    <p className='max-w-fit flex flex-col gap-1 text-xs text-secondary'>
      <span className='font-extrabold'>{title}:</span>
      <span className='ml-2 font-light'>{text}</span>
    </p>
  )
}

