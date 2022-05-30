export type TalentBase = {
  x: number;
  y: number;
  minPointRequirement?: number;
};

export type Select = TalentBase & {
  type: "select";
  options: Active[];
  children?: (Select | Active | Passive)[];
};

export type Active = TalentBase & {
  type: "active";
  id: number;
  name: string;
  children?: (Select | Active | Passive)[];
};

export type Passive = TalentBase & {
  type: "passive";
  id: number;
  name: string;
  levels: number;
  children?: (Select | Active | Passive)[];
};

export type Talent = Select | Active | Passive;

export type Tree = Talent[];

export type FlatActiveTalent = FlattenedTalent<Active>;
export type FlatPassiveTalent = FlattenedTalent<Passive>;
export type FlatSelectTalent = FlattenedTalent<Select>;
type FlattenedTalent<T extends Talent> = Omit<T, "children" | "options"> & {
  parents?: string[];
  invested: number;
};

const createFlattenedChild = (
  talent: Talent,
  parent?: string
): FlatSelectTalent | FlatActiveTalent | FlatPassiveTalent => {
  if (talent.type === "select") {
    const result: FlatSelectTalent = {
      type: "select",
      x: talent.x,
      y: talent.y,
      invested: 0,
    };

    if (parent) {
      result.parents = [parent];
    }

    if (typeof talent.minPointRequirement !== "undefined") {
      result.minPointRequirement = talent.minPointRequirement;
    }

    return result;
  }

  if (talent.type === "active") {
    const result: FlatActiveTalent = {
      x: talent.x,
      y: talent.y,
      type: "active",
      id: talent.id,
      name: talent.name,
      invested: 0,
    };

    if (parent) {
      result.parents = [parent];
    }

    if (typeof talent.minPointRequirement !== "undefined") {
      result.minPointRequirement = talent.minPointRequirement;
    }

    return result;
  }

  const result: FlatPassiveTalent = {
    x: talent.x,
    y: talent.y,
    type: talent.type,
    id: talent.id,
    name: talent.name,
    levels: talent.levels,
    invested: 0,
  };

  if (parent) {
    result.parents = [parent];
  }

  if (typeof talent.minPointRequirement !== "undefined") {
    result.minPointRequirement = talent.minPointRequirement;
  }

  return result;
};

function iterate(
  on: Record<string, FlatSelectTalent | FlatActiveTalent | FlatPassiveTalent>,
  talent: Talent,
  parent?: string
) {
  const baseKey = [talent.x, talent.y].join("-");

  // node has multiple parents
  if (baseKey in on && parent) {
    on[baseKey].parents?.push(parent);
  } else {
    on[baseKey] = createFlattenedChild(talent, parent);

    if (talent.type === "select") {
      talent.options.forEach((child, index) => {
        const key = [baseKey, index].join("-");

        on[key] = createFlattenedChild(child, baseKey);
      });
    }

    talent.children?.forEach((child) => {
      iterate(on, child, baseKey);
    });
  }
}

export type FlattenedTree = Record<
  string,
  FlatSelectTalent | FlatActiveTalent | FlatPassiveTalent
>;

export function flattenTree(tree: Tree): FlattenedTree {
  const result: Record<
    string,
    FlatSelectTalent | FlatActiveTalent | FlatPassiveTalent
  > = {};

  tree.forEach((talent) => {
    iterate(result, talent);
  });

  return result;
}
