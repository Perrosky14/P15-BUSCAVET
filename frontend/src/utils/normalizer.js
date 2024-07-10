// utils/normalizer.js
export const normalizeRUT = (rut) => {
    return rut.replace(/[\.\-]/g, '');
};

export const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};