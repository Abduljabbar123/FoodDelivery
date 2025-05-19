import {heightRef, widthRef} from './screenSize';
export const MEDIA_HEIGHT = 295 * heightRef;
const globalStyles = {
  Theme: {
    background: '#FFFFFF',
    Primary: '#2F74FA',
    Secondary: '#EC6442',
    Territory: '#ECEEFF',
    Heading: '#454238',
    Paragraph: '#919B9B',
    LabelDivider: '#F6F6F6',
    Alert: '#FF5D39',
    Success: '#47DE68',
    Warning: '#FF8C39',
    WarningRed: '#EC6442',
    Active: '#0E88FA',
    Warm: '#FFDD28',
    White: '#FFFFFF',
    Black: '#000000',
    GrayLite: '#E2E8F0',
    Basic: '#FCFCFC',
    SuccessGeneral: '#00A424',
    cancelled: '#EC6442',
    inactive: '#EC6442',
    Notification: '#E3F2FD',
    lightgray: '#d3d3d3',
  },

  image: (height = '100%', width = '100%') => ({
    width: typeof width === 'string' ? width : width * widthRef,
    height: typeof height === 'string' ? height : height * heightRef,
    resizeMode: 'contain',
  }),
  text: (
    fontSize = 14 * heightRef,
    fontWeight = 'normal',
    color = 'black',
  ) => ({
    fontSize,
    fontWeight,
    color,
  }),
  center: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editView: {
    height: MEDIA_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
};
export default globalStyles;

type HexColor = string & {_?: any};

export type TColors = keyof typeof globalStyles.Theme | HexColor;
