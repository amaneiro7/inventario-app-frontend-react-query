export const typography: Record<
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p',
	{
		classes: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options?: Record<string, any>
	}
> = {
	h1: {
		classes: 'text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold leading-tight',

		options: {
			landing: 'text-5xl lg:text-6xl xl:text-7xl font-semibold'
		}
	},

	h2: {
		classes: 'text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold leading-tight'
	},

	h3: {
		classes: 'text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold'
	},

	h4: {
		classes: 'text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold'
	},

	h5: {
		classes: 'text-sx lg:text-sm xl:text-base 2xl:text-lg font-semibold'
	},

	h6: {
		classes: 'text-[0.5rem] lg:text-sx xl:text-sm 2xl:text-base font-semibold'
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
