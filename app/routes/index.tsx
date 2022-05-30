import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return redirect("/druid", 307);
};

export default function Index(): JSX.Element {
  return <Outlet />;
}
