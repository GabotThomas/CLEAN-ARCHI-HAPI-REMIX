import { useSubmit } from '@remix-run/react';
import { useState } from 'react';

interface LoadFetch {
	url: string;
	method?: string;
	headers?: {};
	body?: null | any;
	[key: string]: any;
}

const useFetch = (
	//callback optional attribute
	callback: Function | null = null
) => {
	const [loading, setLoading] = useState<Boolean>(false);

	const load = async ({
		url,
		method = 'GET',
		headers = {},
		body = null,
		...otherOptions
	}: LoadFetch) => {
		setLoading(true);

		try {
			const options: RequestInit = {
				method,
				headers,
			};

			if (body) {
				options.body = JSON.stringify(body);
				options.headers = {
					...headers,
					'Content-Type': 'application/json',
				};
			}

			const res = await fetch('http://127.0.0.1:3001' + url, {
				...options,
				...otherOptions,
			});
			const data = await res.json();
			data.status = res.status;
			data.success = res.ok;
			if (callback) {
				callback(data);
			}

			return data;
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return [load, loading] as const; //[Function, Boolean
};

export const hapiFetch = async ({
	url,
	method = 'GET',
	headers = {},
	request = null,
	token = null,
	...otherOptions
}: LoadFetch) => {
	try {
		const options: RequestInit = {
			method,
			headers,
		};

		if (request) {
			const { body }: any = Object.fromEntries(await request.formData());
			options.body = body;
			options.headers = {
				...headers,
				'Content-Type': 'application/json',
			};
		}

		if (token) {
			options.headers = {
				...headers,
				Authorization: `Bearer ${token}`,
			};
		}

		const res = await fetch('http://127.0.0.1:3001' + url, {
			...options,
			...otherOptions,
		});
		const data = await res.json();
		data.status = res.status;
		data.success = res.ok;

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const useSubmitForm = () => {
	const submit = useSubmit();

	const submitForm = (data: any, method: any = 'POST') => {
		submit({ body: JSON.stringify(data) }, { method });
	};

	return submitForm;
};

export default useFetch;
