/* ==========================================================================
   TemplateHub — root gallery script
   Renders the 100-template index, search/filter, theme toggle, mobile nav.
   Vanilla JS only — no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* Template manifest — generated from the templates/ folder.
     Fields: cat, catLabel, slug, idx, path, brand, concept, desc, hue */
  // __TPL_DATA_START__
  const TEMPLATES = [
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-01-fashion-store",
      "idx": 1,
      "path": "templates/ecommerce/template-01-fashion-store/index.html",
      "brand": "Maison Linnea",
      "concept": "Fashion Store",
      "desc": "Considered womenswear in natural fibres — shop the Maison Linnea autumn collection of coats, knits and silks.",
      "hue": 8
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-02-electronics-store",
      "idx": 2,
      "path": "templates/ecommerce/template-02-electronics-store/index.html",
      "brand": "Nordvolt",
      "concept": "Electronics Store",
      "desc": "Nordvolt builds obsessively tested audio, charge and desk tech — shop headphones, hubs and keyboards engineered in Oslo.",
      "hue": 25
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-03-beauty-store",
      "idx": 3,
      "path": "templates/ecommerce/template-03-beauty-store/index.html",
      "brand": "Rosaline",
      "concept": "Beauty Store",
      "desc": "Rosaline makes skin-first, cruelty-free makeup — shop buildable color for lips, eyes and complexion.",
      "hue": 42
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-04-furniture-store",
      "idx": 4,
      "path": "templates/ecommerce/template-04-furniture-store/index.html",
      "brand": "Grain &amp; Form",
      "concept": "Furniture Store",
      "desc": "Grain &amp; Form makes solid-wood furniture to order — shop seating, tables, storage and lighting built to be kept.",
      "hue": 59
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-05-coffee-store",
      "idx": 5,
      "path": "templates/ecommerce/template-05-coffee-store/index.html",
      "brand": "Kiln &amp; Crema",
      "concept": "Coffee Store",
      "desc": "Kiln &amp; Crema roasts small-lot, single-origin coffee in Bergen and ships within 48 hours of the drum.",
      "hue": 76
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-06-sneaker-store",
      "idx": 6,
      "path": "templates/ecommerce/template-06-sneaker-store/index.html",
      "brand": "Hyperlace",
      "concept": "Sneaker Store",
      "desc": "Hyperlace drops performance and lifestyle sneakers in volt and black — shop the AW26 drop before it sells out.",
      "hue": 93
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-07-watch-store",
      "idx": 7,
      "path": "templates/ecommerce/template-07-watch-store/index.html",
      "brand": "Aurum &amp; Crown",
      "concept": "Watch Store",
      "desc": "Aurum &amp; Crown assembles mechanical timepieces by hand in Geneva — explore dress, sport and chronograph references.",
      "hue": 110
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-08-grocery-store",
      "idx": 8,
      "path": "templates/ecommerce/template-08-grocery-store/index.html",
      "brand": "Greengate Grocer",
      "concept": "Grocery Store",
      "desc": "Greengate Grocer delivers produce from 27 local farms, warm bakery and honest pantry staples the same day.",
      "hue": 127
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-09-book-store",
      "idx": 9,
      "path": "templates/ecommerce/template-09-book-store/index.html",
      "brand": "The Marginalia",
      "concept": "Book Store",
      "desc": "The Marginalia is an independent bookshop with staff notes in every cover — browse fiction, poetry and signed editions.",
      "hue": 144
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-10-skincare-store",
      "idx": 10,
      "path": "templates/ecommerce/template-10-skincare-store/index.html",
      "brand": "Eunoia Skin",
      "concept": "Skincare Store",
      "desc": "Eunoia Skin makes barrier-first skincare with proven percentages — ten essentials, refillable glass, zero filler.",
      "hue": 161
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-11-digital-product-store",
      "idx": 11,
      "path": "templates/ecommerce/template-11-digital-product-store/index.html",
      "brand": "Nebula Vault",
      "concept": "Digital Product Store",
      "desc": "Nebula Vault sells UI kits, icon systems and templates from working designers — buy once, download forever.",
      "hue": 178
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-12-gaming-gear-store",
      "idx": 12,
      "path": "templates/ecommerce/template-12-gaming-gear-store/index.html",
      "brand": "HexRig",
      "concept": "Gaming Gear Store",
      "desc": "HexRig builds tournament-grade keyboards, mice and audio tuned with pro players — latency measured, not marketed.",
      "hue": 195
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-13-pet-shop",
      "idx": 13,
      "path": "templates/ecommerce/template-13-pet-shop/index.html",
      "brand": "Wag &amp; Whisker",
      "concept": "Pet Shop",
      "desc": "Wag &amp; Whisker stocks toys that survive, treats that vanish and beds pets actually sleep in — picked by the shop dog.",
      "hue": 212
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-14-jewelry-store",
      "idx": 14,
      "path": "templates/ecommerce/template-14-jewelry-store/index.html",
      "brand": "Ondine &amp; Or",
      "concept": "Jewelry Store",
      "desc": "Ondine &amp; Or makes fine jewelry to order in Antwerp — recycled 14k gold, certified lab diamonds, honest prices.",
      "hue": 229
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-15-plant-store",
      "idx": 15,
      "path": "templates/ecommerce/template-15-plant-store/index.html",
      "brand": "Fern &amp; Loam",
      "concept": "Plant Store",
      "desc": "Fern &amp; Loam ships greenhouse-grown plants matched to your light, plastic-free and backed by a 30-day grow guarantee.",
      "hue": 246
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-16-sports-store",
      "idx": 16,
      "path": "templates/ecommerce/template-16-sports-store/index.html",
      "brand": "Apex Motion",
      "concept": "Sports Store",
      "desc": "Apex Motion engineers run, train and recovery gear with sports scientists — tested by 400 club athletes.",
      "hue": 263
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-17-baby-store",
      "idx": 17,
      "path": "templates/ecommerce/template-17-baby-store/index.html",
      "brand": "Little Lark",
      "concept": "Baby Store",
      "desc": "Little Lark makes organic-cotton baby essentials with safe dyes — soft things for small beginnings.",
      "hue": 280
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-18-home-decor-store",
      "idx": 18,
      "path": "templates/ecommerce/template-18-home-decor-store/index.html",
      "brand": "Hearth &amp; Hue",
      "concept": "Home Decor Store",
      "desc": "Hearth &amp; Hue curates textiles, ceramics and lighting from forty small European makers — pieces with fingerprints on them.",
      "hue": 297
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-19-streetwear-store",
      "idx": 19,
      "path": "templates/ecommerce/template-19-streetwear-store/index.html",
      "brand": "Static Youth",
      "concept": "Streetwear Store",
      "desc": "Static Youth prints limited-run streetwear in-house — when a drop sells out, it is gone for good.",
      "hue": 314
    },
    {
      "cat": "ecommerce",
      "catLabel": "Ecommerce",
      "slug": "template-20-premium-marketplace",
      "idx": 20,
      "path": "templates/ecommerce/template-20-premium-marketplace/index.html",
      "brand": "Vetted &amp; Co.",
      "concept": "Premium Marketplace",
      "desc": "Vetted &amp; Co. is a curated marketplace for heirloom-grade goods — every maker vetted, every item authenticated.",
      "hue": 331
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-01-saas-product",
      "idx": 1,
      "path": "templates/landing-page/template-01-saas-product/index.html",
      "brand": "Pulsedeck",
      "concept": "SaaS Product",
      "desc": "A complete, dependency-free landing page template for Pulsedeck, a fictional saas product brand, styled as a centered SaaS-style layout with a CSS-built…",
      "hue": 222
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-02-ai-tool",
      "idx": 2,
      "path": "templates/landing-page/template-02-ai-tool/index.html",
      "brand": "Mindgrid",
      "concept": "AI Tool",
      "desc": "A complete, dependency-free landing page template for Mindgrid, a fictional ai tool brand, styled as a dark gradient layout with a glow hero and bento…",
      "hue": 239
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-03-mobile-app",
      "idx": 3,
      "path": "templates/landing-page/template-03-mobile-app/index.html",
      "brand": "Daybloom",
      "concept": "Mobile App",
      "desc": "A complete, dependency-free landing page template for Daybloom, a fictional mobile app brand, styled as a split-hero product layout with feature tabs and…",
      "hue": 256
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-04-online-course",
      "idx": 4,
      "path": "templates/landing-page/template-04-online-course/index.html",
      "brand": "Inkwell Academy",
      "concept": "Online Course",
      "desc": "A complete, dependency-free landing page template for Inkwell Academy, a fictional online course brand, styled as an editorial, typography-led narrative layout.",
      "hue": 273
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-05-fitness-program",
      "idx": 5,
      "path": "templates/landing-page/template-05-fitness-program/index.html",
      "brand": "Forgefit",
      "concept": "Fitness Program",
      "desc": "A complete, dependency-free landing page template for Forgefit, a fictional fitness program brand, styled as a bold geometric layout with angled dividers…",
      "hue": 290
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-06-event-conference",
      "idx": 6,
      "path": "templates/landing-page/template-06-event-conference/index.html",
      "brand": "Nova Summit",
      "concept": "Event Conference",
      "desc": "A complete, dependency-free landing page template for Nova Summit, a fictional event conference brand, styled as a bold geometric layout with angled…",
      "hue": 307
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-07-agency-offer",
      "idx": 7,
      "path": "templates/landing-page/template-07-agency-offer/index.html",
      "brand": "Redline Studio",
      "concept": "Agency Offer",
      "desc": "A complete, dependency-free landing page template for Redline Studio, a fictional agency offer brand, styled as a split-hero product layout with feature…",
      "hue": 324
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-08-newsletter",
      "idx": 8,
      "path": "templates/landing-page/template-08-newsletter/index.html",
      "brand": "The Margin",
      "concept": "Newsletter",
      "desc": "A complete, dependency-free landing page template for The Margin, a fictional newsletter brand, styled as an editorial, typography-led narrative layout.",
      "hue": 341
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-09-real-estate",
      "idx": 9,
      "path": "templates/landing-page/template-09-real-estate/index.html",
      "brand": "Aurelia Estates",
      "concept": "Real Estate",
      "desc": "A complete, dependency-free landing page template for Aurelia Estates, a fictional real estate brand, styled as an editorial, typography-led narrative layout.",
      "hue": 358
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-10-productivity-tool",
      "idx": 10,
      "path": "templates/landing-page/template-10-productivity-tool/index.html",
      "brand": "Plannery",
      "concept": "Productivity Tool",
      "desc": "A complete, dependency-free landing page template for Plannery, a fictional productivity tool brand, styled as a centered SaaS-style layout with a CSS-built…",
      "hue": 15
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-11-finance-app",
      "idx": 11,
      "path": "templates/landing-page/template-11-finance-app/index.html",
      "brand": "Mintarc",
      "concept": "Finance App",
      "desc": "A complete, dependency-free landing page template for Mintarc, a fictional finance app brand, styled as a split-hero product layout with feature tabs and…",
      "hue": 32
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-12-health-app",
      "idx": 12,
      "path": "templates/landing-page/template-12-health-app/index.html",
      "brand": "Wellfern",
      "concept": "Health App",
      "desc": "A complete, dependency-free landing page template for Wellfern, a fictional health app brand, styled as a bold geometric layout with angled dividers and…",
      "hue": 49
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-13-creator-tool",
      "idx": 13,
      "path": "templates/landing-page/template-13-creator-tool/index.html",
      "brand": "Brightreel",
      "concept": "Creator Tool",
      "desc": "A complete, dependency-free landing page template for Brightreel, a fictional creator tool brand, styled as a bold geometric layout with angled dividers and…",
      "hue": 66
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-14-cybersecurity",
      "idx": 14,
      "path": "templates/landing-page/template-14-cybersecurity/index.html",
      "brand": "Cipherline",
      "concept": "Cybersecurity",
      "desc": "A complete, dependency-free landing page template for Cipherline, a fictional cybersecurity brand, styled as a dark gradient layout with a glow hero and…",
      "hue": 83
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-15-crm-software",
      "idx": 15,
      "path": "templates/landing-page/template-15-crm-software/index.html",
      "brand": "Pipewise",
      "concept": "CRM Software",
      "desc": "A complete, dependency-free landing page template for Pipewise, a fictional crm software brand, styled as a centered SaaS-style layout with a CSS-built…",
      "hue": 100
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-16-booking-platform",
      "idx": 16,
      "path": "templates/landing-page/template-16-booking-platform/index.html",
      "brand": "Bookmint",
      "concept": "Booking Platform",
      "desc": "A complete, dependency-free landing page template for Bookmint, a fictional booking platform brand, styled as a split-hero product layout with feature tabs…",
      "hue": 117
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-17-education-platform",
      "idx": 17,
      "path": "templates/landing-page/template-17-education-platform/index.html",
      "brand": "Scholarpath",
      "concept": "Education Platform",
      "desc": "A complete, dependency-free landing page template for Scholarpath, a fictional education platform brand, styled as a centered SaaS-style layout with a…",
      "hue": 134
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-18-community-platform",
      "idx": 18,
      "path": "templates/landing-page/template-18-community-platform/index.html",
      "brand": "Glowroom",
      "concept": "Community Platform",
      "desc": "A complete, dependency-free landing page template for Glowroom, a fictional community platform brand, styled as a dark gradient layout with a glow hero and…",
      "hue": 151
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-19-automation-tool",
      "idx": 19,
      "path": "templates/landing-page/template-19-automation-tool/index.html",
      "brand": "Loopforge",
      "concept": "Automation Tool",
      "desc": "A complete, dependency-free landing page template for Loopforge, a fictional automation tool brand, styled as a dark gradient layout with a glow hero and…",
      "hue": 168
    },
    {
      "cat": "landing-page",
      "catLabel": "Landing Pages",
      "slug": "template-20-startup-waitlist",
      "idx": 20,
      "path": "templates/landing-page/template-20-startup-waitlist/index.html",
      "brand": "Meridian",
      "concept": "Startup Waitlist",
      "desc": "A complete, dependency-free landing page template for Meridian, a fictional startup waitlist brand, styled as an editorial, typography-led narrative layout.",
      "hue": 185
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-01-tech-company",
      "idx": 1,
      "path": "templates/company-profile/template-01-tech-company/index.html",
      "brand": "Nexcore Systems",
      "concept": "Tech Company",
      "desc": "Nexcore Systems is a cloud and software engineering company profile template with count-up stats, service cards and a validated contact form.",
      "hue": 158
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-02-construction-company",
      "idx": 2,
      "path": "templates/company-profile/template-02-construction-company/index.html",
      "brand": "IronRidge Constructions",
      "concept": "Construction Company",
      "desc": "IronRidge Constructions is a bold construction company profile template with tabbed services, a filterable project grid and hazard-stripe styling.",
      "hue": 175
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-03-marketing-agency",
      "idx": 3,
      "path": "templates/company-profile/template-03-marketing-agency/index.html",
      "brand": "Studio Vermilion",
      "concept": "Marketing Agency",
      "desc": "Studio Vermilion is a Swiss-minimal marketing agency profile template with huge typography, accordion services and a hairline work grid.",
      "hue": 192
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-04-law-firm",
      "idx": 4,
      "path": "templates/company-profile/template-04-law-firm/index.html",
      "brand": "Hartwell &amp; Crane LLP",
      "concept": "Law Firm",
      "desc": "Hartwell and Crane LLP is a dark, gold-accented law firm profile template with a KPI band, bento practice areas and case results with metrics.",
      "hue": 209
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-05-logistics-company",
      "idx": 5,
      "path": "templates/company-profile/template-05-logistics-company/index.html",
      "brand": "MeridianHaul Logistics",
      "concept": "Logistics Company",
      "desc": "MeridianHaul is a logistics company profile template with route-line styling, process timeline, certification band and live-feeling stats.",
      "hue": 226
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-06-finance-consultant",
      "idx": 6,
      "path": "templates/company-profile/template-06-finance-consultant/index.html",
      "brand": "Aldergate Advisory",
      "concept": "Finance Consultant",
      "desc": "Aldergate Advisory is a warm, trust-led financial consulting profile template with fee-transparent service cards, testimonials and credential badges.",
      "hue": 243
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-07-architecture-studio",
      "idx": 7,
      "path": "templates/company-profile/template-07-architecture-studio/index.html",
      "brand": "Atelier Northgrid",
      "concept": "Architecture Studio",
      "desc": "Atelier Northgrid is an ultra-minimal architecture studio profile template with huge numerals, hairline grids and an accordion of disciplines.",
      "hue": 260
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-08-healthcare-clinic",
      "idx": 8,
      "path": "templates/company-profile/template-08-healthcare-clinic/index.html",
      "brand": "Brightwater Clinic",
      "concept": "Healthcare Clinic",
      "desc": "Brightwater Clinic is a soft, rounded healthcare profile template with tabbed care services, a patient-journey timeline and an appointment-style contact form.",
      "hue": 277
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-09-education-institution",
      "idx": 9,
      "path": "templates/company-profile/template-09-education-institution/index.html",
      "brand": "Alder Gate College",
      "concept": "Education Institution",
      "desc": "Alder Gate College is a collegiate education profile template with banner-shaped accents, tabbed academic pathways and an admissions-style enquiry form.",
      "hue": 294
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-10-real-estate-company",
      "idx": 10,
      "path": "templates/company-profile/template-10-real-estate-company/index.html",
      "brand": "Foxglove Estates",
      "concept": "Real Estate Company",
      "desc": "Foxglove Estates is an ivory-and-forest real estate profile template with serif headlines, big-number stats, testimonials and a property-style client wall.",
      "hue": 311
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-11-restaurant-group",
      "idx": 11,
      "path": "templates/company-profile/template-11-restaurant-group/index.html",
      "brand": "Casa Fiorelli Group",
      "concept": "Restaurant Group",
      "desc": "Casa Fiorelli Group is a warm restaurant-group profile template with menu-card services, a kitchen-process timeline and table-booking style contact.",
      "hue": 328
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-12-manufacturing-company",
      "idx": 12,
      "path": "templates/company-profile/template-12-manufacturing-company/index.html",
      "brand": "Vulkan Precision Works",
      "concept": "Manufacturing Company",
      "desc": "Vulkan Precision Works is a graphite-and-amber manufacturing profile template with blueprint grid styling, a bento capability matrix and tolerance-grade…",
      "hue": 345
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-13-creative-studio",
      "idx": 13,
      "path": "templates/company-profile/template-13-creative-studio/index.html",
      "brand": "Pigeonhole Studio",
      "concept": "Creative Studio",
      "desc": "Pigeonhole Studio is a playful Swiss-leaning creative studio profile template with offset rotated cards, electric blue accents and accordion capabilities.",
      "hue": 2
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-14-travel-company",
      "idx": 14,
      "path": "templates/company-profile/template-14-travel-company/index.html",
      "brand": "Solana Voyages",
      "concept": "Travel Company",
      "desc": "Solana Voyages is an airy travel company profile template with boarding-pass styling, wave dividers, tabbed trip types and a filterable destination grid.",
      "hue": 19
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-15-security-company",
      "idx": 15,
      "path": "templates/company-profile/template-15-security-company/index.html",
      "brand": "Sentinel Axis",
      "concept": "Security Company",
      "desc": "Sentinel Axis is a midnight-and-cyan security company profile template with radar grid styling, a SOC capability bento and engagement-protocol timeline.",
      "hue": 36
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-16-hr-consulting",
      "idx": 16,
      "path": "templates/company-profile/template-16-hr-consulting/index.html",
      "brand": "Mosaic People Partners",
      "concept": "HR Consulting",
      "desc": "Mosaic People Partners is a friendly lavender-indigo HR consulting profile template with people-first service cards, testimonials and a culture-focused FAQ.",
      "hue": 53
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-17-event-organizer",
      "idx": 17,
      "path": "templates/company-profile/template-17-event-organizer/index.html",
      "brand": "Velvet Comet Events",
      "concept": "Event Organizer",
      "desc": "Velvet Comet Events is a festive dark-plum event organizer profile template with confetti accents, priced production packages and a stats band that counts up.",
      "hue": 70
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-18-renewable-energy",
      "idx": 18,
      "path": "templates/company-profile/template-18-renewable-energy/index.html",
      "brand": "Verdant Grid Energy",
      "concept": "Renewable Energy",
      "desc": "Verdant Grid Energy is a deep-green renewable energy profile template with lime-and-sky accents, curved section breaks and audited impact case studies.",
      "hue": 87
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-19-interior-design",
      "idx": 19,
      "path": "templates/company-profile/template-19-interior-design/index.html",
      "brand": "Maison Ochre &amp; Fen",
      "concept": "Interior Design",
      "desc": "Maison Ochre and Fen is a greige interior design profile template with framed gallery grids, serif elegance and an accordion of design services.",
      "hue": 104
    },
    {
      "cat": "company-profile",
      "catLabel": "Company Profiles",
      "slug": "template-20-local-business",
      "idx": 20,
      "path": "templates/company-profile/template-20-local-business/index.html",
      "brand": "Hearthside Hardware &amp; Home",
      "concept": "Local Business",
      "desc": "Hearthside Hardware and Home is a warm amber local-business profile template with hand-crafted styling, priced services, neighbor testimonials and store hours.",
      "hue": 121
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-01-uiux-designer",
      "idx": 1,
      "path": "templates/portfolio/template-01-uiux-designer/index.html",
      "brand": "Maya Lindqvist",
      "concept": "UI/UX Designer",
      "desc": "A pure HTML/CSS/JS portfolio template for a ui/ux designer, styled as a split layout with a sticky identity panel beside a scrolling content column.",
      "hue": 268
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-02-frontend-developer",
      "idx": 2,
      "path": "templates/portfolio/template-02-frontend-developer/index.html",
      "brand": "Devon Carter",
      "concept": "Frontend Developer",
      "desc": "A pure HTML/CSS/JS portfolio template for a frontend developer, styled as a name-first, big-typography one-pager with a filterable project grid.",
      "hue": 285
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-03-photographer",
      "idx": 3,
      "path": "templates/portfolio/template-03-photographer/index.html",
      "brand": "Sofia Marchetti",
      "concept": "Photographer",
      "desc": "A pure HTML/CSS/JS portfolio template for a photographer, styled as a dark showcase with a marquee skill strip, masonry gallery and quick-view modal.",
      "hue": 302
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-04-video-editor",
      "idx": 4,
      "path": "templates/portfolio/template-04-video-editor/index.html",
      "brand": "Jae-won Park",
      "concept": "Video Editor",
      "desc": "A pure HTML/CSS/JS portfolio template for a video editor, styled as a playful bento-grid layout with stat cards and tag-filtered projects.",
      "hue": 319
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-05-copywriter",
      "idx": 5,
      "path": "templates/portfolio/template-05-copywriter/index.html",
      "brand": "Eleanor Whitfield",
      "concept": "Copywriter",
      "desc": "A pure HTML/CSS/JS portfolio template for a copywriter, styled as an editorial, serif-led resume with a numbered case index and experience table.",
      "hue": 336
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-06-architect",
      "idx": 6,
      "path": "templates/portfolio/template-06-architect/index.html",
      "brand": "Tomas Reyes",
      "concept": "Architect",
      "desc": "A pure HTML/CSS/JS portfolio template for a architect, styled as an editorial, serif-led resume with a numbered case index and experience table.",
      "hue": 353
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-07-product-designer",
      "idx": 7,
      "path": "templates/portfolio/template-07-product-designer/index.html",
      "brand": "Priya Raghavan",
      "concept": "Product Designer",
      "desc": "A pure HTML/CSS/JS portfolio template for a product designer, styled as a split layout with a sticky identity panel beside a scrolling content column.",
      "hue": 10
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-08-motion-designer",
      "idx": 8,
      "path": "templates/portfolio/template-08-motion-designer/index.html",
      "brand": "Luca Moreau",
      "concept": "Motion Designer",
      "desc": "A pure HTML/CSS/JS portfolio template for a motion designer, styled as a dark showcase with a marquee skill strip, masonry gallery and quick-view modal.",
      "hue": 27
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-09-illustrator",
      "idx": 9,
      "path": "templates/portfolio/template-09-illustrator/index.html",
      "brand": "Hana Sato",
      "concept": "Illustrator",
      "desc": "A pure HTML/CSS/JS portfolio template for a illustrator, styled as an editorial, serif-led resume with a numbered case index and experience table.",
      "hue": 44
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-10-data-analyst",
      "idx": 10,
      "path": "templates/portfolio/template-10-data-analyst/index.html",
      "brand": "Marcus Oyelaran",
      "concept": "Data Analyst",
      "desc": "A pure HTML/CSS/JS portfolio template for a data analyst, styled as a name-first, big-typography one-pager with a filterable project grid.",
      "hue": 61
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-11-marketing-strategist",
      "idx": 11,
      "path": "templates/portfolio/template-11-marketing-strategist/index.html",
      "brand": "Camille Dubois",
      "concept": "Marketing Strategist",
      "desc": "A pure HTML/CSS/JS portfolio template for a marketing strategist, styled as a split layout with a sticky identity panel beside a scrolling content column.",
      "hue": 78
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-12-personal-brand",
      "idx": 12,
      "path": "templates/portfolio/template-12-personal-brand/index.html",
      "brand": "Adrian Volkov",
      "concept": "Personal Brand",
      "desc": "A pure HTML/CSS/JS portfolio template for a brand strategist &amp; speaker, styled as a dark showcase with a marquee skill strip, masonry gallery and quick-view…",
      "hue": 95
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-13-freelancer",
      "idx": 13,
      "path": "templates/portfolio/template-13-freelancer/index.html",
      "brand": "Nadia Haddad",
      "concept": "Freelancer",
      "desc": "A pure HTML/CSS/JS portfolio template for a freelance web designer &amp; developer, styled as a name-first, big-typography one-pager with a filterable project grid.",
      "hue": 112
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-14-student-portfolio",
      "idx": 14,
      "path": "templates/portfolio/template-14-student-portfolio/index.html",
      "brand": "Theo Okafor",
      "concept": "Student Portfolio",
      "desc": "A pure HTML/CSS/JS portfolio template for a design &amp; cs student, styled as a playful bento-grid layout with stat cards and tag-filtered projects.",
      "hue": 129
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-15-creative-director",
      "idx": 15,
      "path": "templates/portfolio/template-15-creative-director/index.html",
      "brand": "Isabella Fontaine",
      "concept": "Creative Director",
      "desc": "A pure HTML/CSS/JS portfolio template for a creative director, styled as an editorial, serif-led resume with a numbered case index and experience table.",
      "hue": 146
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-16-software-engineer",
      "idx": 16,
      "path": "templates/portfolio/template-16-software-engineer/index.html",
      "brand": "Rohan Mehta",
      "concept": "Software Engineer",
      "desc": "A pure HTML/CSS/JS portfolio template for a software engineer, styled as a playful bento-grid layout with stat cards and tag-filtered projects.",
      "hue": 163
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-17-3d-artist",
      "idx": 17,
      "path": "templates/portfolio/template-17-3d-artist/index.html",
      "brand": "Zara Nilsson",
      "concept": "3D Artist",
      "desc": "A pure HTML/CSS/JS portfolio template for a 3d artist, styled as a dark showcase with a marquee skill strip, masonry gallery and quick-view modal.",
      "hue": 180
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-18-consultant",
      "idx": 18,
      "path": "templates/portfolio/template-18-consultant/index.html",
      "brand": "William Ashford",
      "concept": "Consultant",
      "desc": "A pure HTML/CSS/JS portfolio template for a management consultant, styled as a split layout with a sticky identity panel beside a scrolling content column.",
      "hue": 197
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-19-writer",
      "idx": 19,
      "path": "templates/portfolio/template-19-writer/index.html",
      "brand": "Margaret Liu",
      "concept": "Writer",
      "desc": "A pure HTML/CSS/JS portfolio template for a writer &amp; essayist, styled as a name-first, big-typography one-pager with a filterable project grid.",
      "hue": 214
    },
    {
      "cat": "portfolio",
      "catLabel": "Portfolios",
      "slug": "template-20-startup-founder",
      "idx": 20,
      "path": "templates/portfolio/template-20-startup-founder/index.html",
      "brand": "Daniel Kim",
      "concept": "Startup Founder",
      "desc": "A pure HTML/CSS/JS portfolio template for a startup founder, styled as a playful bento-grid layout with stat cards and tag-filtered projects.",
      "hue": 231
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-01-sales-dashboard",
      "idx": 1,
      "path": "templates/admin-dashboard/template-01-sales-dashboard/index.html",
      "brand": "Northpeak",
      "concept": "Sales Dashboard",
      "desc": "A clean light sales admin dashboard template with revenue stats, an animated bar chart, deal pipeline table and activity feed.",
      "hue": 24
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-02-ecommerce-admin",
      "idx": 2,
      "path": "templates/admin-dashboard/template-02-ecommerce-admin/index.html",
      "brand": "Cartloom",
      "concept": "Ecommerce Admin",
      "desc": "A two-tone e-commerce admin dashboard template with an indigo sidebar, animated revenue line chart, tabbed orders table and best-seller list.",
      "hue": 41
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-03-crm-dashboard",
      "idx": 3,
      "path": "templates/admin-dashboard/template-03-crm-dashboard/index.html",
      "brand": "Pipeforge",
      "concept": "CRM Dashboard",
      "desc": "A full-dark CRM dashboard template with bento stat tiles, conic-gradient pipeline donut, animated bar chart, timeline feed and a light theme toggle.",
      "hue": 58
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-04-finance-dashboard",
      "idx": 4,
      "path": "templates/admin-dashboard/template-04-finance-dashboard/index.html",
      "brand": "Ledgerline",
      "concept": "Finance Dashboard",
      "desc": "A dense enterprise finance dashboard template with icon-rail navigation, cashflow combo chart, sparkline stat cards and a transactions ledger table.",
      "hue": 75
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-05-hr-dashboard",
      "idx": 5,
      "path": "templates/admin-dashboard/template-05-hr-dashboard/index.html",
      "brand": "Peoplewise",
      "concept": "HR Dashboard",
      "desc": "A friendly light HR dashboard template with headcount stats, an animated department bar chart, hiring funnel progress list and candidate table.",
      "hue": 92
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-06-project-management",
      "idx": 6,
      "path": "templates/admin-dashboard/template-06-project-management/index.html",
      "brand": "Sprintdeck",
      "concept": "Project Management",
      "desc": "A two-tone project management dashboard template with slate sidebar, sprint burnup line chart, epic progress list and tabbed task table.",
      "hue": 109
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-07-analytics-dashboard",
      "idx": 7,
      "path": "templates/admin-dashboard/template-07-analytics-dashboard/index.html",
      "brand": "Metricore",
      "concept": "Analytics Dashboard",
      "desc": "A dense analytics dashboard template with icon-rail navigation, multi-series traffic line chart, sparkline stats, top sources list and pages table.",
      "hue": 126
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-08-saas-dashboard",
      "idx": 8,
      "path": "templates/admin-dashboard/template-08-saas-dashboard/index.html",
      "brand": "Orbitly",
      "concept": "SaaS Dashboard",
      "desc": "A glowing dark SaaS metrics dashboard template with bento tiles, MRR bar chart, plan-mix donut, ARR goal gauge and a light theme toggle.",
      "hue": 143
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-09-inventory-dashboard",
      "idx": 9,
      "path": "templates/admin-dashboard/template-09-inventory-dashboard/index.html",
      "brand": "Stockpilot",
      "concept": "Inventory Dashboard",
      "desc": "A warm-gray dense inventory dashboard template with icon-rail navigation, stock movement combo chart, warehouse capacity bars and reorder queue table.",
      "hue": 160
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-10-school-admin",
      "idx": 10,
      "path": "templates/admin-dashboard/template-10-school-admin/index.html",
      "brand": "Campusgrove",
      "concept": "School Admin",
      "desc": "A two-tone school administration dashboard template with green sidebar, attendance line chart, term calendar, staff strip and tabbed student table.",
      "hue": 177
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-11-hospital-admin",
      "idx": 11,
      "path": "templates/admin-dashboard/template-11-hospital-admin/index.html",
      "brand": "Wardlight",
      "concept": "Hospital Admin",
      "desc": "A calm boxed hospital administration dashboard template with bed-occupancy donut, appointments table with live filter and on-duty staff strip.",
      "hue": 194
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-12-real-estate-admin",
      "idx": 12,
      "path": "templates/admin-dashboard/template-12-real-estate-admin/index.html",
      "brand": "Hearthview",
      "concept": "Real Estate Admin",
      "desc": "A warm sand-toned real estate admin dashboard template with serif headings, viewings bar chart, hottest listings ranking and a filterable listings table.",
      "hue": 211
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-13-marketing-dashboard",
      "idx": 13,
      "path": "templates/admin-dashboard/template-13-marketing-dashboard/index.html",
      "brand": "Funnelfox",
      "concept": "Marketing Dashboard",
      "desc": "A bright marketing dashboard template with grouped spend-vs-revenue bar chart, lead goal gauge, quick actions and campaign performance table.",
      "hue": 228
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-14-content-dashboard",
      "idx": 14,
      "path": "templates/admin-dashboard/template-14-content-dashboard/index.html",
      "brand": "Inkflow",
      "concept": "Content Dashboard",
      "desc": "A lavender editorial content dashboard template with pipeline bars, editorial mini-calendar, filterable posts table and publishing activity feed.",
      "hue": 245
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-15-support-tickets",
      "idx": 15,
      "path": "templates/admin-dashboard/template-15-support-tickets/index.html",
      "brand": "Resolvo",
      "concept": "Support Tickets",
      "desc": "A dense support operations dashboard template with SLA gauge, ticket volume combo chart, sparkline stats and a 10-row priority ticket queue.",
      "hue": 262
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-16-logistics-dashboard",
      "idx": 16,
      "path": "templates/admin-dashboard/template-16-logistics-dashboard/index.html",
      "brand": "Freightwise",
      "concept": "Logistics Dashboard",
      "desc": "A navy-and-amber logistics control tower dashboard template with dual-area volume chart, route network grid, tabbed shipments table and dark mode toggle.",
      "hue": 279
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-17-booking-dashboard",
      "idx": 17,
      "path": "templates/admin-dashboard/template-17-booking-dashboard/index.html",
      "brand": "Stayline",
      "concept": "Booking Dashboard",
      "desc": "A fresh teal booking dashboard template with daily occupancy bars and target line, June availability calendar and a reservations table.",
      "hue": 296
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-18-membership-dashboard",
      "idx": 18,
      "path": "templates/admin-dashboard/template-18-membership-dashboard/index.html",
      "brand": "Clubrise",
      "concept": "Membership Dashboard",
      "desc": "A peach-toned membership dashboard template with churn donut, renewal goal gauge, filterable member table and retention activity feed.",
      "hue": 313
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-19-ai-usage-dashboard",
      "idx": 19,
      "path": "templates/admin-dashboard/template-19-ai-usage-dashboard/index.html",
      "brand": "Tokentrace",
      "concept": "AI Usage Dashboard",
      "desc": "A neon-on-dark AI usage dashboard template with grouped token bar chart, model-share donut, top consumers list, model table and light theme toggle.",
      "hue": 330
    },
    {
      "cat": "admin-dashboard",
      "catLabel": "Admin Dashboards",
      "slug": "template-20-creator-dashboard",
      "idx": 20,
      "path": "templates/admin-dashboard/template-20-creator-dashboard/index.html",
      "brand": "Fanforge",
      "concept": "Creator Dashboard",
      "desc": "A plum-dark creator studio dashboard template with earnings bar chart, revenue-mix donut, collab strip, content table and light theme toggle.",
      "hue": 347
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-01-personal-blog",
      "idx": 1,
      "path": "templates/blog-magazine/template-01-personal-blog/index.html",
      "brand": "Inkwell &amp; Ash",
      "concept": "Personal Blog",
      "desc": "Inkwell &amp; Ash is a multi-page personal blog template built as a minimal essay (centered reading column, large serif, list-style index, reading-progress…",
      "hue": 330
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-02-tech-blog",
      "idx": 2,
      "path": "templates/blog-magazine/template-02-tech-blog/index.html",
      "brand": "Stackline",
      "concept": "Tech Blog",
      "desc": "Stackline is a multi-page tech blog template built as a classic editorial (split featured hero, three-column grid with a sticky right sidebar), with a full…",
      "hue": 347
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-03-news-portal",
      "idx": 3,
      "path": "templates/blog-magazine/template-03-news-portal/index.html",
      "brand": "The Daily Meridian",
      "concept": "News Portal",
      "desc": "The Daily Meridian is a multi-page news portal template built as a news portal (breaking-news ticker, dense multi-section front page, compact story lists),…",
      "hue": 4
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-04-fashion-magazine",
      "idx": 4,
      "path": "templates/blog-magazine/template-04-fashion-magazine/index.html",
      "brand": "Lumière",
      "concept": "Fashion Magazine",
      "desc": "Lumière is a multi-page fashion magazine template built as a bold magazine (full-bleed cover hero, asymmetric mosaic grid, oversized pull-quote band), with…",
      "hue": 21
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-05-recipe-blog",
      "idx": 5,
      "path": "templates/blog-magazine/template-05-recipe-blog/index.html",
      "brand": "Butter &amp; Thyme",
      "concept": "Recipe Blog",
      "desc": "Butter &amp; Thyme is a multi-page recipe blog template built as a classic editorial (split featured hero, three-column grid with a sticky right sidebar), with…",
      "hue": 38
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-06-travel-journal",
      "idx": 6,
      "path": "templates/blog-magazine/template-06-travel-journal/index.html",
      "brand": "The Wanderlog",
      "concept": "Travel Journal",
      "desc": "The Wanderlog is a multi-page travel journal template built as a minimal essay (centered reading column, large serif, list-style index, reading-progress…",
      "hue": 55
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-07-movie-review-blog",
      "idx": 7,
      "path": "templates/blog-magazine/template-07-movie-review-blog/index.html",
      "brand": "Grindhouse Weekly",
      "concept": "Movie Review Blog",
      "desc": "Grindhouse Weekly is a multi-page movie review blog template built as a dark zine (dark theme, shelf/masonry layout, duotone covers, topic marquee), with a…",
      "hue": 72
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-08-music-magazine",
      "idx": 8,
      "path": "templates/blog-magazine/template-08-music-magazine/index.html",
      "brand": "Frequency",
      "concept": "Music Magazine",
      "desc": "Frequency is a multi-page music magazine template built as a dark zine (dark theme, shelf/masonry layout, duotone covers, topic marquee), with a full home…",
      "hue": 89
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-09-sports-news",
      "idx": 9,
      "path": "templates/blog-magazine/template-09-sports-news/index.html",
      "brand": "Full Press",
      "concept": "Sports News",
      "desc": "Full Press is a multi-page sports news template built as a news portal (breaking-news ticker, dense multi-section front page, compact story lists), with a…",
      "hue": 106
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-10-science-magazine",
      "idx": 10,
      "path": "templates/blog-magazine/template-10-science-magazine/index.html",
      "brand": "Orbital",
      "concept": "Science Magazine",
      "desc": "Orbital is a multi-page science magazine template built as a classic editorial (split featured hero, three-column grid with a sticky right sidebar), with a…",
      "hue": 123
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-11-business-journal",
      "idx": 11,
      "path": "templates/blog-magazine/template-11-business-journal/index.html",
      "brand": "The Ledger Standard",
      "concept": "Business Journal",
      "desc": "The Ledger Standard is a multi-page business journal template built as a news portal (breaking-news ticker, dense multi-section front page, compact story…",
      "hue": 140
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-12-lifestyle-magazine",
      "idx": 12,
      "path": "templates/blog-magazine/template-12-lifestyle-magazine/index.html",
      "brand": "Golden Hour",
      "concept": "Lifestyle Magazine",
      "desc": "Golden Hour is a multi-page lifestyle magazine template built as a bold magazine (full-bleed cover hero, asymmetric mosaic grid, oversized pull-quote band),…",
      "hue": 157
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-13-gaming-blog",
      "idx": 13,
      "path": "templates/blog-magazine/template-13-gaming-blog/index.html",
      "brand": "Respawn Point",
      "concept": "Gaming Blog",
      "desc": "Respawn Point is a multi-page gaming blog template built as a dark zine (dark theme, shelf/masonry layout, duotone covers, topic marquee), with a full home…",
      "hue": 174
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-14-parenting-blog",
      "idx": 14,
      "path": "templates/blog-magazine/template-14-parenting-blog/index.html",
      "brand": "Little Wonders",
      "concept": "Parenting Blog",
      "desc": "Little Wonders is a multi-page parenting blog template built as a classic editorial (split featured hero, three-column grid with a sticky right sidebar),…",
      "hue": 191
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-15-book-review-blog",
      "idx": 15,
      "path": "templates/blog-magazine/template-15-book-review-blog/index.html",
      "brand": "The Marginalia Review",
      "concept": "Book Review Blog",
      "desc": "The Marginalia Review is a multi-page book review blog template built as a minimal essay (centered reading column, large serif, list-style index,…",
      "hue": 208
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-16-photography-zine",
      "idx": 16,
      "path": "templates/blog-magazine/template-16-photography-zine/index.html",
      "brand": "Aperture Null",
      "concept": "Photography Zine",
      "desc": "Aperture Null is a multi-page photography zine template built as a bold magazine (full-bleed cover hero, asymmetric mosaic grid, oversized pull-quote band),…",
      "hue": 225
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-17-finance-blog",
      "idx": 17,
      "path": "templates/blog-magazine/template-17-finance-blog/index.html",
      "brand": "Basis Point",
      "concept": "Finance Blog",
      "desc": "Basis Point is a multi-page finance blog template built as a classic editorial (split featured hero, three-column grid with a sticky right sidebar), with a…",
      "hue": 242
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-18-health-wellness-blog",
      "idx": 18,
      "path": "templates/blog-magazine/template-18-health-wellness-blog/index.html",
      "brand": "Stillpoint",
      "concept": "Health Wellness Blog",
      "desc": "Stillpoint is a multi-page health &amp; wellness blog template built as a minimal essay (centered reading column, large serif, list-style index,…",
      "hue": 259
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-19-art-culture-magazine",
      "idx": 19,
      "path": "templates/blog-magazine/template-19-art-culture-magazine/index.html",
      "brand": "TILT",
      "concept": "Art Culture Magazine",
      "desc": "TILT is a multi-page art &amp; culture magazine template built as a bold magazine (full-bleed cover hero, asymmetric mosaic grid, oversized pull-quote band),…",
      "hue": 276
    },
    {
      "cat": "blog-magazine",
      "catLabel": "Blog & Magazine",
      "slug": "template-20-podcast-blog",
      "idx": 20,
      "path": "templates/blog-magazine/template-20-podcast-blog/index.html",
      "brand": "Static &amp; Signal",
      "concept": "Podcast Blog",
      "desc": "Static &amp; Signal is a multi-page podcast blog template built as a dark zine (dark theme, shelf/masonry layout, duotone covers, topic marquee), with a full…",
      "hue": 293
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-01-fine-dining",
      "idx": 1,
      "path": "templates/restaurant-food/template-01-fine-dining/index.html",
      "brand": "Lumière &amp; Ash",
      "concept": "Fine Dining",
      "desc": "Lumière &amp; Ash is a dark, gold-accented fine dining template with a tasting menu, chef story, reservation form and a candlelit gallery.",
      "hue": 18
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-02-cafe",
      "idx": 2,
      "path": "templates/restaurant-food/template-02-cafe/index.html",
      "brand": "Harrow &amp; Bean",
      "concept": "Cafe",
      "desc": "Harrow &amp; Bean is a cozy cream-and-espresso café template with a brew-bar menu, roaster story, table booking form and neighbourhood charm.",
      "hue": 35
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-03-bakery",
      "idx": 3,
      "path": "templates/restaurant-food/template-03-bakery/index.html",
      "brand": "Butterfold Bakehouse",
      "concept": "Bakery",
      "desc": "Butterfold Bakehouse is a warm, scallop-edged bakery template with a pastry case menu, bake schedule, preorder form and small-batch story.",
      "hue": 52
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-04-pizzeria",
      "idx": 4,
      "path": "templates/restaurant-food/template-04-pizzeria/index.html",
      "brand": "Rosso Forno",
      "concept": "Pizzeria",
      "desc": "Rosso Forno is a bold red-and-basil pizzeria template with menu tabs, a 3-step order band, floating dish cards and an order form.",
      "hue": 69
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-05-sushi-japanese",
      "idx": 5,
      "path": "templates/restaurant-food/template-05-sushi-japanese/index.html",
      "brand": "Kanade",
      "concept": "Sushi Japanese",
      "desc": "Kanade is a minimal ink-and-vermilion sushi template with an omakase menu, counter seatings, zen gallery and reservation form.",
      "hue": 86
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-06-burger-joint",
      "idx": 6,
      "path": "templates/restaurant-food/template-06-burger-joint/index.html",
      "brand": "Hatch &amp; Griddle",
      "concept": "Burger Joint",
      "desc": "Hatch &amp; Griddle is a loud mustard-and-ketchup burger joint template with a chalkboard specials panel, stacked hero banners and an order form.",
      "hue": 103
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-07-vegan-restaurant",
      "idx": 7,
      "path": "templates/restaurant-food/template-07-vegan-restaurant/index.html",
      "brand": "Rootline Kitchen",
      "concept": "Vegan Restaurant",
      "desc": "Rootline Kitchen is a leafy plant-based restaurant template with a chip-filtered bowl menu, grower sourcing band, booking form and organic shapes.",
      "hue": 120
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-08-seafood-restaurant",
      "idx": 8,
      "path": "templates/restaurant-food/template-08-seafood-restaurant/index.html",
      "brand": "Saltline &amp; Tide",
      "concept": "Seafood Restaurant",
      "desc": "Saltline &amp; Tide is a foam-and-navy coastal seafood template with a raw bar menu, daily catch board, wave dividers and reservation form.",
      "hue": 137
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-09-steakhouse",
      "idx": 9,
      "path": "templates/restaurant-food/template-09-steakhouse/index.html",
      "brand": "Emberline Chophouse",
      "concept": "Steakhouse",
      "desc": "Emberline Chophouse is a dark walnut-and-ember steakhouse template with a cuts board, dry-age room story, masonry gallery and reservations.",
      "hue": 154
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-10-ice-cream-parlor",
      "idx": 10,
      "path": "templates/restaurant-food/template-10-ice-cream-parlor/index.html",
      "brand": "Moonmilk Creamery",
      "concept": "Ice Cream Parlor",
      "desc": "Moonmilk Creamery is a pastel scoop-shop template with a chip-filtered flavor board, sundae builder copy, party preorder form and playful circles.",
      "hue": 171
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-11-food-truck",
      "idx": 11,
      "path": "templates/restaurant-food/template-11-food-truck/index.html",
      "brand": "Citrus Comet",
      "concept": "Food Truck",
      "desc": "Citrus Comet is a sunshine-yellow taco truck template with a weekly location board, chalk specials, sticker badges and a catering booking form.",
      "hue": 188
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-12-catering-service",
      "idx": 12,
      "path": "templates/restaurant-food/template-12-catering-service/index.html",
      "brand": "Velvet Thyme",
      "concept": "Catering Service",
      "desc": "Velvet Thyme is an ivory-and-plum catering template with tasting menus, event packages, a quote request form and elegant service story.",
      "hue": 205
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-13-noodle-bar",
      "idx": 13,
      "path": "templates/restaurant-food/template-13-noodle-bar/index.html",
      "brand": "Tangle",
      "concept": "Noodle Bar",
      "desc": "Tangle is a chili-and-soy noodle bar template with steam-line accents, menu tabs, a slurp-steps band and a quick order form.",
      "hue": 222
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-14-brunch-bistro",
      "idx": 14,
      "path": "templates/restaurant-food/template-14-brunch-bistro/index.html",
      "brand": "Yolk &amp; Marigold",
      "concept": "Brunch Bistro",
      "desc": "Yolk &amp; Marigold is a sunny peach-and-sky brunch bistro template with a chip-filtered menu, sun-ray motifs, waitlist form and weekend energy.",
      "hue": 239
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-15-bbq-smokehouse",
      "idx": 15,
      "path": "templates/restaurant-food/template-15-bbq-smokehouse/index.html",
      "brand": "Black Kettle",
      "concept": "BBQ Smokehouse",
      "desc": "Black Kettle is a smoke-dark BBQ template with a pit schedule, by-the-pound menu, ember-orange accents and a pickup order form.",
      "hue": 256
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-16-tapas-wine-bar",
      "idx": 16,
      "path": "templates/restaurant-food/template-16-tapas-wine-bar/index.html",
      "brand": "Cala Roja",
      "concept": "Tapas Wine Bar",
      "desc": "Cala Roja is a rioja-toned tapas and wine bar template with a tiled accent band, sherry-hour card, shared-plates menu and table reservations.",
      "hue": 273
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-17-indonesian-restaurant",
      "idx": 17,
      "path": "templates/restaurant-food/template-17-indonesian-restaurant/index.html",
      "brand": "Dapur Kunyit",
      "concept": "Indonesian Restaurant",
      "desc": "Dapur Kunyit is a warm batik-accented Indonesian restaurant template with rendang and sate menus in rupiah, a daily specials board and table bookings.",
      "hue": 290
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-18-juice-smoothie-bar",
      "idx": 18,
      "path": "templates/restaurant-food/template-18-juice-smoothie-bar/index.html",
      "brand": "Pulp &amp; Glow",
      "concept": "Juice Smoothie Bar",
      "desc": "Pulp &amp; Glow is a lime-and-dragonfruit juice bar template with gradient fruit orbs, a chip-filtered blend menu, cleanse plans and a preorder form.",
      "hue": 307
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-19-food-delivery",
      "idx": 19,
      "path": "templates/restaurant-food/template-19-food-delivery/index.html",
      "brand": "Platerunner",
      "concept": "Food Delivery",
      "desc": "Platerunner is an app-clean food delivery template with a phone-mock hero, trending dishes menu, a 3-step order band and address-validated checkout form.",
      "hue": 324
    },
    {
      "cat": "restaurant-food",
      "catLabel": "Restaurant & Food",
      "slug": "template-20-cooking-class",
      "idx": 20,
      "path": "templates/restaurant-food/template-20-cooking-class/index.html",
      "brand": "Copper Spoon Atelier",
      "concept": "Cooking Class",
      "desc": "Copper Spoon Atelier is a paper-and-saffron cooking school template with a recipe-card class schedule, instructor story and class booking form.",
      "hue": 341
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-01-classic-wedding",
      "idx": 1,
      "path": "templates/event-wedding/template-01-classic-wedding/index.html",
      "brand": "Eleanor &amp; Theodore",
      "concept": "Classic Wedding",
      "desc": "Eleanor &amp; Theodore is a romantic classic, single-page classic wedding template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 300
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-02-rustic-wedding",
      "idx": 2,
      "path": "templates/event-wedding/template-02-rustic-wedding/index.html",
      "brand": "Hazel &amp; Jonah",
      "concept": "Rustic Wedding",
      "desc": "Hazel &amp; Jonah is a romantic classic, single-page rustic wedding template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 317
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-03-modern-wedding",
      "idx": 3,
      "path": "templates/event-wedding/template-03-modern-wedding/index.html",
      "brand": "Mara &amp; Idris",
      "concept": "Modern Wedding",
      "desc": "Mara &amp; Idris is a clean modern, single-page modern wedding template with a live countdown, a story timeline, a schedule, gallery, venue map and a validated…",
      "hue": 334
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-04-islamic-wedding",
      "idx": 4,
      "path": "templates/event-wedding/template-04-islamic-wedding/index.html",
      "brand": "Aisha &amp; Yusuf",
      "concept": "Islamic Wedding",
      "desc": "Aisha &amp; Yusuf is an elegant dark, single-page nikah celebration template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 351
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-05-engagement-party",
      "idx": 5,
      "path": "templates/event-wedding/template-05-engagement-party/index.html",
      "brand": "Sienna &amp; Leo",
      "concept": "Engagement Party",
      "desc": "Sienna &amp; Leo is a playful pastel, single-page engagement party template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 8
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-06-birthday-party",
      "idx": 6,
      "path": "templates/event-wedding/template-06-birthday-party/index.html",
      "brand": "Olivia Turns 30",
      "concept": "Birthday Party",
      "desc": "Olivia Turns 30 is a playful pastel, single-page birthday party template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 25
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-07-kids-birthday",
      "idx": 7,
      "path": "templates/event-wedding/template-07-kids-birthday/index.html",
      "brand": "Max is Turning 6!",
      "concept": "Kids Birthday",
      "desc": "Max is Turning 6! is a playful pastel, single-page kids birthday template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 42
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-08-baby-shower",
      "idx": 8,
      "path": "templates/event-wedding/template-08-baby-shower/index.html",
      "brand": "Baby Rivera",
      "concept": "Baby Shower",
      "desc": "Baby Rivera is a playful pastel, single-page baby shower template with a live countdown, a story timeline, a schedule, gallery, venue map and a validated…",
      "hue": 59
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-09-graduation-party",
      "idx": 9,
      "path": "templates/event-wedding/template-09-graduation-party/index.html",
      "brand": "Class of 2026",
      "concept": "Graduation Party",
      "desc": "Class of 2026 is a clean modern, single-page graduation party template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 76
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-10-tech-conference",
      "idx": 10,
      "path": "templates/event-wedding/template-10-tech-conference/index.html",
      "brand": "ShiftStack 2026",
      "concept": "Tech Conference",
      "desc": "ShiftStack 2026 is a bold festive, single-page tech conference template with a live countdown, a speaker grid, a schedule, gallery, venue map and a…",
      "hue": 93
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-11-music-festival",
      "idx": 11,
      "path": "templates/event-wedding/template-11-music-festival/index.html",
      "brand": "Solstice Sound 2026",
      "concept": "Music Festival",
      "desc": "Solstice Sound 2026 is a bold festive, single-page music festival template with a live countdown, a lineup wall, a schedule, gallery, venue map and a…",
      "hue": 110
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-12-charity-gala",
      "idx": 12,
      "path": "templates/event-wedding/template-12-charity-gala/index.html",
      "brand": "The Lumen Gala",
      "concept": "Charity Gala",
      "desc": "The Lumen Gala is an elegant dark, single-page charity gala template with a live countdown, a speaker grid, a schedule, gallery, venue map and a validated…",
      "hue": 127
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-13-online-webinar",
      "idx": 13,
      "path": "templates/event-wedding/template-13-online-webinar/index.html",
      "brand": "The Growth Lab Live",
      "concept": "Online Webinar",
      "desc": "The Growth Lab Live is a clean modern, single-page online webinar template with a live countdown, a speaker grid, a schedule, gallery, venue map and a…",
      "hue": 144
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-14-product-launch-event",
      "idx": 14,
      "path": "templates/event-wedding/template-14-product-launch-event/index.html",
      "brand": "Aero One Reveal",
      "concept": "Product Launch Event",
      "desc": "Aero One Reveal is a bold festive, single-page product launch template with a live countdown, a speaker grid, a schedule, gallery, venue map and a validated…",
      "hue": 161
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-15-art-exhibition",
      "idx": 15,
      "path": "templates/event-wedding/template-15-art-exhibition/index.html",
      "brand": "Liminal: New Works",
      "concept": "Art Exhibition",
      "desc": "Liminal: New Works is a clean modern, single-page art exhibition template with a live countdown, a speaker grid, a schedule, gallery, venue map and a…",
      "hue": 178
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-16-film-festival",
      "idx": 16,
      "path": "templates/event-wedding/template-16-film-festival/index.html",
      "brand": "Northlight Film Festival",
      "concept": "Film Festival",
      "desc": "Northlight Film Festival is an elegant dark, single-page film festival template with a live countdown, a lineup wall, a schedule, gallery, venue map and a…",
      "hue": 195
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-17-sports-tournament",
      "idx": 17,
      "path": "templates/event-wedding/template-17-sports-tournament/index.html",
      "brand": "Capital Cup 2026",
      "concept": "Sports Tournament",
      "desc": "Capital Cup 2026 is a bold festive, single-page sports tournament template with a live countdown, a team grid, a schedule, gallery, venue map and a…",
      "hue": 212
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-18-community-meetup",
      "idx": 18,
      "path": "templates/event-wedding/template-18-community-meetup/index.html",
      "brand": "The Riverside Get-Together",
      "concept": "Community Meetup",
      "desc": "The Riverside Get-Together is a playful pastel, single-page community meetup template with a live countdown, a story timeline, a schedule, gallery, venue…",
      "hue": 229
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-19-anniversary",
      "idx": 19,
      "path": "templates/event-wedding/template-19-anniversary/index.html",
      "brand": "Robert &amp; Margaret",
      "concept": "Anniversary",
      "desc": "Robert &amp; Margaret is a romantic classic, single-page 40th anniversary template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 246
    },
    {
      "cat": "event-wedding",
      "catLabel": "Event & Wedding",
      "slug": "template-20-new-year-party",
      "idx": 20,
      "path": "templates/event-wedding/template-20-new-year-party/index.html",
      "brand": "Midnight 2027",
      "concept": "New Year Party",
      "desc": "Midnight 2027 is an elegant dark, single-page new year’s eve gala template with a live countdown, a story timeline, a schedule, gallery, venue map and a…",
      "hue": 263
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-01-luxury-hotel",
      "idx": 1,
      "path": "templates/travel-hotel/template-01-luxury-hotel/index.html",
      "brand": "The Meridian Crest",
      "concept": "Luxury Hotel",
      "desc": "The Meridian Crest is a grand harbourfront luxury-hotel template with a full-bleed hero, a floating booking bar, six rooms and suites and a dedicated…",
      "hue": 190
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-02-boutique-hotel",
      "idx": 2,
      "path": "templates/travel-hotel/template-02-boutique-hotel/index.html",
      "brand": "Maison Olivetta",
      "concept": "Boutique Hotel",
      "desc": "Maison Olivetta is an editorial boutique-hotel template for an eleven-room townhouse, with oversized type, a photo-tile collage and a room-by-room detail page.",
      "hue": 207
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-03-beach-resort",
      "idx": 3,
      "path": "templates/travel-hotel/template-03-beach-resort/index.html",
      "brand": "Coralline Bay Resort",
      "concept": "Beach Resort",
      "desc": "Coralline Bay Resort is a fresh, airy beach-resort template with overwater villas, a split hero, a booking widget and a full villas-and-suites detail page.",
      "hue": 224
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-04-mountain-lodge",
      "idx": 4,
      "path": "templates/travel-hotel/template-04-mountain-lodge/index.html",
      "brand": "Blackpine Hollow Lodge",
      "concept": "Mountain Lodge",
      "desc": "Blackpine Hollow Lodge is a dark, adventurous mountain-lodge template with an expedition timeline, badge stats and a cabins-and-rooms detail page.",
      "hue": 241
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-05-city-hostel",
      "idx": 5,
      "path": "templates/travel-hotel/template-05-city-hostel/index.html",
      "brand": "The Tramline Hostel",
      "concept": "City Hostel",
      "desc": "The Tramline Hostel is a warm, friendly city-hostel template with a host-crew band, a how-it-works row, pod-dorm and private-room cards and a beds-and-rooms…",
      "hue": 258
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-06-villa-rental",
      "idx": 6,
      "path": "templates/travel-hotel/template-06-villa-rental/index.html",
      "brand": "Casa Terramar",
      "concept": "Villa Rental",
      "desc": "Casa Terramar is a luxury private-villa-rental template with a full-bleed hero, exclusive whole-villa booking and a suite-by-suite detail page.",
      "hue": 275
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-07-glamping-site",
      "idx": 7,
      "path": "templates/travel-hotel/template-07-glamping-site/index.html",
      "brand": "Wildfern Glamping",
      "concept": "Glamping Site",
      "desc": "Wildfern Glamping is a friendly glamping-site template with a host story, a how-it-works row, bell-tent and safari-lodge cards and a canvas-stays detail page.",
      "hue": 292
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-08-tour-operator",
      "idx": 8,
      "path": "templates/travel-hotel/template-08-tour-operator/index.html",
      "brand": "Greenline Expeditions",
      "concept": "Tour Operator",
      "desc": "Greenline Expeditions is a fresh small-group tour-operator template with a per-person enquiry widget, six journeys and a day-by-day itineraries detail page.",
      "hue": 309
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-09-destination-guide",
      "idx": 9,
      "path": "templates/travel-hotel/template-09-destination-guide/index.html",
      "brand": "Lisbon Unfolded",
      "concept": "Destination Guide",
      "desc": "Lisbon Unfolded is an editorial, independent destination-guide template with neighbourhood itineraries, a day-plan detail page and ad-free, locally-written…",
      "hue": 326
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-10-cruise-line",
      "idx": 10,
      "path": "templates/travel-hotel/template-10-cruise-line/index.html",
      "brand": "Aurelia Ocean Voyages",
      "concept": "Cruise Line",
      "desc": "Aurelia Ocean Voyages is a luxury boutique cruise-line template with a full-bleed hero, a floating booking bar, six staterooms and a voyages-and-staterooms…",
      "hue": 343
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-11-safari-adventure",
      "idx": 11,
      "path": "templates/travel-hotel/template-11-safari-adventure/index.html",
      "brand": "Acacia Plains Safaris",
      "concept": "Safari Adventure",
      "desc": "Acacia Plains Safaris is a dark, dramatic safari template with an expedition timeline, badge stats, a per-person enquiry widget and a safari-itineraries…",
      "hue": 0
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-12-ski-resort",
      "idx": 12,
      "path": "templates/travel-hotel/template-12-ski-resort/index.html",
      "brand": "Glacier Hollow Ski Resort",
      "concept": "Ski Resort",
      "desc": "Glacier Hollow Ski Resort is a fresh, modern ski-resort template with a split hero, slopeside lodge cards, a booking widget and a lodges-and-packages detail…",
      "hue": 17
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-13-travel-agency",
      "idx": 13,
      "path": "templates/travel-hotel/template-13-travel-agency/index.html",
      "brand": "Wayfare &amp; Co.",
      "concept": "Travel Agency",
      "desc": "Wayfare &amp; Co. is a fresh tailor-made travel-agency template with a per-person enquiry widget, trip-style cards and a tailored-itineraries detail page.",
      "hue": 34
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-14-serviced-apartment",
      "idx": 14,
      "path": "templates/travel-hotel/template-14-serviced-apartment/index.html",
      "brand": "The Lanyard Residences",
      "concept": "Serviced Apartment",
      "desc": "The Lanyard Residences is a refined serviced-apartments template with a full-bleed hero, length-of-stay rates, residence cards and a residences detail page.",
      "hue": 51
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-15-eco-retreat",
      "idx": 15,
      "path": "templates/travel-hotel/template-15-eco-retreat/index.html",
      "brand": "Mosswood Eco Retreat",
      "concept": "Eco Retreat",
      "desc": "Mosswood Eco Retreat is a warm, friendly off-grid eco-retreat template with a host story, a how-it-works row, cabin cards and a cabins-and-retreats detail page.",
      "hue": 68
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-16-campervan-rental",
      "idx": 16,
      "path": "templates/travel-hotel/template-16-campervan-rental/index.html",
      "brand": "Rambler Vans",
      "concept": "Campervan Rental",
      "desc": "Rambler Vans is a warm, retro campervan-rental template with a host-team band, a how-it-works row, fleet cards and a fleet-and-rates detail page.",
      "hue": 85
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-17-dive-center",
      "idx": 17,
      "path": "templates/travel-hotel/template-17-dive-center/index.html",
      "brand": "Abyssal Blue Dive Center",
      "concept": "Dive Center",
      "desc": "Abyssal Blue Dive Center is a deep, dark dive-centre template with a dive-day timeline, badge stats, a per-person booking widget and a dives-and-courses…",
      "hue": 102
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-18-heritage-hotel",
      "idx": 18,
      "path": "templates/travel-hotel/template-18-heritage-hotel/index.html",
      "brand": "The Ashbourne Manor",
      "concept": "Heritage Hotel",
      "desc": "The Ashbourne Manor is an editorial heritage-hotel template for a restored manor, with oversized type, a photo-tile collage and a room-by-room detail page.",
      "hue": 119
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-19-yacht-charter",
      "idx": 19,
      "path": "templates/travel-hotel/template-19-yacht-charter/index.html",
      "brand": "Meridian Yacht Charters",
      "concept": "Yacht Charter",
      "desc": "Meridian Yacht Charters is a refined yacht-charter template with a full-bleed hero, a floating booking bar, fleet cards and a fleet-and-charters detail page.",
      "hue": 136
    },
    {
      "cat": "travel-hotel",
      "catLabel": "Travel & Hotel",
      "slug": "template-20-homestay-bnb",
      "idx": 20,
      "path": "templates/travel-hotel/template-20-homestay-bnb/index.html",
      "brand": "Marigold House",
      "concept": "Homestay BnB",
      "desc": "Marigold House is a warm family homestay-and-B&amp;B template with a host-family band, a how-it-works row, room cards and an our-rooms detail page.",
      "hue": 153
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-01-modern-gym",
      "idx": 1,
      "path": "templates/health-fitness/template-01-modern-gym/index.html",
      "brand": "IRONHAUS Performance Gym",
      "concept": "Modern Gym",
      "desc": "IRONHAUS is a dark, volt-accented modern gym template with diagonal dividers, a count-up stats band, six-day tabbed class schedule and a coached free-trial…",
      "hue": 140
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-02-yoga-studio",
      "idx": 2,
      "path": "templates/health-fitness/template-02-yoga-studio/index.html",
      "brand": "Stillwater Yoga Loft",
      "concept": "Yoga Studio",
      "desc": "Stillwater is a sand-and-sage calm wellness yoga template with a guided breathing-circle widget, seven-day tabbed schedule, teacher cards and an intro-month…",
      "hue": 157
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-03-crossfit-box",
      "idx": 3,
      "path": "templates/health-fitness/template-03-crossfit-box/index.html",
      "brand": "Crucible Strength Co.",
      "concept": "Crossfit Box",
      "desc": "Crucible is a black-and-safety-orange CrossFit-style box template with a rotating WOD whiteboard widget, plate-grid hero motifs, six-day tabbed schedule and…",
      "hue": 174
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-04-pilates-studio",
      "idx": 4,
      "path": "templates/health-fitness/template-04-pilates-studio/index.html",
      "brand": "Aurelia Pilates Atelier",
      "concept": "Pilates Studio",
      "desc": "Aurelia is an ivory-and-mauve boutique Pilates atelier template with editorial serif headlines, a six-principle method stepper, an elegant day-grouped…",
      "hue": 191
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-05-personal-trainer",
      "idx": 5,
      "path": "templates/health-fitness/template-05-personal-trainer/index.html",
      "brand": "Vale Method",
      "concept": "Personal Trainer",
      "desc": "Vale Method is a slate-and-red personal training studio template with animated progress bars, count-up client metrics, a five-day tabbed session schedule…",
      "hue": 208
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-06-boxing-club",
      "idx": 6,
      "path": "templates/health-fitness/template-06-boxing-club/index.html",
      "brand": "Southpaw Boxing Club",
      "concept": "Boxing Club",
      "desc": "Southpaw is an ink, boxing-red and gold club template with rope-line borders, a live fight-night countdown, six-day tabbed bell schedule and a free…",
      "hue": 225
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-07-dance-studio",
      "idx": 7,
      "path": "templates/health-fitness/template-07-dance-studio/index.html",
      "brand": "Velvet Tempo Dance Studio",
      "concept": "Dance Studio",
      "desc": "Velvet Tempo is a fuchsia-and-violet boutique dance studio template with gradient motion-trail accents, a genre-filterable class grid, an editorial weekly…",
      "hue": 242
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-08-swimming-school",
      "idx": 8,
      "path": "templates/health-fitness/template-08-swimming-school/index.html",
      "brand": "BlueFin Swim School",
      "concept": "Swimming School",
      "desc": "BlueFin is a pool-white aqua-and-navy clinical swim school template with wave-lane motifs, an interactive level finder, a seven-day tabbed timetable and a…",
      "hue": 259
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-09-martial-arts-dojo",
      "idx": 9,
      "path": "templates/health-fitness/template-09-martial-arts-dojo/index.html",
      "brand": "Kurotora Dojo",
      "concept": "Martial Arts Dojo",
      "desc": "Kurotora is a paper-black-and-crimson martial arts dojo template with brush-stroke accents, a belt-rank progression band, etiquette accordion, editorial…",
      "hue": 276
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-10-spa-wellness",
      "idx": 10,
      "path": "templates/health-fitness/template-10-spa-wellness/index.html",
      "brand": "Salt &amp; Cedar Spa",
      "concept": "Spa Wellness",
      "desc": "Salt &amp; Cedar is a cream-and-eucalyptus calm spa template with steam-curve motifs, a signature-ritual slider, seven-day tabbed bathhouse timetable and a…",
      "hue": 293
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-11-physiotherapy-clinic",
      "idx": 11,
      "path": "templates/health-fitness/template-11-physiotherapy-clinic/index.html",
      "brand": "KinetiCare Physiotherapy",
      "concept": "Physiotherapy Clinic",
      "desc": "KinetiCare is a white-teal clinical physiotherapy template with joint-motion motifs, an interactive pain-area selector, tabbed weekly clinic schedule,…",
      "hue": 310
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-12-nutritionist",
      "idx": 12,
      "path": "templates/health-fitness/template-12-nutritionist/index.html",
      "brand": "Root &amp; Ratio Nutrition",
      "concept": "Nutritionist",
      "desc": "Root &amp; Ratio is a mint-and-avocado calm nutritionist template with an interactive conic plate-portion ring, five-day tabbed session schedule,…",
      "hue": 327
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-13-therapy-practice",
      "idx": 13,
      "path": "templates/health-fitness/template-13-therapy-practice/index.html",
      "brand": "Stillpoint Therapy Practice",
      "concept": "Therapy Practice",
      "desc": "Stillpoint is a warm-gray and dusk-blue calm therapy practice template with soft arch motifs, a five-day tabbed groups schedule, accredited-therapist…",
      "hue": 344
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-14-dental-clinic",
      "idx": 14,
      "path": "templates/health-fitness/template-14-dental-clinic/index.html",
      "brand": "Brightrow Dental Clinic",
      "concept": "Dental Clinic",
      "desc": "Brightrow is a white-and-dental-blue clinical template with smile-curve accents, an interactive treatment price guide, weekly surgery-hours grid, team…",
      "hue": 1
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-15-running-club",
      "idx": 15,
      "path": "templates/health-fitness/template-15-running-club/index.html",
      "brand": "Pacekeepers Run Club",
      "concept": "Running Club",
      "desc": "Pacekeepers is a bright orange-and-navy community running club template with dotted route motifs, a pace-group calculator, filterable weekly run plan,…",
      "hue": 18
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-16-spin-studio",
      "idx": 16,
      "path": "templates/health-fitness/template-16-spin-studio/index.html",
      "brand": "Afterdark Cycle",
      "concept": "Spin Studio",
      "desc": "Afterdark is a blacked-out neon-pink-and-cyan spin studio template with an animated beat-bar equalizer, seven-day tabbed ride board, instructor lineup and a…",
      "hue": 35
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-17-meditation-center",
      "idx": 17,
      "path": "templates/health-fitness/template-17-meditation-center/index.html",
      "brand": "Aurora Stillness Center",
      "concept": "Meditation Center",
      "desc": "Aurora is a lavender-mist meditation center template with gradient halo motifs, an interactive intention picker, seven-day tabbed sit schedule, guide…",
      "hue": 52
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-18-chiropractic-clinic",
      "idx": 18,
      "path": "templates/health-fitness/template-18-chiropractic-clinic/index.html",
      "brand": "Alignwell Chiropractic",
      "concept": "Chiropractic Clinic",
      "desc": "Alignwell is a light green-and-slate clinical chiropractic template with a spine-curve hero motif, weekly practitioner-hours grid, care-path FAQ accordion…",
      "hue": 69
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-19-weight-loss-program",
      "idx": 19,
      "path": "templates/health-fitness/template-19-weight-loss-program/index.html",
      "brand": "BrightShift",
      "concept": "Weight Loss Program",
      "desc": "BrightShift is a coral-and-teal community weight-loss program template with an interactive before/after data slider, filterable cohort week plan, results…",
      "hue": 86
    },
    {
      "cat": "health-fitness",
      "catLabel": "Health & Fitness",
      "slug": "template-20-senior-fitness",
      "idx": 20,
      "path": "templates/health-fitness/template-20-senior-fitness/index.html",
      "brand": "Evergreen Movement Club",
      "concept": "Senior Fitness",
      "desc": "Evergreen is a warm-ivory community senior-fitness template with extra-large readable type, a text-size toggle, intensity-filterable week plan, gentle perk…",
      "hue": 103
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-01-university",
      "idx": 1,
      "path": "templates/education-course/template-01-university/index.html",
      "brand": "Whitford University",
      "concept": "University",
      "desc": "A two-page university website template with an admissions flow, full curriculum detail, and a collegiate classic visual design.",
      "hue": 210
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-02-high-school",
      "idx": 2,
      "path": "templates/education-course/template-02-high-school/index.html",
      "brand": "Riverside Prep",
      "concept": "High School",
      "desc": "A two-page high school website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 227
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-03-elementary-school",
      "idx": 3,
      "path": "templates/education-course/template-03-elementary-school/index.html",
      "brand": "Sunnybrook Elementary",
      "concept": "Elementary School",
      "desc": "A two-page elementary school website template with an admissions flow, full curriculum detail, and a playful kids visual design.",
      "hue": 244
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-04-kindergarten",
      "idx": 4,
      "path": "templates/education-course/template-04-kindergarten/index.html",
      "brand": "Little Sprouts Kindergarten",
      "concept": "Kindergarten",
      "desc": "A two-page kindergarten website template with an admissions flow, full curriculum detail, and a playful kids visual design.",
      "hue": 261
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-05-coding-bootcamp",
      "idx": 5,
      "path": "templates/education-course/template-05-coding-bootcamp/index.html",
      "brand": "ForgeLabs Bootcamp",
      "concept": "Coding Bootcamp",
      "desc": "A two-page coding bootcamp website template with an admissions flow, full curriculum detail, and a bootcamp dark visual design.",
      "hue": 278
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-06-language-school",
      "idx": 6,
      "path": "templates/education-course/template-06-language-school/index.html",
      "brand": "Linguava Language School",
      "concept": "Language School",
      "desc": "A two-page language school website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 295
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-07-music-school",
      "idx": 7,
      "path": "templates/education-course/template-07-music-school/index.html",
      "brand": "Crescendo Conservatory",
      "concept": "Music School",
      "desc": "A two-page music school website template with an admissions flow, full curriculum detail, and a bootcamp dark visual design.",
      "hue": 312
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-08-art-school",
      "idx": 8,
      "path": "templates/education-course/template-08-art-school/index.html",
      "brand": "Pigment &amp; Co.",
      "concept": "Art School",
      "desc": "A two-page art school website template with an admissions flow, full curriculum detail, and a warm community visual design.",
      "hue": 329
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-09-driving-school",
      "idx": 9,
      "path": "templates/education-course/template-09-driving-school/index.html",
      "brand": "GreenLight Driving School",
      "concept": "Driving School",
      "desc": "A two-page driving school website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 346
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-10-culinary-school",
      "idx": 10,
      "path": "templates/education-course/template-10-culinary-school/index.html",
      "brand": "Saffron &amp; Salt",
      "concept": "Culinary School",
      "desc": "A two-page culinary school website template with an admissions flow, full curriculum detail, and a warm community visual design.",
      "hue": 3
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-11-tutoring-center",
      "idx": 11,
      "path": "templates/education-course/template-11-tutoring-center/index.html",
      "brand": "BrightPath Tutoring",
      "concept": "Tutoring Center",
      "desc": "A two-page tutoring center website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 20
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-12-exam-prep",
      "idx": 12,
      "path": "templates/education-course/template-12-exam-prep/index.html",
      "brand": "Summit Test Prep",
      "concept": "Exam Prep",
      "desc": "A two-page exam prep academy website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 37
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-13-design-course",
      "idx": 13,
      "path": "templates/education-course/template-13-design-course/index.html",
      "brand": "Prism Design School",
      "concept": "Design Course",
      "desc": "A two-page design course website template with an admissions flow, full curriculum detail, and a bootcamp dark visual design.",
      "hue": 54
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-14-photography-workshop",
      "idx": 14,
      "path": "templates/education-course/template-14-photography-workshop/index.html",
      "brand": "Aperture Collective",
      "concept": "Photography Workshop",
      "desc": "A two-page photography workshop website template with an admissions flow, full curriculum detail, and a bootcamp dark visual design.",
      "hue": 71
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-15-business-school",
      "idx": 15,
      "path": "templates/education-course/template-15-business-school/index.html",
      "brand": "Kingsbridge Business School",
      "concept": "Business School",
      "desc": "A two-page business school website template with an admissions flow, full curriculum detail, and a collegiate classic visual design.",
      "hue": 88
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-16-kids-coding-club",
      "idx": 16,
      "path": "templates/education-course/template-16-kids-coding-club/index.html",
      "brand": "PixelPals Coding Club",
      "concept": "Kids Coding Club",
      "desc": "A two-page kids coding club website template with an admissions flow, full curriculum detail, and a playful kids visual design.",
      "hue": 105
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-17-islamic-school",
      "idx": 17,
      "path": "templates/education-course/template-17-islamic-school/index.html",
      "brand": "Al-Noor Academy",
      "concept": "Islamic School",
      "desc": "A two-page islamic school website template with an admissions flow, full curriculum detail, and a collegiate classic visual design.",
      "hue": 122
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-18-vocational-training",
      "idx": 18,
      "path": "templates/education-course/template-18-vocational-training/index.html",
      "brand": "TradeWorks Institute",
      "concept": "Vocational Training",
      "desc": "A two-page vocational training website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 139
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-19-study-abroad",
      "idx": 19,
      "path": "templates/education-course/template-19-study-abroad/index.html",
      "brand": "Horizon Study Abroad",
      "concept": "Study Abroad",
      "desc": "A two-page study abroad program website template with an admissions flow, full curriculum detail, and a warm community visual design.",
      "hue": 156
    },
    {
      "cat": "education-course",
      "catLabel": "Education & Course",
      "slug": "template-20-elearning-marketplace",
      "idx": 20,
      "path": "templates/education-course/template-20-elearning-marketplace/index.html",
      "brand": "Skillwave",
      "concept": "Elearning Marketplace",
      "desc": "A two-page online course marketplace website template with an admissions flow, full curriculum detail, and a modern academy visual design.",
      "hue": 173
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-01-property-listings",
      "idx": 1,
      "path": "templates/real-estate-property/template-01-property-listings/index.html",
      "brand": "Keyline Homes",
      "concept": "Property Listings",
      "desc": "Keyline Homes is a property listings portal with live filtering, mortgage estimates and detailed listings for homes across Seattle.",
      "hue": 35
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-02-luxury-homes",
      "idx": 2,
      "path": "templates/real-estate-property/template-02-luxury-homes/index.html",
      "brand": "Belgrave Estates",
      "concept": "Luxury Homes",
      "desc": "Belgrave Estates presents an exclusive collection of luxury homes, oceanfront villas and private estates across Los Angeles and the California coast.",
      "hue": 52
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-03-apartment-complex",
      "idx": 3,
      "path": "templates/real-estate-property/template-03-apartment-complex/index.html",
      "brand": "The Aria Residences",
      "concept": "Apartment Complex",
      "desc": "The Aria Residences offers studio to 3-bedroom luxury apartments in Mission Bay, San Francisco, with a rooftop pool, fitness centre and concierge. Tour…",
      "hue": 69
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-04-real-estate-agent",
      "idx": 4,
      "path": "templates/real-estate-property/template-04-real-estate-agent/index.html",
      "brand": "Hannah Ford",
      "concept": "Real Estate Agent",
      "desc": "Hannah Ford is a five-star real estate agent helping families buy and sell homes across Chapel Hill, Durham and the North Carolina Triangle with warmth and…",
      "hue": 86
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-05-property-developer",
      "idx": 5,
      "path": "templates/real-estate-property/template-05-property-developer/index.html",
      "brand": "Northgate Developments",
      "concept": "Property Developer",
      "desc": "Northgate Developments is delivering a phased riverfront masterplan in Austin with residences, townhomes, penthouses and retail. Explore phases, floor plans…",
      "hue": 103
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-06-student-housing",
      "idx": 6,
      "path": "templates/real-estate-property/template-06-student-housing/index.html",
      "brand": "Campus Nest",
      "concept": "Student Housing",
      "desc": "Campus Nest offers studios and en-suite student rooms minutes from campus in Manchester, with all bills included, superfast Wi-Fi, gym and a brilliant…",
      "hue": 120
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-07-coliving-space",
      "idx": 7,
      "path": "templates/real-estate-property/template-07-coliving-space/index.html",
      "brand": "Commonhouse",
      "concept": "Coliving Space",
      "desc": "Commonhouse offers beautifully designed co-living rooms and studios in London with bills, cleaning and a built-in community included. Flexible monthly…",
      "hue": 137
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-08-commercial-office",
      "idx": 8,
      "path": "templates/real-estate-property/template-08-commercial-office/index.html",
      "brand": "Meridian Workspace",
      "concept": "Commercial Office",
      "desc": "Meridian Workspace leases premium office floors and suites across Chicago's Loop, River North and West Loop. Explore floor plates, amenities and estimate…",
      "hue": 154
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-09-industrial-property",
      "idx": 9,
      "path": "templates/real-estate-property/template-09-industrial-property/index.html",
      "brand": "Irongate Industrial",
      "concept": "Industrial Property",
      "desc": "Irongate Industrial leases warehouse, distribution, cold-storage and flex space across the Memphis inland port and logistics parks, with rapid highway, rail…",
      "hue": 171
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-10-land-plots",
      "idx": 10,
      "path": "templates/real-estate-property/template-10-land-plots/index.html",
      "brand": "Summit Land Co.",
      "concept": "Land Plots",
      "desc": "Summit Land Co. lists build-ready residential lots, rural acreage and commercial pads across Colorado, with clear title, utilities detail and seller…",
      "hue": 188
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-11-vacation-rentals",
      "idx": 11,
      "path": "templates/real-estate-property/template-11-vacation-rentals/index.html",
      "brand": "Azulado Stays",
      "concept": "Vacation Rentals",
      "desc": "Azulado Stays is a curated collection of beachfront villas, bungalows and sea-view rentals across Mexico's Riviera Maya, with private pools, concierge and…",
      "hue": 205
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-12-boarding-house",
      "idx": 12,
      "path": "templates/real-estate-property/template-12-boarding-house/index.html",
      "brand": "Kos Harmoni",
      "concept": "Boarding House",
      "desc": "Kos Harmoni menyediakan kamar kos ber-AC dan ekonomi yang nyaman di Kemang, Jakarta Selatan, dengan WiFi, dapur bersama, laundry, dan keamanan 24 jam. Cek…",
      "hue": 222
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-13-property-management",
      "idx": 13,
      "path": "templates/real-estate-property/template-13-property-management/index.html",
      "brand": "Anchor Property Group",
      "concept": "Property Management",
      "desc": "Anchor Property Group manages multifamily, single-family and HOA communities across Portland with tenant screening, 24/7 maintenance, online rent collection…",
      "hue": 239
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-14-mortgage-broker",
      "idx": 14,
      "path": "templates/real-estate-property/template-14-mortgage-broker/index.html",
      "brand": "Beacon Mortgages",
      "concept": "Mortgage Broker",
      "desc": "Beacon Mortgages is a whole-of-market mortgage broker comparing 90+ lenders for first-time buyers, remortgages, buy-to-let and self-employed clients. Use…",
      "hue": 256
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-15-home-staging",
      "idx": 15,
      "path": "templates/real-estate-property/template-15-home-staging/index.html",
      "brand": "Maison Reverie",
      "concept": "Home Staging",
      "desc": "Maison Reverie is a home staging studio that transforms vacant and occupied homes into photo-ready, market-leading listings across Los Angeles, helping…",
      "hue": 273
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-16-smart-residence",
      "idx": 16,
      "path": "templates/real-estate-property/template-16-smart-residence/index.html",
      "brand": "Nimbus Living",
      "concept": "Smart Residence",
      "desc": "Nimbus Living offers fully automated, net-zero smart residences in Austin with whole-home voice control, AI climate management, solar storage and 10Gb…",
      "hue": 290
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-17-retirement-village",
      "idx": 17,
      "path": "templates/real-estate-property/template-17-retirement-village/index.html",
      "brand": "Willowbrook Village",
      "concept": "Retirement Village",
      "desc": "Willowbrook Village offers independent cottages and apartments plus assisted living in the Cotswolds, with landscaped gardens, a wellness spa, restaurant…",
      "hue": 307
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-18-housing-estate",
      "idx": 18,
      "path": "templates/real-estate-property/template-18-housing-estate/index.html",
      "brand": "Maplewood Park",
      "concept": "Housing Estate",
      "desc": "Maplewood Park is a new housing estate in Reading offering energy-efficient 2–5 bedroom homes with Help to Buy, an on-site school, village green and superb…",
      "hue": 324
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-19-property-auction",
      "idx": 19,
      "path": "templates/real-estate-property/template-19-property-auction/index.html",
      "brand": "Hammerstone Auctions",
      "concept": "Property Auction",
      "desc": "Hammerstone Auctions runs transparent online property auctions in Manchester with live bidding, legal packs and 28-day completion on residential, commercial…",
      "hue": 341
    },
    {
      "cat": "real-estate-property",
      "catLabel": "Real Estate & Property",
      "slug": "template-20-tiny-houses",
      "idx": 20,
      "path": "templates/real-estate-property/template-20-tiny-houses/index.html",
      "brand": "Acorn Tiny Homes",
      "concept": "Tiny Houses",
      "desc": "Acorn Tiny Homes designs and builds custom tiny houses on wheels and foundation ADUs, delivered nationwide, with off-grid solar options. Explore models and…",
      "hue": 358
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-01-coming-soon",
      "idx": 1,
      "path": "templates/utility-pages/template-01-coming-soon/index.html",
      "brand": "Nebulift",
      "concept": "Coming Soon",
      "desc": "A full-bleed, aurora-lit coming-soon page for Nebulift, a fictional pocket-planetarium app, with a live launch countdown over an animated starfield.",
      "hue": 260
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-02-maintenance-page",
      "idx": 2,
      "path": "templates/utility-pages/template-02-maintenance-page/index.html",
      "brand": "Bolt &amp; Beam",
      "concept": "Maintenance Page",
      "desc": "A warm, centered maintenance card for Bolt &amp; Beam, a fictional hardware store, with a shimmering progress bar, a clear ETA and an email notify form.",
      "hue": 277
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-03-404-page",
      "idx": 3,
      "path": "templates/utility-pages/template-03-404-page/index.html",
      "brand": "Pagefinch",
      "concept": "404 Page",
      "desc": "A playful full-bleed 404 page for Pagefinch, a fictional notes app, starring a giant outlined 404 with a perched finch and a live link-rescue search.",
      "hue": 294
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-04-login-page",
      "idx": 4,
      "path": "templates/utility-pages/template-04-login-page/index.html",
      "brand": "Lumenstack",
      "concept": "Login Page",
      "desc": "A split-panel login page for Lumenstack, a fictional team-knowledge workspace, pairing an indigo glass showcase panel with a focused white sign-in form.",
      "hue": 311
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-05-signup-page",
      "idx": 5,
      "path": "templates/utility-pages/template-05-signup-page/index.html",
      "brand": "Fernwise",
      "concept": "Signup Page",
      "desc": "A split-panel signup page for Fernwise, a fictional plant-care companion, with a live password-strength meter beside an emerald leaf-pattern showcase.",
      "hue": 328
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-06-password-reset",
      "idx": 6,
      "path": "templates/utility-pages/template-06-password-reset/index.html",
      "brand": "Keyhaven",
      "concept": "Password Reset",
      "desc": "A calm, centered password-reset card for Keyhaven, a fictional password manager, that swaps from a request form to a check-your-inbox state with the address…",
      "hue": 345
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-07-link-in-bio",
      "idx": 7,
      "path": "templates/utility-pages/template-07-link-in-bio/index.html",
      "brand": "Riley Vox",
      "concept": "Link In Bio",
      "desc": "A glassy link-in-bio page for Riley Vox, a fictional synthwave producer, with a spinning neon avatar ring, six press-friendly link buttons and a dark/light…",
      "hue": 2
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-08-pricing-page",
      "idx": 8,
      "path": "templates/utility-pages/template-08-pricing-page/index.html",
      "brand": "Quotaflow",
      "concept": "Pricing Page",
      "desc": "A clean SaaS pricing page for Quotaflow, a fictional API-metering service, with a monthly/yearly billing switch, three tiers, a full comparison table and a…",
      "hue": 19
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-09-faq-page",
      "idx": 9,
      "path": "templates/utility-pages/template-09-faq-page/index.html",
      "brand": "Willowbox",
      "concept": "FAQ Page",
      "desc": "A friendly serif FAQ page for Willowbox, a fictional craft-box subscription, with live search that highlights matches inside a 12-question accordion plus…",
      "hue": 36
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-10-contact-page",
      "idx": 10,
      "path": "templates/utility-pages/template-10-contact-page/index.html",
      "brand": "Sunhatch Studio",
      "concept": "Contact Page",
      "desc": "A postcard-themed contact page for Sunhatch Studio, a fictional food-brand design studio, with a validated enquiry form beside info cards, a CSS map and…",
      "hue": 53
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-11-thank-you-page",
      "idx": 11,
      "path": "templates/utility-pages/template-11-thank-you-page/index.html",
      "brand": "Mintcrate",
      "concept": "Thank You Page",
      "desc": "A mint-fresh order thank-you card for Mintcrate, a fictional eco home-goods shop, with a confetti burst, copyable order number and a packed-to-delivered…",
      "hue": 70
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-12-verify-email",
      "idx": 12,
      "path": "templates/utility-pages/template-12-verify-email/index.html",
      "brand": "Vioma",
      "concept": "Verify Email",
      "desc": "An app-frame email-verification screen for Vioma, a fictional journaling app, with six auto-advancing code boxes, paste support and a cooldown-guarded…",
      "hue": 87
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-13-onboarding-steps",
      "idx": 13,
      "path": "templates/utility-pages/template-13-onboarding-steps/index.html",
      "brand": "Driftbase",
      "concept": "Onboarding Steps",
      "desc": "A four-step onboarding wizard for Driftbase, a fictional team workspace, framed in a browser-style app chrome with step dots, a progress bar and a finish state.",
      "hue": 104
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-14-privacy-terms",
      "idx": 14,
      "path": "templates/utility-pages/template-14-privacy-terms/index.html",
      "brand": "Marrow &amp; Vale",
      "concept": "Privacy Terms",
      "desc": "A long-form combined privacy policy and terms page for Marrow &amp; Vale, a fictional writing platform, with a sticky scrollspy table of contents, reading…",
      "hue": 121
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-15-status-page",
      "idx": 15,
      "path": "templates/utility-pages/template-15-status-page/index.html",
      "brand": "Northpeak",
      "concept": "Status Page",
      "desc": "A dark, terminal-flavored status page for Northpeak, a fictional cloud platform, with live service pills, 90-day uptime bars, animated metrics and an…",
      "hue": 138
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-16-app-download",
      "idx": 16,
      "path": "templates/utility-pages/template-16-app-download/index.html",
      "brand": "Voltloop",
      "concept": "App Download",
      "desc": "An app-download landing page for Voltloop, a fictional city-mobility app, with platform tabs, store buttons, an inline-SVG QR placeholder and a glowing CSS…",
      "hue": 155
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-17-unsubscribe-page",
      "idx": 17,
      "path": "templates/utility-pages/template-17-unsubscribe-page/index.html",
      "brand": "Thicket Post",
      "concept": "Unsubscribe Page",
      "desc": "A gentle unsubscribe page for the Thicket Post, a fictional newsletter, with optional reason radios, a feedback counter, lighter-cadence offers and a…",
      "hue": 172
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-18-survey-feedback",
      "idx": 18,
      "path": "templates/utility-pages/template-18-survey-feedback/index.html",
      "brand": "Bloomgauge",
      "concept": "Survey Feedback",
      "desc": "A playful feedback survey for Bloomgauge, a fictional analytics product, with an interactive star rating, an NPS range slider, topic chips, a counted…",
      "hue": 189
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-19-invoice-page",
      "idx": 19,
      "path": "templates/utility-pages/template-19-invoice-page/index.html",
      "brand": "Cobalt &amp; Quill",
      "concept": "Invoice Page",
      "desc": "A crisp, print-ready invoice for Cobalt &amp; Quill, a fictional design studio, with itemized line items, a running totals box, a status pill and copy-number…",
      "hue": 206
    },
    {
      "cat": "utility-pages",
      "catLabel": "Utility Pages",
      "slug": "template-20-digital-business-card",
      "idx": 20,
      "path": "templates/utility-pages/template-20-digital-business-card/index.html",
      "brand": "Atlas Vey",
      "concept": "Digital Business Card",
      "desc": "A premium digital business card for Atlas Vey, a fictional product designer, with tap-to-copy contact details, a downloadable vCard, a QR placeholder, share…",
      "hue": 223
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-01-animal-shelter",
      "idx": 1,
      "path": "templates/nonprofit-charity/template-01-animal-shelter/index.html",
      "brand": "Brightpaw Haven",
      "concept": "Animal Shelter",
      "desc": "Brightpaw Haven is a warm trust, multi-page animal rescue charity template with a full donation widget, count-up impact stats and four complete, interlinked…",
      "hue": 110
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-02-environmental-ngo",
      "idx": 2,
      "path": "templates/nonprofit-charity/template-02-environmental-ngo/index.html",
      "brand": "Verdant Earth Alliance",
      "concept": "Environmental NGO",
      "desc": "Verdant Earth Alliance is a bold activist, multi-page environmental action charity template with a full donation widget, count-up impact stats and four…",
      "hue": 127
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-03-disaster-relief",
      "idx": 3,
      "path": "templates/nonprofit-charity/template-03-disaster-relief/index.html",
      "brand": "RapidAid Response",
      "concept": "Disaster Relief",
      "desc": "RapidAid Response is a bold activist, multi-page disaster relief charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 144
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-04-childrens-foundation",
      "idx": 4,
      "path": "templates/nonprofit-charity/template-04-childrens-foundation/index.html",
      "brand": "Little Lanterns Foundation",
      "concept": "Childrens Foundation",
      "desc": "Little Lanterns Foundation is a vibrant community, multi-page child welfare charity template with a full donation widget, count-up impact stats and four…",
      "hue": 161
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-05-food-bank",
      "idx": 5,
      "path": "templates/nonprofit-charity/template-05-food-bank/index.html",
      "brand": "Open Table Network",
      "concept": "Food Bank",
      "desc": "Open Table Network is a warm trust, multi-page hunger relief charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 178
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-06-medical-charity",
      "idx": 6,
      "path": "templates/nonprofit-charity/template-06-medical-charity/index.html",
      "brand": "Mercy Lines Health",
      "concept": "Medical Charity",
      "desc": "Mercy Lines Health is a elegant foundation, multi-page global health charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 195
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-07-education-fund",
      "idx": 7,
      "path": "templates/nonprofit-charity/template-07-education-fund/index.html",
      "brand": "Stepping Stones Fund",
      "concept": "Education Fund",
      "desc": "Stepping Stones Fund is a calm editorial, multi-page education access charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 212
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-08-homeless-shelter",
      "idx": 8,
      "path": "templates/nonprofit-charity/template-08-homeless-shelter/index.html",
      "brand": "Safe Harbour Trust",
      "concept": "Homeless Shelter",
      "desc": "Safe Harbour Trust is a warm trust, multi-page homelessness charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 229
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-09-church",
      "idx": 9,
      "path": "templates/nonprofit-charity/template-09-church/index.html",
      "brand": "Grace Hill Community Church",
      "concept": "Church",
      "desc": "Grace Hill Community Church is a elegant foundation, multi-page faith &amp; community charity template with a full donation widget, count-up impact stats and…",
      "hue": 246
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-10-mosque-foundation",
      "idx": 10,
      "path": "templates/nonprofit-charity/template-10-mosque-foundation/index.html",
      "brand": "Al-Noor Charitable Foundation",
      "concept": "Mosque Foundation",
      "desc": "Al-Noor Charitable Foundation is a elegant foundation, multi-page faith &amp; charity charity template with a full donation widget, count-up impact stats and…",
      "hue": 263
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-11-wildlife-conservation",
      "idx": 11,
      "path": "templates/nonprofit-charity/template-11-wildlife-conservation/index.html",
      "brand": "Wildmark Conservancy",
      "concept": "Wildlife Conservation",
      "desc": "Wildmark Conservancy is a calm editorial, multi-page wildlife conservation charity template with a full donation widget, count-up impact stats and four…",
      "hue": 280
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-12-mental-health-nonprofit",
      "idx": 12,
      "path": "templates/nonprofit-charity/template-12-mental-health-nonprofit/index.html",
      "brand": "Stillwater Minds",
      "concept": "Mental Health Nonprofit",
      "desc": "Stillwater Minds is a calm editorial, multi-page mental health charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 297
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-13-arts-foundation",
      "idx": 13,
      "path": "templates/nonprofit-charity/template-13-arts-foundation/index.html",
      "brand": "Chroma Arts Foundation",
      "concept": "Arts Foundation",
      "desc": "Chroma Arts Foundation is a vibrant community, multi-page arts access charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 314
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-14-community-foundation",
      "idx": 14,
      "path": "templates/nonprofit-charity/template-14-community-foundation/index.html",
      "brand": "Common Ground Foundation",
      "concept": "Community Foundation",
      "desc": "Common Ground Foundation is a warm trust, multi-page community giving charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 331
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-15-human-rights-org",
      "idx": 15,
      "path": "templates/nonprofit-charity/template-15-human-rights-org/index.html",
      "brand": "Equal Voice Initiative",
      "concept": "Human Rights Org",
      "desc": "Equal Voice Initiative is a bold activist, multi-page human rights charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 348
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-16-clean-water-charity",
      "idx": 16,
      "path": "templates/nonprofit-charity/template-16-clean-water-charity/index.html",
      "brand": "WellSpring Water Project",
      "concept": "Clean Water Charity",
      "desc": "WellSpring Water Project is a warm trust, multi-page clean water charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 5
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-17-refugee-support",
      "idx": 17,
      "path": "templates/nonprofit-charity/template-17-refugee-support/index.html",
      "brand": "Crossroads Welcome",
      "concept": "Refugee Support",
      "desc": "Crossroads Welcome is a bold activist, multi-page refugee support charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 22
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-18-elderly-care-charity",
      "idx": 18,
      "path": "templates/nonprofit-charity/template-18-elderly-care-charity/index.html",
      "brand": "Evergreen Companions",
      "concept": "Elderly Care Charity",
      "desc": "Evergreen Companions is a elegant foundation, multi-page elderly care charity template with a full donation widget, count-up impact stats and four complete,…",
      "hue": 39
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-19-cancer-research-fund",
      "idx": 19,
      "path": "templates/nonprofit-charity/template-19-cancer-research-fund/index.html",
      "brand": "Brave Cells Research Fund",
      "concept": "Cancer Research Fund",
      "desc": "Brave Cells Research Fund is a calm editorial, multi-page cancer research charity template with a full donation widget, count-up impact stats and four…",
      "hue": 56
    },
    {
      "cat": "nonprofit-charity",
      "catLabel": "Nonprofit & Charity",
      "slug": "template-20-youth-empowerment",
      "idx": 20,
      "path": "templates/nonprofit-charity/template-20-youth-empowerment/index.html",
      "brand": "Ignite Youth Collective",
      "concept": "Youth Empowerment",
      "desc": "Ignite Youth Collective is a vibrant community, multi-page youth empowerment charity template with a full donation widget, count-up impact stats and four…",
      "hue": 73
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-01-car-dealership",
      "idx": 1,
      "path": "templates/automotive/template-01-car-dealership/index.html",
      "brand": "Driveline Motors",
      "concept": "Car Dealership",
      "desc": "A full-service new-car dealership template with live inventory filtering, finance estimates and detailed vehicle pages.",
      "hue": 215
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-02-used-cars",
      "idx": 2,
      "path": "templates/automotive/template-02-used-cars/index.html",
      "brand": "HonestWheel Used Cars",
      "concept": "Used Cars",
      "desc": "A trusted pre-owned car lot template with a searchable used inventory, affordability calculator and full vehicle detail pages.",
      "hue": 232
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-03-ev-brand",
      "idx": 3,
      "path": "templates/automotive/template-03-ev-brand/index.html",
      "brand": "Voltaic EV",
      "concept": "EV Brand",
      "desc": "A minimal modern electric-vehicle brand template with a model line-up, range specs, finance calculator and configurable detail pages.",
      "hue": 249
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-04-car-rental",
      "idx": 4,
      "path": "templates/automotive/template-04-car-rental/index.html",
      "brand": "RoadReady Rentals",
      "concept": "Car Rental",
      "desc": "A booking-forward car rental template with a fleet grid, daily/weekly rate compare and reservation-ready vehicle pages.",
      "hue": 266
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-05-auto-repair",
      "idx": 5,
      "path": "templates/automotive/template-05-auto-repair/index.html",
      "brand": "ProGear Auto Repair",
      "concept": "Auto Repair",
      "desc": "A practical auto-repair garage template with a grouped service menu, online booking widget, pricing packages and an FAQ.",
      "hue": 283
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-06-car-wash",
      "idx": 6,
      "path": "templates/automotive/template-06-car-wash/index.html",
      "brand": "AquaShine Car Wash",
      "concept": "Car Wash",
      "desc": "A bright car-wash template with wash packages, a quick booking widget, membership pricing and a clear FAQ.",
      "hue": 300
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-07-motorcycle-dealer",
      "idx": 7,
      "path": "templates/automotive/template-07-motorcycle-dealer/index.html",
      "brand": "IronCrest Motorcycles",
      "concept": "Motorcycle Dealer",
      "desc": "A high-energy motorcycle dealership template with a bike inventory, spec filters, finance estimates and full detail pages.",
      "hue": 317
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-08-luxury-cars",
      "idx": 8,
      "path": "templates/automotive/template-08-luxury-cars/index.html",
      "brand": "Aurelis Luxury Cars",
      "concept": "Luxury Cars",
      "desc": "A sleek dark-showroom template for luxury and exotic cars with a curated collection, finance calculator and immersive detail pages.",
      "hue": 334
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-09-tire-shop",
      "idx": 9,
      "path": "templates/automotive/template-09-tire-shop/index.html",
      "brand": "GripPoint Tire Centre",
      "concept": "Tire Shop",
      "desc": "A utility tire-shop template with a tire-and-fitting service menu, fast booking widget, fitment packages and FAQ.",
      "hue": 351
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-10-auto-parts-store",
      "idx": 10,
      "path": "templates/automotive/template-10-auto-parts-store/index.html",
      "brand": "PartHub Auto Parts",
      "concept": "Auto Parts Store",
      "desc": "An auto-parts retail template with a filterable parts catalogue, add-to-quote toast and clean product browsing.",
      "hue": 8
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-11-car-detailing",
      "idx": 11,
      "path": "templates/automotive/template-11-car-detailing/index.html",
      "brand": "MirrorFinish Detailing",
      "concept": "Car Detailing",
      "desc": "A premium detailing-studio template with detailing packages, a booking widget, tiered pricing and an FAQ accordion.",
      "hue": 25
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-12-classic-cars",
      "idx": 12,
      "path": "templates/automotive/template-12-classic-cars/index.html",
      "brand": "Heritage Classic Cars",
      "concept": "Classic Cars",
      "desc": "An elegant classic-car dealership template with a curated vintage collection, finance estimates and richly detailed listings.",
      "hue": 42
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-13-truck-dealer",
      "idx": 13,
      "path": "templates/automotive/template-13-truck-dealer/index.html",
      "brand": "HaulMax Trucks",
      "concept": "Truck Dealer",
      "desc": "A workhorse truck-dealership template with a heavy-duty inventory, payload filters, finance calculator and full spec pages.",
      "hue": 59
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-14-auto-insurance",
      "idx": 14,
      "path": "templates/automotive/template-14-auto-insurance/index.html",
      "brand": "SafeLane Auto Insurance",
      "concept": "Auto Insurance",
      "desc": "A reassuring auto-insurance template with coverage plans, an instant quote widget, transparent pricing and an FAQ.",
      "hue": 76
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-15-fleet-leasing",
      "idx": 15,
      "path": "templates/automotive/template-15-fleet-leasing/index.html",
      "brand": "FleetForge Leasing",
      "concept": "Fleet Leasing",
      "desc": "A B2B fleet-leasing template with a vehicle catalogue, monthly-rate compare and lease-ready vehicle pages.",
      "hue": 93
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-16-car-auction",
      "idx": 16,
      "path": "templates/automotive/template-16-car-auction/index.html",
      "brand": "BidLane Car Auctions",
      "concept": "Car Auction",
      "desc": "An energetic car-auction template with a live lot grid, bid filters, buyer finance estimates and full lot detail pages.",
      "hue": 110
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-17-dealership-group",
      "idx": 17,
      "path": "templates/automotive/template-17-dealership-group/index.html",
      "brand": "Northgate Auto Group",
      "concept": "Dealership Group",
      "desc": "A multi-brand dealership-group template with a combined inventory across franchises, finance tools and detailed vehicle pages.",
      "hue": 127
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-18-charging-network",
      "idx": 18,
      "path": "templates/automotive/template-18-charging-network/index.html",
      "brand": "VoltGrid Charging",
      "concept": "Charging Network",
      "desc": "An EV charging-network template with charging plans, a station-access booking widget, membership pricing and an FAQ.",
      "hue": 144
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-19-car-subscription",
      "idx": 19,
      "path": "templates/automotive/template-19-car-subscription/index.html",
      "brand": "Switchr Car Subscription",
      "concept": "Car Subscription",
      "desc": "A flexible car-subscription template with a swap-anytime vehicle catalogue, monthly-plan compare and subscribe-ready pages.",
      "hue": 161
    },
    {
      "cat": "automotive",
      "catLabel": "Automotive",
      "slug": "template-20-auto-finance",
      "idx": 20,
      "path": "templates/automotive/template-20-auto-finance/index.html",
      "brand": "ClearDrive Auto Finance",
      "concept": "Auto Finance",
      "desc": "An auto-finance template with loan products, an instant pre-qualification quote widget, rate tiers and an FAQ.",
      "hue": 178
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-01-hair-salon",
      "idx": 1,
      "path": "templates/beauty-salon/template-01-hair-salon/index.html",
      "brand": "Maison Lumière",
      "concept": "Hair Salon",
      "desc": "A refined hair house where precision cutting and luminous colour meet calm, unhurried care.",
      "hue": 320
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-02-barbershop",
      "idx": 2,
      "path": "templates/beauty-salon/template-02-barbershop/index.html",
      "brand": "Ironclad &amp; Co.",
      "concept": "Barbershop",
      "desc": "A traditional barbershop for the modern man — sharp cuts, hot-towel shaves and zero fuss.",
      "hue": 337
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-03-nail-salon",
      "idx": 3,
      "path": "templates/beauty-salon/template-03-nail-salon/index.html",
      "brand": "Petal &amp; Polish",
      "concept": "Nail Salon",
      "desc": "A bright, joyful nail studio for manicures, pedicures and nail art that makes you smile.",
      "hue": 354
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-04-makeup-artist",
      "idx": 4,
      "path": "templates/beauty-salon/template-04-makeup-artist/index.html",
      "brand": "Noir Atelier",
      "concept": "Makeup Artist",
      "desc": "An editorial makeup studio creating bold, camera-ready looks for events, shoots and the spotlight.",
      "hue": 11
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-05-lash-brow-studio",
      "idx": 5,
      "path": "templates/beauty-salon/template-05-lash-brow-studio/index.html",
      "brand": "Wink &amp; Arch",
      "concept": "Lash Brow Studio",
      "desc": "A friendly lash and brow studio shaping eyes that wake up gorgeous, every single morning.",
      "hue": 28
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-06-day-spa",
      "idx": 6,
      "path": "templates/beauty-salon/template-06-day-spa/index.html",
      "brand": "Stillwater Spa",
      "concept": "Day Spa",
      "desc": "An urban day spa offering massage, facials and thermal rituals for deep, restorative calm.",
      "hue": 45
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-07-tanning-studio",
      "idx": 7,
      "path": "templates/beauty-salon/template-07-tanning-studio/index.html",
      "brand": "Goldenhour Studio",
      "concept": "Tanning Studio",
      "desc": "A modern tanning studio for flawless, streak-free glows — spray, sunbed and self-tan, done right.",
      "hue": 62
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-08-waxing-salon",
      "idx": 8,
      "path": "templates/beauty-salon/template-08-waxing-salon/index.html",
      "brand": "Smooth Society",
      "concept": "Waxing Salon",
      "desc": "A welcoming waxing salon delivering fast, gentle, fuss-free smoothness for everyone.",
      "hue": 79
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-09-skincare-clinic",
      "idx": 9,
      "path": "templates/beauty-salon/template-09-skincare-clinic/index.html",
      "brand": "Lumen Skin Clinic",
      "concept": "Skincare Clinic",
      "desc": "A results-driven skincare clinic offering advanced facials and medical-grade treatments.",
      "hue": 96
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-10-massage-therapy",
      "idx": 10,
      "path": "templates/beauty-salon/template-10-massage-therapy/index.html",
      "brand": "Wellspring Bodywork",
      "concept": "Massage Therapy",
      "desc": "A therapeutic massage practice easing pain, tension and stress with skilled, focused bodywork.",
      "hue": 113
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-11-beauty-academy",
      "idx": 11,
      "path": "templates/beauty-salon/template-11-beauty-academy/index.html",
      "brand": "Atelier Beauty Academy",
      "concept": "Beauty Academy",
      "desc": "An accredited beauty academy training the next generation of stylists, therapists and artists.",
      "hue": 130
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-12-bridal-makeup",
      "idx": 12,
      "path": "templates/beauty-salon/template-12-bridal-makeup/index.html",
      "brand": "Veil &amp; Vow",
      "concept": "Bridal Makeup",
      "desc": "A bridal beauty studio creating timeless, luminous looks for your wedding morning and beyond.",
      "hue": 147
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-13-mens-grooming",
      "idx": 13,
      "path": "templates/beauty-salon/template-13-mens-grooming/index.html",
      "brand": "Forge Grooming Lounge",
      "concept": "Mens Grooming",
      "desc": "A premium men's grooming lounge for cuts, shaves, skincare and a proper drink in hand.",
      "hue": 164
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-14-eyelash-extensions",
      "idx": 14,
      "path": "templates/beauty-salon/template-14-eyelash-extensions/index.html",
      "brand": "Featherlight Lash Lab",
      "concept": "Eyelash Extensions",
      "desc": "A dedicated lash lab crafting weightless, custom extensions for fuller, fluttery eyes.",
      "hue": 181
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-15-microblading-studio",
      "idx": 15,
      "path": "templates/beauty-salon/template-15-microblading-studio/index.html",
      "brand": "Ink &amp; Arch Studio",
      "concept": "Microblading Studio",
      "desc": "A specialist permanent makeup studio crafting natural, hair-stroke brows that last for years.",
      "hue": 198
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-16-tattoo-studio",
      "idx": 16,
      "path": "templates/beauty-salon/template-16-tattoo-studio/index.html",
      "brand": "Black Lantern Tattoo",
      "concept": "Tattoo Studio",
      "desc": "A custom tattoo studio where resident artists turn your ideas into bold, lasting work.",
      "hue": 215
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-17-piercing-studio",
      "idx": 17,
      "path": "templates/beauty-salon/template-17-piercing-studio/index.html",
      "brand": "Lobe &amp; Co. Piercing",
      "concept": "Piercing Studio",
      "desc": "A bright, safe piercing studio with curated jewellery and gentle, expert piercers.",
      "hue": 232
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-18-perfume-boutique",
      "idx": 18,
      "path": "templates/beauty-salon/template-18-perfume-boutique/index.html",
      "brand": "Maison de Sève",
      "concept": "Perfume Boutique",
      "desc": "A niche fragrance house offering bespoke scent consultations and rare, artisan perfumes.",
      "hue": 249
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-19-hair-removal-clinic",
      "idx": 19,
      "path": "templates/beauty-salon/template-19-hair-removal-clinic/index.html",
      "brand": "Lumina Laser Clinic",
      "concept": "Hair Removal Clinic",
      "desc": "A modern laser hair removal clinic offering safe, lasting smoothness for every skin tone.",
      "hue": 266
    },
    {
      "cat": "beauty-salon",
      "catLabel": "Beauty & Salon",
      "slug": "template-20-beauty-influencer",
      "idx": 20,
      "path": "templates/beauty-salon/template-20-beauty-influencer/index.html",
      "brand": "Glow with Remi",
      "concept": "Beauty Influencer",
      "desc": "The personal brand of a beauty creator — tutorials, collaborations, masterclasses and one-to-one glow sessions.",
      "hue": 283
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-01-retail-bank",
      "idx": 1,
      "path": "templates/finance-banking/template-01-retail-bank/index.html",
      "brand": "Northcliff Bank",
      "concept": "Retail Bank",
      "desc": "Personal and business banking with branches you can walk into and people who answer.",
      "hue": 210
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-02-digital-bank",
      "idx": 2,
      "path": "templates/finance-banking/template-02-digital-bank/index.html",
      "brand": "Lumio",
      "concept": "Digital Bank",
      "desc": "The app-first account with instant transfers, multi-currency wallets and zero hidden fees.",
      "hue": 227
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-03-investment-firm",
      "idx": 3,
      "path": "templates/finance-banking/template-03-investment-firm/index.html",
      "brand": "Halberd Capital",
      "concept": "Investment Firm",
      "desc": "A research-led investment firm building durable, diversified portfolios for the long term.",
      "hue": 244
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-04-crypto-exchange",
      "idx": 4,
      "path": "templates/finance-banking/template-04-crypto-exchange/index.html",
      "brand": "Voltcoin",
      "concept": "Crypto Exchange",
      "desc": "A high-performance crypto exchange with deep liquidity, staking rewards and institutional-grade custody.",
      "hue": 261
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-05-insurance-broker",
      "idx": 5,
      "path": "templates/finance-banking/template-05-insurance-broker/index.html",
      "brand": "Safeharbor Brokers",
      "concept": "Insurance Broker",
      "desc": "Independent insurance broking that shops 40+ carriers to match you with the right cover and price.",
      "hue": 278
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-06-accounting-firm",
      "idx": 6,
      "path": "templates/finance-banking/template-06-accounting-firm/index.html",
      "brand": "Ledgerwood &amp; Co.",
      "concept": "Accounting Firm",
      "desc": "A chartered accounting practice handling tax, books and advisory so owners can focus on growth.",
      "hue": 295
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-07-tax-service",
      "idx": 7,
      "path": "templates/finance-banking/template-07-tax-service/index.html",
      "brand": "BrightReturn",
      "concept": "Tax Service",
      "desc": "Friendly, flat-fee tax filing with real experts who chase every credit and deduction.",
      "hue": 312
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-08-lending-platform",
      "idx": 8,
      "path": "templates/finance-banking/template-08-lending-platform/index.html",
      "brand": "Kindle Lending",
      "concept": "Lending Platform",
      "desc": "An online lending platform offering fair, fast personal and business loans with no hidden fees.",
      "hue": 329
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-09-wealth-management",
      "idx": 9,
      "path": "templates/finance-banking/template-09-wealth-management/index.html",
      "brand": "Sterling Crest",
      "concept": "Wealth Management",
      "desc": "Holistic private wealth management uniting investments, planning, tax and legacy under one advisor.",
      "hue": 346
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-10-trading-platform",
      "idx": 10,
      "path": "templates/finance-banking/template-10-trading-platform/index.html",
      "brand": "Apexline",
      "concept": "Trading Platform",
      "desc": "A multi-asset trading platform with commission-free stocks, deep tools and millisecond execution.",
      "hue": 3
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-11-payment-gateway",
      "idx": 11,
      "path": "templates/finance-banking/template-11-payment-gateway/index.html",
      "brand": "PayArc",
      "concept": "Payment Gateway",
      "desc": "A developer-first payment gateway: one integration for cards, wallets and bank payments worldwide.",
      "hue": 20
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-12-financial-advisor",
      "idx": 12,
      "path": "templates/finance-banking/template-12-financial-advisor/index.html",
      "brand": "Truenorth Advisory",
      "concept": "Financial Advisor",
      "desc": "Fee-only, fiduciary financial planning that puts your goals — not commissions — at the centre.",
      "hue": 37
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-13-credit-union",
      "idx": 13,
      "path": "templates/finance-banking/template-13-credit-union/index.html",
      "brand": "Riverstone Credit Union",
      "concept": "Credit Union",
      "desc": "A member-owned, not-for-profit credit union returning profits as better rates and lower fees.",
      "hue": 54
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-14-mortgage-lender",
      "idx": 14,
      "path": "templates/finance-banking/template-14-mortgage-lender/index.html",
      "brand": "Cornerstone Mortgage",
      "concept": "Mortgage Lender",
      "desc": "A residential mortgage lender making home loans clear and fast, with a real loan officer at your side.",
      "hue": 71
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-15-fintech-app",
      "idx": 15,
      "path": "templates/finance-banking/template-15-fintech-app/index.html",
      "brand": "Finch",
      "concept": "Fintech App",
      "desc": "One delightful money app to spend, save, invest and send — with smart automation that grows your balance.",
      "hue": 88
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-16-stock-brokerage",
      "idx": 16,
      "path": "templates/finance-banking/template-16-stock-brokerage/index.html",
      "brand": "Tickr",
      "concept": "Stock Brokerage",
      "desc": "A commission-free stock brokerage with fractional shares, real-time data and pro-grade tools.",
      "hue": 105
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-17-budgeting-tool",
      "idx": 17,
      "path": "templates/finance-banking/template-17-budgeting-tool/index.html",
      "brand": "Pennywise",
      "concept": "Budgeting Tool",
      "desc": "A friendly budgeting app that tracks spending, builds budgets and helps you reach every savings goal.",
      "hue": 122
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-18-pension-fund",
      "idx": 18,
      "path": "templates/finance-banking/template-18-pension-fund/index.html",
      "brand": "Evergreen Pension",
      "concept": "Pension Fund",
      "desc": "A workplace pension fund stewarding members' retirement savings with long-horizon prudence.",
      "hue": 139
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-19-venture-capital",
      "idx": 19,
      "path": "templates/finance-banking/template-19-venture-capital/index.html",
      "brand": "Northwind Ventures",
      "concept": "Venture Capital",
      "desc": "An early-stage venture firm backing bold founders with first cheques and hands-on partnership.",
      "hue": 156
    },
    {
      "cat": "finance-banking",
      "catLabel": "Finance & Banking",
      "slug": "template-20-microfinance",
      "idx": 20,
      "path": "templates/finance-banking/template-20-microfinance/index.html",
      "brand": "UpliftMicro",
      "concept": "Microfinance",
      "desc": "A community microfinance institution offering fair micro-loans, savings and training to underserved entrepreneurs.",
      "hue": 173
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-01-rock-band",
      "idx": 1,
      "path": "templates/music-entertainment/template-01-rock-band/index.html",
      "brand": "Voltage Hollow",
      "concept": "Rock Band",
      "desc": "Voltage Hollow is a full multi-page rock band website template in the 'dark stage' style (V1), with a fake audio player, a filterable tour dates listing and…",
      "hue": 280
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-02-solo-musician",
      "idx": 2,
      "path": "templates/music-entertainment/template-02-solo-musician/index.html",
      "brand": "Cassia Vale",
      "concept": "Solo Musician",
      "desc": "Cassia Vale is a full multi-page solo musician website template in the 'editorial artist' style (V5), with a fake audio player, a filterable live shows…",
      "hue": 297
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-03-dj-artist",
      "idx": 3,
      "path": "templates/music-entertainment/template-03-dj-artist/index.html",
      "brand": "NOVA SAGE",
      "concept": "DJ Artist",
      "desc": "NOVA SAGE is a full multi-page dj / electronic artist website template in the 'dark stage' style (V1), with a fake audio player, a filterable show dates…",
      "hue": 314
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-04-record-label",
      "idx": 4,
      "path": "templates/music-entertainment/template-04-record-label/index.html",
      "brand": "Goldgroove Records",
      "concept": "Record Label",
      "desc": "Goldgroove Records is a full multi-page record label website template in the 'vinyl retro' style (V2), with a fake audio player, a filterable releases &amp;…",
      "hue": 331
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-05-music-venue",
      "idx": 5,
      "path": "templates/music-entertainment/template-05-music-venue/index.html",
      "brand": "The Iron Owl",
      "concept": "Music Venue",
      "desc": "The Iron Owl is a full multi-page music venue website template in the 'dark stage' style (V1), with a fake audio player, a filterable what's on listing and…",
      "hue": 348
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-06-recording-studio",
      "idx": 6,
      "path": "templates/music-entertainment/template-06-recording-studio/index.html",
      "brand": "Northlight Studios",
      "concept": "Recording Studio",
      "desc": "Northlight Studios is a full multi-page recording studio website template in the 'editorial artist' style (V5), with a fake audio player, a filterable…",
      "hue": 5
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-07-music-producer",
      "idx": 7,
      "path": "templates/music-entertainment/template-07-music-producer/index.html",
      "brand": "KOZA",
      "concept": "Music Producer",
      "desc": "KOZA is a full multi-page music producer website template in the 'dark stage' style (V1), with a fake audio player, a filterable sessions listing and four…",
      "hue": 22
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-08-choir-ensemble",
      "idx": 8,
      "path": "templates/music-entertainment/template-08-choir-ensemble/index.html",
      "brand": "The Aurelian Choir",
      "concept": "Choir Ensemble",
      "desc": "The Aurelian Choir is a full multi-page choir &amp; vocal ensemble website template in the 'elegant classical' style (V3), with a fake audio player, a…",
      "hue": 39
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-09-orchestra",
      "idx": 9,
      "path": "templates/music-entertainment/template-09-orchestra/index.html",
      "brand": "Meridian Symphony",
      "concept": "Orchestra",
      "desc": "Meridian Symphony is a full multi-page symphony orchestra website template in the 'elegant classical' style (V3), with a fake audio player, a filterable the…",
      "hue": 56
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-10-nightclub",
      "idx": 10,
      "path": "templates/music-entertainment/template-10-nightclub/index.html",
      "brand": "Pulse Avenue",
      "concept": "Nightclub",
      "desc": "Pulse Avenue is a full multi-page nightclub website template in the 'vibrant club' style (V4), with a fake audio player, a filterable what's on listing and…",
      "hue": 73
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-11-comedy-club",
      "idx": 11,
      "path": "templates/music-entertainment/template-11-comedy-club/index.html",
      "brand": "The Laughing Crow",
      "concept": "Comedy Club",
      "desc": "The Laughing Crow is a full multi-page comedy club website template in the 'elegant classical' style (V3), with a fake audio player, a filterable what's on…",
      "hue": 90
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-12-theater-company",
      "idx": 12,
      "path": "templates/music-entertainment/template-12-theater-company/index.html",
      "brand": "The Saltbridge Players",
      "concept": "Theater Company",
      "desc": "The Saltbridge Players is a full multi-page theater company website template in the 'elegant classical' style (V3), with a fake audio player, a filterable…",
      "hue": 107
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-13-dance-crew",
      "idx": 13,
      "path": "templates/music-entertainment/template-13-dance-crew/index.html",
      "brand": "Kinetic Mob",
      "concept": "Dance Crew",
      "desc": "Kinetic Mob is a full multi-page dance crew website template in the 'vibrant club' style (V4), with a fake audio player, a filterable shows &amp; battles…",
      "hue": 124
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-14-talent-agency",
      "idx": 14,
      "path": "templates/music-entertainment/template-14-talent-agency/index.html",
      "brand": "Lantern Talent",
      "concept": "Talent Agency",
      "desc": "Lantern Talent is a full multi-page talent agency website template in the 'editorial artist' style (V5), with a fake audio player, a filterable roster dates…",
      "hue": 141
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-15-streaming-artist",
      "idx": 15,
      "path": "templates/music-entertainment/template-15-streaming-artist/index.html",
      "brand": "LUMA WAVE",
      "concept": "Streaming Artist",
      "desc": "LUMA WAVE is a full multi-page streaming artist / creator website template in the 'vibrant club' style (V4), with a fake audio player, a filterable stream…",
      "hue": 158
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-16-concert-promoter",
      "idx": 16,
      "path": "templates/music-entertainment/template-16-concert-promoter/index.html",
      "brand": "Highrise Live",
      "concept": "Concert Promoter",
      "desc": "Highrise Live is a full multi-page concert promoter website template in the 'editorial artist' style (V5), with a fake audio player, a filterable upcoming…",
      "hue": 175
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-17-radio-station",
      "idx": 17,
      "path": "templates/music-entertainment/template-17-radio-station/index.html",
      "brand": "Bywater 98.3",
      "concept": "Radio Station",
      "desc": "Bywater 98.3 is a full multi-page radio station website template in the 'vinyl retro' style (V2), with a fake audio player, a filterable schedule &amp; events…",
      "hue": 192
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-18-karaoke-bar",
      "idx": 18,
      "path": "templates/music-entertainment/template-18-karaoke-bar/index.html",
      "brand": "Goldenote Karaoke",
      "concept": "Karaoke Bar",
      "desc": "Goldenote Karaoke is a full multi-page karaoke bar website template in the 'vinyl retro' style (V2), with a fake audio player, a filterable what's on…",
      "hue": 209
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-19-event-production",
      "idx": 19,
      "path": "templates/music-entertainment/template-19-event-production/index.html",
      "brand": "Apex Stage Co.",
      "concept": "Event Production",
      "desc": "Apex Stage Co. is a full multi-page event production company website template in the 'vibrant club' style (V4), with a fake audio player, a filterable…",
      "hue": 226
    },
    {
      "cat": "music-entertainment",
      "catLabel": "Music & Entertainment",
      "slug": "template-20-tribute-act",
      "idx": 20,
      "path": "templates/music-entertainment/template-20-tribute-act/index.html",
      "brand": "Rumours of Fleetwood",
      "concept": "Tribute Act",
      "desc": "Rumours of Fleetwood is a full multi-page tribute act website template in the 'vinyl retro' style (V2), with a fake audio player, a filterable tour dates…",
      "hue": 243
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-01-organic-farm",
      "idx": 1,
      "path": "templates/agriculture-farming/template-01-organic-farm/index.html",
      "brand": "Harvest Hollow",
      "concept": "Organic Farm",
      "desc": "A family-run organic farm template with a seasonal produce shop, CSA box subscription and a heartfelt farm story.",
      "hue": 95
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-02-vineyard-winery",
      "idx": 2,
      "path": "templates/agriculture-farming/template-02-vineyard-winery/index.html",
      "brand": "Stonecrest Vineyards",
      "concept": "Vineyard Winery",
      "desc": "A refined estate-winery template with a wine collection, tasting reservations and a vineyard heritage story.",
      "hue": 112
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-03-dairy-farm",
      "idx": 3,
      "path": "templates/agriculture-farming/template-03-dairy-farm/index.html",
      "brand": "Clover Meadow Dairy",
      "concept": "Dairy Farm",
      "desc": "A wholesome dairy-farm creamery template with a fresh-dairy shop, doorstep milk round and a grass-to-glass story.",
      "hue": 129
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-04-livestock-ranch",
      "idx": 4,
      "path": "templates/agriculture-farming/template-04-livestock-ranch/index.html",
      "brand": "Iron Ridge Ranch",
      "concept": "Livestock Ranch",
      "desc": "A rugged livestock-ranch template with a pasture-raised meat shop, bulk-box ordering and a four-generation ranch story.",
      "hue": 146
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-05-agritech",
      "idx": 5,
      "path": "templates/agriculture-farming/template-05-agritech/index.html",
      "brand": "FieldSignal",
      "concept": "Agritech",
      "desc": "A modern agritech platform template with a solutions catalog, ROI calculator and a precision-farming product story.",
      "hue": 163
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-06-hydroponics-greenhouse",
      "idx": 6,
      "path": "templates/agriculture-farming/template-06-hydroponics-greenhouse/index.html",
      "brand": "VertiGrove Farms",
      "concept": "Hydroponics Greenhouse",
      "desc": "A high-tech hydroponic-greenhouse template with a living-greens shop, weekly harvest subscription and a controlled-environment story.",
      "hue": 180
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-07-fishery-aquaculture",
      "idx": 7,
      "path": "templates/agriculture-farming/template-07-fishery-aquaculture/index.html",
      "brand": "Tidewell Aquafarm",
      "concept": "Fishery Aquaculture",
      "desc": "A modern aquaculture template with a fresh-catch shelf, restaurant wholesale ordering and an ocean-stewardship story.",
      "hue": 197
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-08-beekeeping-honey",
      "idx": 8,
      "path": "templates/agriculture-farming/template-08-beekeeping-honey/index.html",
      "brand": "Goldencomb Apiary",
      "concept": "Beekeeping Honey",
      "desc": "A refined apiary template with a raw-honey larder, honey-club subscription and a story rooted in generations of beekeeping.",
      "hue": 214
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-09-coffee-plantation",
      "idx": 9,
      "path": "templates/agriculture-farming/template-09-coffee-plantation/index.html",
      "brand": "Misty Slopes Estate",
      "concept": "Coffee Plantation",
      "desc": "A premium coffee-estate template with a single-origin roast catalogue, subscription and a high-altitude plantation story.",
      "hue": 231
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-10-fruit-orchard",
      "idx": 10,
      "path": "templates/agriculture-farming/template-10-fruit-orchard/index.html",
      "brand": "Brightboughs Orchard",
      "concept": "Fruit Orchard",
      "desc": "A bright fruit-orchard template with a seasonal fruit stand, pick-your-own info and a blossom-to-harvest orchard story.",
      "hue": 248
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-11-vegetable-farm",
      "idx": 11,
      "path": "templates/agriculture-farming/template-11-vegetable-farm/index.html",
      "brand": "Furrow &amp; Field",
      "concept": "Vegetable Farm",
      "desc": "A hearty market-garden template with a seasonal veg shop, weekly veg-box CSA and a no-dig, soil-first story.",
      "hue": 265
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-12-poultry-farm",
      "idx": 12,
      "path": "templates/agriculture-farming/template-12-poultry-farm/index.html",
      "brand": "Sunny Run Poultry",
      "concept": "Poultry Farm",
      "desc": "A bright, friendly pastured-poultry template with an egg-and-chicken shop, weekly egg subscription and a free-range story.",
      "hue": 282
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-13-farm-cooperative",
      "idx": 13,
      "path": "templates/agriculture-farming/template-13-farm-cooperative/index.html",
      "brand": "Greenfields Co-op",
      "concept": "Farm Cooperative",
      "desc": "A community farm-cooperative template with a multi-farm marketplace, membership info and a story of growers working together.",
      "hue": 299
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-14-farm-equipment",
      "idx": 14,
      "path": "templates/agriculture-farming/template-14-farm-equipment/index.html",
      "brand": "IronFurrow Machinery",
      "concept": "Farm Equipment",
      "desc": "A practical farm-equipment dealer template with a machinery catalog, finance calculator and a built-to-work product story.",
      "hue": 316
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-15-seed-supplier",
      "idx": 15,
      "path": "templates/agriculture-farming/template-15-seed-supplier/index.html",
      "brand": "Trueseed Company",
      "concept": "Seed Supplier",
      "desc": "A friendly heirloom-seed catalog template with a sortable seed shop, grow guides and a seed-saving heritage story.",
      "hue": 333
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-16-herb-farm",
      "idx": 16,
      "path": "templates/agriculture-farming/template-16-herb-farm/index.html",
      "brand": "Wildroot Herbery",
      "concept": "Herb Farm",
      "desc": "A calming herb-farm template with a fresh-and-dried herb apothecary, tea-of-the-month club and a botanical-grower story.",
      "hue": 350
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-17-mushroom-farm",
      "idx": 17,
      "path": "templates/agriculture-farming/template-17-mushroom-farm/index.html",
      "brand": "Mycelia Gardens",
      "concept": "Mushroom Farm",
      "desc": "A friendly gourmet-mushroom template with a fresh-mushroom shop, grow-kit range and an indoor-cultivation story.",
      "hue": 7
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-18-flower-farm",
      "idx": 18,
      "path": "templates/agriculture-farming/template-18-flower-farm/index.html",
      "brand": "Petalfield Flowers",
      "concept": "Flower Farm",
      "desc": "A romantic cut-flower farm template with a seasonal stem shop, bouquet subscription and a field-to-vase story.",
      "hue": 24
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-19-tea-estate",
      "idx": 19,
      "path": "templates/agriculture-farming/template-19-tea-estate/index.html",
      "brand": "Cloudmist Tea Estate",
      "concept": "Tea Estate",
      "desc": "A refined tea-estate template with a single-garden tea collection, tea club and a misty high-altitude heritage story.",
      "hue": 41
    },
    {
      "cat": "agriculture-farming",
      "catLabel": "Agriculture & Farming",
      "slug": "template-20-grain-farm",
      "idx": 20,
      "path": "templates/agriculture-farming/template-20-grain-farm/index.html",
      "brand": "Goldacre Grains",
      "concept": "Grain Farm",
      "desc": "A wholesome heritage-grain template with a stone-milled flour shop, bakers' wholesale ordering and a field-to-loaf story.",
      "hue": 58
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-01-football-club",
      "idx": 1,
      "path": "templates/sports-recreation/template-01-football-club/index.html",
      "brand": "Ironside FC",
      "concept": "Football Club",
      "desc": "A multi-page football club template (V1) with a full squads listing, a JS day-tab weekly schedule, membership tiers and a validated trial booking — four…",
      "hue": 15
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-02-basketball-team",
      "idx": 2,
      "path": "templates/sports-recreation/template-02-basketball-team/index.html",
      "brand": "Skyline Hoops",
      "concept": "Basketball Team",
      "desc": "A multi-page basketball team &amp; academy template (V1) with a full squads listing, a JS day-tab weekly schedule, membership tiers and a validated trial…",
      "hue": 32
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-03-golf-club",
      "idx": 3,
      "path": "templates/sports-recreation/template-03-golf-club/index.html",
      "brand": "Oakhaven Links",
      "concept": "Golf Club",
      "desc": "A multi-page championship golf club template (V2) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 49
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-04-tennis-academy",
      "idx": 4,
      "path": "templates/sports-recreation/template-04-tennis-academy/index.html",
      "brand": "Baseline Tennis Academy",
      "concept": "Tennis Academy",
      "desc": "A multi-page tennis academy &amp; club template (V2) with a full programs listing, a JS day-tab weekly schedule, membership tiers and a validated trial booking…",
      "hue": 66
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-05-esports-org",
      "idx": 5,
      "path": "templates/sports-recreation/template-05-esports-org/index.html",
      "brand": "Nullpoint Esports",
      "concept": "Esports Org",
      "desc": "A multi-page competitive esports organisation template (V1) with a full academies listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 83
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-06-climbing-gym",
      "idx": 6,
      "path": "templates/sports-recreation/template-06-climbing-gym/index.html",
      "brand": "Apex Holds Climbing",
      "concept": "Climbing Gym",
      "desc": "A multi-page indoor climbing &amp; bouldering gym template (V1) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 100
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-07-surf-school",
      "idx": 7,
      "path": "templates/sports-recreation/template-07-surf-school/index.html",
      "brand": "Saltline Surf School",
      "concept": "Surf School",
      "desc": "A multi-page surf school &amp; coaching template (V3) with a full programs listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 117
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-08-skate-park",
      "idx": 8,
      "path": "templates/sports-recreation/template-08-skate-park/index.html",
      "brand": "Concrete Wave Skatepark",
      "concept": "Skate Park",
      "desc": "A multi-page indoor &amp; outdoor skatepark template (V3) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 134
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-09-bowling-alley",
      "idx": 9,
      "path": "templates/sports-recreation/template-09-bowling-alley/index.html",
      "brand": "Strike Avenue Bowl",
      "concept": "Bowling Alley",
      "desc": "A multi-page bowling alley &amp; family entertainment template (V5) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 151
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-10-ice-rink",
      "idx": 10,
      "path": "templates/sports-recreation/template-10-ice-rink/index.html",
      "brand": "Frostgate Ice Arena",
      "concept": "Ice Rink",
      "desc": "A multi-page ice rink &amp; skating arena template (V5) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 168
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-11-cricket-club",
      "idx": 11,
      "path": "templates/sports-recreation/template-11-cricket-club/index.html",
      "brand": "Willowmere Cricket Club",
      "concept": "Cricket Club",
      "desc": "A multi-page cricket club &amp; academy template (V2) with a full squads listing, a JS day-tab weekly schedule, membership tiers and a validated trial booking —…",
      "hue": 185
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-12-cycling-club",
      "idx": 12,
      "path": "templates/sports-recreation/template-12-cycling-club/index.html",
      "brand": "Velocity Cycling Club",
      "concept": "Cycling Club",
      "desc": "A multi-page road &amp; track cycling club template (V1) with a full squads listing, a JS day-tab weekly schedule, membership tiers and a validated trial…",
      "hue": 202
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-13-equestrian-center",
      "idx": 13,
      "path": "templates/sports-recreation/template-13-equestrian-center/index.html",
      "brand": "Ashford Equestrian Centre",
      "concept": "Equestrian Center",
      "desc": "A multi-page equestrian centre &amp; riding school template (V4) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 219
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-14-sports-complex",
      "idx": 14,
      "path": "templates/sports-recreation/template-14-sports-complex/index.html",
      "brand": "Meridian Sports Complex",
      "concept": "Sports Complex",
      "desc": "A multi-page multi-sport complex &amp; leisure centre template (V4) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 236
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-15-archery-range",
      "idx": 15,
      "path": "templates/sports-recreation/template-15-archery-range/index.html",
      "brand": "Truenock Archery",
      "concept": "Archery Range",
      "desc": "A multi-page archery range &amp; club template (V2) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session booking…",
      "hue": 253
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-16-paintball-arena",
      "idx": 16,
      "path": "templates/sports-recreation/template-16-paintball-arena/index.html",
      "brand": "Blitzfield Paintball",
      "concept": "Paintball Arena",
      "desc": "A multi-page paintball &amp; airsoft arena template (V3) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 270
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-17-go-kart-track",
      "idx": 17,
      "path": "templates/sports-recreation/template-17-go-kart-track/index.html",
      "brand": "Apex Lane Karting",
      "concept": "Go Kart Track",
      "desc": "A multi-page indoor &amp; outdoor karting circuit template (V3) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated…",
      "hue": 287
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-18-rugby-club",
      "idx": 18,
      "path": "templates/sports-recreation/template-18-rugby-club/index.html",
      "brand": "Granite Rugby Club",
      "concept": "Rugby Club",
      "desc": "A multi-page rugby union club &amp; academy template (V1) with a full squads listing, a JS day-tab weekly schedule, membership tiers and a validated trial…",
      "hue": 304
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-19-watersports-center",
      "idx": 19,
      "path": "templates/sports-recreation/template-19-watersports-center/index.html",
      "brand": "Tidewater Watersports Centre",
      "concept": "Watersports Center",
      "desc": "A multi-page watersports &amp; sailing centre template (V4) with a full programs listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 321
    },
    {
      "cat": "sports-recreation",
      "catLabel": "Sports & Recreation",
      "slug": "template-20-recreation-center",
      "idx": 20,
      "path": "templates/sports-recreation/template-20-recreation-center/index.html",
      "brand": "Greenfield Recreation Centre",
      "concept": "Recreation Center",
      "desc": "A multi-page community recreation centre template (V5) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session…",
      "hue": 338
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-01-veterinary-clinic",
      "idx": 1,
      "path": "templates/pet-services/template-01-veterinary-clinic/index.html",
      "brand": "Maplewood Veterinary",
      "concept": "Veterinary Clinic",
      "desc": "A multi-page veterinary clinic website template in the clean-clinical style (V2).",
      "hue": 200
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-02-pet-grooming",
      "idx": 2,
      "path": "templates/pet-services/template-02-pet-grooming/index.html",
      "brand": "Fluff &amp; Folly Grooming",
      "concept": "Pet Grooming",
      "desc": "A multi-page pet grooming website template in the friendly-rounded style (V1).",
      "hue": 217
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-03-dog-training",
      "idx": 3,
      "path": "templates/pet-services/template-03-dog-training/index.html",
      "brand": "PawSteps Dog Training",
      "concept": "Dog Training",
      "desc": "A multi-page dog training website template in the friendly-rounded style (V1).",
      "hue": 234
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-04-pet-boarding",
      "idx": 4,
      "path": "templates/pet-services/template-04-pet-boarding/index.html",
      "brand": "Cedar Lodge Boarding",
      "concept": "Pet Boarding",
      "desc": "A multi-page pet boarding website template in the friendly-rounded style (V1).",
      "hue": 251
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-05-pet-daycare",
      "idx": 5,
      "path": "templates/pet-services/template-05-pet-daycare/index.html",
      "brand": "Wiggle Room Daycare",
      "concept": "Pet Daycare",
      "desc": "A multi-page pet daycare website template in the cozy-warm style (V3).",
      "hue": 268
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-06-dog-walking",
      "idx": 6,
      "path": "templates/pet-services/template-06-dog-walking/index.html",
      "brand": "TrailTails Dog Walking",
      "concept": "Dog Walking",
      "desc": "A multi-page dog walking website template in the friendly-rounded style (V1).",
      "hue": 285
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-07-pet-sitting",
      "idx": 7,
      "path": "templates/pet-services/template-07-pet-sitting/index.html",
      "brand": "Cosy Paws Sitting",
      "concept": "Pet Sitting",
      "desc": "A multi-page pet sitting website template in the cozy-warm style (V3).",
      "hue": 302
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-08-aquarium-shop",
      "idx": 8,
      "path": "templates/pet-services/template-08-aquarium-shop/index.html",
      "brand": "AbyssReef Aquatics",
      "concept": "Aquarium Shop",
      "desc": "A multi-page aquarium shop website template in the bold-modern style (V4).",
      "hue": 319
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-09-exotic-pets",
      "idx": 9,
      "path": "templates/pet-services/template-09-exotic-pets/index.html",
      "brand": "WildScale Exotics",
      "concept": "Exotic Pets",
      "desc": "A multi-page exotic pets website template in the bold-modern style (V4).",
      "hue": 336
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-10-pet-photography",
      "idx": 10,
      "path": "templates/pet-services/template-10-pet-photography/index.html",
      "brand": "Goldenframe Pet Studio",
      "concept": "Pet Photography",
      "desc": "A multi-page pet photography website template in the premium-care style (V5).",
      "hue": 353
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-11-dog-breeder",
      "idx": 11,
      "path": "templates/pet-services/template-11-dog-breeder/index.html",
      "brand": "Bramblewood Kennels",
      "concept": "Dog Breeder",
      "desc": "A multi-page dog breeder website template in the premium-care style (V5).",
      "hue": 10
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-12-cat-cafe",
      "idx": 12,
      "path": "templates/pet-services/template-12-cat-cafe/index.html",
      "brand": "Whisker &amp; Bean",
      "concept": "Cat Cafe",
      "desc": "A multi-page cat cafe website template in the cozy-warm style (V3).",
      "hue": 27
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-13-pet-bakery",
      "idx": 13,
      "path": "templates/pet-services/template-13-pet-bakery/index.html",
      "brand": "Biscuit &amp; Bark Bakery",
      "concept": "Pet Bakery",
      "desc": "A multi-page pet bakery website template in the cozy-warm style (V3).",
      "hue": 44
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-14-animal-hospital",
      "idx": 14,
      "path": "templates/pet-services/template-14-animal-hospital/index.html",
      "brand": "Northgate Animal Hospital",
      "concept": "Animal Hospital",
      "desc": "A multi-page animal hospital website template in the clean-clinical style (V2).",
      "hue": 61
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-15-mobile-vet",
      "idx": 15,
      "path": "templates/pet-services/template-15-mobile-vet/index.html",
      "brand": "DoorVet Mobile Care",
      "concept": "Mobile Vet",
      "desc": "A multi-page mobile vet website template in the clean-clinical style (V2).",
      "hue": 78
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-16-pet-wellness",
      "idx": 16,
      "path": "templates/pet-services/template-16-pet-wellness/index.html",
      "brand": "Balance Pet Wellness",
      "concept": "Pet Wellness",
      "desc": "A multi-page pet wellness website template in the clean-clinical style (V2).",
      "hue": 95
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-17-horse-stables",
      "idx": 17,
      "path": "templates/pet-services/template-17-horse-stables/index.html",
      "brand": "Ashford Equestrian",
      "concept": "Horse Stables",
      "desc": "A multi-page horse stables website template in the premium-care style (V5).",
      "hue": 112
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-18-bird-sanctuary",
      "idx": 18,
      "path": "templates/pet-services/template-18-bird-sanctuary/index.html",
      "brand": "Featherhaven Sanctuary",
      "concept": "Bird Sanctuary",
      "desc": "A multi-page bird sanctuary website template in the friendly-rounded style (V1).",
      "hue": 129
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-19-reptile-shop",
      "idx": 19,
      "path": "templates/pet-services/template-19-reptile-shop/index.html",
      "brand": "ScaleHouse Reptiles",
      "concept": "Reptile Shop",
      "desc": "A multi-page reptile shop website template in the bold-modern style (V4).",
      "hue": 146
    },
    {
      "cat": "pet-services",
      "catLabel": "Pet Services",
      "slug": "template-20-pet-insurance",
      "idx": 20,
      "path": "templates/pet-services/template-20-pet-insurance/index.html",
      "brand": "Safepaw Insurance",
      "concept": "Pet Insurance",
      "desc": "A multi-page pet insurance website template in the premium-care style (V5).",
      "hue": 163
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-01-it-support",
      "idx": 1,
      "path": "templates/technology-services/template-01-it-support/index.html",
      "brand": "HelpGrid",
      "concept": "IT Support",
      "desc": "HelpGrid is a corporate-trust, fully multi-page it support &amp; helpdesk website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 250
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-02-software-development",
      "idx": 2,
      "path": "templates/technology-services/template-02-software-development/index.html",
      "brand": "Forgeloop",
      "concept": "Software Development",
      "desc": "Forgeloop is a dark-techy, fully multi-page custom software development website template with a services-led primary page, count-up stats, a validated…",
      "hue": 267
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-03-web-design-agency",
      "idx": 3,
      "path": "templates/technology-services/template-03-web-design-agency/index.html",
      "brand": "Northlight",
      "concept": "Web Design Agency",
      "desc": "Northlight is a minimal-studio, fully multi-page web design agency website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 284
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-04-cloud-services",
      "idx": 4,
      "path": "templates/technology-services/template-04-cloud-services/index.html",
      "brand": "Stratoshift",
      "concept": "Cloud Services",
      "desc": "Stratoshift is a modern-gradient, fully multi-page cloud services &amp; migration website template with a services-led primary page, count-up stats, a validated…",
      "hue": 301
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-05-managed-it",
      "idx": 5,
      "path": "templates/technology-services/template-05-managed-it/index.html",
      "brand": "Sentinel IT",
      "concept": "Managed IT",
      "desc": "Sentinel IT is a corporate-trust, fully multi-page managed it services website template with a services-led primary page, count-up stats, a validated…",
      "hue": 318
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-06-data-analytics",
      "idx": 6,
      "path": "templates/technology-services/template-06-data-analytics/index.html",
      "brand": "Quantleaf",
      "concept": "Data Analytics",
      "desc": "Quantleaf is a modern-gradient, fully multi-page data analytics &amp; bi website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 335
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-07-ai-consultancy",
      "idx": 7,
      "path": "templates/technology-services/template-07-ai-consultancy/index.html",
      "brand": "Cognivault",
      "concept": "AI Consultancy",
      "desc": "Cognivault is a modern-gradient, fully multi-page ai consultancy website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 352
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-08-app-development",
      "idx": 8,
      "path": "templates/technology-services/template-08-app-development/index.html",
      "brand": "Pocketforge",
      "concept": "App Development",
      "desc": "Pocketforge is a minimal-studio, fully multi-page mobile app development website template with a services-led primary page, count-up stats, a validated…",
      "hue": 9
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-09-devops",
      "idx": 9,
      "path": "templates/technology-services/template-09-devops/index.html",
      "brand": "Pipeworks",
      "concept": "Devops",
      "desc": "Pipeworks is a dark-techy, fully multi-page devops &amp; platform engineering website template with a services-led primary page, count-up stats, a validated…",
      "hue": 26
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-10-blockchain-dev",
      "idx": 10,
      "path": "templates/technology-services/template-10-blockchain-dev/index.html",
      "brand": "Chainwright",
      "concept": "Blockchain Dev",
      "desc": "Chainwright is a dark-techy, fully multi-page blockchain development website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 43
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-11-game-studio",
      "idx": 11,
      "path": "templates/technology-services/template-11-game-studio/index.html",
      "brand": "Emberkiln",
      "concept": "Game Studio",
      "desc": "Emberkiln is a minimal-studio, fully multi-page indie game studio website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 60
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-12-ux-agency",
      "idx": 12,
      "path": "templates/technology-services/template-12-ux-agency/index.html",
      "brand": "Cleargrove",
      "concept": "UX Agency",
      "desc": "Cleargrove is a minimal-studio, fully multi-page ux research &amp; design agency website template with a services-led primary page, count-up stats, a validated…",
      "hue": 77
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-13-digital-transformation",
      "idx": 13,
      "path": "templates/technology-services/template-13-digital-transformation/index.html",
      "brand": "Meridian Shift",
      "concept": "Digital Transformation",
      "desc": "Meridian Shift is a enterprise-solid, fully multi-page digital transformation consultancy website template with a services-led primary page, count-up stats,…",
      "hue": 94
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-14-network-solutions",
      "idx": 14,
      "path": "templates/technology-services/template-14-network-solutions/index.html",
      "brand": "Linkforge",
      "concept": "Network Solutions",
      "desc": "Linkforge is a corporate-trust, fully multi-page network infrastructure solutions website template with a services-led primary page, count-up stats, a…",
      "hue": 111
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-15-saas-company",
      "idx": 15,
      "path": "templates/technology-services/template-15-saas-company/index.html",
      "brand": "Cadenceflow",
      "concept": "SaaS Company",
      "desc": "Cadenceflow is a enterprise-solid, fully multi-page b2b saas platform website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 128
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-16-tech-repair",
      "idx": 16,
      "path": "templates/technology-services/template-16-tech-repair/index.html",
      "brand": "FixForge",
      "concept": "Tech Repair",
      "desc": "FixForge is a enterprise-solid, fully multi-page computer &amp; device repair website template with a services-led primary page, count-up stats, a validated…",
      "hue": 145
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-17-erp-solutions",
      "idx": 17,
      "path": "templates/technology-services/template-17-erp-solutions/index.html",
      "brand": "Coreaxis",
      "concept": "ERP Solutions",
      "desc": "Coreaxis is a enterprise-solid, fully multi-page erp implementation &amp; solutions website template with a services-led primary page, count-up stats, a…",
      "hue": 162
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-18-iot-company",
      "idx": 18,
      "path": "templates/technology-services/template-18-iot-company/index.html",
      "brand": "Pulsemesh",
      "concept": "IoT Company",
      "desc": "Pulsemesh is a modern-gradient, fully multi-page iot solutions &amp; connected devices website template with a services-led primary page, count-up stats, a…",
      "hue": 179
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-19-qa-testing",
      "idx": 19,
      "path": "templates/technology-services/template-19-qa-testing/index.html",
      "brand": "Assertly",
      "concept": "QA Testing",
      "desc": "Assertly is a dark-techy, fully multi-page qa &amp; software testing website template with a services-led primary page, count-up stats, a validated project…",
      "hue": 196
    },
    {
      "cat": "technology-services",
      "catLabel": "Technology Services",
      "slug": "template-20-hosting-provider",
      "idx": 20,
      "path": "templates/technology-services/template-20-hosting-provider/index.html",
      "brand": "Hostpeak",
      "concept": "Hosting Provider",
      "desc": "Hostpeak is a corporate-trust, fully multi-page web hosting &amp; infrastructure provider website template with a services-led primary page, count-up stats, a…",
      "hue": 213
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-01-courier-delivery",
      "idx": 1,
      "path": "templates/logistics-transport/template-01-courier-delivery/index.html",
      "brand": "SwiftParcel",
      "concept": "Courier Delivery",
      "desc": "Same-day courier and parcel delivery across the metro — booked in seconds, tracked in real time.",
      "hue": 30
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-02-freight-forwarding",
      "idx": 2,
      "path": "templates/logistics-transport/template-02-freight-forwarding/index.html",
      "brand": "Meridian Freight",
      "concept": "Freight Forwarding",
      "desc": "Global freight forwarding by sea, air and land — one partner to move your cargo door to door.",
      "hue": 47
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-03-moving-company",
      "idx": 3,
      "path": "templates/logistics-transport/template-03-moving-company/index.html",
      "brand": "HomeShift Movers",
      "concept": "Moving Company",
      "desc": "Friendly, careful movers who treat your home like their own — packed, moved and settled stress-free.",
      "hue": 64
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-04-taxi-service",
      "idx": 4,
      "path": "templates/logistics-transport/template-04-taxi-service/index.html",
      "brand": "CityCab Co.",
      "concept": "Taxi Service",
      "desc": "Friendly local cabs, around the clock — clean cars, fair fares and drivers who know every street.",
      "hue": 81
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-05-bus-operator",
      "idx": 5,
      "path": "templates/logistics-transport/template-05-bus-operator/index.html",
      "brand": "RouteRunner",
      "concept": "Bus Operator",
      "desc": "Comfortable, affordable intercity coaches with Wi-Fi, power and seats you can actually stretch out in.",
      "hue": 98
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-06-trucking",
      "idx": 6,
      "path": "templates/logistics-transport/template-06-trucking/index.html",
      "brand": "IronLane Trucking",
      "concept": "Trucking",
      "desc": "Heavy-duty long-haul trucking across the country — full loads, dedicated lanes, on-time every mile.",
      "hue": 115
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-07-warehouse-3pl",
      "idx": 7,
      "path": "templates/logistics-transport/template-07-warehouse-3pl/index.html",
      "brand": "GridStore 3PL",
      "concept": "Warehouse 3PL",
      "desc": "Smart warehousing and third-party fulfilment — we store, pick, pack and ship so you can grow.",
      "hue": 132
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-08-shipping-line",
      "idx": 8,
      "path": "templates/logistics-transport/template-08-shipping-line/index.html",
      "brand": "BlueHaul Lines",
      "concept": "Shipping Line",
      "desc": "An ocean container line connecting continents — dependable sailings, modern vessels, global reach.",
      "hue": 149
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-09-air-cargo",
      "idx": 9,
      "path": "templates/logistics-transport/template-09-air-cargo/index.html",
      "brand": "AeroLift Cargo",
      "concept": "Air Cargo",
      "desc": "Time-critical air cargo with global reach — when it absolutely has to be there, it flies with us.",
      "hue": 166
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-10-last-mile-delivery",
      "idx": 10,
      "path": "templates/logistics-transport/template-10-last-mile-delivery/index.html",
      "brand": "FinalBlock",
      "concept": "Last Mile Delivery",
      "desc": "The last-mile partner for e-commerce — fast, tracked, doorstep delivery your customers will love.",
      "hue": 183
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-11-cold-chain",
      "idx": 11,
      "path": "templates/logistics-transport/template-11-cold-chain/index.html",
      "brand": "PolarLink Logistics",
      "concept": "Cold Chain",
      "desc": "Temperature-controlled logistics you can trust — unbroken cold chain for food, pharma and life sciences.",
      "hue": 200
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-12-port-operator",
      "idx": 12,
      "path": "templates/logistics-transport/template-12-port-operator/index.html",
      "brand": "Harborgate Terminals",
      "concept": "Port Operator",
      "desc": "A modern deepwater container terminal — fast vessel turnarounds, deep berths and seamless gate flow.",
      "hue": 217
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-13-drone-delivery",
      "idx": 13,
      "path": "templates/logistics-transport/template-13-drone-delivery/index.html",
      "brand": "Skyward Drop",
      "concept": "Drone Delivery",
      "desc": "Autonomous drone delivery in minutes — lifting small parcels over the traffic and straight to you.",
      "hue": 234
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-14-ride-hailing",
      "idx": 14,
      "path": "templates/logistics-transport/template-14-ride-hailing/index.html",
      "brand": "HopRide",
      "concept": "Ride Hailing",
      "desc": "Tap, ride, arrive — a friendly ride-hailing app connecting you with nearby drivers in moments.",
      "hue": 251
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-15-bike-courier",
      "idx": 15,
      "path": "templates/logistics-transport/template-15-bike-courier/index.html",
      "brand": "PedalPost",
      "concept": "Bike Courier",
      "desc": "Zero-emission bike couriers weaving through downtown — the fastest way across the city centre.",
      "hue": 268
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-16-supply-chain",
      "idx": 16,
      "path": "templates/logistics-transport/template-16-supply-chain/index.html",
      "brand": "Nexus Supply Chain",
      "concept": "Supply Chain",
      "desc": "End-to-end supply chain solutions — visibility, planning and orchestration from supplier to shelf.",
      "hue": 285
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-17-customs-broker",
      "idx": 17,
      "path": "templates/logistics-transport/template-17-customs-broker/index.html",
      "brand": "Clearport Brokers",
      "concept": "Customs Broker",
      "desc": "Licensed customs brokers who clear your goods fast — duties, compliance and paperwork, handled.",
      "hue": 302
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-18-rail-freight",
      "idx": 18,
      "path": "templates/logistics-transport/template-18-rail-freight/index.html",
      "brand": "Continental Rail Freight",
      "concept": "Rail Freight",
      "desc": "Move more for less by rail — high-capacity, low-emission freight trains across the continent.",
      "hue": 319
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-19-dispatch-service",
      "idx": 19,
      "path": "templates/logistics-transport/template-19-dispatch-service/index.html",
      "brand": "PulseDispatch",
      "concept": "Dispatch Service",
      "desc": "Round-the-clock dispatch and fleet coordination — we keep your drivers moving and customers informed.",
      "hue": 336
    },
    {
      "cat": "logistics-transport",
      "catLabel": "Logistics & Transport",
      "slug": "template-20-parcel-locker",
      "idx": 20,
      "path": "templates/logistics-transport/template-20-parcel-locker/index.html",
      "brand": "LockBox Lockers",
      "concept": "Parcel Locker",
      "desc": "Collect and send parcels on your schedule — secure smart lockers a short walk from home, open 24/7.",
      "hue": 353
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-01-plumber",
      "idx": 1,
      "path": "templates/home-services/template-01-plumber/index.html",
      "brand": "DrainGuard Plumbing",
      "concept": "Plumber",
      "desc": "DrainGuard Plumbing is a complete, four-page plumber website template — a bold-urgent design with a full services listing, an interactive quote/booking…",
      "hue": 175
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-02-electrician",
      "idx": 2,
      "path": "templates/home-services/template-02-electrician/index.html",
      "brand": "VoltLine Electric",
      "concept": "Electrician",
      "desc": "VoltLine Electric is a complete, four-page electrician website template — a bold-urgent design with a full services listing, an interactive quote/booking…",
      "hue": 192
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-03-cleaning-service",
      "idx": 3,
      "path": "templates/home-services/template-03-cleaning-service/index.html",
      "brand": "FreshNest Cleaning",
      "concept": "Cleaning Service",
      "desc": "FreshNest Cleaning is a complete, four-page cleaning service website template — a eco-fresh design with a full services listing, an interactive…",
      "hue": 209
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-04-landscaping",
      "idx": 4,
      "path": "templates/home-services/template-04-landscaping/index.html",
      "brand": "GreenHaven Landscapes",
      "concept": "Landscaping",
      "desc": "GreenHaven Landscapes is a complete, four-page landscaping website template — a eco-fresh design with a full services listing, an interactive quote/booking…",
      "hue": 226
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-05-pest-control",
      "idx": 5,
      "path": "templates/home-services/template-05-pest-control/index.html",
      "brand": "ShieldPest Control",
      "concept": "Pest Control",
      "desc": "ShieldPest Control is a complete, four-page pest control website template — a bold-urgent design with a full services listing, an interactive quote/booking…",
      "hue": 243
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-06-hvac",
      "idx": 6,
      "path": "templates/home-services/template-06-hvac/index.html",
      "brand": "ClimaCore HVAC",
      "concept": "HVAC",
      "desc": "ClimaCore HVAC is a complete, four-page hvac website template — a trusted-trade design with a full services listing, an interactive quote/booking widget,…",
      "hue": 260
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-07-roofing",
      "idx": 7,
      "path": "templates/home-services/template-07-roofing/index.html",
      "brand": "SummitPeak Roofing",
      "concept": "Roofing",
      "desc": "SummitPeak Roofing is a complete, four-page roofing website template — a trusted-trade design with a full services listing, an interactive quote/booking…",
      "hue": 277
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-08-painting",
      "idx": 8,
      "path": "templates/home-services/template-08-painting/index.html",
      "brand": "TrueHue Painting",
      "concept": "Painting",
      "desc": "TrueHue Painting is a complete, four-page painting website template — a clean-modern design with a full services listing, an interactive quote/booking…",
      "hue": 294
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-09-handyman",
      "idx": 9,
      "path": "templates/home-services/template-09-handyman/index.html",
      "brand": "FixWell Handyman",
      "concept": "Handyman",
      "desc": "FixWell Handyman is a complete, four-page handyman website template — a clean-modern design with a full services listing, an interactive quote/booking…",
      "hue": 311
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-10-locksmith",
      "idx": 10,
      "path": "templates/home-services/template-10-locksmith/index.html",
      "brand": "KeyFort Locksmith",
      "concept": "Locksmith",
      "desc": "KeyFort Locksmith is a complete, four-page locksmith website template — a bold-urgent design with a full services listing, an interactive quote/booking…",
      "hue": 328
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-11-carpet-cleaning",
      "idx": 11,
      "path": "templates/home-services/template-11-carpet-cleaning/index.html",
      "brand": "PureFiber Carpet Care",
      "concept": "Carpet Cleaning",
      "desc": "PureFiber Carpet Care is a complete, four-page carpet cleaning website template — a clean-modern design with a full services listing, an interactive…",
      "hue": 345
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-12-appliance-repair",
      "idx": 12,
      "path": "templates/home-services/template-12-appliance-repair/index.html",
      "brand": "ReviveTech Appliance Repair",
      "concept": "Appliance Repair",
      "desc": "ReviveTech Appliance Repair is a complete, four-page appliance repair website template — a trusted-trade design with a full services listing, an interactive…",
      "hue": 2
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-13-home-security",
      "idx": 13,
      "path": "templates/home-services/template-13-home-security/index.html",
      "brand": "Sentinel Home Security",
      "concept": "Home Security",
      "desc": "Sentinel Home Security is a complete, four-page home security website template — a premium-home design with a full services listing, an interactive…",
      "hue": 19
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-14-window-cleaning",
      "idx": 14,
      "path": "templates/home-services/template-14-window-cleaning/index.html",
      "brand": "ClearView Window Cleaning",
      "concept": "Window Cleaning",
      "desc": "ClearView Window Cleaning is a complete, four-page window cleaning website template — a eco-fresh design with a full services listing, an interactive…",
      "hue": 36
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-15-pool-service",
      "idx": 15,
      "path": "templates/home-services/template-15-pool-service/index.html",
      "brand": "AquaLux Pool Service",
      "concept": "Pool Service",
      "desc": "AquaLux Pool Service is a complete, four-page pool service website template — a eco-fresh design with a full services listing, an interactive quote/booking…",
      "hue": 53
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-16-solar-installation",
      "idx": 16,
      "path": "templates/home-services/template-16-solar-installation/index.html",
      "brand": "SunCrest Solar",
      "concept": "Solar Installation",
      "desc": "SunCrest Solar is a complete, four-page solar installation website template — a premium-home design with a full services listing, an interactive…",
      "hue": 70
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-17-junk-removal",
      "idx": 17,
      "path": "templates/home-services/template-17-junk-removal/index.html",
      "brand": "HaulAway Junk Removal",
      "concept": "Junk Removal",
      "desc": "HaulAway Junk Removal is a complete, four-page junk removal website template — a clean-modern design with a full services listing, an interactive…",
      "hue": 87
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-18-flooring",
      "idx": 18,
      "path": "templates/home-services/template-18-flooring/index.html",
      "brand": "HeritageGrain Flooring",
      "concept": "Flooring",
      "desc": "HeritageGrain Flooring is a complete, four-page flooring website template — a premium-home design with a full services listing, an interactive quote/booking…",
      "hue": 104
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-19-fencing",
      "idx": 19,
      "path": "templates/home-services/template-19-fencing/index.html",
      "brand": "IronOak Fencing",
      "concept": "Fencing",
      "desc": "IronOak Fencing is a complete, four-page fencing website template — a trusted-trade design with a full services listing, an interactive quote/booking…",
      "hue": 121
    },
    {
      "cat": "home-services",
      "catLabel": "Home Services",
      "slug": "template-20-home-renovation",
      "idx": 20,
      "path": "templates/home-services/template-20-home-renovation/index.html",
      "brand": "StoneBridge Renovations",
      "concept": "Home Renovation",
      "desc": "StoneBridge Renovations is a complete, four-page home renovation website template — a premium-home design with a full services listing, an interactive…",
      "hue": 138
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-01-city-government",
      "idx": 1,
      "path": "templates/government-public/template-01-city-government/index.html",
      "brand": "City of Ashford Bay",
      "concept": "City Government",
      "desc": "Serving 184,000 residents with open, accountable local government.",
      "hue": 225
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-02-public-library",
      "idx": 2,
      "path": "templates/government-public/template-02-public-library/index.html",
      "brand": "Wexford Public Library",
      "concept": "Public Library",
      "desc": "Free books, ideas and gathering space for every Wexford resident.",
      "hue": 242
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-03-museum",
      "idx": 3,
      "path": "templates/government-public/template-03-museum/index.html",
      "brand": "Harborline Museum",
      "concept": "Museum",
      "desc": "Five centuries of art and regional history, free to the public.",
      "hue": 259
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-04-fire-department",
      "idx": 4,
      "path": "templates/government-public/template-04-fire-department/index.html",
      "brand": "Ridgemont Fire &amp; Rescue",
      "concept": "Fire Department",
      "desc": "24/7 fire suppression, rescue and prevention for the Ridgemont community.",
      "hue": 276
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-05-police-department",
      "idx": 5,
      "path": "templates/government-public/template-05-police-department/index.html",
      "brand": "Cedar Falls Police",
      "concept": "Police Department",
      "desc": "Community policing built on transparency, service and trust.",
      "hue": 293
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-06-public-transit",
      "idx": 6,
      "path": "templates/government-public/template-06-public-transit/index.html",
      "brand": "MetroLink Transit",
      "concept": "Public Transit",
      "desc": "Buses, light rail and paratransit connecting the whole region.",
      "hue": 310
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-07-political-campaign",
      "idx": 7,
      "path": "templates/government-public/template-07-political-campaign/index.html",
      "brand": "Reyes for Governor",
      "concept": "Political Campaign",
      "desc": "A fair economy, great schools and clean energy for every family.",
      "hue": 327
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-08-embassy",
      "idx": 8,
      "path": "templates/government-public/template-08-embassy/index.html",
      "brand": "Embassy of Valoria",
      "concept": "Embassy",
      "desc": "Consular services, visas and cultural ties for Valorian nationals and friends.",
      "hue": 344
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-09-national-park",
      "idx": 9,
      "path": "templates/government-public/template-09-national-park/index.html",
      "brand": "Cascade Ridge National Park",
      "concept": "National Park",
      "desc": "Protecting 318,000 acres of forest, river and alpine wilderness.",
      "hue": 1
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-10-public-utility",
      "idx": 10,
      "path": "templates/government-public/template-10-public-utility/index.html",
      "brand": "Brightwater Utilities",
      "concept": "Public Utility",
      "desc": "Reliable water and clean power, owned by the community it serves.",
      "hue": 18
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-11-post-office",
      "idx": 11,
      "path": "templates/government-public/template-11-post-office/index.html",
      "brand": "Northgate Postal Service",
      "concept": "Post Office",
      "desc": "Letters, parcels and money services delivered to every address.",
      "hue": 35
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-12-tax-office",
      "idx": 12,
      "path": "templates/government-public/template-12-tax-office/index.html",
      "brand": "Revenue &amp; Taxation Office",
      "concept": "Tax Office",
      "desc": "Fair, clear and on-time tax administration for residents and businesses.",
      "hue": 52
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-13-courthouse",
      "idx": 13,
      "path": "templates/government-public/template-13-courthouse/index.html",
      "brand": "Marwick County Courthouse",
      "concept": "Courthouse",
      "desc": "Equal justice, open records and clear guidance for every visitor.",
      "hue": 69
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-14-town-hall",
      "idx": 14,
      "path": "templates/government-public/template-14-town-hall/index.html",
      "brand": "Town of Briarcliff",
      "concept": "Town Hall",
      "desc": "Small-town government, close to the 22,000 people it serves.",
      "hue": 86
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-15-voter-information",
      "idx": 15,
      "path": "templates/government-public/template-15-voter-information/index.html",
      "brand": "Vote Glenshire",
      "concept": "Voter Information",
      "desc": "Register, check your status and find your polling place — every election.",
      "hue": 103
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-16-census-bureau",
      "idx": 16,
      "path": "templates/government-public/template-16-census-bureau/index.html",
      "brand": "National Census Bureau",
      "concept": "Census Bureau",
      "desc": "Accurate population data that guides funding and representation.",
      "hue": 120
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-17-parks-recreation-dept",
      "idx": 17,
      "path": "templates/government-public/template-17-parks-recreation-dept/index.html",
      "brand": "Lakeshore Parks &amp; Recreation",
      "concept": "Parks Recreation Dept",
      "desc": "Parks, pools, trails and programs for every age across the district.",
      "hue": 137
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-18-emergency-services",
      "idx": 18,
      "path": "templates/government-public/template-18-emergency-services/index.html",
      "brand": "Summit County 911",
      "concept": "Emergency Services",
      "desc": "911 dispatch, emergency management and public alerts, around the clock.",
      "hue": 154
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-19-public-health-dept",
      "idx": 19,
      "path": "templates/government-public/template-19-public-health-dept/index.html",
      "brand": "Rivergate Public Health",
      "concept": "Public Health Dept",
      "desc": "Protecting community health through prevention, data and care access.",
      "hue": 171
    },
    {
      "cat": "government-public",
      "catLabel": "Government & Public",
      "slug": "template-20-immigration-office",
      "idx": 20,
      "path": "templates/government-public/template-20-immigration-office/index.html",
      "brand": "Office of Citizenship &amp; Immigration",
      "concept": "Immigration Office",
      "desc": "Clear pathways to visas, residency and citizenship for newcomers.",
      "hue": 188
    }
  ];
  // __TPL_DATA_END__

  /* --------------------------------------------------------------------- */
  /* Theme toggle                                                          */
  /* --------------------------------------------------------------------- */

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");

  try {
    if (localStorage.getItem("th-theme") === "dark") {
      root.classList.add("dark");
    }
  } catch (_) { /* storage unavailable on some file:// setups */ }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      root.classList.toggle("dark");
      try {
        localStorage.setItem(
          "th-theme",
          root.classList.contains("dark") ? "dark" : "light"
        );
      } catch (_) { /* ignore */ }
    });
  }

  /* --------------------------------------------------------------------- */
  /* Mobile navigation                                                     */
  /* --------------------------------------------------------------------- */

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    siteNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------------------------------------------------- */
  /* Card rendering                                                        */
  /* --------------------------------------------------------------------- */

  function initials(name) {
    const words = String(name)
      .replace(/&[a-z]+;/gi, " ")   // drop HTML entities (&amp; …)
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(/\s+/);
    return words.slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase() || "T";
  }

  function cardHTML(t) {
    const hue2 = (t.hue + 42) % 360;
    return (
      '<article class="tpl-card" data-cat="' + t.cat + '" data-search="' + t.search + '">' +
        '<a class="tpl-link" href="' + t.path + '">' +
          '<div class="tpl-thumb" style="background:linear-gradient(135deg,hsl(' + t.hue + ',62%,52%),hsl(' + hue2 + ',58%,38%))">' +
            '<span class="tpl-initials">' + initials(t.brand) + "</span>" +
            '<span class="tpl-num">' + String(t.idx).padStart(2, "0") + "</span>" +
          "</div>" +
          '<div class="tpl-body">' +
            '<h4 class="tpl-name">' + t.brand + "</h4>" +
            '<p class="tpl-concept">' + t.concept + "</p>" +
            '<p class="tpl-desc">' + t.desc + "</p>" +
            '<span class="tpl-open">Open template ' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            "</span>" +
          "</div>" +
        "</a>" +
      "</article>"
    );
  }

  TEMPLATES.forEach(function (t) {
    t.search = (t.brand + " " + t.concept + " " + t.catLabel + " " + t.slug)
      .toLowerCase()
      .replace(/["'<>]/g, "");
  });

  document.querySelectorAll("[data-grid]").forEach(function (grid) {
    const cat = grid.getAttribute("data-grid");
    grid.innerHTML = TEMPLATES
      .filter(function (t) { return t.cat === cat; })
      .map(cardHTML)
      .join("");
  });

  /* --------------------------------------------------------------------- */
  /* Search + category filter                                              */
  /* --------------------------------------------------------------------- */

  const searchInput = document.getElementById("search");
  const chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");
  const blocks = Array.prototype.slice.call(document.querySelectorAll("[data-cat-block]"));
  const allCards = Array.prototype.slice.call(document.querySelectorAll(".tpl-card"));

  let activeCat = "all";

  function applyFilter() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleTotal = 0;

    blocks.forEach(function (block) {
      const cat = block.getAttribute("data-cat-block");
      const cards = block.querySelectorAll(".tpl-card");
      let visibleInBlock = 0;

      cards.forEach(function (card) {
        const matchCat = activeCat === "all" || activeCat === cat;
        const matchQuery = !q || card.getAttribute("data-search").indexOf(q) !== -1;
        const show = matchCat && matchQuery;
        card.classList.toggle("hidden", !show);
        if (show) visibleInBlock += 1;
      });

      const countEl = block.querySelector("[data-block-count]");
      if (countEl) countEl.textContent = String(visibleInBlock);
      block.style.display = visibleInBlock === 0 ? "none" : "";
      visibleTotal += visibleInBlock;
    });

    if (resultCount) {
      resultCount.textContent =
        "Showing " + visibleTotal + " of " + TEMPLATES.length + " templates";
    }
    if (emptyState) emptyState.hidden = visibleTotal !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      activeCat = chip.getAttribute("data-cat") || "all";
      applyFilter();
    });
  });

  /* Press "/" anywhere to focus search */
  document.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) || "";
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  });

  /* --------------------------------------------------------------------- */
  /* Scroll reveal                                                         */
  /* --------------------------------------------------------------------- */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    allCards.forEach(function (card) {
      card.classList.add("will-reveal");
      observer.observe(card);
    });
  }

  /* --------------------------------------------------------------------- */
  /* Header scroll state, back-to-top, footer year                         */
  /* --------------------------------------------------------------------- */

  const header = document.querySelector(".site-header");
  const toTop = document.querySelector("[data-totop]");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.hidden = y < 600;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  applyFilter();
})();
