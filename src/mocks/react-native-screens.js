import React from 'react';
import { View, Animated } from 'react-native';

export const enableScreens = () => {};
export const screensEnabled = () => false;

export const Screen = ({ children, style, ...rest }) =>
  React.createElement(View, { style, ...rest }, children);

export const InnerScreen = Screen;

export const ScreenContainer = ({ children, style, ...rest }) =>
  React.createElement(View, { style, ...rest }, children);

export const ScreenStack = ({ children, style, ...rest }) =>
  React.createElement(View, { style, ...rest }, children);

export const ScreenStackItem = Screen;
export const NativeScreen = Screen;
export const NativeScreenContainer = ScreenContainer;

export const ScreenContext = React.createContext(null);

export const useTransitionProgress = () => ({
  progress: new Animated.Value(1),
  closing: new Animated.Value(0),
  goingForward: new Animated.Value(1),
});

export const SearchBar = View;
export const FullWindowOverlay = ({ children, ...rest }) =>
  React.createElement(View, rest, children);
export const ScreenFooter = ({ children, ...rest }) =>
  React.createElement(View, rest, children);
export const ScreenContentWrapper = ({ children, ...rest }) =>
  React.createElement(View, rest, children);

export const compatibilityFlags = {};
export const featureFlags = {};
export const Tabs = View;
