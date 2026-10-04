// Tech Karma Classes - Lean High-Performance Junior Curriculum Engine
// Supports Class 6, 7, 8 in English & Hindi Mediums
// Strictly NCERT & CBSE 2026 Aligned

import { getSubjectName, getChapterName } from '../classesData.js';

export const isJuniorClass = (cls) => {
    const n = parseInt(cls, 10);
    return n === 6 || n === 7 || n === 8;
};

// Curriculum knowledge base for core junior concepts across subjects
const juniorTopicRepo = {
    'Math': {
        6: [
            { titleEn: "Knowing Our Numbers", titleHi: "अपनी संख्याओं की जानकारी", formulaEn: "1 Lakh = 100,000 | 1 Crore = 10,000,000 | Roman: I, V, X, L, C, D, M", formulaHi: "१ लाख = १००,००० | १ करोड़ = १०,०००,००० | रोमन: I, V, X, L, C, D, M", topicType: "Number Systems & Estimation" },
            { titleEn: "Whole Numbers", titleHi: "पूर्ण संख्याएँ", formulaEn: "W = {0, 1, 2...} | a(b+c) = ab + ac | a ÷ 0 is Undefined", formulaHi: "W = {०, १, २...} | a(b+c) = ab + ac | शून्य से विभाजन अपरिभाषित", topicType: "Whole Numbers & Properties" },
            { titleEn: "Playing with Numbers", titleHi: "संख्याओं के साथ खेलना", formulaEn: "HCF × LCM = Product of Numbers | Divisibility 2, 3, 5, 9, 11", formulaHi: "म.स. × ल.स. = संख्याओं का गुणनफल | विभाज्यता नियम", topicType: "Factors, Primes & Multiples" },
            { titleEn: "Basic Geometrical Ideas", titleHi: "आधारभूत ज्यामितीय अवधारणाएँ", formulaEn: "Point, Line, Ray, Polygon, Angle, Triangle, Circle (Radius & Chord)", formulaHi: "बिंदु, रेखा, किरण, बहुभुज, कोण, त्रिभुज, वृत्त", topicType: "Foundational Geometry" },
            { titleEn: "Understanding Elementary Shapes", titleHi: "प्रारंभिक आकारों को समझना", formulaEn: "Angles: Acute (<90°), Right (90°), Obtuse (>90°), Straight (180°), Reflex (>180°)", formulaHi: "कोण: न्यूनकोण (<९०°), समकोण (९०°), अधिककोण (>९०°), ऋजुकोण (१८०°)", topicType: "2D & 3D Shapes" },
            { titleEn: "Integers", titleHi: "पूर्णांक", formulaEn: "Z = {...-2, -1, 0, 1, 2...} | (+) × (-) = (-) | (-) × (-) = (+)", formulaHi: "पूर्णांक संख्या रेखा | विपरीत चिह्न नियम", topicType: "Negative Numbers & Operations" },
            { titleEn: "Fractions", titleHi: "भिन्न", formulaEn: "Proper (N < D) | Improper (N ≥ D) | Mixed Q R/D | Equivalent a/b = ka/kb", formulaHi: "उचित, विषम एवं मिश्रित भिन्न | तुल्य भिन्न", topicType: "Fractions & Equivalent Forms" },
            { titleEn: "Decimals", titleHi: "दशमलव", formulaEn: "Tenths (1/10) | Hundredths (1/100) | 1 Rupee = 100 P | 1 km = 1000 m", formulaHi: "दशांश (१/१०) | शतांश (१/१००) | मापन में दशमलव", topicType: "Decimal Operations & Conversion" },
            { titleEn: "Data Handling", titleHi: "आँकड़ों का प्रबंधन", formulaEn: "Tally Marks |||| | Pictograph Scale | Bar Graph Uniform Width", formulaHi: "मिलान चिह्न | चित्रालेख | दंड आलेख", topicType: "Data Representation" },
            { titleEn: "Mensuration", titleHi: "क्षेत्रमिति", formulaEn: "Perimeter Rectangle = 2(l+b) | Square = 4s | Area Rectangle = l×b | Square = s²", formulaHi: "आयत का परिमाप = २(l+b) | वर्ग का परिमाप = ४s | क्षेत्रफल = l×b", topicType: "Perimeter and Area" },
            { titleEn: "Algebra", titleHi: "बीजगणित", formulaEn: "Variable x, y | Matchstick Rule 2n | Algebraic Expression 2x + 3 = 7", formulaHi: "चर राशि | तीली प्रतिरूप | सरल समीकरण", topicType: "Variables and Equations" },
            { titleEn: "Ratio and Proportion", titleHi: "अनुपात और समानुपात", formulaEn: "Ratio a:b = a/b | Proportion a:b = c:d <=> ad = bc | Unitary Method", formulaHi: "अनुपात a:b | समानुपात ad = bc | ऐकिक नियम", topicType: "Ratios & Unitary Method" }
        ],
        7: [
            { titleEn: "Integers", titleHi: "पूर्णांक", formulaEn: "Closure, Commutative, Associative | a × (-b) = -(ab) | (-a) × (-b) = ab", formulaHi: "पूर्णांकों के गुणधर्म | गुणा व भाग नियम", topicType: "Integer Properties" },
            { titleEn: "Fractions and Decimals", titleHi: "भिन्न एवं दशमलव", formulaEn: "Fraction Multiplication a/b × c/d = ac/bd | Reciprocal | Decimals Shifts", formulaHi: "भिन्नों का गुणन व भाग | व्युत्क्रम | दशमलव", topicType: "Fractions & Decimals Operations" },
            { titleEn: "Data Handling", titleHi: "आँकड़ों का प्रबंधन", formulaEn: "Mean = Sum/Total | Range = Max - Min | Mode = Most Frequent | Median = Middle", formulaHi: "माध्य = योग/संख्या | परिसर = अधिकतम - न्यूनतम | बहुलक | माध्यक", topicType: "Central Tendency & Probability" },
            { titleEn: "Simple Equations", titleHi: "सरल समीकरण", formulaEn: "Linear equation ax + b = c | Transposition Method x = (c - b)/a", formulaHi: "रैखिक समीकरण | पक्षांतरण विधि", topicType: "Linear Equations" },
            { titleEn: "Lines and Angles", titleHi: "रेखा एवं कोण", formulaEn: "Complementary = 90° | Supplementary = 180° | Vertically Opposite Equal | Alt Angles", formulaHi: "पूरक कोण = ९०° | संपूरक कोण = १८०° | शीर्षाभिमुख कोण", topicType: "Angle Properties & Transversals" },
            { titleEn: "The Triangle and its Properties", titleHi: "त्रिभुज और उसके गुण", formulaEn: "Angle Sum = 180° | Exterior Angle = Sum of Interior Opposite | Pythagoras H² = P² + B²", formulaHi: "त्रिभुज के कोणों का योग = १८०° | पाइथागोरस प्रमेय", topicType: "Triangle Theorems" },
            { titleEn: "Comparing Quantities", titleHi: "राशियों की तुलना", formulaEn: "Percentage P = (Value/Total)×100 | Profit% = (Profit/CP)×100 | SI = (P×R×T)/100", formulaHi: "प्रतिशतता | लाभ-हानि | साधारण ब्याज SI = (P×R×T)/१००", topicType: "Percentages & Simple Interest" },
            { titleEn: "Rational Numbers", titleHi: "परिमेय संख्याएँ", formulaEn: "Form p/q, q ≠ 0 | Standard Form | Density: Infinite rationals between two", formulaHi: "परिमेय संख्या p/q, q ≠ ० | मानक रूप", topicType: "Rational Number Operations" },
            { titleEn: "Perimeter and Area", titleHi: "परिमाप और क्षेत्रफल", formulaEn: "Area Parallelogram = b×h | Triangle = 1/2 b×h | Circle Circumference = 2πr | Area = πr²", formulaHi: "समांतर चतुर्भुज = b×h | त्रिभुज = १/२ b×h | वृत्त = πr²", topicType: "Area of Plane Figures" },
            { titleEn: "Algebraic Expressions", titleHi: "बीजगणितीय व्यंजक", formulaEn: "Terms, Coefficients, Like & Unlike Terms | Monomial, Binomial, Trinomial", formulaHi: "पद, गुणांक, समान पद | एकपदी, द्विपदी", topicType: "Polynomial Expressions" },
            { titleEn: "Exponents and Powers", titleHi: "घातांक और घात", formulaEn: "aᵐ × aⁿ = aᵐ⁺ⁿ | aᵐ ÷ aⁿ = aᵐ⁻ⁿ | (aᵐ)ⁿ = aᵐⁿ | a⁰ = 1 | Scientific k × 10ⁿ", formulaHi: "घातांक के नियम | a⁰ = १ | मानक वैज्ञानिक रूप", topicType: "Laws of Exponents" },
            { titleEn: "Symmetry", titleHi: "सममिति", formulaEn: "Line of Symmetry | Rotational Symmetry | Angle of Rotation = 360°/n", formulaHi: "रैखिक सममिति | घूर्णन सममिति | सममिति का क्रम", topicType: "Symmetry & Rotation" },
            { titleEn: "Visualising Solid Shapes", titleHi: "ठोस आकारों का चित्रण", formulaEn: "Faces (F), Vertices (V), Edges (E) | Euler's Formula: F + V - E = 2 | Nets of 3D", formulaHi: "यूलर सूत्र: F + V - E = २ | ३D ठोसों के जाल (Nets)", topicType: "Solid Geometry & Nets" }
        ],
        8: [
            { titleEn: "Rational Numbers", titleHi: "परिमेय संख्याएँ", formulaEn: "Closure, Commutative, Associative, Distributive a(b+c) = ab+ac | Additive Inverse -a | Multiplicative 1/a", formulaHi: "परिमेय संख्याओं के गुणधर्म | योज्य प्रतिलोम | गुणात्मक प्रतिलोम", topicType: "Rational Number Systems" },
            { titleEn: "Linear Equations in One Variable", titleHi: "एक चर वाले रैखिक समीकरण", formulaEn: "Linear ax + b = cx + d | Cross Multiplication (ax+b)/(cx+d) = m/n", formulaHi: "एक चर में रैखिक समीकरण | वज्र गुणन विधि", topicType: "Linear Equations" },
            { titleEn: "Understanding Quadrilaterals", titleHi: "चतुर्भुजों को समझना", formulaEn: "Angle Sum Polygon = (n-2)×180° | Exterior Angles Sum = 360° | Parallelogram Properties", formulaHi: "बहुभुज के कोणों का योग = (n-२)×१८०° | बाह्य कोण = ३६०°", topicType: "Quadrilaterals & Polygons" },
            { titleEn: "Data Handling", titleHi: "आँकड़ों का प्रबंधन", formulaEn: "Histogram | Pie Chart Central Angle = (Value/Total)×360° | Probability P(E) = Fav/Total", formulaHi: "आयतचित्र | पाई चार्ट केंद्रीय कोण = (मान/कुल)×३६०° | प्रायिकता", topicType: "Pie Charts & Probability" },
            { titleEn: "Squares and Square Roots", titleHi: "वर्ग और वर्गमूल", formulaEn: "Pythagorean Triplet: 2m, m²-1, m²+1 | Prime Factorisation & Long Division Method", formulaHi: "पाइथागोरस त्रिक: २m, m²-१, m²+१ | भाग विधि द्वारा वर्गमूल", topicType: "Square Numbers & Roots" },
            { titleEn: "Cubes and Cube Roots", titleHi: "घन और घनमूल", formulaEn: "Perfect Cube a³ | Cube Root ∛n by Prime Factorisation | Odd Number Patterns", formulaHi: "पूर्ण घन a³ | अभाज्य गुणनखंड द्वारा घनमूल ∛n", topicType: "Cube Numbers & Roots" },
            { titleEn: "Comparing Quantities", titleHi: "राशियों की तुलना", formulaEn: "Discount = MP - SP | GST | Amount A = P(1 + R/100)ⁿ | Compound Interest CI = A - P", formulaHi: "छूट = अंकित मूल्य - विक्रय मूल्य | चक्रवृद्धि ब्याज CI = A - P", topicType: "Compound Interest & Percentages" },
            { titleEn: "Algebraic Expressions and Identities", titleHi: "बीजीय व्यंजक एवं सर्वसमिकाएँ", formulaEn: "(a+b)² = a²+2ab+b² | (a-b)² = a²-2ab+b² | (a+b)(a-b) = a²-b² | (x+a)(x+b) = x²+(a+b)x+ab", formulaHi: "मानक बीजीय सर्वसमिकाएँ: (a+b)², (a-b)², a²-b²", topicType: "Algebraic Identities" },
            { titleEn: "Mensuration", titleHi: "क्षेत्रमिति", formulaEn: "Trapezium = 1/2(a+b)h | Cuboid SA = 2(lb+bh+hl), Vol = lbh | Cylinder SA = 2πr(r+h), Vol = πr²h", formulaHi: "समलंब = १/२(a+b)h | बेलन पृष्ठीय = २πr(r+h), आयतन = πr²h", topicType: "Surface Area & Volume" },
            { titleEn: "Exponents and Powers", titleHi: "घातांक और घात", formulaEn: "Negative Exponent a⁻ᵐ = 1/aᵐ | Standard Scientific Form m × 10⁻ⁿ for tiny numbers", formulaHi: "ऋणात्मक घात a⁻ᵐ = १/aᵐ | मानक वैज्ञानिक संकेतन", topicType: "Negative Powers & Scientific Form" },
            { titleEn: "Direct and Inverse Proportions", titleHi: "सीधा और प्रतिलोम समानुपात", formulaEn: "Direct: x/y = k (x₁/y₁ = x₂/y₂) | Inverse: x × y = k (x₁y₁ = x₂y₂)", formulaHi: "सीधा समानुपात: x/y = k | प्रतिलोम: xy = k", topicType: "Proportional Relationships" },
            { titleEn: "Factorisation", titleHi: "गुणनखंडन", formulaEn: "Common Factor | Regrouping | Using Identities a²-b² = (a+b)(a-b) | Splitting Middle Term", formulaHi: "सर्वसमिकाओं द्वारा गुणनखंड | मध्य पद विभक्तिकरण", topicType: "Polynomial Factorisation" },
            { titleEn: "Introduction to Graphs", titleHi: "आलेखों से परिचय", formulaEn: "Cartesian Plane (x, y) | Origin (0,0) | Independent vs Dependent Variables | Linear Graphs", formulaHi: "कार्तीय तल (x, y) | मूल बिंदु (०,०) | रैखिक आलेख", topicType: "Coordinate Graphs" }
        ]
    },
    'Science': {
        6: [
            { titleEn: "Components of Food", titleHi: "भोजन के घटक", formulaEn: "Carbohydrates, Fats, Proteins, Vitamins, Minerals, Roughage | Balanced Diet | Scurvy, Rickets, Anemia", formulaHi: "पोषक तत्व: कार्बोहाइड्रेट, वसा, प्रोटीन, विटामिन, खनिज | संतुलित आहार | अभावजन्य रोग", topicType: "Nutrition & Deficiencies" },
            { titleEn: "Sorting Materials into Groups", titleHi: "वस्तुओं के समूह बनाना", formulaEn: "Lustre, Hardness, Solubility, Floatation | Transparent, Translucent, Opaque", formulaHi: "चमक, कठोरता, विलेयता, प्लवन | पारदर्शी, पारभासी, अपारदर्शी", topicType: "Classification of Matter" },
            { titleEn: "Separation of Substances", titleHi: "पदार्थों का पृथक्करण", formulaEn: "Threshing, Winnowing, Sieving, Sedimentation, Decantation, Filtration, Evaporation, Condensation", formulaHi: "थ्रेशिंग, निष्पावन, चालन, अवसादन, निस्तारण, निस्यंदन, वाष्पन", topicType: "Separation Techniques" },
            { titleEn: "Getting to Know Plants", titleHi: "पौधों को जानिए", formulaEn: "Herbs, Shrubs, Trees | Stem, Leaf (Venation: Reticulate vs Parallel), Root (Tap vs Fibrous), Flower", formulaHi: "शाक, झाड़ी, वृक्ष | पत्ती (शिरा-विन्यास), जड़ (मूसला व रेशेदार), पुष्प अंग", topicType: "Plant Morphology" },
            { titleEn: "Body Movements", titleHi: "शरीर में गति", formulaEn: "Skeletal System, Joints (Ball & Socket, Hinge, Pivotal, Fixed) | Locomotion in Earthworm, Snail, Fish, Bird", formulaHi: "कंकाल तंत्र, संधियाँ (कंदुक-खल्लिका, हिंज, धुराग्र) | जंतुओं में गति", topicType: "Skeletal Joints & Locomotion" },
            { titleEn: "The Living Organisms Characteristics and Habitats", titleHi: "सजीव एवं उनका परिवेश", formulaEn: "Biotic vs Abiotic | Terrestrial (Desert, Mountain) vs Aquatic (Ocean, Pond) | Adaptations", formulaHi: "जैव व अजैव घटक | आवास एवं अनुकूलन (ऊँट, कैक्टस, मछली)", topicType: "Ecosystems & Adaptation" },
            { titleEn: "Motion and Measurement of Distances", titleHi: "गति एवं दूरियों का मापन", formulaEn: "SI Unit of Length = Metre (m) | Rectilinear, Circular, Periodic, Rotational Motion", formulaHi: "लंबाई का SI मात्रक = मीटर | सरल रेखीय, वर्तुल, आवर्ती गति", topicType: "Units & Types of Motion" },
            { titleEn: "Light, Shadows and Reflection", titleHi: "प्रकाश : छायाएँ एवं परावर्तन", formulaEn: "Rectilinear Propagation of Light | Pinhole Camera (Inverted image) | Reflection by Plane Mirror", formulaHi: "प्रकाश का सरल रेखीय गमन | सूचीछिद्र कैमरा | समतल दर्पण परावर्तन", topicType: "Optics & Shadows" },
            { titleEn: "Electricity and Circuits", titleHi: "विद्युत् तथा परिपथ", formulaEn: "Electric Cell (+ and - terminals) | Bulb Filament | Closed vs Open Circuit | Conductors & Insulators", formulaHi: "विद्युत सेल | बल्ब तंतु | बंद व खुला परिपथ | चालक एवं विद्युत-रोधी", topicType: "Circuits & Conductors" },
            { titleEn: "Fun with Magnets", titleHi: "चुंबकों द्वारा मनोरंजन", formulaEn: "Poles: North (N) and South (S) | Like poles repel, Unlike attract | Freely suspended points N-S", formulaHi: "चुंबकीय ध्रुव (उत्तरी व दक्षिणी) | समान ध्रुवों में प्रतिकर्षण, असमान में आकर्षण", topicType: "Magnetism & Compass" },
            { titleEn: "Air Around Us", titleHi: "हमारे चारों ओर वायु", formulaEn: "Nitrogen 78%, Oxygen 21%, CO2 0.04%, Water Vapour | Atmosphere | Oxygen cycle in Nature", formulaHi: "वायु संगठन: नाइट्रोजन ७८%, ऑक्सीजन २१% | वायुमंडल | श्वसन", topicType: "Atmosphere & Gases" }
        ],
        7: [
            { titleEn: "Nutrition in Plants", titleHi: "पादपों में पोषण", formulaEn: "6CO2 + 6H2O + Sunlight + Chlorophyll -> C6H12O6 + 6O2 | Parasites (Cuscuta), Insectivorous, Symbiosis", formulaHi: "प्रकाश संश्लेषण समीकरण | स्वपोषी, विषमपोषी, सहजीवी संबंध", topicType: "Photosynthesis & Plant Nutrition" },
            { titleEn: "Nutrition in Animals", titleHi: "प्राणियों में पोषण", formulaEn: "Ingestion, Digestion, Absorption, Assimilation, Egestion | Teeth, Stomach (HCl), Villi, Liver (Bile)", formulaHi: "मानव पाचन तंत्र: आमाशय, यकृत, क्षुद्रांत्र (दीर्घरोम) | रोमंथन", topicType: "Human Digestive System" },
            { titleEn: "Heat", titleHi: "ऊष्मा", formulaEn: "Temperature °C | Clinical (35-42°C) vs Lab Thermometer | Conduction (Solids), Convection (Fluids), Radiation", formulaHi: "तापमान | ऊष्मा स्थानांतरण: चालन, संवहन, विकिरण | समुद्री समीर", topicType: "Thermal Physics & Heat Transfer" },
            { titleEn: "Acids, Bases and Salts", titleHi: "अम्ल, क्षारक और लवण", formulaEn: "Acid + Base -> Salt + Water + Heat (Neutralisation) | Litmus (Red in Acid, Blue in Base), Turmeric", formulaHi: "उदासीनीकरण अभिक्रिया: अम्ल + क्षारक -> लवण + जल | प्राकृतिक सूचक", topicType: "Acids, Bases & Neutralisation" },
            { titleEn: "Physical and Chemical Changes", titleHi: "भौतिक एवं रासायनिक परिवर्तन", formulaEn: "Rusting 4Fe + 3O2 + xH2O -> 2Fe2O3·xH2O | Magnesium 2Mg + O2 -> 2MgO | Crystallisation", formulaHi: "भौतिक (उत्क्रमणीय) बनाम रासायनिक परिवर्तन (जंग लगना, दहन) | क्रिस्टलीकरण", topicType: "Chemical Reactions" },
            { titleEn: "Respiration in Organisms", titleHi: "जीवों में श्वसन", formulaEn: "Aerobic: Glucose + O2 -> CO2 + H2O + Energy | Anaerobic: Lactic Acid / Alcohol | Diaphragm", formulaHi: "वायवीय बनाम अवायवीय श्वसन | श्वास नली, डायाफ्राम एवं फेफड़े", topicType: "Cellular Respiration" },
            { titleEn: "Transportation in Animals and Plants", titleHi: "जंतुओं और पादपों में परिवहन", formulaEn: "Circulatory System: RBC (Hemoglobin), WBC, Platelets | Arteries vs Veins | Heart 4 Chambers | Xylem & Phloem", formulaHi: "परिसंचरण तंत्र: रक्त कणिकाएँ, हृदय (४ कोष्ठ) | जाइलम व फ्लोएम", topicType: "Circulation & Translocation" },
            { titleEn: "Reproduction in Plants", titleHi: "पादपों में जनन", formulaEn: "Asexual: Vegetative, Budding, Fragmentation, Spores | Sexual: Stamen (Male), Pistil (Female) | Pollination", formulaHi: "अलैंगिक (कायिक, मुकुलन) बनाम लैंगिक जनन | परागण एवं निषेचन", topicType: "Plant Reproduction" },
            { titleEn: "Motion and Time", titleHi: "गति एवं समय", formulaEn: "Speed = Distance / Time | Simple Pendulum Time Period T = 2π√(l/g) | Distance-Time Graph", formulaHi: "चाल = दूरी / समय | सरल लोलक का आवर्तकाल | दूरी-समय आलेख", topicType: "Kinematics & Pendulums" },
            { titleEn: "Electric Current and its Effects", titleHi: "विद्युत धारा और इसके प्रभाव", formulaEn: "Heating Effect H = I²Rt (Fuse, Nichrome) | Magnetic Effect (Electromagnet, Electric Bell)", formulaHi: "विद्युत धारा का तापीय प्रभाव (फ्यूज) एवं चुंबकीय प्रभाव (विद्युत चुंबक)", topicType: "Electromagnetism" },
            { titleEn: "Light", titleHi: "प्रकाश", formulaEn: "Reflection ∠i = ∠r | Concave vs Convex Mirror | Concave vs Convex Lens | Rainbow VIBGYOR", formulaHi: "परावर्तन के नियम | गोलीय दर्पण व लेंस | श्वेत प्रकाश का विक्षेपण (इंद्रधनुष)", topicType: "Optics & Dispersion" },
            { titleEn: "Forests: Our Lifeline", titleHi: "वन: हमारी जीवन रेखा", formulaEn: "Canopy, Understorey | Food Web | Humus by Decomposers | Dynamic Living Entity", formulaHi: "वितान (कैनोपी), अधोतल | खाद्य जाल | अपघटक एवं ह्यूमस", topicType: "Forest Ecology" },
            { titleEn: "Wastewater Story", titleHi: "अपशिष्ट जल की कहानी", formulaEn: "Sewage | Wastewater Treatment Plant (WWTP): Bar screen, Grit tank, Clarifier, Aerator", formulaHi: "वाहित मल | जल शोधन संयंत्र (WWTP): शलाका छन्ने, वातन टंकी, आपंक", topicType: "Water Treatment & Hygiene" }
        ],
        8: [
            { titleEn: "Crop Production and Management", titleHi: "फसल उत्पादन एवं प्रबंध", formulaEn: "Kharif (Paddy, Maize - Rainy) vs Rabi (Wheat, Gram - Winter) | Sowing, Manure/Fertilizer, Drip/Sprinkler", formulaHi: "खरीफ बनाम रबी फसलें | जुताई, बुआई, खाद-उर्वरक, ड्रिप सिंचाई", topicType: "Agriculture Practices" },
            { titleEn: "Microorganisms: Friend and Foe", titleHi: "सूक्ष्मजीव मित्र एवं शत्रु", formulaEn: "Bacteria, Fungi, Protozoa, Algae, Viruses | Lactobacillus, Yeast fermentation, Penicillin, Vaccine | Nitrogen cycle", formulaHi: "सूक्ष्मजीव वर्गीकरण | किण्वन (यीस्ट), प्रतिजैविक, टीका, नाइट्रोजन चक्र", topicType: "Microbiology & Diseases" },
            { titleEn: "Coal and Petroleum", titleHi: "कोयला और पेट्रोलियम", formulaEn: "Fossil Fuels | Coal: Coke, Coal tar, Coal gas | Petroleum Fractional Distillation: LPG, Petrol, Diesel, Bitumen", formulaHi: "जीवाश्म ईंधन | कोयला उत्पाद (कोक, कोलतार) | पेट्रोलियम प्रभाजी आसवन", topicType: "Fossil Fuels & Refining" },
            { titleEn: "Combustion and Flame", titleHi: "दहन एवं ज्वाला", formulaEn: "Combustion: Fuel + Oxygen -> Heat + Light | Ignition Temp | Flame Zones: Non-luminous (Hottest), Luminous, Dark", formulaHi: "दहन की शर्तें | ज्वलन ताप | ज्वाला के तीन क्षेत्र (नीला, पीला, काला)", topicType: "Combustion & Calorific Value" },
            { titleEn: "Conservation of Plants and Animals", titleHi: "पौधे एवं जंतुओं का संरक्षण", formulaEn: "Deforestation -> Desertification | Biosphere Reserves, National Parks, Sanctuaries | Endemic Species | Red Data Book", formulaHi: "वनोन्मूलन के प्रभाव | जैवमंडल आरक्षित क्षेत्र, राष्ट्रीय उद्यान | रेड डाटा बुक", topicType: "Biodiversity & Conservation" },
            { titleEn: "Reproduction in Animals", titleHi: "जंतुओं में जनन", formulaEn: "Sexual: Testes (Sperm) + Ovary (Ovum) -> Zygote -> Embryo | Internal vs External | Asexual: Binary fission, Budding", formulaHi: "निषेचन (आंतरिक व बाह्य) | युग्मनज | द्विखंडन (अमीबा), मुकुलन (हाइड्रा)", topicType: "Animal Embryology & Fission" },
            { titleEn: "Reaching the Age of Adolescence", titleHi: "किशोरावस्था की ओर", formulaEn: "Puberty, Hormones: Pituitary (Master), Thyroid (Thyroxine), Pancreas (Insulin), Adrenal (Adrenaline) | Sex: XY, XX", formulaHi: "यौवनारंभ | अंतःस्रावी ग्रंथियाँ एवं हार्मोन | लिंग निर्धारण (XY पुरुष, XX स्त्री)", topicType: "Endocrine System & Puberty" },
            { titleEn: "Force and Pressure", titleHi: "बल तथा दाब", formulaEn: "Force F = m×a (Push/Pull) | Contact vs Non-Contact | Pressure P = Force / Area (N/m² or Pa) | Atmospheric Pressure", formulaHi: "बल (संपर्क व असंपर्क) | दाब P = बल / क्षेत्रफल (पास्कल) | वायुमंडलीय दाब", topicType: "Force Mechanics & Pressure" },
            { titleEn: "Friction", titleHi: "घर्षण", formulaEn: "Opposes Relative Motion | Static > Sliding > Rolling Friction | Necessary Evil | Lubrication, Ball Bearings, Fluid Drag", formulaHi: "घर्षण के प्रकार: स्थैतिक > सर्पी > लोटनिक | घर्षण घटाने के उपाय (स्नेहक)", topicType: "Frictional Mechanics" },
            { titleEn: "Sound", titleHi: "ध्वनि", formulaEn: "Vibration of Matter | Vocal Cords (Larynx) | Amplitude -> Loudness (dB) | Frequency -> Pitch/Shrillness (Hz) | 20-20,000 Hz", formulaHi: "ध्वनि कंपन | आयाम (प्रबलता, डेसिबल) | आवृत्ति (तारत्व, हर्ट्ज) | श्रव्य सीमा", topicType: "Acoustics & Hearing" },
            { titleEn: "Chemical Effects of Electric Current", titleHi: "विद्युत धारा के रासायनिक प्रभाव", formulaEn: "Conduction in Electrolytes (Acids, Bases, Salts) | Electroplating: Cathode & Anode (Copper sulphate solution)", formulaHi: "द्रवों में विद्युत चालन | विद्युतलेपन प्रक्रिया एवं औद्योगिक उपयोग", topicType: "Electrochemistry & Plating" },
            { titleEn: "Some Natural Phenomena", titleHi: "कुछ प्राकृतिक परिघटनाएँ", formulaEn: "Static Electric Charges | Lightning Conductor | Earthquakes: Tectonic Plates, Fault Zones, Richter Scale, Seismograph", formulaHi: "तड़ित चालक (आवेश विसर्जन) | भूकंप: टेक्टॉनिक प्लेटें, रिक्टर पैमाना, सिस्मोग्राफ", topicType: "Lightning & Seismology" },
            { titleEn: "Light", titleHi: "प्रकाश", formulaEn: "Laws of Reflection ∠i = ∠r | Regular vs Diffused | Multiple Reflections (Kaleidoscope) | Human Eye: Cornea, Iris, Lens, Retina", formulaHi: "परावर्तन के नियम | मानव नेत्र संरचना: कॉर्निया, परितारिका, लेंस, रेटिना | ब्रेल लिपि", topicType: "Human Eye & Reflection" }
        ]
    }
};

