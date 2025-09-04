import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--white)',
          border: '1px solid var(--accordion-border-gray)',
          boxShadow: 'none',
          marginBottom: '-1px',
          padding: '5px',
          '&.Mui-expanded': {
            backgroundColor: 'var(--white)', // Change when expanded
          },
          // shape of accordion boxes
          '&:first-of-type': {
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          },
          '&:last-of-type': {
            borderBottomLeftRadius: '9px',
            borderBottomRightRadius: '9px',
          },
          '&:before': {
            display: 'none', // divider line
          },
          
        },
      },
    },
  },
});


export default theme;
