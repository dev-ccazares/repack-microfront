import { View } from 'react-native';

const ViewShot = ({ children, ...props }) => {
  return children;
};
ViewShot.displayName = 'ViewShot';

export const captureRef = async () => '';
export const captureScreen = async () => '';
export const releaseCapture = () => {};

export default ViewShot;
