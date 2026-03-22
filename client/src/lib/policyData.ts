// THE GREEN LEDGER — Policy Data
// All 14 Green Party UK policies with evidence, debate content, and chart data

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DebatePoint {
  theySay: string;
  weSay: string;
}

export interface CaseStudy {
  country: string;
  flag: string;
  title: string;
  description: string;
  outcome: string;
  year: string;
  chartData?: ChartData;
  sources?: Array<{ label: string; url: string }>;
}

export interface ChartData {
  type: 'bar' | 'line' | 'comparison';
  title: string;
  data: Array<{ label: string; value: number; color?: string }>;
  unit: string;
  source: string;
}

export interface RiskScore {
  fiscal: number;    // 0-10
  economic: number;  // 0-10
  social: number;    // 0-10
}

export interface Policy {
  id: string;
  number: number;
  title: string;
  icon: string;
  category: string;
  riskLevel: RiskLevel;
  greenClaim: string;
  greenClaimAmount?: string;
  summary: string;
  positives: string[];
  counterArgument: string;
  keyStats: Array<{
    label: string;
    value: string;
    context: string;
    comparison?: string;
    direction?: 'positive' | 'negative' | 'neutral';
  }>;
  manifestoRef?: {
    section: string;
    page?: string;
    url: string;
  };
  caseStudies: CaseStudy[];
  chartData: ChartData;
  debate: DebatePoint[];
  riskScore: RiskScore;
  verdict: string;
  sources: Array<{ label: string; url: string }>;
  // Calculator data
  bestCaseGBP: number;   // positive = saves/raises, negative = costs
  worstCaseGBP: number;
  securityImpact: number; // -5 to +5
  securityReason: string;
  inequalityImpact: number; // -5 (worse) to +5 (better)
  inequalityReason: string;
  servicesImpact: number; // -5 to +5
  servicesReason: string;
  // Card preview — the single most compelling stat for why this policy is risky
  headlineStat: { value: string; label: string };
}

