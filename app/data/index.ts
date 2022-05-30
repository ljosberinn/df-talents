import type { Tree } from "~/utils";

import { base as druidBase } from "./druid/base";
import { restoration } from "./druid/restoration";

export enum Class {
  demonhunter = "demon-hunter",
  deathknight = "death-knight",
  rogue = "rogue",
  mage = "mage",
  priest = "priest",
  warlock = "warlock",
  monk = "monk",
  hunter = "hunter",
  warrior = "warrior",
  druid = "druid",
  evoker = "evoker",
  shaman = "shaman",
}

export type SpecMeta = {
  icon: string;
  tree: Tree;
};

export const isClassName = (str: string): str is Class => str in Class;

export const trees: Record<
  Class,
  {
    base: null | SpecMeta;
    specs: Record<string, SpecMeta>;
  }
> = {
  druid: {
    base: druidBase,
    specs: {
      restoration,
    },
  },
  "death-knight": {
    base: null,
    specs: {},
  },
  "demon-hunter": {
    base: null,
    specs: {},
  },
  evoker: {
    base: null,
    specs: {},
  },
  hunter: {
    base: null,
    specs: {},
  },
  mage: {
    base: null,
    specs: {},
  },
  monk: {
    base: null,
    specs: {},
  },
  priest: {
    base: null,
    specs: {},
  },
  rogue: {
    base: null,
    specs: {},
  },
  shaman: {
    base: null,
    specs: {},
  },
  warlock: {
    base: null,
    specs: {},
  },
  warrior: {
    base: null,
    specs: {},
  },
};
