import { lazy } from "react"
import { Link } from "react-router-dom"
import { navigation } from "@/routes/navigation"

const ArrowRightBadge = lazy(async () => import("@/icon/ArrowRightBadge").then((m) => ({ default: m.ArrowRightBadgeIcon })))

export function Nav() {
    return (
        <nav
            style={{
                height: "calc(100vh - 64px)",
            }}
            className='nav-content -right-2/3 fixed top-16 p-8 max-w-2/3 md:w-1/2 z-40 text-white bg-azul-950/95 transition-transform transform-gpu will-change-transform duration-300 ease-in-out overflow-auto'
        >
            {navigation.map((nav) => (
                <ul key={nav.label}>
                    <li>
                        <h3 key={nav.label} className='text-2xl font-medium'>
                            {nav.label}
                        </h3>
                        <ul className='mt-4 mb-3'>
                            {nav.navs.map((item, index) => (
                                <li key={index} className='list-item'>
                                    <Link
                                        to={item.path}
                                        className='font-body text-base text-center tracking-wide h-8 px-4 py-2 font-semibold flex items-center hover:text-naranja transition-colors'
                                        aria-label={item.title}
                                        aria-description={item.desc}
                                    >
                                        <ArrowRightBadge className='text-naranja' />
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            ))}
        </nav>
    )
}
