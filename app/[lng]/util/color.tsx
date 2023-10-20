export const validateColor = (color: string) => {
    // This regular expression strictly checks for #RRGGBB format.
    if (/^#([0-9A-F]{6})\b/i.test(color)) {
        return true;
    }
    return false;
}

export const isLightColor = (hexColor?: string): boolean => {
    if (!hexColor || typeof hexColor !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
        return false; // Return 'false' for any invalid or undefined input
    }

    // Convert hex string to RGB
    let r = parseInt(hexColor.substring(1, 3), 16) / 255;
    let g = parseInt(hexColor.substring(3, 5), 16) / 255;
    let b = parseInt(hexColor.substring(5, 7), 16) / 255;

    // Convert sRGB values to linear RGB values
    r = (r <= 0.04045) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = (g <= 0.04045) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = (b <= 0.04045) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return true if the color is light, false if it's dark
    return luminance > 0.5;
}

