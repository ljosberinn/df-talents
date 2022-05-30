/* eslint-disable react/no-array-index-key */
import type { MouseEventHandler, ChangeEventHandler } from "react";
import { useState, useCallback } from "react";
import type {
  FlatActiveTalent,
  FlatPassiveTalent,
  FlatSelectTalent,
  FlattenedTree,
} from "~/utils";

type TreeProps = {
  tree: FlattenedTree;
};

const calculateDimensions = (tree: FlattenedTree) => {
  return Object.values(tree).reduce(
    (acc, talent) => {
      if (talent.x > acc.x) {
        acc.x = talent.x;
      }

      if (talent.y > acc.y) {
        acc.y = talent.y;
      }

      return acc;
    },
    { x: 0, y: 0 }
  );
};

export function Tree({ tree: initial }: TreeProps): JSX.Element {
  const [tree, setTree] = useState(initial);

  const keys = Object.keys(tree);
  const values = Object.values(tree);
  const sumInvestedPoints = values.reduce(
    (acc, talent) => acc + talent.invested,
    0
  );

  const { x, y } = calculateDimensions(tree);

  const matrix = Array.from({ length: y + 1 }, (_, rowIndex) => {
    return Array.from({ length: x + 1 }, (_, columnIndex) => {
      const key = [columnIndex, rowIndex].join("-");

      if (key in tree) {
        return tree[key];
      }

      return null;
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

    // if so, no other dependant may only depend on this node
    if (otherDependantSatisfiesRequirement) {
      return dependants
        .filter((dependant) => (dependant.parents?.length ?? 0) === 1)
        .some((dependant) => dependant.invested > 0);
    }

    return dependants.some((dependant) => dependant.invested > 0);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
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
            invested:
              match.invested + 1 > match.levels ? 0 : match.invested + 1,
          },
        };
      });
    },
    []
  );

  const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
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
    },
    []
  );

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
      <caption>
        sumInvestedPoints: {sumInvestedPoints} |{" "}
        <button
          type="button"
          onClick={() => {
            setTree(initial);
          }}
        >
          reset
        </button>
      </caption>
      <tbody>
        {matrix.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((talent, columnIndex) => {
                if (!talent) {
                  return (
                    <td
                      className="p-2 text-center text-slate-800"
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
                    .map((key) => tree[key])
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
