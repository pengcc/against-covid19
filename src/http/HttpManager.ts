import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from '../constants/globals';

/**
 * axios single instance manager
 */
export default class HttpManager
{
	// HttpManager instance
	private static _httpManager: HttpManager

	// axios instance
	private instance: AxiosInstance

	private accessToken: string

	private store: any

	constructor()
	{
		this.instance = axios.create({
			baseURL: BASE_URL,
			timeout: 10000,
			withCredentials: false, // allowed to carry cookies
			headers: {'Cache-Control': 'no-cache'},
		})
		this.initInterceptors()
	}

	public static getInstance()
	{
		if (!this._httpManager)
		{
			this._httpManager = new HttpManager()
		}

		return this._httpManager
	}

	public init(store)
	{
		this.store = store
	}

	private initInterceptors()
	{
		if (this.instance)
		{
			// Add a request interceptor
			this.instance.interceptors.request.use(
				(config: AxiosRequestConfig) =>
				{
					// Do something before request is sent
					return config
				},
				(error: any) =>
				{
					return Promise.reject(error)
				}
			)

			// Add a response interceptor
			this.instance.interceptors.response.use(
				(response: AxiosResponse) =>
				{
					return response.data
				},
				(error: any) =>
				{
					if (error.response)
					{
						switch (error.response.status)
						{
						}
					}
					else
					{
						if (error.message === 'Network Error')
						{
							console.warn('Network Error')
							//this.handleNetworkError()
						}
					}
					return Promise.reject(error)
				}
			)
		}
	}


	public setRequestTimeout(time: number)
	{
		this.instance.defaults.timeout = time
	}

	public setBASE_URL(url: string)
	{
		this.instance.defaults.baseURL = url
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.get(url, config || { headers: { } })
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.post(url, data, config || { headers: { } })
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.put(url, data, config || { headers: { } })
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.delete(url, config || { headers: { } })
	}
}