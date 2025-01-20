type ParagraphOption = "small" | "medium" | "large" | "tiny"
export type VariantType =
    | {
        variant?: "h1"
        option?: "landing"
    }
    | {
        variant?: "h2" | "h3" | "h4" | "h5" | "h6"
        option?: null
    }
    | {
        variant?: "p" | 'span'
        option?: ParagraphOption
    }

export type AlignType = "left" | "center" | "right"
export type ColorType = 'naranja' | 'azul' | 'verde' | 'rojo' | 'black' | 'white' | 'gris'
export type BackgroundType = 'naranja' | 'azul' | 'verde' | 'rojo' | 'black' | 'white' | 'gris'
export type TransformType = "uppercase" | "lowercase" | "capitalize"
export type WeightType = "light" | "normal" | "medium" | "bold"