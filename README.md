# Pawsitive Pet Academy: Mobile App

Mobile application for **Pawsitive Pet Academy**, a pet education and training academy in Durban, South Africa, founded in 2023 by Sarah Smith. Built with **React Native (Expo)** for **XHAW5112 (Work Integrated Learning), Task 2, Phase 2**. It follows the look, feel and functionality of our Figma wireframes and matches the Pawsitive website.

## Features
- Navigation: bottom tab bar (Home, Courses, Fees, Contact) and a hamburger menu that also links to About Us
- Home: logo, short introduction, links to both course groups, images
- About Us: history, vision, mission, goals, founder photo and stats
- Courses: summary split into Six-Month Programmes (R1500 each) and Short Courses (R750 each), with filter chips; every course opens its own detail screen with description, fee and what you will learn
- Fees: fee calculator with name, phone and email fields, a checkbox list of courses and a Calculate Total button. The total includes the bundle discount and 15% VAT. Requested quotes are stored in an array and shown in a table
- Contact: enquiry form with a course drop-down, phone, email and social links, venue hours table, embedded map and a Get directions button
- Error handling: names, South African phone numbers, email addresses and message length are validated, with error messages under each field

## Fee rules
- Subtotal of the selected courses
- 10% bundle discount when 3 or more courses are selected
- 15% VAT on the discounted amount
- The result is a quote only, not a formal invoice

## Tech stack
- React Native with Expo
- React Navigation (bottom tabs and native stacks)
- @expo/vector-icons, @react-native-picker/picker, react-native-webview

## Project structure
- App.js: navigation setup (tabs and stacks)
- src/theme.js: colours and fonts
- src/data.js: course data array, fee calculation, validators
- src/components.js: header with menu or back arrow, buttons and text helpers
- src/screens.js: Home, About, Courses, Course Detail, Fees and Contact screens
- src/assets/: logo and images

## How to run
1. Install Node.js (LTS) and install **Expo Go** on your phone
2. Clone this repository and open the folder in a terminal
3. Run: npm install
4. Run: npx expo start
5. Scan the QR code with Expo Go (same Wi-Fi), or press w to preview in the browser

Note: the embedded map works on a phone in Expo Go. It may not display in the browser preview.

## Team
| Name | Role | GitHub |
|---|---|---|
| Mpho Mbele | Team Leader | popodev24 |
| Tshepiso Ntsoele | Team Secretary | Peace-O |
| Antonio Zakassa | Infrastructure / GitHub Lead | antoniozakassa-sys |

## Notes
- Images were generated with AI (Figma AI) or sourced for illustrative purposes only
- The address, phone number and email shown are sample placeholders, not real business details
- Related repository: Pawsitive website (HTML), https://github.com/popodev24/pawsitive-website
