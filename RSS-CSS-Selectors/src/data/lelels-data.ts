import { ILevel } from "./levels-data-types";

export const LEVELS_DATA: ILevel[] = [
  {
    title: "Select slices of bread",
    help: "bread-slice",
    htmlCode: `<div class="table">
  <bread-slice></bread-slice>
  <bread-slice></bread-slice>
</div>`,
    codeForTable: [
      { bread: { selectors: null, next: null } },
      { bread: { selectors: null, next: null } },
    ],
  },
  {
    title: "Select target cheese-slice",
    help: ".target",
    htmlCode: `<div class="table">
  <bread-slice></bread-slice>
  <cheese-slice class="target"></cheese-slice>
  <bread-slice>
    <cheese-slice>
      <ham-slice></ham-slice>
    </cheese-slice>
  </bread-slice>
</div>`,
    codeForTable: [
      { bread: { selectors: null, next: null } },
      {
        cheese: {
          selectors: {
            elementClass: "target",
          },
          next: null,
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: {
                ham: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    title: "Select all elements",
    help: "*",
    htmlCode: `<div class="table">
  <bread-slice>
    <cheese-slice></cheese-slice>
  </bread-slice>
  <cheese-slice></cheese-slice>
  <bread-slice>
    <cheese-slice class="target">
      <ham-slice></ham-slice>
    </cheese-slice>
  </bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: null,
            },
          },
        },
      },
      { cheese: { selectors: null, next: null } },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: {
                elementClass: "target",
              },
              next: {
                ham: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    title: "Select target ham slice",
    help: "ham-slice.target",
    htmlCode: `<div class=table>
  <bread-slice class="target">
    <cheese-slice></cheese-slice>
  </bread-slice>
  <bread-slice>
    <ham-slice class="target"></ham-slice>
  </bread-slice>
  <bread-slice>
    <cheese-slice class="target">
      <ham-slice></ham-slice>
    </cheese-slice>
  </bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: {
            elementClass: "target",
          },
          next: {
            cheese: {
              selectors: null,
              next: null,
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            ham: {
              selectors: {
                elementClass: "target",
              },
              next: null,
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: {
                elementClass: "target",
              },
              next: {
                ham: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    title: "Select first two bread slices",
    help: ".table bread-slice:not(:last-child)",
    htmlCode: `<div class=table>
  <bread-slice></bread-slice>
  <bread-slice></bread-slice>
  <bread-slice></bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: null,
          next: null,
        },
      },
      {
        bread: {
          selectors: null,
          next: null,
        },
      },
      {
        bread: {
          selectors: null,
          next: null,
        },
      },
    ],
  },
  {
    title: "Select left cheese slice",
    help: ".table cheese-slice:first-child",
    htmlCode: `<div class=table>
  <cheese-slice></cheese-slice>
  <cheese-slice></cheese-slice>
  <ham-slice></ham-slice>
</div>`,
    codeForTable: [
      {
        cheese: {
          selectors: null,
          next: null,
        },
      },
      {
        cheese: {
          selectors: null,
          next: null,
        },
      },
      {
        ham: {
          selectors: null,
          next: null,
        },
      },
    ],
  },
  {
    title: "Select central ham slice",
    help: ".table ham-slice:nth-child(2)",
    htmlCode: `<div class=table>
  <ham-slice></ham-slice>
  <ham-slice></ham-slice>
  <ham-slice></ham-slice>
</div>`,
    codeForTable: [
      {
        ham: {
          selectors: null,
          next: null,
        },
      },
      {
        ham: {
          selectors: null,
          next: null,
        },
      },
      {
        ham: {
          selectors: null,
          next: null,
        },
      },
    ],
  },
  {
    title: "Select cheese slice at center",
    help: ".target.central",
    htmlCode: `<div class=table>
  <bread-slice>
    <cheese-slice class="target"></cheese-slice>
  </bread-slice>
  <bread-slice>
    <cheese-slice class="target central"></cheese-slice>
  </bread-slice>
  <bread-slice></bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: {
                elementClass: "target",
              },
              next: null,
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: {
                elementClass: "target central",
              },
              next: null,
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: null,
        },
      },
    ],
  },
  {
    title: "Select target cheese slice",
    help: "#target",
    htmlCode: `<div class=table>
  <bread-slice>
    <cheese-slice>
      <ham-slice id="target"></ham-slice>
    </cheese-slice>
  </bread-slice>
  <bread-slice>
    <cheese-slice>
      <ham-slice></ham-slice>
    </cheese-slice>
  </bread-slice>
  <bread-slice>
      <ham-slice></ham-slice>
  </bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: {
                ham: {
                  selectors: {
                    elementId: "target",
                  },
                  next: null,
                },
              },
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: {
                ham: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            ham: {
              selectors: null,
              next: null,
            },
          },
        },
      },
    ],
  },
  {
    title: "Select right cheese slice",
    help: "bread-slice ham-slice cheese-slice",
    htmlCode: `<div class=table>
  <bread-slice>
    <cheese-slice>
      <ham-slice></ham-slice>
    </cheese-slice>
  </bread-slice>
  <bread-slice>
    <cheese-slice></cheese-slice>
  </bread-slice>
  <bread-slice>
    <ham-slice>
      <cheese-slice></cheese-slice>
    </ham-slice>
  </bread-slice>
</div>`,
    codeForTable: [
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: {
                ham: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            cheese: {
              selectors: null,
              next: null,
            },
          },
        },
      },
      {
        bread: {
          selectors: null,
          next: {
            ham: {
              selectors: null,
              next: {
                cheese: {
                  selectors: null,
                  next: null,
                },
              },
            },
          },
        },
      },
    ],
  },
];
