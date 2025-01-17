import { type JSX, memo } from "react"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string
    color: keyof typeof COLOR
    size: keyof typeof SIZE
    buttonSize: keyof typeof BUTTONSIZE
    className?: string
    hoverTranslation?: boolean
    icon?: JSX.Element | null
}

const SIZE = {
    full: 'w-full',
    content: 'w-max',
} as const

const BUTTONSIZE = {
    small: 'min-h-6 h-6 py-1 px-2 text-xs',
    medium: 'min-h-8 h-8 py-2 px-2 text-sm',
    large: 'min-h-11 h-11 py-2 px-4 text-base'
} as const

const COLOR = {
    orange: 'border-none text-white bg-primary hover:bg-primary-700 disabled:bg-primary-700 active:bg-primary-800',
    green: 'border-none text-white border-terciary bg-terciary hover:bg-terciary-800 disabled:bg-terciary-800 active:bg-terciary-900',
    gray: 'text-cancel border-cancel bg-gray-200 hover:text-white hover:bg-cancel active:bg-cancel hover:shadow-md',
    red: 'border-none text-white border-quaternary bg-quaternary hover:bg-quaternary-500 disabled:bg-quaternary-500 active:bg-quaternary-quaternary-700',
    blue: 'border-none text-white border-secondary bg-secondary-800 hover:bg-secondary-700 disabled:bg-secondary-700 active:bg-secondary-950',
    secondary: `text-secondary border border-secondary bg-white hover:text-white hover:bg-secondary disabled:bg-secondary`
} as const

function Button({ text, hoverTranslation, icon, className, buttonSize, size, color, ...props }: Props) {
    return (
        <button
            className={`flex justify-center items-center gap-2 ${BUTTONSIZE[buttonSize]} ${COLOR[color]} ${SIZE[size]} font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${hoverTranslation && 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'} ${className}`}
            aria-label={`${text}`}
            title={`${text}`}
            {...props}
        >
            {icon}
            {text}
        </button>
    )
}

export default memo(Button)