export const policies: Policy[] = [
  {
    id: 'wealth-tax',
    number: 1,
    title: 'Wealth Tax & Tax Reform',
    icon: '£',
    category: 'Economy',
    riskLevel: 'high',
    greenClaim: 'A 1–2% annual wealth tax on assets over £10m, aligning CGT with income tax, will raise £50–70bn per year.',
    greenClaimAmount: '£50–70bn raised',
    summary: 'The Green Party proposes an annual wealth tax on the richest individuals, claiming it will fund a transformation of public services. International evidence tells a different story.',
    positives: [
      'Addresses genuine wealth inequality — the top 1% own more than the bottom 70% combined.',
      'Aligning CGT with income tax simplifies the tax system and closes a well-known loophole.',
      'Could fund meaningful investment in public services if revenue targets are met.',
    ],
    counterArgument: 'Wealth taxes have a poor international track record. Norway raised its wealth tax by just 0.25 percentage points in 2022 — and lost $54bn in capital as 82 ultra-wealthy individuals relocated to Switzerland. France ran its ISF wealth tax for 35 years before President Macron abolished it in 2017, after economists calculated it caused €200bn in capital flight and cost France nearly twice as much as it raised. Of the 14 OECD countries that once had wealth taxes, 12 have since abolished them. The IFS concluded the overall Green Party fiscal plan would increase borrowing by £80bn per year, not reduce it.',
    keyStats: [
      { label: 'Norway: Actual net revenue loss', value: '-$594m', context: 'after $54bn in capital fled the country (expected gain was just $146m)', comparison: '4\u00D7 the expected gain, wiped out in capital flight', direction: 'negative' },
      { label: 'France: Capital flight over ISF lifetime', value: '€200bn', context: 'Economist Eric Pichet\'s estimate (1988–2017)', comparison: "Roughly France's entire annual defence budget", direction: 'negative' },
      { label: 'IFS projected borrowing increase', value: '£80bn/yr', context: 'under full Green Party fiscal plan', comparison: 'Roughly equal to the entire UK education budget', direction: 'negative' },
      { label: 'UK income gap after tax and benefits', value: '3.7×', context: 'top vs bottom 20% after redistribution (ONS 2022) — down from ~14× before tax', comparison: 'The tax system already compresses a 14:1 gap to under 4:1', direction: 'positive' },
    ],
    manifestoRef: { section: 'A Fairer Economy', page: 'pp. 22-25', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Norway',
        flag: '🇳🇴',
        title: 'The Norwegian Exodus',
        description: 'In 2022, Norway raised its wealth tax by just 0.25 percentage points to 1.1%. A record number of billionaires and multimillionaires relocated to Switzerland and other low-tax countries.',
        outcome: '82 ultra-wealthy individuals left, taking $54bn in assets. Expected gain: $146m. Actual net loss: $594m.',
        year: '2022–2023',
        sources: [{ label: 'Reuters: Norway Wealth Tax', url: 'https://www.reuters.com/business/norways-wealth-tax-trades-millionaires-equality-2025-11-24/' }],
      },
      {
        country: 'France',
        flag: '🇫🇷',
        title: 'France Abolishes Its Wealth Tax',
        description: 'France\'s ISF wealth tax ran for decades but was abolished by President Macron in 2017. Economist Eric Pichet calculated it caused €200bn in capital flight and cost France nearly twice as much as it raised.',
        outcome: 'France abolished the tax. GDP growth improved. The lesson: in open economies, wealth taxes reliably underperform.',
        year: '1982–2017',
        sources: [{ label: 'Pichet (2016): France ISF Analysis', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2774679' }],
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        title: 'We Already Redistribute More Than Almost Anyone',
        description: 'Before a single penny of tax is collected, the top 20% of UK households earn about 14 times more than the bottom 20%. That sounds extreme. But here is what actually happens next: the tax and benefits system takes that 14:1 gap and crushes it down to 3.7:1. For every £14 the top earns pre-tax, they take home £3.70 for every £1 the bottom receives after all taxes and benefits. The Gini coefficient, the standard measure of inequality, drops from 50.1% to 29.8%. That is a 20.3 percentage point reduction. The UK already runs one of the most aggressive redistribution systems in the developed world. The idea that "the rich just keep getting richer" while nothing is being done is simply not what the ONS data shows. The system is already working hard. The question the Green Party needs to answer is: if you make it even more aggressive, and the people paying the most tax leave the country (as they did in Norway and France), who funds the redistribution then?',
        outcome: 'The Green Party is not proposing redistribution where none exists. They are proposing to make an already aggressive system even more aggressive, in a way that Norway and France both tried and both abandoned. The risk is not that the rich pay too little. It is that if you push too hard, they stop paying anything at all, because they leave.',
        year: '1977–2022',
        chartData: {
          type: 'bar',
          title: 'UK Income Ratio: Top 20% vs Bottom 20% (ONS 2022)',
          data: [
            { label: 'Before Tax & Benefits', value: 14, color: '#ef4444' },
            { label: 'After Direct Taxes', value: 8, color: '#f59e0b' },
            { label: 'After All Tax & Benefits', value: 3.7, color: '#22c55e' },
          ],
          unit: '× ratio',
          source: 'ONS Effects of Taxes and Benefits on Household Income, FYE 2022',
        },
        sources: [
          { label: 'ONS: Effects of Taxes and Benefits on Household Income (FYE 2022)', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/theeffectsoftaxesandbenefitsonhouseholdincome/financialyearending2022' },
          { label: 'ONS: Taxes and Benefits Historical Datasets (1977–2018)', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/datasets/theeffectsoftaxesandbenefitsonhouseholdincomehistoricaldatasets' },
          { label: 'HMRC: Percentile Points for Income Before and After Tax (1993–2023)', url: 'https://www.gov.uk/government/statistics/percentile-points-from-1-to-99-for-total-income-before-and-after-tax' },
        ],
      },
    ],
    chartData: {
      type: 'comparison',
      title: 'Norway Wealth Tax: Projected vs. Actual Revenue Impact ($m)',
      data: [
        { label: 'Expected Gain', value: 146, color: '#4ade80' },
        { label: 'Actual Net Loss', value: -594, color: '#ef4444' },
      ],
      unit: '$m',
      source: 'Reuters / Norwegian Tax Authority 2023',
    },
    debate: [
      {
        theySay: 'The wealthiest 1% own more than the bottom 70% combined. A modest 1–2% levy is a small ask from those who have benefited most.',
        weSay: 'The appeal to fairness is understandable, but the mechanism is fatally flawed. Norway tried exactly this and lost $54bn in wealth. The tax raised $146m but cost $594m in net revenue. The wealthy have the means and advisers to move. The UK cannot build a wall around capital.',
      },
      {
        theySay: 'France\'s wealth tax raised billions for years. The idea that it doesn\'t work is a myth spread by those who benefit from the status quo.',
        weSay: 'France\'s own economists disagree. Eric Pichet calculated the ISF caused €200bn in capital flight and cost France almost twice as much in lost revenue as it generated. That is why President Macron — a centrist — abolished it in 2017.',
      },
      {
        theySay: 'We would introduce robust anti-avoidance measures and work internationally to close loopholes.',
        weSay: '12 of the 14 OECD countries that once had wealth taxes have since abolished them, citing administrative complexity, low yields, and capital flight. The UK would be attempting something the vast majority of comparable nations have already tried and abandoned.',
      },
      {
        theySay: 'The rich are getting richer while everyone else struggles. The current system clearly isn\'t working.',
        weSay: 'Look at the ONS data. Before any tax is collected, the top 20% earn about 14 times more than the bottom 20%. After the current tax and benefits system does its work, that gap falls to just 3.7 times. The Gini drops from 50.1% to 29.8%. That is not a system that is doing nothing. That is one of the most aggressive redistribution machines in the developed world, already running. The Green Party is not proposing to start redistributing. They are proposing to push a system that is already working hard even further, using a mechanism that Norway and France both tried and both abandoned because it drove the very people who fund the redistribution out of the country. If the top earners leave, the 3.7:1 ratio does not get better. It gets worse, because the money that was being redistributed disappears with them.',
      },
    ],
    riskScore: { fiscal: 9, economic: 8, social: 3 },
    verdict: 'The intention to reduce inequality is legitimate. The mechanism is not. International evidence overwhelmingly shows that annual wealth taxes in open economies drive capital flight and raise less than projected. Meanwhile, ONS data shows the UK tax system already compresses the income gap from 14:1 to 3.7:1 after redistribution. The risk is not that nothing is being done, it\'s that a wealth tax could undermine the very system that is doing the heavy lifting, by driving the highest-paying taxpayers out of the country.',
    sources: [
      { label: 'IFS: Green Party Manifesto Reaction', url: 'https://ifs.org.uk/articles/green-party-manifesto-reaction' },
      { label: 'Reuters: Norway Wealth Tax', url: 'https://www.reuters.com/business/norways-wealth-tax-trades-millionaires-equality-2025-11-24/' },
      { label: 'Pichet (2016): France ISF Analysis', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2774679' },
      { label: 'ONS: Effects of Taxes and Benefits on Household Income (FYE 2022)', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/theeffectsoftaxesandbenefitsonhouseholdincome/financialyearending2022' },
      { label: 'ONS: Taxes and Benefits Historical Datasets (1977–2018)', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/datasets/theeffectsoftaxesandbenefitsonhouseholdincomehistoricaldatasets' },
      { label: 'HMRC: Percentile Points for Income Before and After Tax (1993–2023)', url: 'https://www.gov.uk/government/statistics/percentile-points-from-1-to-99-for-total-income-before-and-after-tax' },
      { label: 'HMRC: Shares of Income and Tax by Percentile Group', url: 'https://www.gov.uk/government/statistics/shares-of-total-income-before-and-after-tax-and-income-tax-for-percentile-groups' },
    ],
    bestCaseGBP: 20000000000,
    worstCaseGBP: -30000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: 1,
    inequalityReason: "Intent to reduce inequality is genuine, but capital flight limits effectiveness.",
    servicesImpact: -1,
    servicesReason: "Revenue shortfall from capital flight means promised service funding won't materialise.",
    headlineStat: { value: '-$594m', label: 'Net revenue loss when Norway tried this' },
  },
  {
    id: 'trident',
    number: 2,
    title: 'Abolish Trident',
    icon: '☢',
    category: 'Defence',
    riskLevel: 'critical',
    greenClaim: 'Cancel Trident, sign the UN nuclear weapons ban treaty, and dismantle all UK nuclear weapons.',
    greenClaimAmount: '£3bn/yr saved',
    summary: 'The Green Party would unilaterally disarm the UK\'s nuclear deterrent. In a world where Russia has invaded Ukraine and China is rapidly expanding its nuclear arsenal, this represents an existential security gamble.',
    positives: [
      'Cancelling Trident would free up £3bn+ per year in defence spending.',
      'Aligns with global disarmament goals and the UN Treaty on the Prohibition of Nuclear Weapons.',
      'Removes the moral burden of possessing weapons of mass destruction.',
    ],
    counterArgument: 'Unilateral disarmament would severely compromise UK national security and its standing within NATO. The clearest warning comes from Ukraine, which surrendered 1,900 nuclear warheads in 1994 under the Budapest Memorandum in exchange for written security assurances from Russia, the US, and the UK. Russia invaded in 2014 and launched a full-scale war in 2022 — the assurances proved worthless. Meanwhile, Russia maintains ~6,000 warheads and is actively modernising, while China is rapidly expanding its arsenal. In this environment, the UK\'s nuclear deterrent is not a luxury — it is the ultimate guarantor of sovereignty.',
    keyStats: [
      { label: 'Ukraine warheads surrendered (1994)', value: '1,900', context: 'world\'s third-largest arsenal, given up for written assurances', comparison: 'More than the UK, France, and China combined at the time', direction: 'negative' },
      { label: 'Russia nuclear warheads (2024)', value: '~6,000', context: 'actively modernising — largest arsenal in the world', comparison: 'Enough to destroy civilisation several times over', direction: 'negative' },
      { label: 'UK nuclear warheads', value: '225', context: 'minimum credible deterrent — smallest of the P5 states', comparison: 'The smallest arsenal of any P5 state \u2014 already minimal', direction: 'neutral' },
      { label: 'Dreadnought replacement cost', value: '£31bn', context: 'spread over two decades (~£1.5bn/yr)', comparison: 'About \u00A31.50 per person per week over 20 years', direction: 'neutral' },
    ],
    manifestoRef: { section: 'Peace and Defence', page: 'pp. 42-43', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Ukraine',
        flag: '🇺🇦',
        title: 'The Budapest Memorandum Warning',
        description: 'In 1994, Ukraine surrendered the world\'s third-largest nuclear arsenal in exchange for written security assurances from the US, UK, and Russia under the Budapest Memorandum.',
        outcome: 'Russia invaded Ukraine in 2014 (Crimea) and launched a full-scale war in 2022. The assurances proved worthless. States without nuclear deterrents are demonstrably more vulnerable to coercion.',
        year: '1994–2022',
        sources: [
          { label: 'Budapest Memorandum (Arms Control Association)', url: 'https://www.armscontrol.org/factsheets/ukraine-nuclear-weapons-and-security-assurances-glance' },
          { label: 'SIPRI Yearbook 2024', url: 'https://www.sipri.org/yearbook/2024' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'Nuclear Warhead Stockpiles: Key States (2024)',
      data: [
        { label: 'Russia', value: 5889, color: '#ef4444' },
        { label: 'USA', value: 5244, color: '#3b82f6' },
        { label: 'China', value: 500, color: '#f59e0b' },
        { label: 'UK', value: 225, color: '#22c55e' },
        { label: 'France', value: 290, color: '#8b5cf6' },
      ],
      unit: 'warheads',
      source: 'SIPRI Yearbook 2024',
    },
    debate: [
      {
        theySay: 'Trident costs over £3bn a year. That money could fund thousands of nurses and teachers.',
        weSay: 'The Dreadnought programme costs ~£1.5bn per year spread over two decades — less than 0.2% of total government spending. No amount of nurses or teachers can substitute for the function of a nuclear deterrent. The question is not whether we can afford it; it is whether we can afford not to have it.',
      },
      {
        theySay: 'Nuclear weapons are immoral weapons of mass destruction. No civilised country should possess them.',
        weSay: 'Ukraine made a similar moral calculation in 1994 and gave up the world\'s third-largest nuclear arsenal. Russia invaded in 2022. Moral arguments are cold comfort when facing an adversary that does not share them.',
      },
      {
        theySay: 'We would work within NATO to pursue multilateral disarmament.',
        weSay: 'Russia possesses ~6,000 nuclear warheads and is actively modernising. China is rapidly expanding. North Korea continues to develop ICBMs. There is no credible pathway to multilateral disarmament. Unilateral disarmament is not a peace strategy; it is a security gamble with 67 million lives.',
      },
    ],
    riskScore: { fiscal: 2, economic: 2, social: 10 },
    verdict: 'This is the single most dangerous policy in the manifesto. The Ukraine precedent demonstrates with devastating clarity what happens to states that surrender nuclear deterrence without binding mutual defence guarantees. In the current geopolitical environment, unilateral disarmament is not a peace policy — it is an invitation.',
    sources: [
      { label: 'SIPRI Yearbook 2024', url: 'https://www.sipri.org/yearbook/2024' },
      { label: 'Budapest Memorandum (Arms Control Association)', url: 'https://www.armscontrol.org/factsheets/ukraine-nuclear-weapons-and-security-assurances-glance' },
      { label: 'House of Commons Library: Trident Cost', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-8166/' },
    ],
    bestCaseGBP: 3000000000,
    worstCaseGBP: -500000000000,
    securityImpact: -5,
    securityReason: "Unilateral nuclear disarmament removes the UK's ultimate security guarantee.",
    inequalityImpact: 0,
    inequalityReason: "No meaningful impact on inequality.",
    servicesImpact: 1,
    servicesReason: "Frees up £3bn/yr in defence spending for other services.",
    headlineStat: { value: '1,900', label: 'Warheads Ukraine gave up — then Russia invaded' },
  },
  {
    id: 'nuclear-energy',
    number: 3,
    title: 'Nuclear Energy Phase-Out',
    icon: '⚡',
    category: 'Energy',
    riskLevel: 'high',
    greenClaim: 'Phase out all nuclear power, describing it as unsafe and more expensive than renewables.',
    greenClaimAmount: 'Renewables cheaper',
    summary: 'The Green Party would close all nuclear power stations. Germany tried this and paid $12bn per year in social costs as coal replaced nuclear. Nuclear is statistically one of the safest energy sources ever developed.',
    positives: [
      'Eliminates risks associated with radioactive waste disposal over thousands of years.',
      'Removes the possibility of catastrophic accidents, however rare.',
      'Forces complete transition to renewable energy sources.',
    ],
    counterArgument: 'Nuclear provides reliable, low-carbon baseload electricity 24/7 — and is statistically one of the safest energy sources ever developed, causing just 0.03 deaths per TWh compared to 24.6 for coal. Germany completed its nuclear phase-out in April 2023, and a peer-reviewed NBER study found the lost nuclear capacity was replaced primarily by coal, imposing $12bn per year in social costs — over 70% from increased air pollution deaths. Germany now has the highest electricity prices in Europe. The Green Party\'s own climate goals are directly undermined by this policy.',
    keyStats: [
      { label: 'Germany phase-out social cost', value: '$12bn/yr', context: 'NBER study — 70% from air pollution deaths', comparison: 'More than Germany spends on renewable subsidies annually', direction: 'negative' },
      { label: 'Nuclear deaths per TWh', value: '0.03', context: 'comparable to wind and solar — 820x safer than coal', comparison: "You're 820\u00D7 more likely to die from coal power", direction: 'positive' },
      { label: 'Nuclear capacity factor', value: '~90%', context: 'vs 35-45% offshore wind, 25% solar', comparison: 'Nuclear runs 24/7; wind turbines sit idle most of the time', direction: 'positive' },
      { label: 'Coal deaths per TWh', value: '24.6', context: 'the energy source that fills the gap when nuclear closes', comparison: 'One coal plant kills more people per year than Chernobyl did', direction: 'negative' },
    ],
    manifestoRef: { section: 'Energy and Climate', page: 'pp. 14-16', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Germany',
        flag: '🇩🇪',
        title: 'Germany\'s $12bn Mistake',
        description: 'Germany completed its nuclear phase-out in April 2023. A peer-reviewed NBER study found that lost nuclear electricity was replaced primarily by coal-fired generation.',
        outcome: 'Social cost estimated at $12bn per year. Over 70% of the cost came from increased mortality risk due to local air pollution from coal burning. Germany\'s electricity prices became the highest in Europe.',
        year: '2011–2023',
        sources: [
          { label: 'NBER: Private and External Costs of Germany\'s Nuclear Phase-Out', url: 'https://www.nber.org/papers/w26598' },
          { label: 'Our World in Data: Safest Energy Sources', url: 'https://ourworldindata.org/safest-sources-of-energy' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'Deaths per Terawatt-Hour by Energy Source',
      data: [
        { label: 'Coal', value: 24.6, color: '#374151' },
        { label: 'Oil', value: 18.4, color: '#6b7280' },
        { label: 'Gas', value: 2.8, color: '#9ca3af' },
        { label: 'Wind', value: 0.04, color: '#60a5fa' },
        { label: 'Nuclear', value: 0.03, color: '#22c55e' },
        { label: 'Solar', value: 0.02, color: '#fbbf24' },
      ],
      unit: 'deaths/TWh',
      source: 'Our World in Data / Ritchie (2020)',
    },
    debate: [
      {
        theySay: 'Nuclear power is dangerous and produces radioactive waste that lasts thousands of years. We should invest in wind and solar instead.',
        weSay: 'Nuclear produces 0.03 deaths per TWh — comparable to wind and solar, and 820 times safer than coal. Germany\'s nuclear phase-out led to increased coal burning, causing $12bn in social costs per year according to NBER research. The fear of nuclear is not supported by the mortality data.',
      },
      {
        theySay: 'Renewables are now cheaper than nuclear. We don\'t need it.',
        weSay: 'Renewables are cheaper per MWh in ideal conditions, but they are intermittent. Nuclear provides ~90% capacity factor versus 35-45% for offshore wind. Replacing nuclear with renewables requires massive investment in grid-scale battery storage and backup generation — costs rarely included in simple cost-per-MWh comparisons.',
      },
    ],
    riskScore: { fiscal: 5, economic: 7, social: 6 },
    verdict: 'Phasing out nuclear power is demonstrably counterproductive for both climate and public health goals. Germany\'s experience is the clearest possible warning. The Green Party\'s own climate objectives are undermined by this policy, which would increase reliance on fossil fuel backup generation and raise electricity prices.',
    sources: [
      { label: 'NBER: Private and External Costs of Germany\'s Nuclear Phase-Out', url: 'https://www.nber.org/papers/w26598' },
      { label: 'Our World in Data: Safest Energy Sources', url: 'https://ourworldindata.org/safest-sources-of-energy' },
    ],
    bestCaseGBP: 0,
    worstCaseGBP: -15000000000,
    securityImpact: -2,
    securityReason: "Reduces energy independence and baseload reliability.",
    inequalityImpact: -2,
    inequalityReason: "Higher electricity prices hit the poorest households hardest.",
    servicesImpact: -2,
    servicesReason: "Hospitals, schools, and public transport all face higher energy costs.",
    headlineStat: { value: '$12bn/yr', label: "Social cost of Germany's nuclear phase-out" },
  },
  {
    id: 'nationalisation',
    number: 4,
    title: 'Nationalisation',
    icon: '🏭',
    category: 'Economy',
    riskLevel: 'high',
    greenClaim: 'Bring railways, water companies, and Big 5 energy retailers into public ownership.',
    greenClaimAmount: '£100bn+ cost',
    summary: 'The Green Party would nationalise water, rail, and energy. The water industry\'s record is genuinely appalling — but nationalisation would cost £100bn and inherit £60bn+ in debt, while shifting all investment risk onto taxpayers.',
    positives: [
      'Water companies have paid £88bn in dividends while running up £73bn in debt and polluting rivers — the case for reform is strong.',
      'Public ownership could end profit extraction and reinvest revenue into infrastructure.',
      'Rail nationalisation is popular and the current system has genuine failures.',
    ],
    counterArgument: 'The water industry\'s record is genuinely appalling — £88bn in dividends extracted while accumulating £73bn in debt and polluting rivers. The case for reform is strong. But nationalisation is an enormously expensive solution. Defra estimates the upfront cost of nationalising water alone at £100bn, and the state would inherit over £60bn in sector debt. Thames Water alone owes £14.3bn. Meanwhile, the UK\'s own history with British Rail — chronic underinvestment, falling passenger numbers — shows public ownership does not automatically solve the problems it promises to fix. Passenger numbers doubled after privatisation in 1994.',
    keyStats: [
      { label: 'Water nationalisation cost (Defra)', value: '£100bn', context: 'upfront — plus £60bn+ in inherited sector debt', comparison: 'More than the entire annual NHS England budget', direction: 'negative' },
      { label: 'Dividends extracted since privatisation', value: '£88bn', context: 'paid to water company shareholders since 1989', comparison: 'Enough to rebuild every reservoir in the country twice', direction: 'negative' },
      { label: 'Thames Water debt alone', value: '£14.3bn', context: 'nearly a quarter of total sector debt', comparison: 'More than the entire UK foreign aid budget', direction: 'negative' },
      { label: 'Rail passengers since privatisation', value: '+100%', context: 'doubled since 1994 — investment, not ownership, was the issue', comparison: 'Investment, not ownership, drove the improvement', direction: 'positive' },
    ],
    manifestoRef: { section: 'Public Ownership', page: 'pp. 26-28', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        title: 'British Rail: The Nationalised Precedent',
        description: 'British Rail, the nationalised predecessor to the current system, was characterised by chronic underinvestment, falling passenger numbers, and poor punctuality throughout the 1970s and 1980s.',
        outcome: 'Passenger numbers have more than doubled since privatisation in 1994. The fundamental problem is capital investment, not ownership structure. Nationalisation does not automatically solve underinvestment.',
        year: '1948–1994',
        sources: [
          { label: 'Guardian: How Privatisation Drained Thames Water', url: 'https://www.theguardian.com/business/2023/jun/30/in-charts-how-privatisation-drained-thames-waters-coffers' },
          { label: 'Defra: Water Nationalisation Cost Estimate', url: 'https://www.watermagazine.co.uk/2025/09/17/defra-explains-how-it-arrived-at-100-billion-estimate-for-nationalising-water-industry/' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'UK Water Sector: Dividends Paid vs. Debt Accumulated (£bn)',
      data: [
        { label: 'Dividends to Shareholders', value: 88, color: '#ef4444' },
        { label: 'Sector Debt Accumulated', value: 73, color: '#f59e0b' },
        { label: 'Nationalisation Cost (est.)', value: 100, color: '#6b7280' },
      ],
      unit: '£bn',
      source: 'Guardian / Defra 2025',
    },
    debate: [
      {
        theySay: 'Water companies have paid out £88bn in dividends while pumping raw sewage into our rivers. Public ownership would end this extraction.',
        weSay: 'The anger is entirely justified. However, nationalisation would cost £100bn upfront and inherit £60bn+ in debt. That investment burden falls entirely on the taxpayer. The problem is failed regulation, not ownership per se — and better regulation is far cheaper than nationalisation.',
      },
      {
        theySay: 'Public ownership works. Look at Germany\'s publicly owned energy companies or France\'s state-owned rail.',
        weSay: 'Germany\'s energy sector is in crisis following the nuclear phase-out. France\'s SNCF is heavily subsidised and regularly disrupted by strikes. British Rail — the nationalised predecessor — saw falling passenger numbers and chronic underinvestment. Passenger numbers doubled after privatisation.',
      },
    ],
    riskScore: { fiscal: 8, economic: 6, social: 3 },
    verdict: 'The case for water reform is strong and the industry\'s record is indefensible. But nationalisation at £100bn+ is an enormously expensive solution when the real problem is regulatory failure. Strengthening Ofwat, imposing strict dividend caps, and requiring ring-fenced capital investment would achieve the same outcomes at a fraction of the cost.',
    sources: [
      { label: 'Guardian: How Privatisation Drained Thames Water', url: 'https://www.theguardian.com/business/2023/jun/30/in-charts-how-privatisation-drained-thames-waters-coffers' },
      { label: 'Defra: Water Nationalisation Cost Estimate', url: 'https://www.watermagazine.co.uk/2025/09/17/defra-explains-how-it-arrived-at-100-billion-estimate-for-nationalising-water-industry/' },
    ],
    bestCaseGBP: -50000000000,
    worstCaseGBP: -160000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: 1,
    inequalityReason: "Water reform could end shareholder extraction, but £100bn cost limits other investment.",
    servicesImpact: 0,
    servicesReason: "British Rail history shows public ownership alone doesn't fix underinvestment.",
    headlineStat: { value: '£100bn', label: 'Upfront cost to nationalise water alone' },
  },
  {
    id: 'rent-controls',
    number: 5,
    title: 'Rent Controls & Housing',
    icon: '🏠',
    category: 'Housing',
    riskLevel: 'high',
    greenClaim: 'Introduce rent controls, build 150,000 new social homes per year, and end Right to Buy.',
    greenClaimAmount: '150k homes/yr',
    summary: 'Rent controls treat the symptom rather than the disease. Scotland\'s experience shows they reduce supply, push landlords out of the market, and ultimately cause rents to rise faster — the opposite of the intended effect.',
    positives: [
      'Building 150,000 social homes per year would be a genuine step forward and addresses the root cause.',
      'Ending Right to Buy stops the depletion of social housing stock.',
      'Rent controls provide immediate relief to tenants facing soaring costs.',
    ],
    counterArgument: 'The academic evidence is overwhelming: 25 out of 26 studies reviewed by the IEA find that rent controls reduce housing supply. Scotland provides a real-time case study. After introducing a rent freeze in October 2022, the private rented sector shrank from 15% to 13% of households as landlords exited the market. When properties became vacant and were re-let at market rates, rents surged — and by 2025 Scottish rents were rising faster than most of England. The policy achieved the opposite of its intent.',
    keyStats: [
      { label: 'Academic studies finding rent controls reduce supply', value: '25 of 26', context: 'IEA comprehensive review of the literature', comparison: 'Near-unanimous academic consensus \u2014 extremely rare', direction: 'negative' },
      { label: 'Scotland PRS share after rent freeze', value: '13%', context: 'down from 15% — landlords exited the market', comparison: '1 in 7 landlords exited \u2014 tenants had fewer choices', direction: 'negative' },
      { label: 'Scotland rent rises vs England (2025)', value: '+2.5%', context: 'one of only two regions still rising above 2%', comparison: 'Scottish tenants now face faster rises than most of England', direction: 'negative' },
      { label: 'Landlords now raising rents annually', value: '68%', context: 'up from 41% before the cap was introduced', comparison: 'Up from 41% \u2014 the cap made landlords raise rents pre-emptively', direction: 'negative' },
    ],
    manifestoRef: { section: 'Housing', page: 'pp. 30-32', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Scotland',
        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        title: 'Scotland\'s Rent Freeze Backfires',
        description: 'Scotland introduced a rent freeze in October 2022. Official data showed the private rented sector shrank, with the proportion of households in the PRS falling from 15% to 13%. Landlords exited the market.',
        outcome: 'When properties became vacant and were re-let at market rates, rents surged. By 2025, Scottish rents were rising faster than most of England — the opposite of the policy\'s intent.',
        year: '2022–2025',
        sources: [
          { label: 'IEA: Rent Controls Do Far More Harm Than Good', url: 'https://iea.org.uk/media/rent-controls-do-far-more-harm-than-good-comprehensive-review-finds/' },
          { label: 'Scottish Household Survey 2023', url: 'https://www.gov.scot/binaries/content/documents/govscot/publications/statistics/2025/05/housing-statistics-2024-key-trends-summary/' },
        ],
      },
    ],
    chartData: {
      type: 'comparison',
      title: 'Scotland Rent Controls: Intended vs. Actual Effect',
      data: [
        { label: 'Landlords who now raise rents annually (post-cap)', value: 68, color: '#ef4444' },
        { label: 'Landlords who raised rents annually (pre-cap)', value: 41, color: '#22c55e' },
      ],
      unit: '%',
      source: 'Letting Agent Today / Scottish Household Survey 2025',
    },
    debate: [
      {
        theySay: 'Rents have increased by 50% in five years. Tenants are being priced out of their homes. Rent controls are a necessary emergency measure.',
        weSay: 'The pain is real, but rent controls treat the symptom rather than the disease. Scotland introduced a rent freeze in 2022. Landlords exited the market, supply fell, and rents surged when properties were re-let. Scottish tenants are now more likely to face a rent increase than those in England — the opposite of what the policy intended.',
      },
      {
        theySay: 'We are also proposing to build 150,000 social homes per year, which will address the supply problem.',
        weSay: 'Building 150,000 social homes per year is genuinely the right approach. However, the UK has not built anywhere near that number in any recent year. Combining an ambitious but uncertain supply target with a demand-side rent control that immediately reduces supply is a high-risk combination.',
      },
    ],
    riskScore: { fiscal: 6, economic: 7, social: 4 },
    verdict: 'The social housing building target is the right policy. The rent controls are the wrong one. 25 out of 26 academic studies find that rent controls reduce housing supply. Scotland\'s experience confirms this in real time. The Green Party should drop the rent controls and double down on building.',
    sources: [
      { label: 'IEA: Rent Controls Do Far More Harm Than Good', url: 'https://iea.org.uk/media/rent-controls-do-far-more-harm-than-good-comprehensive-review-finds/' },
      { label: 'Scottish Household Survey 2023', url: 'https://www.gov.scot/binaries/content/documents/govscot/publications/statistics/2025/05/housing-statistics-2024-key-trends-summary/' },
    ],
    bestCaseGBP: -20000000000,
    worstCaseGBP: -45000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: -1,
    inequalityReason: "Evidence shows rent controls reduce supply, pushing rents higher for those not already in tenancies.",
    servicesImpact: 0,
    servicesReason: "Building target is positive but unlikely to offset supply reduction from rent controls.",
    headlineStat: { value: '25 of 26', label: 'Studies finding rent controls reduce supply' },
  },
  {
    id: 'four-day-week',
    number: 6,
    title: 'Four-Day Week & £15 Minimum Wage',
    icon: '⏱',
    category: 'Work',
    riskLevel: 'medium',
    greenClaim: 'Mandate a 4-day working week, £15/hr minimum wage for all ages, and cap pay ratios at 10:1.',
    greenClaimAmount: '£15/hr for all',
    summary: 'The four-day week works well in white-collar sectors. Mandating it across the entire economy ignores hospitality, healthcare, and manufacturing. A £15 minimum wage for 18-year-olds risks pricing young people out of the labour market.',
    positives: [
      'A four-day week demonstrably improves worker wellbeing and reduces burnout in eligible sectors.',
      'A £15 minimum wage would lift millions out of in-work poverty.',
      'Pay ratio caps aim to curb excessive executive compensation.',
    ],
    counterArgument: 'The UK\'s celebrated four-day week trial involved just 61 self-selected companies, almost all in knowledge-based, white-collar sectors where output is not time-dependent. Mandating this across hospitality, healthcare, manufacturing, and transport — sectors requiring physical presence and continuous cover — means either hiring more staff or compressing work into fewer hours. Meanwhile, UK youth unemployment hit a 10-year high of 16.1% in Q4 2025, partly attributed to rapid minimum wage increases. Extending a £15 rate to 18-year-olds would represent a ~75% increase and risk pricing young people out of the labour market entirely.',
    keyStats: [
      { label: 'UK four-day week trial size', value: '61 firms', context: 'self-selected, predominantly white-collar companies', comparison: '0.001% of UK businesses \u2014 hardly representative', direction: 'neutral' },
      { label: 'UK youth unemployment (Q4 2025)', value: '16.1%', context: '10-year high — partly attributed to wage rises', comparison: 'Roughly 1 in 6 young people unable to find work', direction: 'negative' },
      { label: 'Pay rise for 18-20yr olds under £15/hr', value: '~75%', context: 'from current National Living Wage levels', comparison: 'Like asking a caf\u00E9 to nearly double its wage bill overnight', direction: 'negative' },
      { label: 'Sectors where 4-day week is unworkable', value: '4+', context: 'hospitality, healthcare, manufacturing, transport', comparison: 'Hospitals, hotels, factories, buses \u2014 none can close on Fridays', direction: 'negative' },
    ],
    manifestoRef: { section: "Workers' Rights", page: 'pp. 33-34', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        title: 'The Four-Day Week Trial\'s Hidden Limitations',
        description: 'The UK\'s celebrated four-day week trial involved 61 companies, almost all in knowledge-based, white-collar sectors where output is not time-dependent. The BBC reported that several firms found it did not work for their business model.',
        outcome: 'The British Business Bank explicitly notes the model "may not suit all businesses." Sectors requiring physical presence and continuous cover face significant cost increases to hire additional staff.',
        year: '2022',
        sources: [
          { label: 'BBC: Four-Day Week Trial — The Firms Where It Didn\'t Work', url: 'https://www.bbc.com/worklife/article/20230319-four-day-workweek-trial-the-firms-where-it-didnt-work' },
          { label: 'ONS: Labour Market Statistics', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'UK Youth Unemployment Rate (%)',
      data: [
        { label: '2019', value: 11.2, color: '#22c55e' },
        { label: '2020', value: 14.5, color: '#f59e0b' },
        { label: '2021', value: 12.8, color: '#f59e0b' },
        { label: '2022', value: 11.5, color: '#22c55e' },
        { label: '2023', value: 13.2, color: '#f59e0b' },
        { label: '2024', value: 14.8, color: '#ef4444' },
        { label: 'Q4 2025', value: 16.1, color: '#ef4444' },
      ],
      unit: '%',
      source: 'ONS Labour Market Statistics 2025',
    },
    debate: [
      {
        theySay: 'The UK\'s four-day week pilot showed productivity was maintained or improved in 92% of participating companies. Workers were healthier and happier.',
        weSay: 'The pilot involved 61 self-selected white-collar companies. Mandating a four-day week across the entire economy ignores sectors like hospitality, healthcare, manufacturing, and retail, where physical presence and continuous cover are required. For these sectors, a mandatory four-day week means either hiring more staff (increasing costs) or compressing the same work into fewer hours (increasing stress).',
      },
      {
        theySay: 'A £15 minimum wage would lift millions out of poverty and put more money into the pockets of those who spend it locally.',
        weSay: 'The principle is sound, but the rate for all ages is the problem. UK youth unemployment reached a 10-year high of 16.1% in Q4 2025, partly attributed to recent rapid minimum wage increases. Extending £15 to 18-year-olds represents a near 75% increase, which risks making it uneconomic for employers to hire and train young people.',
      },
    ],
    riskScore: { fiscal: 4, economic: 6, social: 3 },
    verdict: 'The four-day week is a good idea for the right sectors. Mandating it universally is a bad idea. The £15 minimum wage for adults is defensible; extending it to 18-year-olds at this rate risks exacerbating youth unemployment. These policies should be voluntary incentives, not legal mandates.',
    sources: [
      { label: 'BBC: Four-Day Week Trial — The Firms Where It Didn\'t Work', url: 'https://www.bbc.com/worklife/article/20230319-four-day-workweek-trial-the-firms-where-it-didnt-work' },
      { label: 'ONS: Labour Market Statistics', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest' },
    ],
    bestCaseGBP: -5000000000,
    worstCaseGBP: -25000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: 1,
    inequalityReason: "Higher minimum wage helps lowest earners, but youth unemployment risk partially offsets this.",
    servicesImpact: -1,
    servicesReason: "Healthcare and emergency services face staffing cost increases to maintain 24/7 cover.",
    headlineStat: { value: '16.1%', label: 'Youth unemployment — a 10-year high' },
  },
  {
    id: 'ubi',
    number: 7,
    title: 'Universal Basic Income',
    icon: '💰',
    category: 'Welfare',
    riskLevel: 'high',
    greenClaim: 'Long-term goal of providing a Universal Basic Income for all UK residents.',
    greenClaimAmount: '£530bn+ cost',
    summary: 'UBI at a meaningful level would cost more than double the entire current welfare budget. Finland\'s landmark trial found minimal employment effects. The policy risks being either too small to matter or too expensive to fund.',
    positives: [
      'Eliminates the poverty trap and removes bureaucratic complexity from the welfare system.',
      'Provides financial security that could encourage entrepreneurship and retraining.',
      'Treats all citizens with equal dignity regardless of employment status.',
    ],
    counterArgument: 'A UBI at even a modest £10,000 per year for every UK adult would cost approximately £530bn — more than double the entire current welfare budget of £260bn. Finland ran the most rigorous UBI trial to date (2017–2018), giving 2,000 unemployed people €560 per month. Recipients were happier, but employment effects were statistically insignificant. The fundamental dilemma is inescapable: a UBI generous enough to live on costs more than the state can raise; a UBI the state can afford is too small to replace targeted benefits for the most vulnerable.',
    keyStats: [
      { label: 'UBI cost at £10k/yr for all UK adults', value: '£530bn/yr', context: 'more than double the entire current welfare budget', comparison: 'More than the NHS, education, and defence budgets combined', direction: 'negative' },
      { label: 'Current UK welfare budget', value: '£260bn/yr', context: 'total social protection spending', comparison: 'UBI would need to more than double this entire budget', direction: 'negative' },
      { label: 'Finland trial: employment impact', value: '~0%', context: 'statistically insignificant vs control group', comparison: 'No statistically significant effect on getting people into work', direction: 'negative' },
      { label: 'Finland trial: sample size', value: '2,000', context: 'scaling to 53m UK adults is a fundamentally different proposition', comparison: 'Scaling from 2,000 to 53 million is not a rounding exercise', direction: 'neutral' },
    ],
    manifestoRef: { section: 'Social Security', page: 'pp. 36-37', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Finland',
        flag: '🇫🇮',
        title: 'Finland\'s UBI Trial: Wellbeing Yes, Employment No',
        description: 'Finland ran a landmark UBI trial from 2017–2018, giving 2,000 unemployed people €560 per month unconditionally.',
        outcome: 'Recipients reported significantly higher wellbeing and life satisfaction. However, employment effects were minimal and statistically insignificant compared to the control group. The trial involved only 2,000 people at €560/month — scaling to 67 million people at a living wage would cost hundreds of billions.',
        year: '2017–2018',
        sources: [{ label: 'Kela: Finland Basic Income Experiment Results', url: 'https://stm.fi/en/-/perustulokokeilun-tulokset' }],
      },
    ],
    chartData: {
      type: 'comparison',
      title: 'UBI Cost vs. Current Welfare Budget (£bn/yr)',
      data: [
        { label: 'Current Welfare Budget', value: 260, color: '#3b82f6' },
        { label: 'UBI at £10k/adult/yr', value: 530, color: '#ef4444' },
      ],
      unit: '£bn',
      source: 'HM Treasury / Microsimulation estimates',
    },
    debate: [
      {
        theySay: 'UBI would eliminate the poverty trap, reduce welfare bureaucracy, and give people the freedom to retrain, care for family members, or start businesses.',
        weSay: 'These are genuine benefits. The problem is cost. A meaningful UBI for all UK adults would cost £530bn per year — more than double the entire current welfare budget. Finland\'s trial found minimal employment effects. The policy is either too small to matter or too expensive to fund.',
      },
      {
        theySay: 'UBI would be funded by replacing the existing complex welfare system, which wastes billions on administration.',
        weSay: 'The UK welfare system costs £260bn per year. A UBI at even £10,000 per year for every adult would cost £530bn. Abolishing the existing system to fund UBI would leave the most vulnerable — those with disabilities, caring responsibilities, and complex needs — significantly worse off, since their current benefits are targeted and higher than any politically feasible UBI rate.',
      },
    ],
    riskScore: { fiscal: 9, economic: 5, social: 4 },
    verdict: 'UBI is an intellectually interesting idea that faces an insurmountable fiscal reality. At a meaningful level, it costs more than double the entire welfare budget. At an affordable level, it provides too little to replace existing targeted benefits. The most vulnerable people would be worse off under any fiscally viable UBI scheme.',
    sources: [
      { label: 'Kela: Finland Basic Income Experiment Results', url: 'https://stm.fi/en/-/perustulokokeilun-tulokset' },
      { label: 'International Journal of Microsimulation: Cost of UBI in UK', url: 'https://www.microsimulation.pub/articles/00286' },
    ],
    bestCaseGBP: -100000000000,
    worstCaseGBP: -300000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: 0,
    inequalityReason: "At any affordable level, UBI is too small to meaningfully reduce inequality; at a meaningful level, it's unfundable.",
    servicesImpact: -3,
    servicesReason: "Diverting £530bn to universal payments would gut targeted support for the most vulnerable.",
    headlineStat: { value: '£530bn/yr', label: 'Cost of UBI — double the welfare budget' },
  },
  {
    id: 'aviation',
    number: 8,
    title: 'Aviation Restrictions',
    icon: '✈',
    category: 'Transport',
    riskLevel: 'medium',
    greenClaim: 'Frequent flyer levy, ban domestic flights under 3hrs by train, halt all airport expansion.',
    greenClaimAmount: '<1% emissions saved',
    summary: 'France\'s domestic flight ban affected only 3 routes and reduced emissions by less than 1%. Northern Ireland has no land border with Great Britain and is critically dependent on air connectivity. These policies harm regional economies while achieving minimal climate benefit.',
    positives: [
      'Aviation is highly carbon-intensive and reducing flights has genuine climate benefits.',
      'A frequent flyer levy fairly targets those who fly most, who are overwhelmingly the wealthiest.',
      'Halting airport expansion prevents locking in future carbon emissions.',
    ],
    counterArgument: 'France introduced a ban on short-haul domestic flights in June 2023, widely praised as a bold climate measure. In practice, loopholes meant it affected just 3 routes and reduced French aviation emissions by less than 1%. The UK faces an even more fundamental problem: Northern Ireland has no land border with Great Britain and is critically dependent on domestic air connectivity. UK aviation supports 1.6 million jobs and contributes £100bn to GDP. These policies harm regional economies and connectivity while achieving minimal climate benefit.',
    keyStats: [
      { label: 'France flight ban: routes affected', value: '3', context: 'out of hundreds of domestic routes — loopholes gutted the policy', comparison: 'Out of hundreds of domestic routes \u2014 the ban was gutted by loopholes', direction: 'negative' },
      { label: 'France flight ban: emissions cut', value: '<1%', context: 'of French aviation emissions — largely symbolic', comparison: "A rounding error in France's total emissions", direction: 'negative' },
      { label: 'UK aviation GDP contribution', value: '£100bn', context: 'supporting 1.6 million jobs across the economy', comparison: 'Larger than the entire UK agricultural sector', direction: 'positive' },
      { label: 'UK aviation jobs supported', value: '1.6m', context: 'including tourism, logistics, and business travel', comparison: 'More people than live in Birmingham', direction: 'positive' },
    ],
    manifestoRef: { section: 'Transport', page: 'pp. 18-19', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'France',
        flag: '🇫🇷',
        title: 'France\'s Symbolic Flight Ban',
        description: 'France introduced a ban on short-haul domestic flights in June 2023, widely cited as a bold climate measure. In practice, due to loopholes and the requirement for a rail alternative under 2.5 hours, it only affected three routes out of Paris.',
        outcome: 'French aviation emissions reduced by less than 1%. Critics noted it was largely symbolic while causing significant political controversy. The lesson: domestic flight bans are far less effective in practice than in theory.',
        year: '2023',
        sources: [{ label: 'Transport & Environment: France Flight Ban Analysis', url: 'https://www.transportenvironment.org/articles/frances-ban-short-haul-flights-more-symbolic-it-effective' }],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'UK Aviation Economic Contribution',
      data: [
        { label: 'GDP Contribution (£bn)', value: 100, color: '#d4a017' },
        { label: 'Jobs Supported (\'000s)', value: 1600, color: '#3b82f6' },
      ],
      unit: 'various',
      source: 'IATA / Oxford Economics 2023',
    },
    debate: [
      {
        theySay: 'Aviation is responsible for 2.5% of global CO2 emissions and a much higher proportion of total warming effects. We cannot meet our climate targets while expanding airports.',
        weSay: 'The climate case for reducing aviation emissions is legitimate. However, France\'s domestic flight ban affected only 3 routes and reduced emissions by less than 1%. Northern Ireland has no land border with Great Britain and is critically dependent on domestic air connectivity. These policies harm regional economies while achieving minimal climate benefit.',
      },
      {
        theySay: 'A frequent flyer levy is fair because it targets those who fly the most, who are overwhelmingly the wealthiest.',
        weSay: 'The distributional argument has merit. But UK aviation supports 1.6 million jobs and contributes £100bn to GDP. Business travel underpins export contracts and inward investment that cannot simply be replicated over video calls. The economic cost of restricting aviation is far higher than the climate benefit of these specific measures.',
      },
    ],
    riskScore: { fiscal: 3, economic: 5, social: 4 },
    verdict: 'The climate goal is right; the specific policies are poorly targeted. France\'s experience shows domestic flight bans are largely symbolic. A better approach would be accelerating sustainable aviation fuels and reforming Air Passenger Duty rather than banning routes that are critical to regional connectivity.',
    sources: [
      { label: 'Transport & Environment: France Flight Ban Analysis', url: 'https://www.transportenvironment.org/articles/frances-ban-short-haul-flights-more-symbolic-it-effective' },
      { label: 'IATA: Value of Air Transport to the UK', url: 'https://www.iata.org/en/iata-repository/publications/economic-reports/the-value-of-air-transport-to-united-kingdom/' },
    ],
    bestCaseGBP: -2000000000,
    worstCaseGBP: -12000000000,
    securityImpact: -1,
    securityReason: "Reduced air connectivity weakens rapid military and diplomatic logistics.",
    inequalityImpact: 0,
    inequalityReason: "Frequent flyer levy is progressive, but job losses in aviation-dependent regions offset this.",
    servicesImpact: -1,
    servicesReason: "Northern Ireland and Scottish islands lose critical connectivity; tourism revenue falls.",
    headlineStat: { value: '3 routes', label: "All France's flight ban actually affected" },
  },
  {
    id: 'immigration',
    number: 9,
    title: 'Immigration & Asylum',
    icon: '🌍',
    category: 'Society',
    riskLevel: 'medium',
    greenClaim: 'End the hostile environment, abolish immigration detention, end no recourse to public funds, provide safe routes for all asylum seekers.',
    greenClaimAmount: 'Right to work saves £8bn',
    summary: 'The right to work for asylum seekers is well-evidenced and would save money. But abolishing all immigration detention and ending no recourse to public funds carries significant fiscal risks for already-stretched local authorities.',
    positives: [
      'Allowing asylum seekers the right to work would raise £1.3bn in tax revenue and save £6.7bn in government expenditure (NIESR).',
      'Treating migrants with dignity is both morally right and economically rational.',
      'Safe routes reduce dangerous Channel crossings and save lives.',
    ],
    counterArgument: 'This platform is a mix of strong and weak policy. The NIESR found that allowing asylum seekers the right to work would generate £1.3bn in tax revenue and save £6.7bn in government expenditure — one of the best-evidenced proposals in the entire manifesto. But the broader package goes much further: abolishing all immigration detention removes the enforcement mechanism that deters illegal entry, while ending no recourse to public funds for all migrants immediately increases the welfare burden on local councils — over 15 of which are already effectively bankrupt. The Home Office spent £3bn+ per year on asylum operations; removing deterrents without credible alternatives risks increasing, not reducing, that cost.',
    keyStats: [
      { label: 'Right to work: tax revenue gain', value: '£1.3bn', context: 'NIESR estimate if asylum seekers can work immediately', comparison: "Equivalent to 40,000 new nurses' salaries", direction: 'positive' },
      { label: 'Right to work: expenditure saving', value: '£6.7bn', context: 'reduced government spending on asylum support', comparison: 'More than the entire UK border security budget', direction: 'positive' },
      { label: 'Home Office asylum operations cost', value: '£3bn+/yr', context: 'annual spending on the current system', comparison: 'More than the annual cost of running all UK prisons', direction: 'negative' },
      { label: 'Councils facing effective bankruptcy', value: '15+', context: 'in England as of 2025 — NRPF changes would add pressure', comparison: 'These councils can barely fund bin collections, let alone new obligations', direction: 'negative' },
    ],
    manifestoRef: { section: 'Migration and Refugees', page: 'pp. 44-45', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        title: 'The Right to Work: The One Policy That Works',
        description: 'The NIESR found that allowing asylum seekers the right to work immediately would generate £1.3bn in additional tax revenue and save £6.7bn in government expenditure.',
        outcome: 'This specific policy has strong evidence behind it and is supported across the political spectrum. It is the one element of the Green Party\'s immigration platform that is clearly evidence-based and fiscally positive.',
        year: '2023',
        sources: [{ label: 'NIESR: Right to Work for Asylum Seekers', url: 'https://www.niesr.ac.uk/publications/right-to-work-asylum-seekers' }],
      },
    ],
    chartData: {
      type: 'comparison',
      title: 'Right to Work for Asylum Seekers: Fiscal Impact (£bn)',
      data: [
        { label: 'Additional Tax Revenue', value: 1.3, color: '#22c55e' },
        { label: 'Expenditure Savings', value: 6.7, color: '#4ade80' },
      ],
      unit: '£bn',
      source: 'National Institute of Economic and Social Research 2023',
    },
    debate: [
      {
        theySay: 'Asylum seekers are not allowed to work for up to 12 months. They are forced into destitution and dependency. Allowing them to work immediately would save money and let them contribute.',
        weSay: 'This is actually one of the stronger arguments in the Green Party\'s immigration platform. The NIESR found it would raise £1.3bn in tax revenue and save £6.7bn in expenditure. The right to work is well-evidenced. The problem is the broader platform — abolishing all detention and ending NRPF — which goes much further and carries significant fiscal risks.',
      },
      {
        theySay: 'Ending the hostile environment would save money by reducing the bureaucratic cost of enforcement and detention.',
        weSay: 'Immigration detention costs are real, but they exist because the alternative — releasing everyone with no enforcement mechanism — creates a pull factor that increases overall numbers. The Home Office spent £3bn+ per year on asylum operations. Abolishing the deterrent framework without a credible alternative risks increasing that cost, not reducing it.',
      },
    ],
    riskScore: { fiscal: 5, economic: 3, social: 5 },
    verdict: 'The right to work for asylum seekers is excellent policy with strong evidence. The rest of the platform — abolishing all detention, ending NRPF universally — is poorly evidenced and fiscally risky. The Green Party should adopt the evidence-based elements and drop the ideological ones.',
    sources: [
      { label: 'NIESR: Right to Work for Asylum Seekers', url: 'https://www.niesr.ac.uk/publications/right-to-work-asylum-seekers' },
      { label: 'Migration Observatory: Fiscal Impact of Immigration', url: 'https://migrationobservatory.ox.ac.uk/resources/briefings/the-fiscal-impact-of-immigration-in-the-uk/' },
    ],
    bestCaseGBP: 8000000000,
    worstCaseGBP: -15000000000,
    securityImpact: -2,
    securityReason: "Abolishing detention removes enforcement mechanism; border security weakened.",
    inequalityImpact: 2,
    inequalityReason: "Right to work saves £8bn and treats asylum seekers with dignity — one of the strongest evidence-based proposals.",
    servicesImpact: -1,
    servicesReason: "Ending NRPF adds pressure to already-bankrupt local councils.",
    headlineStat: { value: '£8bn', label: 'Saved if asylum seekers can work — the one policy that works' },
  },
  {
    id: 'tuition-fees',
    number: 10,
    title: 'Abolish Tuition Fees',
    icon: '🎓',
    category: 'Education',
    riskLevel: 'medium',
    greenClaim: 'Abolish university tuition fees, restore maintenance grants, and abolish OFSTED.',
    greenClaimAmount: '£10bn+ cost/yr',
    summary: 'Free tuition is highly regressive. Scotland\'s experience shows it benefits the wealthiest students most, fails to improve access for the disadvantaged, and risks underfunding universities. It shifts costs from high-earning graduates to general taxpayers.',
    positives: [
      'Removes the psychological deterrent of student debt for prospective students.',
      'Treats higher education as a public good rather than a commodity.',
      'Maintenance grants would genuinely help students from poorer backgrounds.',
    ],
    counterArgument: 'Scotland abolished tuition fees in 2000 — a 25-year experiment that provides clear evidence. Young Scots from deprived areas are still four times less likely to attend university than those from wealthy backgrounds. Free tuition primarily benefits middle-class families whose children would have gone to university anyway, while the government caps funded places to control costs, often crowding out disadvantaged applicants. Abolishing fees in England would cost £10bn+ per year, shifting the burden from graduates — who earn £100k+ more over a lifetime — to general taxpayers, including those who never attended university and earn less on average.',
    keyStats: [
      { label: 'Scotland: deprived vs wealthy access gap', value: '4x', context: 'deprived students still 4x less likely to attend — despite free tuition', comparison: "25 years of free tuition and the gap hasn't closed", direction: 'negative' },
      { label: 'Cost of abolishing fees in England', value: '£10bn+/yr', context: 'additional government expenditure required', comparison: 'More than the entire UK policing budget', direction: 'negative' },
      { label: 'Graduate lifetime earnings premium', value: '£100k+', context: 'graduates earn far more — fees are repaid from higher earnings', comparison: "Graduates earn far more \u2014 taxpayers who didn't go subsidise those who did", direction: 'neutral' },
      { label: 'England deprived students attending uni', value: '28%', context: 'vs just 13% in Scotland — fees haven\'t deterred access', comparison: "More than double Scotland's rate \u2014 fees haven't blocked access", direction: 'positive' },
    ],
    manifestoRef: { section: 'Education', page: 'pp. 38-39', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Scotland',
        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        title: 'Scotland\'s Free Tuition: A Windfall for the Wealthy',
        description: 'Scotland abolished tuition fees for Scottish students in 2000. A Guardian investigation found this benefits the wealthiest students most. The government caps funded places to control costs, so universities often fill places with fee-paying students from England or overseas, crowding out Scottish applicants from disadvantaged backgrounds.',
        outcome: 'Young Scots from deprived areas are still four times less likely to attend university than those from wealthy backgrounds, despite free tuition. The policy has not improved social mobility.',
        year: '2000–present',
        sources: [
          { label: 'Guardian: Free Tuition in Scotland Benefits Wealthiest Most', url: 'https://www.theguardian.com/education/2014/apr/29/free-tuition-scotland-benefits-wealthiest-students-most-study' },
          { label: 'HEPI: Where Abolishing Tuition Fees Has Meant Underfunded Universities', url: 'https://www.hepi.ac.uk/2018/03/16/5507/' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'University Attendance by Background: Scotland vs. England (%)',
      data: [
        { label: 'Scotland: Wealthy', value: 52, color: '#22c55e' },
        { label: 'Scotland: Deprived', value: 13, color: '#ef4444' },
        { label: 'England: Wealthy', value: 55, color: '#3b82f6' },
        { label: 'England: Deprived', value: 28, color: '#f59e0b' },
      ],
      unit: '%',
      source: 'UCAS / Scottish Government 2023',
    },
    debate: [
      {
        theySay: 'No young person should be deterred from going to university by the fear of £50,000 of debt. Free tuition would open up higher education to everyone.',
        weSay: 'Scotland has had free tuition since 2000. Young Scots from deprived areas are still four times less likely to attend university than those from wealthy backgrounds. Free tuition benefits the wealthy most because they are more likely to go to university in the first place. The IFS estimates abolishing fees in England would cost £10bn+ annually, with the primary beneficiaries being graduates who go on to earn well above average salaries.',
      },
      {
        theySay: 'The current loan system is a graduate tax in all but name. Most graduates will never repay their full loan. The system is dishonest.',
        weSay: 'This critique of the current system has genuine merit. But the solution is not to shift the entire cost to the general taxpayer — including those who do not go to university and earn less than graduates on average. Better targeted maintenance grants for the poorest students would achieve more social mobility at a fraction of the cost.',
      },
    ],
    riskScore: { fiscal: 6, economic: 3, social: 3 },
    verdict: 'Abolishing tuition fees is a regressive policy dressed up as progressive. It primarily benefits those who already go to university — disproportionately the wealthy. Scotland\'s 25-year experiment proves it does not improve access for the disadvantaged. Targeted maintenance grants would achieve more social mobility at far lower cost.',
    sources: [
      { label: 'Guardian: Free Tuition in Scotland Benefits Wealthiest Most', url: 'https://www.theguardian.com/education/2014/apr/29/free-tuition-scotland-benefits-wealthiest-students-most-study' },
      { label: 'HEPI: Where Abolishing Tuition Fees Has Meant Underfunded Universities', url: 'https://www.hepi.ac.uk/2018/03/16/5507/' },
    ],
    bestCaseGBP: -8000000000,
    worstCaseGBP: -15000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: -2,
    inequalityReason: "Scotland proves free tuition benefits the wealthy most — deprived students remain 4x less likely to attend.",
    servicesImpact: 1,
    servicesReason: "More university funding could improve education quality, but at £10bn/yr taxpayer cost.",
    headlineStat: { value: '4×', label: 'Deprived Scots still this much less likely to attend uni' },
  },
  {
    id: 'carbon-tax',
    number: 11,
    title: 'Carbon Tax',
    icon: '🌡',
    category: 'Environment',
    riskLevel: 'high',
    greenClaim: 'Carbon tax starting at £120/tonne rising to £500/tonne, alongside £40bn/year in green investment.',
    greenClaimAmount: '£90bn raised',
    summary: 'A carbon tax is the right economic tool for decarbonisation. But £120/tonne is far above competitor nations, risks carbon leakage destroying UK industry, and is deeply regressive — hitting the poorest households hardest while the benefits of green investment take years to materialise.',
    positives: [
      'A carbon price is the most economically efficient mechanism to drive decarbonisation across all sectors.',
      '£40bn per year in green investment would create hundreds of thousands of jobs.',
      'Accelerates the transition away from fossil fuels faster than regulation alone.',
    ],
    counterArgument: 'A carbon price is the right economic tool — but the rate matters enormously. The Green Party proposes starting at £120/tonne, three times the current UK ETS price of ~£40/tonne, rising to £500/tonne. No competitor nation prices carbon anywhere near this level. The EU recognised the risk of carbon leakage — industries relocating to countries with lower standards — and introduced a Carbon Border Adjustment Mechanism in 2023 specifically to prevent it. The Green Party\'s plan includes no such mechanism. The IFS notes it would be "impossible to raise £90bn without the effect being felt by everyone," and the poorest households spend 10%+ of income on energy versus 3% for the wealthiest.',
    keyStats: [
      { label: 'Green Party starting rate', value: '£120/t', context: 'vs ~£40/tonne current UK ETS — 3x higher', comparison: '3\u00D7 higher than any price UK industry currently pays', direction: 'negative' },
      { label: 'Green Party peak rate', value: '£500/t', context: 'far above any competitor nation on earth', comparison: 'No country on Earth prices carbon anywhere near this level', direction: 'negative' },
      { label: 'Energy spend: poorest vs wealthiest', value: '10% vs 3%', context: 'of household income — deeply regressive', comparison: 'The poorest pay 3\u00D7 more of their income \u2014 deeply regressive', direction: 'negative' },
      { label: 'UK industrial jobs at risk', value: '100k+', context: 'steel, chemicals, ceramics — without border adjustment', comparison: 'Steel towns, chemical plants, ceramics \u2014 entire communities at risk', direction: 'negative' },
    ],
    manifestoRef: { section: 'Energy and Climate', page: 'pp. 14-16', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'European Union',
        flag: '🇪🇺',
        title: 'Carbon Leakage: The Industrial Risk',
        description: 'The EU\'s Emissions Trading Scheme (ETS) has faced persistent carbon leakage concerns, where energy-intensive industries relocate to countries with lower carbon costs. The EU introduced a Carbon Border Adjustment Mechanism (CBAM) in 2023 specifically to address this.',
        outcome: 'Without a border carbon adjustment, a unilateral UK carbon tax at £120/tonne would make UK steel, chemicals, and ceramics uncompetitive against imports from countries with no carbon price. The Green Party\'s plan includes no border adjustment mechanism.',
        year: '2005–present',
        sources: [
          { label: 'IFS: Green Party Manifesto Reaction', url: 'https://ifs.org.uk/articles/green-party-manifesto-reaction' },
          { label: 'LSE Grantham: Distributional Effects of Carbon Tax', url: 'https://www.lse.ac.uk/granthaminstitute/wp-content/uploads/2020/09/working-paper-349-Andersson-Atkinson.pdf' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'Carbon Price Comparison: UK Green Party Proposal vs. Current Rates (£/tonne)',
      data: [
        { label: 'UK ETS (current)', value: 40, color: '#3b82f6' },
        { label: 'EU ETS (current)', value: 55, color: '#8b5cf6' },
        { label: 'Green Party (start)', value: 120, color: '#f59e0b' },
        { label: 'Green Party (peak)', value: 500, color: '#ef4444' },
      ],
      unit: '£/tonne CO2',
      source: 'DESNZ / Green Party Manifesto 2024',
    },
    debate: [
      {
        theySay: 'A carbon tax is the most economically efficient way to reduce emissions. It puts a price on pollution and lets the market find the cheapest way to decarbonise.',
        weSay: 'The economic theory is sound. The problem is the rate and the distributional impact. At £120/tonne — three times the current UK ETS price — the tax hits the poorest households hardest because they spend a larger share of income on energy and fuel. The IFS noted that raising £90bn from a carbon tax would be "impossible without the effect being felt by everyone."',
      },
      {
        theySay: 'The revenue from the carbon tax would fund green investment and insulate homes, ultimately reducing energy bills for the poorest.',
        weSay: 'The intention is good but the sequencing is the problem. The tax hits immediately; the benefits of insulation take years. In the interim, lower-income households face higher energy bills. There is also a serious competitiveness risk: a unilateral carbon tax at £120/tonne, far above competitor nations, risks driving energy-intensive industries to relocate, achieving nothing for the global climate while destroying UK jobs.',
      },
    ],
    riskScore: { fiscal: 5, economic: 8, social: 7 },
    verdict: 'A carbon price is the right policy; this specific rate is reckless. At £120/tonne rising to £500/tonne without a border carbon adjustment, the Green Party would destroy UK industry while achieving minimal global climate benefit as production simply moves overseas. A credible carbon pricing plan needs to be internationally coordinated and accompanied by robust household rebates.',
    sources: [
      { label: 'IFS: Green Party Manifesto Reaction', url: 'https://ifs.org.uk/articles/green-party-manifesto-reaction' },
      { label: 'LSE Grantham: Distributional Effects of Carbon Tax', url: 'https://www.lse.ac.uk/granthaminstitute/wp-content/uploads/2020/09/working-paper-349-Andersson-Atkinson.pdf' },
    ],
    bestCaseGBP: 20000000000,
    worstCaseGBP: -40000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: -3,
    inequalityReason: "Poorest households spend 10% of income on energy vs 3% for the wealthiest — deeply regressive.",
    servicesImpact: -1,
    servicesReason: "Revenue depends on consumption that the tax is designed to eliminate; green investment benefits take years to materialise.",
    headlineStat: { value: '£120/t', label: '3× the current UK carbon price — no country goes this high' },
  },
  {
    id: 'eu-rejoin',
    number: 12,
    title: 'Re-joining the EU',
    icon: '🇪🇺',
    category: 'Foreign Policy',
    riskLevel: 'medium',
    greenClaim: 'Rejoin the EU "as soon as the political conditions are right."',
    greenClaimAmount: '£8-10bn/yr contribution',
    summary: 'The economic costs of Brexit are real. But rejoining would require accepting the Euro trajectory, free movement, and net budget contributions of £8-10bn per year. The political conditions do not currently exist and are unlikely to within any foreseeable parliament.',
    positives: [
      'Multiple studies estimate Brexit has cost the UK 4-6% of GDP — rejoining would reverse this damage.',
      'Restoring freedom of movement would address labour shortages in healthcare, agriculture, and hospitality.',
      'Rejoining the Single Market would eliminate trade friction and boost exports.',
    ],
    counterArgument: 'The economic costs of Brexit are real — multiple studies estimate a 4–6% GDP loss. But rejoining is not simply reversing Brexit. New members must accept the full acquis communautaire, including the obligation to work towards adopting the Euro, full free movement, and net budget contributions of £8–10bn per year. Norway\'s arrangement — Single Market access without full membership — still requires accepting EU rules with no vote, paying ~90% of what full membership costs. Public support for rejoining sits at ~55% in polls, but this is not a referendum majority, and the earliest realistic accession date is 2035+. The Green Party\'s own policies — a carbon tax far above the EU\'s, different labour market rules — would create new trade frictions even within a rejoined framework.',
    keyStats: [
      { label: 'Brexit GDP cost (various estimates)', value: '4–6%', context: 'of GDP lost compared to remaining — the damage is real', comparison: 'Roughly \u00A3100\u2013150bn in lost economic output since 2016', direction: 'negative' },
      { label: 'Annual EU budget contribution', value: '£8–10bn', context: 'net transfer — the price of re-entry', comparison: 'About \u00A3150 per person per year \u2014 the price of re-entry', direction: 'negative' },
      { label: 'Public support for rejoining (2025)', value: '~55%', context: 'YouGov — not sufficient for a referendum majority', comparison: 'Not enough for a referendum majority \u2014 and enthusiasm is soft', direction: 'neutral' },
      { label: 'Earliest realistic rejoining date', value: '2035+', context: 'given political, legal, and treaty requirements', comparison: 'At least two full parliaments away \u2014 not this generation', direction: 'neutral' },
    ],
    manifestoRef: { section: 'International', page: 'pp. 46-47', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Norway',
        flag: '🇳🇴',
        title: 'The Norway Model: Rules Without a Vote',
        description: 'Norway has Single Market access without full EU membership but must accept free movement, pay budget contributions, and accept EU rules with no vote on making them — the "rules taker, not rules maker" arrangement.',
        outcome: 'Norway pays approximately 90% of what full EU membership would cost while having no say in EU legislation. The Green Party\'s other policies — a carbon tax far higher than the EU\'s, different labour market rules — would create new trade frictions even within a rejoined Single Market framework.',
        year: '1994–present',
        sources: [
          { label: 'ONS: UK Contribution to EU Budget', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31' },
          { label: 'NIESR: The Economic Effects of Brexit', url: 'https://www.niesr.ac.uk/publications/economic-effects-brexit' },
        ],
      },
    ],
    chartData: {
      type: 'comparison',
      title: 'Brexit GDP Impact vs. EU Budget Contribution Cost (£bn/yr)',
      data: [
        { label: 'GDP Cost of Brexit (est. annual)', value: -80, color: '#ef4444' },
        { label: 'Annual EU Budget Contribution', value: -9, color: '#f59e0b' },
      ],
      unit: '£bn',
      source: 'NIESR / ONS 2024',
    },
    debate: [
      {
        theySay: 'Brexit has cost the UK economy 6-8% of GDP. Rejoining the EU would reverse this damage and restore our trading relationships and freedom of movement.',
        weSay: 'The economic costs of Brexit are real and well-documented. However, rejoining requires accepting the full acquis communautaire including the obligation to work towards adopting the Euro, free movement, and net budget contributions of £8-10bn per year. The political conditions — requiring a referendum and sustained parliamentary majority — do not currently exist.',
      },
      {
        theySay: 'Rejoining the Single Market, even without full EU membership, would recover most of the economic benefits.',
        weSay: 'Norway and Switzerland have Single Market access but must accept free movement, pay budget contributions, and accept EU rules with no vote on making them. This is the "rules taker, not rules maker" arrangement that many Brexit supporters specifically objected to. The Green Party\'s own policies — a carbon tax far above the EU\'s — would create new trade frictions even within a rejoined framework.',
      },
    ],
    riskScore: { fiscal: 4, economic: 3, social: 3 },
    verdict: 'The economic case for closer EU relations is strong. But the Green Party\'s framing of "rejoin the EU" is politically unrealistic and would require accepting budget contributions, free movement, and the Euro trajectory. A more pragmatic approach — negotiating a closer trading relationship and mutual recognition agreements — would achieve most of the economic benefits without the political impossibility.',
    sources: [
      { label: 'ONS: UK Contribution to EU Budget', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31' },
      { label: 'NIESR: The Economic Effects of Brexit', url: 'https://www.niesr.ac.uk/publications/economic-effects-brexit' },
    ],
    bestCaseGBP: 30000000000,
    worstCaseGBP: -10000000000,
    securityImpact: 1,
    securityReason: "Closer EU defence cooperation strengthens collective security.",
    inequalityImpact: 1,
    inequalityReason: "Restoring free movement and trade could reverse some Brexit-driven wage stagnation.",
    servicesImpact: 1,
    servicesReason: "Freedom of movement would help fill healthcare and social care vacancies.",
    headlineStat: { value: '2035+', label: 'Earliest realistic date to rejoin the EU' },
  },
  {
    id: 'land-setaside',
    number: 13,
    title: '30% Land Set-Aside for Nature',
    icon: '🌿',
    category: 'Environment',
    riskLevel: 'medium',
    greenClaim: 'Set aside 30% of UK land and seas for nature by 2030, triple farming subsidies for nature-friendly farming.',
    greenClaimAmount: '30% of UK land',
    summary: 'The UK is one of the most nature-depleted countries in the developed world and biodiversity recovery is urgent. But taking 30% of agricultural land out of production risks food security in a country that already imports nearly half its food.',
    positives: [
      'The UK has lost 50% of its biodiversity since 1970 — nature recovery is genuinely urgent.',
      'Rewilding provides natural carbon sequestration and flood prevention.',
      'Eco-tourism and conservation create new rural employment opportunities.',
    ],
    counterArgument: 'The UK has lost 50% of its biodiversity since 1970 and nature recovery is genuinely urgent — but the scale and speed of this target carries serious food security risks. The UK already imports nearly 46% of its food. Setting aside 30% of 17.5 million hectares of agricultural land — removing 5.25 million hectares from production by 2030 — would significantly reduce domestic output and increase import dependency. The Knepp Estate in Sussex demonstrates that rewilding works brilliantly on 3,500 voluntary acres, but mandating this across millions of hectares by 2030 is a fundamentally different proposition, with major implications for food prices and the 476,000-strong farming workforce.',
    keyStats: [
      { label: 'UK food import dependency', value: '~46%', context: 'nearly half of all food consumed is already imported', comparison: 'Nearly half our food already comes from abroad', direction: 'negative' },
      { label: 'Land removed from production', value: '5.25m ha', context: '30% of 17.5m hectares of agricultural land', comparison: 'An area larger than the entire county of Yorkshire', direction: 'negative' },
      { label: 'UK biodiversity loss since 1970', value: '50%', context: 'one of most nature-depleted developed nations — the need is real', comparison: 'Half our wildlife gone in a single lifetime \u2014 the crisis is real', direction: 'negative' },
      { label: 'Farming jobs affected', value: '~476k', context: 'workforce facing large-scale land use change', comparison: 'An entire workforce facing upheaval in under 6 years', direction: 'negative' },
    ],
    manifestoRef: { section: 'Nature and Food', page: 'pp. 10-12', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        title: 'Knepp Estate: Rewilding Works at Scale',
        description: 'The Knepp Estate in West Sussex has become a celebrated rewilding success story, with remarkable biodiversity recovery on 3,500 acres of former farmland.',
        outcome: 'Knepp demonstrates that rewilding works and creates genuine ecological value. However, it is a voluntary, privately funded project on 3,500 acres. Mandating this across 5.25 million hectares by 2030 is a fundamentally different proposition with major food security implications.',
        year: '2001–present',
        sources: [
          { label: 'DEFRA: Food Security Report 2024', url: 'https://www.gov.uk/government/publications/united-kingdom-food-security-report-2024' },
          { label: 'WWF: Bridging the Divide — Rewilding and Farming', url: 'https://www.wwf.org.uk/sites/default/files/2023-11/Bridging-the-Divide_2023_English.pdf' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'UK Food Security: Import Dependency by Category (%)',
      data: [
        { label: 'Vegetables', value: 54, color: '#ef4444' },
        { label: 'Fruit', value: 84, color: '#ef4444' },
        { label: 'Cereals', value: 22, color: '#22c55e' },
        { label: 'Meat', value: 18, color: '#22c55e' },
        { label: 'Overall', value: 46, color: '#f59e0b' },
      ],
      unit: '% imported',
      source: 'DEFRA: Food Security Report 2024',
    },
    debate: [
      {
        theySay: 'The UK is one of the most nature-depleted countries in the developed world. We have lost 50% of our biodiversity since 1970. Setting aside 30% of land for nature is essential to prevent ecological collapse.',
        weSay: 'The biodiversity crisis is real and urgent. However, the UK already imports nearly half its food. Taking 30% of agricultural land out of productive use would reduce domestic food production, increase import dependency, and drive up food prices — hitting lower-income households hardest. The policy risks exporting the environmental problem rather than solving it, as food production moves to countries with lower environmental standards.',
      },
      {
        theySay: 'Rewilding creates jobs in eco-tourism, conservation, and sustainable land management that can replace agricultural employment.',
        weSay: 'Eco-tourism jobs are real but seasonal, lower-paid, and geographically concentrated. They cannot straightforwardly replace the skilled agricultural workforce in rural communities. The transition costs — retraining, relocation, and economic shock to rural communities — are substantial and largely uncosted in the Green Party\'s proposals.',
      },
    ],
    riskScore: { fiscal: 4, economic: 5, social: 5 },
    verdict: 'Nature recovery is essential and the Green Party is right to prioritise it. But 30% by 2030 is an arbitrary and potentially dangerous target that risks food security. A more graduated approach — incentivising nature-friendly farming on 30% of land rather than removing it from production entirely — would achieve the ecological goals without the food security risk.',
    sources: [
      { label: 'DEFRA: Food Security Report 2024', url: 'https://www.gov.uk/government/publications/united-kingdom-food-security-report-2024' },
      { label: 'WWF: Bridging the Divide — Rewilding and Farming', url: 'https://www.wwf.org.uk/sites/default/files/2023-11/Bridging-the-Divide_2023_English.pdf' },
    ],
    bestCaseGBP: -5000000000,
    worstCaseGBP: -20000000000,
    securityImpact: -1,
    securityReason: "Increased food import dependency weakens food security in a crisis.",
    inequalityImpact: -1,
    inequalityReason: "Higher food prices from reduced domestic production hit lower-income households hardest.",
    servicesImpact: 0,
    servicesReason: "Rewilding creates some rural jobs but loses 476k farming jobs — roughly neutral.",
    headlineStat: { value: '~46%', label: 'UK food already imported — this would increase it' },
  },
  {
    id: 'social-care',
    number: 14,
    title: 'Free Personal Care',
    icon: '🏥',
    category: 'Health',
    riskLevel: 'medium',
    greenClaim: '£20bn for free personal care for all, £3bn for children\'s social care.',
    greenClaimAmount: '£23bn/yr cost',
    summary: 'Scotland introduced free personal care in 2002. Within years, funding failed to keep pace with demand, councils tightened eligibility, and the policy\'s promise exceeded its delivery. The Green Party\'s £20bn figure is the minimum needed to address the existing crisis — not a net addition.',
    positives: [
      'No one should have to sell their home to pay for care in old age — this is a genuine injustice.',
      'Free personal care reduces hospital admissions and saves NHS costs downstream.',
      'Scotland\'s experience shows the principle can work when properly funded.',
    ],
    counterArgument: 'No one should have to sell their home to pay for care — the injustice is real. But Scotland introduced free personal care in 2002 and provides a clear warning about delivery. Audit Scotland found that central government funding failed to keep pace with demand within just a few years, leaving local councils with £46–63m annual shortfalls. Councils responded by tightening eligibility, meaning many people who were supposed to benefit were assessed as not qualifying. England already spends £20bn+ per year on adult social care and faces a £3.4bn funding gap just to maintain current standards. The Green Party\'s £20bn is therefore not a transformation — it is the minimum needed to address an existing crisis, funded by wealth taxes that international evidence shows reliably underperform.',
    keyStats: [
      { label: 'England current social care spend', value: '£20bn+/yr', context: 'Green Party £20bn is not net new — it\'s the existing gap', comparison: "This isn't new money \u2014 it's plugging the existing hole", direction: 'negative' },
      { label: 'Funding gap by 2028/29', value: '£3.4bn', context: 'just to maintain existing standards (Health Foundation)', comparison: 'The gap grows every year as the population ages', direction: 'negative' },
      { label: 'Scotland funding shortfall', value: '£46–63m/yr', context: 'Audit Scotland — within years of free care being introduced', comparison: 'Councils had to ration care within years of the promise', direction: 'negative' },
      { label: 'Value of unpaid care in England', value: '£54bn/yr', context: 'informal carers providing services the state cannot afford', comparison: 'Unpaid carers provide more care than the entire state system', direction: 'neutral' },
    ],
    manifestoRef: { section: 'Health and Social Care', page: 'pp. 6-8', url: 'https://greenparty.org.uk/about/our-manifesto/' },
    caseStudies: [
      {
        country: 'Scotland',
        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        title: 'Scotland\'s Free Personal Care: Promise vs. Reality',
        description: 'Scotland introduced free personal care in 2002 to great fanfare. Audit Scotland\'s review found that central government funding failed to keep pace with demand within just a few years of introduction.',
        outcome: 'Local councils faced annual funding shortfalls of £46-63m. They responded by tightening eligibility criteria, meaning many people who were supposed to benefit were assessed as not qualifying. The policy\'s promise exceeded its delivery because the cost was systematically underestimated.',
        year: '2002–present',
        sources: [
          { label: 'Audit Scotland: Review of Free Personal and Nursing Care', url: 'https://audit.scot/uploads/docs/report/2008/nr_080201_free_personal_care_km.pdf' },
          { label: 'Health Foundation: Adult Social Care Funding Pressures', url: 'https://www.health.org.uk/reports-and-analysis/analysis/adult-social-care-funding-pressures-2023-35' },
        ],
      },
    ],
    chartData: {
      type: 'bar',
      title: 'Adult Social Care: Funding Gap Projections (£bn additional needed)',
      data: [
        { label: '2024/25', value: 1.8, color: '#f59e0b' },
        { label: '2025/26', value: 2.4, color: '#f59e0b' },
        { label: '2026/27', value: 2.9, color: '#ef4444' },
        { label: '2027/28', value: 3.2, color: '#ef4444' },
        { label: '2028/29', value: 3.4, color: '#ef4444' },
      ],
      unit: '£bn',
      source: 'Health Foundation: Adult Social Care Funding Pressures 2023-35',
    },
    debate: [
      {
        theySay: 'No one should have to sell their home to pay for care in old age. Free personal care is a mark of a civilised society and Scotland has shown it can be done.',
        weSay: 'Scotland introduced free personal care in 2002 and the principle is admirable. However, Audit Scotland found funding failed to keep pace with demand within years, leaving councils with £46-63m annual shortfalls. Councils tightened eligibility criteria, meaning many people who were supposed to benefit did not qualify. The cost was systematically underestimated.',
      },
      {
        theySay: 'The £20bn we propose to spend on social care is a genuine investment that will save money in the long run by preventing more expensive hospital admissions.',
        weSay: 'The preventative argument has genuine merit. However, England already spends £20bn+ per year on adult social care and faces a £3.4bn funding gap just to maintain existing standards. The Green Party\'s £20bn is therefore not a net addition to a functioning system; it is the minimum needed to address an existing crisis. The question is whether the funding mechanism — primarily wealth taxes — can reliably deliver that revenue, given the evidence from Norway and France.',
      },
    ],
    riskScore: { fiscal: 6, economic: 2, social: 2 },
    verdict: 'The goal of free personal care is right and the current system is a genuine injustice. But Scotland\'s experience shows the cost is systematically underestimated and the funding mechanism matters enormously. The Green Party\'s plan to fund this through wealth taxes — which international evidence shows reliably underperform — creates a serious risk that the promise will exceed the delivery, as it did in Scotland.',
    sources: [
      { label: 'Audit Scotland: Review of Free Personal and Nursing Care', url: 'https://audit.scot/uploads/docs/report/2008/nr_080201_free_personal_care_km.pdf' },
      { label: 'Health Foundation: Adult Social Care Funding Pressures', url: 'https://www.health.org.uk/reports-and-analysis/analysis/adult-social-care-funding-pressures-2023-35' },
    ],
    bestCaseGBP: -10000000000,
    worstCaseGBP: -30000000000,
    securityImpact: 0,
    securityReason: "No direct impact on defence or security.",
    inequalityImpact: 2,
    inequalityReason: "No one should sell their home for care — addresses a genuine injustice for elderly and disabled people.",
    servicesImpact: 1,
    servicesReason: "Preventative care reduces expensive hospital admissions, but Scotland shows funding often fails to keep pace.",
    headlineStat: { value: '£46–63m/yr', label: "Scotland's funding shortfall within years of free care" },
  },
];

export const ANALYSIS_LAST_UPDATED = '2026-03-22';
export const MANIFESTO_VERSION = 'Green Party 2024 General Election Manifesto';

export const categoryColors: Record<string, string> = {
  Economy: '#d4a017',
  Defence: '#ef4444',
  Energy: '#3b82f6',
  Housing: '#8b5cf6',
  Work: '#06b6d4',
  Welfare: '#f59e0b',
  Transport: '#10b981',
  Society: '#ec4899',
  Education: '#6366f1',
  Environment: '#22c55e',
  'Foreign Policy': '#64748b',
  Health: '#e11d48',
};

export const riskColors: Record<RiskLevel, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626',
};

export const riskLabels: Record<RiskLevel, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical Risk',
};
