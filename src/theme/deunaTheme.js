const colorsMod = require('@deuna/tl-core-components-rn/src/styles/colors');
const colors = colorsMod.colors || colorsMod.default || colorsMod;

const theme = {
  fonts: {
    headline: {
      h1: { fontFamily: 'Montserrat-Bold', fontSize: 28, lineHeight: 38 },
      lgH1: { fontFamily: 'Montserrat-Bold', fontSize: 56, lineHeight: 78 },
      h2: { fontFamily: 'Montserrat-Medium', fontSize: 24, lineHeight: 34 },
      lgH2: { fontFamily: 'Montserrat-Medium', fontSize: 28, lineHeight: 38 },
      h3: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, lineHeight: 25 },
      lgH3: { fontFamily: 'Montserrat-SemiBold', fontSize: 24, lineHeight: 34 },
    },
    title: {
      normal: { fontFamily: 'Montserrat-Bold', fontSize: 18, lineHeight: 22 },
      small: { fontFamily: 'Montserrat-SemiBold', fontSize: 12, lineHeight: 16 },
    },
    callToAction: {
      button: { fontFamily: 'Montserrat-Bold', fontSize: 16, lineHeight: 20, textDecoration: 'none' },
      link: { fontFamily: 'Montserrat-Bold', fontSize: 16, lineHeight: 20, textDecoration: 'underline' },
      action: { fontFamily: 'Montserrat-SemiBold', fontSize: 12, lineHeight: 14, textTransform: 'uppercase' },
    },
    label: { normal: { fontFamily: 'Montserrat-Medium', fontSize: 14, lineHeight: 17 } },
    input: { normal: { fontFamily: 'Montserrat-Medium', fontSize: 16, lineHeight: 20 } },
    item: { normal: { fontFamily: 'Montserrat-SemiBold', fontSize: 16, lineHeight: 16 } },
    key: { normal: { fontFamily: 'Lato-Regular', fontSize: 24, lineHeight: 56 } },
    legal: {
      normal: { fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 20, textDecoration: 'none' },
      underline: { fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 20, textDecoration: 'underline' },
    },
    body: {
      regular: { fontFamily: 'Montserrat-Medium', fontSize: 16, lineHeight: 26, textDecoration: 'none' },
      link: { fontFamily: 'Montserrat-Medium', fontSize: 16, lineHeight: 26, textDecoration: 'underline' },
      strong: { fontFamily: 'Montserrat-Bold', fontSize: 16, lineHeight: 26, textDecoration: 'none' },
      strongLink: { fontFamily: 'Montserrat-Bold', fontSize: 16, lineHeight: 26, textDecoration: 'underline' },
      lgStrong: { fontFamily: 'Montserrat-Bold', fontSize: 20, lineHeight: 28, textDecoration: 'none' },
      mdStrong: { fontFamily: 'Montserrat-Bold', fontSize: 16, lineHeight: 24, textDecoration: 'none' },
      sm: { fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 22, textDecoration: 'none' },
      smLink: { fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 22, textDecoration: 'underline' },
      smStrong: { fontFamily: 'Montserrat-SemiBold', fontSize: 14, lineHeight: 22, textDecoration: 'none' },
      smStrongLink: { fontFamily: 'Montserrat-SemiBold', fontSize: 14, lineHeight: 22, textDecoration: 'underline' },
      xs: { fontFamily: 'Montserrat-Regular', fontSize: 12, lineHeight: 19, textDecoration: 'none' },
      xsLink: { fontFamily: 'Montserrat-Regular', fontSize: 12, lineHeight: 19, textDecoration: 'underline' },
      xsStrong: { fontFamily: 'Montserrat-SemiBold', fontSize: 12, lineHeight: 19, textDecoration: 'none' },
      xsStrongLink: { fontFamily: 'Montserrat-SemiBold', fontSize: 12, lineHeight: 19, textDecoration: 'underline' },
      xss: { fontFamily: 'Montserrat-Regular', fontSize: 10, lineHeight: 14, textDecoration: 'none' },
      xssLink: { fontFamily: 'Montserrat-Regular', fontSize: 10, lineHeight: 14, textDecoration: 'underline' },
      xssStrong: { fontFamily: 'Montserrat-SemiBold', fontSize: 10, lineHeight: 14, textDecoration: 'none' },
      xssStrongLink: { fontFamily: 'Montserrat-SemiBold', fontSize: 10, lineHeight: 14, textDecoration: 'underline' },
    },
    list: {
      title: { fontFamily: 'Montserrat-Bold', fontSize: 14, lineHeight: 28 },
      regular: { fontFamily: 'Montserrat-Regular', fontSize: 14, lineHeight: 28 },
      normal: { fontFamily: 'Montserrat-Medium', fontSize: 14, lineHeight: 28 },
    },
    amount: {
      normal: { fontFamily: 'Lato-Bold', fontSize: 64, lineHeight: 64 },
      small: { fontFamily: 'Lato-Bold', fontSize: 48, lineHeight: 48 },
    },
    number: {
      xl: { fontFamily: 'Lato-Bold', fontSize: 64, lineHeight: 64, letterSpacing: 0.5 },
      lg: { fontFamily: 'Lato-Bold', fontSize: 48, lineHeight: 48, letterSpacing: 0.5 },
      md: { fontFamily: 'Lato-Bold', fontSize: 32, lineHeight: 32, letterSpacing: 0.5 },
      sm: { fontFamily: 'Lato-Regular', fontSize: 24, lineHeight: 24, letterSpacing: 0.5 },
      xs: { fontFamily: 'Lato-Regular', fontSize: 16, lineHeight: 22, letterSpacing: 0.5 },
    },
  },
  colors,
  input: {
    style: { borderRadius: 8, fontSize: 16, lineHeight: 24, textAlign: 'left', fontFamily: 'Montserrat-Regular' },
    state: {
      default: { color: colors.neutral900, borderColor: colors.neutralVariant200, borderWidth: 1, backgroundColor: colors.white },
      filled: { color: colors.neutral900, borderColor: colors.neutralVariant200, borderWidth: 1, backgroundColor: colors.white },
      focus: { color: colors.neutral900, borderColor: colors.neutral900, borderWidth: 2, backgroundColor: colors.white },
      error: { color: colors.neutral900, borderColor: colors.error700, borderWidth: 2, backgroundColor: colors.white },
      validated: { color: colors.neutral900, borderColor: colors.neutralVariant200, borderWidth: 1, backgroundColor: colors.white },
      disabled: { color: colors.neutral50, borderColor: colors.neutral100, borderWidth: 1, backgroundColor: colors.neutral50 },
      loading: { color: colors.neutral900, borderColor: colors.neutralVariant200, borderWidth: 1, backgroundColor: colors.white },
      selection: { color: colors.neutral50, backgroundColor: colors.darkGray500 },
    },
  },
  bullet: {
    default: { backgroundColor: colors.neutralVariant100 },
    selected: { backgroundColor: colors.primaryViolet500 },
  },
};

module.exports = theme;
