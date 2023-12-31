import { createTheme } from '@mui/material/styles';

const customtheme = {
  colors: {
    blueBg3: '#2A2F4A',
    blueBg2: '#3F445C',
    blueBg1: '#43618F',

    blue800: '#2565CB',
    blue700: '#3A7BDF',
    blue600: '#6195E6',
    blue500: '#9DBDEF',
    blue400: '#A9CBFF',
    blue300: '#C8DEFF',
    blue200: '#E5F0FF',
    blue100: '#F4F9FF',

    gray900: '#000000',
    gray800: '#414447',
    gray700: '#5C656C',
    gray600: '#9199A4',
    gray500: '#B4BCC6',
    gray400: '#D0DAE3',
    gray300: '#E5E9ED',
    gray200: '#F1F5F8',
    gray100: '#F9F9FA',

    white: '#FFFFFF',
    error: '#DE2222',
    success: '#0CBC72',
  },
  shadows: {
    shadow1: {
      shadow: '0px 4px 8px rgba(0, 0, 0, 0.04)',
    },
    shadow2: {
      shadow: '0px 8px 16px rgba(0, 0, 0, 0.16)',
    },
    shadow3: {
      shadow: '0px 12px 40px rgba(0, 0, 0, 0.12)',
    },
  },
  alpha: {
    alpha1: 'rgba(255, 255, 255, 0.5)',
    alpha2: 'rgba(224, 224, 224, 0.5)',
    alpha3: 'rgba(223, 230, 246, 0.5)',
    alpha4: 'rgba(0, 0, 0, 0.01)',
    alpha5: 'rgba(0, 0, 0, 0.05)',
    alpha6: 'rgba(0, 0, 0, 0.1)',
  },
};

const theme = Object.assign(createTheme(), customtheme);

export default theme;
