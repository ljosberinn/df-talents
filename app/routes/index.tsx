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
        children: [
          {
            type: "passive",
            id: 97,
            name: "Healing Touch",
            levels: 1,
            x: 4,
            y: 7,
          },
        ],
      },
      {
        name: "Thick Skin idk",
        levels: 1,
        type: "passive",
        x: 2,
        y: 5,
        id: 98,
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
                name: "Rejuvenation",
                levels: 2,
                x: 2,
                y: 3,
                id: 4,
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
                y: 3,
                x: 4,
                id: 145_108,
                type: "passive",
                children: cenarionWardSelect,
              },
              {
                name: "Swiftmend",
                levels: 1,
                id: 18_562,
                y: 4,
                x: 5,
                type: "passive",
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

  const matrix = Array.from<null[]>({ length: maxY })
    .fill(Array.from<null>({ length: maxX }).fill(null))
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
            return match.invested === 1;
          case "passive":
            return match.invested === match.levels;
          case "select": {
            return match.invested === 1;
          }
        }
      });
  };

  const hasDependants = (
    talent: FlatActiveTalent | FlatPassiveTalent | FlatSelectTalent
  ): boolean => {
    const key = `${talent.x}-${talent.y}`;

    if (talent.type === "select") {
      const { x, y } = talent;

      return values.some(
        (t) =>
          t.parents?.includes(key) && t.invested > 0 && t.x !== x && t.y !== y
      );
    }

    return values.some((talent) => {
      return talent.parents?.includes(key) && talent.invested > 0;
    });
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

      const nextInvestment =
        match.invested + 1 > match.levels ? 0 : match.invested + 1;

      return {
        ...prev,
        [key]: {
          ...match,
          invested: nextInvestment,
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
                  return <td key={columnIndex} />;
                }

                if (talent.type === "active") {
                  return (
                    <td key={columnIndex}>
                      <label>
                        <input
                          type="checkbox"
                          disabled={
                            !satisfiesRequirements(talent) ||
                            hasDependants(talent)
                          }
                          onChange={handleToggle}
                          name={`${talent.id}`}
                          data-key={`${columnIndex}-${rowIndex}`}
                        />
                        {talent.name}
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

                  const fulfillsRequirements = satisfiesRequirements(talent);
                  const childrenActive = hasDependants(talent);

                  const disabled = !fulfillsRequirements || childrenActive;

                  return (
                    <td key={columnIndex}>
                      <select onChange={handleSelection} disabled={disabled}>
                        <option value={`${talent.x}-${talent.y}`}>
                          deselect
                        </option>
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

                return (
                  <td key={columnIndex}>
                    <button
                      type="button"
                      disabled={
                        !satisfiesRequirements(talent) || hasDependants(talent)
                      }
                      onClick={handleClick}
                      data-key={`${columnIndex}-${rowIndex}`}
                    >
                      {talent.name}
                      <sup>{talent.invested}</sup>
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
