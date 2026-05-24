# TemplateHub — 500 Website Templates in Pure HTML, CSS & JavaScript

A complete library of **500 responsive website templates** across **25 categories**, built with nothing but **HTML5, CSS3 and vanilla JavaScript**. No frameworks, no build tools, no package managers, no CDNs, no paid assets — every template runs by simply opening its `index.html` in a browser.

## What's inside

| Category | Folder | Templates |
| --- | --- | --- |
| 🛍️ Ecommerce | [`templates/ecommerce/`](templates/ecommerce/) | 20 |
| 🚀 Landing Pages | [`templates/landing-page/`](templates/landing-page/) | 20 |
| 🏢 Company Profiles | [`templates/company-profile/`](templates/company-profile/) | 20 |
| 👤 Portfolios | [`templates/portfolio/`](templates/portfolio/) | 20 |
| 📊 Admin Dashboards | [`templates/admin-dashboard/`](templates/admin-dashboard/) | 20 |
| 📰 Blog & Magazine | [`templates/blog-magazine/`](templates/blog-magazine/) | 20 |
| 🍽️ Restaurant & Food | [`templates/restaurant-food/`](templates/restaurant-food/) | 20 |
| 💍 Event & Wedding | [`templates/event-wedding/`](templates/event-wedding/) | 20 |
| 🏝️ Travel & Hotel | [`templates/travel-hotel/`](templates/travel-hotel/) | 20 |
| 💪 Health & Fitness | [`templates/health-fitness/`](templates/health-fitness/) | 20 |
| 🎓 Education & Course | [`templates/education-course/`](templates/education-course/) | 20 |
| 🏠 Real Estate & Property | [`templates/real-estate-property/`](templates/real-estate-property/) | 20 |
| 🧩 Utility Pages | [`templates/utility-pages/`](templates/utility-pages/) | 20 |
| ❤️ Nonprofit & Charity | [`templates/nonprofit-charity/`](templates/nonprofit-charity/) | 20 |
| 🚗 Automotive | [`templates/automotive/`](templates/automotive/) | 20 |
| 💇 Beauty & Salon | [`templates/beauty-salon/`](templates/beauty-salon/) | 20 |
| 🏦 Finance & Banking | [`templates/finance-banking/`](templates/finance-banking/) | 20 |
| 🎵 Music & Entertainment | [`templates/music-entertainment/`](templates/music-entertainment/) | 20 |
| 🌾 Agriculture & Farming | [`templates/agriculture-farming/`](templates/agriculture-farming/) | 20 |
| 🏆 Sports & Recreation | [`templates/sports-recreation/`](templates/sports-recreation/) | 20 |
| 🐾 Pet Services | [`templates/pet-services/`](templates/pet-services/) | 20 |
| 💻 Technology Services | [`templates/technology-services/`](templates/technology-services/) | 20 |
| 🚚 Logistics & Transport | [`templates/logistics-transport/`](templates/logistics-transport/) | 20 |
| 🔧 Home Services | [`templates/home-services/`](templates/home-services/) | 20 |
| 🏛️ Government & Public | [`templates/government-public/`](templates/government-public/) | 20 |
| **Total** | | **500** |

Each template is fully self-contained with its own four files:

```
index.html   — semantic, responsive markup
style.css    — complete standalone stylesheet (CSS custom properties for theming)
script.js    — vanilla JS interactions (menus, filters, carts, charts, accordions…)
README.md    — template-specific docs and customization notes
```

## Quick start

```bash
git clone <this-repository>
cd template-website
```

Then open **`index.html`** at the repository root — it's a gallery page that lists,
searches and links to all 500 templates. Or open any single template directly,
e.g. `templates/ecommerce/template-01-fashion-store/index.html`. Everything works
offline from the filesystem; no server is required.

## Folder structure

```
template-website/
├── index.html              # Template gallery (search + category filter)
├── style.css               # Gallery styles
├── script.js               # Gallery logic + template manifest
├── README.md               # This file
└── templates/
    ├── ecommerce/
    │   ├── template-01-fashion-store/
    │   │   ├── index.html
    │   │   ├── style.css
    │   │   ├── script.js
    │   │   └── README.md
    │   └── … (20 templates)
    ├── landing-page/            # 20 templates
    ├── company-profile/         # 20 templates
    ├── portfolio/               # 20 templates
    ├── admin-dashboard/         # 20 templates
    ├── blog-magazine/           # 20 templates
    ├── restaurant-food/         # 20 templates
    ├── event-wedding/           # 20 templates
    ├── travel-hotel/            # 20 templates
    ├── health-fitness/          # 20 templates
    ├── education-course/        # 20 templates
    ├── real-estate-property/    # 20 templates
    ├── utility-pages/           # 20 templates
    ├── nonprofit-charity/       # 20 templates
    ├── automotive/              # 20 templates
    ├── beauty-salon/            # 20 templates
    ├── finance-banking/         # 20 templates
    ├── music-entertainment/     # 20 templates
    ├── agriculture-farming/     # 20 templates
    ├── sports-recreation/       # 20 templates
    ├── pet-services/            # 20 templates
    ├── technology-services/     # 20 templates
    ├── logistics-transport/     # 20 templates
    ├── home-services/           # 20 templates
    └── government-public/       # 20 templates
```

## Design & engineering notes

- **Every template has its own visual direction** — different layout structure, palette, typography, shape language and decorative motifs. They are not recolors of one base file.
- **Responsive by default**: desktop, tablet and mobile breakpoints, with JS mobile menus and off-canvas dashboard sidebars.
- **Interactions included**: cart counters and mini-cart drawers, FAQ accordions, tabs, filter buttons, modals, dropdowns, form validation, theme toggles, count-up stats, live countdowns, booking and RSVP forms, mortgage calculators, password-strength meters and dependency-free animated charts (bars, SVG lines, conic donuts).
- **No external requests**: system font stacks, CSS-gradient/inline-SVG imagery, zero CDN links. Templates pass an automated check for external URLs.
- **Semantic, accessible markup**: landmarks, one `h1` per page, `aria-expanded` on toggles, visible focus styles.

## Customizing a template

1. Copy the template's folder anywhere you like.
2. Open `style.css` — the palette, radius and fonts live in CSS custom properties at the top (`:root { --bg, --ink, --accent, … }`). Change a few variables to re-skin the whole page.
3. Replace the placeholder copy, products, projects or table rows in `index.html`.
4. The gradient/SVG image placeholders are plain CSS classes — swap them for real `<img>` assets when you have them.
5. Each template's own `README.md` lists its sections, JS features and main variables.

## Template index

<!-- TPL_INDEX_START -->
### Ecommerce (20)

<details>
<summary>View all 20 ecommerce templates</summary>

