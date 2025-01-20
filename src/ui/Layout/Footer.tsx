import { lazy, memo } from 'react'

const Typography = lazy(async () => await import('../../components/Typography'))

export const Footer = memo(() => {
    return (
        <footer className='w-full min-h-8 h-8 bg-slate-700 flex justify-center p-2'>
            <Typography color='white' variant='p' option='small' align='center'>
                {`Hecho por Andres Maneiro, amaneiro7@gmail.com - Copyright © InventarioAPP 2024-${new Date().getFullYear()}.`}
            </Typography>
        </footer>
    )
}) 