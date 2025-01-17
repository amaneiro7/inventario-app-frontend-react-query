import { Link } from 'react-router-dom'
import Typography from '../Typography'

export default function Footer() {
    return (
        <footer className='w-full min-h-8 h-8 bg-slate-700 flex justify-center p-2'>
            <Typography color='white' variant='p' option='small' align='center'>
                {'Hecho por Andres Maneiro, amaneiro7@gmail.com - Copyright © '}
                <Link to='https://mui.com/'>InventarioAPP </Link>
                {`2024-${new Date().getFullYear()}.`}
            </Typography>
        </footer>
    )
}