- [Maison Linnea — Fashion Store](templates/ecommerce/template-01-fashion-store/)
- [Nordvolt — Electronics Store](templates/ecommerce/template-02-electronics-store/)
- [Rosaline — Beauty Store](templates/ecommerce/template-03-beauty-store/)
- [Grain & Form — Furniture Store](templates/ecommerce/template-04-furniture-store/)
- [Kiln & Crema — Coffee Store](templates/ecommerce/template-05-coffee-store/)
- [Hyperlace — Sneaker Store](templates/ecommerce/template-06-sneaker-store/)
- [Aurum & Crown — Watch Store](templates/ecommerce/template-07-watch-store/)
- [Greengate Grocer — Grocery Store](templates/ecommerce/template-08-grocery-store/)
- [The Marginalia — Book Store](templates/ecommerce/template-09-book-store/)
- [Eunoia Skin — Skincare Store](templates/ecommerce/template-10-skincare-store/)
- [Nebula Vault — Digital Product Store](templates/ecommerce/template-11-digital-product-store/)
- [HexRig — Gaming Gear Store](templates/ecommerce/template-12-gaming-gear-store/)
- [Wag & Whisker — Pet Shop](templates/ecommerce/template-13-pet-shop/)
- [Ondine & Or — Jewelry Store](templates/ecommerce/template-14-jewelry-store/)
- [Fern & Loam — Plant Store](templates/ecommerce/template-15-plant-store/)
- [Apex Motion — Sports Store](templates/ecommerce/template-16-sports-store/)
- [Little Lark — Baby Store](templates/ecommerce/template-17-baby-store/)
- [Hearth & Hue — Home Decor Store](templates/ecommerce/template-18-home-decor-store/)
- [Static Youth — Streetwear Store](templates/ecommerce/template-19-streetwear-store/)
- [Vetted & Co. — Premium Marketplace](templates/ecommerce/template-20-premium-marketplace/)

</details>

### Landing Pages (20)

<details>
<summary>View all 20 landing pages templates</summary>

- [Pulsedeck — SaaS Product](templates/landing-page/template-01-saas-product/)
- [Mindgrid — AI Tool](templates/landing-page/template-02-ai-tool/)
- [Daybloom — Mobile App](templates/landing-page/template-03-mobile-app/)
- [Inkwell Academy — Online Course](templates/landing-page/template-04-online-course/)
- [Forgefit — Fitness Program](templates/landing-page/template-05-fitness-program/)
- [Nova Summit — Event Conference](templates/landing-page/template-06-event-conference/)
- [Redline Studio — Agency Offer](templates/landing-page/template-07-agency-offer/)
- [The Margin — Newsletter](templates/landing-page/template-08-newsletter/)
- [Aurelia Estates — Real Estate](templates/landing-page/template-09-real-estate/)
- [Plannery — Productivity Tool](templates/landing-page/template-10-productivity-tool/)
- [Mintarc — Finance App](templates/landing-page/template-11-finance-app/)
- [Wellfern — Health App](templates/landing-page/template-12-health-app/)
- [Brightreel — Creator Tool](templates/landing-page/template-13-creator-tool/)
- [Cipherline — Cybersecurity](templates/landing-page/template-14-cybersecurity/)
- [Pipewise — CRM Software](templates/landing-page/template-15-crm-software/)
- [Bookmint — Booking Platform](templates/landing-page/template-16-booking-platform/)
- [Scholarpath — Education Platform](templates/landing-page/template-17-education-platform/)
- [Glowroom — Community Platform](templates/landing-page/template-18-community-platform/)
- [Loopforge — Automation Tool](templates/landing-page/template-19-automation-tool/)
- [Meridian — Startup Waitlist](templates/landing-page/template-20-startup-waitlist/)

</details>

### Company Profiles (20)

<details>
<summary>View all 20 company profiles templates</summary>

- [Nexcore Systems — Tech Company](templates/company-profile/template-01-tech-company/)
- [IronRidge Constructions — Construction Company](templates/company-profile/template-02-construction-company/)
- [Studio Vermilion — Marketing Agency](templates/company-profile/template-03-marketing-agency/)
- [Hartwell & Crane LLP — Law Firm](templates/company-profile/template-04-law-firm/)
- [MeridianHaul Logistics — Logistics Company](templates/company-profile/template-05-logistics-company/)
- [Aldergate Advisory — Finance Consultant](templates/company-profile/template-06-finance-consultant/)
- [Atelier Northgrid — Architecture Studio](templates/company-profile/template-07-architecture-studio/)
- [Brightwater Clinic — Healthcare Clinic](templates/company-profile/template-08-healthcare-clinic/)
- [Alder Gate College — Education Institution](templates/company-profile/template-09-education-institution/)
- [Foxglove Estates — Real Estate Company](templates/company-profile/template-10-real-estate-company/)
- [Casa Fiorelli Group — Restaurant Group](templates/company-profile/template-11-restaurant-group/)
- [Vulkan Precision Works — Manufacturing Company](templates/company-profile/template-12-manufacturing-company/)
- [Pigeonhole Studio — Creative Studio](templates/company-profile/template-13-creative-studio/)
- [Solana Voyages — Travel Company](templates/company-profile/template-14-travel-company/)
- [Sentinel Axis — Security Company](templates/company-profile/template-15-security-company/)
- [Mosaic People Partners — HR Consulting](templates/company-profile/template-16-hr-consulting/)
- [Velvet Comet Events — Event Organizer](templates/company-profile/template-17-event-organizer/)
- [Verdant Grid Energy — Renewable Energy](templates/company-profile/template-18-renewable-energy/)
- [Maison Ochre & Fen — Interior Design](templates/company-profile/template-19-interior-design/)
- [Hearthside Hardware & Home — Local Business](templates/company-profile/template-20-local-business/)

</details>

### Portfolios (20)

<details>
<summary>View all 20 portfolios templates</summary>

- [Maya Lindqvist — UI/UX Designer](templates/portfolio/template-01-uiux-designer/)
- [Devon Carter — Frontend Developer](templates/portfolio/template-02-frontend-developer/)
- [Sofia Marchetti — Photographer](templates/portfolio/template-03-photographer/)
- [Jae-won Park — Video Editor](templates/portfolio/template-04-video-editor/)
- [Eleanor Whitfield — Copywriter](templates/portfolio/template-05-copywriter/)
- [Tomas Reyes — Architect](templates/portfolio/template-06-architect/)
- [Priya Raghavan — Product Designer](templates/portfolio/template-07-product-designer/)
- [Luca Moreau — Motion Designer](templates/portfolio/template-08-motion-designer/)
- [Hana Sato — Illustrator](templates/portfolio/template-09-illustrator/)
- [Marcus Oyelaran — Data Analyst](templates/portfolio/template-10-data-analyst/)
- [Camille Dubois — Marketing Strategist](templates/portfolio/template-11-marketing-strategist/)
- [Adrian Volkov — Personal Brand](templates/portfolio/template-12-personal-brand/)
- [Nadia Haddad — Freelancer](templates/portfolio/template-13-freelancer/)
- [Theo Okafor — Student Portfolio](templates/portfolio/template-14-student-portfolio/)
- [Isabella Fontaine — Creative Director](templates/portfolio/template-15-creative-director/)
- [Rohan Mehta — Software Engineer](templates/portfolio/template-16-software-engineer/)
- [Zara Nilsson — 3D Artist](templates/portfolio/template-17-3d-artist/)
- [William Ashford — Consultant](templates/portfolio/template-18-consultant/)
- [Margaret Liu — Writer](templates/portfolio/template-19-writer/)
- [Daniel Kim — Startup Founder](templates/portfolio/template-20-startup-founder/)

</details>

### Admin Dashboards (20)

<details>
<summary>View all 20 admin dashboards templates</summary>

