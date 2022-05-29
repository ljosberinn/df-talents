import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App(): JSX.Element {
  return (
    <html lang="en" dir="auto" className="antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="text-gray-200 bg-gray-900">
        <main className="max-w-5xl m-auto">
          <h1 className="pt-8 pb-2 text-2xl text-center text-semibold">
            DF Talents Prototype
          </h1>

          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
      </body>
    </html>
  );
}
