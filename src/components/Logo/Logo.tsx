import { lazy, memo } from "react"
import { titleLogo } from "@/config"
import { Link } from "react-router-dom"
import './Logo.css'

const LazyLogoImage = lazy(async () => import("../Images/LazyLogoImage").then((m) => ({ default: m.LazyLogoImage })))

function Logo() {
    return (
        <Link className='mx-auto' aria-label='Logo' aria-describedby='Logo y un enlace al inicio de la página' to='/'>
            <div className='Logo flex gap-2 divide-x-2 divide-azul-900 items-center'>
                <LazyLogoImage className='max-w-11 bg-contain mdlg:w-24 lg:w-28 clear-none' />
                <h1 className='pl-2 hidden md:flex flex-col font-semibold text-azul dark:text-white'>
                    Soporte Tecnico
                    <span className='text-azul-950/80'>
                        {`${titleLogo}`}
                    </span>
                </h1>
            </div>
        </Link>
    )
}

export default memo(Logo)