- [Northpeak — Sales Dashboard](templates/admin-dashboard/template-01-sales-dashboard/)
- [Cartloom — Ecommerce Admin](templates/admin-dashboard/template-02-ecommerce-admin/)
- [Pipeforge — CRM Dashboard](templates/admin-dashboard/template-03-crm-dashboard/)
- [Ledgerline — Finance Dashboard](templates/admin-dashboard/template-04-finance-dashboard/)
- [Peoplewise — HR Dashboard](templates/admin-dashboard/template-05-hr-dashboard/)
- [Sprintdeck — Project Management](templates/admin-dashboard/template-06-project-management/)
- [Metricore — Analytics Dashboard](templates/admin-dashboard/template-07-analytics-dashboard/)
- [Orbitly — SaaS Dashboard](templates/admin-dashboard/template-08-saas-dashboard/)
- [Stockpilot — Inventory Dashboard](templates/admin-dashboard/template-09-inventory-dashboard/)
- [Campusgrove — School Admin](templates/admin-dashboard/template-10-school-admin/)
- [Wardlight — Hospital Admin](templates/admin-dashboard/template-11-hospital-admin/)
- [Hearthview — Real Estate Admin](templates/admin-dashboard/template-12-real-estate-admin/)
- [Funnelfox — Marketing Dashboard](templates/admin-dashboard/template-13-marketing-dashboard/)
- [Inkflow — Content Dashboard](templates/admin-dashboard/template-14-content-dashboard/)
- [Resolvo — Support Tickets](templates/admin-dashboard/template-15-support-tickets/)
- [Freightwise — Logistics Dashboard](templates/admin-dashboard/template-16-logistics-dashboard/)
- [Stayline — Booking Dashboard](templates/admin-dashboard/template-17-booking-dashboard/)
- [Clubrise — Membership Dashboard](templates/admin-dashboard/template-18-membership-dashboard/)
- [Tokentrace — AI Usage Dashboard](templates/admin-dashboard/template-19-ai-usage-dashboard/)
- [Fanforge — Creator Dashboard](templates/admin-dashboard/template-20-creator-dashboard/)

</details>

### Blog & Magazine (20)

<details>
<summary>View all 20 blog & magazine templates</summary>

- [Inkwell & Ash — Personal Blog](templates/blog-magazine/template-01-personal-blog/)
- [Stackline — Tech Blog](templates/blog-magazine/template-02-tech-blog/)
- [The Daily Meridian — News Portal](templates/blog-magazine/template-03-news-portal/)
- [Lumière — Fashion Magazine](templates/blog-magazine/template-04-fashion-magazine/)
- [Butter & Thyme — Recipe Blog](templates/blog-magazine/template-05-recipe-blog/)
- [The Wanderlog — Travel Journal](templates/blog-magazine/template-06-travel-journal/)
- [Grindhouse Weekly — Movie Review Blog](templates/blog-magazine/template-07-movie-review-blog/)
- [Frequency — Music Magazine](templates/blog-magazine/template-08-music-magazine/)
- [Full Press — Sports News](templates/blog-magazine/template-09-sports-news/)
- [Orbital — Science Magazine](templates/blog-magazine/template-10-science-magazine/)
- [The Ledger Standard — Business Journal](templates/blog-magazine/template-11-business-journal/)
- [Golden Hour — Lifestyle Magazine](templates/blog-magazine/template-12-lifestyle-magazine/)
- [Respawn Point — Gaming Blog](templates/blog-magazine/template-13-gaming-blog/)
- [Little Wonders — Parenting Blog](templates/blog-magazine/template-14-parenting-blog/)
- [The Marginalia Review — Book Review Blog](templates/blog-magazine/template-15-book-review-blog/)
- [Aperture Null — Photography Zine](templates/blog-magazine/template-16-photography-zine/)
- [Basis Point — Finance Blog](templates/blog-magazine/template-17-finance-blog/)
- [Stillpoint — Health Wellness Blog](templates/blog-magazine/template-18-health-wellness-blog/)
- [TILT — Art Culture Magazine](templates/blog-magazine/template-19-art-culture-magazine/)
- [Static & Signal — Podcast Blog](templates/blog-magazine/template-20-podcast-blog/)

</details>

### Restaurant & Food (20)

<details>
<summary>View all 20 restaurant & food templates</summary>

- [Lumière & Ash — Fine Dining](templates/restaurant-food/template-01-fine-dining/)
- [Harrow & Bean — Cafe](templates/restaurant-food/template-02-cafe/)
- [Butterfold Bakehouse — Bakery](templates/restaurant-food/template-03-bakery/)
- [Rosso Forno — Pizzeria](templates/restaurant-food/template-04-pizzeria/)
- [Kanade — Sushi Japanese](templates/restaurant-food/template-05-sushi-japanese/)
- [Hatch & Griddle — Burger Joint](templates/restaurant-food/template-06-burger-joint/)
- [Rootline Kitchen — Vegan Restaurant](templates/restaurant-food/template-07-vegan-restaurant/)
- [Saltline & Tide — Seafood Restaurant](templates/restaurant-food/template-08-seafood-restaurant/)
- [Emberline Chophouse — Steakhouse](templates/restaurant-food/template-09-steakhouse/)
- [Moonmilk Creamery — Ice Cream Parlor](templates/restaurant-food/template-10-ice-cream-parlor/)
- [Citrus Comet — Food Truck](templates/restaurant-food/template-11-food-truck/)
- [Velvet Thyme — Catering Service](templates/restaurant-food/template-12-catering-service/)
- [Tangle — Noodle Bar](templates/restaurant-food/template-13-noodle-bar/)
- [Yolk & Marigold — Brunch Bistro](templates/restaurant-food/template-14-brunch-bistro/)
- [Black Kettle — BBQ Smokehouse](templates/restaurant-food/template-15-bbq-smokehouse/)
- [Cala Roja — Tapas Wine Bar](templates/restaurant-food/template-16-tapas-wine-bar/)
- [Dapur Kunyit — Indonesian Restaurant](templates/restaurant-food/template-17-indonesian-restaurant/)
- [Pulp & Glow — Juice Smoothie Bar](templates/restaurant-food/template-18-juice-smoothie-bar/)
- [Platerunner — Food Delivery](templates/restaurant-food/template-19-food-delivery/)
- [Copper Spoon Atelier — Cooking Class](templates/restaurant-food/template-20-cooking-class/)

</details>

### Event & Wedding (20)

<details>
<summary>View all 20 event & wedding templates</summary>

- [Eleanor & Theodore — Classic Wedding](templates/event-wedding/template-01-classic-wedding/)
- [Hazel & Jonah — Rustic Wedding](templates/event-wedding/template-02-rustic-wedding/)
- [Mara & Idris — Modern Wedding](templates/event-wedding/template-03-modern-wedding/)
- [Aisha & Yusuf — Islamic Wedding](templates/event-wedding/template-04-islamic-wedding/)
- [Sienna & Leo — Engagement Party](templates/event-wedding/template-05-engagement-party/)
- [Olivia Turns 30 — Birthday Party](templates/event-wedding/template-06-birthday-party/)
- [Max is Turning 6! — Kids Birthday](templates/event-wedding/template-07-kids-birthday/)
- [Baby Rivera — Baby Shower](templates/event-wedding/template-08-baby-shower/)
- [Class of 2026 — Graduation Party](templates/event-wedding/template-09-graduation-party/)
- [ShiftStack 2026 — Tech Conference](templates/event-wedding/template-10-tech-conference/)
- [Solstice Sound 2026 — Music Festival](templates/event-wedding/template-11-music-festival/)
- [The Lumen Gala — Charity Gala](templates/event-wedding/template-12-charity-gala/)
- [The Growth Lab Live — Online Webinar](templates/event-wedding/template-13-online-webinar/)
- [Aero One Reveal — Product Launch Event](templates/event-wedding/template-14-product-launch-event/)
- [Liminal: New Works — Art Exhibition](templates/event-wedding/template-15-art-exhibition/)
- [Northlight Film Festival — Film Festival](templates/event-wedding/template-16-film-festival/)
- [Capital Cup 2026 — Sports Tournament](templates/event-wedding/template-17-sports-tournament/)
- [The Riverside Get-Together — Community Meetup](templates/event-wedding/template-18-community-meetup/)
- [Robert & Margaret — Anniversary](templates/event-wedding/template-19-anniversary/)
- [Midnight 2027 — New Year Party](templates/event-wedding/template-20-new-year-party/)

