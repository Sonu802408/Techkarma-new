// Tech Karma Classes - Dynamic Materials & Content Management Service
// Syncs seamlessly with backend API and local fallback store

const STORAGE_KEY = 'techkarma_custom_materials';

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
    // Merge by _id / id
    const map = new Map();
    serverMaterials.forEach(item => map.set(item._id || item.id, item));
    localList.forEach(item => map.set(item._id || item.id, item));

    const combined = Array.from(map.values());
    if (combined.length > localList.length) {
        setLocalMaterials(combined);
    }
    return combined;
};

export const addMaterial = async (materialData, token) => {
    const tempId = 'mat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const newEntry = {
        _id: tempId,
        id: tempId,
        createdAt: new Date().toISOString(),
        ...materialData
    };

    // Update local immediately
    const current = getLocalMaterials();
    const updated = [newEntry, ...current];
    setLocalMaterials(updated);

    // Sync with backend API
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
                // Replace tempId with server ID
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

export const removeMaterial = async (id, token) => {
    // Remove locally immediately
    const current = getLocalMaterials();
    const updated = current.filter(item => item._id !== id && item.id !== id);
    setLocalMaterials(updated);

    // Call backend
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
