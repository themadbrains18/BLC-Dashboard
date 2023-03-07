import { alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`;
}

// ----------------------------------------------------------------------


const primary = {
  light:"#fff",
  lighter:"rgba(255, 255, 255, 0.7)",
  main:"#ffa",
  dark:"#8381F0",
  darker:"#723F65"
};
const bgGray = {
  main:"#464E5F",
  dark: '#121212',    
  darker:"#252525"
}
const error = {
  main:"#F44336"
}
const secondry = {
  light:"#fff",
  dark: 'rgba(255, 255, 255, 0.5);',
  darker:"#193E79"
};

const gradients = {
  primary: createGradient(primary.light, bgGray.dark),
};
const activeColor = {
  main:"#90CAF9"
}
const textG = {
  main:"#0BB783",
  light:"#ffffff80"
}
const textLight = {
  main: 'rgba(255, 255, 255, 0.5);',
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...primary, contrastText: '#fff' },
  secondary: { ...secondry, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...error, contrastText: '#fff' },
  grey: GREY,
  gradients: gradients,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    mode: 'light',
    primary,
    secondry,
    bgGray,
    gradients,
    activeColor,
    textG,
    error,
    textLight
  },
  dark: { 
    mode: 'dark',
    primary,
    secondry,
    bgGray,
    gradients,
    activeColor,
    textG,
    error,
    textLight
  },
};

export default palette;

