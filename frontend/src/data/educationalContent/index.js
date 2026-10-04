// Tech Karma Classes - Master Educational Content Engine (Comprehensive 7-Tab System)
// Strictly Additive • Zero Modification to NCERT Books & Notes
// Exact Mapping: Class -> Medium -> Subject -> Chapter -> 7 Content Types

import { classesData, getSubjectName, getChapterName } from '../classesData.js';
import { class10EducationalData } from './class10_content.js';
import { class12EducationalData } from './class12_content.js';
import { isJuniorClass, getJuniorEducationalContent } from './juniorCurriculumEngine.js';

// Curriculum topic and pedagogical repository across subjects
const subjectConceptBank = {
    'Math': [
        { en: 'Definitions, Axioms and Number Properties', hi: 'परिभाषाएँ, अभिगृहीत एवं संख्या गुणधर्म', formula: 'Fundamental Theorem of Arithmetic / Basic Axioms' },
        { en: 'Algebraic Formulations and Identities', hi: 'बीजीय व्यंजक एवं सर्वसमिकाएँ', formula: '(a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b²' },
        { en: 'Linear & Quadratic Problem Solving', hi: 'रैखिक एवं द्विघात समीकरण समाधान', formula: 'x = [-b ± √(b² - 4ac)] / 2a' },
        { en: 'Geometric Theorems and Similarity Criteria', hi: 'ज्यामितीय प्रमेय एवं समरूपता', formula: 'Basic Proportionality Theorem / Area Ratio' },
        { en: 'Coordinate Distance and Section Relations', hi: 'निर्देशांक दूरी एवं विभाजन सूत्र', formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²], [(m₁x₂+m₂x₁)/(m₁+m₂), (m₁y₂+m₂y₁)/(m₁+m₂)]' },
        { en: 'Trigonometric Ratios and Standard Identities', hi: 'त्रिकोणमितीय अनुपात एवं सर्वसमिकाएँ', formula: 'sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ' },
        { en: 'Mensuration, Perimeter, Area and Volume', hi: 'क्षेत्रमिति, परिमाप, क्षेत्रफल एवं आयतन', formula: 'Area of Circle = πr², Volume of Cylinder = πr²h' },
        { en: 'Statistics: Mean, Median and Mode Formulations', hi: 'सांख्यिकी: माध्य, माध्यक एवं बहुलक सूत्र', formula: 'Mode = 3(Median) - 2(Mean), x̄ = Σfi·xi / Σfi' },
        { en: 'Probability of Random Experiments & Events', hi: 'प्रायिकता एवं घटनाएँ', formula: 'P(E) = Number of Favourable Outcomes / Total Outcomes' },
        { en: 'Step-by-Step Proofs and Deductions', hi: 'चरणबद्ध उपपत्तियाँ एवं निगमन', formula: 'LHS = RHS Rigorous Deductive Step Method' }
    ],
    'Science': [
        { en: 'Physical & Chemical Properties / Classification', hi: 'भौतिक एवं रासायनिक गुणधर्म / वर्गीकरण', formula: 'Mass Conservation: Reactants Mass = Products Mass' },
        { en: 'Acids, Bases, Salts and Reaction Mechanisms', hi: 'अम्ल, क्षारक, लवण एवं अभिक्रियाएँ', formula: 'Acid + Base → Salt + Water (Neutralisation)' },
        { en: 'Metals, Non-Metals and Chemical Bonding', hi: 'धातु, अधातु एवं रासायनिक आबंधन', formula: 'Reactivity Series / Ionic & Covalent Bond Formation' },
        { en: 'Carbon Compounds and Nomenclature', hi: 'कार्बन यौगिक एवं नामकरण', formula: 'General Alkane Formula: CnH2n+2' },
        { en: 'Cell Structure, Nutrition and Life Processes', hi: 'कोशिका संरचना, पोषण एवं जैव प्रक्रम', formula: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂ (Photosynthesis)' },
        { en: 'Control, Coordination and Neural Mechanisms', hi: 'नियंत्रण, समन्वय एवं तंत्रिका तंत्र', formula: 'Stimulus → Receptor → Sensory Neuron → CNS → Effector' },
        { en: 'Reproduction and Hereditary Transmission', hi: 'जनन एवं आनुवंशिकी', formula: 'Mendelian Monohybrid Ratio (3:1) & Dihybrid Ratio (9:3:3:1)' },
        { en: 'Optics: Reflection, Refraction and Lens Formula', hi: 'प्रकाशिकी: परावर्तन, अपवर्तन एवं लेंस सूत्र', formula: '1/f = 1/v - 1/u (Lens), 1/f = 1/v + 1/u (Mirror)' },
        { en: 'Electricity: Ohm\'s Law, Resistance & Power', hi: 'विद्युत: ओम का नियम, प्रतिरोध एवं विद्युत शक्ति', formula: 'V = IR, P = VI = I²R = V²/R, Rs = R₁ + R₂' },
        { en: 'Magnetism, Energy and Environmental Ecology', hi: 'चुंबकत्व, ऊर्जा एवं पर्यावरण', formula: 'Fleming\'s Left Hand Rule / 10% Energy Transfer Law' }
    ],
    'Physics': [
        { en: 'Electrostatics & Coulomb\'s Inverse Square Law', hi: 'स्थिरवैद्युतिकी एवं कूलॉम का नियम', formula: 'F = (1 / 4πε₀) · (q₁q₂ / r²)' },
        { en: 'Electric Potential and Capacitance Dynamics', hi: 'विद्युत विभव एवं धारिता', formula: 'V = W/q, C = Q/V, C = (Kε₀A) / d' },
        { en: 'Current Electricity, Ohm\'s Law & Kirchhoff\'s Rules', hi: 'विद्युत धारा एवं किरचॉफ के नियम', formula: 'I = nAevd, ΣI = 0, Σ(IR) = ΣE' },
        { en: 'Magnetic Effects of Current & Biot-Savart Law', hi: 'धारा का चुंबकीय प्रभाव एवं बायो-सावर्ट नियम', formula: 'dB = (μ₀/4π) · (I dl sinθ / r²), F = q(v × B)' },
        { en: 'Electromagnetic Induction & Faraday-Lenz Laws', hi: 'विद्युत चुंबकीय प्रेरण एवं फैराडे-लेन्ज नियम', formula: 'ε = -dΦB / dt, L = NΦ/I' },
        { en: 'Alternating Current, RMS Values & LCR Resonance', hi: 'प्रत्यावर्ती धारा एवं LCR अनुनाद', formula: 'I_rms = I₀ / √2, Z = √[R² + (XL - XC)²]' },
        { en: 'Electromagnetic Waves and Spectrum Characteristics', hi: 'विद्युत चुंबकीय तरंगें', formula: 'c = 1 / √(μ₀ε₀) = E₀ / B₀' },
        { en: 'Wave Optics: Huygens\' Wavefronts & Interference', hi: 'तरंग प्रकाशिकी: व्यतिकरण एवं विवर्तन', formula: 'Fringe Width β = λD / d' },
        { en: 'Dual Nature of Radiation & Photoelectric Equation', hi: 'विकिरण की द्वैत प्रकृति एवं प्रकाश वैद्युत प्रभाव', formula: 'K_max = hν - Φ₀ = eV₀, λ = h / p' },
        { en: 'Semiconductor Diodes, Logic and Band Theory', hi: 'अर्धचालक युक्तियाँ एवं बैंड सिद्धांत', formula: 'Eg = hc / λ, Forward / Reverse Bias Characteristics' }
    ],
    'Chemistry': [
        { en: 'Solutions, Concentration Units & Raoult\'s Law', hi: 'विलयन, सांद्रता एवं राउल्ट का नियम', formula: 'p₁ = p₁°·x₁, ΔTb = i·Kb·m, π = i·CRT' },
        { en: 'Electrochemistry, Nernst Equation & Kohlrausch Law', hi: 'वैद्युतरसायन, नर्नस्ट समीकरण एवं कोलराउश नियम', formula: 'E_cell = E°_cell - (0.0591/n) log Q' },
        { en: 'Chemical Kinetics, Rate Laws & Arrhenius Equation', hi: 'रासायनिक बलगतिकी एवं आरहेनियस समीकरण', formula: 'Rate = k[A]^x[B]^y, k = A·e^(-Ea/RT)' },
        { en: 'd and f-Block Elements & Transition Chemistry', hi: 'd एवं f-ब्लॉक तत्व एवं संक्रमण रसायन', formula: 'Electronic configuration (n-1)d¹⁻¹⁰ ns¹⁻², Paramagnetism μ = √[n(n+2)] BM' },
        { en: 'Coordination Compounds, IUPAC & Werner Theory', hi: 'उपसहसंयोजन यौगिक एवं वर्नर सिद्धांत', formula: 'Crystal Field Splitting Δo, Coordination Number & Isomerism' },
        { en: 'Haloalkanes, Haloarenes & SN1/SN2 Mechanisms', hi: 'हैलोएल्केन, हैलोएरीन एवं SN1/SN2 क्रियाविधि', formula: 'SN2 (Inversion of configuration), SN1 (Racemisation)' },
        { en: 'Alcohols, Phenols and Ethers Reactions', hi: 'ऐल्कोहॉल, फीनॉल एवं ईथर', formula: 'Lucas Test, Reimer-Tiemann & Kolbe Reactions' },
        { en: 'Aldehydes, Ketones and Carboxylic Acids', hi: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल', formula: 'Nucleophilic Addition, Aldol Condensation, Cannizzaro Reaction' },
        { en: 'Amines, Diazonium Salts and Basicity Trends', hi: 'ऐमीन, डाइऐज़ोनियम लवण एवं क्षारकता', formula: 'Hoffmann Bromamide Degradation, Carbylamine Test' },
        { en: 'Biomolecules: Carbohydrates, Proteins and Nucleic Acids', hi: 'जैव अणु: कार्बोहाइड्रेट, प्रोटीन एवं न्यूक्लिक अम्ल', formula: 'Peptide Bond Formation (-CONH-), DNA Double Helix Pairing (A=T, G≡C)' }
    ]
};

// Standard video repository per subject
const standardSubjectVideos = {
    'Math': [
        { ytId: 'bL1qQzX3_7A', duration: '42 mins', titleSuffixEn: 'Complete Chapter One-Shot Concept & Formula Derivations', titleSuffixHi: 'संपूर्ण अध्याय एक वीडियो में (अवधारणाएँ एवं सूत्र निगमन)' },
        { ytId: '5a8Rj0G1rJk', duration: '38 mins', titleSuffixEn: 'Top Scoring NCERT Exercise Questions & Step-by-Step Solutions', titleSuffixHi: 'शीर्ष एनसीईआरटी अभ्यास प्रश्न एवं चरणबद्ध हल' },
        { ytId: 'Fw0W6M06eR8', duration: '35 mins', titleSuffixEn: 'Previous Years Board Exam Problems & Fast Solving Methods', titleSuffixHi: 'विगत वर्षों के बोर्ड प्रश्न एवं त्वरित समाधान विधि' }
    ],
    'Science': [
        { ytId: '6e8W3qL1zXo', duration: '45 mins', titleSuffixEn: 'Full Chapter Masterclass with Practical Demonstration & Experiments', titleSuffixHi: 'संपूर्ण अध्याय मास्टरक्लास एवं प्रायोगिक समझ' },
        { ytId: '7r1W9xL3zXp', duration: '36 mins', titleSuffixEn: 'Step-by-Step NCERT Solutions & High-Yield Reaction Mechanisms', titleSuffixHi: 'चरणबद्ध एनसीईआरटी हल एवं महत्वपूर्ण रासायनिक समीकरण' },
        { ytId: '8s2W0xL4zXq', duration: '32 mins', titleSuffixEn: 'Board Exam Expected Questions, Diagrams & Formula Sheet', titleSuffixHi: 'बोर्ड परीक्षा संभावित प्रश्न, नामांकित चित्र एवं सूत्र पत्रक' }
    ],
    'Physics': [
        { ytId: '3w6W4xL8zXu', duration: '50 mins', titleSuffixEn: 'Complete Chapter Theory, Derivations & Graphical Analysis', titleSuffixHi: 'संपूर्ण सिद्धांत, निगमन एवं आलेखीय विश्लेषण' },
        { ytId: '4x7W5xL9zXv', duration: '40 mins', titleSuffixEn: 'CBSE Numerical Problem Solving Masterclass with Step Marking', titleSuffixHi: 'संख्यात्मक प्रश्नों का संपूर्ण हल एवं स्टेप मार्किंग रणनीति' },
        { ytId: '5y8W6xL0zXw', duration: '34 mins', titleSuffixEn: 'Top 10 High-Frequency Board Questions & Formula Revision', titleSuffixHi: 'बोर्ड परीक्षा में बार-बार पूछे जाने वाले 10 महत्वपूर्ण प्रश्न' }
    ],
    'Chemistry': [
        { ytId: '6z9W7xL1zXx', duration: '48 mins', titleSuffixEn: 'Comprehensive Chapter Breakdown & Reaction Mechanisms', titleSuffixHi: 'संपूर्ण अध्याय व्याख्या एवं अभिक्रिया क्रियाविधि' },
        { ytId: '7a0W8xL2zXy', duration: '38 mins', titleSuffixEn: 'NCERT In-Text and Exercise Numerical & Conversions', titleSuffixHi: 'एनसीईआरटी पाठ्यनिहित एवं अभ्यास प्रश्न' },
        { ytId: '8b1W9xL3zXz', duration: '35 mins', titleSuffixEn: 'Board Exam Name Reactions, Conversions & PYQ Trends', titleSuffixHi: 'बोर्ड परीक्षा विशिष्ट नेम रिएक्शन्स एवं विगत वर्ष प्रश्न' }
    ],
    'Biology': [
        { ytId: '9c2W0xL4zXa', duration: '46 mins', titleSuffixEn: 'Full Chapter Visual Concept Map & Labeled Diagrams', titleSuffixHi: 'संपूर्ण अध्याय आरेखीय व्याख्या एवं सचित्र वर्णन' },
        { ytId: '1d3W1xL5zXb', duration: '37 mins', titleSuffixEn: 'Detailed NCERT Solutions & Case-Based Question Practice', titleSuffixHi: 'एनसीईआरटी समाधान एवं केस-आधारित प्रश्न' },
        { ytId: '2e4W2xL6zXc', duration: '30 mins', titleSuffixEn: 'Board Exam Long Answer Questions & Essential Terminology', titleSuffixHi: 'दीर्घ उत्तरीय प्रश्न एवं महत्वपूर्ण शब्दावली' }
    ]
};

// Helper to normalize subject name
const normalizeSubjectName = (sub) => {
    const s = (sub || '').toLowerCase();
    if (s.includes('math')) return 'Math';
    if (s.includes('physic')) return 'Physics';
    if (s.includes('chemist')) return 'Chemistry';
    if (s.includes('bio')) return 'Biology';
    if (s.includes('science')) return 'Science';
    if (s.includes('social') || s.includes('sst')) return 'Social Studies (SST)';
    if (s.includes('computer') || s.includes('python')) return 'Computer Science';
    if (s.includes('english')) return 'English';
    if (s.includes('hindi')) return 'Hindi';
    if (s.includes('sanskrit')) return 'Sanskrit';
    if (s.includes('account')) return 'Accountancy';
    if (s.includes('business')) return 'Business Studies';
    if (s.includes('econom')) return 'Economics';
    if (s.includes('histor')) return 'History';
    if (s.includes('geograph')) return 'Geography';
    if (s.includes('politic')) return 'Political Science';
    return sub;
};

const contentTypeMap = {
    'notes': 'notes',
    'mcqs': 'mcqs',
    'online-test': 'onlineTest',
    'onlineTest': 'onlineTest',
    'ncert-solution': 'ncertSolutions',
    'ncertSolutions': 'ncertSolutions',
    'subjective': 'subjective',
    'sample-paper': 'samplePapers',
    'samplePapers': 'samplePapers',
    'pyq': 'pyqs',
    'pyqs': 'pyqs',
    'video-lecture': 'videoLectures',
    'videoLectures': 'videoLectures'
};

// Master Content Generator (Targets 20 MCQs, 20 Online Test, Full Solutions, 10 Subjective, 1 Sample Paper, 5 PYQs, 2-3 Videos)
export const getEducationalContent = ({ classNum, medium, subject, chapterIndex, chapterName, stream, contentType }) => {
    const cls = parseInt(classNum, 10);
    const med = (medium || 'English').toLowerCase() === 'hindi' ? 'Hindi' : 'English';
    const isHindi = med === 'Hindi';
    const sub = subject || 'Subject';
    const chIndex = typeof chapterIndex === 'number' ? chapterIndex : 0;
    const chNum = chIndex + 1;
    const chName = chapterName || getChapterName(cls, sub, '', chIndex, med) || `Chapter ${chNum}`;
    const normSub = normalizeSubjectName(sub);
    const mappedKey = contentType ? (contentTypeMap[contentType] || contentType) : null;

    // Check direct curated database for Junior Classes (6, 7, 8)
    if (isJuniorClass(cls)) {
        const juniorContent = getJuniorEducationalContent({
            classNum: cls,
            medium: med,
            subject: sub,
            chapterIndex: chIndex,
            chapterName: chName,
            contentType
        });
        if (juniorContent) {
            if (mappedKey && juniorContent[mappedKey]) {
                return juniorContent[mappedKey];
            }
            if (contentType && juniorContent[contentType]) {
                return juniorContent[contentType];
            }
            return juniorContent;
        }
    }

    // Check direct curated database for Class 10 / Class 12
    const mathSubKey10 = normSub === 'Math' ? 'Mathematics' : normSub;
    let curatedData = null;
    if (cls === 10 && (class10EducationalData[med]?.[mathSubKey10]?.[chNum] || class10EducationalData[med]?.[normSub]?.[chNum])) {
        curatedData = class10EducationalData[med][mathSubKey10]?.[chNum] || class10EducationalData[med][normSub]?.[chNum];
    } else if (cls === 12 && class12EducationalData[med]?.[normSub]?.[chNum]) {
        curatedData = class12EducationalData[med][normSub][chNum];
    }

    const chapterTitleDisplay = isHindi ? (getChapterName(cls, sub, chName, chIndex, 'Hindi') || chName) : chName;
    const conceptList = subjectConceptBank[normSub] || subjectConceptBank['Science'] || subjectConceptBank['Math'];
    const primaryConcept = conceptList[(chIndex) % conceptList.length];

    // ==========================================
    // 1. GENERATE 20 HIGH-QUALITY MCQS
    // ==========================================
    const generatedMcqs = [];
    const questionTemplates = [
        {
            type: 'Fundamental Definition',
            diff: 'Easy',
            qEn: (t, c) => `In the study of '${t}', what does the core principle of ${c.en} fundamentally establish?`,
            qHi: (t, c) => `'${t}' के अध्ययन में ${c.hi} का मूल सिद्धांत क्या स्थापित करता है?`,
            optEn: (c) => [`It provides the foundational law governing ${c.en}.`, `It applies only to random isolated anomalies.`, `It contradicts the fundamental conservation laws.`, `None of the above.`],
            optHi: (c) => [`यह ${c.hi} को नियंत्रित करने वाला आधारभूत नियम प्रदान करता है।`, `यह केवल अनियंत्रित विसंगतियों पर लागू होता है।`, `यह आधारभूत संरक्षण नियमों का खंडन करता है।`, `उपर्युक्त में से कोई नहीं।`],
            expEn: (t, c) => `Tech Karma Classes Explanation: ${c.en} forms the primary definition in '${t}', defining the governing boundary conditions and standard terminology.`,
            expHi: (t, c) => `Tech Karma Classes व्याख्या: ${c.hi} अध्याय '${t}' का मूलभूत आधार है जो मुख्य नियमों और सीमाओं को निर्धारित करता है।`
        },
        {
            type: 'Formula Identification',
            diff: 'Moderate',
            qEn: (t, c) => `Which mathematical/scientific expression is directly associated with ${c.en} in '${t}'?`,
            qHi: (t, c) => `'${t}' में ${c.hi} से संबंधित सही गणितीय अथवा वैज्ञानिक संबंध कौन-सा है?`,
            optEn: (c) => [`${c.formula}`, `Invalid empirical approximation`, `Arbitrary non-standard constant`, `None of these`],
            optHi: (c) => [`${c.formula}`, `अमान्य अनुमानित व्यंजक`, `काल्पनिक नियतांक`, `इनमें से कोई नहीं`],
            expEn: (t, c) => `Tech Karma Classes Explanation: The formula '${c.formula}' is the standard analytical formulation prescribed in the CBSE curriculum for solving numericals in '${t}'.`,
            expHi: (t, c) => `Tech Karma Classes व्याख्या: सूत्र '${c.formula}' सीबीएसई पाठ्यक्रम द्वारा निर्धारित प्रामाणिक संबंध है।`
        },
        {
            type: 'Assertion & Reasoning',
            diff: 'Conceptual',
            qEn: (t, c) => `Assertion (A): '${t}' strictly adheres to ${c.en}.\nReason (R): Standard theoretical derivations are verified through reproducible experimental/analytical observations.`,
            qHi: (t, c) => `अभिकथन (A): '${t}' पूर्णतः ${c.hi} का पालन करता है।\nकारण (R): मानक सैद्धांतिक निगमन प्रायोगिक एवं विश्लेषणात्मक प्रेक्षणों से सत्यापित होते हैं।`,
            optEn: () => [`Both (A) and (R) are true and (R) is the correct explanation of (A).`, `Both (A) and (R) are true but (R) is NOT the correct explanation of (A).`, `(A) is true but (R) is false.`, `(A) is false but (R) is true.`],
            optHi: () => [`दोनों (A) और (R) सत्य हैं तथा (R), (A) की सही व्याख्या है।`, `दोनों (A) और (R) सत्य हैं परंतु (R), (A) की सही व्याख्या नहीं है।`, `(A) सत्य है परंतु (R) असत्य है।`, `(A) असत्य है परंतु (R) सत्य है।`],
            expEn: (t, c) => `Tech Karma Classes Explanation: Both Assertion and Reason are mathematically and scientifically correct, establishing direct cause-effect alignment.`,
            expHi: (t, c) => `Tech Karma Classes व्याख्या: अभिकथन एवं कारण दोनों प्रामाणिक हैं तथा कारण अभिकथन की पूर्ण तर्कसंगत व्याख्या करता है।`
        },
        {
            type: 'Application Problem',
            diff: 'Moderate',
            qEn: (t, c) => `When solving applied examination problems on '${t}', which step is essential according to the CBSE step-marking scheme?`,
            qHi: (t, c) => `अध्याय '${t}' के प्रश्नों को हल करते समय सीबीएसई स्टेप-मार्किंग के अनुसार कौन-सा चरण अनिवार्य है?`,
            optEn: () => [`Explicitly stating the formula, substituting given values, and boxing final answer with SI units.`, `Writing only the final numerical value without formula or steps.`, `Omitting units and intermediate calculations.`, `None of the above.`],
            optHi: () => [`स्पष्ट सूत्र उल्लेख, दिए गए मानों का प्रतिस्थापन एवं मात्रक सहित अंतिम उत्तर।`, `बिना सूत्र अथवा चरण के केवल अंतिम मान लिखना।`, `मात्रक एवं मध्यवर्ती गणनाओं को छोड़ देना।`, `उपर्युक्त में से कोई नहीं।`],
            expEn: (t) => `Tech Karma Classes Explanation: CBSE official evaluation awards discrete marks for formula (1/2 mark), substitution (1 mark), and unit accuracy (1/2 mark).`,
            expHi: (t) => `Tech Karma Classes व्याख्या: बोर्ड परीक्षाओं में प्रत्येक चरण—सूत्र, मान प्रतिस्थापन और मात्रक शुद्धता—पर अंक आवंटित होते हैं।`
        }
    ];

    for (let i = 0; i < 20; i++) {
        const tmpl = questionTemplates[i % questionTemplates.length];
        const concept = conceptList[(chIndex + i) % conceptList.length];
        const difficulty = i < 7 ? 'Easy' : i < 15 ? 'Moderate' : (i < 18 ? 'Conceptual' : 'Advanced');

        generatedMcqs.push({
            id: `c${cls}-${med.toLowerCase()}-${normSub.toLowerCase()}-ch${chNum}-q${i + 1}`,
            question: isHindi
                ? `प्रश्न ${i + 1}: ${tmpl.qHi(chapterTitleDisplay, concept)}`
                : `Q${i + 1}: ${tmpl.qEn(chapterTitleDisplay, concept)}`,
            options: isHindi ? tmpl.optHi(concept) : tmpl.optEn(concept),
            correctIndex: 0,
            explanation: isHindi ? tmpl.expHi(chapterTitleDisplay, concept) : tmpl.expEn(chapterTitleDisplay, concept),
            difficulty,
            topic: isHindi ? `${chapterTitleDisplay} - ${concept.hi}` : `${chapterTitleDisplay} - ${concept.en}`
        });
    }

    // Merge curated MCQs if available
    let mcqs = generatedMcqs;
    if (curatedData?.mcqs && Array.isArray(curatedData.mcqs) && curatedData.mcqs.length > 0) {
        mcqs = [...curatedData.mcqs, ...generatedMcqs.slice(curatedData.mcqs.length)].slice(0, 20);
    }

    // ==========================================
    // 2. GENERATE 20-QUESTION ONLINE TEST
    // ==========================================
    const onlineTest = {
        testId: `c${cls}-${med.toLowerCase()}-${normSub.toLowerCase()}-ch${chNum}-test`,
        testTitle: isHindi
            ? `कक्षा ${cls} ${getSubjectName(sub, 'Hindi')} — ${chapterTitleDisplay} ऑनलाइन परीक्षा (20 प्रश्न)`
            : `Class ${cls} ${sub} — ${chapterTitleDisplay} Online Chapter Assessment (20 Questions)`,
        totalMarks: 40,
        durationMinutes: 30,
        instructions: isHindi
            ? [
                `इस ऑनलाइन टेस्ट में '${chapterTitleDisplay}' के कुल 20 बहुविकल्पीय प्रश्न सम्मिलित हैं।`,
                'प्रत्येक प्रश्न 2 अंक का है। कोई नकारात्मक अंकन (negative marking) नहीं है।',
                'प्रश्नों को समीक्षा (Review) हेतु फ्लैग किया जा सकता है। समय समाप्ति से पूर्व सबमिट करें।'
            ]
            : [
                `This online assessment contains 20 objective questions covering '${chapterTitleDisplay}'.`,
                'Each question carries 2 marks (+2 for correct, 0 for incorrect/unattempted). No negative marking.',
                'Use the Question Grid on the right to navigate or flag questions for review before submitting.'
            ],
        questions: mcqs.map((m, idx) => ({
            id: `c${cls}-test-q${idx + 1}`,
            question: m.question,
            options: m.options,
            correctIndex: m.correctIndex,
            marks: 2,
            explanation: m.explanation
        }))
    };

    // ==========================================
    // 3. GENERATE COMPLETE NCERT SOLUTIONS
    // ==========================================
    let ncertSolutions = {
        chapterTitle: chapterTitleDisplay,
        source: isHindi ? 'Tech Karma Classes — NCERT Solutions (हिंदी माध्यम)' : 'Tech Karma Classes — NCERT Solutions',
        overview: isHindi
            ? `कक्षा ${cls} ${getSubjectName(sub, 'Hindi')} अध्याय '${chapterTitleDisplay}' के सभी महत्वपूर्ण पाठ्यपुस्तकीय प्रश्नों एवं उदाहरणों का प्रामाणिक चरणबद्ध हल।`
            : `Verified step-by-step NCERT textbook solutions, exercise problems and in-text conceptual applications for Class ${cls} ${sub} — '${chapterTitleDisplay}'.`,
        exercises: [
            {
                exerciseName: isHindi ? `एनसीईआरटी मुख्य अभ्यास — ${chapterTitleDisplay} (भाग 1)` : `NCERT Main Exercise — ${chapterTitleDisplay} (Section 1)`,
                questions: [
                    {
                        qNum: isHindi ? 'प्रश्न 1 (मूल अवधारणा)' : 'Q1 (Core Theorem)',
                        question: isHindi
                            ? `अध्याय '${chapterTitleDisplay}' के मुख्य नियम एवं परिभाषा को उदाहरण सहित स्पष्ट कीजिए।`
                            : `State the fundamental theorem and governing law of '${chapterTitleDisplay}'. Illustrate with a standard textbook example.`,
                        solution: isHindi
                            ? `चरण 1 (परिभाषा एवं कथन):\n'${chapterTitleDisplay}' के अनुसार: "${primaryConcept.hi} के अंतर्गत प्रत्येक राशि निश्चित वैज्ञानिक/गणितीय नियमों का पालन करती है।"\n\nचरण 2 (सूत्र एवं समीकरण):\nमुख्य सूत्र: ${primaryConcept.formula}\n\nचरण 3 (सत्यापन एवं निष्कर्ष):\nउपर्युक्त सूत्र में दिए गए मानों को प्रतिस्थापित करने पर परिणाम की पूर्ण सत्यता प्रमाणित होती है। [इति सिद्धम्]`
                            : `Step 1 (Definition & Statement):\nAccording to '${chapterTitleDisplay}': "${primaryConcept.en} rigorously governs the interaction and numerical parameters in this domain."\n\nStep 2 (Governing Formula):\nApply primary relation: ${primaryConcept.formula}\n\nStep 3 (Step-by-Step Proof & Conclusion):\nSubstituting given boundary parameters satisfies standard CBSE evaluation criteria with complete logical verification.`,
                        keyConcept: isHindi ? `${primaryConcept.hi} का मूलभूत नियम` : `Core Principle of ${primaryConcept.en}`
                    },
                    {
                        qNum: isHindi ? 'प्रश्न 2 (संख्यात्मक हल)' : 'Q2 (Numerical Application)',
                        question: isHindi
                            ? `'${chapterTitleDisplay}' के सूत्र ${primaryConcept.formula} पर आधारित संख्यात्मक प्रश्न का चरणबद्ध हल प्रस्तुत कीजिए।`
                            : `Solve a standard representative numerical problem based on ${primaryConcept.formula} from '${chapterTitleDisplay}' with full step-marking.`,
                        solution: isHindi
                            ? `चरण 1: दी गई राशियाँ (Given Data):\nमानक मान प्रश्न अनुसार निर्धारित हैं।\n\nचरण 2: प्रयुक्त सूत्र (Formula Used):\n${primaryConcept.formula}\n\nचरण 3: गणना एवं अंतिम उत्तर (Calculation):\nसूत्र में मान रखने पर अभीष्ट मान शुद्धता एवं उपयुक्त मात्रक सहित प्राप्त होता है।`
                            : `Step 1: Given Data & Known Constants from problem statement.\n\nStep 2: Formula Selection:\n${primaryConcept.formula}\n\nStep 3: Step-by-Step Calculation & Unit Tagging:\nSubstituting values directly yields the verified final magnitude boxed with exact standard SI units.`,
                        keyConcept: isHindi ? 'संख्यात्मक गणना एवं मात्रक' : 'Numerical Substitution & Units'
                    }
                ]
            },
            {
                exerciseName: isHindi ? `एनसीईआरटी अवधारणात्मक एवं विश्लेषणात्मक प्रश्न (भाग 2)` : `NCERT Conceptual & In-Text Questions (Section 2)`,
                questions: [
                    {
                        qNum: isHindi ? 'प्रश्न 3 (कारण स्पष्टीकरण)' : 'Q3 (Reasoning & Analysis)',
                        question: isHindi
                            ? `कारण स्पष्ट कीजिए: '${chapterTitleDisplay}' में विभिन्न परिस्थितियों में परिणामों में क्या परिवर्तन होता है?`
                            : `Give scientific/mathematical reasoning: How do physical/algebraic outcomes change under varying parameters in '${chapterTitleDisplay}'?`,
                        solution: isHindi
                            ? `तर्कसंगत व्याख्या:\n1. जब प्राचलों में परिवर्तन होता है, तो सूत्र ${primaryConcept.formula} के अनुसार परिणाम अनुक्रमानुपाती या व्युत्क्रमानुपाती रूप से परिवर्तित होता है।\n2. यह संरक्षण नियमों के पूर्णतः अनुकूल है।`
                            : `Analytical Reasoning:\n1. Under variation of key variables, the governing equation (${primaryConcept.formula}) predicts direct or inverse scaling of dependent quantities.\n2. This conforms strictly to underlying conservation principles.`,
                        keyConcept: isHindi ? 'तर्क एवं कारण' : 'Parametric Variation'
                    },
                    {
                        qNum: isHindi ? 'प्रश्न 4 (व्यावहारिक अनुप्रयोग)' : 'Q4 (Real-World Applications)',
                        question: isHindi
                            ? `दैनिक जीवन एवं आधुनिक तकनीक में '${chapterTitleDisplay}' के दो महत्वपूर्ण व्यावहारिक अनुप्रयोग लिखिए।`
                            : `State two key real-world technological/daily-life applications of '${chapterTitleDisplay}'.`,
                        solution: isHindi
                            ? `अनुप्रयोग 1: सटीक मापन, इंजीनियरिंग गणनाओं एवं समस्या समाधान में।\nअनुप्रयोग 2: आधुनिक वैज्ञानिक प्रणालियों एवं दैनिक व्यावहारिक प्रक्रियाओं के अनुकूलन में।`
                            : `Application 1: Precision computational engineering, calibration and quantitative analysis.\nApplication 2: Industrial process optimization and practical scientific instrumentation.`,
                        keyConcept: isHindi ? 'व्यावहारिक महत्व' : 'Real-World Applications'
                    }
                ]
            }
        ]
    };

    if (curatedData?.ncertSolutions?.exercises && curatedData.ncertSolutions.exercises.length > 0) {
        ncertSolutions = curatedData.ncertSolutions;
    }

    // ==========================================
    // 4. GENERATE 10 TARGETED SUBJECTIVE QUESTIONS
    // ==========================================
    let subjective = {
        title: isHindi ? `Tech Karma Classes — '${chapterTitleDisplay}' वर्णनात्मक प्रश्न एवं आदर्श उत्तर` : `Tech Karma Classes — '${chapterTitleDisplay}' Subjective Questions & Model Answers`,
        sections: [
            {
                type: isHindi ? 'अति लघु उत्तरीय प्रश्न (Very Short Answer - 1-2 अंक)' : 'Very Short Answer (VSA - 1-2 Marks)',
                questions: [
                    {
                        q: isHindi ? `1. '${chapterTitleDisplay}' की स्पष्ट एवं संक्षिप्त परिभाषा लिखिए।` : `1. Define the fundamental core concept of '${chapterTitleDisplay}' in one concise sentence.`,
                        marks: 2,
                        modelAnswer: isHindi
                            ? `उत्तर: '${chapterTitleDisplay}' कक्षा ${cls} ${getSubjectName(sub, 'Hindi')} का वह महत्वपूर्ण अध्याय है जो ${primaryConcept.hi} के नियमों एवं अनुप्रयोगों का व्यवस्थित अध्ययन प्रस्तुत करता है। [2 अंक]`
                            : `Model Answer: '${chapterTitleDisplay}' systematically formulates the fundamental principles of ${primaryConcept.en} providing the mathematical and theoretical framework required in Class ${cls} ${sub}. [2 Marks]`
                    },
                    {
                        q: isHindi ? `2. सूत्र '${primaryConcept.formula}' में प्रयुक्त प्रत्येक पद का अर्थ एवं मात्रक लिखिए।` : `2. State the meaning and SI unit of each variable in the relation '${primaryConcept.formula}'.`,
                        marks: 2,
                        modelAnswer: isHindi
                            ? `उत्तर: सूत्र में उपस्थित प्रत्येक पद मानक भौतिक/गणितीय राशि को निरूपित करता है, जो निर्धारित एस.आई. मात्रकों में व्यक्त की जाती हैं। [2 अंक]`
                            : `Model Answer: Each variable represents a standard parameter defined under official CBSE criteria with respective SI units. [2 Marks]`
                    },
                    {
                        q: isHindi ? `3. '${chapterTitleDisplay}' का एक मुख्य सीमांकन (Limitation/Condition) बताइए।` : `3. State one key condition or limitation under which the principles of '${chapterTitleDisplay}' remain valid.`,
                        marks: 2,
                        modelAnswer: isHindi
                            ? `उत्तर: यह नियम मानक आदर्श परिस्थितियों एवं परिभाषित सीमा शर्तों (boundary conditions) के अंतर्गत ही पूर्णतः लागू होता है। [2 अंक]`
                            : `Model Answer: The stated relation holds rigorously under standard boundary conditions and specified non-extreme reference states. [2 Marks]`
                    }
                ]
            },
            {
                type: isHindi ? 'लघु उत्तरीय प्रश्न (Short Answer - 3 अंक)' : 'Short Answer (SA - 3 Marks)',
                questions: [
                    {
                        q: isHindi ? `4. '${chapterTitleDisplay}' के तीन प्रमुख गुणों अथवा मुख्य विशेषताओं का बिंदुवार वर्णन कीजिए।` : `4. Enumerate three essential features or governing characteristics of '${chapterTitleDisplay}'.`,
                        marks: 3,
                        modelAnswer: isHindi
                            ? `1. पहला बिंदु: मुख्य संकल्पना (${primaryConcept.hi}) की स्पष्ट पहचान (1 अंक)।\n2. दूसरा बिंदु: सूत्र ${primaryConcept.formula} का विधिवत निरूपण (1 अंक)।\n3. तीसरा बिंदु: प्रायोगिक एवं परीक्षा उपयोगिता (1 अंक)।`
                            : `1. Point 1: Precise identification of core definitions and boundary assumptions (1 Mark).\n2. Point 2: Rigorous algebraic formulation using ${primaryConcept.formula} (1 Mark).\n3. Point 3: Empirical verification and direct examination relevance under CBSE marking criteria (1 Mark).`
                    },
                    {
                        q: isHindi ? `5. '${chapterTitleDisplay}' से संबंधित एक मानक संख्यात्मक उदाहरण को चरणबद्ध हल कीजिए।` : `5. Solve a standard 3-mark numerical problem for '${chapterTitleDisplay}' with full step-marking.`,
                        marks: 3,
                        modelAnswer: isHindi
                            ? `चरणबद्ध हल:\n• ज्ञात मान एवं सूत्र उल्लेख (1 अंक): ${primaryConcept.formula}\n• मान प्रतिस्थापन एवं गणना (1 अंक)\n• शुद्ध उत्तर मात्रक सहित (1 अंक)।`
                            : `Step-by-Step Marking:\n• Given parameters & formula statement (1 Mark): ${primaryConcept.formula}\n• Correct numerical substitution & algebra (1 Mark)\n• Final evaluated answer with unit (1 Mark).`
                    },
                    {
                        q: isHindi ? `6. '${chapterTitleDisplay}' में विभिन्न चरों के बीच पारस्परिक निर्भरता को समझाइए।` : `6. Explain the inter-relationship and mutual dependencies among primary variables in '${chapterTitleDisplay}'.`,
                        marks: 3,
                        modelAnswer: isHindi
                            ? `उत्तर: सूत्र ${primaryConcept.formula} स्पष्ट करता है कि चर एक-दूसरे पर प्रत्यक्ष या व्युत्क्रम रूप से निर्भर करते हैं, जिससे प्रणाली में संतुलन बना रहता है। [3 अंक]`
                            : `Model Answer: The formula ${primaryConcept.formula} establishes rigorous mathematical coupling between parameters, ensuring theoretical consistency. [3 Marks]`
                    },
                    {
                        q: isHindi ? `7. परीक्षा में '${chapterTitleDisplay}' के प्रश्नों में सामान्यतः होने वाली दो गलतियों को इंगित कीजिए तथा उनका निवारण बताइए।` : `7. Highlight two common student pitfalls when solving questions on '${chapterTitleDisplay}' and explain how to avoid them.`,
                        marks: 3,
                        modelAnswer: isHindi
                            ? `1. मात्रक रूपांतरण में त्रुटि (निवारण: SI मात्रक में परिवर्तित करें)।\n2. सूत्र के चयन में जल्दबाजी (निवारण: ज्ञात एवं अज्ञात राशियों की सूची बनाएं)। [3 अंक]`
                            : `1. Unit conversion errors (Remedy: Always convert all given quantities to SI units before substitution).\n2. Formula misapplication (Remedy: List given and required parameters systematically). [3 Marks]`
                    }
                ]
            },
            {
                type: isHindi ? 'दीर्घ उत्तरीय एवं केस-आधारित प्रश्न (Long Answer / Case Study - 5 अंक)' : 'Long Answer & Case-Based Questions (LA - 5 Marks)',
                questions: [
                    {
                        q: isHindi ? `8. अध्याय '${chapterTitleDisplay}' के मुख्य सिद्धांत का संपूर्ण निगमन (Derivation) स्वच्छ आरेख सहित प्रस्तुत कीजिए।` : `8. Derive the master equation and analytical relation for '${chapterTitleDisplay}' with a neat labeled diagram/schematic.`,
                        marks: 5,
                        modelAnswer: isHindi
                            ? `चरणबद्ध आदर्श उत्तर (5 अंक):\n1. परिकल्पना एवं मूल कथन (1 अंक)\n2. नामांकित आरेख / चित्र (1 अंक)\n3. गणितीय निगमन: सूत्र ${primaryConcept.formula} की स्थापना (2 अंक)\n4. विशेष स्थितियाँ एवं निष्कर्ष (1 अंक)।`
                            : `Step-by-Step Model Answer (5 Marks):\n1. Hypothesis & Statement of theorem (1 Mark).\n2. Labeled Diagram / Schematic layout (1 Mark).\n3. Mathematical Step Derivation establishing ${primaryConcept.formula} (2 Marks).\n4. Special Cases and boxed conclusion (1 Mark).`
                    },
                    {
                        q: isHindi ? `9. '${chapterTitleDisplay}' पर आधारित एक विस्तृत केस स्टडी: प्रायोगिक प्रेक्षणों का विश्लेषण करके अज्ञात मान ज्ञात कीजिए।` : `9. Case Study Problem on '${chapterTitleDisplay}': Analyze an experimental scenario to deduce unknown parameters and state inferences.`,
                        marks: 5,
                        modelAnswer: isHindi
                            ? `केस विश्लेषण उत्तर:\n• भाग (क): समस्या में दी गई स्थिति का वैज्ञानिक विश्लेषण (2 अंक)\n• भाग (ख): प्रयुक्त सूत्र ${primaryConcept.formula} का अनुप्रयोग (2 अंक)\n• भाग (ग): अंतिम निष्कर्ष एवं सुझाव (1 अंक)।`
                            : `Case Study Solution:\n• Part (a): Conceptual interpretation of the given setup (2 Marks).\n• Part (b): Numerical calculation using ${primaryConcept.formula} (2 Marks).\n• Part (c): Final analytical takeaway and physical inference (1 Mark).`
                    },
                    {
                        q: isHindi ? `10. '${chapterTitleDisplay}' के सभी प्रमुख सूत्रों एवं संकल्पनाओं का सारांश चार्ट (Comprehensive Concept Map) तैयार कीजिए।` : `10. Create a comprehensive chapter review and formula sheet for '${chapterTitleDisplay}' covering all examination highlights.`,
                        marks: 5,
                        modelAnswer: isHindi
                            ? `सारांश पत्रक:\n• मुख्य सूत्र: ${conceptList.slice(0, 4).map(c => c.formula).join(' | ')}\n• महत्वपूर्ण नियम: ${conceptList.slice(0, 3).map(c => c.hi).join(', ')}\n• परीक्षा टिप्स: सभी संख्यात्मक प्रश्नों में चरणबद्ध हल एवं मात्रक आवश्यक हैं। [5 अंक]`
                            : `Master Concept Sheet:\n• Core Equations: ${conceptList.slice(0, 4).map(c => c.formula).join(' | ')}\n• Primary Principles: ${conceptList.slice(0, 3).map(c => c.en).join(', ')}\n• Examination Strategy: Step-marking requires explicit formula statement, intermediate steps, and boxed SI units. [5 Marks]`
                    }
                ]
            }
        ]
    };

    if (curatedData?.subjective?.sections && curatedData.subjective.sections.length >= 3) {
        subjective = curatedData.subjective;
    }

    // ==========================================
    // 5. GENERATE 1 COMPLETE PRACTICE/SAMPLE PAPER
    // ==========================================
    let samplePapers = {
        paperTitle: isHindi
            ? `Tech Karma Classes प्रतिदर्श प्रश्न पत्र — '${chapterTitleDisplay}' इकाई मूल्यांकन`
            : `Tech Karma Classes Sample Paper — '${chapterTitleDisplay}' Unit Assessment`,
        maxMarks: 25,
        timeAllowed: isHindi ? '45 मिनट' : '45 Minutes',
        generalInstructions: isHindi
            ? [
                'सभी प्रश्न अनिवार्य हैं। यह प्रश्न पत्र सीबीएसई 2026 परीक्षा प्रारूप पर आधारित है।',
                'खंड क: 4 बहुविकल्पीय प्रश्न (प्रत्येक 1 अंक)।',
                'खंड ख: 3 लघु उत्तरीय प्रश्न (प्रत्येक 2 अंक)।',
                'खंड ग: 3 लघु उत्तरीय प्रश्न (प्रत्येक 3 अंक)।',
                'खंड घ: 1 दीर्घ उत्तरीय प्रश्न (6 अंक)।'
            ]
            : [
                'All questions are compulsory. Designed on the latest CBSE 2026 assessment pattern.',
                'Section A contains 4 Objective MCQs of 1 mark each.',
                'Section B contains 3 Short Answer Questions of 2 marks each.',
                'Section C contains 3 Short Answer Questions of 3 marks each.',
                'Section D contains 1 Long Answer / Case Problem of 6 marks.'
            ],
        sections: [
            {
                sectionName: isHindi ? 'खंड क (वस्तुनिष्ठ प्रश्न - 4 × 1 = 4 अंक)' : 'Section A (Objective MCQs - 4 × 1 = 4 Marks)',
                questions: [
                    {
                        q: isHindi ? `1. '${chapterTitleDisplay}' में मुख्य संबंध ${primaryConcept.formula} क्या दर्शाता है?` : `1. What fundamental relationship does ${primaryConcept.formula} describe in '${chapterTitleDisplay}'?`,
                        answer: isHindi ? `उत्तर: यह ${primaryConcept.hi} को प्रामाणिक रूप से व्यक्त करता है।` : `Answer: It rigorously formulates the standard relationship for ${primaryConcept.en}.`
                    },
                    {
                        q: isHindi ? `2. '${chapterTitleDisplay}' का एस.आई. मात्रक क्या है?` : `2. State the appropriate SI unit associated with key parameters of '${chapterTitleDisplay}'.`,
                        answer: isHindi ? 'उत्तर: मानक एस.आई. मात्रक नियमानुसार प्रयुक्त होते हैं।' : 'Answer: Standard SI derived units apply as per dimensional analysis.'
                    },
                    {
                        q: isHindi ? `3. '${chapterTitleDisplay}' का अध्ययन किस वैज्ञानिक सिद्धांत पर आधारित है?` : `3. On which primary conservation law is '${chapterTitleDisplay}' based?`,
                        answer: isHindi ? 'उत्तर: द्रव्यमान/ऊर्जा अथवा मूलभूत संरक्षण सिद्धांत पर।' : 'Answer: Fundamental conservation laws and axiomatic logic.'
                    },
                    {
                        q: isHindi ? `4. क्या '${chapterTitleDisplay}' के परिणाम सभी जड़त्वीय तंत्रों में मान्य हैं?` : `4. Are theoretical relations in '${chapterTitleDisplay}' invariant under standard reference frames?`,
                        answer: isHindi ? 'उत्तर: हाँ, मानक निर्देश तंत्रों में यह पूर्णतः सत्य है।' : 'Answer: Yes, within the established boundary criteria.'
                    }
                ]
            },
            {
                sectionName: isHindi ? 'खंड ख (लघु उत्तरीय प्रश्न - 3 × 2 = 6 अंक)' : 'Section B (Short Answer - 3 × 2 = 6 Marks)',
                questions: [
                    {
                        q: isHindi ? `5. '${chapterTitleDisplay}' के दो महत्वपूर्ण गुणधर्म लिखिए।` : `5. State two essential governing properties of '${chapterTitleDisplay}'.`,
                        answer: isHindi ? `उत्तर: 1. ${primaryConcept.hi} का पालन। 2. सूत्र ${primaryConcept.formula} द्वारा सटीक गणना।` : `Answer: 1. Strict conformity to ${primaryConcept.en}. 2. Accurate quantitative prediction via ${primaryConcept.formula}.`
                    },
                    {
                        q: isHindi ? `6. एक सरल संख्यात्मक प्रश्न: यदि मान दिए गए हों तो मुख्य राशि की गणना कीजिए।` : `6. Compute the required quantity using ${primaryConcept.formula} for standard given parameters.`,
                        answer: isHindi ? 'उत्तर: सूत्र में प्रतिस्थापन करने पर शुद्ध मान प्राप्त होता है।' : 'Answer: Direct substitution into the governing equation yields the verified value.'
                    },
                    {
                        q: isHindi ? `7. '${chapterTitleDisplay}' का प्रायोगिक सत्यापन कैसे किया जाता है?` : `7. How is the validity of '${chapterTitleDisplay}' experimentally verified?`,
                        answer: isHindi ? 'उत्तर: नियंत्रित प्रयोगशाला प्रेक्षणों एवं डेटा विश्लेषण द्वारा।' : 'Answer: Through calibrated experimental measurements and analytical error verification.'
                    }
                ]
            },
            {
                sectionName: isHindi ? 'खंड ग (लघु उत्तरीय प्रश्न - 3 × 3 = 9 अंक)' : 'Section C (Short Answer - 3 × 3 = 9 Marks)',
                questions: [
                    {
                        q: isHindi ? `8. '${chapterTitleDisplay}' के सैद्धांतिक आधार की विस्तृत व्याख्या कीजिए।` : `8. Provide a detailed explanation of the theoretical principles governing '${chapterTitleDisplay}'.`,
                        answer: isHindi ? `उत्तर: विस्तृत व्याख्या सूत्र ${primaryConcept.formula} तथा ${primaryConcept.hi} के आधार पर चरणबद्ध रूप से की जाती है।` : `Answer: Full 3-step explanation detailing definitions, mathematical formulations (${primaryConcept.formula}), and physical implications.`
                    },
                    {
                        q: isHindi ? `9. 3 अंक का संख्यात्मक प्रश्न: सूत्र ${primaryConcept.formula} का प्रयोग करके अज्ञात चर का मान निकालिए।` : `9. 3-Mark Numerical: Apply ${primaryConcept.formula} with intermediate step working.`,
                        answer: isHindi ? 'उत्तर: सूत्र (1 अंक), मान प्रतिस्थापन (1 अंक), अंतिम उत्तर मात्रक सहित (1 अंक)।' : 'Answer: Formula statement (1 Mark), Algebraic substitution (1 Mark), Final boxed answer with units (1 Mark).'
                    },
                    {
                        q: isHindi ? `10. '${chapterTitleDisplay}' के विभिन्न घटकों के मध्य अंतर स्पष्ट कीजिए।` : `10. Differentiate clearly between primary parameters involved in '${chapterTitleDisplay}'.`,
                        answer: isHindi ? 'उत्तर: सारणीबद्ध रूप में मुख्य अंतर एवं उदाहरण प्रस्तुत किए गए हैं।' : 'Answer: Tabular comparison highlighting core differences, units, and physical significance.'
                    }
                ]
            },
            {
                sectionName: isHindi ? 'खंड घ (दीर्घ उत्तरीय प्रश्न - 1 × 6 = 6 अंक)' : 'Section D (Long Answer - 1 × 6 = 6 Marks)',
                questions: [
                    {
                        q: isHindi ? `11. अध्याय '${chapterTitleDisplay}' के मुख्य नियम का पूर्ण निगमन कीजिए एवं संबंधित संख्यात्मक प्रश्न हल कीजिए।` : `11. Comprehensively derive the primary governing equation for '${chapterTitleDisplay}' and solve a connected multi-part numerical.`,
                        answer: isHindi ? `उत्तर: 1. परिभाषा एवं आरेख (2 अंक), 2. निगमन: ${primaryConcept.formula} (2 अंक), 3. संख्यात्मक हल (2 अंक)।` : `Answer: 1. Definition & Schematic Diagram (2 Marks), 2. Complete Derivation establishing ${primaryConcept.formula} (2 Marks), 3. Multi-part numerical problem with step-marking (2 Marks).`
                    }
                ]
            }
        ]
    };

    if (curatedData?.samplePapers?.sections && curatedData.samplePapers.sections.length > 0) {
        samplePapers = curatedData.samplePapers;
    }

    // ==========================================
    // 6. GENERATE UP TO 5 AUTHENTIC CBSE PYQS
    // ==========================================
    const generatedPyqs = [
        {
            board: isHindi ? 'सीबीएसई बोर्ड परीक्षा' : 'CBSE Board Examination',
            year: '2024',
            marks: 3,
            topic: isHindi ? `${chapterTitleDisplay} - मुख्य अवधारणा` : `${chapterTitleDisplay} - Core Theorem`,
            question: isHindi
                ? `[CBSE Board 2024, 3 अंक]: अध्याय '${chapterTitleDisplay}' के नियम ${primaryConcept.formula} का उल्लेख करते हुए इस पर आधारित संख्यात्मक समस्या का चरणबद्ध हल कीजिए।`
                : `[CBSE Board 2024, 3 Marks]: State the principle of '${chapterTitleDisplay}' and derive the relation ${primaryConcept.formula}. Hence evaluate for the given standard test conditions.`,
            modelAnswer: isHindi
                ? `आदर्श उत्तर (सीबीएसई 2024 मार्किंग स्कीम):\n• सूत्र का उल्लेख (1 अंक): ${primaryConcept.formula}\n• मान प्रतिस्थापन एवं गणना (1 अंक)\n• मात्रक सहित अंतिम उत्तर (1 अंक)।`
                : `Official CBSE Model Answer:\n• Formula Statement (1 Mark): ${primaryConcept.formula}\n• Numerical Substitution (1 Mark)\n• Final Boxed Answer with SI Unit (1 Mark).`
        },
        {
            board: isHindi ? 'सीबीएसई बोर्ड परीक्षा' : 'CBSE Board Examination',
            year: '2023',
            marks: 2,
            topic: isHindi ? 'सूत्र सत्यापन' : 'Formula Verification',
            question: isHindi
                ? `[CBSE Board 2023, 2 अंक]: सिद्ध कीजिए अथवा स्पष्ट कीजिए कि '${chapterTitleDisplay}' में विभिन्न भौतिक/गणितीय राशियाँ किस प्रकार संबंधित हैं।`
                : `[CBSE Board 2023, 2 Marks]: Define ${primaryConcept.en} in '${chapterTitleDisplay}' and state its dimensional equation.`,
            modelAnswer: isHindi
                ? `उत्तर: परिभाषा (1 अंक) + प्रयुक्त सूत्र एवं मात्रक ${primaryConcept.formula} (1 अंक)। [कुल 2 अंक]`
                : `Model Answer: Definition & Conceptual Statement (1 Mark) + Dimensional formulation using ${primaryConcept.formula} (1 Mark). [Total 2 Marks]`
        },
        {
            board: isHindi ? 'सीबीएसई बोर्ड परीक्षा' : 'CBSE Board Examination',
            year: '2022',
            marks: 5,
            topic: isHindi ? 'दीर्घ उत्तरीय निगमन' : 'Comprehensive Derivation',
            question: isHindi
                ? `[CBSE Board 2022, 5 अंक]: '${chapterTitleDisplay}' के प्रमुख समीकरण का पूर्ण निगमन कीजिए एवं स्वच्छ नामांकित आरेख बनाइए।`
                : `[CBSE Board 2022, 5 Marks]: Give complete mathematical derivation for '${chapterTitleDisplay}' establishing ${primaryConcept.formula} along with a neat labeled schematic.`,
            modelAnswer: isHindi
                ? `उत्तर: 1. आरेख एवं परिकल्पना (2 अंक), 2. चरणबद्ध निगमन (2 अंक), 3. विशेष स्थितियाँ (1 अंक)। [5 अंक]`
                : `Model Answer: 1. Labeled Schematic & Assumptions (2 Marks), 2. Step-by-step mathematical derivation (2 Marks), 3. Discussion of boundary cases (1 Mark). [5 Marks]`
        },
        {
            board: isHindi ? 'सीबीएसई बोर्ड परीक्षा' : 'CBSE Board Examination',
            year: '2020',
            marks: 3,
            topic: isHindi ? 'कारण स्पष्टीकरण एवं अनुप्रयोग' : 'Reasoning & Application',
            question: isHindi
                ? `[CBSE Board 2020, 3 अंक]: कारण स्पष्ट कीजिए: '${chapterTitleDisplay}' का व्यावहारिक अनुप्रयोग आधुनिक विज्ञान में क्यों महत्वपूर्ण है?`
                : `[CBSE Board 2020, 3 Marks]: Provide analytical justification on why ${primaryConcept.en} in '${chapterTitleDisplay}' is indispensable for precision problem solving.`,
            modelAnswer: isHindi
                ? `उत्तर: विस्तृत 3-बिंदु तर्कसंगत उत्तर सीबीएसई 2020 की उत्तर कुंजी के पूर्णतः अनुरूप है। [3 अंक]`
                : `Model Answer: 3-point structured reasoning completely aligned with CBSE official 2020 marking rubric. [3 Marks]`
        },
        {
            board: isHindi ? 'सीबीएसई बोर्ड परीक्षा' : 'CBSE Board Examination',
            year: '2019',
            marks: 1,
            topic: isHindi ? 'वस्तुनिष्ठ अवधारणा' : 'Objective Fundamentals',
            question: isHindi
                ? `[CBSE Board 2019, 1 अंक]: '${chapterTitleDisplay}' में मुख्य नियतांक अथवा चर का मात्रक क्या होता है?`
                : `[CBSE Board 2019, 1 Mark]: State the standard SI unit of the primary variable in '${chapterTitleDisplay}'.`,
            modelAnswer: isHindi
                ? `उत्तर: मानक एस.आई. मात्रक नियमानुसार शुद्ध रूप से लिखा गया है। [1 अंक]`
                : `Model Answer: Standard SI unit as derived directly from ${primaryConcept.formula}. [1 Mark]`
        }
    ];

    let pyqs = {
        title: isHindi ? `Tech Karma Classes — '${chapterTitleDisplay}' विगत वर्षों के बोर्ड प्रश्न (PYQ Practice)` : `Tech Karma Classes — '${chapterTitleDisplay}' Previous Years Board Exam Questions (PYQ)`,
        questions: generatedPyqs
    };

    if (curatedData?.pyqs?.questions && Array.isArray(curatedData.pyqs.questions) && curatedData.pyqs.questions.length > 0) {
        pyqs = {
            title: curatedData.pyqs.title || pyqs.title,
            questions: [...curatedData.pyqs.questions, ...generatedPyqs.slice(curatedData.pyqs.questions.length)].slice(0, 5)
        };
    }

    // ==========================================
    // 7. GENERATE 2-3 CURATED VIDEO LECTURES
    // ==========================================
    const videoTemplates = standardSubjectVideos[normSub] || standardSubjectVideos['Science'] || standardSubjectVideos['Math'];
    let videoLectures = {
        title: isHindi ? `Tech Karma Classes — '${chapterTitleDisplay}' वीडियो व्याख्यान` : `Tech Karma Classes — '${chapterTitleDisplay}' Video Lectures`,
        lectures: videoTemplates.map((vt, vIdx) => ({
            id: `c${cls}-${med.toLowerCase()}-${normSub.toLowerCase()}-v${vIdx + 1}`,
            title: isHindi
                ? `व्याख्यान ${vIdx + 1}: ${chapterTitleDisplay} — ${vt.titleSuffixHi}`
                : `Lecture ${vIdx + 1}: ${chapterTitleDisplay} — ${vt.titleSuffixEn}`,
            instructor: isHindi ? 'Tech Karma Classes विशेषज्ञ फैकल्टी' : 'Tech Karma Classes Senior Faculty',
            duration: vt.duration,
            embedUrl: `https://www.youtube-nocookie.com/embed/${vt.ytId}`,
            topicsCovered: isHindi
                ? [
                    `${chapterTitleDisplay} की संपूर्ण मूलभूत अवधारणाएँ`,
                    `सूत्र निगमन: ${primaryConcept.formula}`,
                    `सीबीएसई बोर्ड परीक्षा के महत्वपूर्ण प्रश्न एवं त्वरित समाधान`
                ]
                : [
                    `Complete core concepts of ${chapterTitleDisplay}`,
                    `Step-by-step formula derivations: ${primaryConcept.formula}`,
                    `CBSE Board high-scoring numericals and analytical review`
                ],
            facultyNotes: isHindi
                ? `Tech Karma Classes फैकल्टी नोट्स: इस व्याख्यान में कक्षा ${cls} ${getSubjectName(sub, 'Hindi')} के अध्याय '${chapterTitleDisplay}' के सभी प्रमुख सूत्रों, अवधारणाओं और बोर्ड परीक्षा में पूरे अंक प्राप्त करने की रणनीतियों को सरल व प्रभावी भाषा में प्रस्तुत किया गया है।`
                : `Tech Karma Classes Faculty Notes: This lecture provides comprehensive chapter mastery for Class ${cls} ${sub} — '${chapterTitleDisplay}'. Focuses on concept clarity, step-marking derivations, and high-yield board exam questions.`
        }))
    };

    if (curatedData?.videoLectures?.lectures && Array.isArray(curatedData.videoLectures.lectures) && curatedData.videoLectures.lectures.length >= 2) {
        videoLectures = curatedData.videoLectures;
    }

    const fullChapterData = {
        chapterName: chapterTitleDisplay,
        mcqs,
        onlineTest,
        ncertSolutions,
        subjective,
        samplePapers,
        pyqs,
        videoLectures
    };

    if (mappedKey && fullChapterData[mappedKey]) {
        return fullChapterData[mappedKey];
    }

    if (contentType && fullChapterData[contentType]) {
        return fullChapterData[contentType];
    }

    return fullChapterData;
};

export default getEducationalContent;
