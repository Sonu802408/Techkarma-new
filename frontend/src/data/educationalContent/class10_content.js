// Tech Karma Classes - Class 10 Educational Content
// Strict mapping: Class 10 -> Medium -> Subject -> Chapter -> 7 Content Types

export const class10EducationalData = {
    // English Medium
    'English': {
        'Mathematics': {
            1: {
                chapterName: 'Real Numbers',
                mcqs: [
                    {
                        id: 'c10-en-math-ch1-q1',
                        question: 'The HCF of 96 and 404 is:',
                        options: ['4', '2', '8', '101'],
                        correctIndex: 0,
                        explanation: 'Prime factorisation of 96 = 2⁵ × 3 and 404 = 2² × 101. HCF = 2² = 4.',
                        difficulty: 'Easy',
                        topic: 'Fundamental Theorem of Arithmetic'
                    },
                    {
                        id: 'c10-en-math-ch1-q2',
                        question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
                        options: ['xy', 'xy²', 'x³y³', 'x²y²'],
                        correctIndex: 1,
                        explanation: 'HCF is the product of the smallest power of each common prime factor involved: HCF(a, b) = x¹ × y² = xy².',
                        difficulty: 'Moderate',
                        topic: 'Prime Factorisation & HCF'
                    },
                    {
                        id: 'c10-en-math-ch1-q3',
                        question: 'Which of the following is an irrational number?',
                        options: ['3.1416', '√4', '3 + √5', '22/7'],
                        correctIndex: 2,
                        explanation: 'The sum of a rational number (3) and an irrational number (√5) is always irrational. Hence 3 + √5 is irrational.',
                        difficulty: 'Easy',
                        topic: 'Revisiting Irrational Numbers'
                    },
                    {
                        id: 'c10-en-math-ch1-q4',
                        question: 'If HCF(306, 657) = 9, then LCM(306, 657) is:',
                        options: ['22338', '22383', '23238', '22833'],
                        correctIndex: 0,
                        explanation: 'Formula: LCM(a, b) = (a × b) / HCF(a, b) = (306 × 657) / 9 = 34 × 657 = 22,338.',
                        difficulty: 'Moderate',
                        topic: 'HCF and LCM Relationship'
                    },
                    {
                        id: 'c10-en-math-ch1-q5',
                        question: 'The number (√2 - √3)(√2 + √3) is:',
                        options: ['A rational number', 'An irrational number', 'A prime number', 'An imaginary number'],
                        correctIndex: 0,
                        explanation: 'Using identity (a - b)(a + b) = a² - b²: (√2)² - (√3)² = 2 - 3 = -1, which is an integer and therefore a rational number.',
                        difficulty: 'Conceptual',
                        topic: 'Properties of Real Numbers'
                    }
                ],
                onlineTest: {
                    testId: 'c10-en-math-ch1-test',
                    testTitle: 'Class 10 Mathematics - Real Numbers Chapter Test',
                    totalMarks: 20,
                    durationMinutes: 20,
                    instructions: [
                        'This test consists of 10 chapter-specific questions on Real Numbers.',
                        'Each correct answer carries 2 marks. There is no negative marking.',
                        'Review your answers before the timer expires. Click Submit to view your instant scorecard and detailed solutions.'
                    ],
                    questions: [
                        {
                            id: 'c10-m-t1',
                            question: 'What is the largest number that divides 70 and 125, leaving remainders 5 and 8 respectively?',
                            options: ['13', '65', '875', '1750'],
                            correctIndex: 0,
                            marks: 2,
                            explanation: 'Required number is HCF of (70 - 5) = 65 and (125 - 8) = 117. 65 = 5 × 13, 117 = 3² × 13. HCF = 13.'
                        },
                        {
                            id: 'c10-m-t2',
                            question: 'The decimal expansion of the rational number 14587 / 1250 will terminate after how many decimal places?',
                            options: ['One decimal place', 'Two decimal places', 'Three decimal places', 'Four decimal places'],
                            correctIndex: 3,
                            marks: 2,
                            explanation: 'Denominator 1250 = 2¹ × 5⁴. The highest power of 2 or 5 is 4, so it terminates after 4 decimal places.'
                        },
                        {
                            id: 'c10-m-t3',
                            question: 'If p is a prime number and p divides a², then p must also divide:',
                            options: ['a/2', 'a', '2a', 'a³'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: 'By the Fundamental Theorem of Arithmetic lemma: If p is prime and p divides a², then p divides a.'
                        },
                        {
                            id: 'c10-m-t4',
                            question: 'The product of a non-zero rational and an irrational number is:',
                            options: ['Always rational', 'Always irrational', 'Rational or irrational', 'One'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: 'Let r be non-zero rational and x be irrational. If rx = q (rational), then x = q/r would be rational (contradiction). Hence rx is always irrational.'
                        },
                        {
                            id: 'c10-m-t5',
                            question: 'Express 140 as a product of its prime factors:',
                            options: ['2 × 5 × 7', '2² × 5 × 7', '2³ × 5 × 7', '2² × 5² × 7'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: '140 = 2 × 70 = 2 × 2 × 35 = 2² × 5 × 7.'
                        }
                    ]
                },
                ncertSolutions: {
                    chapterTitle: 'Real Numbers',
                    source: 'Tech Karma Classes — NCERT Solutions',
                    overview: 'Step-by-step verified solutions to key NCERT exercises on the Fundamental Theorem of Arithmetic and Irrational Number Proofs.',
                    exercises: [
                        {
                            exerciseName: 'NCERT Exercise 1.1 — Fundamental Theorem of Arithmetic',
                            questions: [
                                {
                                    qNum: 'Q1',
                                    question: 'Express each number as a product of its prime factors: (i) 140 (ii) 156 (iii) 3825',
                                    solution: 'Step 1: Divide by smallest prime factors repeatedly.\n(i) 140 = 2 × 2 × 5 × 7 = 2² × 5 × 7\n(ii) 156 = 2 × 2 × 3 × 13 = 2² × 3 × 13\n(iii) 3825 = 3 × 3 × 5 × 5 × 17 = 3² × 5² × 17',
                                    keyConcept: 'Every composite number can be uniquely expressed as a product of primes, apart from the order in which the prime factors occur.'
                                },
                                {
                                    qNum: 'Q2',
                                    question: 'Find the LCM and HCF of 26 and 91 and verify that LCM × HCF = product of the two numbers.',
                                    solution: 'Step 1: Prime factorisation:\n26 = 2 × 13\n91 = 7 × 13\n\nStep 2: HCF = 13 (common factor with lowest power)\nLCM = 2 × 7 × 13 = 182\n\nStep 3: Verification:\nLCM × HCF = 182 × 13 = 2366\nProduct of numbers = 26 × 91 = 2366\nSince LHS = RHS = 2366, hence verified.',
                                    keyConcept: 'For any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.'
                                }
                            ]
                        },
                        {
                            exerciseName: 'NCERT Exercise 1.2 — Proof of Irrationality',
                            questions: [
                                {
                                    qNum: 'Q1',
                                    question: 'Prove that √5 is an irrational number.',
                                    solution: 'Proof by Contradiction:\n1. Assume to the contrary that √5 is rational.\n2. Then √5 = a/b, where a and b are co-prime integers and b ≠ 0.\n3. Squaring both sides: 5 = a²/b² ⇒ 5b² = a² ... (Equation 1)\n4. Since 5 divides a², by theorem 5 must also divide a.\n5. Let a = 5c for some integer c. Substituting into Eq 1: 5b² = (5c)² = 25c² ⇒ b² = 5c².\n6. This means 5 divides b², so 5 divides b.\n7. Therefore, 5 is a common factor of both a and b, which contradicts our assumption that a and b are co-prime.\n8. Thus, our assumption is false and √5 is irrational. [Hence Proved]',
                                    keyConcept: 'Proof by contradiction using the lemma: if prime p divides a², then p divides a.'
                                }
                            ]
                        }
                    ]
                },
                subjective: {
                    title: 'Tech Karma Classes Subjective Questions & Model Answers',
                    sections: [
                        {
                            type: 'Very Short Answer (1-2 Marks)',
                            questions: [
                                {
                                    q: 'Explain why 7 × 11 × 13 + 13 is a composite number.',
                                    marks: 2,
                                    modelAnswer: 'Given expression = 13 × (7 × 11 + 1) = 13 × (77 + 1) = 13 × 78 = 13 × 2 × 3 × 13 = 2 × 3 × 13².\nSince this number has prime factors other than 1 and itself (namely 2, 3, and 13), it is a composite number according to the Fundamental Theorem of Arithmetic.'
                                }
                            ]
                        },
                        {
                            type: 'Short Answer (3 Marks)',
                            questions: [
                                {
                                    q: 'Prove that 3 + 2√5 is irrational, given that √5 is irrational.',
                                    marks: 3,
                                    modelAnswer: '1. Let us assume that 3 + 2√5 is rational. Then 3 + 2√5 = a/b where a, b are integers, b ≠ 0, and co-prime.\n2. Rearranging terms: 2√5 = a/b - 3 = (a - 3b)/b\n3. Therefore, √5 = (a - 3b)/(2b).\n4. Since a and b are integers, (a - 3b)/(2b) is a rational number.\n5. This implies √5 is rational, which contradicts the fact that √5 is irrational.\n6. Hence, 3 + 2√5 is irrational.'
                                }
                            ]
                        },
                        {
                            type: 'Long Answer (5 Marks)',
                            questions: [
                                {
                                    q: 'Three bells toll together at intervals of 9, 12, 15 minutes respectively. If they toll together now, after what time will they toll together next? Also find the total times they toll together in 36 hours.',
                                    marks: 5,
                                    modelAnswer: 'Step 1: The time interval after which bells will toll together is the LCM of 9, 12, and 15.\n9 = 3²\n12 = 2² × 3\n15 = 3 × 5\nLCM(9, 12, 15) = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes = 3 hours.\n\nStep 2: The bells will next toll together after 3 hours (180 minutes).\n\nStep 3: In 36 hours, total times they toll together = (36 hours / 3 hours) + 1 (initial toll) = 12 + 1 = 13 times.\nFinal Answer: Next toll after 3 hours; Total 13 times in 36 hours.'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'Tech Karma Classes Sample Paper — Real Numbers Unit Test',
                    maxMarks: 25,
                    timeAllowed: '45 Minutes',
                    generalInstructions: [
                        'Section A: 4 MCQs (1 mark each)',
                        'Section B: 3 Very Short Answer Questions (2 marks each)',
                        'Section C: 3 Short Answer Questions (3 marks each)',
                        'Section D: 1 Case Study / Long Question (6 marks)'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (Objective Type - 1 Mark each)',
                            questions: [
                                { q: '1. The ratio of LCM and HCF of the least composite and the least prime numbers is:', answer: 'Least composite = 4, least prime = 2. HCF(4,2) = 2, LCM(4,2) = 4. Ratio = 4 : 2 = 2 : 1.' },
                                { q: '2. If two positive integers p and q are expressed as p = ab² and q = a³b, where a, b are prime numbers, then LCM(p, q) is:', answer: 'LCM(p, q) = a³b².' }
                            ]
                        },
                        {
                            sectionName: 'Section B (Short Answer - 2 Marks each)',
                            questions: [
                                { q: '3. Check whether 6ⁿ can end with the digit 0 for any natural number n.', answer: 'For 6ⁿ to end with digit 0, its prime factorisation must contain 2 × 5. Prime factorisation of 6ⁿ = (2 × 3)ⁿ = 2ⁿ × 3ⁿ. Since 5 is not in the prime factorisation, by uniqueness of Fundamental Theorem of Arithmetic, 6ⁿ cannot end with digit 0 for any natural number n.' }
                            ]
                        },
                        {
                            sectionName: 'Section C (Short Answer - 3 Marks each)',
                            questions: [
                                { q: '4. Find the HCF and LCM of 12, 15 and 21 using the prime factorisation method.', answer: '12 = 2² × 3, 15 = 3 × 5, 21 = 3 × 7. HCF = 3. LCM = 2² × 3 × 5 × 7 = 420.' }
                            ]
                        }
                    ]
                },
                pyqs: {
                    title: 'Tech Karma Classes — PYQ Practice & Verified Board Questions',
                    questions: [
                        {
                            board: 'CBSE Board Examination',
                            year: '2024 (Standard)',
                            marks: 3,
                            topic: 'Proof of Irrationality',
                            question: 'Prove that 5 + 2√3 is an irrational number, given that √3 is an irrational number.',
                            modelAnswer: 'Let 5 + 2√3 = p/q (rational, q ≠ 0). Then 2√3 = p/q - 5 = (p - 5q)/q ⇒ √3 = (p - 5q)/(2q). Since p and q are integers, (p - 5q)/(2q) is rational, which means √3 is rational. But this contradicts the given fact that √3 is irrational. Hence 5 + 2√3 is irrational. [3 Marks]'
                        },
                        {
                            board: 'CBSE Board Examination',
                            year: '2023 (Set 1)',
                            marks: 2,
                            topic: 'Fundamental Theorem of Arithmetic',
                            question: 'Find the HCF and LCM of 404 and 96 and verify that HCF × LCM = Product of the two given numbers.',
                            modelAnswer: '96 = 2⁵ × 3, 404 = 2² × 101. HCF = 2² = 4. LCM = 2⁵ × 3 × 101 = 9696. HCF × LCM = 4 × 9696 = 38784. Product of numbers = 96 × 404 = 38784. LHS = RHS verified.'
                        },
                        {
                            board: 'CBSE Board Examination',
                            year: '2020 (Standard)',
                            marks: 2,
                            topic: 'Prime Factorisation Application',
                            question: 'The HCF of two numbers is 27 and their LCM is 162. If one of the numbers is 54, find the other number.',
                            modelAnswer: 'Formula: HCF × LCM = Product of two numbers. 27 × 162 = 54 × x ⇒ x = (27 × 162) / 54 = 162 / 2 = 81. Other number is 81.'
                        }
                    ]
                },
                videoLectures: {
                    title: 'Tech Karma Classes Video Lectures',
                    lectures: [
                        {
                            id: 'c10-m-v1',
                            title: 'Real Numbers - Fundamental Theorem of Arithmetic & HCF/LCM Mastery',
                            instructor: 'Tech Karma Mathematics Faculty',
                            duration: '28 mins',
                            embedUrl: 'https://www.youtube-nocookie.com/embed/bL1qQzX3_7A',
                            topicsCovered: ['Prime Factorisation Method', 'LCM and HCF Relationship', 'Word Problems on Bells & Circular Tracks'],
                            keyNotes: 'Remember LCM(a,b) × HCF(a,b) = a × b only holds for 2 numbers, NOT for 3 numbers.'
                        },
                        {
                            id: 'c10-m-v2',
                            title: 'Real Numbers - Proof of Irrationality Made Super Easy (√2, √3, √5)',
                            instructor: 'Tech Karma Mathematics Faculty',
                            duration: '22 mins',
                            embedUrl: 'https://www.youtube-nocookie.com/embed/5a8Rj0G1rJk',
                            topicsCovered: ['Step-by-step Contradiction Method', 'Exam Presentation Tips for 3-mark Board Questions'],
                            keyNotes: 'Always define co-prime integers clearly in Step 1 to secure full marks from the board examiner.'
                        }
                    ]
                }
            }
        },
        'Science': {
            1: {
                chapterName: 'Chemical Reactions and Equations',
                mcqs: [
                    {
                        id: 'c10-en-sci-ch1-q1',
                        question: 'Which of the following is a balanced chemical equation for the reaction of iron with steam?',
                        options: [
                            'Fe + H2O → Fe3O4 + H2',
                            '3Fe + 4H2O → Fe3O4 + 4H2',
                            '3Fe + H2O → Fe3O4 + H2',
                            '3Fe + 4H2O → Fe2O3 + 4H2'
                        ],
                        correctIndex: 1,
                        explanation: '3Fe + 4H2O(g) → Fe3O4(s) + 4H2(g) is balanced on both sides: 3 Fe, 8 H, and 4 O atoms.',
                        difficulty: 'Moderate',
                        topic: 'Balancing Chemical Equations'
                    },
                    {
                        id: 'c10-en-sci-ch1-q2',
                        question: 'When aqueous solutions of lead nitrate and potassium iodide are mixed, a precipitate is formed. What is the colour of this precipitate?',
                        options: ['White', 'Yellow', 'Black', 'Blue'],
                        correctIndex: 1,
                        explanation: 'Pb(NO3)2 + 2KI → PbI2 (Yellow precipitate) + 2KNO3. Lead iodide is yellow in colour.',
                        difficulty: 'Easy',
                        topic: 'Precipitation Reaction'
                    },
                    {
                        id: 'c10-en-sci-ch1-q3',
                        question: 'The reaction: CaO + H2O → Ca(OH)2 + Heat is an example of:',
                        options: [
                            'Combination reaction and Exothermic reaction',
                            'Decomposition reaction and Endothermic reaction',
                            'Displacement reaction and Exothermic reaction',
                            'Neutralisation reaction and Endothermic reaction'
                        ],
                        correctIndex: 0,
                        explanation: 'Two substances combine to form a single product (combination), and heat is released (exothermic).',
                        difficulty: 'Easy',
                        topic: 'Combination and Exothermic Reactions'
                    },
                    {
                        id: 'c10-en-sci-ch1-q4',
                        question: 'In the reaction: CuO + H2 → Cu + H2O, which substance is oxidised and which is reduced?',
                        options: [
                            'H2 is oxidised and CuO is reduced',
                            'CuO is oxidised and H2 is reduced',
                            'Cu is oxidised and H2O is reduced',
                            'Both CuO and H2 are oxidised'
                        ],
                        correctIndex: 0,
                        explanation: 'H2 gains oxygen to form H2O (oxidation). CuO loses oxygen to form Cu (reduction).',
                        difficulty: 'Moderate',
                        topic: 'Redox Reactions'
                    },
                    {
                        id: 'c10-en-sci-ch1-q5',
                        question: 'Substance X is used in white-washing and is obtained by heating limestone. The substance X is:',
                        options: ['CaCO3', 'CaO', 'Ca(OH)2', 'CaCl2'],
                        correctIndex: 1,
                        explanation: 'Heating limestone (CaCO3) gives quicklime (CaO), which reacts with water to form slaked lime Ca(OH)2 used for white-washing.',
                        difficulty: 'Conceptual',
                        topic: 'Thermal Decomposition'
                    }
                ],
                onlineTest: {
                    testId: 'c10-en-sci-ch1-test',
                    testTitle: 'Class 10 Science - Chemical Reactions and Equations Test',
                    totalMarks: 20,
                    durationMinutes: 20,
                    instructions: [
                        'This test contains 10 chapter-specific questions on Chemical Reactions and Equations.',
                        'Each question carries 2 marks.',
                        'Click Submit when you finish to see your detailed performance report and explanations.'
                    ],
                    questions: [
                        {
                            id: 'c10-s-t1',
                            question: 'Which gas is evolved when zinc granules react with dilute sulphuric acid?',
                            options: ['Oxygen', 'Hydrogen', 'Sulphur dioxide', 'Nitrogen'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: 'Zn(s) + H2SO4(aq) → ZnSO4(aq) + H2(g). Hydrogen gas burns with a characteristic pop sound.'
                        },
                        {
                            id: 'c10-s-t2',
                            question: 'What happens when silver chloride is exposed to sunlight for a long time?',
                            options: [
                                'Formation of silver by decomposition of silver chloride',
                                'Sublimation of silver chloride',
                                'Decomposition of chlorine gas from silver chloride',
                                'Oxidation of silver chloride'
                            ],
                            correctIndex: 0,
                            marks: 2,
                            explanation: '2AgCl(s) (white) + Sunlight → 2Ag(s) (grey) + Cl2(g). This is a photolytic decomposition reaction used in black and white photography.'
                        },
                        {
                            id: 'c10-s-t3',
                            question: 'Fatty foods become rancid and develop bad taste due to:',
                            options: ['Oxidation', 'Reduction', 'Hydrogenation', 'Corrosion'],
                            correctIndex: 0,
                            marks: 2,
                            explanation: 'Rancidity is caused by the oxidation of fats and oils present in food when exposed to air and moisture.'
                        },
                        {
                            id: 'c10-s-t4',
                            question: 'Respiration is an exothermic reaction because:',
                            options: [
                                'Energy is absorbed during breaking of glucose',
                                'Energy is released during oxidation of glucose',
                                'Water is decomposed',
                                'Carbon dioxide is absorbed'
                            ],
                            correctIndex: 1,
                            marks: 2,
                            explanation: 'During respiration, glucose combines with oxygen in the cells of our body and releases energy: C6H12O6 + 6O2 → 6CO2 + 6H2O + Energy.'
                        },
                        {
                            id: 'c10-s-t5',
                            question: 'When ferrous sulphate crystals (FeSO4·7H2O) are heated in a dry test tube, the colour changes from:',
                            options: ['Green to brown', 'Blue to green', 'White to yellow', 'Brown to white'],
                            correctIndex: 0,
                            marks: 2,
                            explanation: 'Green ferrous sulphate crystals lose water of crystallisation and decompose into brown ferric oxide (Fe2O3), SO2, and SO3 gases.'
                        }
                    ]
                },
                ncertSolutions: {
                    chapterTitle: 'Chemical Reactions and Equations',
                    source: 'Tech Karma Classes — NCERT Solutions',
                    overview: 'Step-by-step verified solutions to key NCERT questions with balanced equations and reaction mechanisms.',
                    exercises: [
                        {
                            exerciseName: 'NCERT In-Text & Exercise Questions',
                            questions: [
                                {
                                    qNum: 'Q1',
                                    question: 'Why should a magnesium ribbon be cleaned before burning in air?',
                                    solution: 'Magnesium is a reactive metal. When exposed to air, it reacts with oxygen to form a protective layer of basic magnesium oxide (MgO) on its surface. This layer prevents further reaction with oxygen. Therefore, it is cleaned with sandpaper to remove this oxide layer so that it can burn smoothly with a dazzling white flame.',
                                    keyConcept: 'Metal oxidation and surface reactivity.'
                                },
                                {
                                    qNum: 'Q2',
                                    question: 'Write a balanced chemical equation for: (i) Hydrogen + Chlorine → Hydrogen chloride (ii) Barium chloride + Aluminium sulphate → Barium sulphate + Aluminium chloride',
                                    solution: '(i) H2(g) + Cl2(g) → 2HCl(g)\n(ii) 3BaCl2(aq) + Al2(SO4)3(aq) → 3BaSO4(s) (white ppt) + 2AlCl3(aq)',
                                    keyConcept: 'Law of conservation of mass in chemical balancing.'
                                }
                            ]
                        }
                    ]
                },
                subjective: {
                    title: 'Tech Karma Classes Subjective Questions & Model Answers',
                    sections: [
                        {
                            type: 'Very Short Answer (1-2 Marks)',
                            questions: [
                                {
                                    q: 'Define a precipitation reaction with a suitable chemical equation.',
                                    marks: 2,
                                    modelAnswer: 'A reaction in which an insoluble solid (called a precipitate) is formed by mixing two aqueous solutions is called a precipitation reaction.\nEquation: Na2SO4(aq) + BaCl2(aq) → BaSO4(s) [White ppt] + 2NaCl(aq).'
                                }
                            ]
                        },
                        {
                            type: 'Short Answer (3 Marks)',
                            questions: [
                                {
                                    q: 'Explain the terms (i) Corrosion (ii) Rancidity with one preventive measure for each.',
                                    marks: 3,
                                    modelAnswer: '(i) Corrosion: The gradual eating away of metals by the action of air, moisture, or chemicals on their surface (e.g. rusting of iron: Fe2O3·xH2O). Prevention: Galvanisation (coating with zinc) or painting.\n(ii) Rancidity: The condition produced by aerial oxidation of fats and oils in foods marked by unpleasant smell and taste. Prevention: Flushing food packets with nitrogen gas or adding antioxidants like BHA.'
                                }
                            ]
                        },
                        {
                            type: 'Long Answer (5 Marks)',
                            questions: [
                                {
                                    q: 'Classify the following reactions into Combination, Decomposition, Displacement, or Double Displacement and write their balanced chemical equations:\n(a) Heating of lead nitrate powder\n(b) Adding iron nails to copper sulphate solution\n(c) Burning of natural gas\n(d) Mixing silver nitrate and sodium chloride solutions',
                                    marks: 5,
                                    modelAnswer: '(a) Thermal Decomposition: 2Pb(NO3)2(s) → 2PbO(s) [yellow] + 4NO2(g) [brown fumes] + O2(g)\n(b) Displacement Reaction: Fe(s) + CuSO4(aq) [blue] → FeSO4(aq) [light green] + Cu(s) [reddish brown]\n(c) Exothermic Combination / Combustion: CH4(g) + 2O2(g) → CO2(g) + 2H2O(g) + Heat\n(d) Double Displacement & Precipitation: AgNO3(aq) + NaCl(aq) → AgCl(s) [white ppt] + NaNO3(aq)'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'Tech Karma Classes Sample Paper — Chemical Reactions & Equations',
                    maxMarks: 25,
                    timeAllowed: '45 Minutes',
                    generalInstructions: [
                        'Section A contains 4 Multiple Choice Questions (1 mark each).',
                        'Section B contains 3 Short Answer Questions (2 marks each).',
                        'Section C contains 3 Short Answer Questions (3 marks each).',
                        'Section D contains 1 Long Answer / Case-Based Question (6 marks).'
                    ],
                    sections: [
                        {
                            sectionName: 'Section A (1 Mark each)',
                            questions: [
                                { q: '1. What type of reaction takes place during digestion of food in our body?', answer: 'Decomposition reaction (Complex molecules like starch and proteins break down into simpler substances like glucose and amino acids).' }
                            ]
                        },
                        {
                            sectionName: 'Section B (2 Marks each)',
                            questions: [
                                { q: '2. Why do we apply paint on iron articles?', answer: 'Paint prevents the surface of iron from coming in direct contact with atmospheric oxygen and moisture, thereby preventing rust/corrosion.' }
                            ]
                        }
                    ]
                },
                pyqs: {
                    title: 'Tech Karma Classes — PYQ Practice & Verified Board Questions',
                    questions: [
                        {
                            board: 'CBSE Board Examination',
                            year: '2023',
                            marks: 3,
                            topic: 'Thermal Decomposition & Gas Identification',
                            question: '2g of ferrous sulphate crystals are heated in a dry boiling tube. (a) List two observations. (b) Name the gases evolved. (c) Write balanced chemical equation.',
                            modelAnswer: '(a) Observations: (i) Green colour of crystals changes to brown/reddish-brown. (ii) Characteristic choking smell of burning sulphur is observed.\n(b) Gases evolved: Sulphur dioxide (SO2) and Sulphur trioxide (SO3).\n(c) Equation: 2FeSO4(s) + Heat → Fe2O3(s) + SO2(g) + SO3(g).'
                        },
                        {
                            board: 'CBSE Board Examination',
                            year: '2022',
                            marks: 2,
                            topic: 'Displacement Reaction',
                            question: 'A copper plate was dipped into a solution of silver nitrate for some time. What changes will take place in the solution and on the copper plate?',
                            modelAnswer: 'Copper is more reactive than silver. It displaces silver from silver nitrate solution: Cu(s) + 2AgNO3(aq) → Cu(NO3)2(aq) [blue solution] + 2Ag(s) [shining silver coating on copper plate]. The colourless solution turns blue.'
                        }
                    ]
                },
                videoLectures: {
                    title: 'Tech Karma Classes Video Lectures',
                    lectures: [
                        {
                            id: 'c10-s-v1',
                            title: 'Chemical Reactions & Equations - Types of Reactions & Balancing Tricks',
                            instructor: 'Tech Karma Science Faculty',
                            duration: '32 mins',
                            embedUrl: 'https://www.youtube-nocookie.com/embed/6e8W3qL1zXo',
                            topicsCovered: ['Balancing with Algebraic & Hit-and-Trial Method', 'Combination vs Decomposition', 'Real Board Exam Questions'],
                            keyNotes: 'Always include state symbols (s, l, g, aq) in board examination answers for complete marks.'
                        }
                    ]
                }
            }
        }
    },

    // Hindi Medium
    'Hindi': {
        'Mathematics': {
            1: {
                chapterName: 'वास्तविक संख्याएँ',
                mcqs: [
                    {
                        id: 'c10-hi-math-ch1-q1',
                        question: '96 और 404 का HCF (म.स.) क्या होगा?',
                        options: ['4', '2', '8', '101'],
                        correctIndex: 0,
                        explanation: 'अभाज्य गुणनखंड: 96 = 2⁵ × 3 तथा 404 = 2² × 101। म.स. (HCF) = 2² = 4।',
                        difficulty: 'Easy',
                        topic: 'अंकगणित की आधारभूत प्रमेय'
                    },
                    {
                        id: 'c10-hi-math-ch1-q2',
                        question: 'निम्नलिखित में से कौन-सी एक अपरिमेय संख्या है?',
                        options: ['3.1416', '√4', '3 + √5', '22/7'],
                        correctIndex: 2,
                        explanation: 'एक परिमेय संख्या (3) और एक अपरिमेय संख्या (√5) का योग सदैव अपरिमेय होता है। अतः 3 + √5 एक अपरिमेय संख्या है।',
                        difficulty: 'Easy',
                        topic: 'अपरिमेय संख्याओं का पुनर्भ्रमण'
                    },
                    {
                        id: 'c10-hi-math-ch1-q3',
                        question: 'यदि HCF(306, 657) = 9 है, तो LCM(306, 657) का मान होगा:',
                        options: ['22338', '22383', '23238', '22833'],
                        correctIndex: 0,
                        explanation: 'सूत्र: LCM = (a × b) / HCF = (306 × 657) / 9 = 34 × 657 = 22,338।',
                        difficulty: 'Moderate',
                        topic: 'HCF तथा LCM संबंध'
                    }
                ],
                onlineTest: {
                    testId: 'c10-hi-math-ch1-test',
                    testTitle: 'कक्षा 10 गणित - वास्तविक संख्याएँ ऑनलाइन टेस्ट',
                    totalMarks: 20,
                    durationMinutes: 20,
                    instructions: [
                        'इस टेस्ट में वास्तविक संख्याएँ अध्याय के 10 प्रश्न हैं।',
                        'प्रत्येक प्रश्न 2 अंक का है। कोई नकारात्मक अंकन नहीं है।',
                        'सबमिट करने के बाद आपको स्कोरकार्ड और विस्तृत हल प्राप्त होगा।'
                    ],
                    questions: [
                        {
                            id: 'c10-hm-t1',
                            question: 'संख्या 140 को अभाज्य गुणनखंडों के गुणनफल के रूप में व्यक्त कीजिए:',
                            options: ['2 × 5 × 7', '2² × 5 × 7', '2³ × 5 × 7', '2² × 5² × 7'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: '140 = 2 × 2 × 5 × 7 = 2² × 5 × 7।'
                        },
                        {
                            id: 'c10-hm-t2',
                            question: 'एक शून्येतर परिमेय संख्या और एक अपरिमेय संख्या का गुणनफल सदैव होता है:',
                            options: ['सदैव परिमेय', 'सदैव अपरिमेय', 'परिमेय या अपरिमेय', 'एक'],
                            correctIndex: 1,
                            marks: 2,
                            explanation: 'शून्येतर परिमेय और अपरिमेय संख्या का गुणनफल सदैव अपरिमेय होता है।'
                        }
                    ]
                },
                ncertSolutions: {
                    chapterTitle: 'वास्तविक संख्याएँ',
                    source: 'Tech Karma Classes — NCERT Solutions (हिंदी माध्यम)',
                    overview: 'कक्षा 10 गणित अध्याय 1 के एनसीईआरटी प्रश्नों का चरणबद्ध एवं प्रामाणिक हल।',
                    exercises: [
                        {
                            exerciseName: 'एनसीईआरटी प्रश्नावली 1.1',
                            questions: [
                                {
                                    qNum: 'प्रश्न 1',
                                    question: 'सिद्ध कीजिए कि √5 एक अपरिमेय संख्या है।',
                                    solution: 'विरोधाभास विधि দ্বারা हल:\n1. माना कि √5 एक परिमेय संख्या है।\n2. अतः √5 = a/b, जहाँ a और b सह-अभाज्य पूर्णांक हैं तथा b ≠ 0।\n3. दोनों पक्षों का वर्ग करने पर: 5 = a²/b² ⇒ 5b² = a² ... (समीकरण 1)\n4. यहाँ 5, a² को विभाजित करता है, अतः प्रमेय द्वारा 5, a को भी विभाजित करेगा।\n5. माना a = 5c। मान रखने पर: 5b² = (5c)² = 25c² ⇒ b² = 5c²।\n6. अतः 5, b² को विभाजित करता है, जिससे 5, b को भी विभाजित करेगा।\n7. इस प्रकार a और b का एक उभयनिष्ठ गुणनखंड 5 है, जो कि हमारी इस मान्यता का विरोध करता है कि a और b सह-अभाज्य हैं।\n8. अतः √5 एक अपरिमेय संख्या है। [इति सिद्धम्]',
                                    keyConcept: 'विरोधाभास द्वारा उपपत्ति तथा अभाज्य संख्या की विभाज्यता प्रमेय।'
                                }
                            ]
                        }
                    ]
                },
                subjective: {
                    title: 'Tech Karma Classes वर्णनात्मक प्रश्न एवं आदर्श उत्तर',
                    sections: [
                        {
                            type: 'लघु उत्तरीय प्रश्न (3 अंक)',
                            questions: [
                                {
                                    q: 'सिद्ध कीजिए कि 3 + 2√5 एक अपरिमेय संख्या है, यदि √5 अपरिमेय है।',
                                    marks: 3,
                                    modelAnswer: 'माना 3 + 2√5 एक परिमेय संख्या a/b है (b ≠ 0, a, b पूर्णांक हैं)।\n2√5 = a/b - 3 = (a - 3b)/b\n√5 = (a - 3b)/(2b)\nचूँकि a और b पूर्णांक हैं, अतः (a - 3b)/(2b) एक परिमेय संख्या है। इससे सिद्ध होता है कि √5 भी परिमेय संख्या होगी, जो कि दिए गए तथ्य का विरोधाभास है।\nअतः 3 + 2√5 एक अपरिमेय संख्या है।'
                                }
                            ]
                        }
                    ]
                },
                samplePapers: {
                    paperTitle: 'Tech Karma Classes प्रतिदर्श प्रश्न पत्र — वास्तविक संख्याएँ',
                    maxMarks: 25,
                    timeAllowed: '45 मिनट',
                    generalInstructions: [
                        'खंड क में 4 बहुविकल्पीय प्रश्न हैं (प्रत्येक 1 अंक)।',
                        'खंड ख में 3 अति लघु उत्तरीय प्रश्न हैं (प्रत्येक 2 अंक)।',
                        'खंड ग में 3 लघु उत्तरीय प्रश्न हैं (प्रत्येक 3 अंक)।'
                    ],
                    sections: [
                        {
                            sectionName: 'खंड क (1 अंक वाले प्रश्न)',
                            questions: [
                                { q: '1. सबसे छोटी अभाज्य और सबसे छोटी भाज्य संख्या का HCF क्या है?', answer: 'सबसे छोटी अभाज्य = 2, सबसे छोटी भाज्य = 4। HCF(2, 4) = 2।' }
                            ]
                        }
                    ]
                },
                pyqs: {
                    title: 'Tech Karma Classes — विगत वर्षों के बोर्ड प्रश्न (PYQ Practice)',
                    questions: [
                        {
                            board: 'सीबीएसई बोर्ड परीक्षा',
                            year: '2023',
                            marks: 3,
                            topic: 'अपरिमेय संख्या उपपत्ति',
                            question: 'सिद्ध कीजिए कि √3 एक अपरिमेय संख्या है।',
                            modelAnswer: 'विरोधाभास विधि द्वारा a² = 3b² स्थापित करके उभयनिष्ठ गुणनखंड 3 दिखाकर विरोधाभास प्राप्त करते हैं। अतः √3 अपरिमेय है।'
                        }
                    ]
                },
                videoLectures: {
                    title: 'Tech Karma Classes वीडियो व्याख्यान',
                    lectures: [
                        {
                            id: 'c10-hm-v1',
                            title: 'वास्तविक संख्याएँ - अंकगणित की आधारभूत प्रमेय एवं HCF/LCM ट्रिक',
                            instructor: 'Tech Karma फैकल्टी',
                            duration: '30 मिनट',
                            embedUrl: 'https://www.youtube-nocookie.com/embed/bL1qQzX3_7A',
                            topicsCovered: ['अभाज्य गुणनखंड विधि', 'अपरिमेय संख्याओं का सत्यापन', 'बोर्ड परीक्षा के महत्वपूर्ण प्रश्न'],
                            keyNotes: 'बोर्ड परीक्षा में सह-अभाज्य पूर्णांक की परिभाषा लिखना अनिवार्य है।'
                        }
                    ]
                }
            }
        }
    }
};
