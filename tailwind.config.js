/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class', 'class'],
	theme: {
		extend: {
			colors: {
				naranja: {
					50: 'hsl(32, 100%, 96%)',
					100: 'hsl(34, 100%, 91%)',
					200: 'hsl(31, 100%, 83%)',
					300: 'hsl(30, 100%, 71%)',
					400: 'hsl(26, 100%, 60%)',
					500: 'hsl(23, 100%, 52%)',
					600: 'hsl(19, 99%, 50%)',
					700: 'hsl(16, 97%, 40%)',
					800: 'hsl(14, 87%, 34%)',
					900: 'hsl(13, 82%, 28%)',
					950: 'hsl(11, 89%, 15%)',
					DEFAULT: 'hsl(19, 99%, 50%)'
				},
				azul: {
					50: 'hsl(194, 100%, 96%)',
					100: 'hsl(196, 100%, 90%)',
					200: 'hsl(194, 100%, 83%)',
					300: 'hsl(191, 100%, 71%)',
					400: 'hsl(194, 100%, 57%)',
					500: 'hsl(200, 100%, 50%)',
					600: 'hsl(210, 100%, 50%)',
					700: 'hsl(217, 100%, 50%)',
					800: 'hsl(218, 100%, 45%)',
					900: 'hsl(215, 100%, 35%)',
					950: 'hsl(213, 100%, 19%)',
					DEFAULT: 'hsl(213, 100%, 19%)'
				},
				verde: {
					50: 'hsl(141, 100%, 97%)',
					100: 'hsl(147, 100%, 92%)',
					200: 'hsl(147, 100%, 85%)',
					300: 'hsl(147, 100%, 73%)',
					400: 'hsl(147, 92%, 58%)',
					500: 'hsl(147, 94%, 45%)',
					600: 'hsl(147, 100%, 36%)',
					700: 'hsl(148, 95%, 33%)',
					800: 'hsl(148, 85%, 24%)',
					900: 'hsl(149, 81%, 20%)',
					950: 'hsl(149, 100%, 10%)',
					DEFAULT: 'hsl(148, 95%, 33%)'
				},
				rojo: {
					50: 'hsl(5, 86%, 97%)',
					100: 'hsl(2, 93%, 94%)',
					200: 'hsl(3, 100%, 89%)',
					300: 'hsl(3, 96%, 82%)',
					400: 'hsl(3, 93%, 71%)',
					500: 'hsl(3, 86%, 60%)',
					600: 'hsl(3, 74%, 48%)',
					700: 'hsl(3, 76%, 42%)',
					800: 'hsl(3, 72%, 35%)',
					900: 'hsl(3, 64%, 31%)',
					950: 'hsl(3, 77%, 15%)',
					DEFAULT: 'hsl(3, 74%, 48%)'
				},
				error: '#d32f2f',
				success: '#2e7d32',
				focus: '#1976d2',
				gris: '#77838f',
				cancel: '#77838f',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		animation: {
			'pulse-fast': 'pulse 2s ease-in-out 0s infinite',
			'pulse-medium': 'pulse 2s ease-in-out 1.5s infinite',
			'pulse-slow': 'pulse 2s ease-in-out 3s infinite'
		}
	}
}
