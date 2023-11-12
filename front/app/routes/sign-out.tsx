
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { logoutUser } from "~/loaders/user";


export const action = async ({ request }: LoaderFunctionArgs
) => logoutUser(request);

export const loader = async () => redirect("/");