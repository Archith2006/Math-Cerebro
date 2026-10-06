/**
 * MASTER DATASET: 100 Pure Math Riddles & Puzzles (Black Games / Kyoz Style)
 * ZERO essay questions — pure mathematical patterns, equations, grids, matchsticks, and logic!
 */

const GAME_LEVELS = [
  // =========================================================================
  // LEVELS 1 - 20: INTRIGUING START (Patterns, Non-Linear Sequences, Grids)
  // =========================================================================
  {
    id: 1,
    type: "pattern_relation",
    difficulty: "easy",
    title: "The Multiplier Step",
    question: "2 = 6\n3 = 12\n4 = 20\n5 = 30\n6 = ?",
    options: null,
    answer: "42",
    acceptableAnswers: ["42"],
    hints: [
      "Look at what each number on the left is multiplied by.",
      "2 × 3 = 6, 3 × 4 = 12, 4 × 5 = 20, 5 × 6 = 30.",
      "Multiply 6 by 7."
    ],
    explanation: "Rule is n × (n + 1): 2×3=6, 3×4=12, 4×5=20, 5×6=30, so 6×7 = 42."
  },
  {
    id: 2,
    type: "pattern_relation",
    difficulty: "easy",
    title: "Accumulation Addition",
    question: "1 + 4 = 5\n2 + 5 = 12\n3 + 6 = 21\n8 + 11 = ?",
    options: null,
    answer: "96",
    acceptableAnswers: ["96", "40"],
    hints: [
      "Examine how each line combines both numbers.",
      "Rule: a + (a × b). For example: 1 + (1×4) = 5, 2 + (2×5) = 12.",
      "Calculate 8 + (8 × 11)."
    ],
    explanation: "Rule is a + (a × b): 8 + (8 × 11) = 8 + 88 = 96 (or adding previous total: 40)."
  },
  {
    id: 3,
    type: "bracket_relation",
    difficulty: "easy",
    title: "Difference of Squares",
    question: "7 [ 40 ] 3\n9 [ 72 ] 3\n8 [  ? ] 4",
    options: null,
    answer: "48",
    acceptableAnswers: ["48"],
    hints: [
      "Square the two outer numbers.",
      "7² - 3² = 49 - 9 = 40. 9² - 3² = 81 - 9 = 72.",
      "Calculate 8² - 4²."
    ],
    explanation: "The center number equals outer left squared minus outer right squared: 8² - 4² = 64 - 16 = 48."
  },
  {
    id: 4,
    type: "pattern_relation",
    difficulty: "easy",
    title: "Double the Square",
    question: "4 = 32\n5 = 50\n6 = 72\n7 = 98\n8 = ?",
    options: null,
    answer: "128",
    acceptableAnswers: ["128"],
    hints: [
      "Square the left number first.",
      "4² = 16 (and 16 × 2 = 32). 5² = 25 (and 25 × 2 = 50).",
      "Calculate 2 × (8²)."
    ],
    explanation: "Rule is 2 × n²: 2 × 8² = 2 × 64 = 128."
  },
  {
    id: 5,
    type: "symbol_algebra",
    difficulty: "easy",
    title: "Geometric Shapes System",
    question: "□ + □ + □ = 30\n□ × ○ + ○ = 33\n○ × △ + △ = 20\n△ = ?",
    options: null,
    answer: "5",
    acceptableAnswers: ["5"],
    hints: [
      "Solve line 1: 3 identical squares sum to 30, so Square = 10.",
      "In line 2: 10 × Circle + Circle = 33 => 11 × Circle = 33, so Circle = 3.",
      "In line 3: 3 × Triangle + Triangle = 20 => 4 × Triangle = 20. Divide 20 by 4."
    ],
    explanation: "Square = 10. Circle = 3. 4 × Triangle = 20 => Triangle = 5."
  },
  {
    id: 6,
    type: "sequence",
    difficulty: "easy",
    title: "Mirrored Squares",
    question: "61, 52, 63, 94, 46, ?",
    options: null,
    answer: "18",
    acceptableAnswers: ["18"],
    hints: [
      "Read the digits of each number in reverse.",
      "16, 25, 36, 49, 64... these are squares (4², 5², 6², 7², 8²).",
      "Next square is 9² = 81. Reverse the digits of 81."
    ],
    explanation: "Each number is a square with reversed digits: 4²=16->61, 5²=25->52, 6²=36->63, 7²=49->94, 8²=64->46, 9²=81->18."
  },
  {
    id: 7,
    type: "count_shapes",
    difficulty: "easy",
    title: "Grid Square Counting",
    countType: "squares",
    example: { size: 2, count: 5 },
    target: { size: 3, count: "?" },
    question: "2×2 Grid = 5 Squares\n3×3 Grid = ? Squares",
    options: null,
    answer: "14",
    acceptableAnswers: ["14"],
    hints: [
      "Count all possible squares of every size within the grid.",
      "A 3×3 grid contains 9 squares of size 1×1, 4 squares of size 2×2, and 1 square of size 3×3.",
      "Calculate 9 + 4 + 1."
    ],
    explanation: "Total squares = 9 (1×1) + 4 (2×2) + 1 (3×3) = 14."
  },
  {
    id: 8,
    type: "circle_geometry",
    subType: "wheel_8sector",
    difficulty: "easy",
    title: "Opposite Sector Wheel",
    sectors: [36, 25, 11, 23, 8, 19, 33, "?"],
    question: "36 | 25 | 11 | 23 | 8 | 19 | 33 | ?",
    options: null,
    answer: "21",
    acceptableAnswers: ["21"],
    hints: [
      "Compare pairs of numbers directly opposite each other across the center.",
      "Each pair of opposite sectors has the exact same sum: 36 + 8 = 44, 25 + 19 = 44, 11 + 33 = 44.",
      "The number opposite 23 must add up to 44. Compute 44 - 23."
    ],
    explanation: "Opposite sectors sum to 44: 36+8=44, 25+19=44, 11+33=44, so ? = 44 - 23 = 21."
  },
  {
    id: 9,
    type: "grid_matrix",
    difficulty: "easy",
    title: "Sum of Squares Grid",
    question: "4  3  25\n5  2  29\n6  4  ?",
    grid: [["4", "3", "25"], ["5", "2", "29"], ["6", "4", "?"]],
    options: null,
    answer: "52",
    acceptableAnswers: ["52"],
    hints: [
      "Square the first two numbers in each row and add them.",
      "Row 1: 4² + 3² = 16 + 9 = 25. Row 2: 5² + 2² = 25 + 4 = 29.",
      "Calculate 6² + 4²."
    ],
    explanation: "Row rule: Col 1² + Col 2² = Col 3: 6² + 4² = 36 + 16 = 52."
  },
  {
    id: 10,
    type: "pattern_relation",
    difficulty: "easy",
    title: "Digit Sum Multiplication",
    question: "11 × 11 = 4\n22 × 22 = 16\n33 × 33 = ?",
    options: null,
    answer: "36",
    acceptableAnswers: ["36"],
    hints: [
      "Add the digits of each number before multiplying.",
      "(1 + 1) × (1 + 1) = 2 × 2 = 4. (2 + 2) × (2 + 2) = 4 × 4 = 16.",
      "Calculate (3 + 3) × (3 + 3)."
    ],
    explanation: "(Sum of digits of 1st) × (Sum of digits of 2nd): (3+3) × (3+3) = 6 × 6 = 36."
  },
  {
    id: 11,
    type: "sequence",
    difficulty: "easy",
    title: "Cube Plus Square",
    question: "2, 12, 36, 80, 150, ?",
    options: null,
    answer: "252",
    acceptableAnswers: ["252"],
    hints: [
      "Express each term as n³ + n².",
      "1³+1²=2, 2³+2²=12, 3³+3²=36, 4³+4²=80, 5³+5²=150.",
      "Calculate 6³ + 6² (216 + 36)."
    ],
    explanation: "Formula is n³ + n²: 6³ + 6² = 216 + 36 = 252."
  },
  {
    id: 12,
    type: "circle_geometry",
    subType: "bisected",
    difficulty: "easy",
    title: "Bisected Circle Matrix",
    splitCircles: [[17, 6], [44, 33], [21, 10], [15, "?"]],
    question: "(17 | 6)   (44 | 33)\n(21 | 10)  (15 | ?)",
    options: null,
    answer: "4",
    acceptableAnswers: ["4"],
    hints: [
      "Compare the left and right halves inside each individual circle.",
      "In every circle, the left half minus the right half equals 11: 17 - 6 = 11, 44 - 33 = 11, 21 - 10 = 11.",
      "Calculate 15 - 11 to find the missing right half."
    ],
    explanation: "Left half - Right half = 11 in every circle: 17-6=11, 44-33=11, 21-10=11. So 15 - ? = 11 => ? = 4."
  },
  {
    id: 13,
    type: "bracket_relation",
    difficulty: "easy",
    title: "Outer Sum Doubled",
    question: "12 [ 30 ] 3\n16 [ 40 ] 4\n20 [  ? ] 5",
    options: null,
    answer: "50",
    acceptableAnswers: ["50"],
    hints: [
      "Add the outer left and outer right numbers.",
      "12 + 3 = 15, and 15 × 2 = 30. 16 + 4 = 20, and 20 × 2 = 40.",
      "Calculate (20 + 5) × 2."
    ],
    explanation: "Center = (Left + Right) × 2: (20 + 5) × 2 = 25 × 2 = 50."
  },
  {
    id: 14,
    type: "logic_math",
    difficulty: "easy",
    title: "Zero Multiplication",
    question: "5 + 5 + 5 - 5 × 0 = ?",
    options: null,
    answer: "15",
    acceptableAnswers: ["15"],
    hints: [
      "Multiplication has higher priority than addition and subtraction.",
      "5 × 0 = 0.",
      "Calculate 5 + 5 + 5 - 0."
    ],
    explanation: "By PEMDAS: 5 + 5 + 5 - (5 × 0) = 5 + 5 + 5 - 0 = 15."
  },
  {
    id: 15,
    type: "sequence",
    difficulty: "easy",
    title: "Prime Squares",
    question: "4, 9, 25, 49, 121, ?",
    options: null,
    answer: "169",
    acceptableAnswers: ["169"],
    hints: [
      "These are the squares of prime numbers.",
      "2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121.",
      "What is the next prime number after 11? Square it."
    ],
    explanation: "Consecutive prime squares: 2², 3², 5², 7², 11², 13² = 169."
  },
  {
    id: 16,
    type: "polygon_geometry",
    shape: "hexagon",
    difficulty: "easy",
    title: "Hexagon Opposite Products",
    sides: [20, 4, 12, 3, 15, 5],
    center: "?",
    question: "Hexagon edges: 20, 4, 12, 3, 15, 5 | Center = ?",
    options: null,
    answer: "60",
    acceptableAnswers: ["60"],
    hints: [
      "Pair up numbers on opposite sides of the hexagon.",
      "Every pair of opposite sides has the same product: 20 × 3 = 60, 4 × 15 = 60, 12 × 5 = 60.",
      "The center number represents this common product."
    ],
    explanation: "Opposite sides multiply to the center number: 20×3 = 60, 4×15 = 60, 12×5 = 60. Center = 60."
  },
  {
    id: 17,
    type: "triangle_geometry",
    difficulty: "easy",
    title: "Inverted Triangle Product",
    question: "Triangle Geometry",
    inverted: true,
    triangles: [
      [5, 10, 2],
      [4, 32, 8],
      [4, 20, "?"]
    ],
    options: null,
    answer: "5",
    acceptableAnswers: ["5"],
    hints: [
      "Multiply the top-left number by the bottom number.",
      "Triangle 1: 5 × 2 = 10. Triangle 2: 4 × 8 = 32.",
      "Triangle 3: 4 × ? = 20."
    ],
    explanation: "Rule: Top-Left × Bottom = Top-Right. 4 × ? = 20 => ? = 5."
  },
  {
    id: 18,
    type: "sequence",
    difficulty: "easy",
    title: "Square Difference Sequence",
    question: "2, 3, 7, 16, 32, ?",
    options: null,
    answer: "57",
    acceptableAnswers: ["57"],
    hints: [
      "Find the differences between terms: +1, +4, +9, +16...",
      "Differences are square numbers: 1², 2², 3², 4²...",
      "Add 5² (25) to 32."
    ],
    explanation: "Differences are consecutive squares: +1, +4, +9, +16, +25. 32 + 25 = 57."
  },
  {
    id: 19,
    type: "triangle_geometry",
    difficulty: "easy",
    title: "Vertex Multiplier",
    question: "Triangle Geometry",
    inverted: true,
    triangles: [
      [7, 21, 3],
      [6, 48, 8],
      [9, 63, "?"]
    ],
    options: null,
    answer: "7",
    acceptableAnswers: ["7"],
    hints: [
      "Top-left times bottom equals top-right.",
      "7 × 3 = 21, 6 × 8 = 48.",
      "9 × ? = 63."
    ],
    explanation: "Top-Left × Bottom = Top-Right: 9 × 7 = 63 => ? = 7."
  },
  {
    id: 20,
    type: "grid_matrix",
    difficulty: "easy",
    title: "Row Sum of Squares",
    question: "1  2  3  | 14\n2  3  4  | 29\n3  4  5  | ?",
    grid: [["1", "2", "3", "14"], ["2", "3", "4", "29"], ["3", "4", "5", "?"]],
    options: null,
    answer: "50",
    acceptableAnswers: ["50"],
    hints: [
      "Row 1: 1² + 2² + 3² = 1 + 4 + 9 = 14.",
      "Row 2: 2² + 3² + 4² = 4 + 9 + 16 = 29.",
      "Calculate 3² + 4² + 5²."
    ],
    explanation: "Row rule is sum of squares: 3² + 4² + 5² = 9 + 16 + 25 = 50."
  },

  // =========================================================================
  // LEVELS 21 - 40: MEDIUM-EASY (Equations, Multi-operation relations, Boss #25)
  // =========================================================================
  {
    id: 21,
    type: "pattern_relation",
    difficulty: "medium-easy",
    title: "Alternating Sign Product",
    question: "5 + 3 = 28\n9 + 1 = 810\n8 + 6 = 214\n7 + 3 = ?",
    options: null,
    answer: "410",
    acceptableAnswers: ["410"],
    hints: [
      "Notice the digits of the result.",
      "First part is (a - b), second part is (a + b).",
      "7 - 3 = 4, and 7 + 3 = 10. Concatenate them."
    ],
    explanation: "Left digits = (a - b), right digits = (a + b). 7 - 3 = 4, 7 + 3 = 10 => 410."
  },
  {
    id: 22,
    type: "star_radial",
    difficulty: "medium-easy",
    title: "Star Radial Powers",
    question: "Radial Star Powers",
    rays: [
      { outer: 9, inner: 81 },
      { outer: 3, inner: 9 },
      { outer: 6, inner: 36 },
      { outer: 7, inner: 49 },
      { outer: 2, inner: 4 },
      { outer: "?", inner: 100 }
    ],
    options: null,
    answer: "10",
    acceptableAnswers: ["10"],
    hints: [
      "Compare the outer number and inner number on each ray.",
      "Each inner number is the square of its outer number: 3² = 9, 6² = 36, 7² = 49, 9² = 81, 2² = 4.",
      "Solve for ?² = 100 to determine the missing outer number."
    ],
    explanation: "Outer² = Inner on every ray: 3²=9, 6²=36, 7²=49, 9²=81, 2²=4. For the missing ray: ?² = 100 => ? = 10."
  },
  {
    id: 23,
    type: "bracket_relation",
    difficulty: "medium-easy",
    title: "Cube Product",
    question: "2 [ 14 ] 3\n3 [ 36 ] 3\n4 [  ? ] 2",
    options: null,
    answer: "24",
    acceptableAnswers: ["24"],
    hints: [
      "Left × Right = 2 × 3 = 6, 6 + 8 = 14.",
      "Try (Left² + Right²): 4 + 9 = 13 (+1 = 14). Row 2: 9 + 9 = 18 (not 36).",
      "Try Left × (Left + Right): 2 × 5 = 10? What about Left² + (Left × Right): 4 + 6 = 10. How about (Left + Right) × Left?"
    ],
    explanation: "Center = Left × (Left + Right + 2): 2 × (2+3+2) = 14; 3 × (3+3+2) = 24. For 4 [ ? ] 2: 4 × 6 = 24."
  },
  {
    id: 24,
    type: "equation_system",
    difficulty: "medium-easy",
    title: "Cyclic Product System",
    question: "A × B = 24\nB × C = 32\nA × C = 12\nA + B + C = ?",
    options: null,
    answer: "15",
    acceptableAnswers: ["15"],
    hints: [
      "Multiply all three equations: (A × B × C)² = 24 × 32 × 12 = 9216.",
      "A × B × C = √9216 = 96.",
      "C = 96 / 24 = 4; A = 96 / 32 = 3; B = 96 / 12 = 8. Sum them: 3 + 8 + 4."
    ],
    explanation: "A = 3, B = 8, C = 4. A + B + C = 3 + 8 + 4 = 15."
  },
  {
    id: 25,
    type: "polygon_geometry",
    shape: "octagon",
    difficulty: "medium-easy",
    title: "BOSS LEVEL 1: The Octagon Cipher",
    sides: [19, 12, "?", 5, 9, 4, 11, 7],
    question: "Octagon Cipher",
    options: null,
    answer: "17",
    acceptableAnswers: ["17"],
    hints: [
      "Notice how the cardinal sides (top, bottom, left) relate to the adjacent angled corner sides.",
      "Each cardinal side is the sum of its two adjacent corner sides: Top = 7 + 12 = 19, Left = 7 + 4 = 11, Bottom = 4 + 5 = 9.",
      "Solve Right = Top-Right + Bottom-Right = 12 + 5."
    ],
    explanation: "Each cardinal side equals the sum of its two adjacent diagonal corners: Top = 7+12=19, Left = 7+4=11, Bottom = 4+5=9. Therefore, Right = 12 + 5 = 17."
  },
  {
    id: 26,
    type: "grid_matrix",
    difficulty: "medium-easy",
    title: "Product Minus Sum Grid",
    question: "3  4  5\n5  6  19\n7  8  ?",
    grid: [["3", "4", "5"], ["5", "6", "19"], ["7", "8", "?"]],
    options: null,
    answer: "41",
    acceptableAnswers: ["41"],
    hints: [
      "Row 1: (3 × 4) - (3 + 4) = 12 - 7 = 5.",
      "Row 2: (5 × 6) - (5 + 6) = 30 - 11 = 19.",
      "Calculate (7 × 8) - (7 + 8)."
    ],
    explanation: "Col 3 = (Col 1 × Col 2) - (Col 1 + Col 2): (7 × 8) - (7 + 8) = 56 - 15 = 41."
  },
  {
    id: 27,
    type: "diamond_cluster",
    difficulty: "medium-easy",
    title: "Diamond Cluster Quadrants",
    question: "Diamond Cluster Quadrants",
    diamonds: [
      { top: 8, right: 4, bottom: 8, left: 6 },
      { top: 6, right: 8, bottom: 3, left: 1 },
      { top: 7, right: 4, bottom: 2, left: "?" }
    ],
    options: null,
    answer: "2",
    acceptableAnswers: ["2"],
    hints: [
      "Examine the opposite pairs of numbers (Top & Bottom, Left & Right) in each rotated diamond.",
      "Multiply Top by Bottom, then subtract the product of Left and Right: Diamond 1: (8 × 8) - (6 × 4) = 64 - 24 = 40. Diamond 2: (6 × 3) - (1 × 8) = 18 - 8 = 10.",
      "For the bottom diamond: (7 × 2) - (? × 4) = 6 => 14 - 4×? = 6 => ? = 2."
    ],
    explanation: "Top×Bottom - Left×Right: Diamond 1 = 64-24=40; Diamond 2 = 18-8=10; Diamond 3 = 14 - (2×4) = 6. The missing left value is 2."
  },
  {
    id: 28,
    type: "pattern_relation",
    difficulty: "medium-easy",
    title: "Square Difference Concatenation",
    question: "4 + 2 = 82\n6 + 3 = 183\n8 + 4 = 324\n9 + 3 = ?",
    options: null,
    answer: "276",
    acceptableAnswers: ["276"],
    hints: [
      "First part of result is (a × b). 4×2=8, 6×3=18, 8×4=32. 9×3 = 27.",
      "Second part is (a - b). 4-2=2, 6-3=3, 8-4=4. 9-3 = 6.",
      "Concatenate 27 and 6."
    ],
    explanation: "Rule is (a × b) followed by (a - b): (9 × 3) = 27, (9 - 3) = 6 => 276."
  },
  {
    id: 29,
    type: "sequence",
    difficulty: "medium-easy",
    title: "Product of Digits Sequence",
    question: "77, 49, 36, ?",
    options: null,
    answer: "18",
    acceptableAnswers: ["18"],
    hints: [
      "Multiply the digits of each number.",
      "7 × 7 = 49. 4 × 9 = 36.",
      "Calculate 3 × 6."
    ],
    explanation: "Each term is the product of the digits of the previous term: 3 × 6 = 18."
  },
  {
    id: 30,
    type: "circle_geometry",
    difficulty: "medium-easy",
    title: "Quadrant Multiplier",
    question: "Circle Quadrants",
    circles: [
      [2, 3, 4, 24],
      [3, 3, 5, 45],
      [4, 2, 6, "?"]
    ],
    options: null,
    answer: "48",
    acceptableAnswers: ["48"],
    hints: [
      "Multiply the first three quadrant values.",
      "Circle 1: 2 × 3 × 4 = 24. Circle 2: 3 × 3 × 5 = 45.",
      "Calculate 4 × 2 × 6."
    ],
    explanation: "Bottom-Right = Top-Left × Top-Right × Bottom-Left: 4 × 2 × 6 = 48."
  },
  {
    id: 31,
    type: "grid_matrix",
    difficulty: "medium-easy",
    title: "Matrix Cross Multiplier",
    question: "2  4  16\n3  3  18\n4  5  ?",
    grid: [["2", "4", "16"], ["3", "3", "18"], ["4", "5", "?"]],
    options: null,
    answer: "40",
    acceptableAnswers: ["40"],
    hints: [
      "Row 1: 2 × 4 = 8, and 8 × 2 = 16.",
      "Row 2: 3 × 3 = 9, and 9 × 2 = 18.",
      "Row 3: 4 × 5 = 20. Multiply by 2."
    ],
    explanation: "Col 3 = 2 × (Col 1 × Col 2): 2 × (4 × 5) = 2 × 20 = 40."
  },
  {
    id: 32,
    type: "pattern_relation",
    difficulty: "medium-easy",
    title: "The Sum of Cubes",
    question: "1 + 2 = 9\n2 + 3 = 35\n3 + 4 = 91\n4 + 5 = ?",
    options: null,
    answer: "189",
    acceptableAnswers: ["189"],
    hints: [
      "Cube both numbers and add them.",
      "1³ + 2³ = 1 + 8 = 9. 2³ + 3³ = 8 + 27 = 35. 3³ + 4³ = 27 + 64 = 91.",
      "Calculate 4³ + 5³ (64 + 125)."
    ],
    explanation: "Rule is a³ + b³: 4³ + 5³ = 64 + 125 = 189."
  },
  {
    id: 33,
    type: "logic_math",
    difficulty: "medium-easy",
    title: "All Sevens Equation",
    question: "7 + 7 ÷ 7 + 7 × 7 - 7 = ?",
    options: null,
    answer: "50",
    acceptableAnswers: ["50"],
    hints: [
      "Evaluate division and multiplication first: 7 ÷ 7 = 1, and 7 × 7 = 49.",
      "The equation becomes: 7 + 1 + 49 - 7.",
      "7 and -7 cancel out: 1 + 49 = ?"
    ],
    explanation: "7 + (7 ÷ 7) + (7 × 7) - 7 = 7 + 1 + 49 - 7 = 50."
  },
  {
    id: 34,
    type: "star_radial",
    difficulty: "medium-easy",
    title: "Radial Spoke Balance",
    question: "Radial Spoke Balance",
    rays: [
      { outer: 8, inner: 2 },
      { outer: 6, inner: 5 },
      { outer: 11, inner: 4 },
      { outer: 15, inner: 6 },
      { outer: 16, inner: 10 },
      { outer: 18, inner: 7 },
      { outer: 13, inner: 8 },
      { outer: "?", inner: 6 }
    ],
    options: null,
    answer: "9",
    acceptableAnswers: ["9"],
    hints: [
      "Look at the pairs of numbers on opposite rays of the star.",
      "Outer numbers on opposite rays add up to 24: Top (8) + Bottom (16) = 24, Left (13) + Right (11) = 24, Top-Right (6) + Bottom-Left (18) = 24.",
      "For the remaining diagonal pair: 15 + ? = 24."
    ],
    explanation: "Opposite outer numbers sum to 24: 8+16=24, 11+13=24, 6+18=24. Therefore, 15 + ? = 24 => ? = 9."
  },
  {
    id: 35,
    type: "count_shapes",
    countType: "triangles",
    difficulty: "medium-easy",
    title: "Triangle Grid Count",
    example: { size: 2, count: 5 },
    target: { size: 3, count: "?" },
    question: "Triangle Grid Count",
    options: null,
    answer: "13",
    acceptableAnswers: ["13"],
    hints: [
      "Count triangles of all sizes: 1×1 unit triangles, 2×2 medium triangles, and the 3×3 outer triangle.",
      "In the size-3 triangle: there are 9 unit triangles pointing up/down, 3 upright triangles of size 2×2, and 1 full triangle of size 3×3.",
      "Add them together: 9 + 3 + 1."
    ],
    explanation: "Total triangles in a size-3 subdivided triangle: 9 (unit 1×1) + 3 (medium 2×2) + 1 (large 3×3) = 13 triangles."
  },
  {
    id: 36,
    type: "bracket_relation",
    difficulty: "medium-easy",
    title: "The Product of Sum and Difference",
    question: "5 [ 21 ] 2\n6 [ 32 ] 2\n7 [  ? ] 3",
    options: null,
    answer: "40",
    acceptableAnswers: ["40"],
    hints: [
      "Calculate 5² - 2² = 25 - 4 = 21.",
      "6² - 2² = 36 - 4 = 32.",
      "Calculate 7² - 3²."
    ],
    explanation: "a² - b² = 7² - 3² = 49 - 9 = 40."
  },
  {
    id: 37,
    type: "grid_matrix",
    difficulty: "medium-easy",
    title: "Center Product Diagonal",
    question: "3  2  6\n4  5  20\n6  7  ?",
    grid: [["3", "2", "6"], ["4", "5", "20"], ["6", "7", "?"]],
    options: null,
    answer: "42",
    acceptableAnswers: ["42"],
    hints: [
      "Col 1 × Col 2 = Col 3.",
      "3 × 2 = 6, 4 × 5 = 20.",
      "6 × 7 = ?"
    ],
    explanation: "Col 1 × Col 2 = Col 3: 6 × 7 = 42."
  },
  {
    id: 38,
    type: "pattern_relation",
    difficulty: "medium-easy",
    title: "Doubling Offset",
    question: "1 = 3\n2 = 5\n3 = 9\n4 = 17\n5 = ?",
    options: null,
    answer: "33",
    acceptableAnswers: ["33"],
    hints: [
      "Differences are +2, +4, +8, +16...",
      "Formula is 2^n + 1.",
      "Calculate 2^5 + 1 (32 + 1)."
    ],
    explanation: "Rule is 2^n + 1: 2^5 + 1 = 32 + 1 = 33."
  },
  {
    id: 39,
    type: "symbol_algebra",
    difficulty: "medium-easy",
    title: "Triple Variable System",
    question: "P + P + P = 18\nP × Q = 24\nQ + R = 10\nP + Q × R = ?",
    options: null,
    answer: "30",
    acceptableAnswers: ["30"],
    hints: [
      "3P = 18 => P = 6.",
      "6 × Q = 24 => Q = 4. Then 4 + R = 10 => R = 6.",
      "PEMDAS: 6 + (4 × 6) = 6 + 24 = 30."
    ],
    explanation: "P = 6, Q = 4, R = 6. 6 + (4 × 6) = 6 + 24 = 30."
  },
  {
    id: 40,
    type: "magic_math",
    difficulty: "medium-easy",
    title: "Magic Square Center",
    question: "8  1  6\n3  ?  7\n4  9  2",
    grid: [["8", "1", "6"], ["3", "?", "7"], ["4", "9", "2"]],
    options: null,
    answer: "5",
    acceptableAnswers: ["5"],
    hints: [
      "Every row, column, and diagonal sums to 15.",
      "Row 2: 3 + ? + 7 = 15.",
      "15 - 10 = ?"
    ],
    explanation: "Lo Shu magic square constant is 15: 3 + 5 + 7 = 15. The center is 5."
  },

  // =========================================================================
  // LEVELS 41 - 60: MEDIUM (Cross Matrices, Complex Sequences, Boss #50)
  // =========================================================================
  {
    id: 41,
    type: "circle_geometry",
    subType: "wheel_8sector",
    difficulty: "medium",
    title: "Wheel Sector Equilibrium",
    question: "Circle Sectors",
    sectors: [15, 8, 12, 15, 10, 17, 13, "?"],
    options: null,
    answer: "10",
    acceptableAnswers: ["10"],
    hints: [
      "Compare opposite sectors directly across the center.",
      "Each pair of opposite sectors sums to 25: 15 + 10 = 25, 8 + 17 = 25, 12 + 13 = 25.",
      "Calculate 25 - 15 to find the missing sector value."
    ],
    explanation: "Opposite sectors sum to 25: 15+10=25, 8+17=25, 12+13=25. Therefore, 15 + ? = 25 => ? = 10."
  },
  {
    id: 42,
    type: "sequence",
    difficulty: "medium",
    title: "Differences of Squares Reversed",
    question: "3, 5, 9, 17, 33, 65, ?",
    options: null,
    answer: "129",
    acceptableAnswers: ["129"],
    hints: [
      "Differences double each step: +2, +4, +8, +16, +32...",
      "Next difference is +64.",
      "Add 64 to 65."
    ],
    explanation: "Differences are powers of 2 (+2, +4, +8, +16, +32, +64): 65 + 64 = 129."
  },
  {
    id: 43,
    type: "grid_matrix",
    difficulty: "medium",
    title: "Square Difference Diagonal",
    question: "5  3  16\n7  2  45\n8  5  ?",
    grid: [["5", "3", "16"], ["7", "2", "45"], ["8", "5", "?"]],
    options: null,
    answer: "39",
    acceptableAnswers: ["39"],
    hints: [
      "5² - 3² = 25 - 9 = 16.",
      "7² - 2² = 49 - 4 = 45.",
      "Calculate 8² - 5²."
    ],
    explanation: "Col 1² - Col 2² = Col 3: 8² - 5² = 64 - 25 = 39."
  },
  {
    id: 44,
    type: "logic_math",
    difficulty: "medium",
    title: "Four Fours Challenge",
    question: "4 × 4 + 4 × 4 + 4 - 4 × 4 = ?",
    options: null,
    answer: "20",
    acceptableAnswers: ["20"],
    hints: [
      "Perform the multiplications first: 4 × 4 = 16.",
      "Equation: 16 + 16 + 4 - 16.",
      "16 and -16 cancel out: 16 + 4 = ?"
    ],
    explanation: "16 + 16 + 4 - 16 = 20."
  },
  {
    id: 45,
    type: "pattern_relation",
    difficulty: "medium",
    title: "The Product Plus One",
    question: "3 = 10\n4 = 17\n5 = 26\n6 = 37\n7 = ?",
    options: null,
    answer: "50",
    acceptableAnswers: ["50"],
    hints: [
      "Square the number on the left and add 1.",
      "3² + 1 = 10, 4² + 1 = 17, 5² + 1 = 26, 6² + 1 = 37.",
      "Calculate 7² + 1."
    ],
    explanation: "Rule is n² + 1: 7² + 1 = 49 + 1 = 50."
  },
  {
    id: 46,
    type: "circle_geometry",
    subType: "bisected",
    difficulty: "medium",
    title: "Bisected Circle Multiplier",
    question: "Bisected Circles",
    splitCircles: [
      [36, 9],
      [48, 12],
      [28, 7],
      [96, "?"]
    ],
    options: null,
    answer: "24",
    acceptableAnswers: ["24"],
    hints: [
      "Compare the left and right halves of each circle.",
      "In each circle, the left half divided by 4 equals the right half: 36 / 4 = 9, 48 / 4 = 12, 28 / 4 = 7.",
      "Divide 96 by 4."
    ],
    explanation: "Left ÷ 4 = Right in every circle: 36÷4=9, 48÷4=12, 28÷4=7. Therefore, 96 ÷ 4 = 24."
  },
  {
    id: 47,
    type: "sequence",
    difficulty: "medium",
    title: "Double and Alternate",
    question: "1, 2, 6, 12, 36, 72, ?",
    options: null,
    answer: "216",
    acceptableAnswers: ["216"],
    hints: [
      "Pattern alternates between multiplying by 2 and multiplying by 3.",
      "1×2=2, 2×3=6, 6×2=12, 12×3=36, 36×2=72.",
      "Next multiplier is 3. 72 × 3 = ?"
    ],
    explanation: "Alternating multipliers ×2 and ×3: 72 × 3 = 216."
  },
  {
    id: 48,
    type: "circle_geometry",
    difficulty: "medium",
    title: "Quadrant Triple Product",
    question: "Circle Quadrants",
    circles: [
      [5, 7, 2, 70],
      [3, 8, 4, 96],
      [6, 5, 3, "?"]
    ],
    options: null,
    answer: "90",
    acceptableAnswers: ["90"],
    hints: [
      "Multiply the three quadrant values to get the fourth.",
      "5 × 7 × 2 = 70. 3 × 8 × 4 = 96.",
      "Calculate 6 × 5 × 3."
    ],
    explanation: "Product of three sectors = fourth sector: 6 × 5 × 3 = 90."
  },
  {
    id: 49,
    type: "grid_matrix",
    difficulty: "medium",
    title: "Cubic Difference Grid",
    question: "3  2  19\n4  3  37\n5  2  ?",
    grid: [["3", "2", "19"], ["4", "3", "37"], ["5", "2", "?"]],
    options: null,
    answer: "117",
    acceptableAnswers: ["117"],
    hints: [
      "Cube both numbers in each row and subtract.",
      "3³ - 2³ = 27 - 8 = 19. 4³ - 3³ = 64 - 27 = 37.",
      "Calculate 5³ - 2³."
    ],
    explanation: "Col 1³ - Col 2³ = Col 3: 5³ - 2³ = 125 - 8 = 117."
  },
  {
    id: 50,
    type: "pattern_relation",
    difficulty: "medium",
    title: "BOSS LEVEL 2: The Pyramid Formula",
    question: "1 = 1\n2 = 5\n3 = 14\n4 = 30\n5 = ?",
    options: null,
    answer: "55",
    acceptableAnswers: ["55"],
    hints: [
      "These are the square pyramidal numbers (sum of squares 1² + 2² + ... + n²).",
      "1²=1, 1+4=5, 5+9=14, 14+16=30.",
      "Add 5² (25) to 30."
    ],
    explanation: "Sum of squares: 1² + 2² + 3² + 4² + 5² = 1 + 4 + 9 + 16 + 25 = 55."
  },
  {
    id: 51,
    type: "polygon_geometry",
    shape: "hexagon",
    difficulty: "medium",
    title: "Hexagonal Symmetry",
    question: "Hexagon Perimeter Geometry",
    sides: [14, 9, 16, 10, 15, "?"],
    center: 24,
    options: null,
    answer: "8",
    acceptableAnswers: ["8"],
    hints: [
      "Pair opposite sides across the hexagon.",
      "Every pair of opposite sides sums to the center number 24: 14 + 10 = 24, 9 + 15 = 24.",
      "Solve 16 + ? = 24 to determine the missing side."
    ],
    explanation: "Opposite sides sum to the center number 24: 14+10=24, 9+15=24. Therefore, 16 + ? = 24 => ? = 8."
  },
  {
    id: 52,
    type: "triangle_geometry",
    difficulty: "medium",
    title: "Upright Triangle Triad",
    question: "Triangle Geometry",
    inverted: false,
    triangles: [
      [3, 4, 5, 60],
      [2, 6, 7, 84],
      [4, 5, 6, "?"]
    ],
    options: null,
    answer: "120",
    acceptableAnswers: ["120"],
    hints: [
      "Multiply the three corner vertices to find the center number.",
      "3 × 4 × 5 = 60. 2 × 6 × 7 = 84.",
      "Calculate 4 × 5 × 6."
    ],
    explanation: "Center = Top × Bottom-Left × Bottom-Right: 4 × 5 × 6 = 120."
  },
  {
    id: 53,
    type: "sequence",
    difficulty: "medium",
    title: "Factorial Additions",
    question: "1, 2, 6, 24, 120, ?",
    options: null,
    answer: "720",
    acceptableAnswers: ["720"],
    hints: [
      "Multiply each term by its index (n!).",
      "1×2=2, 2×3=6, 6×4=24, 24×5=120.",
      "Calculate 120 × 6."
    ],
    explanation: "Factorials (n!): 120 × 6 = 720."
  },
  {
    id: 54,
    type: "diamond_cluster",
    difficulty: "medium",
    title: "Diamond Product Equality",
    question: "Diamond Cluster Systems",
    diamonds: [
      { top: 6, right: 3, bottom: 4, left: 8 },
      { top: 9, right: 6, bottom: 4, left: 6 },
      { top: 8, right: 4, bottom: 5, left: "?" }
    ],
    options: null,
    answer: "10",
    acceptableAnswers: ["10"],
    hints: [
      "In each diamond, compare the vertical product (Top × Bottom) with the horizontal product (Left × Right).",
      "Diamond 1: 6 × 4 = 24 and 8 × 3 = 24. Diamond 2: 9 × 4 = 36 and 6 × 6 = 36.",
      "Diamond 3: 8 × 5 = 40. Solve ? × 4 = 40."
    ],
    explanation: "Vertical product equals horizontal product in each diamond (Top × Bottom = Left × Right): 6×4=24, 9×4=36, 8×5=40 => ? × 4 = 40 => ? = 10."
  },
  {
    id: 55,
    type: "pattern_relation",
    difficulty: "medium",
    title: "The Diagonal Step",
    question: "3 = 24\n4 = 60\n5 = 120\n6 = ?",
    options: null,
    answer: "210",
    acceptableAnswers: ["210"],
    hints: [
      "Express as (n³ - n).",
      "3³ - 3 = 27 - 3 = 24. 4³ - 4 = 64 - 4 = 60. 5³ - 5 = 125 - 5 = 120.",
      "Calculate 6³ - 6."
    ],
    explanation: "Rule is n³ - n: 6³ - 6 = 216 - 6 = 210."
  },
  {
    id: 56,
    type: "grid_matrix",
    difficulty: "medium",
    title: "Product Corner Sum",
    question: "2  3  4  | 24\n3  4  5  | 60\n4  5  6  | ?",
    grid: [["2", "3", "4", "24"], ["3", "4", "5", "60"], ["4", "5", "6", "?"]],
    options: null,
    answer: "120",
    acceptableAnswers: ["120"],
    hints: [
      "Multiply all three numbers in each row.",
      "2 × 3 × 4 = 24. 3 × 4 × 5 = 60.",
      "Calculate 4 × 5 × 6."
    ],
    explanation: "Product of row elements: 4 × 5 × 6 = 120."
  },
  {
    id: 57,
    type: "bracket_relation",
    difficulty: "medium",
    title: "Outer Product Squared",
    question: "2 [ 36 ] 3\n3 [ 144 ] 4\n2 [  ? ] 5",
    options: null,
    answer: "100",
    acceptableAnswers: ["100"],
    hints: [
      "Multiply outer numbers and square the result.",
      "(2 × 3)² = 6² = 36. (3 × 4)² = 12² = 144.",
      "Calculate (2 × 5)²."
    ],
    explanation: "(Left × Right)² = (2 × 5)² = 10² = 100."
  },
  {
    id: 58,
    type: "sequence",
    difficulty: "medium",
    title: "Square Minus n",
    question: "0, 2, 6, 12, 20, 30, ?",
    options: null,
    answer: "42",
    acceptableAnswers: ["42"],
    hints: [
      "1²-1=0, 2²-2=2, 3²-3=6, 4²-4=12, 5²-5=20, 6²-6=30.",
      "Formula is n² - n, or differences +2, +4, +6, +8, +10, +12.",
      "30 + 12 = ?"
    ],
    explanation: "7² - 7 = 49 - 7 = 42 (or 30 + 12 = 42)."
  },
  {
    id: 59,
    type: "grid_matrix",
    difficulty: "medium",
    title: "Magic Square Matrix",
    question: "6  1  8\n7  5  3\n2  ?  4",
    grid: [["6", "1", "8"], ["7", "5", "3"], ["2", "?", "4"]],
    options: null,
    answer: "9",
    acceptableAnswers: ["9"],
    hints: [
      "Every row and column has the exact same sum.",
      "Row 1: 6 + 1 + 8 = 15. Row 2: 7 + 5 + 3 = 15.",
      "Row 3: 2 + ? + 4 = 15."
    ],
    explanation: "Constant sum = 15: 2 + 9 + 4 = 15 => ? = 9."
  },
  {
    id: 60,
    type: "logic_math",
    difficulty: "medium",
    title: "Parentheses and Powers",
    question: "2^(2^3) ÷ (2^2)^3 = ?",
    options: null,
    answer: "4",
    acceptableAnswers: ["4"],
    hints: [
      "2^(2^3) = 2^8 = 256.",
      "(2^2)^3 = 2^(2×3) = 2^6 = 64.",
      "Calculate 256 ÷ 64 (or 2^(8 - 6) = 2^2)."
    ],
    explanation: "2^8 / 2^6 = 2^(8-6) = 2^2 = 4."
  },

  // =========================================================================
  // LEVELS 61 - 80: HARD (Multi-Variable, Non-Linear Patterns, Boss #75)
  // =========================================================================
  {
    id: 61,
    type: "pattern_relation",
    difficulty: "hard",
    title: "Two-Operation Code",
    question: "3 + 2 = 13\n4 + 3 = 25\n5 + 4 = 41\n6 + 5 = ?",
    options: null,
    answer: "61",
    acceptableAnswers: ["61"],
    hints: [
      "Sum of squares of both numbers.",
      "3² + 2² = 9 + 4 = 13. 4² + 3² = 16 + 9 = 25. 5² + 4² = 25 + 16 = 41.",
      "Calculate 6² + 5²."
    ],
    explanation: "a² + b²: 6² + 5² = 36 + 25 = 61."
  },
  {
    id: 62,
    type: "sequence",
    difficulty: "hard",
    title: "Powers of n",
    question: "1, 4, 27, 256, ?",
    options: null,
    answer: "3125",
    acceptableAnswers: ["3125"],
    hints: [
      "Express as n^n.",
      "1^1 = 1, 2^2 = 4, 3^3 = 27, 4^4 = 256.",
      "Calculate 5^5 (5 × 5 × 5 × 5 × 5)."
    ],
    explanation: "Formula is n^n: 5^5 = 3125."
  },
  {
    id: 63,
    type: "grid_matrix",
    difficulty: "hard",
    title: "Matrix Cross Formula",
    question: "7  3  22\n8  4  36\n9  5  ?",
    grid: [["7", "3", "22"], ["8", "4", "36"], ["9", "5", "?"]],
    options: null,
    answer: "50",
    acceptableAnswers: ["50"],
    hints: [
      "(7 × 3) + 1 = 22.",
      "(8 × 4) + 4 = 36... or try (Col 1² - Col 2²): 49 - 9 = 40 (half is 20).",
      "Look at (Col 1 × Col 2) + (Col 1 - Col 2): (7×3) + (7-3) = 21 + 4 = 25? Try (9 × 5) + 5 = 50."
    ],
    explanation: "(Col 1 × Col 2) + (Col 1 - Col 2 - 3)? Or (7×3)+1=22, (8×4)+4=36, (9×5)+5=50: Col 3 = (9×5) + 5 = 50."
  },
  {
    id: 64,
    type: "bracket_relation",
    difficulty: "hard",
    title: "Crossed Powers",
    question: "3 [ 17 ] 2\n4 [ 31 ] 3\n5 [  ? ] 4",
    options: null,
    answer: "49",
    acceptableAnswers: ["49"],
    hints: [
      "Left² + Right² = 9 + 4 = 13 (+4 = 17).",
      "Try (Left × Right) + (Left + Right): (3×2) + 5 = 11. How about (Left² + 2×Right²)? 9 + 8 = 17! 16 + 18 = 34.",
      "Look at 2×Left² - 1: 18 - 1 = 17, 32 - 1 = 31. For 5: 2×5² - 1 = 50 - 1 = 49!"
    ],
    explanation: "Formula is 2 × Left² - 1: 2 × 25 - 1 = 49."
  },
  {
    id: 65,
    type: "symbol_algebra",
    difficulty: "hard",
    title: "Tri-Variable Product",
    question: "a + a + a = 15\na × b = 30\nb - c = 2\nc + a × b = ?",
    options: null,
    answer: "34",
    acceptableAnswers: ["34"],
    hints: [
      "3a = 15 => a = 5.",
      "5 × b = 30 => b = 6. 6 - c = 2 => c = 4.",
      "PEMDAS: 4 + (5 × 6) = 4 + 30 = 34."
    ],
    explanation: "a = 5, b = 6, c = 4. 4 + (5 × 6) = 34."
  },
  {
    id: 66,
    type: "sequence",
    difficulty: "hard",
    title: "Fibonacci Product",
    question: "1, 2, 2, 4, 8, 32, ?",
    options: null,
    answer: "256",
    acceptableAnswers: ["256"],
    hints: [
      "Each term is the product of the previous two terms.",
      "1×2=2, 2×2=4, 2×4=8, 4×8=32.",
      "Calculate 8 × 32."
    ],
    explanation: "Each number is the product of the previous two: 8 × 32 = 256."
  },
  {
    id: 67,
    type: "pattern_relation",
    difficulty: "hard",
    title: "Double Digit Sum Cube",
    question: "12 = 27\n13 = 64\n14 = 125\n15 = ?",
    options: null,
    answer: "216",
    acceptableAnswers: ["216"],
    hints: [
      "Add the digits of the left number, then cube the sum.",
      "(1 + 2)³ = 3³ = 27. (1 + 3)³ = 4³ = 64. (1 + 4)³ = 5³ = 125.",
      "Calculate (1 + 5)³."
    ],
    explanation: "(Sum of digits)³: (1 + 5)³ = 6³ = 216."
  },
  {
    id: 68,
    type: "logic_math",
    difficulty: "hard",
    title: "Nested Division",
    question: "100 ÷ 5 ÷ 2 ÷ 2 = ?",
    options: null,
    answer: "5",
    acceptableAnswers: ["5"],
    hints: [
      "Evaluate chained divisions strictly from left to right.",
      "100 ÷ 5 = 20.",
      "20 ÷ 2 = 10, then 10 ÷ 2 = ?"
    ],
    explanation: "Left to right: ((100 ÷ 5) ÷ 2) ÷ 2 = (20 ÷ 2) ÷ 2 = 10 ÷ 2 = 5."
  },
  {
    id: 69,
    type: "grid_matrix",
    difficulty: "hard",
    title: "Row Column Multiplication Matrix",
    question: "2  3  4  | 10\n3  4  5  | 17\n4  5  6  | ?",
    grid: [["2", "3", "4", "10"], ["3", "4", "5", "17"], ["4", "5", "6", "?"]],
    options: null,
    answer: "26",
    acceptableAnswers: ["26"],
    hints: [
      "(2 × 3) + 4 = 6 + 4 = 10.",
      "(3 × 4) + 5 = 12 + 5 = 17.",
      "Calculate (4 × 5) + 6."
    ],
    explanation: "(Col 1 × Col 2) + Col 3: (4 × 5) + 6 = 20 + 6 = 26."
  },
  {
    id: 70,
    type: "equation_system",
    difficulty: "hard",
    title: "Sum and Difference System",
    question: "X + Y = 100\nX - Y = 20\nX × Y = ?",
    options: null,
    answer: "2400",
    acceptableAnswers: ["2400"],
    hints: [
      "Add both equations: 2X = 120 => X = 60.",
      "Subtract equations: 2Y = 80 => Y = 40.",
      "Calculate 60 × 40."
    ],
    explanation: "X = 60, Y = 40. X × Y = 60 × 40 = 2400."
  },
  {
    id: 71,
    type: "sequence",
    difficulty: "hard",
    title: "Lucas Numbers",
    question: "2, 1, 3, 4, 7, 11, 18, ?",
    options: null,
    answer: "29",
    acceptableAnswers: ["29"],
    hints: [
      "Like Fibonacci, each term is the sum of the two preceding terms.",
      "7 + 11 = 18.",
      "Add 11 + 18."
    ],
    explanation: "Lucas sequence: 11 + 18 = 29."
  },
  {
    id: 72,
    type: "pattern_relation",
    difficulty: "hard",
    title: "Cross Product Sum",
    question: "4 × 3 = 19\n5 × 4 = 29\n6 × 5 = 41\n7 × 6 = ?",
    options: null,
    answer: "55",
    acceptableAnswers: ["55"],
    hints: [
      "(4 × 3) + (4 + 3) = 12 + 7 = 19.",
      "(5 × 4) + (5 + 4) = 20 + 9 = 29.",
      "Calculate (7 × 6) + (7 + 6)."
    ],
    explanation: "(a × b) + (a + b): (7 × 6) + (7 + 6) = 42 + 13 = 55."
  },
  {
    id: 73,
    type: "bracket_relation",
    difficulty: "hard",
    title: "Square Difference Multiplier",
    question: "8 [ 48 ] 4\n9 [ 72 ] 3\n10 [  ? ] 2",
    options: null,
    answer: "96",
    acceptableAnswers: ["96"],
    hints: [
      "8² - 4² = 64 - 16 = 48.",
      "9² - 3² = 81 - 9 = 72.",
      "Calculate 10² - 2²."
    ],
    explanation: "a² - b² = 10² - 2² = 100 - 4 = 96."
  },
  {
    id: 74,
    type: "logic_math",
    difficulty: "hard",
    title: "Symmetric Equation",
    question: "(111 - 11) × (11 - 1) ÷ 100 = ?",
    options: null,
    answer: "10",
    acceptableAnswers: ["10"],
    hints: [
      "(111 - 11) = 100.",
      "(11 - 1) = 10.",
      "100 × 10 ÷ 100 = ?"
    ],
    explanation: "(100 × 10) ÷ 100 = 1000 ÷ 100 = 10."
  },
  {
    id: 75,
    type: "symbol_algebra",
    difficulty: "hard",
    title: "BOSS LEVEL 3: Triple Variable Matrix",
    question: "U + U + U = 36\nU × V = 48\nV + W + W = 14\nU + V × W = ?",
    options: null,
    answer: "32",
    acceptableAnswers: ["32"],
    hints: [
      "3U = 36 => U = 12.",
      "12 × V = 48 => V = 4. Then 4 + 2W = 14 => W = 5.",
      "PEMDAS: 12 + (4 × 5)."
    ],
    explanation: "U = 12, V = 4, W = 5. 12 + (4 × 5) = 12 + 20 = 32."
  },
  {
    id: 76,
    type: "sequence",
    difficulty: "hard",
    title: "Triangular Sequence Step",
    question: "1, 3, 6, 10, 15, 21, 28, ?",
    options: null,
    answer: "36",
    acceptableAnswers: ["36"],
    hints: [
      "Differences increase by 1: +2, +3, +4, +5, +6, +7...",
      "Next difference is +8.",
      "Add 8 to 28."
    ],
    explanation: "Triangular numbers: 28 + 8 = 36."
  },
  {
    id: 77,
    type: "star_radial",
    difficulty: "hard",
    title: "Radial Product Sequence",
    question: "Radial Ray Sequences",
    rays: [
      { outer: 2, inner: 6 },
      { outer: 3, inner: 12 },
      { outer: 4, inner: 20 },
      { outer: 5, inner: 30 },
      { outer: 6, inner: 42 },
      { outer: 7, inner: 56 },
      { outer: 8, inner: 72 },
      { outer: 9, inner: "?" }
    ],
    options: null,
    answer: "90",
    acceptableAnswers: ["90"],
    hints: [
      "Compare each outer number with its corresponding inner number.",
      "Each inner number equals Outer × (Outer + 1): 2 × 3 = 6, 3 × 4 = 12, 4 × 5 = 20, 5 × 6 = 30, 6 × 7 = 42, 7 × 8 = 56, 8 × 9 = 72.",
      "Compute 9 × 10 for the missing inner number."
    ],
    explanation: "Each ray follows Inner = Outer × (Outer + 1): 2×3=6, 3×4=12, 4×5=20... For outer 9: 9 × 10 = 90."
  },
  {
    id: 78,
    type: "grid_matrix",
    difficulty: "hard",
    title: "Sum and Product Cross",
    question: "5  3  15  8\n6  4  24  10\n7  5  ?   12",
    grid: [["5", "3", "15", "8"], ["6", "4", "24", "10"], ["7", "5", "?", "12"]],
    options: null,
    answer: "35",
    acceptableAnswers: ["35"],
    hints: [
      "Col 3 is Col 1 × Col 2.",
      "Col 4 is Col 1 + Col 2.",
      "7 × 5 = ?"
    ],
    explanation: "Col 3 = 7 × 5 = 35 (and Col 4 = 7 + 5 = 12)."
  },
  {
    id: 79,
    type: "sequence",
    difficulty: "hard",
    title: "Cube Minus Square",
    question: "0, 4, 18, 48, 100, ?",
    options: null,
    answer: "180",
    acceptableAnswers: ["180"],
    hints: [
      "Formula is n³ - n².",
      "1³-1²=0, 2³-2²=4, 3³-3²=18, 4³-4²=48, 5³-5²=100.",
      "Calculate 6³ - 6² (216 - 36)."
    ],
    explanation: "n³ - n²: 6³ - 6² = 216 - 36 = 180."
  },
  {
    id: 80,
    type: "triangle_geometry",
    difficulty: "hard",
    title: "Inverted Factor Relation",
    question: "Triangle Geometry",
    inverted: true,
    triangles: [
      [9, 72, 8],
      [7, 84, 12],
      [6, 90, "?"]
    ],
    options: null,
    answer: "15",
    acceptableAnswers: ["15"],
    hints: [
      "Top-left multiplied by bottom equals top-right.",
      "9 × 8 = 72. 7 × 12 = 84.",
      "6 × ? = 90."
    ],
    explanation: "Top-Left × Bottom = Top-Right: 6 × ? = 90 => ? = 15."
  },

  // =========================================================================
  // LEVELS 81 - 100: EXPERT (Brain Teasers, Pure Logic, Grand Boss #100)
  // =========================================================================
  {
    id: 81,
    type: "pattern_relation",
    difficulty: "expert",
    title: "Triple Digit Combinations",
    question: "1 + 1 + 1 = 6\n2 + 2 + 2 = 6\n3 + 3 + 3 = 6\n6 + 6 - 6 = ?",
    options: null,
    answer: "6",
    acceptableAnswers: ["6"],
    hints: [
      "Notice each expression is engineered to evaluate to 6.",
      "(1+1+1)! = 3! = 6. 2+2+2 = 6. 3×3 - 3 = 6.",
      "6 + 6 - 6 = ?"
    ],
    explanation: "6 + 6 - 6 = 6."
  },
  {
    id: 82,
    type: "sequence",
    difficulty: "expert",
    title: "Differences of Cubes",
    question: "1, 7, 19, 37, 61, ?",
    options: null,
    answer: "91",
    acceptableAnswers: ["91"],
    hints: [
      "Differences are multiples of 6: +6, +12, +18, +24...",
      "Next difference is +30.",
      "Add 30 to 61."
    ],
    explanation: "Differences increase by 6: 61 + 30 = 91 (also n³ - (n-1)³: 6³ - 5³ = 216 - 125 = 91)."
  },
  {
    id: 83,
    type: "grid_matrix",
    difficulty: "expert",
    title: "Determinant Row Magic",
    question: "3  2  1\n4  5  6\n5  7  ?",
    grid: [["3", "2", "1"], ["4", "5", "6"], ["5", "7", "?"]],
    options: null,
    answer: "9",
    acceptableAnswers: ["9"],
    hints: [
      "Check differences along rows or columns.",
      "Col 1 to Col 2: + -? Or Col 1 + Col 3 = 2 × Col 2? Row 1: 3 + 1 = 4 = 2×2.",
      "Row 2: 4 + 6 = 10 = 2×5. Row 3: 5 + ? = 2×7 = 14."
    ],
    explanation: "Col 1 + Col 3 = 2 × Col 2 (arithmetic progression in rows): 5 + ? = 14 => ? = 9."
  },
  {
    id: 84,
    type: "bracket_relation",
    difficulty: "expert",
    title: "Product of Differences",
    question: "7 [ 21 ] 4\n8 [ 35 ] 3\n9 [  ? ] 2",
    options: null,
    answer: "49",
    acceptableAnswers: ["49"],
    hints: [
      "Left × (Left - Right): 7 × (7 - 4) = 7 × 3 = 21.",
      "8 × (8 - 3) = 8 × 5 = 40 (wait, 35? 7×5=35).",
      "Notice (Left - 2) × (Right + 3)? Try Left × Right - 7? Look at (9 - 2) × 7 = 49."
    ],
    explanation: "(Left - Right) × 7: (7 - 4) × 7 = 21; (9 - 2) × 7 = 49."
  },
  {
    id: 85,
    type: "logic_math",
    difficulty: "expert",
    title: "Exponential Cancellation",
    question: "3^4 - 4^3 + 2^5 = ?",
    options: null,
    answer: "49",
    acceptableAnswers: ["49"],
    hints: [
      "3^4 = 81.",
      "4^3 = 64. 2^5 = 32.",
      "81 - 64 + 32 = ?"
    ],
    explanation: "81 - 64 + 32 = 17 + 32 = 49."
  },
  {
    id: 86,
    type: "symbol_algebra",
    difficulty: "expert",
    title: "Geometric Shape System",
    question: "⬡ + ⬡ + ⬡ = 45\n⬡ + ◇ + ◇ = 25\n◇ + △ + △ = 11\n△ + ⬡ × ◇ = ?",
    options: null,
    answer: "78",
    acceptableAnswers: ["78"],
    hints: [
      "Solve for the value of each geometric shape row by row.",
      "Row 1: 3⬡ = 45 => ⬡ = 15. Row 2: 15 + 2◇ = 25 => ◇ = 5. Row 3: 5 + 2△ = 11 => △ = 3.",
      "Use order of operations (PEMDAS): 3 + (15 × 5)."
    ],
    explanation: "⬡ = 15, ◇ = 5, △ = 3. Using PEMDAS: 3 + (15 × 5) = 3 + 75 = 78."
  },
  {
    id: 87,
    type: "circle_geometry",
    difficulty: "expert",
    title: "Quadrant Factor Matrix",
    question: "Circle Quadrants",
    circles: [
      [4, 9, 3, 108],
      [5, 6, 2, 60],
      [7, 8, 3, "?"]
    ],
    options: null,
    answer: "168",
    acceptableAnswers: ["168"],
    hints: [
      "Multiply the three outer sectors to get the fourth sector.",
      "4 × 9 × 3 = 108. 5 × 6 × 2 = 60.",
      "Calculate 7 × 8 × 3."
    ],
    explanation: "Product of 3 quadrants: 7 × 8 × 3 = 168."
  },
  {
    id: 88,
    type: "pattern_relation",
    difficulty: "expert",
    title: "Base Power Relation",
    question: "2 = 2\n3 = 8\n4 = 24\n5 = 64\n6 = ?",
    options: null,
    answer: "160",
    acceptableAnswers: ["160"],
    hints: [
      "Express as n × 2^(n-2).",
      "2 × 2^0 = 2. 3 × 2^1 = 6 (here 8? 2^3=8).",
      "Look at (n - 1) × 2^(n-1): for n=6: (5) × 32 = 160."
    ],
    explanation: "(n - 1) × 2^(n-1): for n=6, 5 × 32 = 160."
  },
  {
    id: 89,
    type: "grid_matrix",
    difficulty: "expert",
    title: "Product Ratio Matrix",
    question: "12  4  3\n24  6  4\n35  7  ?",
    grid: [["12", "4", "3"], ["24", "6", "4"], ["35", "7", "?"]],
    options: null,
    answer: "5",
    acceptableAnswers: ["5"],
    hints: [
      "Col 1 ÷ Col 2 = Col 3.",
      "12 ÷ 4 = 3, 24 ÷ 6 = 4.",
      "35 ÷ 7 = ?"
    ],
    explanation: "Col 1 ÷ Col 2 = Col 3: 35 ÷ 7 = 5."
  },
  {
    id: 90,
    type: "symbol_algebra",
    difficulty: "expert",
    title: "System of Three Variables",
    question: "D + D + D = 30\nD + E + E = 18\nE - F = 1\nF + D × E = ?",
    options: null,
    answer: "43",
    acceptableAnswers: ["43"],
    hints: [
      "3D = 30 => D = 10.",
      "10 + 2E = 18 => E = 4. 4 - F = 1 => F = 3.",
      "PEMDAS: 3 + (10 × 4) = 3 + 40 = 43."
    ],
    explanation: "D = 10, E = 4, F = 3. 3 + (10 × 4) = 43."
  },
  {
    id: 91,
    type: "sequence",
    difficulty: "expert",
    title: "Alternating Add-Multiply",
    question: "2, 4, 7, 14, 17, 34, ?",
    options: null,
    answer: "37",
    acceptableAnswers: ["37"],
    hints: [
      "Pattern alternates: ×2, then +3.",
      "2×2=4, 4+3=7, 7×2=14, 14+3=17, 17×2=34.",
      "Next operation is +3. 34 + 3 = ?"
    ],
    explanation: "Alternates between ×2 and +3: 34 + 3 = 37."
  },
  {
    id: 92,
    type: "bracket_relation",
    difficulty: "expert",
    title: "Double Cube Sum",
    question: "2 [ 35 ] 3\n1 [ 28 ] 3\n2 [  ? ] 4",
    options: null,
    answer: "72",
    acceptableAnswers: ["72"],
    hints: [
      "Cube both numbers and sum.",
      "2³ + 3³ = 8 + 27 = 35. 1³ + 3³ = 1 + 27 = 28.",
      "Calculate 2³ + 4³."
    ],
    explanation: "Left³ + Right³ = 2³ + 4³ = 8 + 64 = 72."
  },
  {
    id: 93,
    type: "logic_math",
    difficulty: "expert",
    title: "Nested Roots and Powers",
    question: "√(5² + 12²) = ?",
    options: null,
    answer: "13",
    acceptableAnswers: ["13"],
    hints: [
      "5² = 25, 12² = 144.",
      "25 + 144 = 169.",
      "What is √169?"
    ],
    explanation: "Pythagorean triple: √(25 + 144) = √169 = 13."
  },
  {
    id: 94,
    type: "pattern_relation",
    difficulty: "expert",
    title: "Square of the Difference",
    question: "9 - 4 = 25\n8 - 2 = 36\n7 - 1 = 36\n10 - 3 = ?",
    options: null,
    answer: "49",
    acceptableAnswers: ["49"],
    hints: [
      "Subtract the two numbers, then square the result.",
      "(9 - 4)² = 5² = 25. (8 - 2)² = 6² = 36. (7 - 1)² = 6² = 36.",
      "Calculate (10 - 3)²."
    ],
    explanation: "(a - b)²: (10 - 3)² = 7² = 49."
  },
  {
    id: 95,
    type: "grid_matrix",
    difficulty: "expert",
    title: "Diagonal Cross Power",
    question: "2  3  8\n3  2  9\n4  3  ?",
    grid: [["2", "3", "8"], ["3", "2", "9"], ["4", "3", "?"]],
    options: null,
    answer: "64",
    acceptableAnswers: ["64"],
    hints: [
      "Col 1 raised to the power of Col 2.",
      "2³ = 8, 3² = 9.",
      "Calculate 4³."
    ],
    explanation: "Col 1 ^ Col 2 = Col 3: 4³ = 64."
  },
  {
    id: 96,
    type: "grid_matrix",
    difficulty: "expert",
    title: "Cyclic Symmetric Matrix",
    question: "4  7  93\n5  6  91\n6  8  ?",
    grid: [["4", "7", "93"], ["5", "6", "91"], ["6", "8", "?"]],
    options: null,
    answer: "148",
    acceptableAnswers: ["148"],
    hints: [
      "Consider algebraic expansions involving squares and products of both column entries.",
      "Each row satisfies a² + a×b + b²: 4² + 4×7 + 7² = 16 + 28 + 49 = 93; 5² + 5×6 + 6² = 25 + 30 + 36 = 91.",
      "Compute 6² + 6×8 + 8² = 36 + 48 + 64."
    ],
    explanation: "Col 3 = a² + ab + b²: 6² + 6×8 + 8² = 36 + 48 + 64 = 148."
  },
  {
    id: 97,
    type: "sequence",
    difficulty: "expert",
    title: "Sub-Factorial Sequence",
    question: "1, 5, 23, 119, 719, ?",
    options: null,
    answer: "5039",
    acceptableAnswers: ["5039"],
    hints: [
      "Add 1 to each number in the sequence and observe the resulting values.",
      "Notice factorial values: 1+1=2 (2!), 5+1=6 (3!), 23+1=24 (4!), 119+1=120 (5!), 719+1=720 (6!).",
      "The next term is 7! - 1 = 5040 - 1."
    ],
    explanation: "Each term is n! - 1: 2!-1=1, 3!-1=5, 4!-1=23, 5!-1=119, 6!-1=719. Next is 7! - 1 = 5040 - 1 = 5039."
  },
  {
    id: 98,
    type: "equation_system",
    difficulty: "expert",
    title: "Quadratic Triad System",
    question: "A² + B² = 74\nB² + C² = 113\nA² + C² = 89\nA × B × C = ?",
    options: null,
    answer: "280",
    acceptableAnswers: ["280"],
    hints: [
      "Sum all three equations together to determine 2(A² + B² + C²).",
      "2(A² + B² + C²) = 276 => A² + B² + C² = 138. Subtract each equation to isolate individual squares: C² = 64 (C = 8), A² = 25 (A = 5), B² = 49 (B = 7).",
      "Compute A × B × C = 5 × 7 × 8."
    ],
    explanation: "A = 5, B = 7, C = 8. A × B × C = 5 × 7 × 8 = 280."
  },
  {
    id: 99,
    type: "bracket_relation",
    difficulty: "expert",
    title: "Pythagorean Prime Triads",
    question: "7 [ 24 ] 25\n9 [ 40 ] 41\n11 [ 60 ] 61\n13 [  ? ] 85",
    options: null,
    answer: "84",
    acceptableAnswers: ["84"],
    hints: [
      "Compare the square of the left number with the sum of the center and right numbers.",
      "These are primitive Pythagorean triples where Left² = Center + Right: 7² = 24 + 25 (7² + 24² = 25²); 9² = 40 + 41; 11² = 60 + 61.",
      "For 13: solve ? + 85 = 13² = 169."
    ],
    explanation: "Pythagorean triples where Left² = Center + Right (and Right - Center = 1): 13² = 169. 169 - 85 = 84 (since 13² + 84² = 85²)."
  },
  {
    id: 100,
    type: "symbol_algebra",
    difficulty: "expert",
    title: "GRAND BOSS LEVEL 100: The Enigma of the Gods",
    question: "⬡ + ⬡ + ⬡ = 48\n⬡ × ◇ - ◇² = 60\n◇ × △ + △ = 63\n√△ + ○³ = 30\n○ × □ - □ = 24\n□ × △ + ⬡ × ◇ - ○⁴ = ?",
    options: null,
    answer: "123",
    acceptableAnswers: ["123"],
    hints: [
      "Solve row by row. Notice equation 2 yields two quadratic solutions for ◇, but only one produces an integer value for △ in equation 3.",
      "⬡ = 16. In ◇² - 16◇ + 60 = 0, choosing ◇ = 6 yields 7△ = 63 => △ = 9. Then √9 + ○³ = 30 => ○ = 3, and 3□ - □ = 24 => □ = 12.",
      "Substitute into the final equation with PEMDAS: (12 × 9) + (16 × 6) - 3⁴ = 108 + 96 - 81."
    ],
    explanation: "⬡ = 16, ◇ = 6, △ = 9, ○ = 3, □ = 12. Final expression: (12 × 9) + (16 × 6) - (3⁴) = 108 + 96 - 81 = 123."
  }
];

if (typeof window !== 'undefined') {
  window.GAME_LEVELS = GAME_LEVELS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_LEVELS;
  if (typeof global !== 'undefined') {
    global.GAME_LEVELS = GAME_LEVELS;
  }
}
