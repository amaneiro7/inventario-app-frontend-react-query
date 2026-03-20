import CountUp, { type CountUpProps } from 'react-countup'

// Fallback de compatibilidad para evitar errores de "Element type is invalid"
// eslint_disable-next-line @typescript-eslint/no-explicit-any
export const CountUpComponent: React.FC<CountUpProps> = (CountUp as any).default || CountUp
