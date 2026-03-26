import { z } from 'zod'

const ennVars = z.object({
	VITE_URL_API: z.string(),
	VITE_TITLE_LOGO: z.string()
})

const config = ennVars.parse(import.meta.env)

const { VITE_URL_API: baseURL, VITE_TITLE_LOGO: titleLogo } = config

export { baseURL, titleLogo }
