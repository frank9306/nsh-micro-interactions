// Compiled from the pinned Amicro loading registry. See LICENSE.
import type { LoaderNode } from './ports/LoaderViews';
export const recipes: Record<string, LoaderNode> = {
  "accordion-loader": {
    "classes": "flex flex-col space-y-1.5 w-10 h-10 justify-center",
    "children": [
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            1,
            0.2,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0
        }
      },
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            1,
            0.2,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.15
        }
      },
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            1,
            0.2,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      },
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            1,
            0.2,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.44999999999999996
        }
      }
    ]
  },
  "app-icon-load": {
    "classes": "relative w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-[12px] flex items-center justify-center overflow-hidden",
    "children": [
      {
        "kind": "svg",
        "attributes": {
          "viewBox": "0 0 50 50"
        },
        "classes": "w-8 h-8 absolute",
        "children": [
          {
            "kind": "circle",
            "attributes": {
              "cx": "25",
              "cy": "25",
              "r": "20",
              "strokeWidth": "4"
            },
            "classes": "stroke-zinc-300 dark:stroke-zinc-700 fill-none"
          },
          {
            "kind": "circle",
            "attributes": {
              "cx": "25",
              "cy": "25",
              "r": "20",
              "strokeWidth": "4",
              "strokeDasharray": "125"
            },
            "classes": "stroke-zinc-800 dark:stroke-white fill-none",
            "style": {
              "rotate": -90,
              "transformOrigin": "center"
            },
            "animation": {
              "strokeDashoffset": [
                125,
                0
              ]
            },
            "timing": {
              "duration": 2,
              "repeat": "infinite",
              "ease": "easeInOut"
            }
          }
        ]
      }
    ]
  },
  "apple-breathe": {
    "classes": "relative flex items-center justify-center w-12 h-12",
    "children": [
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-teal-400/35 dark:bg-teal-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            11,
            0
          ],
          "y": [
            0,
            0,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-cyan-400/35 dark:bg-cyan-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            5.500000000000001,
            0
          ],
          "y": [
            0,
            9.526279441628825,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-teal-400/35 dark:bg-teal-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            -5.499999999999997,
            0
          ],
          "y": [
            0,
            9.526279441628827,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-cyan-400/35 dark:bg-cyan-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            -11,
            0
          ],
          "y": [
            0,
            1.3471114790620886e-15,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-teal-400/35 dark:bg-teal-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            -5.500000000000005,
            0
          ],
          "y": [
            0,
            -9.526279441628823,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-3.5 h-3.5 rounded-full bg-cyan-400/35 dark:bg-cyan-400/40",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "scale": [
            1,
            1.75,
            1
          ],
          "x": [
            0,
            5.500000000000001,
            0
          ],
          "y": [
            0,
            -9.526279441628825,
            0
          ]
        },
        "timing": {
          "duration": 3.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "apple-icon-morph": {
    "classes": "w-8 h-8 bg-zinc-800 dark:bg-white",
    "animation": {
      "borderRadius": [
        "20%",
        "50%",
        "50%",
        "20%"
      ],
      "rotate": [
        0,
        90,
        180,
        270
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "apple-pulse-dots": {
    "classes": "flex space-x-2",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            0.5,
            1,
            0.5
          ],
          "opacity": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            0.5,
            1,
            0.5
          ],
          "opacity": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            0.5,
            1,
            0.5
          ],
          "opacity": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "apple-scale-pulse": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full",
        "animation": {
          "scale": [
            0,
            1
          ],
          "opacity": [
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeOut"
        }
      },
      {
        "classes": "absolute w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full",
        "animation": {
          "scale": [
            0,
            1
          ],
          "opacity": [
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.5,
          "ease": "easeOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full z-10"
      }
    ]
  },
  "apple-sound-wave": {
    "classes": "flex space-x-1 h-8 items-center",
    "children": [
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            8,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            16,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            16,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            8,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "apple-text-reveal": {
    "classes": "font-medium text-lg text-zinc-900 dark:text-white overflow-hidden h-6 relative",
    "children": [
      {
        "animation": {
          "y": [
            "100%",
            "0%",
            "-100%"
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        },
        "children": [
          "Loading"
        ]
      }
    ]
  },
  "arc-tracer": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-10 h-10",
    "children": [
      {
        "kind": "circle",
        "attributes": {
          "cx": "25",
          "cy": "25",
          "r": "20",
          "strokeWidth": "4"
        },
        "classes": "stroke-zinc-200 dark:stroke-zinc-800 fill-none"
      },
      {
        "kind": "circle",
        "attributes": {
          "cx": "25",
          "cy": "25",
          "r": "20",
          "strokeWidth": "4",
          "strokeLinecap": "round",
          "strokeDasharray": "125"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "animation": {
          "strokeDashoffset": [
            125,
            0,
            -125
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bar-cascade": {
    "classes": "flex space-x-1 items-center h-8",
    "children": [
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            "8px",
            "24px",
            "8px"
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            "8px",
            "24px",
            "8px"
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            "8px",
            "24px",
            "8px"
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            "8px",
            "24px",
            "8px"
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            "8px",
            "24px",
            "8px"
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bar-sweep": {
    "classes": "w-12 h-6 border-2 border-zinc-800 dark:border-zinc-700 rounded-full p-1 relative flex items-center overflow-hidden",
    "children": [
      {
        "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-full absolute",
        "animation": {
          "x": [
            0,
            24,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bobbing-dots": {
    "classes": "flex space-x-2",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bounce-dots": {
    "classes": "flex space-x-1.5",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -8,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -8,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            -8,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bouncing-bars": {
    "classes": "flex space-x-1.5 h-8 items-center",
    "children": [
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scaleY": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scaleY": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scaleY": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bouncing-dots": {
    "classes": "flex space-x-2 h-12 items-end pb-2 border-b-2 border-zinc-200 dark:border-zinc-800 w-16 justify-center relative",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full absolute bottom-2",
        "style": {
          "left": 10
        },
        "animation": {
          "y": [
            0,
            -20,
            0
          ],
          "scaleY": [
            0.8,
            1.1,
            0.8
          ]
        },
        "timing": {
          "duration": 0.8,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full absolute bottom-2",
        "style": {
          "left": 24
        },
        "animation": {
          "y": [
            0,
            -20,
            0
          ],
          "scaleY": [
            0.8,
            1.1,
            0.8
          ]
        },
        "timing": {
          "duration": 0.8,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full absolute bottom-2",
        "style": {
          "left": 38
        },
        "animation": {
          "y": [
            0,
            -20,
            0
          ],
          "scaleY": [
            0.8,
            1.1,
            0.8
          ]
        },
        "timing": {
          "duration": 0.8,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bouncing-lines": {
    "classes": "flex flex-col space-y-1.5 w-8",
    "children": [
      {
        "classes": "w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.3,
            1,
            0.3
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "bouncing-square": {
    "classes": "relative w-10 h-12 flex items-end justify-center",
    "children": [
      {
        "classes": "absolute bottom-0 w-8 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full blur-sm"
      },
      {
        "classes": "w-6 h-6 bg-zinc-800 dark:bg-white rounded-sm origin-bottom",
        "animation": {
          "y": [
            0,
            -24,
            0
          ],
          "scaleY": [
            0.8,
            1.1,
            0.8
          ],
          "scaleX": [
            1.2,
            0.9,
            1.2
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "breathe-ring": {
    "classes": "w-10 h-10 rounded-full border-4 border-zinc-800 dark:border-zinc-700",
    "animation": {
      "scale": [
        0.8,
        1.1,
        0.8
      ],
      "borderWidth": [
        6,
        2,
        6
      ]
    },
    "timing": {
      "duration": 3,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "breathing-glow": {
    "classes": "relative flex items-center justify-center w-12 h-12",
    "children": [
      {
        "classes": "absolute w-8 h-8 bg-blue-500 rounded-full blur-md",
        "animation": {
          "scale": [
            1,
            1.5,
            1
          ],
          "opacity": [
            0.5,
            0.8,
            0.5
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "relative w-6 h-6 bg-white rounded-full shadow-sm"
      }
    ]
  },
  "breathing-square": {
    "classes": "w-8 h-8 bg-zinc-800 dark:bg-white",
    "animation": {
      "scale": [
        1,
        1.2,
        1
      ],
      "borderRadius": [
        "0%",
        "50%",
        "0%"
      ],
      "rotate": [
        0,
        90,
        180
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "circular-bars": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 0
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 45
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 90
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 135
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.44999999999999996,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 180
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.6,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 225
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.75,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 270
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.8999999999999999,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]",
        "style": {
          "rotate": 315
        },
        "animation": {
          "scaleY": [
            0.5,
            1.5,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 1.05,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "classic-spinner": {
    "classes": "relative w-8 h-8",
    "children": [
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 0
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 30
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.08333333333333333
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 60
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.16666666666666666
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 90
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.25
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 120
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.3333333333333333
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 150
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.41666666666666663
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 180
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.5
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 210
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.5833333333333333
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 240
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.6666666666666666
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 270
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.75
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 300
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.8333333333333333
        }
      },
      {
        "classes": "absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]",
        "style": {
          "rotate": 330
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear",
          "delay": 0.9166666666666666
        }
      }
    ]
  },
  "clock-spinner": {
    "classes": "relative w-10 h-10 border-2 border-zinc-800 dark:border-zinc-700 rounded-full flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-0.5 h-3.5 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "style": {
          "bottom": "50%"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute w-0.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "style": {
          "bottom": "50%"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 12,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "comet-spinner": {
    "classes": "relative w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-full h-full rounded-full",
        "style": {
          "background": "conic-gradient(from 0deg, transparent 0%, rgba(39, 39, 42, 0.1) 60%, rgba(39, 39, 42, 1) 100%)"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute bg-white w-8 h-8 rounded-full"
      }
    ]
  },
  "concentric-pulse": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute rounded-full border border-zinc-800 dark:border-zinc-700",
        "animation": {
          "width": 48,
          "height": 48,
          "opacity": 0
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "delay": 0.6,
          "ease": "easeOut"
        },
        "initial": {
          "width": 0,
          "height": 0,
          "opacity": 1
        }
      },
      {
        "classes": "absolute rounded-full border border-zinc-800 dark:border-zinc-700",
        "animation": {
          "width": 48,
          "height": 48,
          "opacity": 0
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "delay": 1.2,
          "ease": "easeOut"
        },
        "initial": {
          "width": 0,
          "height": 0,
          "opacity": 1
        }
      },
      {
        "classes": "absolute rounded-full border border-zinc-800 dark:border-zinc-700",
        "animation": {
          "width": 48,
          "height": 48,
          "opacity": 0
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "delay": 1.7999999999999998,
          "ease": "easeOut"
        },
        "initial": {
          "width": 0,
          "height": 0,
          "opacity": 1
        }
      }
    ]
  },
  "concentric-ring": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-12 h-12 border-2 border-zinc-800 dark:border-zinc-700 border-t-transparent rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute w-8 h-8 border-2 border-zinc-500 border-b-transparent rounded-full",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute w-4 h-4 border-2 border-zinc-300 border-l-transparent rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "concentric-squares": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-12 h-12 border-2 border-zinc-800 dark:border-zinc-700 rounded-sm",
        "animation": {
          "rotate": [
            0,
            90,
            90
          ],
          "scale": [
            1,
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-6 h-6 border-2 border-zinc-500 rounded-sm",
        "animation": {
          "rotate": [
            0,
            -90,
            -90
          ],
          "scale": [
            1,
            1,
            1.2,
            1
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "conveyor-loop": {
    "classes": "w-16 h-3 overflow-hidden relative rounded-full bg-zinc-200 dark:bg-zinc-800",
    "children": [
      {
        "classes": "flex h-full space-x-2 absolute top-0 items-center",
        "animation": {
          "x": [
            0,
            -32
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear"
        },
        "children": [
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          },
          {
            "classes": "w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"
          }
        ]
      }
    ]
  },
  "cross-spinner": {
    "classes": "relative w-8 h-8 flex items-center justify-center",
    "animation": {
      "rotate": [
        0,
        90,
        180,
        270,
        360
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "absolute w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "absolute h-full w-1.5 bg-zinc-800 dark:bg-white rounded-full"
      }
    ]
  },
  "cube-flip-spring": {
    "classes": "w-8 h-8 bg-zinc-800 dark:bg-white rounded-lg",
    "animation": {
      "rotateX": [
        0,
        180,
        180
      ],
      "rotateY": [
        0,
        0,
        180
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "type": "spring",
      "bounce": 0.2
    }
  },
  "dash-ring": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-12 h-12",
    "children": [
      {
        "kind": "circle",
        "attributes": {
          "cx": "25",
          "cy": "25",
          "r": "20",
          "strokeWidth": "3",
          "strokeDasharray": "8 8"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "style": {
          "transformOrigin": "center"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 4,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "dashed-spiral": {
    "classes": "w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700 rounded-full border-dashed",
    "animation": {
      "rotate": 360,
      "scale": [
        1,
        1.1,
        1
      ]
    },
    "timing": {
      "duration": 4,
      "repeat": "infinite",
      "ease": "linear"
    }
  },
  "diamond-grid": {
    "classes": "grid grid-cols-2 gap-2 rotate-45",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "diamond-rotate-spring": {
    "classes": "w-8 h-8 bg-zinc-800 dark:bg-white rounded-sm origin-center",
    "style": {
      "rotate": 45
    },
    "animation": {
      "rotate": [
        45,
        135,
        225,
        315
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "type": "spring",
      "bounce": 0.4
    }
  },
  "dot-spinner": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 0
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 45
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.125,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 90
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.25,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 135
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.375,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 180
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.5,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 225
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.625,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 270
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.75,
          "ease": "linear"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "rotate": 315
        },
        "animation": {
          "opacity": [
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.875,
          "ease": "linear"
        }
      }
    ]
  },
  "dots-ring": {
    "classes": "relative w-12 h-12",
    "children": [
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 0
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 45
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 90
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 135
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.44999999999999996,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 180
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 225
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.75,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 270
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.8999999999999999,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]",
        "style": {
          "rotate": 315
        },
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 1.05,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "double-ring": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-10 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-full border-t-zinc-800 dark:border-t-white",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute w-6 h-6 border-2 border-zinc-200 dark:border-zinc-800 rounded-full border-b-zinc-800 dark:border-b-white",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "drop-dot": {
    "classes": "relative w-6 h-12 flex flex-col items-center",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full absolute top-0 z-10",
        "animation": {
          "y": [
            0,
            24,
            0
          ],
          "scaleY": [
            1,
            1.2,
            1
          ],
          "scaleX": [
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "circIn"
        }
      },
      {
        "classes": "w-4 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute bottom-2 blur-[1px]"
      }
    ]
  },
  "dual-arc": {
    "classes": "relative w-8 h-8 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute inset-0 border-2 border-t-zinc-800 dark:border-t-white border-b-zinc-800 dark:border-b-white border-l-transparent border-r-transparent rounded-full",
        "animation": {
          "rotate": 360,
          "scale": [
            1,
            0.82,
            1
          ]
        },
        "timing": {
          "rotate": {
            "duration": 1.2,
            "repeat": "infinite",
            "ease": "linear"
          },
          "scale": {
            "duration": 1.2,
            "repeat": "infinite",
            "ease": "easeInOut"
          }
        }
      }
    ]
  },
  "dynamic-island": {
    "classes": "bg-zinc-950 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center px-4 py-2 gap-3 h-8 shadow-sm",
    "animation": {
      "width": [
        80,
        110,
        80
      ]
    },
    "timing": {
      "duration": 2.2,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "w-1.5 h-1.5 rounded-full bg-emerald-500",
        "animation": {
          "opacity": [
            0.4,
            1,
            0.4
          ]
        },
        "timing": {
          "duration": 1.1,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "flex gap-1 items-center h-2",
        "children": [
          {
            "classes": "w-0.5 bg-zinc-300 dark:bg-zinc-500 rounded-full",
            "animation": {
              "height": [
                3,
                8,
                3
              ]
            },
            "timing": {
              "duration": 0.8,
              "repeat": "infinite",
              "ease": "easeInOut",
              "delay": 0
            }
          },
          {
            "classes": "w-0.5 bg-zinc-300 dark:bg-zinc-500 rounded-full",
            "animation": {
              "height": [
                3,
                8,
                3
              ]
            },
            "timing": {
              "duration": 0.8,
              "repeat": "infinite",
              "ease": "easeInOut",
              "delay": 0.15
            }
          },
          {
            "classes": "w-0.5 bg-zinc-300 dark:bg-zinc-500 rounded-full",
            "animation": {
              "height": [
                3,
                8,
                3
              ]
            },
            "timing": {
              "duration": 0.8,
              "repeat": "infinite",
              "ease": "easeInOut",
              "delay": 0.3
            }
          }
        ]
      }
    ]
  },
  "elastic-bars": {
    "classes": "flex space-x-2 h-10 items-center justify-center",
    "children": [
      {
        "classes": "w-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            36,
            8
          ]
        },
        "timing": {
          "duration": 1.1,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0
        }
      },
      {
        "classes": "w-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            36,
            8
          ]
        },
        "timing": {
          "duration": 1.1,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.15
        }
      },
      {
        "classes": "w-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            36,
            8
          ]
        },
        "timing": {
          "duration": 1.1,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      }
    ]
  },
  "elastic-square": {
    "classes": "h-12 flex items-end border-b-2 border-zinc-200 dark:border-zinc-800 w-12 justify-center",
    "children": [
      {
        "classes": "w-6 h-6 bg-zinc-800 dark:bg-white rounded-sm origin-bottom",
        "animation": {
          "y": [
            0,
            -20,
            0
          ],
          "scaleY": [
            0.7,
            1.2,
            0.7
          ],
          "scaleX": [
            1.3,
            0.8,
            1.3
          ]
        },
        "timing": {
          "duration": 0.8,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "expanding-cross": {
    "classes": "relative w-8 h-8",
    "children": [
      {
        "classes": "absolute top-1/2 left-0 w-full h-1 bg-zinc-800 dark:bg-white -mt-0.5 rounded-full",
        "animation": {
          "scaleX": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute left-1/2 top-0 h-full w-1 bg-zinc-800 dark:bg-white -ml-0.5 rounded-full",
        "animation": {
          "scaleY": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.75
        }
      }
    ]
  },
  "face-id-scan": {
    "classes": "w-12 h-12 border-2 border-zinc-300 rounded-xl relative overflow-hidden flex items-center justify-center",
    "children": [
      {
        "kind": "svg",
        "attributes": {
          "viewBox": "0 0 24 24"
        },
        "classes": "w-6 h-6 fill-zinc-300 dark:fill-zinc-700",
        "children": [
          {
            "kind": "path",
            "attributes": {
              "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            }
          }
        ]
      },
      {
        "classes": "absolute left-0 w-full h-8 bg-gradient-to-b from-transparent to-green-400/30 border-b border-green-500",
        "animation": {
          "top": [
            "-100%",
            "100%",
            "-100%"
          ]
        },
        "timing": {
          "duration": 2.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "fade-arc": {
    "classes": "relative w-9 h-9",
    "children": [
      {
        "kind": "svg",
        "attributes": {
          "viewBox": "0 0 50 50"
        },
        "classes": "w-full h-full ",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1,
          "ease": "linear",
          "repeat": "infinite"
        },
        "children": [
          {
            "kind": "circle",
            "attributes": {
              "cx": "25",
              "cy": "25",
              "r": "20",
              "fill": "none",
              "strokeWidth": "3.5"
            },
            "classes": "stroke-zinc-200 dark:stroke-zinc-800"
          },
          {
            "kind": "circle",
            "attributes": {
              "cx": "25",
              "cy": "25",
              "r": "20",
              "fill": "none",
              "strokeWidth": "3.5",
              "strokeDasharray": "80",
              "strokeDashoffset": "28",
              "strokeLinecap": "round"
            },
            "classes": "stroke-zinc-800 dark:stroke-white"
          }
        ]
      }
    ]
  },
  "fade-dots": {
    "classes": "flex space-x-2",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0,
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "linear"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0,
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "linear"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0,
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "linear"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0,
            1,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "linear"
        }
      }
    ]
  },
  "flip-square": {
    "classes": "w-8 h-8 bg-zinc-800 dark:bg-white rounded-md shadow-sm",
    "animation": {
      "rotateX": [
        0,
        180,
        180,
        0
      ],
      "rotateY": [
        0,
        0,
        180,
        180
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "floating-diamonds": {
    "classes": "flex space-x-2",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm rotate-45",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm rotate-45",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm rotate-45",
        "animation": {
          "y": [
            0,
            -10,
            0
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "fluid-bars": {
    "classes": "flex space-x-1",
    "children": [
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "animation": {
          "rotate": [
            -15,
            15,
            -15
          ],
          "scaleY": [
            0.8,
            1,
            0.8
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "animation": {
          "rotate": [
            -15,
            15,
            -15
          ],
          "scaleY": [
            0.8,
            1,
            0.8
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "animation": {
          "rotate": [
            -15,
            15,
            -15
          ],
          "scaleY": [
            0.8,
            1,
            0.8
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full origin-bottom",
        "animation": {
          "rotate": [
            -15,
            15,
            -15
          ],
          "scaleY": [
            0.8,
            1,
            0.8
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "fluid-diamond": {
    "classes": "w-6 h-6 bg-zinc-800 dark:bg-white rounded-sm",
    "style": {
      "rotate": 45
    },
    "animation": {
      "scaleX": [
        1,
        1.5,
        1
      ],
      "scaleY": [
        1,
        0.5,
        1
      ]
    },
    "timing": {
      "duration": 1.5,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "fluid-dot-orbit": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        },
        "children": [
          {
            "classes": "w-2 h-2 bg-zinc-500 dark:bg-zinc-350 rounded-full absolute top-1 left-1/2 -ml-1"
          }
        ]
      }
    ]
  },
  "fluid-skeleton": {
    "classes": "w-24 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden relative",
    "children": [
      {
        "classes": "absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent",
        "animation": {
          "x": [
            "-100%",
            "200%"
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "gears": {
    "classes": "flex space-x-[-4px]",
    "children": [
      {
        "classes": "w-8 h-8 border-4 border-dashed border-zinc-800 dark:border-zinc-700 rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 4,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "w-6 h-6 border-[3px] border-dashed border-zinc-500 rounded-full mt-3",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 3,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "glassmorphic-card": {
    "classes": "w-20 h-16 bg-zinc-100 dark:bg-zinc-800/50 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm flex items-center justify-center relative overflow-hidden",
    "children": [
      {
        "classes": "absolute w-12 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-full blur-xl -z-10",
        "animation": {
          "x": [
            -20,
            20,
            -20
          ],
          "y": [
            -10,
            10,
            -10
          ]
        },
        "timing": {
          "duration": 3,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-5 h-5 border-2 border-zinc-800 dark:border-zinc-700 border-t-transparent rounded-full animate-spin"
      }
    ]
  },
  "gradient-arc": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "w-10 h-10 rounded-full",
        "style": {
          "background": "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
          "maskImage": "radial-gradient(transparent 55%, black 60%)"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "grid-dots": {
    "classes": "grid grid-cols-3 gap-1.5",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.8,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "haptic-ring": {
    "classes": "w-10 h-10 border-[3px] border-zinc-200 dark:border-zinc-800 rounded-full border-t-zinc-800 dark:border-t-white",
    "animation": {
      "rotate": [
        0,
        90,
        180,
        270,
        360
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "type": "spring",
      "bounce": 0.4
    }
  },
  "heartbeat": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 64 32"
    },
    "classes": "w-16 h-8 overflow-visible",
    "children": [
      {
        "kind": "polyline",
        "attributes": {
          "points": "0,16 16,16 24,4 32,28 40,16 64,16",
          "strokeWidth": "2",
          "strokeLinejoin": "round",
          "strokeLinecap": "round",
          "strokeDasharray": "100"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "animation": {
          "strokeDashoffset": [
            100,
            -100
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "hexagon-spinner": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-10 h-10",
    "children": [
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,15 45,35 25,45 5,35 5,15",
          "strokeWidth": "4"
        },
        "classes": "stroke-zinc-200 dark:stroke-zinc-800 fill-none"
      },
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,15 45,35 25,45 5,35 5,15",
          "strokeWidth": "4",
          "strokeLinecap": "round",
          "strokeDasharray": "120"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "animation": {
          "strokeDashoffset": [
            120,
            -120
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "hourglass": {
    "classes": "w-8 h-10 flex flex-col items-center justify-between",
    "animation": {
      "rotate": [
        0,
        180,
        180,
        360,
        360
      ]
    },
    "timing": {
      "duration": 3,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "w-8 h-0 border-t-[16px] border-t-zinc-800 dark:border-t-white border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent origin-bottom"
      },
      {
        "classes": "w-8 h-0 border-b-[16px] border-b-zinc-800 dark:border-b-white border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent origin-top"
      }
    ]
  },
  "infinity-path": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 60 30"
    },
    "classes": "w-12 h-6 overflow-visible",
    "children": [
      {
        "kind": "path",
        "attributes": {
          "d": "M 15 15 C 15 5, 25 5, 30 15 C 35 25, 45 25, 45 15 C 45 5, 35 5, 30 15 C 25 25, 15 25, 15 15",
          "strokeWidth": "4",
          "strokeLinecap": "round"
        },
        "classes": "stroke-zinc-200 dark:stroke-zinc-800 fill-none"
      },
      {
        "kind": "path",
        "attributes": {
          "d": "M 15 15 C 15 5, 25 5, 30 15 C 35 25, 45 25, 45 15 C 45 5, 35 5, 30 15 C 25 25, 15 25, 15 15",
          "strokeWidth": "4",
          "strokeLinecap": "round",
          "strokeDasharray": "100"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "animation": {
          "strokeDashoffset": [
            100,
            -100
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "ios-spinner": {
    "classes": "relative w-8 h-8",
    "children": [
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 0
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 30
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.08333333333333333,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 60
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.16666666666666666,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 90
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.25,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 120
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.3333333333333333,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 150
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.41666666666666663,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 180
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.5,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 210
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.5833333333333333,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 240
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.6666666666666666,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 270
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.75,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 300
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.8333333333333333,
              "ease": "linear"
            }
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "style": {
          "rotate": 330
        },
        "children": [
          {
            "classes": "w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto",
            "animation": {
              "opacity": [
                1,
                0.2
              ]
            },
            "timing": {
              "duration": 1,
              "repeat": "infinite",
              "delay": 0.9166666666666666,
              "ease": "linear"
            }
          }
        ]
      }
    ]
  },
  "line-spinner": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "w-10 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-full absolute"
      },
      {
        "classes": "w-8 h-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "mac-terminal": {
    "classes": "flex items-center text-zinc-900 dark:text-white font-mono text-sm",
    "children": [
      {
        "children": [
          "~ %"
        ]
      },
      {
        "classes": "ml-1.5 w-2 h-4 bg-zinc-900 dark:bg-white inline-block",
        "animation": {
          "opacity": [
            1,
            0,
            1
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "minimal-triangle": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-10 h-10 overflow-visible",
    "children": [
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,40 5,40",
          "strokeWidth": "3"
        },
        "classes": "stroke-zinc-200 dark:stroke-zinc-800 fill-none"
      },
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,40 5,40",
          "strokeWidth": "3",
          "strokeDasharray": "120"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none",
        "animation": {
          "strokeDashoffset": [
            120,
            0,
            -120
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "morph-dot-ring": {
    "classes": "grid grid-cols-2 gap-1 w-6 h-6",
    "animation": {
      "rotate": 180,
      "gap": [
        "4px",
        "0px",
        "4px"
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white rounded-full"
      }
    ]
  },
  "morph-loader": {
    "classes": "relative flex items-center justify-center ",
    "style": {
      "width": 40,
      "height": 40
    },
    "children": [
      {
        "classes": "rounded-2xl bg-blue-500 shadow-lg",
        "style": {
          "width": 40,
          "height": 40
        },
        "animation": {
          "borderRadius": [
            "25%",
            "50%",
            "50%",
            "25%",
            "25%"
          ],
          "rotate": [
            0,
            90,
            180,
            270,
            360
          ],
          "scale": [
            1,
            0.8,
            1.1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 2.2,
          "ease": "easeInOut",
          "repeat": "infinite"
        }
      }
    ]
  },
  "morphing-bars": {
    "classes": "flex space-x-1 h-8 items-center",
    "animation": {
      "gap": [
        "4px",
        "0px",
        "4px"
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "w-2 h-8 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            32,
            16,
            32
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-8 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            32,
            16,
            32
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-8 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            32,
            16,
            32
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "morphing-infinity": {
    "classes": "w-12 h-6 flex justify-between items-center relative",
    "children": [
      {
        "classes": "w-6 h-6 border-2 border-zinc-800 dark:border-zinc-700 rounded-full",
        "animation": {
          "x": [
            0,
            24,
            0
          ],
          "scale": [
            1,
            0.5,
            1
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-6 h-6 border-2 border-zinc-800 dark:border-zinc-700 rounded-full absolute top-0 left-0",
        "animation": {
          "x": [
            24,
            0,
            24
          ],
          "scale": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "morphing-ring": {
    "classes": "w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700",
    "animation": {
      "rotate": 180,
      "borderRadius": [
        "10%",
        "50%",
        "10%"
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "morphing-shape": {
    "classes": "w-10 h-10 bg-zinc-800 dark:bg-white shadow-sm",
    "animation": {
      "borderRadius": [
        "10%",
        "50%",
        "10%"
      ],
      "rotate": [
        0,
        90,
        180
      ],
      "scale": [
        1,
        0.8,
        1
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "newtons-cradle": {
    "classes": "flex items-center justify-center space-x-0.5",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full origin-top",
        "animation": {
          "rotate": [
            25,
            0,
            0,
            0,
            0,
            25
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full origin-top",
        "animation": {
          "rotate": [
            0,
            0,
            0,
            -25,
            0,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "offset-rings": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-12 h-12 border-2 border-zinc-800 dark:border-zinc-700 border-x-transparent rounded-full",
        "animation": {
          "rotate": [
            0,
            180,
            360
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute w-8 h-8 border-2 border-zinc-500 border-y-transparent rounded-full",
        "animation": {
          "rotate": [
            0,
            -180,
            -360
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.2
        }
      }
    ]
  },
  "orbiting-circles": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "absolute w-full h-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        },
        "children": [
          {
            "classes": "absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-zinc-500 dark:bg-zinc-350 rounded-full"
          }
        ]
      },
      {
        "classes": "absolute w-full h-full",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        },
        "children": [
          {
            "classes": "absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-zinc-500 dark:bg-zinc-350 rounded-full"
          }
        ]
      }
    ]
  },
  "orbiting-dot": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
      },
      {
        "classes": "absolute w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        },
        "children": [
          {
            "classes": "absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 bg-zinc-800 dark:bg-white rounded-full shadow-sm"
          }
        ]
      }
    ]
  },
  "origami-shape": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute top-0 left-0 w-5 h-5 bg-zinc-800 dark:bg-white rounded-tl-md",
        "style": {
          "transformOrigin": "right"
        },
        "animation": {
          "rotateY": [
            0,
            180,
            0
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute bottom-0 right-0 w-5 h-5 bg-zinc-500 dark:bg-zinc-350 rounded-br-md",
        "style": {
          "transformOrigin": "left"
        },
        "animation": {
          "rotateY": [
            0,
            180,
            0
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "pendulum": {
    "classes": "relative w-16 h-12 flex items-start justify-center",
    "children": [
      {
        "classes": "w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full rounded-b-none absolute top-0"
      },
      {
        "classes": "absolute top-0 w-1 bg-zinc-800 dark:bg-white origin-top flex flex-col items-center",
        "animation": {
          "rotate": [
            -45,
            45,
            -45
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-1 h-8 bg-zinc-800 dark:bg-white"
          },
          {
            "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-full"
          }
        ]
      }
    ]
  },
  "pulsating-dots": {
    "classes": "flex space-x-2",
    "children": [
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            1.5,
            1
          ],
          "opacity": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            1.5,
            1
          ],
          "opacity": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            1.5,
            1
          ],
          "opacity": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "pulse-dot": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-10 h-10 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            0,
            1
          ],
          "opacity": [
            0.8,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-800 dark:bg-white rounded-full relative z-10"
      }
    ]
  },
  "pulse-dots": {
    "classes": "flex space-x-1.5",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "delay": 0
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "delay": 0.2
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "delay": 0.4
        }
      }
    ]
  },
  "pulse-square": {
    "classes": "w-8 h-8 border-4 border-zinc-800 dark:border-zinc-700 rounded-md",
    "animation": {
      "scale": [
        1,
        1.2,
        1
      ],
      "opacity": [
        1,
        0.3,
        1
      ],
      "borderRadius": [
        "20%",
        "50%",
        "20%"
      ]
    },
    "timing": {
      "duration": 1.5,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "pulse": {
    "classes": "relative flex items-center justify-center ",
    "style": {
      "width": 12,
      "height": 12
    },
    "children": [
      {
        "classes": "absolute w-full h-full rounded-full bg-blue-500"
      },
      {
        "classes": "absolute w-full h-full rounded-full bg-blue-500 opacity-40",
        "animation": {
          "scale": 2.8,
          "opacity": 0
        },
        "timing": {
          "repeat": "infinite",
          "duration": 1.8,
          "ease": "easeOut"
        },
        "initial": {
          "scale": 1,
          "opacity": 0.5
        }
      },
      {
        "classes": "absolute w-full h-full rounded-full bg-blue-500 opacity-40",
        "animation": {
          "scale": 2.8,
          "opacity": 0
        },
        "timing": {
          "repeat": "infinite",
          "duration": 1.8,
          "delay": 0.6,
          "ease": "easeOut"
        },
        "initial": {
          "scale": 1,
          "opacity": 0.5
        }
      }
    ]
  },
  "pumping-heart": {
    "classes": "w-8 h-8",
    "animation": {
      "scale": [
        1,
        1.25,
        1,
        1.25,
        1
      ]
    },
    "timing": {
      "duration": 1.5,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "kind": "svg",
        "attributes": {
          "viewBox": "0 0 24 24"
        },
        "classes": "fill-zinc-800 dark:fill-white",
        "children": [
          {
            "kind": "path",
            "attributes": {
              "d": "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            }
          }
        ]
      }
    ]
  },
  "radar-sweep": {
    "classes": "relative w-12 h-12 rounded-full border border-zinc-800/10 dark:border-white/10 flex items-center justify-center overflow-hidden",
    "children": [
      {
        "classes": "absolute w-8 h-8 rounded-full border border-zinc-800/5 dark:border-white/5"
      },
      {
        "classes": "absolute w-4 h-4 rounded-full border border-zinc-800/5 dark:border-white/5"
      },
      {
        "classes": "absolute w-1.5 h-1.5 rounded-full bg-zinc-800/80 dark:bg-white/80"
      },
      {
        "classes": "absolute inset-0 origin-center",
        "style": {
          "background": "conic-gradient(from 0deg, transparent 50%, rgba(39,39,42,0.02) 65%, rgba(39,39,42,0.1) 85%, rgba(39,39,42,0.45) 100%)"
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.8,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "ring-sweep": {
    "classes": "w-10 h-10 border-[3px] border-zinc-200 dark:border-zinc-800 rounded-full border-t-zinc-800 dark:border-t-white",
    "animation": {
      "rotate": 360
    },
    "timing": {
      "duration": 1,
      "repeat": "infinite",
      "ease": "linear"
    }
  },
  "ripple-effect": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
      },
      {
        "classes": "absolute w-8 h-8 border border-zinc-850 dark:border-white rounded-full",
        "animation": {
          "scale": 1.6,
          "opacity": 0
        },
        "timing": {
          "duration": 2.2,
          "repeat": "infinite",
          "ease": "easeOut",
          "delay": 0
        },
        "initial": {
          "scale": 0.3,
          "opacity": 0.8
        }
      },
      {
        "classes": "absolute w-8 h-8 border border-zinc-850 dark:border-white rounded-full",
        "animation": {
          "scale": 1.6,
          "opacity": 0
        },
        "timing": {
          "duration": 2.2,
          "repeat": "infinite",
          "ease": "easeOut",
          "delay": 0.7
        },
        "initial": {
          "scale": 0.3,
          "opacity": 0.8
        }
      },
      {
        "classes": "absolute w-8 h-8 border border-zinc-850 dark:border-white rounded-full",
        "animation": {
          "scale": 1.6,
          "opacity": 0
        },
        "timing": {
          "duration": 2.2,
          "repeat": "infinite",
          "ease": "easeOut",
          "delay": 1.4
        },
        "initial": {
          "scale": 0.3,
          "opacity": 0.8
        }
      }
    ]
  },
  "rotating-cross": {
    "classes": "relative w-8 h-8 flex items-center justify-center",
    "animation": {
      "rotate": 180
    },
    "timing": {
      "duration": 0.8,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "absolute w-full h-1.5 bg-zinc-800 dark:bg-white rounded-sm"
      },
      {
        "classes": "absolute h-full w-1.5 bg-zinc-800 dark:bg-white rounded-sm"
      }
    ]
  },
  "rotating-triangle": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-10 h-10 overflow-visible",
    "children": [
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,40 5,40",
          "strokeWidth": "4",
          "strokeLinejoin": "round"
        },
        "classes": "stroke-zinc-800 dark:stroke-white fill-none origin-center",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "shape-shift-grid": {
    "classes": "grid grid-cols-2 gap-1 w-8 h-8",
    "children": [
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white",
        "animation": {
          "borderRadius": [
            "10%",
            "50%",
            "10%"
          ],
          "scale": [
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white",
        "animation": {
          "borderRadius": [
            "10%",
            "50%",
            "10%"
          ],
          "scale": [
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white",
        "animation": {
          "borderRadius": [
            "10%",
            "50%",
            "10%"
          ],
          "scale": [
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-full bg-zinc-800 dark:bg-white",
        "animation": {
          "borderRadius": [
            "10%",
            "50%",
            "10%"
          ],
          "scale": [
            1,
            0.8,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "shimmer-line": {
    "classes": "w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative",
    "children": [
      {
        "classes": "absolute top-0 left-0 bottom-0 w-1/3 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "x": [
            "-100%",
            "300%"
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "siri-wave": {
    "classes": "flex space-x-1 items-center h-8",
    "children": [
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "skeleton-loader": {
    "classes": "w-full max-w-[120px] space-y-2",
    "children": [
      {
        "classes": "flex items-center space-x-2",
        "children": [
          {
            "classes": "w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0",
            "animation": {
              "opacity": [
                0.5,
                1,
                0.5
              ]
            },
            "timing": {
              "duration": 1.5,
              "repeat": "infinite",
              "ease": "easeInOut"
            }
          },
          {
            "classes": "h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full",
            "animation": {
              "opacity": [
                0.5,
                1,
                0.5
              ]
            },
            "timing": {
              "duration": 1.5,
              "repeat": "infinite",
              "ease": "easeInOut",
              "delay": 0.2
            }
          }
        ]
      },
      {
        "classes": "h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full",
        "animation": {
          "opacity": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.4
        }
      },
      {
        "classes": "h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-4/5",
        "animation": {
          "opacity": [
            0.5,
            1,
            0.5
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.6
        }
      }
    ]
  },
  "skeleton": {
    "classes": "relative overflow-hidden rounded-md bg-neutral-200/50 dark:bg-neutral-800/40 ",
    "children": [
      {
        "classes": "absolute inset-0 w-[80%] h-full",
        "style": {
          "background": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)"
        },
        "animation": {
          "x": "150%"
        },
        "timing": {
          "repeat": "infinite",
          "duration": 1.6,
          "ease": "easeInOut"
        },
        "initial": {
          "x": "-150%"
        }
      }
    ]
  },
  "sliding-bars": {
    "classes": "relative w-8 h-8",
    "children": [
      {
        "classes": "absolute top-0 left-0 w-8 h-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            0,
            24,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute bottom-0 left-0 w-8 h-1.5 bg-zinc-400 dark:bg-zinc-200 rounded-full",
        "animation": {
          "y": [
            0,
            -24,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "smooth-dot-shift": {
    "classes": "relative w-12 h-3 flex items-center",
    "children": [
      {
        "classes": "absolute w-3 h-3 bg-zinc-800 dark:bg-white rounded-full z-10",
        "animation": {
          "x": [
            0,
            18,
            36,
            18,
            0
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-0"
      },
      {
        "classes": "w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-[18px]"
      },
      {
        "classes": "w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-[36px]"
      }
    ]
  },
  "smooth-ring": {
    "classes": "w-9 h-9",
    "children": [
      {
        "kind": "svg",
        "attributes": {
          "viewBox": "0 0 32 32"
        },
        "classes": "w-full h-full ",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1,
          "ease": "linear",
          "repeat": "infinite"
        },
        "children": [
          {
            "kind": "circle",
            "attributes": {
              "cx": "16",
              "cy": "16",
              "r": "14",
              "fill": "none",
              "strokeWidth": "3"
            },
            "classes": "stroke-zinc-200 dark:stroke-zinc-800"
          },
          {
            "kind": "circle",
            "attributes": {
              "cx": "16",
              "cy": "16",
              "r": "14",
              "fill": "none",
              "strokeWidth": "3",
              "strokeDasharray": "38 80",
              "strokeLinecap": "round"
            },
            "classes": "stroke-zinc-800 dark:stroke-white"
          }
        ]
      }
    ]
  },
  "smooth-rounded-square": {
    "classes": "w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700",
    "animation": {
      "borderRadius": [
        "10%",
        "50%",
        "10%"
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "spinning-squares": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute top-0 left-0 w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "x": [
            0,
            24,
            24,
            0,
            0
          ],
          "y": [
            0,
            0,
            24,
            24,
            0
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute bottom-0 right-0 w-4 h-4 bg-zinc-300 dark:bg-zinc-700 rounded-sm",
        "animation": {
          "x": [
            0,
            -24,
            -24,
            0,
            0
          ],
          "y": [
            0,
            0,
            -24,
            -24,
            0
          ]
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "spiral-spinner": {
    "classes": "w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700 rounded-full border-t-transparent",
    "animation": {
      "rotate": 360,
      "scale": [
        1,
        0.8,
        1
      ]
    },
    "timing": {
      "duration": 1.5,
      "repeat": "infinite",
      "ease": "easeInOut"
    }
  },
  "spring-bars": {
    "classes": "flex flex-col space-y-2 w-10 justify-center",
    "children": [
      {
        "classes": "h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0
        }
      },
      {
        "classes": "h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.15
        }
      },
      {
        "classes": "h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left",
        "animation": {
          "scaleX": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.4,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      }
    ]
  },
  "spring-dot-matrix": {
    "classes": "grid grid-cols-3 gap-2.5",
    "children": [
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.15
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.15
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.44999999999999996
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.3
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.44999999999999996
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "scale": [
            1,
            0.4,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.6
        }
      }
    ]
  },
  "spring-hexagon": {
    "kind": "svg",
    "attributes": {
      "viewBox": "0 0 50 50"
    },
    "classes": "w-10 h-10",
    "animation": {
      "scale": [
        1,
        1.15,
        1
      ],
      "rotate": [
        0,
        60,
        60
      ]
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "type": "spring",
      "bounce": 0.3
    },
    "children": [
      {
        "kind": "polygon",
        "attributes": {
          "points": "25,5 45,15 45,35 25,45 5,35 5,15"
        },
        "classes": "fill-zinc-800 dark:fill-white"
      }
    ]
  },
  "spring-ring-expand": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute w-10 h-10 border-2 border-zinc-800 dark:border-white rounded-full",
        "animation": {
          "scale": 1.25,
          "opacity": 0
        },
        "timing": {
          "duration": 1.6,
          "repeat": "infinite",
          "ease": "easeOut",
          "delay": 0
        },
        "initial": {
          "scale": 0.1,
          "opacity": 1
        }
      },
      {
        "classes": "absolute w-10 h-10 border-2 border-zinc-800 dark:border-white rounded-full",
        "animation": {
          "scale": 1.25,
          "opacity": 0
        },
        "timing": {
          "duration": 1.6,
          "repeat": "infinite",
          "ease": "easeOut",
          "delay": 0.8
        },
        "initial": {
          "scale": 0.1,
          "opacity": 1
        }
      }
    ]
  },
  "spring-text-pop": {
    "classes": "flex font-medium text-sm tracking-widest text-zinc-800 dark:text-white",
    "children": [
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0
        },
        "children": [
          "L"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.08
        },
        "children": [
          "o"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.16
        },
        "children": [
          "a"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.24
        },
        "children": [
          "d"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.32
        },
        "children": [
          "i"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.4
        },
        "children": [
          "n"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.48
        },
        "children": [
          "g"
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.56
        },
        "children": [
          "."
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.64
        },
        "children": [
          "."
        ]
      },
      {
        "classes": "origin-bottom inline-block",
        "animation": {
          "y": [
            0,
            -6,
            0
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "ease": "easeInOut",
          "delay": 0.72
        },
        "children": [
          "."
        ]
      }
    ]
  },
  "square-accordion": {
    "classes": "flex space-x-1 w-12 h-12 justify-center items-center",
    "children": [
      {
        "classes": "w-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            12,
            32,
            12
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            12,
            32,
            12
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-3 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "height": [
            12,
            32,
            12
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "square-grid": {
    "classes": "grid grid-cols-2 gap-1.5",
    "children": [
      {
        "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "scale": [
            1,
            0.5,
            1
          ],
          "opacity": [
            1,
            0.3,
            1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "square-snake": {
    "classes": "grid grid-cols-3 gap-1 w-10 h-10",
    "children": [
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.44999999999999996,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.44999999999999996,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "bg-zinc-800 dark:bg-white rounded-sm w-full h-full",
        "animation": {
          "opacity": [
            0.1,
            1,
            0.1
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "square-spinner": {
    "classes": "w-8 h-8 border-2 border-zinc-800 dark:border-zinc-700 flex items-center justify-center",
    "animation": {
      "rotate": 90
    },
    "timing": {
      "duration": 0.6,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white"
      }
    ]
  },
  "stacked-bar-pulse": {
    "classes": "flex flex-col space-y-1 w-8 items-center",
    "children": [
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ],
          "width": [
            "50%",
            "100%",
            "50%"
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ],
          "width": [
            "50%",
            "100%",
            "50%"
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-full h-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ],
          "width": [
            "50%",
            "100%",
            "50%"
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "swapping-dots": {
    "classes": "relative w-12 h-4 flex items-center",
    "children": [
      {
        "classes": "absolute left-0 w-4 h-4 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "x": [
            0,
            32,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute right-0 w-4 h-4 bg-zinc-400 dark:bg-zinc-200 rounded-full",
        "animation": {
          "x": [
            0,
            -32,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "swirling-spinner": {
    "classes": "relative w-10 h-10 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute inset-0 border-[2.5px] border-t-zinc-800 dark:border-t-white border-r-zinc-800/30 dark:border-r-white/30 border-b-zinc-800/10 dark:border-b-white/10 border-l-transparent rounded-full",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.3,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute w-6 h-6 border-[2.5px] border-b-zinc-800 dark:border-b-white border-t-zinc-800/30 dark:border-t-white/30 border-r-zinc-800/10 dark:border-r-white/10 border-l-transparent rounded-full",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 0.9,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "symmetric-wave": {
    "classes": "flex space-x-1.5 h-10 items-center",
    "children": [
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            8,
            24,
            8
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "terminal-loader": {
    "classes": "bg-zinc-900 dark:bg-white text-zinc-100 font-mono text-[10px] p-3 rounded-md w-full h-16 flex flex-col justify-end overflow-hidden shadow-sm",
    "children": [
      {
        "classes": "flex text-zinc-500 dark:text-zinc-300 mb-1 leading-none",
        "children": [
          {
            "children": [
              "$"
            ]
          },
          {
            "classes": "ml-2",
            "children": [
              "loading..."
            ]
          }
        ]
      },
      {
        "classes": "flex items-center leading-none",
        "children": [
          {
            "classes": "text-emerald-400",
            "children": [
              "&gt;"
            ]
          },
          {
            "classes": "ml-2 w-1.5 h-2.5 bg-zinc-100 dark:bg-zinc-800 block",
            "animation": {
              "opacity": [
                1,
                0,
                1
              ]
            },
            "timing": {
              "duration": 0.8,
              "repeat": "infinite",
              "ease": "linear"
            }
          }
        ]
      }
    ]
  },
  "text-blink": {
    "classes": "text-zinc-900 dark:text-white font-medium text-lg",
    "animation": {
      "opacity": [
        1,
        0.2,
        1
      ]
    },
    "timing": {
      "duration": 1.5,
      "repeat": "infinite",
      "ease": "easeInOut"
    },
    "children": [
      "Thinking"
    ]
  },
  "text-dots": {
    "classes": "font-medium text-lg text-zinc-900 dark:text-white flex w-24",
    "children": [
      {
        "children": [
          "Thinking"
        ]
      },
      {
        "classes": "flex w-6 pl-0.5",
        "children": [
          {
            "animation": {
              "opacity": [
                0,
                1,
                1,
                0
              ]
            },
            "timing": {
              "duration": 2,
              "repeat": "infinite",
              "times": [
                0,
                0.2,
                0.8,
                1
              ]
            },
            "children": [
              "."
            ]
          },
          {
            "animation": {
              "opacity": [
                0,
                0,
                1,
                0
              ]
            },
            "timing": {
              "duration": 2,
              "repeat": "infinite",
              "times": [
                0,
                0.4,
                0.8,
                1
              ]
            },
            "children": [
              "."
            ]
          },
          {
            "animation": {
              "opacity": [
                0,
                0,
                1,
                0
              ]
            },
            "timing": {
              "duration": 2,
              "repeat": "infinite",
              "times": [
                0,
                0.6,
                0.8,
                1
              ]
            },
            "children": [
              "."
            ]
          }
        ]
      }
    ]
  },
  "text-morph": {
    "classes": "relative h-6 w-24 flex items-center justify-center font-medium text-sm text-zinc-900 dark:text-white overflow-hidden",
    "children": [
      {
        "classes": "absolute",
        "animation": {
          "opacity": [
            1,
            0,
            0,
            1
          ],
          "y": [
            0,
            -16,
            16,
            0
          ]
        },
        "timing": {
          "duration": 3,
          "repeat": "infinite",
          "ease": "easeInOut"
        },
        "children": [
          "Loading"
        ]
      },
      {
        "classes": "absolute",
        "animation": {
          "opacity": [
            0,
            1,
            1,
            0
          ],
          "y": [
            16,
            0,
            0,
            -16
          ]
        },
        "timing": {
          "duration": 3,
          "repeat": "infinite",
          "ease": "easeInOut"
        },
        "children": [
          "Wait"
        ]
      }
    ]
  },
  "text-shimmer-wave": {
    "classes": "flex font-medium text-lg",
    "children": [
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        },
        "children": [
          "T"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        },
        "children": [
          "h"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        },
        "children": [
          "i"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        },
        "children": [
          "n"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        },
        "children": [
          "k"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.5,
          "ease": "easeInOut"
        },
        "children": [
          "i"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.6000000000000001,
          "ease": "easeInOut"
        },
        "children": [
          "n"
        ]
      },
      {
        "classes": "text-zinc-900 dark:text-white",
        "animation": {
          "opacity": [
            0.3,
            1,
            0.3
          ],
          "y": [
            0,
            -2,
            0
          ]
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.7000000000000001,
          "ease": "easeInOut"
        },
        "children": [
          "g"
        ]
      }
    ]
  },
  "trailing-dots": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-2 h-2 rounded-full absolute top-0 left-1/2 -ml-1 bg-zinc-800 dark:bg-white",
            "style": {
              "opacity": 1
            }
          }
        ]
      },
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-2 h-2 rounded-full absolute top-0 left-1/2 -ml-1 bg-zinc-400 dark:bg-zinc-200",
            "style": {
              "opacity": 0.8
            }
          }
        ]
      },
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-2 h-2 rounded-full absolute top-0 left-1/2 -ml-1 bg-zinc-400 dark:bg-zinc-200",
            "style": {
              "opacity": 0.6
            }
          }
        ]
      },
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-2 h-2 rounded-full absolute top-0 left-1/2 -ml-1 bg-zinc-400 dark:bg-zinc-200",
            "style": {
              "opacity": 0.3999999999999999
            }
          }
        ]
      },
      {
        "classes": "absolute inset-0",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        },
        "children": [
          {
            "classes": "w-2 h-2 rounded-full absolute top-0 left-1/2 -ml-1 bg-zinc-400 dark:bg-zinc-200",
            "style": {
              "opacity": 0.19999999999999996
            }
          }
        ]
      }
    ]
  },
  "triple-dot-spinner": {
    "classes": "relative w-10 h-10",
    "animation": {
      "rotate": 360
    },
    "timing": {
      "duration": 2,
      "repeat": "infinite",
      "ease": "linear"
    },
    "children": [
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "transform": "rotate(0deg)"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "transform": "rotate(120deg)"
        }
      },
      {
        "classes": "absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]",
        "style": {
          "transform": "rotate(240deg)"
        }
      }
    ]
  },
  "twin-orbit": {
    "classes": "relative w-12 h-12",
    "children": [
      {
        "classes": "absolute inset-0 border-2 border-zinc-800 dark:border-zinc-700 rounded-full border-b-transparent border-r-transparent",
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      },
      {
        "classes": "absolute inset-2 border-2 border-zinc-400 rounded-full border-t-transparent border-l-transparent",
        "animation": {
          "rotate": -360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "typing-indicator": {
    "classes": "flex items-center justify-center px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full space-x-1",
    "children": [
      {
        "classes": "w-1.5 h-1.5 bg-zinc-500 dark:bg-zinc-350 rounded-full",
        "animation": {
          "y": [
            0,
            -4,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-1.5 bg-zinc-500 dark:bg-zinc-350 rounded-full",
        "animation": {
          "y": [
            0,
            -4,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1.5 h-1.5 bg-zinc-500 dark:bg-zinc-350 rounded-full",
        "animation": {
          "y": [
            0,
            -4,
            0
          ]
        },
        "timing": {
          "duration": 0.6,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "typing": {
    "classes": "flex items-center text-zinc-900 dark:text-white font-medium text-lg w-20",
    "children": [
      "Loading",
      {
        "classes": "w-1.5 h-4 bg-zinc-900 dark:bg-white ml-1 inline-block",
        "animation": {
          "opacity": [
            1,
            0,
            1
          ]
        },
        "timing": {
          "duration": 0.8,
          "repeat": "infinite",
          "ease": "linear"
        }
      }
    ]
  },
  "wandering-cube": {
    "classes": "relative w-10 h-10",
    "children": [
      {
        "classes": "absolute top-0 left-0 w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm",
        "animation": {
          "x": [
            0,
            24,
            24,
            0,
            0
          ],
          "y": [
            0,
            0,
            24,
            24,
            0
          ],
          "rotate": [
            0,
            -90,
            -180,
            -270,
            -360
          ]
        },
        "timing": {
          "duration": 2.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "watch-spinner": {
    "classes": "relative w-12 h-12 flex items-center justify-center",
    "children": [
      {
        "classes": "absolute rounded-full border-[3px] border-transparent border-t-zinc-800 dark:border-t-white",
        "style": {
          "width": 44,
          "height": 44
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute rounded-full border-[3px] border-transparent border-t-zinc-800 dark:border-t-white",
        "style": {
          "width": 32,
          "height": 32
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 1.5,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      },
      {
        "classes": "absolute rounded-full border-[3px] border-transparent border-t-zinc-800 dark:border-t-white",
        "style": {
          "width": 20,
          "height": 20
        },
        "animation": {
          "rotate": 360
        },
        "timing": {
          "duration": 2,
          "repeat": "infinite",
          "ease": "easeInOut"
        }
      }
    ]
  },
  "wave-dots": {
    "classes": "flex space-x-1.5 h-6 items-center",
    "children": [
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            4,
            -4,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            4,
            -4,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.15,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            4,
            -4,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.3,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            4,
            -4,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.44999999999999996,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2 h-2 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "y": [
            4,
            -4,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.6,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "waveform-loader": {
    "classes": "flex items-center space-x-0.5 h-8",
    "children": [
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.42073549240394825,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.45464871341284085,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.0705600040299336,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": -0.3784012476539641,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": -0.4794621373315692,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": -0.13970774909946293,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-1 bg-zinc-800 dark:bg-white rounded-full",
        "animation": {
          "height": [
            4,
            24,
            4
          ]
        },
        "timing": {
          "duration": 1,
          "repeat": "infinite",
          "delay": 0.32849329935939453,
          "ease": "easeInOut"
        }
      }
    ]
  },
  "zig-zag-pulse": {
    "classes": "grid grid-cols-3 gap-2 w-12 h-12",
    "children": [
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 1,
          "gridRow": 1
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 2,
          "gridRow": 2
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.1,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 3,
          "gridRow": 1
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.2,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 1,
          "gridRow": 3
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.30000000000000004,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 2,
          "gridRow": 2
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.4,
          "ease": "easeInOut"
        }
      },
      {
        "classes": "w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full",
        "style": {
          "gridColumn": 3,
          "gridRow": 3
        },
        "animation": {
          "opacity": [
            0.2,
            1,
            0.2
          ]
        },
        "timing": {
          "duration": 1.2,
          "repeat": "infinite",
          "delay": 0.5,
          "ease": "easeInOut"
        }
      }
    ]
  }
};
