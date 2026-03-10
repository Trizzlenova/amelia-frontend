export const toSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const generateJsonTemplate = (fields) => {
    const templateObj = {};
    fields.forEach(field => {
        templateObj[field] = `\${${toSnakeCase(field)}}`;
    });
    return JSON.stringify(templateObj, null, 4);
};