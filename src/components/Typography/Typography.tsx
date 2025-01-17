import React, { ElementType, createElement, forwardRef } from "react";
import cn from "classnames";
import { twMerge } from "tailwind-merge";
import {
    AlignType,
    ColorType,
    TransformType,
    VariantType,
    WeightType,
} from "./types";
import { typography } from "./styles";

type Props = VariantType & {
    align?: AlignType;
    as?: ElementType;
    children: React.ReactNode;
    className?: string;
    color?: ColorType;
    transform?: TransformType;
    weight?: WeightType;
};

const Typography = forwardRef<HTMLElement, Props>(
    (
        {
            align,
            as,
            className,
            children,
            color,
            option,
            transform,
            variant = "p",
            weight,
            ...rest
        },
        ref
    ) => {
        const variantStyle = option
            ? typography[variant]?.options?.[option]
            : typography[variant].classes

        const classes = twMerge(
            cn({
                [variantStyle]: variant,
                [`text-${color}`]: color,
                [`${transform}`]: transform,
                [`text-${align}`]: align,
                [`font-${weight}`]: weight,
            }),
            className
        );

        return createElement(
            as || variant,
            {
                ...rest,
                ref,
                className: classes,
            },
            children
        );
    }
);

export default Typography;
