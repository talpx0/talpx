// Define the color object structure
export interface Color {
    hex: string;
    rgb: string;
    category: string;
    hsl: string;
  }
  
  // Define the variant of the colors (main, light, dark)
  export interface ColorVariants {
    main: Color;
    light: Color;
    dark: Color;
  }
  
  // Define secondary color variants (complementary, analogous, triadic, etc.)
  export interface SecondaryColorVariants {
    main: Color;
    light: Color;
    dark: Color;
  }
  
  // Define the secondary colors object structure
  export interface SecondaryColors {
    complementary: SecondaryColorVariants;
    analogous: SecondaryColorVariants;
    triadic: SecondaryColorVariants;
    splitComplementary: SecondaryColorVariants;
    square: SecondaryColorVariants;
    monochromatic: SecondaryColorVariants;
    uniformDistribution: SecondaryColorVariants;
    goldenRatio: SecondaryColorVariants;
  }
  
  // Define the main theme object structure
  export interface Theme {
    type: string;
    primary: ColorVariants;
    secondary: ColorVariants;
    error: ColorVariants;
    warning: ColorVariants;
    info: ColorVariants;
    success: ColorVariants;
    secondaryColors: SecondaryColors;
  }

 export interface SwrTheme extends Array<Theme> {
  error?: {
    message: string;
  };
 }