const validateFields = (body, fields) => {
    return fields.every((field) => body[field] && body[field].trim() !== "");
};

const validateSampleFields = (body, fields) => {
    return fields.every((field) => {
        const value = body[field];

        if (value === undefined || value === null) return false;

        if (typeof value === "string") return value.trim() !== "";

        if (Array.isArray(value)) return value.length > 0; 

        if (typeof value === "object" && !Array.isArray(value)) {
            return Object.keys(value).length > 0;
        }

        return true;
    });
};

export { validateFields, validateSampleFields };
