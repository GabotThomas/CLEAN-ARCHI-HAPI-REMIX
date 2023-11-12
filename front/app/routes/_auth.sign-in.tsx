import { redirect } from '@remix-run/node';
import { Link } from '@remix-run/react'
import { useState } from 'react'
import { hapiFetch, useSubmitForm } from '~/hooks/useFetch';
import { getUser, loginUser } from '~/loaders/user';

export const loader = async ({ request }: any) => {
    const { user } = await getUser(request);

    if (user) {
        return redirect('/');
    }

    return null;
};

export const action = async ({ request }: any) => {
    const auth = await hapiFetch({
        url: '/oauth/token',
        method: 'POST',
        request,
    });

    const result = await loginUser(
        request,
        auth.user,
        auth.token,
    );

    if (result.success) {
        return redirect('/', result.options);
    }

    return redirect('/sign-in');
};


const SignIn = () => {
    const submit = useSubmitForm();
    const [email, setEmail] = useState('thomas@gmail.com');
    const [password, setPassword] = useState('Thomas');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        submit({ email, password, "grant_type": "password" });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* {error && <p className="error">{error}</p>} */}

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    // disabled={loading}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    // disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                //  disabled={loading}
                >
                    Sign in
                </button>
            </form>

            <p>
                Already have an account? <Link to="/sign-up">Login</Link>
            </p>
        </div>
    )
}

export default SignIn;