</details>

### Travel & Hotel (20)

<details>
<summary>View all 20 travel & hotel templates</summary>

- [The Meridian Crest — Luxury Hotel](templates/travel-hotel/template-01-luxury-hotel/)
- [Maison Olivetta — Boutique Hotel](templates/travel-hotel/template-02-boutique-hotel/)
- [Coralline Bay Resort — Beach Resort](templates/travel-hotel/template-03-beach-resort/)
- [Blackpine Hollow Lodge — Mountain Lodge](templates/travel-hotel/template-04-mountain-lodge/)
- [The Tramline Hostel — City Hostel](templates/travel-hotel/template-05-city-hostel/)
- [Casa Terramar — Villa Rental](templates/travel-hotel/template-06-villa-rental/)
- [Wildfern Glamping — Glamping Site](templates/travel-hotel/template-07-glamping-site/)
- [Greenline Expeditions — Tour Operator](templates/travel-hotel/template-08-tour-operator/)
- [Lisbon Unfolded — Destination Guide](templates/travel-hotel/template-09-destination-guide/)
- [Aurelia Ocean Voyages — Cruise Line](templates/travel-hotel/template-10-cruise-line/)
- [Acacia Plains Safaris — Safari Adventure](templates/travel-hotel/template-11-safari-adventure/)
- [Glacier Hollow Ski Resort — Ski Resort](templates/travel-hotel/template-12-ski-resort/)
- [Wayfare & Co. — Travel Agency](templates/travel-hotel/template-13-travel-agency/)
- [The Lanyard Residences — Serviced Apartment](templates/travel-hotel/template-14-serviced-apartment/)
- [Mosswood Eco Retreat — Eco Retreat](templates/travel-hotel/template-15-eco-retreat/)
- [Rambler Vans — Campervan Rental](templates/travel-hotel/template-16-campervan-rental/)
- [Abyssal Blue Dive Center — Dive Center](templates/travel-hotel/template-17-dive-center/)
- [The Ashbourne Manor — Heritage Hotel](templates/travel-hotel/template-18-heritage-hotel/)
- [Meridian Yacht Charters — Yacht Charter](templates/travel-hotel/template-19-yacht-charter/)
- [Marigold House — Homestay BnB](templates/travel-hotel/template-20-homestay-bnb/)

</details>

### Health & Fitness (20)

<details>
<summary>View all 20 health & fitness templates</summary>

- [IRONHAUS Performance Gym — Modern Gym](templates/health-fitness/template-01-modern-gym/)
- [Stillwater Yoga Loft — Yoga Studio](templates/health-fitness/template-02-yoga-studio/)
- [Crucible Strength Co. — Crossfit Box](templates/health-fitness/template-03-crossfit-box/)
- [Aurelia Pilates Atelier — Pilates Studio](templates/health-fitness/template-04-pilates-studio/)
- [Vale Method — Personal Trainer](templates/health-fitness/template-05-personal-trainer/)
- [Southpaw Boxing Club — Boxing Club](templates/health-fitness/template-06-boxing-club/)
- [Velvet Tempo Dance Studio — Dance Studio](templates/health-fitness/template-07-dance-studio/)
- [BlueFin Swim School — Swimming School](templates/health-fitness/template-08-swimming-school/)
- [Kurotora Dojo — Martial Arts Dojo](templates/health-fitness/template-09-martial-arts-dojo/)
- [Salt & Cedar Spa — Spa Wellness](templates/health-fitness/template-10-spa-wellness/)
- [KinetiCare Physiotherapy — Physiotherapy Clinic](templates/health-fitness/template-11-physiotherapy-clinic/)
- [Root & Ratio Nutrition — Nutritionist](templates/health-fitness/template-12-nutritionist/)
- [Stillpoint Therapy Practice — Therapy Practice](templates/health-fitness/template-13-therapy-practice/)
- [Brightrow Dental Clinic — Dental Clinic](templates/health-fitness/template-14-dental-clinic/)
- [Pacekeepers Run Club — Running Club](templates/health-fitness/template-15-running-club/)
- [Afterdark Cycle — Spin Studio](templates/health-fitness/template-16-spin-studio/)
- [Aurora Stillness Center — Meditation Center](templates/health-fitness/template-17-meditation-center/)
- [Alignwell Chiropractic — Chiropractic Clinic](templates/health-fitness/template-18-chiropractic-clinic/)
- [BrightShift — Weight Loss Program](templates/health-fitness/template-19-weight-loss-program/)
- [Evergreen Movement Club — Senior Fitness](templates/health-fitness/template-20-senior-fitness/)

</details>

### Education & Course (20)

<details>
<summary>View all 20 education & course templates</summary>

- [Whitford University — University](templates/education-course/template-01-university/)
- [Riverside Prep — High School](templates/education-course/template-02-high-school/)
- [Sunnybrook Elementary — Elementary School](templates/education-course/template-03-elementary-school/)
- [Little Sprouts Kindergarten — Kindergarten](templates/education-course/template-04-kindergarten/)
- [ForgeLabs Bootcamp — Coding Bootcamp](templates/education-course/template-05-coding-bootcamp/)
- [Linguava Language School — Language School](templates/education-course/template-06-language-school/)
- [Crescendo Conservatory — Music School](templates/education-course/template-07-music-school/)
- [Pigment & Co. — Art School](templates/education-course/template-08-art-school/)
- [GreenLight Driving School — Driving School](templates/education-course/template-09-driving-school/)
- [Saffron & Salt — Culinary School](templates/education-course/template-10-culinary-school/)
- [BrightPath Tutoring — Tutoring Center](templates/education-course/template-11-tutoring-center/)
- [Summit Test Prep — Exam Prep](templates/education-course/template-12-exam-prep/)
- [Prism Design School — Design Course](templates/education-course/template-13-design-course/)
- [Aperture Collective — Photography Workshop](templates/education-course/template-14-photography-workshop/)
- [Kingsbridge Business School — Business School](templates/education-course/template-15-business-school/)
- [PixelPals Coding Club — Kids Coding Club](templates/education-course/template-16-kids-coding-club/)
- [Al-Noor Academy — Islamic School](templates/education-course/template-17-islamic-school/)
- [TradeWorks Institute — Vocational Training](templates/education-course/template-18-vocational-training/)
- [Horizon Study Abroad — Study Abroad](templates/education-course/template-19-study-abroad/)
- [Skillwave — Elearning Marketplace](templates/education-course/template-20-elearning-marketplace/)

</details>

### Real Estate & Property (20)

<details>
<summary>View all 20 real estate & property templates</summary>

