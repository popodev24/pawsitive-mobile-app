import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Linking, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { colors, serif } from './theme';
import { images, courses, money, calculate, nameOk, phoneOk, emailOk } from './data';
import { Header, Btn, Eyebrow, H1, H2, Body, Err } from './components';

const Page = ({ title, back, children }) => (
  <View style={{ flex: 1, backgroundColor: colors.cream }}>
    <Header title={title} back={back} />
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>{children}</ScrollView>
  </View>
);

/* ---------------- HOME ---------------- */
export function HomeScreen({ navigation }) {
  return (
    <Page title="Welcome home">
      <Eyebrow>WELCOME TO YOUR PAWSITIVE CHAPTER</Eyebrow>
      <Image source={images.hero} style={st.heroImg} />
      <H1>Caring Pet Education & Training in Durban</H1>
      <Body>Founded in 2023, we've trained hundreds of pet owners and aspiring pet care professionals. Learn with kindness. Care with confidence.</Body>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Btn label="View Courses" onPress={() => navigation.navigate('Courses')} style={{ flex: 1 }} />
        <Btn label="Get a Quote" outline onPress={() => navigation.navigate('Fees')} style={{ flex: 1 }} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('About')}><Text style={st.link}>Meet Sarah & the academy →</Text></TouchableOpacity>
      <Eyebrow>A LITTLE LEARNING. A LIFETIME OF CARE.</Eyebrow>
      <H2>Find your pawsitive path</H2>
      <Card title="Six-Month Programmes" sub="4 courses • 12 weeks each • R1500" img="canine" onPress={() => navigation.navigate('Courses')} />
      <Card title="Short Courses" sub="3 courses • R750 each" img="puppy" onPress={() => navigation.navigate('Courses')} />
    </Page>
  );
}
const Card = ({ title, sub, img, onPress }) => (
  <TouchableOpacity style={st.card} onPress={onPress}>
    <Image source={images[img]} style={st.cardImg} />
    <View style={{ padding: 14 }}><Text style={st.cardTitle}>{title}</Text><Text style={st.cardSub}>{sub}</Text></View>
  </TouchableOpacity>
);

/* ---------------- ABOUT ---------------- */
export function AboutScreen() {
  const blocks = [
    ['A caring start in 2023', 'Sarah Smith founded Pawsitive Pet Academy in Durban in 2023 to make caring, practical pet education more approachable. What began with a passion for helping people understand their pets has grown into a place for learning, connection and new possibilities.'],
    ['Our Vision', 'A Durban where every pet is understood, respected and cared for by confident, kind people.'],
    ['Our Mission', 'To deliver practical, reward-based pet education that equips owners and aspiring professionals with real skills.'],
    ['Our Goals', 'Grow our course offering, support graduates into pet care careers, and keep learning accessible and affordable.'],
  ];
  return (
    <Page title="About us" back>
      <Eyebrow>ABOUT PAWSITIVE</Eyebrow>
      <H1>Built on a love for pets. Shared with you.</H1>
      <Body>A Durban academy with a simple belief: understanding animals helps us give them the care they deserve.</Body>
      <Image source={images.sarah} style={st.heroImg} />
      <Text style={st.caption}>Sarah Smith • Founder & owner</Text>
      {blocks.map(([t, b]) => (<View key={t}><H2>{t}</H2><Body>{b}</Body></View>))}
      <View style={st.stats}>
        {[['Hundreds', 'of graduates'], ['7 courses', 'for everyday skills'], ['Est. 2023', 'rooted in Durban']].map(([a, b]) => (
          <View key={a} style={{ marginBottom: 10 }}><Text style={st.statBig}>{a}</Text><Text style={st.cardSub}>{b}</Text></View>))}
      </View>
    </Page>
  );
}

/* ---------------- COURSES ---------------- */
export function CoursesScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const groups = [['Six-Month Programme', 'Six-Month Programmes', 'Build your foundation • R1500 each • 12 weeks per course'], ['Short Course', 'Short Courses', 'Quick, practical skills • R750 each']];
  return (
    <Page title="Our courses">
      <Eyebrow>OUR COURSES</Eyebrow>
      <H1>Learn to care. Grow your possibilities.</H1>
      <Body>Seven practical paths for pet owners and aspiring pet care professionals.</Body>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
        {['All', 'Six-Month', 'Short'].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[st.chip, filter === f && st.chipOn]}>
            <Text style={{ color: filter === f ? '#fff' : colors.teal, fontWeight: '600' }}>{f}</Text></TouchableOpacity>))}
      </View>
      {groups.filter(([k]) => filter === 'All' || k.startsWith(filter)).map(([key, title, sub]) => (
        <View key={key}>
          <H2>{title}</H2><Text style={[st.cardSub, { marginBottom: 10 }]}>{sub}</Text>
          {courses.filter((c) => c.type === key).map((c) => (
            <TouchableOpacity key={c.id} style={st.card} onPress={() => navigation.navigate('CourseDetail', { course: c })}>
              <Image source={images[c.img]} style={st.cardImg} />
              <View style={{ padding: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={st.cardSub}>{c.duration}</Text><Text style={st.price}>R{c.fee}</Text></View>
                <Text style={st.cardTitle}>{c.name}</Text>
              </View>
            </TouchableOpacity>))}
        </View>))}
    </Page>
  );
}

