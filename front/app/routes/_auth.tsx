import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import { getUser } from "~/loaders/user";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);

    if (user) {
        return redirect('/');
    }

    return null;
};

const AuthContainer = () => {
    return (
        <Outlet />
    );
}

export default AuthContainer;