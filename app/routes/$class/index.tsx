import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Tree } from "~/components/Tree";
import { isClassName, trees } from "~/data";
import type { FlattenedTree } from "~/utils";
import { flattenTree } from "~/utils";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=1800, s-maxage=3600",
  };
};

export const loader: LoaderFunction = ({ params }) => {
  if (!("class" in params) || !params.class || !isClassName(params.class)) {
    throw new Response(undefined, {
      status: 400,
      statusText: "Unknown class.",
    });
  }

  const classMeta = trees[params.class];

  if (!classMeta.base) {
    throw new Response(undefined, {
      status: 400,
      statusText: "Class not implemented yet.",
    });
  }

  const specs = Object.entries(classMeta.specs).map(([key, meta]) => {
    return {
      name: key,
      icon: meta.icon,
    };
  });

  return json({
    tree: flattenTree(classMeta.base.tree),
    specs,
  });
};

type ClassProps = {
  tree: FlattenedTree;
  specs: { name: string; icon: string }[];
};

export default function Class(): JSX.Element {
  const data = useLoaderData<ClassProps>();

  return (
    <>
      <nav>
        <span>go to </span>
        {data.specs.map((spec) => {
          return (
            <NavLink key={spec.name} to={spec.name} className="underline">
              {spec.name}
            </NavLink>
          );
        })}
      </nav>

      <Tree tree={data.tree} />
    </>
  );
}