- [Keyline Homes — Property Listings](templates/real-estate-property/template-01-property-listings/)
- [Belgrave Estates — Luxury Homes](templates/real-estate-property/template-02-luxury-homes/)
- [The Aria Residences — Apartment Complex](templates/real-estate-property/template-03-apartment-complex/)
- [Hannah Ford — Real Estate Agent](templates/real-estate-property/template-04-real-estate-agent/)
- [Northgate Developments — Property Developer](templates/real-estate-property/template-05-property-developer/)
- [Campus Nest — Student Housing](templates/real-estate-property/template-06-student-housing/)
- [Commonhouse — Coliving Space](templates/real-estate-property/template-07-coliving-space/)
- [Meridian Workspace — Commercial Office](templates/real-estate-property/template-08-commercial-office/)
- [Irongate Industrial — Industrial Property](templates/real-estate-property/template-09-industrial-property/)
- [Summit Land Co. — Land Plots](templates/real-estate-property/template-10-land-plots/)
- [Azulado Stays — Vacation Rentals](templates/real-estate-property/template-11-vacation-rentals/)
- [Kos Harmoni — Boarding House](templates/real-estate-property/template-12-boarding-house/)
- [Anchor Property Group — Property Management](templates/real-estate-property/template-13-property-management/)
- [Beacon Mortgages — Mortgage Broker](templates/real-estate-property/template-14-mortgage-broker/)
- [Maison Reverie — Home Staging](templates/real-estate-property/template-15-home-staging/)
- [Nimbus Living — Smart Residence](templates/real-estate-property/template-16-smart-residence/)
- [Willowbrook Village — Retirement Village](templates/real-estate-property/template-17-retirement-village/)
- [Maplewood Park — Housing Estate](templates/real-estate-property/template-18-housing-estate/)
- [Hammerstone Auctions — Property Auction](templates/real-estate-property/template-19-property-auction/)
- [Acorn Tiny Homes — Tiny Houses](templates/real-estate-property/template-20-tiny-houses/)

</details>

### Utility Pages (20)

<details>
<summary>View all 20 utility pages templates</summary>

- [Nebulift — Coming Soon](templates/utility-pages/template-01-coming-soon/)
- [Bolt & Beam — Maintenance Page](templates/utility-pages/template-02-maintenance-page/)
- [Pagefinch — 404 Page](templates/utility-pages/template-03-404-page/)
- [Lumenstack — Login Page](templates/utility-pages/template-04-login-page/)
- [Fernwise — Signup Page](templates/utility-pages/template-05-signup-page/)
- [Keyhaven — Password Reset](templates/utility-pages/template-06-password-reset/)
- [Riley Vox — Link In Bio](templates/utility-pages/template-07-link-in-bio/)
- [Quotaflow — Pricing Page](templates/utility-pages/template-08-pricing-page/)
- [Willowbox — FAQ Page](templates/utility-pages/template-09-faq-page/)
- [Sunhatch Studio — Contact Page](templates/utility-pages/template-10-contact-page/)
- [Mintcrate — Thank You Page](templates/utility-pages/template-11-thank-you-page/)
- [Vioma — Verify Email](templates/utility-pages/template-12-verify-email/)
- [Driftbase — Onboarding Steps](templates/utility-pages/template-13-onboarding-steps/)
- [Marrow & Vale — Privacy Terms](templates/utility-pages/template-14-privacy-terms/)
- [Northpeak — Status Page](templates/utility-pages/template-15-status-page/)
- [Voltloop — App Download](templates/utility-pages/template-16-app-download/)
- [Thicket Post — Unsubscribe Page](templates/utility-pages/template-17-unsubscribe-page/)
- [Bloomgauge — Survey Feedback](templates/utility-pages/template-18-survey-feedback/)
- [Cobalt & Quill — Invoice Page](templates/utility-pages/template-19-invoice-page/)
- [Atlas Vey — Digital Business Card](templates/utility-pages/template-20-digital-business-card/)

</details>

### Nonprofit & Charity (20)

<details>
<summary>View all 20 nonprofit & charity templates</summary>

- [Brightpaw Haven — Animal Shelter](templates/nonprofit-charity/template-01-animal-shelter/)
- [Verdant Earth Alliance — Environmental NGO](templates/nonprofit-charity/template-02-environmental-ngo/)
- [RapidAid Response — Disaster Relief](templates/nonprofit-charity/template-03-disaster-relief/)
- [Little Lanterns Foundation — Childrens Foundation](templates/nonprofit-charity/template-04-childrens-foundation/)
- [Open Table Network — Food Bank](templates/nonprofit-charity/template-05-food-bank/)
- [Mercy Lines Health — Medical Charity](templates/nonprofit-charity/template-06-medical-charity/)
- [Stepping Stones Fund — Education Fund](templates/nonprofit-charity/template-07-education-fund/)
- [Safe Harbour Trust — Homeless Shelter](templates/nonprofit-charity/template-08-homeless-shelter/)
- [Grace Hill Community Church — Church](templates/nonprofit-charity/template-09-church/)
- [Al-Noor Charitable Foundation — Mosque Foundation](templates/nonprofit-charity/template-10-mosque-foundation/)
- [Wildmark Conservancy — Wildlife Conservation](templates/nonprofit-charity/template-11-wildlife-conservation/)
- [Stillwater Minds — Mental Health Nonprofit](templates/nonprofit-charity/template-12-mental-health-nonprofit/)
- [Chroma Arts Foundation — Arts Foundation](templates/nonprofit-charity/template-13-arts-foundation/)
- [Common Ground Foundation — Community Foundation](templates/nonprofit-charity/template-14-community-foundation/)
- [Equal Voice Initiative — Human Rights Org](templates/nonprofit-charity/template-15-human-rights-org/)
- [WellSpring Water Project — Clean Water Charity](templates/nonprofit-charity/template-16-clean-water-charity/)
- [Crossroads Welcome — Refugee Support](templates/nonprofit-charity/template-17-refugee-support/)
- [Evergreen Companions — Elderly Care Charity](templates/nonprofit-charity/template-18-elderly-care-charity/)
- [Brave Cells Research Fund — Cancer Research Fund](templates/nonprofit-charity/template-19-cancer-research-fund/)
- [Ignite Youth Collective — Youth Empowerment](templates/nonprofit-charity/template-20-youth-empowerment/)

</details>

### Automotive (20)

<details>
<summary>View all 20 automotive templates</summary>

- [Driveline Motors — Car Dealership](templates/automotive/template-01-car-dealership/)
- [HonestWheel Used Cars — Used Cars](templates/automotive/template-02-used-cars/)
- [Voltaic EV — EV Brand](templates/automotive/template-03-ev-brand/)
- [RoadReady Rentals — Car Rental](templates/automotive/template-04-car-rental/)
- [ProGear Auto Repair — Auto Repair](templates/automotive/template-05-auto-repair/)
- [AquaShine Car Wash — Car Wash](templates/automotive/template-06-car-wash/)
- [IronCrest Motorcycles — Motorcycle Dealer](templates/automotive/template-07-motorcycle-dealer/)
- [Aurelis Luxury Cars — Luxury Cars](templates/automotive/template-08-luxury-cars/)
- [GripPoint Tire Centre — Tire Shop](templates/automotive/template-09-tire-shop/)
- [PartHub Auto Parts — Auto Parts Store](templates/automotive/template-10-auto-parts-store/)
- [MirrorFinish Detailing — Car Detailing](templates/automotive/template-11-car-detailing/)
- [Heritage Classic Cars — Classic Cars](templates/automotive/template-12-classic-cars/)
- [HaulMax Trucks — Truck Dealer](templates/automotive/template-13-truck-dealer/)
- [SafeLane Auto Insurance — Auto Insurance](templates/automotive/template-14-auto-insurance/)
- [FleetForge Leasing — Fleet Leasing](templates/automotive/template-15-fleet-leasing/)
- [BidLane Car Auctions — Car Auction](templates/automotive/template-16-car-auction/)
- [Northgate Auto Group — Dealership Group](templates/automotive/template-17-dealership-group/)
- [VoltGrid Charging — Charging Network](templates/automotive/template-18-charging-network/)
- [Switchr Car Subscription — Car Subscription](templates/automotive/template-19-car-subscription/)
- [ClearDrive Auto Finance — Auto Finance](templates/automotive/template-20-auto-finance/)

