import { lazy } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const EditIcon = lazy(async () => import("../icon/EditIcon").then(m => ({ default: m.EditIcon })))

interface Props {
    state: LinkProps['state'],
    url: string
    stateId?: string
  }
  

export function TableCellDescEdit({ state, url, stateId }: Props) {
  return (
    <p className=' w-min text-xs flex flex-row align-middle justify-center items-center gap-1 text-secondary'>
      <span className='font-extrabold'>Editar:</span>
      <Link
        to={url}
        state={{ state }}          
        className='w-full h-full'
        aria-label='icono de edición'
        aria-description='enlace para editar el elemento'
        title={`Editar el elemento con el id ${stateId ?? url}`}
      >
        <EditIcon className='ml-2 w-6 p-1 aspect-square bg-terciary text-white rounded' />
      </Link>
    </p>
  )
}