export function CourseDetailScreen({ route, navigation }) {
  const c = route.params.course;
  return (
    <Page title="Course detail" back>
      <Text style={st.cardSub}>Courses / {c.type}s / {c.name}</Text>
      <Eyebrow>{c.tagline.toUpperCase()}</Eyebrow>
      <H1>{c.name}</H1>
      <Image source={images[c.img]} style={st.heroImg} />
      <Body>{c.desc}</Body>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ marginRight: 20 }}><Text style={st.bigPrice}>R{c.fee}</Text><Text style={st.cardSub}>Full course fee</Text></View>
        <View><Text style={st.cardTitle}>{c.duration}</Text><Text style={st.cardSub}>{c.type}</Text></View>
      </View>
      <H2>What you will learn</H2>
      {c.learn.map((l) => <Body key={l}>• {l}</Body>)}
      <Btn label="Enquire Now" onPress={() => navigation.navigate('Contact', { course: c.name })} />
    </Page>
  );
}

/* ---------------- FEES ---------------- */
export function FeesScreen() {
  const [sel, setSel] = useState([]);           // selected course ids
  const [f, setF] = useState({ name: '', phone: '', email: '' });
  const [errs, setErrs] = useState({});
  const [quote, setQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);     // array of stored customer quotes
  const [done, setDone] = useState('');

  const chosen = courses.filter((c) => sel.includes(c.id));
  const toggle = (id) => setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const set = (k) => (v) => setF({ ...f, [k]: v });

  const calc = () => {
    if (!chosen.length) { setErrs({ ...errs, courses: 'Please select at least one course.' }); return null; }
    setErrs({ ...errs, courses: '' });
    const q = calculate(chosen); setQuote(q); return q;
  };
  const submit = () => {
    const e = {};
    if (!nameOk(f.name)) e.name = 'Enter a valid name (letters only).';
    if (!phoneOk(f.phone)) e.phone = 'Enter a valid SA number, e.g. 0821234567.';
    if (!emailOk(f.email)) e.email = 'Enter a valid email address.';
    if (!chosen.length) e.courses = 'Please select at least one course.';
    setErrs(e);
    if (Object.keys(e).length) { setDone(''); return; }
    const q = calc();
    setQuotes([...quotes, { name: f.name.trim(), courses: chosen.map((c) => c.name).join(', '), total: q.total }]);
    setDone(`Thanks ${f.name.trim()}! A consultant will contact you on ${f.phone} to confirm.`);
    setF({ name: '', phone: '', email: '' }); setSel([]);
  };

  return (
    <Page title="Course fees">
      <Eyebrow>PLAN YOUR PAWSITIVE PATH</Eyebrow>
      <H1>Fee calculator</H1>
      <Body>Book 3 or more courses for a 10% bundle discount. All quotes include 15% VAT.</Body>

      <View style={st.quoteBox}>
        <Text style={[st.eyebrowO]}>YOUR LEARNING BUNDLE</Text>
        {quote ? (<>
          {chosen.map((c) => <Row key={c.id} a={c.name} b={money(c.fee)} />)}
          <View style={st.hr} />
          <Row a={`Subtotal • ${chosen.length} course(s)`} b={money(quote.subtotal)} />
          {quote.discount > 0 && <Row a="Bundle discount • 10%" b={`- ${money(quote.discount)}`} o />}
          <Row a="VAT (15%)" b={money(quote.vat)} />
          <View style={st.hr} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Your total</Text>
            <Text style={{ color: '#fff', fontFamily: serif, fontSize: 30 }}>{money(quote.total)}</Text></View>
        </>) : <Text style={{ color: '#fff' }}>Select courses and tap Calculate Total.</Text>}
        <Btn label="Calculate Total" orange onPress={calc} style={{ marginTop: 14 }} />
      </View>

      <H2>Your details</H2>
      <Field label="Full name *" value={f.name} onChangeText={set('name')} err={errs.name} placeholder="Your full name" />
      <Field label="Phone number *" value={f.phone} onChangeText={set('phone')} err={errs.phone} placeholder="0821234567" keyboardType="phone-pad" />
      <Field label="Email address *" value={f.email} onChangeText={set('email')} err={errs.email} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />

      <H2>Choose your courses</H2>
      {courses.map((c) => (
        <TouchableOpacity key={c.id} style={[st.opt, sel.includes(c.id) && st.optOn]} onPress={() => toggle(c.id)}>
          <Ionicons name={sel.includes(c.id) ? 'checkbox' : 'square-outline'} size={24} color={colors.teal} />
          <View style={{ flex: 1, marginLeft: 10 }}><Text style={st.cardTitle}>{c.name}</Text><Text style={st.cardSub}>{c.duration}</Text></View>
          <Text style={st.price}>R{c.fee}</Text>
        </TouchableOpacity>))}
      <Err msg={errs.courses} />
      <Btn label="Request a Quote" onPress={submit} style={{ marginTop: 14 }} />
      {!!done && <Text style={st.success}>{done}</Text>}

      {quotes.length > 0 && (<>
        <H2>Quotes requested</H2>
        <View style={st.table}>
          <View style={[st.tr, { backgroundColor: colors.teal }]}><Text style={[st.td, st.th, { flex: 1 }]}>Name</Text><Text style={[st.td, st.th, { flex: 2 }]}>Courses</Text><Text style={[st.td, st.th, { flex: 1 }]}>Total</Text></View>
          {quotes.map((q, i) => (<View key={i} style={st.tr}><Text style={[st.td, { flex: 1 }]}>{q.name}</Text><Text style={[st.td, { flex: 2 }]}>{q.courses}</Text><Text style={[st.td, { flex: 1 }]}>{money(q.total)}</Text></View>))}
        </View>
        <Text style={st.cardSub}>This is a quoted fee only, not a formal invoice.</Text>
      </>)}
    </Page>
  );
}
const Row = ({ a, b, o }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
    <Text style={{ color: o ? colors.orange : '#fff', flex: 1 }}>{a}</Text><Text style={{ color: o ? colors.orange : '#fff' }}>{b}</Text></View>
);
const Field = ({ label, err, ...p }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={st.label}>{label}</Text>
    <TextInput {...p} style={[st.input, err && { borderColor: colors.red }]} placeholderTextColor="#999" />
    <Err msg={err} />
  </View>
);

