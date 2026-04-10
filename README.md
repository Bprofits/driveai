# Drive AI Sales — Lead Magnet & Nurture System

**Owner:** Brandon Rose, CEO — Drive AI Sales Inc.
**Website:** www.driveaisales.com
**Built:** 2026-04-10

---

## What This Is

A complete lead generation and nurture system for Drive AI Sales, targeting dealership GMs and dealer principals. Built on the StoryBrand framework — the diagnostic creates self-awareness, the nurture sequence builds urgency, and the discovery call is the natural next step.

---

## Files

### Lead Magnet
| File | Purpose |
|---|---|
| `diagnostic.html` | 7-question interactive assessment — "The Dealership Lead Leak Diagnostic" |

### Email Templates (GHL Coded Templates)
| File | Sequence | Day | Subject Line |
|---|---|---|---|
| `email-score-delivery.html` | All Paths | 0 (Immediate) | Your Dealership Lead Leak Score: [X/21] |
| `nurture-pathA-email2.html` | Path A | Day 2 | The 5-minute rule your CRM can't enforce |
| `nurture-pathA-email3.html` | Path A | Day 4 | "We picked up 11 extra deals in the first month" |
| `nurture-pathA-email4.html` | Path A (shared) | Day 6 | "My salespeople won't use it" |
| `nurture-pathA-email5.html` | Path A (shared) | Day 8 | You don't have a CRM problem. You have a speed problem. |
| `nurture-pathA-email6.html` | Path A | Day 10 | Let's find out what you're leaving on the table |

### Pages
| File | URL Target | Purpose |
|---|---|---|
| `discovery.html` | driveaisales.com/discovery | Calendar booking page for discovery calls |
| `audit-report.html` | Internal / PDF export | Lead Response Audit one-pager sent to prospects |

---

## How It Works

### Flow

```
Prospect visits driveaisales.com/diagnostic
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
┌─────────────────────────────┐
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
│  (all scores + contact info │
│   + tier + revenue estimate │
│   + weakest areas)          │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  GHL Workflow Triggers      │
│                             │
│  1. Create/update contact   │
│  2. Tag with tier           │
│     (machine/grinder/       │
│      firefighter/code-red)  │
│  3. Store scores as custom  │
│     fields                  │
│  4. Send score delivery     │
│     email (immediate)       │
│  5. Start nurture sequence  │
│     (6 emails over 10 days) │
└─────────────────────────────┘
```

### Scoring

Each of the 7 questions scores 0-3 points. Total out of 21.

| Score | Tier | Meaning |
|---|---|---|
| 18-21 | The Machine | Top 5%. Already ahead. Minor optimization possible. |
| 12-17 | The Grinder | Good team, cracked process. Biggest ROI segment for Drive AI. |
| 6-11 | The Firefighter | Working hard, losing ground. Needs a system underneath the team. |
| 0-5 | Code Red | Leads dying in inbox. Massive gap = massive opportunity. |

### Revenue Estimate Formula

Conservative estimates based on industry benchmarks (avg deal profit $2,500-4,000, close rate 20-25%):

| Gap Area | If Score < 3 | Monthly Revenue Leak |
|---|---|---|
| Q1: Lead Response Speed | +$8,000-15,000 | Biggest after show rate |
| Q2: Follow-Up Consistency | +$5,000-10,000 | |
| Q3: Appointment Show Rate | +$10,000-20,000 | **Biggest lever** |
| Q4: Staff Efficiency | +$3,000-5,000 | |
| Q5: CRM Utilization | +$3,000-5,000 | |
| Q6: Scalability | +$3,000-5,000 | |
| Q7: Competitive Positioning | +$3,000-5,000 | |

---

## Nurture Paths

### Path A: Took the Assessment (has score)
They've already engaged deeply and know their gaps. Emails build on that self-awareness.

| Day | Email | Parallel Touches |
|---|---|---|
| 0 | Score delivery + "here's what's coming" | SMS confirming score |
| 2 | Problem + Solution (5-minute rule) | |
| 4 | Social Proof (11 extra deals) | Wanda voicemail drop |
| 6 | Objection killer (salespeople won't use it) | SMS "did you see my last email?" |
| 8 | Paradigm shift (CRM ≠ engine) | LinkedIn connection from Bond |
| 10 | The Ask (20-minute discovery call) | SMS with calendar link |

### Path B: Downloaded Resource (no score yet)
Email 1 bridges them to the diagnostic. Emails 3-6 shared with Path A.

### Path C: Cold Outreach (no prior engagement)
Trust from zero. Each email designed to stand alone. Emails 3-6 shared with Path A.

---

## Webhook Payload

The diagnostic form POSTs the following JSON to the GHL webhook:

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
  "revEstimateLow": number,
  "revEstimateHigh": number,
  "weakestAreas": "comma-separated list",
  "source": "diagnostic"
}
```

---

## GHL Custom Values Used in Emails

These must exist as custom fields in GHL for the email templates to work:

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
- [ ] Host diagnostic on driveaisales.com/diagnostic (or GitHub Pages)
- [ ] Host discovery page on driveaisales.com/discovery
- [ ] Create 7 GHL coded email templates (score delivery + 6 nurture)
- [ ] Set up SMS parallel touches (Days 0, 6, 10)
- [ ] Configure Wanda voicemail drop (Day 4)
- [ ] Set up LinkedIn connection automation (Day 8)
- [ ] Build Path B and Path C email variants (Emails 1-2 differ; 3-6 shared)
- [ ] Build monthly re-engagement sequence (seasonal hooks)
- [ ] Build referral email (Day 30 post-client-win)
- [ ] Create Lead Response Audit PDF template from audit-report.html

---

## Branding

| Element | Value |
|---|---|
| Primary color | `#0066FF` (electric blue) |
| Background | `#0a0a0a` (near black) |
| Card background | `#111111` |
| Input fields | `#1a1a1a` bg, `#333` border |
| Text | `#e0e0e0` body, `#ffffff` headings, `#888` secondary |
| Accent (danger/revenue) | `#FF4444` |
| Accent (success) | `#00CC66` |
| Font stack | 'Segoe UI', Arial, Helvetica, sans-serif |

---

## Anti-Spam

The diagnostic form includes:
- **Honeypot field** (hidden "company" input — bots fill it, humans don't)
- **Time check** (form rejects submissions within 4 seconds of page load)
- **addEventListener binding** with retry (no inline onclick — safe for embedding)

---

*Built by Claudette for Bond. All copy from the StoryBrand playbook. Replace [brackets] with real data as it becomes available.*
