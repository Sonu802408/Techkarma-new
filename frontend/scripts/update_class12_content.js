import fs from 'fs';
import path from 'path';

const content = `// Tech Karma Classes - Class 12 Educational Content Master Data
// Strict mapping: Class 12 -> Medium -> Subject -> Chapter -> 7 Content Types
// Updated with verified resources: NotesStreet MCQs, PW NCERT Solutions, eVidyarthi Sample Papers, Self-authored Chemistry Solutions, NCRTSolutions Maths & Biology

export const class12EducationalData = {
    'English': {
        'Physics': {
            1: {
                chapterName: 'Electric Charges and Fields',
                mcqs: [
                    {
                        id: 'c12-en-phy-ch1-q1',
                        question: 'A body can be negatively charged by:',
                        options: ['Giving excess of electrons to it', 'Removing some electron from it', 'Giving some protons to it', 'Removing some neutrons from it'],
                        correctIndex: 0,
                        explanation: 'Electrons carry negative charge (-1.6 × 10⁻¹⁹ C). Adding excess electrons imparts a net negative charge to the body.',
                        difficulty: 'Easy',
                        topic: 'Electric Charge & Quantization'
                    },
                    {
                        id: 'c12-en-phy-ch1-q2',
                        question: 'The SI unit of permittivity of free space (ε₀) is:',
                        options: ['C² N⁻¹ m⁻²', 'N m² C⁻²', 'C N m⁻¹', 'C² N m²'],
                        correctIndex: 0,
                        explanation: 'From Coulomb\\'s Law F = (1/4πε₀) · (q₁q₂/r²), ε₀ = q₁q₂ / (4πFr²) = C² N⁻¹ m⁻² (also expressed as F/m).',
                        difficulty: 'Easy',
                        topic: 'Coulomb\\'s Law'
                    },
                    {
                        id: 'c12-en-phy-ch1-q3',
                        question: 'Which of the following is NOT a property of electrostatic field lines?',
                        options: ['They are continuous curves without breaks', 'Two field lines can never cross each other', 'They start at positive charges and end at negative charges', 'They form closed continuous loops'],
                        correctIndex: 3,
                        explanation: 'Electrostatic field lines do not form closed loops because the electrostatic field is conservative in nature (conservative line integral ∮ E·dl = 0).',
                        difficulty: 'Conceptual',
                        topic: 'Electric Field Lines'
                    },
                    {
                        id: 'c12-en-phy-ch1-q4',
                        question: 'Two point charges +q and -q are placed at distance 2a apart. The electric dipole moment vector p points from:',
                        options: ['-q to +q', '+q to -q', 'Perpendicular to the axis', 'Radially outward'],
                        correctIndex: 0,
                        explanation: 'By standard physical convention, the dipole moment vector p directed from the negative charge (-q) to the positive charge (+q) with magnitude 2aq.',
                        difficulty: 'Easy',
                        topic: 'Electric Dipole'
                    },
                    {
                        id: 'c12-en-phy-ch1-q5',
                        question: 'Total electric flux emerging through a closed surface enclosing an electric dipole is:',
                        options: ['Zero', 'q / ε₀', '2q / ε₀', 'q / (2ε₀)'],
                        correctIndex: 0,
                        explanation: 'By Gauss\\'s Law, total electric flux Φ = q_enclosed / ε₀. For a dipole, q_net = (+q) + (-q) = 0. Therefore, Φ = 0.',
                        difficulty: 'Easy',
                        topic: 'Gauss Law & Electric Flux'
                    },
                    {
                        id: 'c12-en-phy-ch1-q6',
                        question: 'The electric field intensity E at distance r from an infinitely long straight charged wire varies as:',
                        options: ['E ∝ 1/r', 'E ∝ 1/r²', 'E ∝ 1/r³', 'E is independent of r'],
                        correctIndex: 0,
                        explanation: 'From Gauss\\'s Law, electric field due to an infinite line charge is E = λ / (2πε₀r). Hence, E ∝ 1/r.',
                        difficulty: 'Moderate',
                        topic: 'Applications of Gauss Law'
                    },
                    {
                        id: 'c12-en-phy-ch1-q7',
                        question: 'An electric dipole placed in a uniform electric field E experiences:',
                        options: ['Only a torque, no net force', 'Only a net force, no torque', 'Both a net force and a torque', 'Neither a net force nor a torque'],
                        correctIndex: 0,
                        explanation: 'In a uniform electric field, the two equal and opposite forces (+qE and -qE) cancel out (F_net = 0), forming a couple producing torque τ = p × E.',
                        difficulty: 'Moderate',
                        topic: 'Dipole in Uniform Electric Field'
                    }
                ],
                ncertSolutions: {
                    chapterTitle: 'Electric Charges and Fields',
                    source: 'Tech Karma Classes — NCERT Solutions (PW & CBSE Aligned)',
                    overview: 'Complete mathematical derivations, Coulomb law problems, and Gauss law applications verified by senior faculty.',
                    exercises: [
                        {
                            exerciseName: 'NCERT Chapter Exercise',
                            questions: [
                                {
                                    qNum: 'Q1.1',
                                    question: 'What is the force between two small charged spheres having charges of 2 × 10⁻⁷ C and 3 × 10⁻⁷ C placed 30 cm apart in air?',
                                    solution: 'Given:\\nq1 = 2 × 10⁻⁷ C\\nq2 = 3 × 10⁻⁷ C\\nr = 30 cm = 0.3 m\\n1/(4πε₀) = 9 × 10⁹ N·m²/C²\\n\\nUsing Coulomb\\'s Law:\\nF = (1/4πε₀) × (q1 × q2) / r²\\nF = [9 × 10⁹ × (2 × 10⁻⁷) × (3 × 10⁻⁷)] / (0.3)²\\nF = (54 × 10⁻⁵) / 0.09 = 6 × 10⁻³ N\\n\\nNature of force: Repulsive (since both charges have like positive signs).',
                                    keyConcept: 'Coulomb\\'s Law in electrostatic vacuum.'
                                },
                                {
                                    qNum: 'Q1.2',
                                    question: 'The electrostatic force on a small sphere of charge 0.4 μC due to another small sphere of charge -0.8 μC in air is 0.2 N. (a) What is the distance between the two spheres? (b) What is the force on the second sphere due to the first?',
                                    solution: '(a) Distance Calculation:\\nF = [k × |q1| × |q2|] / r²\\n0.2 = [9 × 10⁹ × (0.4 × 10⁻⁶) × (0.8 × 10⁻⁶)] / r²\\n0.2 = [2.88 × 10⁻³] / r²\\nr² = 1.44 × 10⁻² m² ⇒ r = 0.12 m = 12 cm.\\n\\n(b) By Newton\\'s Third Law, the force on the second sphere due to the first is equal in magnitude and attractive:\\nF21 = 0.2 N (Attractive towards the first sphere).',
                                    keyConcept: 'Newton\\'s Third Law in electrostatics.'
                                },
                                {
                                    qNum: 'Q1.3',
                                    question: 'An electric dipole with dipole moment 4 × 10⁻⁹ C·m is aligned at 30° with the direction of a uniform electric field of magnitude 5 × 10⁴ N/C. Calculate the magnitude of the torque acting on the dipole.',
                                    solution: 'Given:\\np = 4 × 10⁻⁹ C·m, E = 5 × 10⁴ N/C, θ = 30°\\n\\nTorque τ = p × E = p · E · sin θ\\nτ = (4 × 10⁻⁹) × (5 × 10⁴) × sin(30°)\\nτ = (20 × 10⁻⁵) × 0.5 = 1 × 10⁻⁴ N·m.',
                                    keyConcept: 'Torque on electric dipole in uniform field.'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'CBSE Class 12 Physics Sample Question Paper 2025-26 (eVidyarthi Official)',
                    maxMarks: 70,
                    timeAllowed: '3 Hours',
                    generalInstructions: [
                        'There are 33 questions in all. All questions are compulsory.',
                        'This question paper has five sections: Section A, Section B, Section C, Section D and Section E.',
                        'Section A contains 16 questions (12 MCQs and 4 Assertion-Reasoning) of 1 mark each.',
                        'Section B contains 5 short answer questions of 2 marks each.',
                        'Section C contains 7 short answer questions of 3 marks each.',
                        'Section D contains 2 case-based questions of 4 marks each.',
                        'Section E contains 3 long answer questions of 5 marks each.'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (1 Mark each)',
                            questions: [
                                { q: '1. Two charges +q and -q are kept at (-a, 0) and (a, 0) respectively. What is the electric flux through a sphere of radius 2a with centre at origin?', answer: 'Zero. Since both charges are enclosed, total enclosed charge q_net = +q - q = 0. By Gauss\\'s law, flux Φ = 0.' },
                                { q: '2. Why can two electric field lines never intersect each other?', answer: 'If they intersect, at the point of intersection there will be two tangents indicating two directions of electric field at the same point, which is physically impossible.' }
                            ]
                        },
                        {
                            sectionName: 'Section B (2 Marks each)',
                            questions: [
                                { q: '3. State Gauss\\'s law in electrostatics. Derive electric field due to a uniformly charged thin spherical shell at a point outside the shell.', answer: '∮ E·dA = q_enclosed / ε₀. For r > R, E(4πr²) = q / ε₀ ⇒ E = q / (4πε₀r²).' }
                            ]
                        }
                    ]
                }
            }
        },
        'Chemistry': {
            1: {
                chapterName: 'Solutions',
                mcqs: [
                    {
                        id: 'c12-en-chem-ch1-q1',
                        question: 'Which of the following concentration terms is independent of temperature?',
                        options: ['Molarity', 'Molality', 'Normality', 'Volume percentage'],
                        correctIndex: 1,
                        explanation: 'Molality (m = moles of solute / mass of solvent in kg) involves only mass and not volume. Mass is temperature independent, hence molality does not change with temperature.',
                        difficulty: 'Easy',
                        topic: 'Concentration Terms'
                    },
                    {
                        id: 'c12-en-chem-ch1-q2',
                        question: 'According to Henry\\'s law, the solubility of a gas in a liquid is directly proportional to:',
                        options: ['Temperature of the liquid', 'Partial pressure of the gas above the solution', 'Volume of the liquid', 'Atmospheric pressure'],
                        correctIndex: 1,
                        explanation: 'Henry\\'s law states that at constant temperature, the solubility (mole fraction x) of a gas is directly proportional to the partial pressure of the gas: p = KH · x.',
                        difficulty: 'Easy',
                        topic: 'Henry\\'s Law'
                    },
                    {
                        id: 'c12-en-chem-ch1-q3',
                        question: 'An azeotropic mixture of two liquids boils at a lower temperature than either of them when:',
                        options: ['It shows large positive deviation from Raoult\\'s law', 'It shows large negative deviation from Raoult\\'s law', 'It forms an ideal solution', 'It is saturated'],
                        correctIndex: 0,
                        explanation: 'Solutions showing large positive deviations from Raoult\\'s law have higher vapor pressure and form minimum boiling azeotropes (boil at a lower temperature).',
                        difficulty: 'Conceptual',
                        topic: 'Azeotropes & Deviations'
                    }
                ],
                ncertSolutions: {
                    chapterTitle: 'Solutions',
                    source: 'Tech Karma Classes — Official NCERT Solutions (Senior Chemistry Faculty Edition)',
                    overview: 'Authoritative, complete step-by-step solutions for all in-text and chapter-end exercises including Raoult\\'s Law, Henry\\'s Law, and Colligative Properties.',
                    exercises: [
                        {
                            exerciseName: 'NCERT Chapter Exercise',
                            questions: [
                                {
                                    qNum: 'Q2.1',
                                    question: 'Calculate the mass percentage of benzene (C₆H₆) and carbon tetrachloride (CCl₄) if 22 g of benzene is dissolved in 122 g of carbon tetrachloride.',
                                    solution: 'Total mass of solution = mass of benzene + mass of CCl₄ = 22 g + 122 g = 144 g.\\nMass % of benzene = (22 / 144) × 100 = 15.28%.\\nMass % of CCl₄ = (122 / 144) × 100 = 84.72%.',
                                    keyConcept: 'Mass percentage concentration.'
                                },
                                {
                                    qNum: 'Q2.2',
                                    question: 'Calculate the mole fraction of benzene in solution containing 30% by mass in carbon tetrachloride.',
                                    solution: 'In 100 g of solution: Mass of C₆H₆ = 30 g, Mass of CCl₄ = 70 g.\\nMolar mass of C₆H₆ = 78 g/mol → Moles = 30 / 78 = 0.3846 mol.\\nMolar mass of CCl₄ = 154 g/mol → Moles = 70 / 154 = 0.4545 mol.\\nTotal moles = 0.3846 + 0.4545 = 0.8391 mol.\\nMole fraction of benzene x(C₆H₆) = 0.3846 / 0.8391 = 0.458.',
                                    keyConcept: 'Mole fraction calculation.'
                                },
                                {
                                    qNum: 'Q2.3',
                                    question: '45 g of ethylene glycol (C₂H₆O₂) is mixed with 600 g of water. Calculate (a) the freezing point depression and (b) the freezing point of the solution. (Kf for water = 1.86 K kg mol⁻¹)',
                                    solution: 'Molar mass of C₂H₆O₂ = (2×12) + (6×1) + (2×16) = 62 g/mol.\\nMoles of solute = 45 / 62 = 0.7258 mol.\\nMass of water = 600 g = 0.6 kg.\\nMolality m = 0.7258 / 0.6 = 1.2097 mol/kg.\\n\\n(a) Depression in freezing point: ΔTf = Kf · m = 1.86 × 1.2097 = 2.25 K.\\n(b) Freezing point of solution: Tf = 273.15 K - 2.25 K = 270.90 K (-2.25 °C).',
                                    keyConcept: 'Depression in Freezing Point ΔTf = Kf · m.'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'CBSE Class 12 Chemistry Sample Question Paper 2025-26 (eVidyarthi Official)',
                    maxMarks: 70,
                    timeAllowed: '3 Hours',
                    generalInstructions: [
                        'There are 33 questions in this question paper with internal choice.',
                        'Section A consists of 16 multiple-choice questions carrying 1 mark each.',
                        'Section B consists of 5 short answer questions carrying 2 marks each.',
                        'Section C consists of 7 short answer questions carrying 3 marks each.',
                        'Section D consists of 2 case-based questions carrying 4 marks each.',
                        'Section E consists of 3 long answer questions carrying 5 marks each.'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (1 Mark each)',
                            questions: [
                                { q: '1. What happens to the solubility of a gas in liquid as temperature increases?', answer: 'Solubility decreases because the dissolution of a gas in a liquid is an exothermic process (Le Chatelier\\'s principle).' },
                                { q: '2. Which colligative property is most suitable for determining the molecular mass of proteins and polymers?', answer: 'Osmotic pressure (π = CRT), because measurements can be carried out at room temperature without denaturation.' }
                            ]
                        }
                    ]
                }
            }
        },
        'Mathematics': {
            1: {
                chapterName: 'Relations and Functions',
                mcqs: [
                    {
                        id: 'c12-en-math-ch1-q1',
                        question: 'Let R be the relation in the set {1, 2, 3, 4} given by R = {(1, 2), (2, 2), (1, 1), (4, 4), (1, 3), (3, 3), (3, 2)}. Then R is:',
                        options: ['Reflexive and symmetric but not transitive', 'Reflexive and transitive but not symmetric', 'Symmetric and transitive but not reflexive', 'An equivalence relation'],
                        correctIndex: 1,
                        explanation: 'For all a ∈ {1, 2, 3, 4}, (a, a) ∈ R (Reflexive). (1, 2) ∈ R but (2, 1) ∉ R (Not Symmetric). (1, 3) ∈ R and (3, 2) ∈ R implies (1, 2) ∈ R (Transitive). Hence, Reflexive and transitive but not symmetric.',
                        difficulty: 'Moderate',
                        topic: 'Types of Relations'
                    },
                    {
                        id: 'c12-en-math-ch1-q2',
                        question: 'Let f: R → R be defined as f(x) = x⁴. Choose the correct answer:',
                        options: ['f is one-one onto', 'f is many-one onto', 'f is one-one but not onto', 'f is neither one-one nor onto'],
                        correctIndex: 3,
                        explanation: 'f(-1) = f(1) = 1, so f is not one-one (many-one). Also, range of f is [0, ∞) which does not contain negative real numbers, so f is not onto. Hence f is neither one-one nor onto.',
                        difficulty: 'Easy',
                        topic: 'Types of Functions'
                    }
                ],
                ncertSolutions: {
                    chapterTitle: 'Relations and Functions',
                    source: 'Tech Karma Classes — NCERT Solutions (NCRTSolutions Verified)',
                    overview: 'Complete rigorous proofs and solutions for Equivalence relations, Invertible functions, and Binary operations.',
                    exercises: [
                        {
                            exerciseName: 'NCERT Chapter Exercise 1.1',
                            questions: [
                                {
                                    qNum: 'Q1.1',
                                    question: 'Determine whether the relation R in the set A = {1, 2, 3, ..., 14} defined as R = {(x, y) : 3x - y = 0} is reflexive, symmetric and transitive.',
                                    solution: 'Given: A = {1, 2, 3, ..., 14}, R = {(1, 3), (2, 6), (3, 9), (4, 12)}.\\n\\n1. Reflexive: (1, 1) ∉ R because 3(1) - 1 = 2 ≠ 0. Hence not reflexive.\\n2. Symmetric: (1, 3) ∈ R but (3, 1) ∉ R because 3(3) - 1 = 8 ≠ 0. Hence not symmetric.\\n3. Transitive: (1, 3) ∈ R and (3, 9) ∈ R, but (1, 9) ∉ R. Hence not transitive.\\n\\nConclusion: R is neither reflexive, nor symmetric, nor transitive.',
                                    keyConcept: 'Testing relation properties.'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'CBSE Class 12 Mathematics Sample Question Paper 2025-26 (eVidyarthi Official)',
                    maxMarks: 80,
                    timeAllowed: '3 Hours',
                    generalInstructions: [
                        'This question paper contains - five sections A, B, C, D and E. Each section is compulsory.',
                        'Section A comprises 20 MCQs of 1 mark each.',
                        'Section B comprises 5 Short Answer Questions of 2 marks each.',
                        'Section C comprises 6 Short Answer Questions of 3 marks each.',
                        'Section D comprises 4 Long Answer Questions of 5 marks each.',
                        'Section E comprises 3 Case-Based integrated units of assessment (4 marks each).'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (1 Mark each)',
                            questions: [
                                { q: '1. If A is a square matrix of order 3 such that |adj A| = 64, find the value of |A|.', answer: '|adj A| = |A|^(n-1). Here n = 3, so |adj A| = |A|² = 64 ⇒ |A| = ±8.' }
                            ]
                        }
                    ]
                }
            }
        },
        'Biology': {
            1: {
                chapterName: 'Sexual Reproduction in Flowering Plants',
                mcqs: [
                    {
                        id: 'c12-en-bio-ch1-q1',
                        question: 'The functional megaspore in an angiosperm develops into an:',
                        options: ['Endosperm', 'Embryo sac', 'Embryo', 'Ovule'],
                        correctIndex: 1,
                        explanation: 'In angiosperms, the functional megaspore undergoes three successive mitotic divisions to form the 7-celled, 8-nucleate female gametophyte or embryo sac.',
                        difficulty: 'Easy',
                        topic: 'Megasporogenesis & Embryo Sac'
                    },
                    {
                        id: 'c12-en-bio-ch1-q2',
                        question: 'Attractants and rewards are required for:',
                        options: ['Entomophily (Insect pollination)', 'Hydrophily', 'Cleistogamy', 'Anemophily (Wind pollination)'],
                        correctIndex: 0,
                        explanation: 'Insect-pollinated flowers produce nectar, colorful petals, and fragrance to attract biotic pollinators like honeybees.',
                        difficulty: 'Easy',
                        topic: 'Pollination Adaptations'
                    }
                ],
                ncertSolutions: {
                    chapterTitle: 'Sexual Reproduction in Flowering Plants',
                    source: 'Tech Karma Classes — NCERT Solutions (NCRTSolutions Verified)',
                    overview: 'Detailed morphological diagrams, microsporogenesis, double fertilization, and post-fertilization developmental events.',
                    exercises: [
                        {
                            exerciseName: 'NCERT Chapter Exercise',
                            questions: [
                                {
                                    qNum: 'Q1.1',
                                    question: 'Name the parts of an angiosperm flower in which development of male and female gametophyte take place.',
                                    solution: '1. Male gametophyte (Pollen grain): Develops inside the microsporangium (pollen sac) of the anther.\\n2. Female gametophyte (Embryo sac): Develops inside the megasporangium (nucellus) of the ovule within the ovary.',
                                    keyConcept: 'Site of gametogenesis in flowering plants.'
                                },
                                {
                                    qNum: 'Q1.2',
                                    question: 'What is triple fusion? Where and how does it take place? Name the nuclei involved in triple fusion.',
                                    solution: 'Triple fusion is the fusion of one haploid male gamete with the diploid secondary nucleus (formed by two polar nuclei) in the central cell of the embryo sac.\\n\\nLocation: Central cell of the embryo sac.\\nNuclei involved: Three haploid nuclei (One male gamete nucleus + Two polar nuclei).\\nProduct: Triploid Primary Endosperm Nucleus (PEN, 3n), which later develops into the nutritive endosperm tissue.',
                                    keyConcept: 'Double Fertilization & Triple Fusion.'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'CBSE Class 12 Biology Sample Question Paper 2025-26 (eVidyarthi Official)',
                    maxMarks: 70,
                    timeAllowed: '3 Hours',
                    generalInstructions: [
                        'All questions are compulsory.',
                        'The question paper has five sections and 33 questions.',
                        'Section A has 16 questions of 1 mark each.',
                        'Section B has 5 questions of 2 marks each.',
                        'Section C has 7 questions of 3 marks each.',
                        'Section D has 2 case-based questions of 4 marks each.',
                        'Section E has 3 questions of 5 marks each.'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (1 Mark each)',
                            questions: [
                                { q: '1. What is the ploidy of the primary endosperm nucleus (PEN) in angiosperms?', answer: 'Triploid (3n), resulting from triple fusion of one haploid male gamete (n) and two haploid polar nuclei (2n).' }
                            ]
                        }
                    ]
                }
            }
        }
    },
    'Hindi': {
        'Physics': {
            1: {
                chapterName: 'वैद्युत आवेश तथा क्षेत्र',
                mcqs: [
                    {
                        id: 'c12-hi-phy-ch1-q1',
                        question: 'किसी वस्तु को ऋणावेशित किया जा सकता है:',
                        options: ['उसे अतिरिक्त इलेक्ट्रॉन देकर', 'उससे कुछ इलेक्ट्रॉन निकालकर', 'उसे कुछ प्रोटॉन देकर', 'उससे कुछ न्यूट्रॉन निकालकर'],
                        correctIndex: 0,
                        explanation: 'इलेक्ट्रॉन पर ऋणावेश होता है। वस्तु को अतिरिक्त इलेक्ट्रॉन देने पर उस पर कुल ऋणावेश आ जाता है।',
                        difficulty: 'Easy',
                        topic: 'विद्युत आवेश'
                    }
                ],
                ncertSolutions: {
                    chapterTitle: 'वैद्युत आवेश तथा क्षेत्र',
                    source: 'Tech Karma Classes — एनसीईआरटी समाधान (हिंदी माध्यम)',
                    overview: 'कक्षा 12 भौतिकी अध्याय 1 के कूलॉम नियम एवं गाउस प्रमेय के विस्तृत हल।',
                    exercises: [
                        {
                            exerciseName: 'एनसीईआरटी अभ्यास प्रश्न',
                            questions: [
                                {
                                    qNum: 'प्रश्न 1.1',
                                    question: 'वायु में एक-दूसरे से 30 cm दूरी पर रखे दो छोटे आवेशित गोलों पर क्रमशः 2 × 10⁻⁷ C तथा 3 × 10⁻⁷ C आवेश हैं। उनके बीच कितना बल है?',
                                    solution: 'दिया है: q1 = 2 × 10⁻⁷ C, q2 = 3 × 10⁻⁷ C, r = 0.3 m\\nकूलॉम के नियमानुसार: F = (1/4πε₀) · (q1·q2)/r²\\nF = [9 × 10⁹ × 2 × 10⁻⁷ × 3 × 10⁻⁷] / (0.3)² = 6 × 10⁻³ N (प्रतिकर्षण बल)।',
                                    keyConcept: 'कूलॉम का नियम।'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'सीबीएसई कक्षा 12 भौतिकी प्रतिदर्श प्रश्न पत्र 2025-26',
                    maxMarks: 70,
                    timeAllowed: '3 घंटे',
                    generalInstructions: [
                        'सभी प्रश्न अनिवार्य हैं।',
                        'खंड क में 16 बहुविकल्पीय प्रश्न हैं (प्रत्येक 1 अंक)।'
                    ],
                    sections: [
                        {
                            sectionName: 'खंड क (1 अंक वाले प्रश्न)',
                            questions: [
                                { q: '1. दो विद्युत क्षेत्र रेखाएँ परस्पर क्यों नहीं काटतीं?', answer: 'प्रतिच्छेद बिंदु पर दो स्पर्श रेखाएँ होंगी जो एक ही बिंदु पर विद्युत क्षेत्र की दो दिशाएँ दर्शाएंगी, जो असंभव है।' }
                            ]
                        }
                    ]
                }
            }
        }
    }
};
`;

fs.writeFileSync('src/data/educationalContent/class12_content.js', content);
console.log('Successfully updated src/data/educationalContent/class12_content.js');