/* ---------------- CONTACT ---------------- */
export function ContactScreen({ route }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', course: courses[0].name, msg: '' });
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState('');
  const set = (k) => (v) => setF({ ...f, [k]: v });
  React.useEffect(() => { if (route.params?.course) setF((p) => ({ ...p, course: route.params.course })); }, [route.params]);

  const send = () => {
    const e = {};
    if (!nameOk(f.name)) e.name = 'Enter a valid name (letters only).';
    if (!emailOk(f.email)) e.email = 'Enter a valid email address.';
    if (f.phone && !phoneOk(f.phone)) e.phone = 'Enter a valid SA phone number.';
    if (f.msg.trim().length < 10) e.msg = 'Message must be at least 10 characters.';
    setErrs(e);
    if (Object.keys(e).length) return setDone('');
    setDone(`Thanks ${f.name.trim()}, we'll be in touch soon!`);
    setF({ name: '', email: '', phone: '', course: courses[0].name, msg: '' });
  };
  const hours = [['Mon - Fri', '08:00 - 17:00'], ['Saturday', '09:00 - 13:00'], ['Sunday', 'Closed']];
  return (
    <Page title="Contact us">
      <Eyebrow>CONTACT US</Eyebrow>
      <H1>Every good journey starts with hello.</H1>
      <Body>We'd love to hear about your pet, your goals and what you'd like to learn.</Body>
      <Image source={images.contact} style={st.heroImg} />
      <H2>Tell us how we can help</H2>
      <Text style={st.cardSub}>Fields marked * are required.</Text>
      <Field label="Name *" value={f.name} onChangeText={set('name')} err={errs.name} placeholder="Your full name" />
      <Field label="Email *" value={f.email} onChangeText={set('email')} err={errs.email} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone" value={f.phone} onChangeText={set('phone')} err={errs.phone} placeholder="Your phone number" keyboardType="phone-pad" />
      <Text style={st.label}>Course</Text>
      <View style={st.input}><Picker selectedValue={f.course} onValueChange={set('course')} style={{ margin: -12 }}>
        {courses.map((c) => <Picker.Item key={c.id} label={c.name} value={c.name} />)}</Picker></View>
      <View style={{ height: 10 }} />
      <Field label="Message *" value={f.msg} onChangeText={set('msg')} err={errs.msg} placeholder="How can we help?" multiline />
      <Btn label="Send message" onPress={send} />
      {!!done && <Text style={st.success}>{done}</Text>}

      <H2>Let's talk pets</H2>
      <Text style={st.cardSub}>Sample contact details, please confirm before visiting.</Text>
      <Info icon="location" text="123 Example Road, Morningside, Durban, 4001" />
      <Info icon="call" text="+27 (0)31 000 0000" onPress={() => Linking.openURL('tel:+27310000000')} />
      <Info icon="mail" text="hello@pawsitive.example" onPress={() => Linking.openURL('mailto:hello@pawsitive.example')} />
      <View style={{ flexDirection: 'row', gap: 18, marginVertical: 10 }}>
        {[['logo-facebook', 'https://facebook.com'], ['logo-instagram', 'https://instagram.com'], ['logo-tiktok', 'https://tiktok.com']].map(([i, u]) => (
          <TouchableOpacity key={i} onPress={() => Linking.openURL(u)}><Ionicons name={i} size={30} color={colors.teal} /></TouchableOpacity>))}
      </View>
      <H2>Venue hours</H2>
      <View style={st.table}>{hours.map(([d, h]) => (<View key={d} style={st.tr}><Text style={[st.td, { flex: 1 }]}>{d}</Text><Text style={[st.td, { flex: 1 }]}>{h}</Text></View>))}</View>
      <H2>Find us</H2>
      <View style={{ height: 240, borderRadius: 18, overflow: 'hidden', marginBottom: 10 }}>
        <WebView source={{ uri: 'https://maps.google.com/maps?q=Morningside,Durban&output=embed' }} />
      </View>
      <Btn label="Get directions" outline onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=Morningside+Durban')} />
    </Page>
  );
}
const Info = ({ icon, text, onPress }) => (
  <TouchableOpacity disabled={!onPress} onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
    <Ionicons name={icon} size={22} color={colors.teal} /><Text style={[st.body, { marginLeft: 10, marginBottom: 0 }]}>{text}</Text></TouchableOpacity>
);