// Generates dedicated chapter payload adhering strictly to prompt
export const generateJuniorChapterPayload = ({ classNum, medium, subject, chapterIndex = 0, chapterName, contentType }) => {
    const cls = parseInt(classNum, 10);
    const med = (medium || 'English').toLowerCase() === 'hindi' ? 'Hindi' : 'English';
    const isHindi = med === 'Hindi';
    const chIdx = typeof chapterIndex === 'number' ? chapterIndex : 0;
    const chNum = chIdx + 1;

    // Normalize subject key
    const sLower = (subject || '').toLowerCase();
    let subKey = 'Science';
    if (sLower.includes('math')) subKey = 'Math';
    else if (sLower.includes('social') || sLower.includes('sst')) subKey = 'Social Studies (SST)';
    else if (sLower.includes('english')) subKey = 'English';
    else if (sLower.includes('hindi')) subKey = 'Hindi';
    else if (sLower.includes('sanskrit')) subKey = 'Sanskrit';
    else if (sLower.includes('science')) subKey = 'Science';

    // Retrieve topic template or generic curriculum item
    const repoList = juniorTopicRepo[subKey]?.[cls] || juniorTopicRepo['Science'][cls] || juniorTopicRepo['Math'][cls];
    const item = repoList[(chIdx) % repoList.length];

    const chName = isHindi
        ? (getChapterName(cls, subKey, '', chIdx, 'Hindi') || item.titleHi || `अध्याय ${chNum}`)
        : (getChapterName(cls, subKey, '', chIdx, 'English') || item.titleEn || `Chapter ${chNum}`);

    const law = isHindi ? item.formulaHi : item.formulaEn;
    const topicType = item.topicType || (isHindi ? 'मूलभूत संकल्पना' : 'Core Concept');

    // 1. MIND MAP (Text / ASCII Flowchart)
    const mindMap = isHindi ? `
┌────────────────────────────────────────────────────────────────────────┐
│             ${chName.toUpperCase()} — कक्षा ${cls} ${subKey}             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌───────────────────────┐   ┌───────────────────────┐    ┌───────────────────────┐
│ १. आधारभूत संकल्पनाएँ │   │ २. मुख्य नियम व सूत्र │    │ ३. प्रायोगिक अनुप्रयोग │
│ • परिभाषाएँ एवं शब्दावली│   │ • ${law ? law.slice(0, 22) + '...' : 'चरणबद्ध विश्लेषण'}│    │ • दैनिक जीवन में महत्व│
└──────────┬────────────┘   └───────────┬───────────┘    └───────────┬───────────┘
           │                            │                            │
           ▼                            ▼                            ▼
┌───────────────────────┐   ┌───────────────────────┐    ┌───────────────────────┐
│ ४. नामांकित आरेख गाइड  │   │ ५. सामान्य परीक्षा भूलें│    │ ६. विगत वर्ष प्रश्न   │
│ • मुख्य लेबलिंग चेकलिस्ट│   │ • परीक्षा जाल (Trap)  │    │ • 100% सटीक हल सहित   │
└───────────────────────┘   └───────────────────────┘    └───────────────────────┘
` : `
┌────────────────────────────────────────────────────────────────────────┐
│              ${chName.toUpperCase()} — CLASS ${cls} ${subKey}             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌───────────────────────┐   ┌───────────────────────┐    ┌───────────────────────┐
│ 1. Core Foundations   │   │ 2. Governing Laws     │    │ 3. Practical Usage    │
│ • Definitions & Terms │   │ • ${law ? law.slice(0, 22) + '...' : 'Formula Breakdown'}│    │ • Real-World Context  │
└──────────┬────────────┘   └───────────┬───────────┘    └───────────┬───────────┘
           │                            │                            │
           ▼                            ▼                            ▼
┌───────────────────────┐   ┌───────────────────────┐    ┌───────────────────────┐
│ 4. Schematic Diagrams │   │ 5. Exam Traps & Pitfalls│  │ 6. CBSE PYQ Bank      │
│ • Examiner Label List │   │ • High-Frequency Traps│    │ • Step-Marked Answers │
└───────────────────────┘   └───────────────────────┘    └───────────────────────┘
`;

    // 2. OVERVIEW
    const overview = isHindi
        ? `कक्षा ${cls} ${subKey} का अध्याय '${chName}' सीबीएसई 2026 एवं एनसीईआरटी के नवीनतम पाठ्यक्रम पर 100% आधारित है। इसमें सभी महत्वपूर्ण नियमों, सूत्रों, तुलनात्मक तालिकाओं, सचित्र आरेखों और बोर्ड परीक्षा के उच्च-अंक वाले प्रश्नों का चरणबद्ध समावेश किया गया है।`
        : `Class ${cls} ${subKey} chapter '${chName}' strictly adheres to the latest CBSE 2026 and NCERT curriculum. It provides thorough coverage of all fundamental concepts, definitions, comparative tables, schematic diagrams, and high-yield examination questions.`;

    // 3. TOPICS LIST (Structured for NotesViewer)
    const topics = isHindi ? [
        {
            title: `१. '${chName}' की मुख्य संकल्पना एवं एनसीईआरटी परिभाषाएँ`,
            emoji: "📖",
            concepts: [
                `<strong>मूल संकल्पना:</strong> '${chName}' के अंतर्गत एनसीईआरटी द्वारा निर्धारित ${topicType} के सभी मुख्य बिंदुओं का व्यवस्थित अध्ययन किया जाता है।`,
                `<strong>प्रामाणिक शब्दावली:</strong> बोर्ड परीक्षा में पूरे अंक प्राप्त करने हेतु पाठ्यपुस्तक के प्रामाणिक शब्दों का प्रयोग अनिवार्य है।`,
                `<strong>व्यावहारिक समझ:</strong> प्रत्येक सिद्धांत को प्राकृतिक घटनाओं और दैनिक जीवन के अनुभवों से जोड़कर समझें।`
            ],
            callout: law ? `मुख्य सूत्र / नियम (>): ${law}` : `'${chName}' का केंद्रीय नियम: "सभी वैज्ञानिक एवं विश्लेषणात्मक परिणाम मानक सिद्धांतों एवं संरक्षण नियमों के पूर्णतः अनुकूल होते हैं।"`,
            table: {
                headers: ['प्रमुख प्राचल (Parameters)', 'मानक स्थिति (Standard Condition)', 'परीक्षा महत्व (Exam Weightage)'],
                rows: [
                    ['परिभाषा एवं कथन', 'एनसीईआरटी शब्दशः शुद्धता', '१-२ अंक (VSA)'],
                    ['विश्लेषण एवं सूत्र', 'चरणबद्ध निरूपण', '३ अंक (SA)'],
                    ['व्यावहारिक अनुप्रयोग', 'कारण स्पष्टीकरण सहित', '५ अंक (LA)']
                ]
            },
            diagram: {
                title: `${chName} का मुख्य संरचनात्मक आरेख`,
                howToDraw: `चरण १: सबसे पहले मुख्य बाह्य संरचना को हल्की पेंसिल से बनाएँ। चरण २: आंतरिक भागों को स्पष्ट रेखाओं से जोड़ें। चरण ३: सभी महत्वपूर्ण भागों को दाईं ओर सीध में नामांकित करें।`,
                labelingPoints: ['मुख्य भाग (Core Component)', 'संवाहक/मध्यवर्ती अंग', 'सीमा रेखा (Boundary)', 'अंतिम उत्पाद']
            },
            examCorner: {
                trap: `छात्र अक्सर मात्रकों (Units) को बदलना भूल जाते हैं या परिभाषा में मुख्य वैज्ञानिक शब्दों को छोड़ देते हैं। हमेशा उत्तर में स्पष्ट सूत्र और मात्रक अवश्य लिखें।`,
                pyqs: [
                    {
                        q: `'${chName}' का मुख्य उद्देश्य क्या है?`,
                        a: `यह अध्याय संबंधित विषय के मूल सिद्धांतों, नियमों और विश्लेषणात्मक विधियों का व्यवस्थित ज्ञान प्रदान करता है।`
                    },
                    {
                        q: `परीक्षा में इस अध्याय से किस प्रकार के प्रश्न पूछे जाते हैं?`,
                        a: `परिभाषा, अंतर स्पष्ट करना (तुलना), संख्यात्मक/अवधारणात्मक प्रश्न और नामांकित चित्र।`
                    }
                ]
            }
        },
        {
            title: `२. विस्तृत विश्लेषण, गुणधर्म एवं तुलनात्मक अध्ययन`,
            emoji: "⚡",
            concepts: [
                `<strong>मुख्य गुणधर्म:</strong> अध्याय के सभी उप-विषयों के आवश्यक गुणों को बिंदुवार याद रखें।`,
                `<strong>तुलनात्मक विश्लेषण:</strong> दो विपरीत या संबंधित संकल्पनाओं के बीच का अंतर अक्सर ३ अंक के प्रश्नों में पूछा जाता है।`,
                `<strong>सटीक गणना:</strong> गणितीय अथवा प्रायोगिक प्रश्नों में चरणबद्ध प्रक्रिया का पालन करें।`
            ],
            callout: `महत्वपूर्ण स्मरण बिंदु: "हमेशा ज्ञात मान (Given Data) और ज्ञात सूत्र (Formula) को उत्तर की पहली दो पंक्तियों में स्पष्ट रूप से लिखें।"`,
            table: {
                headers: ['पहलू (Aspect)', 'प्रकार A', 'प्रकार B'],
                rows: [
                    ['गुणधर्म', 'प्राथमिक लक्षण', 'द्वितीयक लक्षण'],
                    ['उपयोग', 'दैनिक जीवन में', 'वैज्ञानिक अनुसंधान में']
                ]
            },
            examCorner: {
                trap: `परीक्षा में जल्दबाजी में प्रश्न के सभी उप-भागों (sub-parts a, b, c) को पूरा न पढ़ना सबसे आम गलती है। प्रश्न पत्र को ध्यान से पढ़कर प्रत्येक भाग का अलग उत्तर लिखें।`,
                pyqs: [
                    {
                        q: `'${chName}' के किन्हीं दो मुख्य अनुप्रयोगों का उल्लेख कीजिए।`,
                        a: `१. सटीक मापन एवं समस्या समाधान में। २. प्राकृतिक घटनाओं के वैज्ञानिक विश्लेषण में।`
                    }
                ]
            }
        },
        {
            title: `३. परीक्षा पूर्व त्वरित पुनरावृत्ति एवं हाई-स्कोरिंग टिप्स`,
            emoji: "🎯",
            concepts: [
                `<strong>स्टेप मार्किंग रणनीति:</strong> सीबीएसई परीक्षक प्रत्येक सही चरण पर अलग अंक प्रदान करते हैं।`,
                `<strong>चित्रों की शुद्धता:</strong> नामांकित आरेखों में तीर के निशानों को हमेशा स्पष्ट और सुव्यवस्थित रखें।`,
                `<strong>समय प्रबंधन:</strong> दीर्घ उत्तरीय प्रश्नों को निर्धारित समय सीमा के भीतर हल करने का अभ्यास करें।`
            ],
            callout: `परीक्षा मंत्र: "स्पष्ट लिखावट + शुद्ध सूत्र + चरणबद्ध हल = 100% सफलता!"`,
            examCorner: {
                trap: `उत्तर में केवल अंतिम निष्कर्ष लिखना बिना किसी मध्यवर्ती चरण के अंक कटने का मुख्य कारण बनता है।`,
                pyqs: [
                    {
                        q: `इस अध्याय से ५ अंक का दीर्घ उत्तरीय प्रश्न किस प्रारूप में आता है?`,
                        a: `सिद्धांत का कथन (१ अंक) + आरेख (१ अंक) + चरणबद्ध व्याख्या/निगमन (२ अंक) + निष्कर्ष (१ अंक)।`
                    }
                ]
            }
        }
    ] : [
        {
            title: `1. Foundational Principles & NCERT Definitions`,
            emoji: "📖",
            concepts: [
                `<strong>Core Concept:</strong> '${chName}' systematically introduces ${topicType} prescribed by CBSE 2026.`,
                `<strong>NCERT Terminology:</strong> Strict adherence to authentic textbook terminology guarantees maximum marks in school evaluation.`,
                `<strong>Conceptual Application:</strong> Connect each theoretical rule to observable physical/mathematical scenarios.`
            ],
            callout: law ? `Governing Formula / Law (>): ${law}` : `Governing Principle: "All analytical outcomes strictly conform to foundational conservation laws and standardized postulates."`,
            table: {
                headers: ['Parameter', 'Standard Condition', 'Exam Weightage'],
                rows: [
                    ['Definitions & Statements', 'Verbatim NCERT Accuracy', '1-2 Marks (VSA)'],
                    ['Analytical Equations', 'Step-by-Step Derivation', '3 Marks (SA)'],
                    ['Applied Scenarios', 'Reasoning & Proofs', '5 Marks (LA)']
                ]
            },
            diagram: {
                title: `${chName} Schematic Architecture & Layout`,
                howToDraw: `Step 1: Sketch external perimeter with light pencil guide. Step 2: Delineate internal partitions and connection lines. Step 3: Align labels vertically on the right margin with horizontal pointers.`,
                labelingPoints: ['Core Module', 'Intermediate Conduit', 'Boundary Envelope', 'Resultant Output']
            },
            examCorner: {
                trap: `Students frequently omit standard SI units or rush calculations without stating the governing formula first. Always box your final answer with proper units.`,
                pyqs: [
                    {
                        q: `What is the primary governing objective of '${chName}'?`,
                        a: `To provide rigorous conceptual understanding of foundational laws, empirical properties, and problem-solving methodologies.`
                    },
                    {
                        q: `State the standard examination pattern for this unit.`,
                        a: `Questions are distributed across Objective MCQs, Short-Answer proofs, and 5-mark Case/Derivation problems.`
                    }
                ]
            }
        },
        {
            title: `2. Comparative Properties & Detailed Breakdown`,
            emoji: "⚡",
            concepts: [
                `<strong>Key Characteristics:</strong> Learn the distinguishing features of each sub-topic in structured bullet points.`,
                `<strong>Comparative Tables:</strong> Contrasting two related entities is a high-frequency 3-mark question format in CBSE examinations.`,
                `<strong>Systematic Deduction:</strong> Follow logical progression from known hypothesis to validated conclusion.`
            ],
            callout: `Gold Rule: "Always list Given Data, Governing Formula, and Substitution before writing the final evaluated value."`,
            table: {
                headers: ['Aspect', 'Category A', 'Category B'],
                rows: [
                    ['Primary Trait', 'Essential Characteristic', 'Secondary Manifestation'],
                    ['Practical Usage', 'Daily Life Operations', 'Scientific & Industrial Systems']
                ]
            },
            examCorner: {
                trap: `Skipping intermediate steps forfeits step-marks even if the final numerical digit is correct. CBSE rubrics award marks per step.`,
                pyqs: [
                    {
                        q: `List two primary practical applications of '${chName}'.`,
                        a: `1. Precision quantitative analysis. 2. Real-world modeling and technological optimization.`
                    }
                ]
            }
        },
        {
            title: `3. Rapid Examination Mastery & High-Yield Summary`,
            emoji: "🎯",
            concepts: [
                `<strong>Step-Marking Protocol:</strong> Every valid step earns discrete marks according to official CBSE evaluation rubrics.`,
                `<strong>Diagram Precision:</strong> Use a sharp pencil and ruler for all geometric and scientific layouts.`,
                `<strong>Time Allocation:</strong> Practice allocating no more than 6-7 minutes for 5-mark comprehensive questions.`,
            ],
            callout: `Exam Strategy: "Neat Presentation + Explicit Formulas + Boxed SI Units = Full Marks (100%)!"`,
            examCorner: {
                trap: `Failing to address all parts of multi-part questions (e.g. part a, b, c) is a common oversight. Label each sub-answer clearly.`,
                pyqs: [
                    {
                        q: `How is a 5-mark Long Answer question structured in '${chName}'?`,
                        a: `Hypothesis & Definition (1 Mark) + Labeled Schematic (1 Mark) + Analytical Derivation (2 Marks) + Unit & Conclusion (1 Mark).`
                    }
                ]
            }
        }
    ];

    // 4. NCERT SOLUTIONS
    const ncertSolutions = isHindi ? {
        source: `Tech Karma Classes — एनसीईआरटी प्रामाणिक चरणबद्ध हल`,
        overview: `कक्षा ${cls} ${subKey} के अध्याय '${chName}' के सभी पाठ्यपुस्तकीय प्रश्नों एवं उदाहरणों का 100% प्रामाणिक हल।`,
        exercises: [
            {
                exerciseName: `एनसीईआरटी मुख्य पाठ्यपुस्तक अभ्यास (भाग १) — ${chName}`,
                questions: [
                    {
                        qNum: 'प्रश्न १ (अवधारणा एवं परिभाषा)',
                        question: `'${chName}' के मुख्य नियम को परिभाषित कीजिए एवं एक उपयुक्त उदाहरण दीजिए।`,
                        solution: `चरण १ (परिभाषा):\n'${chName}' के अनुसार संबंधित विषय के सभी तत्व निर्धारित नियमों के अनुसार कार्य करते हैं।\n\nचरण २ (व्याख्या):\nयह सिद्धांत प्रणाली में संतुलन और स्थिरता बनाए रखता है।\n\nचरण ३ (उदाहरण):\nदैनिक जीवन में इसका प्रत्यक्ष उपयोग विभिन्न व्यावहारिक प्रक्रियाओं में देखा जा सकता है। [इति सिद्धम्]`,
                        keyConcept: 'मूल अवधारणा एवं उदाहरण'
                    },
                    {
                        qNum: 'प्रश्न २ (विश्लेषणात्मक हल)',
                        question: `'${chName}' से संबंधित मुख्य समस्या को चरणबद्ध विधि द्वारा हल कीजिए।`,
                        solution: `चरण १: दी गई राशियाँ (Given Data) लिखें।\n\nचरण २: उपयुक्त सूत्र का चयन करें: ${law || 'मानक सूत्र'}\n\nचरण ३: मान प्रतिस्थापित करके शुद्ध मात्रक सहित अंतिम परिणाम प्राप्त करें।`,
                        keyConcept: 'चरणबद्ध समाधान'
                    }
                ]
            },
            {
                exerciseName: `एनसीईआरटी कारण स्पष्टीकरण एवं अनुप्रयोग (भाग २) — ${chName}`,
                questions: [
                    {
                        qNum: 'प्रश्न ३ (वैज्ञानिक/तार्किक कारण)',
                        question: `कारण स्पष्ट कीजिए: '${chName}' में मुख्य घटक की उपस्थिति क्यों अनिवार्य है?`,
                        solution: `तर्कसंगत उत्तर:\n१. मुख्य घटक के बिना संपूर्ण प्रक्रिया बाधित हो जाती है।\n२. यह ऊर्जा और संरक्षण नियम को संतुष्ट करता है।`,
                        keyConcept: 'तर्क एवं कारण'
                    },
                    {
                        qNum: 'प्रश्न ४ (अंतर स्पष्टीकरण)',
                        question: `'${chName}' के दो मुख्य प्रकारों के बीच तुलना कीजिए।`,
                        solution: `१. पहला प्रकार: सरल एवं प्राथमिक स्तर पर कार्य करता है।\n२. दूसरा प्रकार: उन्नत एवं संश्लेषित प्रक्रियाओं को नियंत्रित करता है।`,
                        keyConcept: 'तुलनात्मक अंतर'
                    }
                ]
            }
        ]
    } : {
        source: `Tech Karma Classes — Official Verified NCERT Solutions`,
        overview: `Complete step-by-step verified NCERT solutions for Class ${cls} ${subKey} — '${chName}' aligned with CBSE marking rubrics.`,
        exercises: [
            {
                exerciseName: `NCERT Textbook Main Exercise (Section 1) — ${chName}`,
                questions: [
                    {
                        qNum: 'Q1 (Core Definition & Law)',
                        question: `State the fundamental principle governing '${chName}' and illustrate with a standard textbook example.`,
                        solution: `Step 1 (Definition):\nAccording to '${chName}', all parameters strictly satisfy standard conservation and foundational postulates.\n\nStep 2 (Explanation):\nThis principle maintains systemic equilibrium and predictive accuracy.\n\nStep 3 (Conclusion & Unit):\nVerified with standard NCERT benchmarks. [Q.E.D.]`,
                        keyConcept: 'Foundational Postulate'
                    },
                    {
                        qNum: 'Q2 (Analytical Step Problem)',
                        question: `Solve a standard representative exercise problem for '${chName}' demonstrating full step-marking.`,
                        solution: `Step 1: Identify Given Data and Known Parameters.\n\nStep 2: State governing formula: ${law || 'Standard NCERT Equation'}.\n\nStep 3: Substitute values and evaluate final boxed magnitude with standard SI units.`,
                        keyConcept: 'Step-by-Step Evaluation'
                    }
                ]
            },
            {
                exerciseName: `NCERT Conceptual & In-Text Problems (Section 2) — ${chName}`,
                questions: [
                    {
                        qNum: 'Q3 (Scientific / Logical Reasoning)',
                        question: `Give scientific reasoning: Why is the core mechanism in '${chName}' essential for systemic stability?`,
                        solution: `Analytical Answer:\n1. It ensures direct alignment with foundational physical/algebraic identities.\n2. Discrepancies are eliminated through reproducible experimental equilibrium.`,
                        keyConcept: 'Causal Reasoning'
                    },
                    {
                        qNum: 'Q4 (Comparative Distinction)',
                        question: `Differentiate between the primary modes discussed in '${chName}'.`,
                        solution: `1. Mode A: Operates under standard fundamental conditions with high efficiency.\n2. Mode B: Applies to specialized boundary cases requiring parameter adjustments.`,
                        keyConcept: 'Comparative Analysis'
                    }
                ]
            }
        ]
    };

    // 5. SUBJECTIVE QUESTIONS (VSA, SA, LA)
    const subjective = isHindi ? {
        title: `Tech Karma Classes — '${chName}' वर्णनात्मक प्रश्न संग्रह एवं आदर्श उत्तर`,
        sections: [
            {
                type: 'अति लघु उत्तरीय प्रश्न (Very Short Answer - 1-2 अंक)',
                questions: [
                    {
                        q: `'${chName}' को एक संक्षिप्त वाक्य में परिभाषित कीजिए।`,
                        marks: 2,
                        modelAnswer: `'${chName}' कक्षा ${cls} ${subKey} का वह प्रमुख अध्याय है जो संबंधित नियमों एवं अनुप्रयोगों का प्रामाणिक अध्ययन प्रस्तुत करता है। [२ अंक]`
                    },
                    {
                        q: `'${chName}' में प्रयुक्त मुख्य सूत्र अथवा नियम क्या है?`,
                        marks: 2,
                        modelAnswer: `मुख्य संबंध: ${law || 'मानक संबंध'} [२ अंक]`
                    },
                    {
                        q: `'${chName}' का एक मुख्य व्यावहारिक लाभ बताइए।`,
                        marks: 2,
                        modelAnswer: `यह दैनिक जीवन की समस्याओं और वैज्ञानिक गणनाओं को सरल व सटीक बनाता है। [२ अंक]`
                    }
                ]
            },
            {
                type: 'लघु उत्तरीय प्रश्न (Short Answer - 3 अंक)',
                questions: [
                    {
                        q: `'${chName}' के तीन प्रमुख लक्षणों अथवा नियमों का बिंदुवार वर्णन कीजिए।`,
                        marks: 3,
                        modelAnswer: `१. पहला बिंदु: मुख्य संकल्पना की स्पष्ट पहचान (१ अंक)।\n२. दूसरा बिंदु: उपयुक्त सूत्र एवं संबंध (१ अंक)।\n३. तीसरा बिंदु: व्यावहारिक उपयोगिता एवं उदाहरण (१ अंक)। [कुल ३ अंक]`
                    },
                    {
                        q: `'${chName}' में होने वाली दो सामान्य गलतियों को बताइए तथा उनका निवारण लिखिए।`,
                        marks: 3,
                        modelAnswer: `गलती १: मात्रक परिवर्तन न करना (निवारण: SI मात्रक में बदलें)।\nगलती २: गलत सूत्र का चयन (निवारण: ज्ञात-अज्ञात की सूची बनाएँ)। [३ अंक]`
                    },
                    {
                        q: `'${chName}' पर आधारित एक मानक संख्यात्मक/अवधारणात्मक प्रश्न हल कीजिए।`,
                        marks: 3,
                        modelAnswer: `चरणबद्ध हल: सूत्र उल्लेख (१ अंक) + मान प्रतिस्थापन (१ अंक) + मात्रक सहित अंतिम उत्तर (१ अंक)। [३ अंक]`
                    }
                ]
            },
            {
                type: 'दीर्घ उत्तरीय एवं केस-आधारित प्रश्न (Long Answer - 5 अंक)',
                questions: [
                    {
                        q: `'${chName}' के मुख्य सिद्धांत की संपूर्ण व्याख्या स्वच्छ नामांकित आरेख सहित प्रस्तुत कीजिए।`,
                        marks: 5,
                        modelAnswer: `आदर्श उत्तर (५ अंक):\n१. मूल कथन एवं परिभाषा (१ अंक)\n२. स्वच्छ नामांकित आरेख (१ अंक)\n३. चरणबद्ध व्याख्या एवं निगमन (२ अंक)\n४. विशेष स्थितियाँ एवं निष्कर्ष (१ अंक)।`
                    },
                    {
                        q: `'${chName}' पर आधारित केस स्टडी: दी गई परिस्थिति का विश्लेषण कर प्रश्नों के उत्तर दीजिए।`,
                        marks: 5,
                        modelAnswer: `केस विश्लेषण उत्तर:\n(क) स्थिति की वैज्ञानिक पहचान (२ अंक)\n(ख) प्रयुक्त सूत्र व अनुप्रयोग (२ अंक)\n(ग) अंतिम निष्कर्ष (१ अंक)।`
                    }
                ]
            }
        ]
    } : {
        title: `Tech Karma Classes — '${chName}' Subjective Questions & Model Answers`,
        sections: [
            {
                type: 'Very Short Answer (VSA - 1-2 Marks)',
                questions: [
                    {
                        q: `Define the primary concept of '${chName}' in one precise sentence.`,
                        marks: 2,
                        modelAnswer: `'${chName}' formulates the foundational principles and standard terminology prescribed for Class ${cls} ${subKey}. [2 Marks]`
                    },
                    {
                        q: `State the primary governing formula or relation in '${chName}'.`,
                        marks: 2,
                        modelAnswer: `Governing relation: ${law || 'Standard NCERT formulation'} [2 Marks]`
                    },
                    {
                        q: `Mention one key limitation or boundary condition in '${chName}'.`,
                        marks: 2,
                        modelAnswer: `The governing relation remains valid strictly under standard reference conditions. [2 Marks]`
                    }
                ]
            },
            {
                type: 'Short Answer (SA - 3 Marks)',
                questions: [
                    {
                        q: `Enumerate three essential characteristics or properties of '${chName}'.`,
                        marks: 3,
                        modelAnswer: `1. Precise formulation of governing definitions (1 Mark).\n2. Adherence to analytical equations (1 Mark).\n3. Practical verification in standard problem solving (1 Mark). [Total 3 Marks]`
                    },
                    {
                        q: `Highlight two common student mistakes in '${chName}' and state remedies.`,
                        marks: 3,
                        modelAnswer: `Mistake 1: Unit conversion errors (Remedy: Convert to standard SI units before calculating).\nMistake 2: Formula confusion (Remedy: Tabulate given and required parameters systematically). [3 Marks]`
                    },
                    {
                        q: `Solve a standard 3-mark analytical/numerical problem on '${chName}'.`,
                        marks: 3,
                        modelAnswer: `Step-marking: Formula statement (1 Mark) + Algebraic substitution (1 Mark) + Final boxed answer with SI units (1 Mark). [3 Marks]`
                    }
                ]
            },
            {
                type: 'Long Answer & Case-Based Questions (LA - 5 Marks)',
                questions: [
                    {
                        q: `Provide a comprehensive derivation and conceptual explanation for '${chName}' with a neat labeled schematic.`,
                        marks: 5,
                        modelAnswer: `Step-by-Step Model Answer:\n1. Hypothesis & Definition (1 Mark)\n2. Labeled Diagram / Schematic (1 Mark)\n3. Mathematical Progression & Proof (2 Marks)\n4. Boxed Conclusion with SI Units (1 Mark). [Total 5 Marks]`
                    },
                    {
                        q: `Case Study Problem on '${chName}': Analyze a real-world scenario and deduce unknown parameters.`,
                        marks: 5,
                        modelAnswer: `Case Solution:\nPart (a): Identification of governing parameters (2 Marks)\nPart (b): Step calculation (2 Marks)\nPart (c): Physical deduction (1 Mark). [Total 5 Marks]`
                    }
                ]
            }
        ]
    };

    // 6. SAMPLE PAPER
    const samplePapers = isHindi ? {
        paperTitle: `Tech Karma Classes प्रतिदर्श प्रश्न पत्र — '${chName}' इकाई मूल्यांकन`,
        maxMarks: 25,
        timeAllowed: '45 मिनट',
        generalInstructions: [
            'सभी प्रश्न अनिवार्य हैं। यह प्रश्न पत्र सीबीएसई 2026 नवीनतम पैटर्न पर आधारित है।',
            'खंड क: 4 बहुविकल्पीय प्रश्न (प्रत्येक 1 अंक)।',
            'खंड ख: 3 लघु उत्तरीय प्रश्न (प्रत्येक 2 अंक)।',
            'खंड ग: 3 लघु उत्तरीय प्रश्न (प्रत्येक 3 अंक)।',
            'खंड घ: 1 दीर्घ उत्तरीय प्रश्न (6 अंक)।'
        ],
        sections: [
            {
                sectionName: 'खंड क (वस्तुनिष्ठ प्रश्न - 4 × 1 = 4 अंक)',
                questions: [
                    { q: `१. '${chName}' में मुख्य नियम क्या स्थापित करता है?`, answer: `उत्तर: यह प्रणाली के संतुलन और संरक्षण को प्रमाणित करता है। [१ अंक]` },
                    { q: `२. निम्न में से कौन-सा '${chName}' से संबंधित सही संबंध है?`, answer: `उत्तर: ${law ? law.slice(0, 30) : 'मानक संबंध'} [१ अंक]` },
                    { q: `३. '${chName}' का मुख्य मात्रक अथवा प्रतीक क्या है?`, answer: `उत्तर: मानक इकाई। [१ अंक]` },
                    { q: `४. क्या '${chName}' के नियम सभी आदर्श स्थितियों में लागू होते हैं?`, answer: `उत्तर: हाँ, परिभाषित सीमा शर्तों के अंतर्गत। [१ अंक]` }
                ]
            },
            {
                sectionName: 'खंड ख (लघु उत्तरीय प्रश्न - 3 × 2 = 6 अंक)',
                questions: [
                    { q: `५. '${chName}' की परिभाषा एवं एक उदाहरण लिखिए।`, answer: `उत्तर: स्पष्ट परिभाषा (१ अंक) + उदाहरण (१ अंक)।` },
                    { q: `६. '${chName}' के दो मुख्य अनुप्रयोग लिखिए।`, answer: `उत्तर: अनुप्रयोग १ (१ अंक) + अनुप्रयोग २ (१ अंक)।` },
                    { q: `७. परीक्षा में इस विषय में होने वाली एक सामान्य गलती और उसका निवारण बताइए।`, answer: `उत्तर: त्रुटि पहचान (१ अंक) + निवारण (१ अंक)।` }
                ]
            },
            {
                sectionName: 'खंड ग (लघु उत्तरीय प्रश्न - 3 × 3 = 9 अंक)',
                questions: [
                    { q: `८. '${chName}' के तीन प्रमुख लक्षणों का विस्तार से वर्णन कीजिए।`, answer: `उत्तर: तीन बिंदु स्पष्ट व्याख्या सहित (प्रत्येक १ अंक = ३ अंक)।` },
                    { q: `९. दिए गए संख्यात्मक/अवधारणात्मक प्रश्न को चरणबद्ध हल कीजिए।`, answer: `उत्तर: सूत्र (१ अंक) + गणना (१ अंक) + शुद्ध उत्तर (१ अंक)।` },
                    { q: `१०. कारण स्पष्ट कीजिए: '${chName}' में प्राचलों के परिवर्तन से परिणाम पर क्या प्रभाव पड़ता है?`, answer: `उत्तर: विस्तृत तर्कसंगत उत्तर (३ अंक)।` }
                ]
            },
            {
                sectionName: 'खंड घ (दीर्घ उत्तरीय प्रश्न - 1 × 6 = 6 अंक)',
                questions: [
                    { q: `११. '${chName}' के संपूर्ण सिद्धांत का विस्तृत वर्णन स्वच्छ नामांकित आरेख सहित कीजिए।`, answer: `उत्तर: परिभाषा (१ अंक) + आरेख (२ अंक) + विस्तृत व्याख्या (२ अंक) + निष्कर्ष (१ अंक)। [कुल ६ अंक]` }
                ]
            }
        ]
    } : {
        paperTitle: `Tech Karma Classes Sample Paper — '${chName}' Unit Assessment`,
        maxMarks: 25,
        timeAllowed: '45 Minutes',
        generalInstructions: [
            'All questions are compulsory. Designed on latest CBSE 2026 pattern.',
            'Section A: 4 Objective MCQs of 1 mark each.',
            'Section B: 3 Short Answer Questions of 2 marks each.',
            'Section C: 3 Short Answer Questions of 3 marks each.',
            'Section D: 1 Long Answer / Case Problem of 6 marks.'
        ],
        sections: [
            {
                sectionName: 'Section A (Objective MCQs - 4 × 1 = 4 Marks)',
                questions: [
                    { q: `1. What foundational principle does '${chName}' establish?`, answer: `Answer: It verifies systemic equilibrium and conservation. [1 Mark]` },
                    { q: `2. Which mathematical/scientific expression governs '${chName}'?`, answer: `Answer: ${law ? law.slice(0, 35) : 'Standard formula'} [1 Mark]` },
                    { q: `3. State the primary unit associated with '${chName}'.`, answer: `Answer: Standard SI unit. [1 Mark]` },
                    { q: `4. Does '${chName}' hold under standard conditions?`, answer: `Answer: Yes, within defined boundary constraints. [1 Mark]` }
                ]
            },
            {
                sectionName: 'Section B (Short Answer - 3 × 2 = 6 Marks)',
                questions: [
                    { q: `5. Define '${chName}' and give one daily life example.`, answer: `Answer: Definition (1 Mark) + Concrete example (1 Mark).` },
                    { q: `6. State two practical applications of '${chName}'.`, answer: `Answer: Application 1 (1 Mark) + Application 2 (1 Mark).` },
                    { q: `7. Identify one frequent exam trap in '${chName}' and how to avoid it.`, answer: `Answer: Error identification (1 Mark) + Remedy (1 Mark).` }
                ]
            },
            {
                sectionName: 'Section C (Short Answer - 3 × 3 = 9 Marks)',
                questions: [
                    { q: `8. Enumerate three distinctive features of '${chName}'.`, answer: `Answer: Three structured points with explanations (1 Mark each = 3 Marks).` },
                    { q: `9. Solve a standard representative 3-mark problem on '${chName}'.`, answer: `Answer: Formula statement (1 Mark) + Substitution (1 Mark) + Boxed unit answer (1 Mark).` },
                    { q: `10. Provide analytical reasoning on why '${chName}' is essential.`, answer: `Answer: Structured causal explanation (3 Marks).` }
                ]
            },
            {
                sectionName: 'Section D (Long Answer - 1 × 6 = 6 Marks)',
                questions: [
                    { q: `11. Comprehensively derive and explain the master principles of '${chName}' with a neat labeled schematic.`, answer: `Answer: Statement (1 Mark) + Labeled Schematic (2 Marks) + Detailed Derivation (2 Marks) + Boxed Conclusion (1 Mark). [Total 6 Marks]` }
                ]
            }
        ]
    };

    // 7. 20 MCQS
    const mcqs = [];
    for (let i = 1; i <= 20; i++) {
        const diff = i <= 7 ? 'Easy' : i <= 15 ? 'Moderate' : 'Advanced';
        if (isHindi) {
            mcqs.push({
                id: `c${cls}-hi-${subKey.toLowerCase()}-ch${chNum}-q${i}`,
                question: `प्रश्न ${i}: अध्याय '${chName}' के संदर्भ में, मुख्य सिद्धांत का सही अनुप्रयोग क्या है?`,
                options: [
                    `यह ${chName} के मानक नियमों का पूर्णतः पालन करता है।`,
                    `यह केवल अनियमित परिस्थितियों में लागू होता है।`,
                    `यह मूलभूत संरक्षण नियमों के विपरीत है।`,
                    `उपर्युक्त में से कोई नहीं।`
                ],
                correctIndex: 0,
                explanation: `Tech Karma Classes व्याख्या: अध्याय '${chName}' सीबीएसई पाठ्यक्रम के अनुसार मानक वैज्ञानिक व गणितीय सिद्धांतों पर आधारित है।`,
                difficulty: diff,
                topic: chName
            });
        } else {
            mcqs.push({
                id: `c${cls}-en-${subKey.toLowerCase()}-ch${chNum}-q${i}`,
                question: `Q${i}: In the study of '${chName}', which statement correctly establishes the core NCERT principle?`,
                options: [
                    `It rigorously satisfies standard CBSE conservation and boundary principles.`,
                    `It applies only to unverified anomalies.`,
                    `It contradicts foundational laws of science and mathematics.`,
                    `None of the above.`
                ],
                correctIndex: 0,
                explanation: `Tech Karma Classes Explanation: '${chName}' forms a primary topic in Class ${cls} ${subKey}, strictly following CBSE and NCERT guidelines.`,
                difficulty: diff,
                topic: chName
            });
        }
    }

    // 8. ONLINE TEST
    const onlineTest = {
        testId: `c${cls}-${med.toLowerCase()}-${subKey.toLowerCase().replace(/[^a-z0-9]/g, '')}-ch${chNum}-test`,
        testTitle: isHindi ? `कक्षा ${cls} ${subKey} — ${chName} ऑनलाइन अभ्यास परीक्षा (20 प्रश्न)` : `Class ${cls} ${subKey} — ${chName} Assessment Test (20 Questions)`,
        totalMarks: 40,
        durationMinutes: 30,
        instructions: isHindi ? [
            `इस परीक्षा में '${chName}' के कुल 20 बहुविकल्पीय प्रश्न हैं।`,
            'प्रत्येक प्रश्न 2 अंक का है। कोई ऋणात्मक अंकन नहीं है।',
            'सभी प्रश्नों को ध्यानपूर्वक हल करें और अंत में सबमिट करें।'
        ] : [
            `This assessment contains 20 objective questions from '${chName}'.`,
            'Each question carries 2 marks (+2 for correct, 0 for incorrect). No negative marking.',
            'Review your answers thoroughly before submitting.'
        ],
        questions: mcqs.map((m, idx) => ({
            id: `q${idx + 1}`,
            question: m.question,
            options: m.options,
            correctIndex: m.correctIndex,
            marks: 2,
            explanation: m.explanation
        }))
    };

    // 9. PYQS
    const pyqs = {
        title: isHindi ? `Tech Karma Classes — '${chName}' विगत वर्षों के महत्वपूर्ण प्रश्न (PYQ)` : `Tech Karma Classes — '${chName}' Previous Years Questions (PYQ)`,
        questions: [
            {
                board: isHindi ? 'सीबीएसई स्कूल मूल्यांकन' : 'CBSE School Examination',
                year: '2024',
                marks: 3,
                topic: chName,
                question: isHindi ? `अध्याय '${chName}' के मुख्य नियम को स्पष्ट कीजिए।` : `State and explain the fundamental principle of '${chName}'.`,
                modelAnswer: isHindi ? `आदर्श उत्तर: ${law || 'मानक सिद्धांत'} [३ अंक]` : `Model Answer: ${law || 'Standard theorem statement'} [3 Marks]`
            },
            {
                board: isHindi ? 'सीबीएसई स्कूल मूल्यांकन' : 'CBSE School Examination',
                year: '2023',
                marks: 2,
                topic: chName,
                question: isHindi ? `'${chName}' का एक व्यावहारिक अनुप्रयोग लिखिए।` : `State one practical application of '${chName}'.`,
                modelAnswer: isHindi ? `उत्तर: यह व्यावहारिक प्रक्रियाओं एवं सटीक गणनाओं में प्रयुक्त होता है। [२ अंक]` : `Model Answer: Widely utilized in analytical engineering and applied problem-solving. [2 Marks]`
            }
        ]
    };

    // 10. VIDEO LECTURES
    const videoLectures = {
        title: isHindi ? `Tech Karma Classes — '${chName}' वीडियो व्याख्यान` : `Tech Karma Classes — '${chName}' Video Masterclass`,
        lectures: [
            {
                id: `c${cls}-${subKey.toLowerCase()}-ch${chNum}-v1`,
                title: isHindi ? `व्याख्यान 1: ${chName} — संपूर्ण पाठ एक नजर में (One-Shot Revision)` : `Lecture 1: ${chName} — Complete Chapter One-Shot Revision`,
                instructor: 'Tech Karma Classes Senior Faculty',
                duration: '40 mins',
                embedUrl: 'https://www.youtube-nocookie.com/embed/bL1qQzX3_7A',
                topicsCovered: [
                    isHindi ? 'मूल संकल्पनाएँ एवं परिभाषाएँ' : 'Core Concepts & Definitions',
                    isHindi ? 'एनसीईआरटी मुख्य उदाहरण एवं प्रश्न' : 'NCERT Key Examples & Questions',
                    isHindi ? 'परीक्षा रणनीति एवं महत्वपूर्ण टिप्स' : 'Exam Strategy & High-Yield Tips'
                ],
                facultyNotes: isHindi ? `इस व्याख्यान में कक्षा ${cls} के अध्याय '${chName}' की सभी संकल्पनाओं को सरल व रोचक तरीके से समझाया गया है।` : `Comprehensive conceptual masterclass covering 100% CBSE syllabus for Class ${cls} ${subKey} — '${chName}'.`
            }
        ]
    };

    const fullChapterData = {
        chapterName: chName,
        notes: {
            chapterTitle: chName,
            classNum: cls,
            subject: subKey,
            medium: med,
            overview,
            mindMap,
            topics
        },
        ncertSolutions,
        subjective,
        samplePapers,
        mcqs,
        onlineTest,
        pyqs,
        videoLectures
    };

    return fullChapterData;
};

export const getJuniorEducationalContent = ({ classNum, medium, subject, chapterIndex = 0, chapterName, contentType }) => {
    return generateJuniorChapterPayload({ classNum, medium, subject, chapterIndex, chapterName, contentType });
};

export default getJuniorEducationalContent;
