import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const defaults = {
  bodyColor: {
    dark: grey.A400,
    light: grey[50],
  },
  palette: {
    primary: blue,
    secondary: teal,
    text: {
      primary: grey[50],
    },
  },
};

const getTheme = (overrides = {}) => responsiveFontSizes(createMuiTheme(
  Object.assign(
    {},
    overrides,
    defaults,
    {
      typography: {
        useNextVariants: true,
      },
    },
  ),
));

export default getTheme;

// setBodyColor(this.settings.bodyColor[this.settings.palette.type]);
// this.settings.palette.type = this.settings.palette.type === 'light'
//   ? 'dark'
//   : 'light';
