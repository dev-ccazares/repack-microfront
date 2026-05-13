import { Animated, View } from 'react-native';

export const useSharedValue = (init) => ({ value: init });
export const useAnimatedStyle = (fn) => ({ style: fn() });
export const useAnimatedScrollHandler = () => ({});
export const useAnimatedGestureHandler = () => ({});
export const useDerivedValue = (fn) => ({ value: fn() });
export const useAnimatedReaction = () => {};
export const useFrameCallback = () => {};
export const useAnimatedRef = () => ({ current: null });
export const useScrollViewOffset = () => ({ value: 0 });

export const withTiming = (value) => value;
export const withSpring = (value) => value;
export const withDecay = (config) => 0;
export const withRepeat = (animation) => animation;
export const withSequence = (...animations) => animations[animations.length - 1];
export const withDelay = (_, animation) => animation;
export const cancelAnimation = () => {};
export const runOnUI = (fn) => fn;
export const runOnJS = (fn) => fn;
export const executeOnUIRuntimeSync = (fn) => fn;

export const interpolate = (value, input, output) => output[0];
export const interpolateColor = (value, input, output) => output[0];
export const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
export const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t,
  cubic: (t) => t,
  in: (easing) => easing,
  out: (easing) => easing,
  inOut: (easing) => easing,
  bezier: () => (t) => t,
  circle: (t) => t,
  sin: (t) => t,
  exp: (t) => t,
  elastic: () => (t) => t,
  back: () => (t) => t,
  bounce: (t) => t,
  poly: () => (t) => t,
};

export const createAnimatedComponent = (Component) => Component;

export default {
  View,
  Text: View,
  Image: View,
  ScrollView: View,
  FlatList: View,
  createAnimatedComponent,
  Value: Animated.Value,
  ValueXY: Animated.ValueXY,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  withRepeat,
  withSequence,
  withDelay,
  cancelAnimation,
  runOnUI,
  runOnJS,
  interpolate,
  Easing,
};
