# Drive AI Sales — Complete Marketing & Lead Generation System

**Owner:** Brandon Rose, CEO — Drive AI Sales Inc.
**Website:** [www.driveaisales.com](https://www.driveaisales.com)
**Live:** [bprofits.github.io/driveai](https://bprofits.github.io/driveai/)

---

## What This Is

A full marketing website and lead generation system for Drive AI Sales, targeting dealership GMs and dealer principals. Built on the StoryBrand framework — the diagnostic creates self-awareness, the nurture sequence builds urgency, and the discovery call is the natural next step.

---

## File Inventory

### Website
| File | URL Target | Purpose |
|---|---|---|
| `index.html` | driveaisales.com | Main marketing site — hero, problem, how it works, proof, CTA |
| `pricing.html` | driveaisales.com/pricing | Plans & pricing page (3 tiers + enterprise + add-ons) |
| `diagnostic.html` | driveaisales.com/diagnostic | 7-question interactive assessment |
| `discovery.html` | driveaisales.com/discovery | Calendar booking page for discovery calls |
| `audit-report.html` | Internal / PDF export | Lead Response Audit one-pager for prospects |

### Email Templates (GHL Coded)
| File | Path | Day | Subject Line |
|---|---|---|---|
| `email-score-delivery.html` | All | 0 (Immediate) | Your Dealership Lead Leak Score: [X/21] |
| **Path A — Took Assessment** |
| `nurture-pathA-email2.html` | A | Day 2 | The 5-minute rule your CRM can't enforce |
| `nurture-pathA-email3.html` | A | Day 4 | "We picked up 11 extra deals in the first month" |
| `nurture-pathA-email4.html` | A+B+C | Day 6 | "My salespeople won't use it" |
| `nurture-pathA-email5.html` | A+B+C | Day 8 | You don't have a CRM problem. You have a speed problem. |
| `nurture-pathA-email6.html` | A+B+C | Day 10 | Let's find out what you're leaving on the table |
| **Path B — Downloaded Resource** |
| `nurture-pathB-email1.html` | B | Day 0 | You downloaded our guide — here's what to do next |
| `nurture-pathB-email2.html` | B | Day 2 | The number that keeps GMs up at night |
| **Path C — Cold Outreach** |
| `nurture-pathC-email1.html` | C | Day 0 | Your leads are calling back — but not you |
| `nurture-pathC-email2.html` | C | Day 2 | I ran a secret audit on 50 dealerships |

### Assets
| Directory | Contents |
|---|---|
| `logo/` | 8 logo variants (wordmark, badge icons, favicons) — small format |
| `banner/` | 8 banner variants at 2048×1152px (social/YouTube) |

---

## Branding

| Token | Hex | Usage |
|---|---|---|
| Black | `#070707` | Page background |
| Dark | `#0E0E0E` | Callout backgrounds |
| Card | `#131313` | Card backgrounds |
| Border | `#242424` | Borders, dividers |
| Orange | `#E87A00` | Primary accent, buttons, "AI" wordmark |
| Orange Dim | `#B85E00` | Hover states |
| Cream | `#F4DEC9` | Body text on dark backgrounds |
| Cream Dim | `#B8956F` | Secondary text |
| White | `#FAFAFA` | Headings |
| Muted | `#5A5550` | Tertiary text, labels |

**Fonts:** Bebas Neue (headlines) + Barlow / Barlow Condensed (body/labels) via Google Fonts. Emails use Arial safe stack.

---

## How It Works

### Funnel Flow

```
Prospect visits driveaisales.com
        │
        ▼
┌──────────���──────────────────┐
│  Marketing Website (index)  │
│  Problem → Solution → Proof │
│  CTA → Diagnostic           │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  7-Question Assessment      │
│  (auto-advance on click,    │
│   progress bar, 2 min)      │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Contact Form               │
│  (name, email, phone,       │
│   dealership, role)         │
└─────────────┬───────────────┘
              │
              ▼
┌────────────────────���────────┐
│  Instant Results Screen     │
│  - Score circle (X/21)      │
│  - Tier name + description  │
│  - Revenue estimate ($X/mo) │
│  - Weakest areas list       │
│  - CTA → Book Discovery    │
└─────────────┬───────────────┘
              │
              ▼ (simultaneously)
┌─────────────────────────────┐
│  POST to GHL Webhook        │
│  → Create/tag contact       │
│  → Store scores             │
│  → Send score email         │
│  → Start nurture sequence   │
└─────────────────────────────┘
```

### Scoring

Each of the 7 questions scores 0-3 points. Total out of 21.

| Score | Tier | Meaning |
|---|---|---|
| 18-21 | The Machine | Top 5%. Minor optimization possible. |
| 12-17 | The Grinder | Good team, cracked process. Biggest ROI segment. |
| 6-11 | The Firefighter | Working hard, losing ground. Needs a system. |
| 0-5 | Code Red | Leads dying in inbox. Massive opportunity. |

### Nurture Paths

| Path | Trigger | Unique Emails | Then Merges Into |
|---|---|---|---|
| A | Completed diagnostic | Score delivery + emails 2-3 | Emails 4-5-6 (shared) |
| B | Downloaded PDF resource | Emails B1-B2 (bridge to diagnostic) | Emails 4-5-6 (shared) |
| C | Cold outreach | Emails C1-C2 (trust from zero) | Emails 4-5-6 (shared) |

Multi-channel per path: Email + SMS + Wanda voicemail drops + LinkedIn connection.

---

## Webhook Payload

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "dealership": "string",
  "role": "GM|DP|SM|BDC|Marketing|Other",
  "totalScore": 0-21,
  "tier": "The Machine|The Grinder|The Firefighter|Code Red",
  "q1_leadResponse": 0-3,
  "q2_followUp": 0-3,
  "q3_showRate": 0-3,
  "q4_staffEfficiency": 0-3,
  "q5_crmUtilization": 0-3,
  "q6_scalability": 0-3,
  "q7_competitive": 0-3,
  "revEstimateLow": "number",
  "revEstimateHigh": "number",
  "weakestAreas": "comma-separated list",
  "source": "diagnostic"
}
```

---

## GHL Custom Values Used in Emails

| GHL Variable | Source | Used In |
|---|---|---|
| `{{contact.first_name}}` | Contact record | All emails |
| `{{custom.totalScore}}` | Webhook payload | Score delivery email |
| `{{custom.tier}}` | Webhook payload | Score delivery email |
| `{{custom.revEstimateLow}}` | Webhook payload | Score delivery + Email 6 P.S. |
| `{{custom.revEstimateHigh}}` | Webhook payload | Score delivery + Email 6 P.S. |
| `{{custom.weakestAreas}}` | Webhook payload | Score delivery email |
| `{{contact.unsubscribe_link}}` | GHL system | All email footers |

---

## Setup Checklist

- [ ] Create GHL webhook for diagnostic form submissions
- [ ] Replace `WEBHOOK_URL_HERE` in `diagnostic.html` with actual webhook URL
- [ ] Create GHL custom fields: totalScore, tier, revEstimateLow, revEstimateHigh, weakestAreas, q1-q7 scores
- [ ] Create GHL workflow: webhook trigger → create contact → tag tier → store scores → send score email → start drip
- [ ] Create GHL calendar for discovery calls
- [ ] Replace calendar embed placeholder in `discovery.html` with actual GHL calendar iframe
- [ ] Point driveaisales.com domain to GitHub Pages (CNAME)
- [ ] Create 10 GHL coded email templates (score delivery + 6 Path A + 2 Path B + 2 Path C)
- [ ] Set up SMS parallel touches (Days 0, 6, 10)
- [ ] Configure Wanda voicemail drop (Day 4)
- [ ] Set up LinkedIn connection automation (Day 8)
- [ ] Build monthly re-engagement sequence (seasonal hooks)
- [ ] Build referral email (Day 30 post-client-win)
- [ ] Create Lead Response Audit PDF template from audit-report.html

---

## Anti-Spam

The diagnostic form includes:
- **Honeypot field** (hidden "company" input — bots fill it, humans don't)
- **Time check** (form rejects submissions within 4 seconds of page load)
- **addEventListener binding** (no inline onclick — safe for embedding)

---

*Built by Claudette for Bond. Copy from the StoryBrand playbook. Replace [brackets] with real data as it becomes available.*