</details>

### Beauty & Salon (20)

<details>
<summary>View all 20 beauty & salon templates</summary>

- [Maison Lumière — Hair Salon](templates/beauty-salon/template-01-hair-salon/)
- [Ironclad & Co. — Barbershop](templates/beauty-salon/template-02-barbershop/)
- [Petal & Polish — Nail Salon](templates/beauty-salon/template-03-nail-salon/)
- [Noir Atelier — Makeup Artist](templates/beauty-salon/template-04-makeup-artist/)
- [Wink & Arch — Lash Brow Studio](templates/beauty-salon/template-05-lash-brow-studio/)
- [Stillwater Spa — Day Spa](templates/beauty-salon/template-06-day-spa/)
- [Goldenhour Studio — Tanning Studio](templates/beauty-salon/template-07-tanning-studio/)
- [Smooth Society — Waxing Salon](templates/beauty-salon/template-08-waxing-salon/)
- [Lumen Skin Clinic — Skincare Clinic](templates/beauty-salon/template-09-skincare-clinic/)
- [Wellspring Bodywork — Massage Therapy](templates/beauty-salon/template-10-massage-therapy/)
- [Atelier Beauty Academy — Beauty Academy](templates/beauty-salon/template-11-beauty-academy/)
- [Veil & Vow — Bridal Makeup](templates/beauty-salon/template-12-bridal-makeup/)
- [Forge Grooming Lounge — Mens Grooming](templates/beauty-salon/template-13-mens-grooming/)
- [Featherlight Lash Lab — Eyelash Extensions](templates/beauty-salon/template-14-eyelash-extensions/)
- [Ink & Arch Studio — Microblading Studio](templates/beauty-salon/template-15-microblading-studio/)
- [Black Lantern Tattoo — Tattoo Studio](templates/beauty-salon/template-16-tattoo-studio/)
- [Lobe & Co. Piercing — Piercing Studio](templates/beauty-salon/template-17-piercing-studio/)
- [Maison de Sève — Perfume Boutique](templates/beauty-salon/template-18-perfume-boutique/)
- [Lumina Laser Clinic — Hair Removal Clinic](templates/beauty-salon/template-19-hair-removal-clinic/)
- [Glow with Remi — Beauty Influencer](templates/beauty-salon/template-20-beauty-influencer/)

</details>

### Finance & Banking (20)

<details>
<summary>View all 20 finance & banking templates</summary>

- [Northcliff Bank — Retail Bank](templates/finance-banking/template-01-retail-bank/)
- [Lumio — Digital Bank](templates/finance-banking/template-02-digital-bank/)
- [Halberd Capital — Investment Firm](templates/finance-banking/template-03-investment-firm/)
- [Voltcoin — Crypto Exchange](templates/finance-banking/template-04-crypto-exchange/)
- [Safeharbor Brokers — Insurance Broker](templates/finance-banking/template-05-insurance-broker/)
- [Ledgerwood & Co. — Accounting Firm](templates/finance-banking/template-06-accounting-firm/)
- [BrightReturn — Tax Service](templates/finance-banking/template-07-tax-service/)
- [Kindle Lending — Lending Platform](templates/finance-banking/template-08-lending-platform/)
- [Sterling Crest — Wealth Management](templates/finance-banking/template-09-wealth-management/)
- [Apexline — Trading Platform](templates/finance-banking/template-10-trading-platform/)
- [PayArc — Payment Gateway](templates/finance-banking/template-11-payment-gateway/)
- [Truenorth Advisory — Financial Advisor](templates/finance-banking/template-12-financial-advisor/)
- [Riverstone Credit Union — Credit Union](templates/finance-banking/template-13-credit-union/)
- [Cornerstone Mortgage — Mortgage Lender](templates/finance-banking/template-14-mortgage-lender/)
- [Finch — Fintech App](templates/finance-banking/template-15-fintech-app/)
- [Tickr — Stock Brokerage](templates/finance-banking/template-16-stock-brokerage/)
- [Pennywise — Budgeting Tool](templates/finance-banking/template-17-budgeting-tool/)
- [Evergreen Pension — Pension Fund](templates/finance-banking/template-18-pension-fund/)
- [Northwind Ventures — Venture Capital](templates/finance-banking/template-19-venture-capital/)
- [UpliftMicro — Microfinance](templates/finance-banking/template-20-microfinance/)

</details>

### Music & Entertainment (20)

<details>
<summary>View all 20 music & entertainment templates</summary>

- [Voltage Hollow — Rock Band](templates/music-entertainment/template-01-rock-band/)
- [Cassia Vale — Solo Musician](templates/music-entertainment/template-02-solo-musician/)
- [NOVA SAGE — DJ Artist](templates/music-entertainment/template-03-dj-artist/)
- [Goldgroove Records — Record Label](templates/music-entertainment/template-04-record-label/)
- [The Iron Owl — Music Venue](templates/music-entertainment/template-05-music-venue/)
- [Northlight Studios — Recording Studio](templates/music-entertainment/template-06-recording-studio/)
- [KOZA — Music Producer](templates/music-entertainment/template-07-music-producer/)
- [The Aurelian Choir — Choir Ensemble](templates/music-entertainment/template-08-choir-ensemble/)
- [Meridian Symphony — Orchestra](templates/music-entertainment/template-09-orchestra/)
- [Pulse Avenue — Nightclub](templates/music-entertainment/template-10-nightclub/)
- [The Laughing Crow — Comedy Club](templates/music-entertainment/template-11-comedy-club/)
- [The Saltbridge Players — Theater Company](templates/music-entertainment/template-12-theater-company/)
- [Kinetic Mob — Dance Crew](templates/music-entertainment/template-13-dance-crew/)
- [Lantern Talent — Talent Agency](templates/music-entertainment/template-14-talent-agency/)
- [LUMA WAVE — Streaming Artist](templates/music-entertainment/template-15-streaming-artist/)
- [Highrise Live — Concert Promoter](templates/music-entertainment/template-16-concert-promoter/)
- [Bywater 98.3 — Radio Station](templates/music-entertainment/template-17-radio-station/)
- [Goldenote Karaoke — Karaoke Bar](templates/music-entertainment/template-18-karaoke-bar/)
- [Apex Stage Co. — Event Production](templates/music-entertainment/template-19-event-production/)
- [Rumours of Fleetwood — Tribute Act](templates/music-entertainment/template-20-tribute-act/)

</details>

### Agriculture & Farming (20)

<details>
<summary>View all 20 agriculture & farming templates</summary>

