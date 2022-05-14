export const styles = {
  global: {
    '.js-focus-visible :focus:not([data-focus-visible-added])': {
      outline: 'none',
      'box-shadow': 'none'
    },
    '*': {
      '-webkit-overflow-scrolling': 'touch',
      '-ms-overflow-style': 'none'
    },
    '*::-webkit-scrollbar': {
      display: 'none'
    },
    'div,a,img': {
      '-webkit-tap-highlight-color': 'transparent',
      '-webkit-touch-callout': 'none',
    },
    '.safe-area-inset-top': {
      'padding-top': 'env(safe-area-inset-top)',
    },
    '.safe-area-inset-bottom': {
      'padding-bottom': 'env(safe-area-inset-bottom)'
    },
  },
}
