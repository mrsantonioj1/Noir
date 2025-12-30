# NOIR TWIN AI STUDIO - Complete Developer Brief

**Project Owner:** Deven (@mrsantonioj1)  
**Launch Date:** January 1, 2026  
**Domain:** noirtwin.com  
**Platform:** Web-based AI portrait generation

---

## 🎯 PROJECT OVERVIEW

NOIR TWIN is a luxury AI portraiture platform that generates professional, culturally authentic portraits using AI. The tagline is "For the culture, by the culture" - it's specifically designed for Black women and serves a luxury market with rose gold and champagne branding.

**Core Purpose:** Transform user photos into stunning, photorealistic AI portraits that look like professional photoshoots in exotic locations with different styles, wardrobes, and lighting.

---

## 🎨 BRAND IDENTITY

**Colors:**
- Primary: Noir Black (#0D0D0D)
- Secondary: Noir Charcoal (#1A1A1A)
- Accent 1: Rose Gold (#B76E79)
- Accent 2: Champagne Gold (#D4AF37)
- Text: Cream (#F8F6F4)

**Logo:** 
- Elegant woman silhouette in a circle
- Rose gold to champagne gradient
- Empowering pose with raised arms
- Inspired by She Chose Sisterhood branding (tree of life aesthetic but just the woman, no tree)

**Typography:**
- Headers: Bold, modern sans-serif
- Body: Clean, readable system fonts
- Style: Luxury, editorial, high-end

**Visual Style:**
- Clean, minimal interface
- Dark background (noir black)
- Rose gold/champagne accents
- High-quality imagery
- Professional photography aesthetic

---

## 💻 TECHNICAL STACK

**Frontend:**
- React 18
- TypeScript
- Vite 6 (build tool)
- CSS (no Tailwind, custom styles provided)

**AI Integration:**
- Google Gemini 2.0 Flash (Experimental)
- API: `@google/generative-ai` v0.21.0
- Model: `gemini-2.0-flash-exp`

**Payment Processing:**
- Stripe Payment Links (already created)
- No complex checkout flow initially
- Manual fulfillment for first customers

**Hosting:**
- Vercel (already set up)
- Free tier initially, upgrade to Pro when revenue hits $500+/month

**Domain:**
- noirtwin.com (to be connected)

---

## 🔧 CORE FEATURES

### **1. Image Upload**
- User uploads 1-3 photos of themselves
- Drag & drop or click to browse
- Preview thumbnails
- Supported formats: JPG, PNG, WebP
- File size validation

### **2. Prompt Input**
- Large text area for user to describe their vision
- Placeholder text with examples
- Character limit: flexible (no hard limit)
- Hint text: "Be specific: lighting, setting, mood, style, wardrobe"

### **3. AI Image Generation**
- Uses Google Gemini 2.0 Flash API
- Processes user photos + prompt
- Generates 1 image per generation
- Aspect ratio: 1:1 (square format)
- Resolution varies by tier (1080p, 4K, 8K)

### **4. Master Prompt System** (CRITICAL)
The AI uses a sophisticated master prompt that ensures:
- **Identical twin replication** (highest priority - person in output MUST look exactly like person in uploaded photos)
- **Luminous high-key lighting** (brighter than reference photos, studio quality)
- **Professional camera simulation** (85mm f/1.4 or 135mm f/1.8 lens effect)
- **Flawless styling** (professional makeup, styled hair, satin skin finish)
- **Full composition** (no cropped heads or hair, shoulders visible)
- **User's creative vision** from their prompt

**Full Master Prompt:**
```
System Instruction: You are an AI art director for a world-class beauty and fashion photoshoot. Your goal is to generate a flawless, hyper-realistic image that is indistinguishable from a photograph shot by a legendary photographer.

Task: Create a new, breathtakingly realistic image of the person from the reference photos, styled according to the following directives.

**Core Directives:**

1. **Identical Twin Replication (HIGHEST PRIORITY):**
   - The primary rule is to generate a new photograph of the **exact same individual** from the reference photos
   - The result must be an identical twin, indistinguishable from the source
   - Perform deep analysis of reference photos to lock in all facial markers
   - Zero deviation in key facial landmarks (eyes, nose, lips, jawline, cheekbones)
   - Preserve exact facial features with 100% accuracy

2. **Luminous High-Key Lighting:**
   - Every image must be significantly lighter and brighter than reference photos
   - Employ sophisticated multi-point studio lighting setup
   - Subject's skin must appear luminous and glowing
   - Create bright, airy, high-key effect

3. **Professional Camera Simulation:**
   - Simulate high-end full-frame camera (Canon EOS R5, Sony A7R IV)
   - Use professional 85mm f/1.4 or 135mm f/1.8 lens
   - Wide aperture (f/1.8-f/2.8) for shallow depth of field
   - Tack-sharp subject with beautifully blurred background

4. **Flawless Styling:**
   - Professional makeup application
   - Impeccably styled hair
   - Satin finish skin (not glossy)
   - Show natural skin texture with visible pores
   - No tattoos

5. **Composition:**
   - Full head, hair, and shoulders visible
   - No cropping of head or hair
   - Head-and-shoulders or upper-body framing
   - 1:1 aspect ratio

6. **User Vision:** [USER PROMPT INSERTED HERE]

Output only the final image. No text, descriptions, or commentary.
```

### **5. Results Display**
- Show generated image in a card
- Download button (PNG format)
- Filename: `noir-twin-[timestamp]-[index].png`
- Image displayed as base64 data
- Multiple generations stack vertically (newest first)

### **6. Pricing Tiers & Payment**

**4 tiers with Stripe Payment Links:**

**FREE Tier** ($0/month)
- 2 images per month
- 1080p resolution
- Basic features
- 10 destinations
- No payment required

**PRO Tier** ($27/month)
- 50 images per month
- 4K resolution
- All features
- 30+ destinations
- Cultural wardrobe studio
- Payment link: https://buy.stripe.com/00waEZajo36qgqK5ZJ1kA0c

**VIP Tier** ($97/month) - HIGHLIGHTED
- Unlimited images
- 8K resolution
- Priority processing
- 100+ destinations
- RAW/TIFF export
- API access
- Payment link: https://buy.stripe.com/dRm00lgHM22mcauco71kA0d

**BUSINESS Tier** ($197/month)
- Everything in VIP
- Brand integration
- Commercial rights
- Team accounts (5 users)
- Priority support
- Payment link: https://buy.stripe.com/9B69AV3V05eydey4VF1kA0e

**Pricing Section UI:**
- 4 cards in a grid (responsive, stacks on mobile)
- VIP tier has special highlight (border glow, elevated)
- Each card shows: Name, Price, Feature list, CTA button
- CTA buttons link directly to Stripe payment links
- Free tier button is secondary style (no Stripe link)

---

## 📱 USER FLOW

1. **Landing Page**
   - Hero section with logo and tagline
   - Brief description
   - Upload section visible immediately

2. **Upload Photos**
   - User uploads 1-3 photos
   - Sees preview thumbnails
   - Can re-upload

3. **Enter Prompt**
   - User describes their vision
   - Examples shown as placeholder
   - Optional: Add more detail

4. **Generate**
   - Click "Generate Images" button
   - Button shows loading spinner
   - Text changes to "Generating Your Twin..."
   - Process takes 10-30 seconds

5. **View Results**
   - Generated image appears
   - Download button available
   - Can generate more with same/different prompt

6. **Pricing**
   - Pricing section always visible below
   - User can upgrade anytime
   - Clicks link → Goes to Stripe → Subscribes
   - Returns to app (manual access initially)

---

## 🔐 ENVIRONMENT VARIABLES

**Required:**
- `VITE_API_KEY` = Google Gemini API key
  - Value: AIzaSyDwtURVo6VFL5JEmYPrKKozBHOIuoRofYQ
  - Must be set in Vercel dashboard under Environment Variables

**Security:**
- API key must NOT be committed to Git
- Must be in `.env.local` for local dev
- Must be prefixed with `VITE_` for Vite to expose it

---

## 📂 FILE STRUCTURE

```
noir-twin-studio/
├── public/
│   ├── logo.svg              # Woman silhouette logo
│   └── logo-text.svg         # NOIR TWIN text logo
├── src/
│   ├── components/
│   │   ├── ImageUploader.tsx      # Photo upload with drag/drop
│   │   ├── PromptInput.tsx        # Text area for prompt
│   │   ├── GenerateButton.tsx     # Generate button with loading
│   │   ├── ResultDisplay.tsx      # Show generated images
│   │   └── PricingSection.tsx     # 4-tier pricing cards
│   ├── services/
│   │   └── geminiService.ts       # Gemini API integration
│   ├── styles/
│   │   └── index.css              # All custom CSS
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # React entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tsconfig.node.json             # TypeScript node config
├── vite.config.ts                 # Vite build config
├── .gitignore                     # Git ignore rules
└── README.md                      # Project description
```

---

## 🚀 DEPLOYMENT REQUIREMENTS

**Platform:** Vercel

**GitHub Repo:** 
- https://github.com/mrsantonioj1/noir-twin-studio
- Owner: @mrsantonioj1

**Vercel Project:**
- Already connected to GitHub
- Team: "Deven's projects" (team_7DoxX9rDET0Akj3YQaNVgRns)
- Framework: Vite (auto-detected)

**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

**Environment Variables to Set:**
```
VITE_API_KEY = AIzaSyDwtURVo6VFL5JEmYPrKKozBHOIuoRofYQ
```

---

## ⚠️ CURRENT ISSUE

**Problem:** The `src` folder with all React components is not being pushed to GitHub successfully.

**Symptoms:**
- Build fails with: `error TS18003: No inputs were found in config file`
- TypeScript can't find source files
- Only root files (package.json, index.html, etc.) are in repo
- `src` folder is missing from GitHub

**Likely Causes:**
- GitHub Desktop not pushing folders correctly
- Git configuration issue
- File permissions

**Solution Needed:**
- Ensure complete file structure (including src folder) is pushed to GitHub
- Verify all files are present before Vercel builds
- Test successful deployment

---

## ✅ ACCEPTANCE CRITERIA

**The app is successfully deployed when:**

1. ✅ Vercel build completes successfully (no errors)
2. ✅ Live URL is accessible (noir-twin-studio.vercel.app)
3. ✅ Homepage loads with NOIR TWIN branding
4. ✅ User can upload images
5. ✅ User can enter prompts
6. ✅ Generate button works (shows loading state)
7. ✅ AI generates images (with Gemini API)
8. ✅ Generated images display correctly
9. ✅ Download button works
10. ✅ Pricing section displays all 4 tiers
11. ✅ Stripe payment links work when clicked
12. ✅ Site is responsive on mobile
13. ✅ No console errors
14. ✅ Logo displays correctly

---

## 📦 DELIVERABLES

**Developer should provide:**

1. ✅ Fully deployed app on Vercel
2. ✅ Live URL that works
3. ✅ All source code in GitHub repo
4. ✅ Environment variables configured
5. ✅ Brief testing confirmation
6. ✅ Any deployment notes/issues

**Files already created:**
- Complete source code (8.6KB package)
- All components built
- All styling done
- API integration complete
- Stripe links integrated

**What's needed:**
- Successful Git push to GitHub
- Successful Vercel deployment
- Verification that it works

---

## 🎯 SUCCESS METRICS

**MVP Launch (Week 1-2):**
- App is live and functional
- First 10 users can generate images
- No critical bugs
- Manual payment fulfillment working

**Phase 2 (Month 2):**
- Custom domain (noirtwin.com) connected
- 50+ active users
- Automated tier management
- Analytics tracking

**Phase 3 (Month 3+):**
- User authentication (Clerk/Supabase)
- Usage tracking per tier
- Payment webhooks
- Advanced features

---

## 💰 PAYMENT & FULFILLMENT

**Current Setup (Manual):**
1. User clicks Stripe payment link
2. User subscribes via Stripe
3. Stripe sends confirmation email
4. Owner manually verifies payment
5. Owner manually grants tier access
6. User gets upgraded features

**Future Setup (Automated):**
- Stripe webhooks
- Automatic tier assignment
- Usage limits enforced
- Subscription management

---

## 🆘 SUPPORT CONTACTS

**Project Owner:**
- Name: Deven
- GitHub: @mrsantonioj1
- Business: Radiance Concierge Nursing

**Technical Resources:**
- Gemini API Docs: https://ai.google.dev/docs
- Stripe Docs: https://stripe.com/docs
- Vercel Docs: https://vercel.com/docs
- React Docs: https://react.dev

**Current Challenge:**
- Need help getting `src` folder successfully pushed to GitHub
- Need verification of successful Vercel deployment
- Need confirmation all features work

---

## 📝 ADDITIONAL NOTES

**Brand Context:**
- Owner is a nurse entrepreneur launching luxury healthcare business
- NOIR TWIN is a side venture in AI/tech space
- Target audience: Black women, luxury market
- Cultural authenticity is critical
- Professional, dignified presentation matters

**Business Model:**
- Subscription-based (monthly recurring)
- 4 tiers (Free, Pro, VIP, Business)
- Target: $500+/month revenue by Month 2
- Plan to scale to $5K+/month by Month 6

**Future Features (Not MVP):**
- More aspect ratios (16:9, 9:16, 4:5)
- Video generation
- Batch processing
- Team collaboration
- White-label options
- API for developers
- Mobile app

---

## 🎉 FINAL CHECKLIST FOR DEVELOPER

Before marking complete:
- [ ] All files in GitHub repo (especially `src` folder)
- [ ] Vercel build succeeds
- [ ] Live URL accessible
- [ ] Can upload images
- [ ] Can generate AI images
- [ ] Stripe links work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Logo displays
- [ ] Branding matches (rose gold/champagne)

---

**END OF BRIEF**

**Estimated Time:** 30-60 minutes for experienced developer  
**Difficulty:** Junior/Mid-level (straightforward deployment)  
**Primary Challenge:** Git/GitHub setup  

---

Built for Deven | NOIR TWIN AI STUDIO | For the culture, by the culture 🖤✨
