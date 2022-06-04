import type { Passive, Select, Active, Tree } from "~/utils";

import type { SpecMeta } from "..";

const ursineVigorPassive: Passive = {
  type: "passive",
  levels: 2,
  x: 3,
  y: 7,
  name: "Ursine Vigor",
  icon: "ability_druid_markofursol",
  id: 1,
};

const vortexMassRootSelect: Select = {
  type: "select",
  x: 6,
  y: 7,
  options: [
    {
      type: "active",
      x: 6,
      y: 7,
      icon: "",
      id: 1,
      name: "Mass Entanglement",
    },
    {
      type: "active",
      x: 6,
      y: 7,
      icon: "",
      id: 1,
      name: "Ursol's Vortex",
    },
  ],
  children: [
    {
      icon: "spell_nature_lightning",
      name: "Innervate",
      x: 6,
      y: 8,
      id: 1,
      type: "active",
      children: [
        {
          type: "active",
          icon: "achievement_zone_feralas",
          x: 6,
          y: 9,
          id: 1,
          name: "Nature's Vigil",
        },
      ],
    },
  ],
};

const sunfireActive: Active = {
  type: "active",
  x: 6,
  y: 5,
  name: "Sunfire",
  icon: "ability_mage_firestarter",
  id: 1,
  children: [
    {
      type: "passive",
      levels: 1,
      icon: "ability_mage_firestarter",
      x: 7,
      y: 6,
      id: 333,
      name: "Improved Sunfire (NNF)",
    },
    vortexMassRootSelect,
  ],
};

const improvedBarkskinPassive: Passive = {
  type: "passive",
  name: "Ironbark",
  levels: 1,
  id: 22_812,
  x: 4,
  y: 1,
  icon: "spell_nature_stoneclawtotem",
  children: [
    {
      type: "passive",
      id: 236_019,
      levels: 1,
      name: "Improved Frenzied Regenration (NNF)",
      x: 4,
      y: 2,
      icon: "ability_bullrush",
    },
  ],
};

const incrHealingAndMagicDamagePassive: Passive = {
  type: "passive",
  levels: 1,
  id: 998,
  name: "Increased Healing and Magic Damage (NNF)",
  x: 6,
  y: 3,
  icon: "inv_-misc_herb_deathblossom_leaf",
  children: [
    {
      type: "active",
      id: 123,
      name: "Cyclone",
      x: 6,
      y: 4,
      icon: "spell_nature_earthbind",
    },
    {
      type: "passive",
      levels: 2,
      icon: "ability_druid_naturalperfection",
      id: 1,
      name: "Increased Healing & Healing Taken (NNF)",
      x: 5,
      y: 4,
      children: [
        sunfireActive,
        {
          type: "active",
          x: 5,
          y: 6,
          id: 1,
          icon: "ability_druid_flourish",
          name: "Wild Growth",
          children: [
            vortexMassRootSelect,
            {
              type: "passive",
              name: "Improved Rejuvenation (NNF)",
              icon: "spell_nature_rejuvenation",
              id: 1,
              levels: 1,
              x: 5,
              y: 7,
            },
          ],
        },
      ],
    },
  ],
};

const hotwActive: Active = {
  type: "active",
  id: 322,
  x: 4,
  y: 9,
  name: "Heart of the Wild",
  icon: "spell_holy_blessingofagility",
};

const removeCorruptionActive: Active = {
  type: "active",
  id: 2782,
  x: 5,
  y: 2,
  icon: "spell_holy_removecurse",
  name: "Remove Corruption",
  children: [incrHealingAndMagicDamagePassive],
};

const mightyBashSelect: Select = {
  type: "select",
  options: [
    {
      type: "active",
      x: 2,
      y: 7,
      id: 5211,
      name: "Mighty Bash",
      icon: "",
    },
    {
      type: "active",
      id: 1,
      name: "Incapacitating Roar",
      x: 2,
      y: 7,
      icon: "",
    },
  ],
  x: 2,
  y: 7,
  children: [
    {
      type: "passive",
      id: 61_336,
      levels: 2,
      name: "Well-Honed Instincts",
      x: 2,
      icon: "ability_druid_tigersroar",
      y: 8,
      children: [
        {
          id: 111,
          levels: 1,
          name: "Furor",
          type: "passive",
          x: 2,
          y: 9,
          icon: "spell_holy_blessingofstamina",
        },
      ],
    },
  ],
};

