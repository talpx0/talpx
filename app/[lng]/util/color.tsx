export const validateColor = (color: string) => {
    // This regular expression strictly checks for #RRGGBB format.
    if (/^#([0-9A-F]{6})\b/i.test(color)) {
        return true;
    }
    return false;
}


const calculateLuminance = (hexColor?: string): number | null => {
    if (!hexColor || typeof hexColor !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
        return null; // Return null for invalid input
    }

    // Convert hex string to RGB
    let r = parseInt(hexColor.substring(1, 3), 16) / 255;
    let g = parseInt(hexColor.substring(3, 5), 16) / 255;
    let b = parseInt(hexColor.substring(5, 7), 16) / 255;

    // Convert sRGB values to linear RGB values
    r = (r <= 0.04045) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = (g <= 0.04045) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = (b <= 0.04045) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Return the calculated luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const isLightColor = (hexColor?: string): boolean => {
    const luminance = calculateLuminance(hexColor);
    if (luminance === null) {
        return false;
    }
    return luminance > 0.5;
}

export const getColorType = (hexColor?: string): "light" | "dark" => {
    const luminance = calculateLuminance(hexColor);
    if (luminance === null) {
        return "dark";
    }
    return luminance > 0.5 ? "light" : "dark";
}

export function colorLuminance(hex: string, lum: number = 0): string {
    // Ensure hex is a string and has a valid format
    if (typeof hex !== 'string' || !/^#?[0-9a-f]{3,6}$/i.test(hex)) {
        return '#FFFFFF';  // Return white as default
    }
    
    // Ensure hex has a consistent 6-digit format
    hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Extract and adjust RGB components
    const adjustColor = (color: number): string => {
        let adjusted = Math.round(color * (1 + lum));
        adjusted = Math.max(0, Math.min(255, adjusted));  // Clamp between 0 and 255
        return adjusted.toString(16).padStart(2, '0');    // Convert to hex and ensure 2 characters
    };

    const red = adjustColor(parseInt(hex.slice(0, 2), 16));
    const green = adjustColor(parseInt(hex.slice(2, 4), 16));
    const blue = adjustColor(parseInt(hex.slice(4, 6), 16));

    return `#${red}${green}${blue}`;
}
