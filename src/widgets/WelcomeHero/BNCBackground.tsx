import { cn } from '@/shared/lib/utils'

interface BNCBackgroundProps {
	position?: 'left' | 'right'
}

export const BNCBackground = ({ position = 'right' }: BNCBackgroundProps) => {
	return (
		<div
			className={cn(
				position === 'right' ? 'right-0 bottom-0 scale-x-[-1]' : 'bottom-0 left-0',
				'pointer-events-none absolute right-0 bottom-0 h-full w-[25%] overflow-hidden opacity-10'
			)}
		>
			{/* Círculo base semi-ovalado en la esquina */}
			<div className="absolute right-0 bottom-0 h-full w-full overflow-hidden rounded-full bg-white/65">
				{/* <div className="absolute -bottom-2/5 left-1/6 aspect-square h-2/3 rounded-full bg-white/60" /> */}
				{/* Rayos - Usando el color del fondo principal (azul-950) */}
				{[-20, 5, 30, 55, 80].map(angle => (
					<div
						key={angle}
						className="bg-azul-800 absolute bottom-0 left-[15%] h-[130%] w-3.5 origin-bottom"
						style={{
							transform: `rotate(${angle}deg)`,
							clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' // Solo muestra la parte superior del rayo
						}}
					/>
				))}
				{/* Círculo base (Semicírculo del logo) */}
				<div className="bg-azul-800 absolute -bottom-[45%] left-0 aspect-square h-2/3 rounded-full" />
			</div>
		</div>
	)
}
