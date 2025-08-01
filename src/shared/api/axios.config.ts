import axios, { type AxiosInstance } from 'axios'
import { baseURL } from '../config'

export const api: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
})
