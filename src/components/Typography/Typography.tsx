import { ElementType, createElement } from "react"
import { type AlignType, type ColorType, type TransformType, type VariantType, type WeightType } from "./types"
import { typography } from "./style"
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

type Props = VariantType & {
    align?: AlignType,
    as?: ElementType
    children: React.ReactNode
    className?: string
    color?: ColorType
    transform?: TransformType
    weight: WeightType
}

export default function Typography({
    align,
    as,
    className,
    children,
    color,
    option,
    transform,
    variant = 'p',
    weight,
    ...rest
}: Props) {
    const variantStyle = option
        ? typography[variant]?.options[option]
        : typography[variant].classes

    const classes = twMerge(
        cn({
            [variantStyle]: variant,
            [`text-${color}`]: color,
            [`${transform}`]: transform,
            [`text-${align}`]: align,
            [`font-${weight}`]: weight
        }),
        className
    )

    return createElement(
        as || variant,
        {
            ...rest,
            className: classes
        },
        children
    )
}