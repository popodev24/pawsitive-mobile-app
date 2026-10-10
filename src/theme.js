import { Platform } from 'react-native';
export const colors = { teal: '#1f6f66', cream: '#fdf6ec', orange: '#f4a259', mint: '#e6f0ea', text: '#4a4a4a', red: '#c0392b' };
export const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });
