// JSON Parser utility with auto-fix capabilities
export const parseJSON = (input) => {
    try {
        // Try standard JSON parse first
        return { success: true, data: JSON.parse(input), fixed: false };
    } catch (error) {
        // Try to auto-fix common errors
        try {
            let fixed = input;

            // Fix 1: Remove trailing commas
            fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

            // Fix 2: Add quotes to unquoted keys
            fixed = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

            // Fix 3: Replace single quotes with double quotes
            fixed = fixed.replace(/'/g, '"');

            // Fix 4: Remove comments (// and /* */)
            fixed = fixed.replace(/\/\/.*$/gm, '');
            fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

            const data = JSON.parse(fixed);
            return { success: true, data, fixed: true, original: input };
        } catch (fixError) {
            return { success: false, error: error.message };
        }
    }
};

// Format JSON with options
export const formatJSON = (data, minify = false) => {
    return minify ? JSON.stringify(data) : JSON.stringify(data, null, 2);
};