/* ---------------- STYLES ---------------- */
const st = StyleSheet.create({
  heroImg: { width: '100%', height: 260, resizeMode: 'cover', borderRadius: 22, marginVertical: 12, backgroundColor: colors.mint },
  link: { color: colors.teal, fontWeight: '700', marginVertical: 14 },
  card: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  cardImg: { width: '100%', height: 190, resizeMode: 'cover', backgroundColor: colors.mint },
  cardTitle: { fontFamily: serif, fontSize: 20, color: colors.teal },
  cardSub: { fontSize: 13, color: '#777' },
  price: { fontWeight: '700', color: colors.teal, fontSize: 16 },
  bigPrice: { fontFamily: serif, fontSize: 34, color: colors.teal },
  caption: { color: colors.teal, fontWeight: '700', marginBottom: 6 },
  stats: { backgroundColor: colors.mint, borderRadius: 20, padding: 20, marginTop: 16 },
  statBig: { fontFamily: serif, fontSize: 26, color: colors.teal },
  chip: { borderWidth: 1.5, borderColor: colors.teal, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  chipOn: { backgroundColor: colors.teal },
  quoteBox: { backgroundColor: colors.teal, borderRadius: 24, padding: 20, marginVertical: 10 },
  eyebrowO: { color: colors.orange, fontWeight: '700', fontSize: 11, marginBottom: 10 },
  hr: { height: 1, backgroundColor: 'rgba(255,255,255,0.4)', marginVertical: 8 },
  label: { fontWeight: '600', color: '#222', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#d9d2c5', borderRadius: 12, padding: 12, fontSize: 15 },
  opt: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5dfd2', borderRadius: 14, padding: 14, marginBottom: 10 },
  optOn: { backgroundColor: colors.mint, borderColor: colors.teal },
  success: { backgroundColor: colors.mint, borderLeftWidth: 5, borderLeftColor: colors.teal, padding: 12, borderRadius: 10, marginTop: 14, color: colors.teal },
  table: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 8 },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  td: { padding: 10, fontSize: 13, color: colors.text },
  th: { color: '#fff', fontWeight: '700' },
  body: { fontSize: 15, color: colors.text },
});
