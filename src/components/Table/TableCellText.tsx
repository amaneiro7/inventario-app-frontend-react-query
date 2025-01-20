export function TableCellText({ value }: { value: string | number }) {
    return (
      <p className='px-2 text-left align-middle whitespace-nowrap text-ellipsis overflow-hidden break-words cursor-default'>
        {value}
      </p>
    )
  }