const thrashActive: Active = {
  id: 6807,
  name: "Thrash",
  type: "active",
  x: 2,
  y: 1,
  icon: "spell_druid_thrash",
  children: [
    {
      id: 1079,
      name: "Rip",
      x: 1,
      y: 2,
      type: "active",
      icon: "ability_ghoulfrenzy",
      children: [
        {
          type: "passive",
          name: "Feline Swiftness",
          x: 1,
          y: 4,
          levels: 2,
          id: 131_768,
          icon: "spell_druid_tirelesspursuit",
          children: [
            {
              type: "passive",
              levels: 1,
              icon: "spell_druid_tirelesspursuit",
              id: 1,
              name: "Tireless Pursuit",
              x: 0,
              y: 5,
            },
            {
              type: "passive",
              name: "Primal Fury",
              x: 1,
              y: 6,
              levels: 1,
              icon: "ability_racial_cannibalize",
              id: 1,
              children: [mightyBashSelect],
            },
          ],
        },
      ],
    },
    {
      id: 106_832,
      name: "Swipe",
      type: "active",
      x: 2,
      y: 2,
      icon: "inv_misc_monsterclaw_03",
      children: [
        {
          name: "Increased Armor and Physical Damage (NNF)",
          id: 3,
          type: "passive",
          levels: 3,
          x: 2,
          y: 3,
          icon: "inv_misc_herb_netherbloom_leaf",
          children: [
            {
              type: "active",
              id: 106_839,
              name: "Skull Bash",
              icon: "inv_bone_skull_04",
              x: 2,
              y: 4,
            },
          ],
        },
        {
          name: "Ironfur",
          id: 4,
          type: "active",
          x: 3,
          y: 3,
          icon: "ability_druid_ironfur",
          children: [
            {
              name: "Thick Hide",
              id: 0,
              x: 3,
              y: 4,
              levels: 3,
              type: "passive",
              icon: "inv_misc_pelt_bear_03",
              children: [
                {
                  type: "passive",
                  id: 123,
                  levels: 2,
                  name: "Ursoc's Endurance (NNF)",
                  x: 3,
                  y: 6,
                  icon: "spell_nature_stoneclawtotem",
                  children: [ursineVigorPassive],
                },
                {
                  type: "active",
                  name: "Soothe",
                  x: 4,
                  y: 5,
                  icon: "ability_hunter_beastsoothe",
                  id: 1,
                  children: [
                    {
                      type: "active",
                      icon: "spell_druid_stampedingroar_cat",
                      x: 4,
                      y: 6,
                      id: 1,
                      name: "Stampeding Roar",
                      children: [
                        ursineVigorPassive,
                        {
                          type: "passive",
                          id: 1,
                          icon: "inv_misc_herb_arthastear_petal",
                          levels: 3,
                          name: "Lyraca's Teachings (NNF)",
                          x: 4,
                          y: 7,
                          children: [
                            {
                              type: "passive",
                              name: "Improved Stampeding Roar (NNF)",
                              x: 3,
                              y: 8,
                              icon: "spell_druid_stamedingroar",
                              id: 1,
                              levels: 1,
                              children: [hotwActive],
                            },
                            {
                              type: "active",
                              name: "Renewal",
                              icon: "spell_nature_natureblessing",
                              x: 5,
                              y: 8,
                              id: 1,
                              children: [hotwActive],
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
};

const tree: Tree = [
  {
    id: 1822,
    name: "Rake",
    type: "active",
    x: 1,
    y: 0,
    children: [thrashActive],
    icon: "ability_druid_disembowel",
  },
  {
    type: "active",
    id: 22_842,
    name: "Frenzied Regeneration",
    x: 3,
    y: 0,
    children: [thrashActive, improvedBarkskinPassive],
    icon: "ability_bullrush",
  },
  {
    type: "active",
    id: 774,
    name: "Rejuvenation",
    x: 5,
    y: 0,
    icon: "spell_nature_rejuvenation",
    children: [
      improvedBarkskinPassive,
      {
        id: 18_562,
        type: "active",
        name: "Swiftmend",
        x: 5,
        y: 1,
        icon: "inv_relics_idolofrejuvenation",
        children: [removeCorruptionActive],
      },
    ],
  },
  {
    type: "active",
    x: 7,
    y: 0,
    id: 194_153,
    name: "Starfire",
    icon: "spell_arcane_starfire",
    children: [
      {
        type: "active",
        x: 7,
        y: 1,
        name: "Starsurge",
        icon: "spell_arcane_arcane03",
        id: 93_402,
        children: [
          {
            type: "active",
            id: 24_858,
            name: "Moonkin Form",
            x: 7,
            y: 2,
            icon: "spell_nature_forceofnature",
            children: [
              incrHealingAndMagicDamagePassive,
              {
                type: "active",
                x: 8,
                y: 3,
                icon: "spell_nature_sleep",
                name: "Hibernate",
                id: 333,
              },
              {
                type: "passive",
                x: 7,
                y: 4,
                levels: 2,
                name: "Astral Influence",
                icon: "ability_skyreach_lens_flare",
                id: 197_524,
                children: [
                  {
                    id: 132_469,
                    name: "Typhoon",
                    type: "active",
                    x: 8,
                    y: 5,
                    icon: "ability_druid_typhoon",
                  },
                  sunfireActive,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    x: 4,
    y: 4,
    type: "select",
    options: [
      {
        id: 132_302,
        name: "Wild Charge",
        x: 4,
        y: 4,
        type: "active",
        icon: "",
      },
      {
        id: 1,
        icon: "",
        x: 4,
        y: 4,
        type: "active",
        name: "Tiger Dash",
      },
    ],
  },
];

export const base: SpecMeta = {
  icon: "",
  tree,
};
