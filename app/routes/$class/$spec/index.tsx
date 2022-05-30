import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  LoaderFunction,
  HeadersFunction,
} from "@remix-run/server-runtime";
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

  const classTrees = trees[params.class];

  if (!("spec" in params) || !params.spec) {
    throw new Response(undefined, {
      status: 400,
      statusText: "Unknown spec.",
    });
  }

  if (!(params.spec in classTrees.specs)) {
    throw new Response(undefined, {
      status: 400,
      statusText: "Spec not implemented yet.",
    });
  }

  const { tree } = trees[params.class].specs[params.spec];

  return json(flattenTree(tree));
};

type Data = FlattenedTree;

export default function Spec(): JSX.Element {
  const tree = useLoaderData<Data>();

  return <Tree tree={tree} />;
}
