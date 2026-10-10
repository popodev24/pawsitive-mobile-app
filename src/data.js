export const images = {
  logo: require('./assets/logo.png'),
  hero: require('./assets/hero.jpg'),
  sarah: require('./assets/sarah.jpg'),
  contact: require('./assets/contact.jpg'),
  fees: require('./assets/fees.jpg'),
  canine: require('./assets/canine.jpg'),
  grooming: require('./assets/grooming.jpg'),
  behaviour: require('./assets/behaviour.jpg'),
  business: require('./assets/business.jpg'),
  puppy: require('./assets/puppy.jpg'),
  firstaid: require('./assets/firstaid.jpg'),
  cat: require('./assets/cat.jpg'),
};

// Array of course objects
export const courses = [
  { id: 1, name: 'Canine Obedience Training', type: 'Six-Month Programme', duration: '12 weeks', fee: 1500, img: 'canine', tagline: 'A stronger bond starts here', desc: 'Help your dog become a calmer, more confident companion. Learn practical, reward-based skills that make everyday life together easier.', learn: ['Core commands: sit, stay, come, heel', 'Calm lead walking', 'Reading your dog\'s body language'] },
  { id: 2, name: 'Pet Grooming', type: 'Six-Month Programme', duration: '12 weeks', fee: 1500, img: 'grooming', tagline: 'Look good, feel good', desc: 'Learn coat care, bathing, brushing and safe grooming techniques for different breeds.', learn: ['Bathing and drying', 'Coat and nail care', 'Handling nervous pets'] },
  { id: 3, name: 'Animal Behaviour', type: 'Six-Month Programme', duration: '12 weeks', fee: 1500, img: 'behaviour', tagline: 'Understand the why', desc: 'Understand why pets do what they do and how to respond with kindness and confidence.', learn: ['Body language', 'Common behaviour problems', 'Positive reinforcement'] },
  { id: 4, name: 'Pet Business Management', type: 'Six-Month Programme', duration: '12 weeks', fee: 1500, img: 'business', tagline: 'Turn passion into a business', desc: 'Learn how to plan, market and run a successful pet care business.', learn: ['Business planning', 'Pricing and marketing', 'Customer service'] },
  { id: 5, name: 'Puppy Care', type: 'Short Course', duration: 'Short course', fee: 750, img: 'puppy', tagline: 'A great start for your pup', desc: 'Everything you need to raise a happy, healthy puppy.', learn: ['Feeding and health', 'House training', 'Socialisation'] },
  { id: 6, name: 'Pet First Aid', type: 'Short Course', duration: 'Short course', fee: 750, img: 'firstaid', tagline: 'Be ready when it matters', desc: 'Learn how to respond calmly in common pet emergencies.', learn: ['Basic first aid', 'Recognising emergencies', 'Building a pet first aid kit'] },
  { id: 7, name: 'Cat Care Basics', type: 'Short Course', duration: 'Short course', fee: 750, img: 'cat', tagline: 'Happy cats, happy homes', desc: 'Everyday care and enrichment for cats.', learn: ['Nutrition', 'Enrichment', 'Health checks'] },
];

export const VAT_RATE = 0.15;
export const DISCOUNT_RATE = 0.10;
export const DISCOUNT_MIN = 3;
export const money = (n) => 'R' + n.toFixed(2);

export const calculate = (list) => {
  const subtotal = list.reduce((s, c) => s + c.fee, 0);
  const discount = list.length >= DISCOUNT_MIN ? subtotal * DISCOUNT_RATE : 0;
  const vat = (subtotal - discount) * VAT_RATE;
  return { subtotal, discount, vat, total: subtotal - discount + vat };
};

export const nameOk = (v) => /^[A-Za-z][A-Za-z\s'-]+$/.test(v.trim());
export const phoneOk = (v) => /^(\+27|0)[0-9]{9}$/.test(v.replace(/[\s()-]/g, ''));
export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
