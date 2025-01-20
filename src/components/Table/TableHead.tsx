type Props = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
  name: string
  size?: keyof typeof SIZE
}

const SIZE = {
  xxSmall: 'w-8', // 32px
  xSmall: 'w-20', // 80px
  small: 'w-28', // 112px
  medium: 'w-36', // 144px
  large: 'w-44', // 176px
  xLarge: 'w-52' // 224px
} as const

export function TableHead({ name, size, ...props }: Props) {
  return (
    <th 
      className={`min-h-9 h-9 p-2 font-semibold tracking-wider text-left whitespace-nowrap capitalize ${SIZE[size]} ${props.className}`}
      {...props}    
    >
      {name}
    </th>
  )
}
