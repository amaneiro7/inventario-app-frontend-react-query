import { type TableCell } from './TableCell'
import { type TableHead } from './TableHead'

interface Props<T extends typeof TableHead | typeof TableCell> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  children: React.ReactElement<T> | Array<React.ReactElement<T>>
}

export function TableRow<T extends typeof TableHead | typeof TableCell>({
  children,  
  ...props
}: Props<T>) {
  return (    
    <tr
      {...props} className={`[&>td]:bg-slate-100 [&>td]:hover:bg-slate-200 text-xs ${props.className}`}
    >
      {children}
    </tr>
  )
}
