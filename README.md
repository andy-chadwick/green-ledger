# The Green Ledger

**An independent, evidence-based analysis of the Green Party UK's 2024 General Election manifesto.**

The Green Ledger examines 14 of the Green Party's most significant policy commitments, presenting a fair and balanced case for each — what they get right, where the international evidence raises serious concerns, and what the cumulative cost to Britain could be in best and worst case scenarios.

The site is deliberately balanced. Every policy section includes a genuine acknowledgement of what the Green Party gets right before presenting the counter-evidence. The goal is not a partisan attack but a rigorous, data-driven resource that is useful for voters, journalists, researchers, and anyone who wants to have an informed debate.

---

## What the Site Does

- **14 policy deep-dives** covering economy, defence, energy, housing, work, welfare, transport, immigration, education, environment, foreign policy, and health
- **Four-tab analysis** for each policy:
  - **The Promise** — the Green Party's stated position and claimed benefits
  - **The Evidence** — charts, international case studies, and data from the IFS, ONS, NIESR, SIPRI, NBER, Audit Scotland, and DEFRA
  - **They Say / We Say** — structured point-counterpoint debate: the most common Green Party arguments, each answered with evidence-backed rebuttals
  - **The Verdict** — risk scores across fiscal, economic, and social dimensions
- **Interactive Policy Cost Calculator** — a sticky bottom drawer that lets users toggle policies on and off and switch between best and worst case fiscal scenarios, with a live running total and social impact bars for security, inequality, and public services
- **Filter and search** — filter all 14 policies by category (Economy, Defence, Energy, etc.) or by risk level (Critical, High, Medium, Low)

---

## The 14 Policies Analysed

| # | Policy | Risk Level |
|---|---|---|
| 1 | Wealth Tax & Tax Reform | High |
| 2 | Abolish Trident (Nuclear Deterrent) | Critical |
| 3 | Nuclear Energy Phase-Out | High |
| 4 | Nationalisation (Water, Rail, Energy) | High |
| 5 | Rent Controls & Housing | High |
| 6 | Four-Day Week & £15 Minimum Wage | Medium |
| 7 | Universal Basic Income | High |
| 8 | Aviation Restrictions | Medium |
| 9 | Immigration & Asylum | Medium |
| 10 | Abolish Tuition Fees | Medium |
| 11 | Carbon Tax | High |
| 12 | Re-joining the EU | Medium |
| 13 | 30% Land Set-Aside for Nature | Medium |
| 14 | Free Personal Care | Medium |

---

## Key International Case Studies Used

- **Norway & France** — wealth tax capital flight (2022-2023 Norwegian exodus of billionaires)
- **Germany** — nuclear phase-out (Energiewende), resulting in higher energy prices and increased coal dependency
- **Scotland** — rent controls (Housing (Scotland) Act 2022), which reduced rental supply by 13% in Edinburgh
- **Ukraine** — nuclear disarmament (Budapest Memorandum 1994) and the consequences of losing deterrence
- **France** — domestic flight ban (2023), which affected only 3 routes and cut emissions by less than 1%
- **Finland & Denmark** — UBI pilots and their fiscal limitations
- **Australia & British Columbia** — carbon tax design and economic impact

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | Wouter |
| Build Tool | Vite 7 |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (`npm install -g pnpm`) — or use npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
green-ledger/
├── client/
│   ├── index.html                    # HTML entry point with Google Fonts
│   └── src/
│       ├── lib/
│       │   └── policyData.ts         # ★ All 14 policies: arguments, counter-arguments,
│       │                             #   chart data, case studies, debate points, calculator figures
│       ├── components/
│       │   ├── PolicyModal.tsx        # ★ 4-tab expandable modal for each policy
│       │   ├── PolicyCard.tsx         # Grid card with risk dial and category badge
│       │   └── CostCalculator.tsx     # ★ Sticky bottom calculator with toggles and impact bars
│       ├── pages/
│       │   └── Home.tsx              # Full page layout: hero, filter bar, policy grid
│       ├── index.css                 # Design system: dark green palette, typography, tokens
│       └── App.tsx                   # Root component and routing
├── server/
│   └── index.ts                      # Minimal Express server for production static serving
├── package.json
├── vite.config.ts
└── tsconfig.json
```

The three files marked ★ contain the vast majority of the site's content and logic. If you want to edit policy content, debate arguments, or calculator figures, `policyData.ts` is the single source of truth.

---

## Editing Policy Content

All policy data lives in `client/src/lib/policyData.ts`. Each policy object follows this structure:

```typescript
{
  id: string,                    // unique slug e.g. 'wealth-tax'
  number: number,                // display number 1-14
  icon: string,                  // emoji icon
  title: string,                 // policy name
  category: string,              // Economy | Defence | Energy | etc.
  riskScore: number,             // 1-10
  riskLevel: 'critical' | 'high' | 'medium' | 'low',
  greenClaim: string,            // The Green Party's stated position
  summary: string,               // One-line summary for the card
  positives: string[],           // What the Green Party gets right
  counterNarrative: string,      // Opening paragraph of the counter-argument
  evidence: EvidenceItem[],      // Charts, case studies, data points
  debatePoints: DebatePoint[],   // They Say / We Say pairs
  verdict: VerdictItem[],        // Risk score breakdown
  bestCaseGBP: number,           // Best case fiscal impact in GBP
  worstCaseGBP: number,          // Worst case fiscal impact in GBP
  securityImpact: number,        // -5 to +5
  inequalityImpact: number,      // -5 to +5
  servicesImpact: number,        // -5 to +5
}
```

---

## Data Sources

All claims are sourced from publicly available research. Key sources include:

- **Institute for Fiscal Studies (IFS)** — ifs.org.uk
- **Office for National Statistics (ONS)** — ons.gov.uk
- **National Institute of Economic and Social Research (NIESR)** — niesr.ac.uk
- **Stockholm International Peace Research Institute (SIPRI)** — sipri.org
- **National Bureau of Economic Research (NBER)** — nber.org
- **Audit Scotland** — audit.scot
- **Department for Environment, Food & Rural Affairs (DEFRA)** — gov.uk/defra
- **Tax Policy Associates** — taxpolicy.org.uk
- **Resolution Foundation** — resolutionfoundation.org
- **Green Party 2024 General Election Manifesto** — greenparty.org.uk

---

## Licence

This project is released for public use. The analysis represents the authors' interpretation of publicly available evidence and is intended to inform democratic debate. It does not constitute financial, legal, or political advice.
