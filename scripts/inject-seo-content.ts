/**
 * Post-build script: injects all policy content as semantic HTML
 * into the built index.html so that crawlers (LLMs, Bing, etc.)
 * that don't execute JavaScript can still read every word.
 *
 * The content is placed inside a visually-hidden <article> block
 * that is visible to screen readers and crawlers but not sighted users
 * (who see the React-rendered version instead).
 */

import fs from 'node:fs';
import path from 'node:path';

// We can't import TS directly, so we'll read and extract the data
// using a dynamic import with tsx
async function main() {
  const policyDataPath = path.resolve('client/src/lib/policyData.ts');
  const distPath = path.resolve('dist/public/index.html');

  if (!fs.existsSync(distPath)) {
    console.error('dist/public/index.html not found. Run vite build first.');
    process.exit(1);
  }

  // Dynamically import the policy data using tsx
  const mod = await import(policyDataPath);
  const policies = mod.policies as any[];
  const ANALYSIS_LAST_UPDATED = mod.ANALYSIS_LAST_UPDATED as string;
  const MANIFESTO_VERSION = mod.MANIFESTO_VERSION as string;

  // Build semantic HTML content
  let html = `
<div id="seo-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;" aria-hidden="false">
  <article>
    <h1>Green Party Manifesto Analysed: 14 Policies Fact-Checked Against International Evidence</h1>
    <p>An independent, evidence-based review of the ${MANIFESTO_VERSION}. Analysis last updated: ${ANALYSIS_LAST_UPDATED}.</p>
    <p>By Andy Chadwick. Independent, not affiliated with any political party.</p>
    <p>This site examines 14 Green Party UK policies against real-world evidence from Norway, France, Germany, Scotland, Finland and official UK data from the IFS, ONS, NIESR, SIPRI, and NBER.</p>
`;

  for (const p of policies) {
    html += `
    <section id="policy-${p.id}">
      <h2>Policy ${p.number}: ${p.title}</h2>
      <p><strong>Category:</strong> ${p.category} | <strong>Risk Level:</strong> ${p.riskLevel}</p>
      <p><strong>Green Party Claim:</strong> ${p.greenClaim}</p>

      <h3>Summary</h3>
      <p>${p.summary}</p>

      <h3>What the Green Party Gets Right</h3>
      <ul>
${p.positives.map((pos: string) => `        <li>${pos}</li>`).join('\n')}
      </ul>

      <h3>The Evidence</h3>
      <p>${p.counterArgument}</p>

      <h3>Key Statistics</h3>
      <dl>
${p.keyStats.map((s: any) => `        <dt>${s.value} — ${s.label}</dt>\n        <dd>${s.context}${s.comparison ? '. ' + s.comparison : ''}</dd>`).join('\n')}
      </dl>

      <h3>Case Studies</h3>
${p.caseStudies.map((cs: any) => `      <section>
        <h4>${cs.flag} ${cs.title} (${cs.country}, ${cs.year})</h4>
        <p>${cs.description}</p>
        <p><strong>Outcome:</strong> ${cs.outcome}</p>
      </section>`).join('\n')}

      <h3>They Say / We Say</h3>
${p.debate.map((d: any) => `      <div>
        <p><strong>They Say:</strong> ${d.theySay}</p>
        <p><strong>We Say:</strong> ${d.weSay}</p>
      </div>`).join('\n')}

      <h3>The Verdict</h3>
      <p>${p.verdict}</p>
      <p>Risk Scores — Fiscal: ${p.riskScore.fiscal}/10, Economic: ${p.riskScore.economic}/10, Social: ${p.riskScore.social}/10</p>
      <p>Impact — Security: ${p.securityImpact} (${p.securityReason}), Inequality: ${p.inequalityImpact} (${p.inequalityReason}), Public Services: ${p.servicesImpact} (${p.servicesReason})</p>

      <h3>Sources</h3>
      <ul>
${p.sources.map((s: any) => `        <li><a href="${s.url}">${s.label}</a></li>`).join('\n')}
      </ul>
    </section>
`;
  }

  html += `
  </article>
</div>`;

  // Inject before </body>
  let indexHtml = fs.readFileSync(distPath, 'utf-8');
  indexHtml = indexHtml.replace('</body>', html + '\n</body>');
  fs.writeFileSync(distPath, indexHtml, 'utf-8');

  console.log(`✓ Injected SEO content for ${policies.length} policies into dist/public/index.html`);
}

main().catch(console.error);
