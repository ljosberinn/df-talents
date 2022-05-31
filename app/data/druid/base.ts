import type { Passive, Select, Active, Tree } from "~/utils";

import type { SpecMeta } from "..";

const barkskinPassive: Passive = {
  type: "passive",
  name: "Ironbark",
  levels: 2,
  id: 22_812,
  x: 3,
  y: 1,
  children: [
    {
      type: "passive",
      id: 236019,
      levels: 1,
      name: "Strength of the Wild",
      x: 3,
      y: 2,
    },
  ],
};

const blueLeafPassive: Passive = {
  levels: 3,
  type: "passive",
  x: 5,
  y: 3,
  id: 1,
  name: "Blue Leaf",
  children: [
    {
      type: "active",
      name: "Cyclone",
      x: 5,
      y: 4,
      id: 33_786,
    },
  ],
};

const improvedHotwPassive: Passive = {
  type: "passive",
  id: 322,
  x: 3,
  y: 9,
  levels: 1,
  name: "Improved HotW",
};

const removeCorruptionActive: Active = {
  type: "active",
  id: 2782,
  x: 3,
  y: 5,
  name: "Remove Corruption",
  children: [
    {
      type: "passive",
      levels: 1,
      id: 998,
      name: "Another Leaf",
      x: 3,
      y: 6,
      children: [
        {
          type: "active",
          name: "Heart of the Wild",
          id: 319_454,
          x: 3,
          y: 7,
          children: [
            {
              type: "passive",
              id: 77_761,
              levels: 1,
              name: "Stampeding Roar",
              x: 2,
              y: 8,
              children: [improvedHotwPassive],
            },
            {
              type: "active",
              id: 255,
              x: 4,
              y: 8,
              name: "Some Leaf",
              children: [improvedHotwPassive],
            },
          ],
        },
      ],
    },
  ],
};

const mightyBashSelect: Select = {
  type: "select",
  options: [
    {
      type: "active",
      x: 1,
      y: 7,
      id: 5211,
      name: "Mighty Bash",
    },
  ],
  x: 1,
  y: 7,
  children: [
    {
      type: "passive",
      id: 61_336,
      levels: 1,
      name: "Survival Instincts",
      x: 1,
      y: 8,
      children: [
        {
          id: 111,
          levels: 1,
          name: "Fury of Elune",
          type: "passive",
          x: 1,
          y: 9,
        },
      ],
    },
  ],
};

const maulActive: Active = {
  id: 6807,
  name: "Maul",
  type: "active",
  x: 1,
  y: 1,
  children: [
    {
      id: 1079,
      name: "Rip",
      x: 0,
      y: 2,
      type: "active",
      children: [
        {
          type: "passive",
          name: "Feline Swiftness",
          x: 0,
          y: 4,
          levels: 1,
          id: 131_768,
          children: [
            {
              id: 1234,
              levels: 1,
              name: "Nom",
              x: 0,
              y: 6,
              type: "passive",
              children: [
                mightyBashSelect,
                {
                  x: 0,
                  y: 7,
                  name: "Maim",
                  type: "active",
                  id: 22_570,
                  children: [
                    {
                      type: "passive",
                      name: "Another Feline Swiftness",
                      x: 0,
                      y: 8,
                      id: 999,
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
    {
      id: 106_832,
      name: "Thrash",
      type: "active",
      x: 1,
      y: 2,
      children: [
        {
          name: "Red Leaf",
          id: 3,
          type: "passive",
          levels: 3,
          x: 1,
          y: 3,
          children: [
            {
              type: "active",
              id: 106_839,
              name: "Skull Bash",
              x: 1,
              y: 4,
            },
          ],
        },
        {
          name: "Ironfur",
          id: 4,
          type: "active",
          x: 2,
          y: 3,
          children: [
            {
              name: "Thick Hide",
              id: 0,
              x: 2,
              y: 4,
              levels: 3,
              type: "passive",
              children: [
                removeCorruptionActive,
                {
                  type: "passive",
                  name: "Improved Frenzied Regeneration",
                  id: 273_048,
                  x: 1,
                  y: 5,
                  levels: 1,
                },
                {
                  type: "passive",
                  id: 123,
                  levels: 2,
                  name: "Improved Bear Form",
                  x: 2,
                  y: 6,
                  children: [mightyBashSelect],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const typhoonSelect: Select = {
  x: 5,
  y: 7,
  type: "select",
  options: [
    {
      id: 132_469,
      name: "Typhoon",
      type: "active",
      x: 5,
      y: 7,
    },
  ],
  children: [
    {
      type: "active",
      name: "Innervate",
      id: 29_166,
      x: 5,
      y: 8,
      children: [
        {
          type: "active",
          name: "Nature's Vigil",
          x: 5,
          y: 9,
          id: 124974,
        },
      ],
    },
  ],
};

const tree: Tree = [
  {
    id: 1822,
    name: "Rake",
    type: "active",
    x: 0,
    y: 0,
    children: [maulActive],
  },
  {
    type: "active",
    id: 22_842,
    name: "Frenzied Regeneration",
    x: 2,
    y: 0,
    children: [maulActive, barkskinPassive],
  },
  {
    type: "active",
    id: 774,
    name: "Rejuvenation",
    x: 4,
    y: 0,
    children: [
      barkskinPassive,
      {
        id: 18_562,
        type: "active",
        name: "Swiftmend",
        x: 4,
        y: 1,
        children: [
          {
            type: "passive",
            name: "Improved Rejuvenation",
            id: 1,
            levels: 2,
            x: 4,
            y: 2,
            children: [blueLeafPassive],
          },
          {
            type: "passive",
            name: "Cenarion Ward",
            x: 4,
            y: 4,
            levels: 3,
            id: 2,
            children: [
              removeCorruptionActive,
              {
                type: "active",
                name: "Wild Growth",
                id: 48_438,
                x: 4,
                y: 6,
                children: [typhoonSelect],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "active",
    x: 6,
    y: 0,
    id: 194_153,
    name: "Starfire",
    children: [
      {
        type: "active",
        x: 6,
        y: 1,
        name: "Sunfire",
        id: 93_402,
        children: [
          {
            type: "active",
            id: 24_858,
            name: "Moonkin Form",
            x: 6,
            y: 2,
            children: [
              blueLeafPassive,
              {
                type: "passive",
                x: 6,
                y: 4,
                levels: 1,
                id: 197_524,
                name: "Astral Influence",
                children: [
                  {
                    type: "passive",
                    levels: 1,
                    x: 5,
                    y: 5,
                    id: 555,
                    name: "Improved Sunfire",
                  },
                  {
                    type: "active",
                    name: "Starsurge",
                    x: 6,
                    y: 6,
                    id: 78_674,
                    children: [
                      typhoonSelect,
                      {
                        type: "passive",
                        id: 102_793,
                        x: 6,
                        y: 7,
                        levels: 1,
                        name: "Improved Vortex",
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
    x: 3,
    y: 4,
    type: "select",
    options: [
      {
        id: 132_302,
        name: "Wild Charge",
        x: 3,
        y: 4,
        type: "active",
      },
    ],
  },
];

export const base: SpecMeta = {
  icon: "",
  tree,
};
