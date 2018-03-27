const theme = {};

theme.borderRadius = '2px';

theme.boxShadow = [];
theme.boxShadow[0] = 'none';
theme.boxShadow[1] = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(114, 113, 113, 0.08)';
theme.boxShadow[2] = '0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 3px 6px 0 rgba(174, 174, 174, 0.16)';
theme.boxShadow[3] = '0 10px 20px 0 rgba(0, 0, 0, 0.12), 0 6px 6px 0 rgba(0, 0, 0, 0.16)';
theme.boxShadow[4] = '0 14px 28px 0 rgba(0, 0, 0, 0.12), 0 10px 10px 0 rgba(0, 0, 0, 0.16)';
theme.boxShadow[5] = '0 19px 38px 0 rgba(0, 0, 0, 0.16), 0 15px 12px 0 rgba(0, 0, 0, 0.16)';

theme.color = {};
theme.color.greenLighter = '#e6f7ed';
theme.color.greenLight = '#6ed396';
theme.color.green = '#0eb550';
theme.color.greenDark = '#00893d';
theme.color.blueLighter = '#eeeffc';
theme.color.blueLight = '#9aa4f2';
theme.color.blue = '#5768e9';
theme.color.blueDark = '#4451b6';
theme.color.yellowLighter = '#fff0d6';
theme.color.yellowLight = '#ffc866';
theme.color.yellow = '#ffa400';
theme.color.yellowDark = '#cc8300';
theme.color.redLighter = '#ffeff1';
theme.color.redLight = '#ffa3ab';
theme.color.red = '#ff6673';
theme.color.redDark = '#cc525c';
theme.color.lagoonLighter = '#e5f1f3';
theme.color.lagoonLight = '#66afb8';
theme.color.lagoon = '#007989';
theme.color.lagoonDark = '#004c56';
theme.color.tealLighter = '#eaf3f1';
theme.color.tealLight = '#a1d5ca';
theme.color.teal = '#44ac95';
theme.color.tealDark = '#2d907a';
theme.color.chillLighter = '#f2f8f7';
theme.color.chillLight = '#d4e8e4';
theme.color.chill = '#bcdcd6';
theme.color.chillDark = '#9ab5b0';
theme.color.white = '#ffffff';
theme.color.greyLighter = '#f1f1f1';
theme.color.greyLight = '#dedede';
theme.color.grey = '#aeaeae';
theme.color.greyDark = '#727171';
theme.color.greyDarker = '#4a4a4a';
theme.color.black = '#000000';
theme.color.translucent = 'rgba(0, 0, 0, 0.1)';
theme.color.transparent = 'rgba(0, 0, 0, 0)';
theme.color.primaryLighter = theme.color.greenLighter;
theme.color.primaryLight = theme.color.greenLight;
theme.color.primary = theme.color.green;
theme.color.primaryDark = theme.color.greenDark;
theme.color.accentLighter = theme.color.white;
theme.color.accentLight = theme.color.white;
theme.color.accent = theme.color.white;
theme.color.accentDark = theme.color.white;

theme.fontFamily = {};
theme.fontFamily.roboto = 'Roboto';
theme.fontFamily.averta = 'Averta';

theme.fontSize = {};
theme.fontSize.xxxxl = '32px';
theme.fontSize.xxxl = '28px';
theme.fontSize.xxl = '24px';
theme.fontSize.xl = '20px';
theme.fontSize.l = '18px';
theme.fontSize.m = '16px';
theme.fontSize.s = '14px';
theme.fontSize.xs = '12px';
theme.fontSize.xxs = '10px';

theme.fontWeight = {};
theme.fontWeight.regular = 400;
theme.fontWeight.medium = 500;
theme.fontWeight.semibold = 600;
theme.fontWeight.bold = 700;

theme.pxScale = 8;

theme.px = (value) => {
  const values = [].concat(value);
  return values
    .map((v) => typeof v === 'string' ? v : `${v * theme.pxScale}px`)
    .join(' ');
};

export default theme;
