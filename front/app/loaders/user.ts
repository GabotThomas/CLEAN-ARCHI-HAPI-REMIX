import { redirect } from '@remix-run/node';
import { hapiFetch } from '~/hooks/useFetch';
import { TOKEN, USER, commitSession, getSession } from '~/services/session';

interface UserConnexion {
	user: any;
	token: string | null;
}

//interface for callback return string

export const getUser = async (request: Request): Promise<UserConnexion> => {
	const session = await getSession(request);

	const token = session.get(TOKEN) || '';
	const user: any = session.get(USER) || {};

	if (user.id) {
		const data = await hapiFetch({
			url: `/users/${user.id}`,
			method: 'GET',
			token,
		});

		if (data.success) {
			return { user: data.user, token };
		}
	}

	return { user: null, token: null };
};

export const loginUser = async (
	request: Request,
	user: any,
	token: string | null
): Promise<any> => {
	const options: ResponseInit = {};

	if (!token || !user) {
		return {
			success: false,
			message: 'Invalid credentials',
		};
	}

	const session = await getSession(request);

	session.set(TOKEN, token);
	session.set(USER, user);

	const cookie = await commitSession(session);
	options.headers = { 'Set-Cookie': cookie };

	return { success: true, message: 'Login success', options };
};

export const logoutUser = async (request: Request): Promise<ResponseInit> => {
	const session = await getSession(request);

	session.unset(TOKEN);
	session.unset(USER);

	const cookie = await commitSession(session);

	return redirect('/', {
		headers: {
			'Set-Cookie': cookie,
		},
	});
};
