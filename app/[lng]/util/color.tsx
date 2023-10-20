export const validateColor = (color: string) => {
    // This regular expression strictly checks for #RGB or #RRGGBB formats.
    if (/^#([0-9A-F]{3})\b|^#([0-9A-F]{6})\b/i.test(color)) {
        return true;
    }
    return false;
}