// URL sharing utilities
export const encodeToURL = (jsonData) => {
    try {
        const jsonString = JSON.stringify(jsonData);
        const compressed = btoa(encodeURIComponent(jsonString));
        return compressed;
    } catch (error) {
        console.error('Failed to encode JSON:', error);
        return null;
    }
};

export const decodeFromURL = (encoded) => {
    try {
        const jsonString = decodeURIComponent(atob(encoded));
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Failed to decode JSON:', error);
        return null;
    }
};
