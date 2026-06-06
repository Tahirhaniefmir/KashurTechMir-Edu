# Kashur System

## Overview
An educational mobile app for Kashur System - an educational platform by Tahir Hanief Mir that provides quality notes, previous year papers, project assistance, lab training, and courses to students in Jammu & Kashmir.

## App Structure

### Tech Stack
- **Frontend**: Expo React Native with Expo Router (file-based routing)
- **Backend**: Express.js with TypeScript
- **Fonts**: Poppins (Google Fonts via @expo-google-fonts/poppins)
- **Theme**: Blue & White (deep navy #0A2463 primary)

### Navigation
Single-page scrollable app with a sticky horizontal nav bar linking to sections.

### Sections
1. **Hero** - KashurTechMir intro, tagline, animated CTA
2. **About** - Platform mission and 6-feature grid
3. **Classes** - NCERT & CBSE board toggle, Classes 6-12 with expandable subjects, Notes & PYQ download
4. **Project Assistance** - Step-by-step guidance, Request Help CTA
5. **Lab Training** - Feature grid, join button
6. **Courses** - 4 course cards (Programming, MATLAB, Basic Computer, Technical)
7. **Contact** - Phone, Email, YouTube, Facebook + contact form
8. **Footer** - Links, copyright, social icons

### File Structure
- `app/index.tsx` - Main screen tying all sections together
- `app/_layout.tsx` - Root layout with fonts, providers
- `components/NavBar.tsx` - Sticky top navigation with section scroll
- `components/HeroSection.tsx` - Hero with animations
- `components/AboutSection.tsx` - About with feature grid
- `components/ClassesSection.tsx` - NCERT/CBSE board toggle + class cards
- `components/ProjectSection.tsx` - Project assistance section
- `components/LabSection.tsx` - Lab training with gradient
- `components/CoursesSection.tsx` - Course cards with enroll buttons
- `components/ContactSection.tsx` - Contact info + form
- `components/FooterSection.tsx` - Footer with links and copyright
- `constants/colors.ts` - Brand color palette
- `server/` - Express backend (minimal, serves landing page)

## Contact Info (as configured in app)
- Phone: 9797853293
- Email: tahirhaniefmir@gmail.com
- YouTube/Facebook: placeholders (to be updated)

## Development
- Frontend runs on port 8081 (Expo)
- Backend runs on port 5000 (Express)
- Scan QR code from Replit URL bar with Expo Go to test on device
