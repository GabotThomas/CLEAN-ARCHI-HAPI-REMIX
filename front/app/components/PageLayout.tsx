import { Form, Link, useLoaderData } from '@remix-run/react'
import React from 'react'

const PageLayout = ({ children }: any) => {
    const data: any = useLoaderData();

    return (
        <>
            <header>
                <Link to="/"> EASY WIN </Link>
                {data?.user ?
                    <div>
                        <Link to="/profile">Profile</Link>
                        <Form method="post" action="/sign-out">
                            <input type="hidden" name="_method" value="delete" />
                            <button type="submit">Sign Out</button>
                        </Form>
                    </div>
                    :
                    <div>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>
                }
            </header >
            <main>
                {children}
            </main>
            <footer></footer>
        </>
    )
}

export default PageLayout