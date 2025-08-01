export interface Response<T> {
	data: T[]
	info: {
		total: number
		page: number
		totalPage: number
	}
}
