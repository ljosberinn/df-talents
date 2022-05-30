import type { Passive, Select, Talent, Tree } from "~/utils";

import type { SpecMeta } from "..";

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

const tree: Tree = [
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

export const restoration: SpecMeta = {
  tree,
  icon: "",
};
