/* eslint-disable react/no-array-index-key */
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";

type TalentBase = {
  x: number;
  y: number;
  minPointRequirement?: number;
};

type Select = TalentBase & {
  type: "select";
  options: Active[];
  children?: (Select | Active | Passive)[];
};

type Active = TalentBase & {
  type: "active";
  id: number;
  name: string;
  children?: (Select | Active | Passive)[];
};

type Passive = TalentBase & {
  type: "passive";
  id: number;
  name: string;
  levels: number;
  children?: (Select | Active | Passive)[];
};

type Talent = Select | Active | Passive;

type Tree = Talent[];

type FlatActiveTalent = FlattenedTalent<Active>;
type FlatPassiveTalent = FlattenedTalent<Passive>;
type FlatSelectTalent = FlattenedTalent<Select>;
type FlattenedTalent<T extends Talent> = Omit<T, "children" | "options"> & {
  parents?: string[];
  invested: number;
};

const convokeSelect: Select = {
  type: "select",
  x: 3,
  y: 9,
  options: [
    {
      type: "active",
      id: 93,
      name: "Convoke the Spirits",
      x: 3,
      y: 9,
    },
  ],
};

const flowersPassive: Passive = {
  type: "passive",
  name: "Flowers",
  id: 94,
  levels: 2,
  x: 4,
  y: 8,
  children: [convokeSelect],
};

const someFeralPassive: Passive = {
  type: "passive",
  id: 92,
  levels: 1,
  name: "Feral Passive",
  x: 3,
  y: 7,
  children: [flowersPassive],
};

const cultivationPassive: Passive = {
  type: "passive",
  id: 200_390,
  name: "Cultivation",
  levels: 1,
  x: 4,
  y: 6,
  children: [someFeralPassive],
};

const overgrowthSelect: Select = {
  type: "select",
  options: [
    {
      name: "Overgrowth",
      id: 203_651,
      type: "active",
      x: 2,
      y: 6,
    },
  ],
  x: 2,
  y: 6,
  children: [someFeralPassive],
};

const cenarionWardSelect: Talent["children"] = [
  {
    type: "select",
    x: 3,
    y: 4,
    options: [
      {
        name: "Cenarion Ward",
        type: "active",
        x: 3,
        y: 4,
        id: 102_351,
      },
      {
        name: "Cenarion Ward 2",
        type: "active",
        x: 3,
        y: 4,
        id: 102_352,
      },
      {
        name: "Cenarion Ward 3",
        type: "active",
        x: 3,
        y: 4,
        id: 102_353,
      },
    ],
    children: [
      {
        name: "Improved Innervate",
        levels: 2,
        type: "passive",
        x: 4,
        y: 5,
        id: 99,
        children: [cultivationPassive],
      },
      {
        name: "Thick Skin?",
        levels: 1,
        type: "passive",
        x: 2,
        y: 5,
        id: 98,
        children: [overgrowthSelect],
      },
    ],
  },
];

