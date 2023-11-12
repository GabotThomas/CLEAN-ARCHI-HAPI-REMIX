import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
	token: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
};

type SessionFlashData = {
	error: string;
};

const sessionStorage = createCookieSessionStorage<
	SessionData,
	SessionFlashData
>({
	// a Cookie from `createCookie` or the CookieOptions to create one
	cookie: {
		name: '__session',

		// all of these are optional
		// domain: 'remix.run',
		// Expires can also be set (although maxAge overrides it when used in combination).
		// Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
		//
		// expires: new Date(Date.now() + 60_000),
		// httpOnly: true,
		maxAge: 60 * 60, // 1 hour
		path: '/',
		sameSite: 'lax',
		secrets: ['s3cret1'],
		//a revoir pour le https
		// secure: false,
	},
});

export const TOKEN = 'token';
export const USER = 'user';

export const getSession = async (request: Request) => {
	const cookie = request.headers.get('Cookie');
	return sessionStorage.getSession(cookie);
};

export const commitSession = sessionStorage.commitSession;

export const destroySession = sessionStorage.destroySession;

export default sessionStorage;
