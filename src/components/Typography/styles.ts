export const typography: Record<
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p',
	{
		classes: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options?: Record<string, any>
	}
> = {
	h1: {
		classes: 'text-4xl font-semibold leading-tight',
		options: {
			landing: 'text-6xl font-semibold'
		}
	},
	h2: {
		classes: 'text-3xl font-semibold leading-tight'
	},
	h3: {
		classes: 'text-2xl font-semibold'
	},
	h4: {
		classes: 'text-xl font-semibold'
	},
	h5: {
		classes: 'text-lg font-semibold'
	},
	h6: {
		classes: 'text-base font-semibold'
	},
	p: {
		classes: 'text-xs md:text-sm lg:text-base',
		options: {
			tiny: 'text-xs',
			small: 'text-sm',
			medium: 'text-lg',
			large: 'text-2xl'
		}
	},
	span: {
		classes: 'text-xs md:text-sm',
		options: {
			tiny: 'text-xs',
			small: 'text-sm',
			medium: 'text-lg',
			large: 'text-2xl'
		}
	}
}
