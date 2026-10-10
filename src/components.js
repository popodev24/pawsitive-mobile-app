import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, serif } from './theme';
import { images } from './data';

export function Header({ title, back }) {
  const nav = useNavigation();
  const [open, setOpen] = useState(false);
  const go = (tab, screen) => { setOpen(false); nav.navigate(tab, screen ? { screen } : undefined); };
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.cream }}>
      <View style={s.header}>
        <Image source={images.logo} style={s.logo} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.sub}>DURBAN • EST. 2023</Text>
          <Text style={s.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => (back ? nav.goBack() : setOpen(true))}>
          <Ionicons name={back ? 'arrow-back' : 'menu'} size={28} color={colors.teal} />
        </TouchableOpacity>
      </View>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={s.menu}>
            {[['Home', 'Home', 'HomeMain'], ['About Us', 'Home', 'About'], ['Courses', 'Courses', 'CoursesList'], ['Fees', 'Fees'], ['Contact', 'Contact']].map(([label, tab, scr]) => (
              <TouchableOpacity key={label} style={s.menuItem} onPress={() => go(tab, scr)}>
                <Text style={s.menuText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

export const Btn = ({ label, onPress, outline, orange, style }) => (
  <TouchableOpacity onPress={onPress} style={[s.btn, outline && s.btnOutline, orange && s.btnOrange, style]}>
    <Text style={[s.btnText, outline && { color: colors.teal }, orange && { color: '#1b3b36' }]}>{label}</Text>
  </TouchableOpacity>
);

export const Eyebrow = ({ children }) => <Text style={s.eyebrow}>{children}</Text>;
export const H1 = ({ children }) => <Text style={s.h1}>{children}</Text>;
export const H2 = ({ children }) => <Text style={s.h2}>{children}</Text>;
export const Body = ({ children, style }) => <Text style={[s.body, style]}>{children}</Text>;
export const Err = ({ msg }) => (msg ? <Text style={s.err}>{msg}</Text> : null);

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  logo: { width: 56, height: 56, borderRadius: 28 },
  sub: { fontSize: 10, fontWeight: '700', color: colors.teal },
  title: { fontFamily: serif, fontSize: 22, color: colors.teal },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'flex-end', paddingTop: 90, paddingRight: 16 },
  menu: { backgroundColor: '#fff', borderRadius: 16, padding: 8, width: 190 },
  menuItem: { padding: 14 },
  menuText: { fontSize: 16, color: colors.teal, fontWeight: '600' },
  btn: { backgroundColor: colors.teal, borderColor: colors.teal, borderWidth: 2, borderRadius: 50, paddingVertical: 14, paddingHorizontal: 22, alignItems: 'center' },
  btnOutline: { backgroundColor: 'transparent' },
  btnOrange: { backgroundColor: colors.orange, borderColor: colors.orange },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, color: colors.teal, marginTop: 14, marginBottom: 6 },
  h1: { fontFamily: serif, fontSize: 30, color: colors.teal, marginBottom: 10 },
  h2: { fontFamily: serif, fontSize: 24, color: colors.teal, marginBottom: 8, marginTop: 8 },
  body: { fontSize: 15, lineHeight: 22, color: colors.text, marginBottom: 10 },
  err: { color: colors.red, fontSize: 12, marginTop: 3 },
});