const restoration: Tree = [
  {
    x: 3,
    y: 0,
    name: "Lifebloom",
    id: 33_763,
    type: "active",
    children: [
      {
        x: 2,
        y: 1,
        name: "Efflorescence",
        type: "active",
        id: 145_205,
        children: [
          {
            name: "Nature's Cure",
            x: 1,
            y: 2,
            id: 88_423,
            type: "active",
            children: [
              {
                name: "Regrowth",
                levels: 2,
                x: 2,
                y: 3,
                id: 8936,
                type: "passive",
                children: cenarionWardSelect,
              },
              {
                name: "Wild Growth",
                levels: 3,
                x: 1,
                y: 4,
                id: 5,
                type: "passive",
                children: [
                  {
                    name: "Soul of the Forest",
                    id: 158_478,
                    levels: 1,
                    type: "passive",
                    x: 1,
                    y: 5,
                    children: [
                      overgrowthSelect,
                      {
                        type: "select",
                        x: 1,
                        y: 7,
                        options: [
                          {
                            name: "Tree of Life",
                            id: 123,
                            type: "active",
                            x: 1,
                            y: 7,
                          },
                        ],
                        children: [
                          {
                            type: "passive",
                            name: "Rejuvenation",
                            x: 0,
                            y: 8,
                            levels: 1,
                            id: 231_040,
                            children: [
                              {
                                type: "select",
                                x: 0,
                                y: 9,
                                options: [
                                  {
                                    id: 274_902,
                                    name: "Photosynthesis",
                                    type: "active",
                                    x: 0,
                                    y: 9,
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "passive",
                            x: 1,
                            y: 8,
                            levels: 1,
                            name: "Another Swirlie",
                            id: 90,
                          },
                          {
                            type: "passive",
                            name: "Fury of Elune",
                            id: 202_770,
                            children: [convokeSelect],
                            x: 2,
                            y: 8,
                            levels: 1,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "passive",
        x: 3,
        y: 1,
        levels: 1,
        name: "Improved Lifebloom",
        id: 6,
        children: [
          {
            id: 50_464,
            x: 3,
            y: 2,
            name: "Nourish",
            type: "active",
          },
        ],
      },
      {
        x: 4,
        y: 1,
        levels: 1,
        name: "Omen of Clarity",
        id: 113_043,
        type: "passive",
        children: [
          {
            name: "Ironbark",
            id: 102_342,
            x: 5,
            y: 2,
            type: "active",
            children: [
              {
                name: "Improved Ironbark",
                levels: 2,
                id: 10,
                x: 6,
                y: 3,
                type: "passive",
              },
              {
                levels: 2,
                name: "Ysera's Gift",
                x: 4,
                y: 3,
                id: 145_108,
                type: "passive",
                children: cenarionWardSelect,
              },
              {
                name: "Swiftmend",
                levels: 1,
                id: 18_562,
                x: 5,
                y: 4,
                type: "passive",
                children: [
                  {
                    name: "Germination",
                    levels: 1,
                    id: 155_675,
                    type: "passive",
                    x: 5,
                    y: 5,
                    children: [
                      cultivationPassive,
                      {
                        name: "Green Swirlie",
                        id: 89,
                        levels: 2,
                        type: "passive",
                        x: 5,
                        y: 6,
                        children: [
                          {
                            type: "active",
                            x: 5,
                            y: 7,
                            id: 95,
                            name: "Cat Eyes",
                            children: [
                              flowersPassive,
                              {
                                type: "passive",
                                name: "some shaman icon",
                                id: 92,
                                x: 6,
                                y: 8,
                                levels: 1,
                                children: [
                                  {
                                    type: "select",
                                    x: 6,
                                    y: 9,
                                    options: [
                                      {
                                        type: "active",
                                        id: 197_721,
                                        name: "Flourish",
                                        x: 6,
                                        y: 9,
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

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

function flattenTree(tree: Tree) {
  const result: Record<
    string,
    FlatSelectTalent | FlatActiveTalent | FlatPassiveTalent
  > = {};

  tree.forEach((talent) => {
    iterate(result, talent);
  });

  return result;
}

const flattenedTree = flattenTree(restoration);

export default function Index(): JSX.Element {
  const [tree, setTree] = useState(flattenedTree);

  const keys = Object.keys(tree);
  const values = Object.values(tree);

  const maxX = values.reduce((acc, talent) => {
    return acc > talent.x ? acc : talent.x;
  }, 0);

  const maxY = values.reduce((acc, talent) => {
    return acc > talent.y ? acc : talent.y;
  }, 0);

  const matrix = Array.from<null[]>({ length: maxY + 1 })
    .fill(Array.from<null>({ length: maxX + 1 }).fill(null))
    .map((row, columnIndex) => {
      return row.map((column, rowIndex) => {
        const key = [rowIndex, columnIndex].join("-");

        if (key in tree) {
          return tree[key];
        }

        return column;
      });
    });

  const satisfiesRequirements = (
    talent: FlatActiveTalent | FlatPassiveTalent | FlatSelectTalent
  ): boolean => {
    if (!talent.parents) {
      return true;
    }

    return talent.parents
      .map((parent) => tree[parent])
      .some((match) => {
        switch (match.type) {
          case "active":
          case "select":
            return match.invested === 1;
          case "passive":
            return match.invested === match.levels;
        }
      });
  };

  const hasDependants = (
    talent: FlatActiveTalent | FlatPassiveTalent | FlatSelectTalent
  ): boolean => {
    const key = `${talent.x}-${talent.y}`;

    if (talent.type === "select") {
      const { x, y } = talent;

      debugger;

      return values.some(
        (t) =>
          t.parents?.includes(key) && t.invested > 0 && t.x !== x && t.y !== y
      );
    }

    // bail if possible dependants could be reached from a diff branch
    if (talent.type === "passive" && talent.invested < talent.levels) {
      return false;
    }

    const dependants = values.filter((talent) => talent.parents?.includes(key));

    const dependantsWithAlternativeBranch = [
      ...new Set(
        dependants
          .filter((dependant) => (dependant.parents?.length ?? 0) > 1)
          .flatMap((dependant) => dependant.parents)
      ),
    ].filter(
      (dependantKey): dependantKey is string =>
        typeof dependantKey !== "undefined" && dependantKey !== key
    );

    // if there is a dependant with multiple parents, check whether the other parent is satisfied
    const otherDependantSatisfiesRequirement = dependantsWithAlternativeBranch
      .map((key) => tree[key])
      .some((talent) => {
        switch (talent.type) {
          case "passive":
            return talent.invested === talent.levels;
          case "select":
          case "active":
            return talent.invested === 1;
        }
      });

    if (talent.name === "Ironbark") {
      debugger;
    }

    // if so, no other dependant may only depend on this node
    if (otherDependantSatisfiesRequirement) {
      return dependants
        .filter((dependant) => (dependant.parents?.length ?? 0) === 1)
        .some((dependant) => dependant.invested > 0);
    }

    return dependants.some((dependant) => dependant.invested > 0);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { key } = event.currentTarget.dataset;

    if (!key) {
      throw new Error("impossible");
    }

    setTree((prev) => {
      const match = prev[key];

      if (match.type !== "passive") {
        return prev;
      }

      return {
        ...prev,
        [key]: {
          ...match,
          invested: match.invested + 1 > match.levels ? 0 : match.invested + 1,
        },
      };
    });
  };

  const handleToggle: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { key } = event.target.dataset;

    if (!key) {
      throw new Error("impossible");
    }

    setTree((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          invested: prev[key].invested === 1 ? 0 : 1,
        },
      };
    });
  };

  const handleSelection: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;

    if (value.includes("-")) {
      setTree((prev) => {
        return {
          ...prev,
          [value]: {
            ...prev[value],
            invested: 0,
          },
        };
      });

      return;
    }

    const id = Number.parseInt(value);

    const match = values.find(
      (value) => value.type === "active" && value.id === id
    );

    if (!match || !match.parents) {
      throw new Error("impossible");
    }

    const [key] = match.parents;

    setTree((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          invested: 1,
        },
      };
    });
  };

  return (
    <table className="w-full">
      <tbody>
        {matrix.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((talent, columnIndex) => {
                if (!talent) {
                  return (
                    <td
                      className="p-2 text-slate-800 text-center"
                      key={columnIndex}
                    >{`${columnIndex}-${rowIndex}`}</td>
                  );
                }

                if (talent.type === "active") {
                  const disabled =
                    !satisfiesRequirements(talent) || hasDependants(talent);
                  const key = `${columnIndex}-${rowIndex}`;

                  return (
                    <td key={columnIndex} className="p-4">
                      <input
                        type="checkbox"
                        disabled={disabled}
                        onChange={handleToggle}
                        name={`${talent.id}`}
                        data-key={key}
                        className="hidden"
                        id={key}
                        aria-label={talent.name}
                      />
                      <label
                        htmlFor={key}
                        className={`rounded-md bg-slate-600 p-2 cursor-pointer ${
                          disabled ? "bg-slate-800" : ""
                        }`}
                      >
                        {talent.name}
                        <sup>{talent.invested}/1</sup>
                      </label>
                    </td>
                  );
                }

                if (talent.type === "select") {
                  const options: FlatActiveTalent[] = keys
                    .filter((key) => key.startsWith(`${talent.x}-${talent.y}-`))
                    .map((key) => flattenedTree[key])
                    .filter(
                      (talent): talent is FlatActiveTalent =>
                        talent.type === "active"
                    );

                  return (
                    <td key={columnIndex}>
                      <select
                        onChange={handleSelection}
                        disabled={!satisfiesRequirements(talent)}
                      >
                        {hasDependants(talent) ? null : (
                          <option value={`${talent.x}-${talent.y}`}>
                            deselect
                          </option>
                        )}
                        {options.map((talent, index) => {
                          return (
                            <option
                              key={talent.id}
                              value={talent.id}
                              data-key={`${columnIndex}-${rowIndex}-${index}`}
                            >
                              {talent.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  );
                }

                const disabled =
                  !satisfiesRequirements(talent) || hasDependants(talent);

                return (
                  <td key={columnIndex} className="p-2">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={handleClick}
                      data-key={`${columnIndex}-${rowIndex}`}
                      className={`rounded-md bg-slate-600 p-2 ${
                        disabled ? "bg-slate-800" : ""
                      }`}
                    >
                      {talent.name}
                      <sup>
                        {talent.invested}/{talent.levels}
                      </sup>
                    </button>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