- [Harvest Hollow — Organic Farm](templates/agriculture-farming/template-01-organic-farm/)
- [Stonecrest Vineyards — Vineyard Winery](templates/agriculture-farming/template-02-vineyard-winery/)
- [Clover Meadow Dairy — Dairy Farm](templates/agriculture-farming/template-03-dairy-farm/)
- [Iron Ridge Ranch — Livestock Ranch](templates/agriculture-farming/template-04-livestock-ranch/)
- [FieldSignal — Agritech](templates/agriculture-farming/template-05-agritech/)
- [VertiGrove Farms — Hydroponics Greenhouse](templates/agriculture-farming/template-06-hydroponics-greenhouse/)
- [Tidewell Aquafarm — Fishery Aquaculture](templates/agriculture-farming/template-07-fishery-aquaculture/)
- [Goldencomb Apiary — Beekeeping Honey](templates/agriculture-farming/template-08-beekeeping-honey/)
- [Misty Slopes Estate — Coffee Plantation](templates/agriculture-farming/template-09-coffee-plantation/)
- [Brightboughs Orchard — Fruit Orchard](templates/agriculture-farming/template-10-fruit-orchard/)
- [Furrow & Field — Vegetable Farm](templates/agriculture-farming/template-11-vegetable-farm/)
- [Sunny Run Poultry — Poultry Farm](templates/agriculture-farming/template-12-poultry-farm/)
- [Greenfields Co-op — Farm Cooperative](templates/agriculture-farming/template-13-farm-cooperative/)
- [IronFurrow Machinery — Farm Equipment](templates/agriculture-farming/template-14-farm-equipment/)
- [Trueseed Company — Seed Supplier](templates/agriculture-farming/template-15-seed-supplier/)
- [Wildroot Herbery — Herb Farm](templates/agriculture-farming/template-16-herb-farm/)
- [Mycelia Gardens — Mushroom Farm](templates/agriculture-farming/template-17-mushroom-farm/)
- [Petalfield Flowers — Flower Farm](templates/agriculture-farming/template-18-flower-farm/)
- [Cloudmist Tea Estate — Tea Estate](templates/agriculture-farming/template-19-tea-estate/)
- [Goldacre Grains — Grain Farm](templates/agriculture-farming/template-20-grain-farm/)

</details>

### Sports & Recreation (20)

<details>
<summary>View all 20 sports & recreation templates</summary>

- [Ironside FC — Football Club](templates/sports-recreation/template-01-football-club/)
- [Skyline Hoops — Basketball Team](templates/sports-recreation/template-02-basketball-team/)
- [Oakhaven Links — Golf Club](templates/sports-recreation/template-03-golf-club/)
- [Baseline Tennis Academy — Tennis Academy](templates/sports-recreation/template-04-tennis-academy/)
- [Nullpoint Esports — Esports Org](templates/sports-recreation/template-05-esports-org/)
- [Apex Holds Climbing — Climbing Gym](templates/sports-recreation/template-06-climbing-gym/)
- [Saltline Surf School — Surf School](templates/sports-recreation/template-07-surf-school/)
- [Concrete Wave Skatepark — Skate Park](templates/sports-recreation/template-08-skate-park/)
- [Strike Avenue Bowl — Bowling Alley](templates/sports-recreation/template-09-bowling-alley/)
- [Frostgate Ice Arena — Ice Rink](templates/sports-recreation/template-10-ice-rink/)
- [Willowmere Cricket Club — Cricket Club](templates/sports-recreation/template-11-cricket-club/)
- [Velocity Cycling Club — Cycling Club](templates/sports-recreation/template-12-cycling-club/)
- [Ashford Equestrian Centre — Equestrian Center](templates/sports-recreation/template-13-equestrian-center/)
- [Meridian Sports Complex — Sports Complex](templates/sports-recreation/template-14-sports-complex/)
- [Truenock Archery — Archery Range](templates/sports-recreation/template-15-archery-range/)
- [Blitzfield Paintball — Paintball Arena](templates/sports-recreation/template-16-paintball-arena/)
- [Apex Lane Karting — Go Kart Track](templates/sports-recreation/template-17-go-kart-track/)
- [Granite Rugby Club — Rugby Club](templates/sports-recreation/template-18-rugby-club/)
- [Tidewater Watersports Centre — Watersports Center](templates/sports-recreation/template-19-watersports-center/)
- [Greenfield Recreation Centre — Recreation Center](templates/sports-recreation/template-20-recreation-center/)

</details>

### Pet Services (20)

<details>
<summary>View all 20 pet services templates</summary>

- [Maplewood Veterinary — Veterinary Clinic](templates/pet-services/template-01-veterinary-clinic/)
- [Fluff & Folly Grooming — Pet Grooming](templates/pet-services/template-02-pet-grooming/)
- [PawSteps Dog Training — Dog Training](templates/pet-services/template-03-dog-training/)
- [Cedar Lodge Boarding — Pet Boarding](templates/pet-services/template-04-pet-boarding/)
- [Wiggle Room Daycare — Pet Daycare](templates/pet-services/template-05-pet-daycare/)
- [TrailTails Dog Walking — Dog Walking](templates/pet-services/template-06-dog-walking/)
- [Cosy Paws Sitting — Pet Sitting](templates/pet-services/template-07-pet-sitting/)
- [AbyssReef Aquatics — Aquarium Shop](templates/pet-services/template-08-aquarium-shop/)
- [WildScale Exotics — Exotic Pets](templates/pet-services/template-09-exotic-pets/)
- [Goldenframe Pet Studio — Pet Photography](templates/pet-services/template-10-pet-photography/)
- [Bramblewood Kennels — Dog Breeder](templates/pet-services/template-11-dog-breeder/)
- [Whisker & Bean — Cat Cafe](templates/pet-services/template-12-cat-cafe/)
- [Biscuit & Bark Bakery — Pet Bakery](templates/pet-services/template-13-pet-bakery/)
- [Northgate Animal Hospital — Animal Hospital](templates/pet-services/template-14-animal-hospital/)
- [DoorVet Mobile Care — Mobile Vet](templates/pet-services/template-15-mobile-vet/)
- [Balance Pet Wellness — Pet Wellness](templates/pet-services/template-16-pet-wellness/)
- [Ashford Equestrian — Horse Stables](templates/pet-services/template-17-horse-stables/)
- [Featherhaven Sanctuary — Bird Sanctuary](templates/pet-services/template-18-bird-sanctuary/)
- [ScaleHouse Reptiles — Reptile Shop](templates/pet-services/template-19-reptile-shop/)
- [Safepaw Insurance — Pet Insurance](templates/pet-services/template-20-pet-insurance/)

</details>

### Technology Services (20)

<details>
<summary>View all 20 technology services templates</summary>

