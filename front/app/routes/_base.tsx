import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PageLayout from "~/components/PageLayout";
import { getUser } from "~/loaders/user";


export const meta: MetaFunction = () => {
  return [
    { title: "APPLICATION" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { user } = await getUser(request);

    return json({ user });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};

const Index = () => {
  const data = useLoaderData();

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

export default Index;