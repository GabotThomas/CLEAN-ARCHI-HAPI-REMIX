//register page for new users

import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { hapiFetch, useSubmitForm } from '~/hooks/useFetch';
import { getUser } from '~/loaders/user';


export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request);

    if (user) {
        return redirect('/');
    }

    return null;
};

export const action = async ({ request }: any) => {
    const result = await hapiFetch({
        url: '/users',
        method: 'POST',
        request,
    });

    if (result.success) {
        return redirect('/sign-in');
    }

    return null;
};

const Register = () => {
    const submitForm = useSubmitForm();
    const [email, setEmail] = useState('thomas@gmail.com');
    const [password, setPassword] = useState('Thomas');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        submitForm({ email, password, "grant_type": "password" });
    };

    return (
        <div>
            <h1>Register</h1>

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
                    Register
                </button>
            </form>

            <p>
                Already have an account? <Link to="/sign-in">Login</Link>
            </p>
        </div>
    );
}

export default Register;
