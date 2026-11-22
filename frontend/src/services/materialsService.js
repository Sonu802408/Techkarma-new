// Tech Karma Classes - Dynamic Materials & Content Management Service
// Full synchronization with Admin Dashboard, Notes Cards (/notes), and Classes Pages

const STORAGE_KEY = 'techkarma_custom_materials';
const DELETED_BASE_KEY = 'techkarma_deleted_base_notes';

export const BASE_NOTES = [
    { id: 'base-305', title: 'AIML (AI & Machine Learning) Complete Notes', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 320, size: '330 MB', isPremium: false, file: 'AIML_Complete_Handwritten_Notes.pdf' },
    { id: 'base-301', title: 'Artificial Intelligence & ML Complete Notes', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 35, size: '116 KB', isPremium: false, file: 'AI_Complete_Handwritten_Notes.pdf' },
    { id: 'base-302', title: 'Cloud Computing & DevOps Complete Notes', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 32, size: '115 KB', isPremium: false, file: 'Cloud_Computing_Complete_Handwritten_Notes.pdf' },
    { id: 'base-303', title: 'Cyber Security & Ethical Hacking Notes', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 28, size: '89 KB', isPremium: false, file: 'Cyber_Security_Complete_Handwritten_Notes.pdf' },
    { id: 'base-304', title: 'Data Science & Analytics Complete Notes', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 30, size: '100 KB', isPremium: false, file: 'Data_Science_Complete_Handwritten_Notes.pdf' },
    { id: 'base-201', title: 'Volume 1: C Programming Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 76, size: '972 KB', isPremium: false, file: 'C_Programming_Complete_Handwritten_Notes.pdf' },
    { id: 'base-202', title: 'Volume 2: C++ Programming Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 84, size: '540 KB', isPremium: false, file: 'CPP_Programming_Complete_Handwritten_Notes.pdf' },
    { id: 'base-203', title: 'Volume 3: Java Programming Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 86, size: '354 KB', isPremium: false, file: 'Java_Programming_Complete_Handwritten_Notes.pdf' },
    { id: 'base-204', title: 'Volume 4: HTML & HTML5 Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 66, size: '348 KB', isPremium: false, file: 'HTML_Complete_Handwritten_Notes.pdf' },
    { id: 'base-205', title: 'Volume 5: CSS & CSS3 Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 81, size: '363 KB', isPremium: false, file: 'CSS_Complete_Handwritten_Notes.pdf' },
    { id: 'base-206', title: 'Volume 6: JavaScript (ES6+) Complete Handwritten Notes', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 91, size: '530 KB', isPremium: false, file: 'JavaScript_Complete_Handwritten_Notes.pdf' },
    { id: 'base-1', title: 'Calculus Complete Formulas', category: 'Class 12 Board', classNumber: '12', type: 'PDF', pages: 12, size: '2.4 MB', isPremium: false, file: 'class12-english-math-ch1.pdf' },
    { id: 'base-2', title: 'Python Programming Full Notes (CSE Gyan)', category: 'Programming', classNumber: 'Programming', type: 'PDF', pages: 45, size: '3.2 MB', isPremium: false, file: 'python-pre-notes-cse-gyan.pdf' },
    { id: 'base-3', title: 'Data Structures (DSA) Full Notes (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 38, size: '2.4 MB', isPremium: false, file: 'Data-Structure-DSA-pre-notes-cse-gyan.pdf' },
    { id: 'base-4', title: 'Operating Systems (OS) Full Notes (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 52, size: '3.6 MB', isPremium: false, file: 'OS-pre-notes-cse-gyan.pdf' },
    { id: 'base-5', title: 'DBMS Database Systems Full Notes (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 64, size: '8.0 MB', isPremium: false, file: 'DBMS-pre-notes-cse-gyan.pdf' },
    { id: 'base-6', title: 'Computer Networks Complete Notes (Tech Karma)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 58, size: '2.2 MB', isPremium: false, file: 'CN_Tech_Karma_Complete_Notes.pdf' },
    { id: 'base-28', title: 'Compiler Design Complete Notes (Tech Karma)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 113, size: '600 MB', isPremium: false, file: 'Compiler_Design_Notes.pdf' },
    { id: 'base-7', title: 'Class 10 Science Full NCERT Notes', category: 'Class 10', classNumber: '10', type: 'PDF', pages: 85, size: '8.2 MB', isPremium: false, file: 'class10-english-science-ch1.pdf' },
    { id: 'base-8', title: 'JEE Main Physics Mechanics', category: 'Competitive', classNumber: 'Competitive', type: 'PDF', pages: 68, size: '10.5 MB', isPremium: true, file: 'class11-english-physics-ch1.pdf' },
    { id: 'base-9', title: 'English Grammar Rules', category: 'All', classNumber: 'All', type: 'PDF', pages: 30, size: '4.2 MB', isPremium: false, file: 'class10-english-english-ch1.pdf' },
    { id: 'base-10', title: 'Ch 1: Introduction & Network Fundamentals (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '420 KB', isPremium: false, file: 'csegyan-computer-networks-ch1.pdf' },
    { id: 'base-11', title: 'Ch 2: OSI Model and TCP/IP (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '415 KB', isPremium: false, file: 'csegyan-computer-networks-ch2.pdf' },
    { id: 'base-12', title: 'Ch 3: Data Link Layer (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '450 KB', isPremium: false, file: 'csegyan-computer-networks-ch3.pdf' },
    { id: 'base-13', title: 'Ch 4: Network Layer & Routing (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '430 KB', isPremium: false, file: 'csegyan-computer-networks-ch4.pdf' },
    { id: 'base-14', title: 'Ch 5: Transport Layer (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '390 KB', isPremium: false, file: 'csegyan-computer-networks-ch5.pdf' },
    { id: 'base-15', title: 'Ch 6: Application Layer & Security (CSE Gyan)', category: 'Core CS', classNumber: 'Computer & Programming', type: 'PDF', pages: 2, size: '410 KB', isPremium: false, file: 'csegyan-computer-networks-ch6.pdf' }
];

export const getDeletedBaseNoteIds = () => {
    try {
        const stored = localStorage.getItem(DELETED_BASE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

export const setDeletedBaseNoteIds = (ids) => {
    try {
        localStorage.setItem(DELETED_BASE_KEY, JSON.stringify(ids));
        window.dispatchEvent(new Event('techkarma_materials_updated'));
    } catch (e) {}
};

export const getLocalMaterials = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

export const setLocalMaterials = (list) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        window.dispatchEvent(new Event('techkarma_materials_updated'));
    } catch (e) {}
};

// Returns ALL notes cards active for the /notes page and cards view
export const getAllNotesForCards = () => {
    const deletedIds = getDeletedBaseNoteIds();
    const activeBase = BASE_NOTES.filter(b => !deletedIds.includes(b.id) && !deletedIds.includes(b.title));

    const custom = getLocalMaterials();
    // Filter custom items that are notes or PDFs
    const customNotes = custom
        .filter(m => m.type === 'Notes' || m.type === 'PDF' || m.type === 'NCERT Solutions' || m.type === 'Sample Papers')
        .map(m => {
            let cat = 'Class 10';
            if (m.classNumber === '12') cat = 'Class 12 Board';
            else if (m.classNumber === '11') cat = 'Class 11';
            else if (m.classNumber === '10') cat = 'Class 10';
            else if (m.classNumber === '9') cat = 'Class 9';
            else if (m.classNumber === '8' || m.classNumber === '7' || m.classNumber === '6') cat = `Class ${m.classNumber}`;
            else if (m.classNumber?.includes('Programming')) cat = 'Programming';
            else if (m.classNumber?.includes('Computer')) cat = 'Core CS';

            return {
                id: m._id || m.id,
                title: m.title,
                category: cat,
                classNumber: m.classNumber || '10',
                subjectName: m.subjectName || 'General',
                chapterName: m.chapterName || 'General',
                type: 'PDF',
                pages: m.pages || 45,
                size: m.size || '4.5 MB',
                isPremium: false,
                fileUrl: m.fileUrl || '',
                isAdminAdded: true,
                createdAt: m.createdAt || new Date().toISOString()
            };
        });

    return [...customNotes, ...activeBase];
};

export const fetchAllMaterials = async (token) => {
    let serverMaterials = [];
    try {
        const res = await fetch('/api/materials');
        if (res.ok) {
            const data = await res.json();
            if (data && data.materials) {
                serverMaterials = data.materials;
            }
        }
    } catch (e) {}

    const localList = getLocalMaterials();
    const map = new Map();
    serverMaterials.forEach(item => map.set(item._id || item.id, item));
    localList.forEach(item => map.set(item._id || item.id, item));

    // Include active base notes so Admin Dashboard can view and delete default notes cards too
    const deletedIds = getDeletedBaseNoteIds();
    const activeBase = BASE_NOTES
        .filter(b => !deletedIds.includes(b.id) && !deletedIds.includes(b.title))
        .map(b => ({
            _id: b.id,
            id: b.id,
            title: b.title,
            classNumber: b.classNumber || (b.category?.includes('12') ? '12' : b.category?.includes('10') ? '10' : 'Computer & Programming'),
            subjectName: b.category,
            chapterName: b.category,
            type: 'Notes',
            fileUrl: b.file ? `/pdfs/${b.file}` : '',
            isDefault: true,
            createdAt: new Date().toISOString()
        }));

    activeBase.forEach(item => {
        if (!map.has(item.id)) {
            map.set(item.id, item);
        }
    });

    return Array.from(map.values());
};

export const addMaterial = async (materialData, token) => {
    const tempId = 'mat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const newEntry = {
        _id: tempId,
        id: tempId,
        createdAt: new Date().toISOString(),
        ...materialData
    };

    const current = getLocalMaterials();
    const updated = [newEntry, ...current];
    setLocalMaterials(updated);

    try {
        const res = await fetch('/api/materials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(materialData)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.material) {
                const synced = updated.map(item => item._id === tempId ? data.material : item);
                setLocalMaterials(synced);
                return data.material;
            }
        }
    } catch (e) {
        console.warn('Backend sync failed, saved locally:', e);
    }

    return newEntry;
};

export const removeMaterial = async (id, token, title = '') => {
    // If it's a base note from the default list
    if (String(id).startsWith('base-') || BASE_NOTES.some(b => b.id === id || b.title === title)) {
        const deletedIds = getDeletedBaseNoteIds();
        if (!deletedIds.includes(id)) {
            setDeletedBaseNoteIds([...deletedIds, id, title].filter(Boolean));
        }
        return true;
    }

    // Custom material removal
    const current = getLocalMaterials();
    const updated = current.filter(item => item._id !== id && item.id !== id);
    setLocalMaterials(updated);

    try {
        await fetch(`/api/materials/${id}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    } catch (e) {
        console.warn('Backend delete sync failed, removed locally:', e);
    }

    return true;
};
