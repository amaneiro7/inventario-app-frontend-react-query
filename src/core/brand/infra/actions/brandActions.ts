import { BrandName } from '@/core/brand/domain/value-object/BrandName'

export async function brandAction(_prevState: unknown, formData: FormData) {
	const name = formData.get('name') as string

	if (!BrandName.isValid(name)) {
		return {
			success: false,
			message: BrandName.invalidMessage(name)
		}
	}

	return {
		success: true,
		message: ''
	}
}
