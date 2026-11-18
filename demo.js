/* Fixed synthetic fixtures. No model/API calls and no visitor data storage. */
export const documents = Object.freeze({
  "A24": {
    "title": "Aurora AI FY2024 Report",
    "text": "Aurora AI reported FY2024 revenue of $120 million and operating income of $18 million. Figures are final for fiscal year 2024."
  },
  "A25": {
    "title": "Aurora AI FY2025 Report",
    "text": "Aurora AI reported FY2025 revenue of $150 million and operating income of $35 million. Its two largest customers represented 28% of FY2025 revenue, creating customer concentration risk. Figures are final for fiscal year 2025."
  },
  "N24": {
    "title": "Nova Cloud FY2024 Report",
    "text": "Nova Cloud reported FY2024 revenue of $100 million and operating income of $10 million. Figures are final for fiscal year 2024."
  },
  "N25": {
    "title": "Nova Cloud FY2025 Report",
    "text": "Nova Cloud reported FY2025 revenue of $140 million and operating income of $14 million. Approximately 75% of its production workloads relied on one cloud infrastructure provider, creating vendor concentration risk. Figures are final for fiscal year 2025."
  },
  "F26": {
    "title": "October 2026 Management Forecast",
    "text": "As of October 15, 2026, Aurora AI management projected FY2026 revenue of $185 million. This is a management forecast, not an audited result. No FY2026 revenue projection for Nova Cloud is provided in this memo."
  }
});
const fmt = value => value.toFixed(2);
export function answerFor(kind) {
  if (kind === 'margin') {
    const aurora=35/150*100,nova=14/140*100;
    return {status:'Calculated from supplied evidence',heading:'Aurora has the higher operating margin.',paragraphs:[`Aurora AI: ${fmt(aurora)}% [A25]. Nova Cloud: ${fmt(nova)}% [N25].`,`Aurora’s margin is higher by ${fmt(aurora-nova)} percentage points, using unrounded margins.`],formula:'Operating margin = operating income / revenue × 100\nAurora: 35 / 150 × 100 = 23.33%\nNova: 14 / 140 × 100 = 10.00%',sourceIds:['A25','N25'],values:{aurora,nova,gap:aurora-nova}};
  }
  if (kind === 'growth') {
    const aurora=(150-120)/120*100,nova=(140-100)/100*100;
    return {status:'Calculated from supplied evidence',heading:'Nova has the higher revenue growth.',paragraphs:[`Aurora AI: ${fmt(aurora)}% [A24, A25]. Nova Cloud: ${fmt(nova)}% [N24, N25].`,`Nova’s growth is higher by ${fmt(nova-aurora)} percentage points.`],formula:'Revenue growth = (current − prior revenue) / prior revenue × 100\nAurora: (150 − 120) / 120 × 100 = 25.00%\nNova: (140 − 100) / 100 × 100 = 40.00%',sourceIds:['A24','A25','N24','N25'],values:{aurora,nova,gap:nova-aurora}};
  }
  if (kind === 'forecast') return {status:'Forecast status preserved',heading:'$185 million is a forecast, not an audited actual.',paragraphs:['The October 15, 2026 management memo projects Aurora AI’s FY2026 revenue at $185 million [F26].','The supplied evidence does not establish achieved or audited FY2026 revenue.'],sourceIds:['F26']};
  if (kind === 'cashflow') return {status:'Insufficient evidence',heading:'Operating cash flow cannot be determined.',paragraphs:['Nova’s FY2025 report supplies revenue and operating income, but not operating cash flow [N25].','Operating income cannot be substituted for cash flow.'],sourceIds:['N25']};
  if (kind === 'proxy') return {status:'Unsupported inference declined',heading:'Workload share does not establish revenue share.',paragraphs:['The report says 75% of Nova’s production workloads relied on one provider [N25].','It does not give the associated share of revenue. Multiplying revenue by 75% would introduce an unsupported assumption.'],sourceIds:['N25']};
  throw new Error('Unsupported demonstration question');
}
function render(kind){
  const result=answerFor(kind),answer=document.getElementById('answer'),sources=document.getElementById('sources');
  answer.replaceChildren();sources.replaceChildren();document.getElementById('result-status').textContent=result.status;
  const lead=document.createElement('p');lead.className='answer-lead';lead.textContent=result.heading;answer.append(lead);
  for(const text of result.paragraphs){const p=document.createElement('p');p.textContent=text;answer.append(p);}
  if(result.formula){const p=document.createElement('p');p.className='formula';p.style.whiteSpace='pre-line';p.textContent=result.formula;answer.append(p);}
  for(const id of result.sourceIds){const item=documents[id],article=document.createElement('article'),heading=document.createElement('h4'),p=document.createElement('p');heading.textContent=`[${id}] ${item.title}`;p.textContent=item.text;article.append(heading,p);sources.append(article);}
}
if(typeof document!=='undefined'){
  const control=document.getElementById('question');control.addEventListener('change',()=>render(control.value));render(control.value);
}
