const backgroundColor = '#272822'; // 'rgba(0, 0, 0, 0.5)';
const foregroundColor = '#f0f8f2'; // 'f2f2f2';
const cursorColor = 'rgba(255, 255, 255, .3)';
const cursorAccentColor = '#ffffff';
const borderColor = 'rgba(255, 255, 255, .1)'; // 'transparent' ?
const selectionColor = 'rgba(255, 255, 255, .3)';

const colors = {
	lightBlack: '#272822',
	black: '#000000',
	lightGreen: '#A6E22E',
	green: '#A6E22E',
	lightYellow: '#49483E',
	yellow: '#49483E',
	white: '#ffffff',
	lightWhite: '#f0f8f2',
	lightRed: '#FD971F',
	red: '#FD971F',
	magenta: '#F92672',
	lightMagenta: '#F92672',
	lightBlue: '#66D9EF',
	blue: '#66D9EF',
	lightCyan: '#38CCD1',
	cyan: '#38CCD1'
};

const fontFamily = '"Roboto Mono", Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace';
const cursorShape = 'BLOCK';
const fontSize = 14;

exports.decorateConfig = config => {

  return Object.assign({}, config, {
    foregroundColor,
    backgroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor,
    cursorShape,
    colors,
    fontFamily,
    fontSize,
    selectionColor,
    termCSS: `
      ${config.termCSS || ''}
      .terminal .xterm-selection {
        background: #0ff;
        color: #f00;
        }
    `,
    css: `
      ${config.css || ''}
      .tab_tab {
        color: ${LightenDarkenColor(foregroundColor, -100)};
      }
      .tab_tab.tab_active {
        color: ${foregroundColor};
      }
    `
  })
}

/** @see https://css-tricks.com/snippets/javascript/lighten-darken-color/ */
function LightenDarkenColor(col, amt) {

  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

};
