import { Platform } from "react-native";

const isAndroid = (): boolean => Platform.OS === "android";
const isIOS = (): boolean => Platform.OS === "ios";
const isMac = (): boolean => Platform.OS === "macos";
const isWeb = (): boolean => Platform.OS === "web";
const isWindows = (): boolean => Platform.OS === "windows";

export { isAndroid, isIOS, isMac, isWeb, isWindows };
