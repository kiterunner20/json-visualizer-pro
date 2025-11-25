// Generate TypeScript interfaces from JSON
export const generateTypeScript = (data, interfaceName = 'Root') => {
    const getType = (value) => {
        if (value === null) return 'null';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'any[]';
            return `${getType(value[0])}[]`;
        }
        if (typeof value === 'object') return interfaceName;
        return typeof value;
    };

    const generateInterface = (obj, name) => {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return '';
        }

        let result = `interface ${name} {\n`;
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const type = getType(value);
            result += `  ${key}: ${type};\n`;
        });
        result += '}\n';
        return result;
    };

    return generateInterface(data, interfaceName);
};
