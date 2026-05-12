export interface Experiment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: string[];
  theory: string;
  visualType: 'electronics' | 'chemistry' | 'physics' | 'biology' | 'cs';
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-1',
    title: "Circuit Ohm's Law",
    description: "Build simple circuits and measure voltage/current using virtual multimeters.",
    category: 'Electronics',
    difficulty: 'Beginner',
    steps: ['Connect the battery to the breadboard.', 'Place the resistor in series.', 'Use the multimeter to measure voltage drop.'],
    theory: "Ohm's Law is a fundamental principle in quantum and classical electronics that relates voltage (V), current (I), and resistance (R) in a linear circuit. It is mathematically expressed as V = I × R. This means that the voltage applied across a specific conductor is directly proportional to the current flowing through it, assuming the temperature remains constant.",
    visualType: 'electronics'
  },
  {
    id: 'exp-2',
    title: "Titration Analysis",
    description: "Perform an acid-base titration to determine the unknown concentration of a solution.",
    category: 'Chemistry',
    difficulty: 'Intermediate',
    steps: ['Fill the burette with the known titrant.', 'Add indicator to the analyte flask.', 'Slowly add titrant until color changes (endpoint).'],
    theory: "Acid-base titration is a quantitative analytical method used to determine the concentration of an unknown acid or base solution by neutralizing it with a standard solution of a known concentration. The point at which the indicator changes color is called the endpoint, which closely approximates the equivalence point where the moles of acid equal the moles of base.",
    visualType: 'chemistry'
  },
  {
    id: 'exp-3',
    title: "Projectile Motion",
    description: "Analyze 2D kinematics with a virtual cannon and study parabolic trajectories.",
    category: 'Physics',
    difficulty: 'Beginner',
    steps: ['Set the initial launch angle.', 'Set the initial velocity.', 'Fire the projectile and observe its parabolic path.'],
    theory: "Projectile motion refers to the motion of an object tossed into the air, subject to only the acceleration of gravity. It is analyzed by splitting the initial velocity into vertical and horizontal components. The horizontal velocity remains constant, while the vertical velocity changes constantly due to gravity (9.8 m/s²), resulting in a parabolic trajectory.",
    visualType: 'physics'
  },
  {
    id: 'exp-4',
    title: "DNA Extraction",
    description: "Virtually extract DNA from a strawberry using buffers and ethanol precipitation.",
    category: 'Biology',
    difficulty: 'Beginner',
    steps: ['Mash the organic sample.', 'Add extraction buffer (soap salt solution).', 'Filter the mixture and add cold ethanol to precipitate DNA.'],
    theory: "DNA extraction relies on breaking open cell membranes using a lysis buffer containing soap (to dissolve lipid membranes) and salt (to stabilize DNA). Because DNA is insoluble in alcohol but soluble in water, layering cold ethanol on top of the aqueous extract causes the DNA to precipitate out of the solution, making it visible and extractable.",
    visualType: 'biology'
  },
  {
    id: 'exp-5',
    title: "Logic Gates Simulator",
    description: "Design digital circuits using AND, OR, NOT, and XOR logic gates.",
    category: 'Computer Science',
    difficulty: 'Intermediate',
    steps: ['Select an AND gate.', 'Connect two input signals.', 'Observe the output changes based on truth table.'],
    theory: "Logic gates are the basic building blocks of any digital system. They operate on one or more binary inputs to produce a single binary output based on Boolean algebra. For instance, an AND gate outputs True (1) only if all its inputs are True; otherwise, it outputs False (0). These operations form the foundation of microprocessors and computer memory.",
    visualType: 'cs'
  }
];