- [HelpGrid — IT Support](templates/technology-services/template-01-it-support/)
- [Forgeloop — Software Development](templates/technology-services/template-02-software-development/)
- [Northlight — Web Design Agency](templates/technology-services/template-03-web-design-agency/)
- [Stratoshift — Cloud Services](templates/technology-services/template-04-cloud-services/)
- [Sentinel IT — Managed IT](templates/technology-services/template-05-managed-it/)
- [Quantleaf — Data Analytics](templates/technology-services/template-06-data-analytics/)
- [Cognivault — AI Consultancy](templates/technology-services/template-07-ai-consultancy/)
- [Pocketforge — App Development](templates/technology-services/template-08-app-development/)
- [Pipeworks — Devops](templates/technology-services/template-09-devops/)
- [Chainwright — Blockchain Dev](templates/technology-services/template-10-blockchain-dev/)
- [Emberkiln — Game Studio](templates/technology-services/template-11-game-studio/)
- [Cleargrove — UX Agency](templates/technology-services/template-12-ux-agency/)
- [Meridian Shift — Digital Transformation](templates/technology-services/template-13-digital-transformation/)
- [Linkforge — Network Solutions](templates/technology-services/template-14-network-solutions/)
- [Cadenceflow — SaaS Company](templates/technology-services/template-15-saas-company/)
- [FixForge — Tech Repair](templates/technology-services/template-16-tech-repair/)
- [Coreaxis — ERP Solutions](templates/technology-services/template-17-erp-solutions/)
- [Pulsemesh — IoT Company](templates/technology-services/template-18-iot-company/)
- [Assertly — QA Testing](templates/technology-services/template-19-qa-testing/)
- [Hostpeak — Hosting Provider](templates/technology-services/template-20-hosting-provider/)

</details>

### Logistics & Transport (20)

<details>
<summary>View all 20 logistics & transport templates</summary>

- [SwiftParcel — Courier Delivery](templates/logistics-transport/template-01-courier-delivery/)
- [Meridian Freight — Freight Forwarding](templates/logistics-transport/template-02-freight-forwarding/)
- [HomeShift Movers — Moving Company](templates/logistics-transport/template-03-moving-company/)
- [CityCab Co. — Taxi Service](templates/logistics-transport/template-04-taxi-service/)
- [RouteRunner — Bus Operator](templates/logistics-transport/template-05-bus-operator/)
- [IronLane Trucking — Trucking](templates/logistics-transport/template-06-trucking/)
- [GridStore 3PL — Warehouse 3PL](templates/logistics-transport/template-07-warehouse-3pl/)
- [BlueHaul Lines — Shipping Line](templates/logistics-transport/template-08-shipping-line/)
- [AeroLift Cargo — Air Cargo](templates/logistics-transport/template-09-air-cargo/)
- [FinalBlock — Last Mile Delivery](templates/logistics-transport/template-10-last-mile-delivery/)
- [PolarLink Logistics — Cold Chain](templates/logistics-transport/template-11-cold-chain/)
- [Harborgate Terminals — Port Operator](templates/logistics-transport/template-12-port-operator/)
- [Skyward Drop — Drone Delivery](templates/logistics-transport/template-13-drone-delivery/)
- [HopRide — Ride Hailing](templates/logistics-transport/template-14-ride-hailing/)
- [PedalPost — Bike Courier](templates/logistics-transport/template-15-bike-courier/)
- [Nexus Supply Chain — Supply Chain](templates/logistics-transport/template-16-supply-chain/)
- [Clearport Brokers — Customs Broker](templates/logistics-transport/template-17-customs-broker/)
- [Continental Rail Freight — Rail Freight](templates/logistics-transport/template-18-rail-freight/)
- [PulseDispatch — Dispatch Service](templates/logistics-transport/template-19-dispatch-service/)
- [LockBox Lockers — Parcel Locker](templates/logistics-transport/template-20-parcel-locker/)

</details>

### Home Services (20)

<details>
<summary>View all 20 home services templates</summary>

- [DrainGuard Plumbing — Plumber](templates/home-services/template-01-plumber/)
- [VoltLine Electric — Electrician](templates/home-services/template-02-electrician/)
- [FreshNest Cleaning — Cleaning Service](templates/home-services/template-03-cleaning-service/)
- [GreenHaven Landscapes — Landscaping](templates/home-services/template-04-landscaping/)
- [ShieldPest Control — Pest Control](templates/home-services/template-05-pest-control/)
- [ClimaCore HVAC — HVAC](templates/home-services/template-06-hvac/)
- [SummitPeak Roofing — Roofing](templates/home-services/template-07-roofing/)
- [TrueHue Painting — Painting](templates/home-services/template-08-painting/)
- [FixWell Handyman — Handyman](templates/home-services/template-09-handyman/)
- [KeyFort Locksmith — Locksmith](templates/home-services/template-10-locksmith/)
- [PureFiber Carpet Care — Carpet Cleaning](templates/home-services/template-11-carpet-cleaning/)
- [ReviveTech Appliance Repair — Appliance Repair](templates/home-services/template-12-appliance-repair/)
- [Sentinel Home Security — Home Security](templates/home-services/template-13-home-security/)
- [ClearView Window Cleaning — Window Cleaning](templates/home-services/template-14-window-cleaning/)
- [AquaLux Pool Service — Pool Service](templates/home-services/template-15-pool-service/)
- [SunCrest Solar — Solar Installation](templates/home-services/template-16-solar-installation/)
- [HaulAway Junk Removal — Junk Removal](templates/home-services/template-17-junk-removal/)
- [HeritageGrain Flooring — Flooring](templates/home-services/template-18-flooring/)
- [IronOak Fencing — Fencing](templates/home-services/template-19-fencing/)
- [StoneBridge Renovations — Home Renovation](templates/home-services/template-20-home-renovation/)

</details>

### Government & Public (20)

<details>
<summary>View all 20 government & public templates</summary>

- [City of Ashford Bay — City Government](templates/government-public/template-01-city-government/)
- [Wexford Public Library — Public Library](templates/government-public/template-02-public-library/)
- [Harborline Museum — Museum](templates/government-public/template-03-museum/)
- [Ridgemont Fire & Rescue — Fire Department](templates/government-public/template-04-fire-department/)
- [Cedar Falls Police — Police Department](templates/government-public/template-05-police-department/)
- [MetroLink Transit — Public Transit](templates/government-public/template-06-public-transit/)
- [Reyes for Governor — Political Campaign](templates/government-public/template-07-political-campaign/)
- [Embassy of Valoria — Embassy](templates/government-public/template-08-embassy/)
- [Cascade Ridge National Park — National Park](templates/government-public/template-09-national-park/)
- [Brightwater Utilities — Public Utility](templates/government-public/template-10-public-utility/)
- [Northgate Postal Service — Post Office](templates/government-public/template-11-post-office/)
- [Revenue & Taxation Office — Tax Office](templates/government-public/template-12-tax-office/)
- [Marwick County Courthouse — Courthouse](templates/government-public/template-13-courthouse/)
- [Town of Briarcliff — Town Hall](templates/government-public/template-14-town-hall/)
- [Vote Glenshire — Voter Information](templates/government-public/template-15-voter-information/)
- [National Census Bureau — Census Bureau](templates/government-public/template-16-census-bureau/)
- [Lakeshore Parks & Recreation — Parks Recreation Dept](templates/government-public/template-17-parks-recreation-dept/)
- [Summit County 911 — Emergency Services](templates/government-public/template-18-emergency-services/)
- [Rivergate Public Health — Public Health Dept](templates/government-public/template-19-public-health-dept/)
- [Office of Citizenship & Immigration — Immigration Office](templates/government-public/template-20-immigration-office/)

</details>

<!-- TPL_INDEX_END -->

## Tech stack

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox, `clamp()` fluid type — no preprocessors)
- Vanilla JavaScript (ES5/ES6-compatible classic scripts — no modules, no libraries)

Works in all modern browsers (Chrome, Edge, Firefox, Safari), straight from `file://`.

## License

License placeholder — add the license of your choice (e.g. MIT) in a `LICENSE` file
before publishing or redistributing. Until a license is added, all rights are
reserved by the repository owner.
