# Sawigo Trip

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full-screen hero section with cinematic video/image background, headline, subtext, gold CTA buttons
- Trust bar with 5 trust icons below hero
- Jim Corbett featured destination highlight section with "Most Booked" badge
- Destinations grid (15 destinations) with cards: image, description, activities, explore button
- RG Stay & Trip section: hotel star categories (3★/4★/5★) + cab categories (Standard/Deluxe/Premium/Luxury)
- Experiences section: Destination Wedding, Pre-Wedding Shoot, Corporate Events, Office Retreats
- WildGo Adventure section: Hiking, Camping, Jungle Safari, Trekking, River Rafting, Snow Activities (dark theme)
- Packages section: 7 categories + dynamic inquiry form (Name, Phone, Destination, Travel Date, Guests, Budget, Special Req)
- About Us section with emotional copy and key trust points
- Blog section with 3 sample posts
- Contact section with clickable phone, WhatsApp floating button, sticky mobile call button, map placeholder
- Footer with brand tagline, links, social icons
- Sticky WhatsApp floating button (bottom right)
- Sticky mobile call button

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate cinematic hero image + destination images via image generation
2. Generate Motoko backend for storing inquiry form submissions and blog posts
3. Build React frontend with all sections in order: Navbar, Hero, TrustBar, JimCorbett, Destinations, RGStay, Experiences, WildGo, Packages+Form, About, Blog, Contact, Footer
4. Wire inquiry form to backend canister
5. Add smooth scroll animations (Intersection Observer), hover effects, gold gradient CTAs
6. Add floating WhatsApp button and sticky mobile call button
7. Ensure mobile-first responsive layout
