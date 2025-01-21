import { z } from 'zod'

const ennVars = z.object({
	VITE_URL_API: z.string(),
	MODE: z.enum(['development', 'production']),
	VITE_TITLE_LOGO: z.string()
})

const config = ennVars.parse(import.meta.env)

const { VITE_URL_API: baseURL, MODE: mode, VITE_TITLE_LOGO: titleLogo } = config

export { baseURL, mode, titleLogo }
