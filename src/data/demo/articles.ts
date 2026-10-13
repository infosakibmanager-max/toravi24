/**
 * DEMONSTRATION DATA — FICTIONAL.
 *
 * Every story, country, organisation and institution in this file is invented
 * for design-evaluation purposes (e.g. "Veldora", "Kestria", "Northmark",
 * "Aurelian Federation", "Coastal Nations Forum"). None of it is real news.
 *
 * Images are freely licensed Unsplash photographs served via Lorem Picsum and
 * are illustrative only — they do not depict the events described.
 *
 * This file is only imported by `src/services/content/demoProvider.ts`.
 * Replace the provider, not the UI, when real content arrives.
 */
import type { Article, ArticleBlock, ArticleImage, CategorySlug } from '../../types/content';

const PLACEHOLDER_CAPTION = 'Illustrative image only — not a photograph of the events described.';

function photo(id: number, author: string, unsplashId: string, alt: string): ArticleImage {
  return {
    url: `https://picsum.photos/id/${id}/1600/900`,
    alt,
    caption: PLACEHOLDER_CAPTION,
    credit: `${author} / Unsplash`,
    creditUrl: `https://unsplash.com/photos/${unsplashId}`,
    width: 1600,
    height: 900,
  };
}

interface DemoInput {
  id: string;
  slug: string;
  category: CategorySlug;
  headline: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  image: ArticleImage | null;
  body: ArticleBlock[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  tags?: string[];
}

function demo(input: DemoInput): Article {
  return {
    isFeatured: false,
    isBreaking: false,
    ...input,
    status: 'published',
    authors: [{ name: 'TORAVI24 Demo Desk', role: 'Demonstration content' }],
    sources: [{ name: 'Fictional demonstration source (no real document exists)' }],
    editorial: { aiAssisted: true },
    isDemo: true,
  };
}

const p = (text: string): ArticleBlock => ({ type: 'paragraph', text });
const h = (text: string): ArticleBlock => ({ type: 'heading', text });
const list = (items: string[]): ArticleBlock => ({ type: 'list', items });
const note = (title: string, text: string): ArticleBlock => ({ type: 'note', title, text });

export const DEMO_ARTICLES: Article[] = [
  /* ------------------------------------------------------------------ WORLD */
  demo({
    id: 'demo-w1',
    slug: 'coastal-nations-forum-flood-warning-framework',
    category: 'world',
    headline: 'Coastal Nations Forum agrees framework to share real-time flood warnings across 14 states',
    summary:
      'The fictional regional body says member states will pool tide-gauge and rainfall data into a single alert system, with the first shared warnings expected before next year’s storm season.',
    publishedAt: '2026-10-13T15:20:00Z',
    updatedAt: '2026-10-13T16:05:00Z',
    isFeatured: true,
    tags: ['Flooding', 'Early warning', 'Regional cooperation'],
    image: photo(162, 'Dillon McIntosh', 'SlGVAKyP20U', 'Aerial view of a rugged coastline meeting deep blue sea'),
    body: [
      p('Member states of the Coastal Nations Forum — a fictional regional organisation used here for demonstration — have agreed a framework to share flood-warning data in real time, according to the forum’s published summary of the meeting.'),
      p('Under the framework, national meteorological agencies would feed tide-gauge readings, river levels and rainfall forecasts into a common platform. Alerts would then be issued in each member state’s official languages, using a shared severity scale.'),
      h('What the framework changes'),
      p('Until now, each member state has issued warnings independently, which the forum’s summary describes as producing inconsistent thresholds across shared river basins and coastlines. The new arrangement is intended to give downstream communities earlier notice when an upstream or neighbouring state detects rising water.'),
      list([
        'A single severity scale with four levels, replacing national scales that ranged from three to six levels.',
        'A shared data platform hosted on a rotating basis by member agencies.',
        'A commitment to publish warning performance reviews after major events.',
      ]),
      h('What remains unresolved'),
      p('The summary notes that funding for the shared platform has not yet been finalised, and that two member states have requested additional time to align their legal frameworks for cross-border data sharing.'),
      p('Implementation details, including how alerts will reach people without mobile connectivity, are due to be set out in a technical annex later this year.'),
      note('Why it matters', 'Shared early-warning systems are one of the most widely recommended measures for reducing flood losses. How quickly this fictional framework moves from agreement to operation will determine whether it has any effect next season.'),
    ],
  }),
  demo({
    id: 'demo-w2',
    slug: 'kestria-capital-night-transit-pilot',
    category: 'world',
    headline: 'Kestria’s capital pilots a night-time transit network as population outpaces forecasts',
    summary:
      'Twelve overnight routes will run for six months in the fictional city, with officials promising to publish ridership data before deciding whether to make the service permanent.',
    publishedAt: '2026-10-13T11:45:00Z',
    image: photo(348, 'Anna Dziubinska', 'mVhd5QVlDWw', 'Commuters moving through a busy, multi-level transit concourse'),
    body: [
      p('The transport authority of Kestria’s capital — a fictional city — has launched a six-month pilot of twelve overnight bus and tram routes, according to its published service notice.'),
      h('Why now'),
      p('The authority’s notice links the pilot to population growth that has exceeded earlier planning forecasts, and to a rising share of residents working evening and overnight shifts in healthcare, logistics and hospitality.'),
      p('Routes have been designed to connect the city’s three largest hospitals, its main freight terminal and outer residential districts with limited late-night options.'),
      h('How success will be judged'),
      p('The authority has committed to publishing monthly ridership, punctuality and cost figures. A decision on whether to continue the network is expected after the pilot concludes.'),
    ],
  }),
  demo({
    id: 'demo-w3',
    slug: 'sundar-archipelago-aid-flights-resume',
    category: 'world',
    headline: 'Aid flights resume to the Sundar Archipelago after a week of storm closures',
    summary:
      'Airport operators in the fictional island group say runways have reopened and relief cargo is being prioritised, while ferry services remain suspended pending inspections.',
    publishedAt: '2026-10-13T08:30:00Z',
    image: photo(364, 'José Martín', 'Gauk-pFdvKk', 'A passenger jet parked at an airport gate with service vehicles'),
    body: [
      p('Relief flights have resumed to the Sundar Archipelago, a fictional island group, after storm damage closed its two main airports for seven days, according to the operators’ statement.'),
      p('The statement says runway and navigation systems were inspected before reopening and that relief cargo — including water purification equipment and medical supplies — is being given priority over commercial traffic.'),
      h('Ferries still suspended'),
      p('Inter-island ferry services remain suspended while harbour infrastructure is surveyed. Officials have not given a date for their return.'),
    ],
  }),
  demo({
    id: 'demo-w4',
    slug: 'veldora-census-delay-regional-budgets',
    category: 'world',
    headline: 'Census delay in Veldora leaves regional budgets in limbo',
    summary:
      'Regional governments in the fictional country say they cannot finalise next year’s spending plans until updated population figures are released.',
    publishedAt: '2026-10-12T17:10:00Z',
    image: photo(214, 'Kelly Sikkema', 'Ereoqdv5s48', 'High-angle view over dense city blocks'),
    body: [
      p('A delay in publishing census results in Veldora, a fictional country, is holding up budget planning in several regions whose funding is calculated partly on population, according to a joint letter from regional finance officials.'),
      h('The funding link'),
      p('Veldora’s national funding formula allocates a portion of transfers based on resident population. The joint letter argues that relying on figures from the previous census would underfund fast-growing regions.'),
      p('The national statistics office has said it is completing quality checks and will announce a revised publication date.'),
    ],
  }),

  /* --------------------------------------------------------------- POLITICS */
  demo({
    id: 'demo-p1',
    slug: 'veldora-parliament-lobbying-meetings-disclosure',
    category: 'politics',
    headline: 'Veldora’s parliament votes to publish all ministerial lobbying meetings online',
    summary:
      'The fictional legislature’s transparency bill requires ministers to log meetings with outside interests within 30 days, in a searchable public register.',
    publishedAt: '2026-10-13T13:55:00Z',
    isFeatured: true,
    tags: ['Transparency', 'Lobbying', 'Legislation'],
    image: photo(193, 'Vadim Sherbakov', 'd6ebY-faOO0', 'Historic stone building with spires behind a wide lawn'),
    body: [
      p('Lawmakers in Veldora, a fictional country, have passed a bill requiring ministers and senior officials to publish records of meetings with lobbyists and outside interest groups, according to the parliament’s published vote record.'),
      h('What the law requires'),
      list([
        'Meetings must be logged within 30 days in a public, searchable online register.',
        'Entries must include the organisation represented, the date and the policy area discussed.',
        'An independent commissioner will audit a sample of entries each year.',
      ]),
      h('Points of debate'),
      p('According to the published record of the debate, opponents argued that the 30-day window was too long, while some ministers raised concerns about administrative workload. Amendments to shorten the deadline were defeated.'),
      p('The law is scheduled to take effect at the start of the next parliamentary session.'),
    ],
  }),
  demo({
    id: 'demo-p2',
    slug: 'northmark-coalition-talks-pension-indexation',
    category: 'politics',
    headline: 'Northmark coalition talks stall over pension indexation',
    summary:
      'Negotiators from the fictional country’s three largest parties have agreed on housing and energy but remain divided on how state pensions should rise with prices.',
    publishedAt: '2026-10-13T09:40:00Z',
    image: photo(409, 'Ariana Prestes', 'RwNd3xQhjNs', 'Ornate facade of an older civic building'),
    body: [
      p('Coalition negotiations in Northmark, a fictional country, have paused after parties failed to agree on how state pensions should be adjusted for inflation, according to a joint statement from the negotiating teams.'),
      p('The statement lists housing supply and energy pricing as areas where provisional agreement has been reached. Pension indexation is described as the main outstanding issue.'),
      h('What happens next'),
      p('Talks are scheduled to resume next week. If no agreement is reached, the fictional constitution allows the head of state to invite a different combination of parties to negotiate.'),
    ],
  }),
  demo({
    id: 'demo-p3',
    slug: 'kestria-paper-ballot-audit-trial',
    category: 'politics',
    headline: 'Kestria’s electoral commission trials paper-ballot audits in three districts',
    summary:
      'The fictional commission will hand-count a random sample of ballots and compare results with electronic tallies, publishing the methodology in advance.',
    publishedAt: '2026-10-12T14:20:00Z',
    image: photo(299, 'Matthew Wiebe', 'nOhUx3tiaQQ', 'Tall buildings lining a city street'),
    body: [
      p('Kestria’s electoral commission — a fictional body — will run risk-limiting audits in three districts at the next local elections, according to its published methodology.'),
      h('How the audit works'),
      p('Auditors will draw a random sample of paper ballots and hand-count them. If the sample confirms the electronic result with a pre-set level of confidence, the audit ends; if not, the sample is expanded.'),
      p('The commission says it will publish the random seed, sample sizes and results so that independent observers can check the process.'),
    ],
  }),
  demo({
    id: 'demo-p4',
    slug: 'explainer-aurelian-two-chamber-budget-process',
    category: 'politics',
    headline: 'Explainer: How the Aurelian Federation’s new two-chamber budget process will work',
    summary:
      'A step-by-step guide to the fictional federation’s revised budget timetable, from the executive’s first draft to the final joint vote.',
    publishedAt: '2026-10-11T10:00:00Z',
    image: photo(48, 'Luke Chesser', '1uxV8fAfhVM', 'Laptop on a wooden desk beside a window'),
    body: [
      p('The Aurelian Federation, a fictional state, has revised the way its annual budget passes through its two legislative chambers. This explainer sets out the new sequence.'),
      h('The new timetable'),
      list([
        'The executive publishes a draft budget and fiscal outlook.',
        'The lower chamber’s finance committee holds public hearings.',
        'The upper chamber reviews regional allocations in parallel.',
        'A joint committee reconciles differences before a final vote in both chambers.',
      ]),
      h('Why it changed'),
      p('According to the fictional reform bill’s explanatory notes, the previous sequential process regularly ran past the start of the fiscal year, forcing temporary spending measures.'),
    ],
  }),

  /* ------------------------------------------------------------ GEOPOLITICS */
  demo({
    id: 'demo-g1',
    slug: 'meridian-strait-navigation-accord-talks',
    category: 'geopolitics',
    headline: 'Meridian Strait shipping talks: what each side wants from a new navigation accord',
    summary:
      'Delegations from the fictional coastal states bordering the strait are negotiating rules on inspections, fees and emergency access. Here is where their positions differ.',
    publishedAt: '2026-10-13T12:30:00Z',
    isFeatured: true,
    tags: ['Maritime', 'Trade routes', 'Diplomacy'],
    image: photo(266, 'John Maravelakis', 'Vosp2wlY3Bs', 'Cargo ships on a calm sea at the horizon'),
    body: [
      p('Negotiators from three fictional states bordering the Meridian Strait have begun a new round of talks on rules for commercial shipping, according to a joint communiqué issued at the opening session.'),
      h('The main issues'),
      list([
        'Inspection rights: who may board vessels, and under what circumstances.',
        'Transit fees: whether a shared fee should replace separate national charges.',
        'Emergency access: guaranteed passage for rescue and pollution-response vessels.',
      ]),
      h('Where positions differ'),
      p('The communiqué acknowledges “differing views” on inspection authority. The largest of the three states favours a joint inspection service; the two smaller states have proposed retaining national inspections with mutual recognition.'),
      p('On fees, all three delegations have agreed in principle to publish a common fee schedule, though not yet on how revenue would be divided.'),
      note('What to watch', 'A draft text is expected at the next session. Whether it includes a dispute-resolution mechanism will indicate how durable any accord is likely to be.'),
    ],
  }),
  demo({
    id: 'demo-g2',
    slug: 'aurelia-northmark-energy-dialogue',
    category: 'geopolitics',
    headline: 'Aurelian Federation and Northmark open first direct energy dialogue in a decade',
    summary:
      'Ministers from the two fictional states will meet quarterly to discuss interconnectors and gas storage, according to a joint statement.',
    publishedAt: '2026-10-12T19:15:00Z',
    image: photo(382, 'RayBay', 'kG71BXh8KFw', 'Dense traffic on a city avenue between high-rise buildings'),
    body: [
      p('Energy ministers from the Aurelian Federation and Northmark — both fictional — have agreed to hold quarterly talks, the first formal bilateral energy channel between them in ten years, according to their joint statement.'),
      p('The statement identifies cross-border electricity interconnectors and coordination of seasonal gas storage as the initial agenda.'),
      h('Context'),
      p('Relations between the two fictional states have been strained by a long-running dispute over transit charges. The joint statement does not mention that dispute.'),
    ],
  }),
  demo({
    id: 'demo-g3',
    slug: 'analysis-small-island-states-ocean-council-votes',
    category: 'geopolitics',
    headline: 'Analysis: Why small island states are becoming pivotal votes at the Ocean Council',
    summary:
      'Shifting voting rules at the fictional multilateral body have given its smallest members more influence over fisheries and seabed decisions.',
    publishedAt: '2026-10-12T09:00:00Z',
    image: photo(203, 'Diogo Tavares', 'PFZTiiJnjag', 'A person standing by the sea at sunset next to a bicycle'),
    body: [
      p('Changes to how decisions are taken at the Ocean Council, a fictional multilateral body, have increased the weight of its smallest member states. This analysis looks at why.'),
      h('From consensus to qualified majority'),
      p('The council’s fictional charter was amended to allow some decisions by qualified majority rather than consensus. Because each member holds one vote, coalitions of small states can now block or carry proposals.'),
      h('Implications'),
      p('Fisheries quotas and exploratory seabed licences are the areas where this shift is most likely to be felt, based on the council’s published agenda for the coming year.'),
    ],
  }),
  demo({
    id: 'demo-g4',
    slug: 'kestria-veldora-border-data-pact',
    category: 'geopolitics',
    headline: 'Border data-sharing pact between Kestria and Veldora enters into force',
    summary:
      'The fictional neighbours will exchange customs and travel-document data electronically, with an independent data-protection review after one year.',
    publishedAt: '2026-10-11T15:45:00Z',
    image: photo(342, 'Steven Lewis', 'r4He4Btlsro', 'Busy street with pedestrians and motorbikes'),
    body: [
      p('An agreement between Kestria and Veldora — two fictional countries — to exchange customs and travel-document information electronically has entered into force, according to both governments’ official gazettes.'),
      p('The pact limits the data that can be shared, sets retention periods and requires an independent data-protection review after its first year.'),
    ],
  }),

  /* ------------------------------------------------------------- TECHNOLOGY */
  demo({
    id: 'demo-t1',
    slug: 'open-source-ai-audit-training-data-disclosure',
    category: 'technology',
    headline: 'Open-source AI model audit finds documentation gaps in training-data disclosures',
    summary:
      'A fictional independent review of 40 openly released models found that most described their architecture in detail but few documented where training data came from.',
    publishedAt: '2026-10-13T14:10:00Z',
    tags: ['Artificial intelligence', 'Transparency', 'Open source'],
    image: photo(366, 'Rayi Christian Wicaksono', '6PF6DaiWz48', 'Hand resting near a computer keyboard and mug in monochrome'),
    body: [
      p('A review of 40 openly released AI models by a fictional independent research group found consistent gaps in how training data is documented, according to the group’s published report.'),
      h('Key findings'),
      list([
        'Most models included detailed descriptions of their architecture and evaluation results.',
        'A minority listed the specific datasets used for training.',
        'Very few documented how data had been filtered or licensed.',
      ]),
      h('Why documentation matters'),
      p('The report argues that without training-data documentation, downstream users cannot properly assess bias, copyright exposure or suitability for sensitive uses.'),
      p('The group has published a template it hopes developers will adopt, and says it will repeat the review next year.'),
    ],
  }),
  demo({
    id: 'demo-t2',
    slug: 'helix-grid-low-power-ai-chip',
    category: 'technology',
    headline: 'Helix Grid unveils chip designed to run language models on solar-powered devices',
    summary:
      'The fictional company says its processor targets off-grid clinics and field sensors; independent benchmarks have not yet been published.',
    publishedAt: '2026-10-13T07:50:00Z',
    image: photo(160, 'Thom', 'Zdcq3iKly6g', 'Smartphone lying on a dark surface in close-up'),
    body: [
      p('Helix Grid, a fictional chip designer, has announced a low-power processor intended to run compact language models on devices powered by small solar panels, according to the company’s product announcement.'),
      p('The company says the chip is aimed at off-grid medical clinics, agricultural sensors and disaster-response equipment.'),
      h('Claims not yet verified'),
      p('The announcement includes the company’s own performance figures. No independent benchmarks have been published, and the company has not said when samples will be available to researchers.'),
    ],
  }),
  demo({
    id: 'demo-t3',
    slug: 'explainer-verifiable-ai-provenance-labels',
    category: 'technology',
    headline: 'Explainer: What “verifiable AI provenance” labels mean — and what they don’t',
    summary:
      'Content-provenance labels can show how an image or video was made and edited. They cannot, on their own, prove that it is true.',
    publishedAt: '2026-10-12T12:00:00Z',
    image: photo(373, 'Jay Wennington', 'i8CYGnoerR0', 'Hand holding a smartphone, screen glowing'),
    body: [
      p('Provenance labels attach a signed record to a piece of media describing how it was captured and edited. This explainer, written for demonstration, outlines what such labels can and cannot establish.'),
      h('What a label can show'),
      list([
        'Which device or software created the file.',
        'Which edits were applied, and by which tools.',
        'Whether the record has been tampered with since signing.',
      ]),
      h('What it cannot show'),
      p('A valid label does not confirm that what the media depicts is accurate or presented in the right context. A missing label does not prove that media is fake. Labels are one input to verification, not a substitute for it.'),
    ],
  }),
  demo({
    id: 'demo-t4',
    slug: 'northmark-libraries-laptop-lending',
    category: 'technology',
    headline: 'Public libraries in Northmark begin lending refurbished laptops to job seekers',
    summary:
      'The fictional scheme loans devices for up to three months and includes free digital-skills sessions.',
    publishedAt: '2026-10-11T08:15:00Z',
    image: photo(0, 'Alejandro Escamilla', 'yC-Yzbqy7PY', 'Laptop and phone on a wooden table'),
    body: [
      p('Libraries across Northmark, a fictional country, have started lending refurbished laptops to people looking for work, according to the national library service.'),
      p('Devices can be borrowed for up to three months and come with free sessions on online applications, video interviews and basic cybersecurity.'),
    ],
  }),

  /* ---------------------------------------------------------------- SCIENCE */
  demo({
    id: 'demo-s1',
    slug: 'halvern-seed-bank-viability-40-years',
    category: 'science',
    headline: 'Halvern Institute researchers report seed bank samples still viable after 40 years',
    summary:
      'Germination tests on stored cereal and legume seeds at the fictional institute exceeded expectations, though results varied widely by species.',
    publishedAt: '2026-10-13T10:25:00Z',
    image: photo(239, 'Coley Christine', 'GyvMk5pPDXI', 'Hand holding a dandelion seed head against a dark background'),
    body: [
      p('Researchers at the Halvern Institute, a fictional research centre, report that many seed samples stored for four decades remain able to germinate, according to a paper the institute says is under peer review.'),
      h('Variation by species'),
      p('Cereal samples showed the highest germination rates; some oil-rich seeds performed poorly. The authors caution that storage conditions changed twice during the period studied.'),
      h('Caveats'),
      p('Because the paper has not yet completed peer review, its findings should be treated as preliminary.'),
    ],
  }),
  demo({
    id: 'demo-s2',
    slug: 'deep-ocean-survey-seafloor-ridge',
    category: 'science',
    headline: 'Deep-ocean survey maps 1,200 km of previously unsurveyed seafloor ridge',
    summary:
      'Sonar data from a fictional research vessel will be released openly, adding detail to global bathymetry efforts.',
    publishedAt: '2026-10-12T16:40:00Z',
    image: photo(41, 'Nithya Ramanujam', 'fTKetYpEKNQ', 'Water droplets on a smooth surface in close-up'),
    body: [
      p('A fictional research expedition has completed high-resolution sonar mapping of a 1,200-kilometre stretch of mid-ocean ridge, according to the expedition’s cruise report.'),
      p('The team says the data will be deposited in an open archive so that other scientists can use it.'),
    ],
  }),
  demo({
    id: 'demo-s3',
    slug: 'urban-trees-cooling-varies-by-species',
    category: 'science',
    headline: 'Study of urban trees suggests cooling benefits vary sharply by species',
    summary:
      'Measurements across a fictional city found that canopy shape and leaf density mattered more than tree height for street-level temperatures.',
    publishedAt: '2026-10-11T13:30:00Z',
    image: photo(159, 'Shyamanta Baruah', 'kxqvE41_07k', 'A water droplet hanging from the tip of a green leaf'),
    body: [
      p('A fictional study measuring street-level temperatures beneath more than 2,000 trees found large differences in cooling between species, according to the published paper.'),
      h('Planning implications'),
      p('The authors suggest city planners consider canopy density and leaf area, not just the number of trees planted, when designing heat-mitigation programmes.'),
    ],
  }),
  demo({
    id: 'demo-s4',
    slug: 'replication-lab-repeats-own-results',
    category: 'science',
    headline: 'Why replication matters: inside a lab’s year-long effort to repeat its own results',
    summary:
      'A fictional research group tried to reproduce five of its own published findings. Three held up, one partly held, and one did not.',
    publishedAt: '2026-10-10T09:10:00Z',
    image: photo(20, 'Aleks Dorohovich', 'nJdwUHmaY8A', 'Notebooks, a tablet and stationery arranged on a desk'),
    body: [
      p('A fictional laboratory spent a year attempting to replicate five of its own earlier studies, publishing the results regardless of outcome.'),
      list([
        'Three findings replicated fully.',
        'One replicated with a smaller effect size.',
        'One did not replicate.',
      ]),
      p('The group says it has issued a correction for the study that did not replicate and has published its full protocols.'),
    ],
  }),

  /* ---------------------------------------------------------------- CLIMATE */
  demo({
    id: 'demo-c1',
    slug: 'kestria-wind-corridor-grid-connection',
    category: 'climate',
    headline: 'Kestria connects its largest wind corridor to the national grid ahead of winter',
    summary:
      'The fictional grid operator says the new transmission line will let coastal wind farms supply inland cities during peak demand.',
    publishedAt: '2026-10-13T06:45:00Z',
    image: photo(182, 'Andrea Boldizsar', 'BwgKUh9tN84', 'Wind turbines beside a curving coastal road'),
    body: [
      p('Kestria’s grid operator — a fictional company — has completed a transmission line connecting a coastal wind corridor to inland demand centres, according to its operational notice.'),
      h('Winter readiness'),
      p('The operator says the line will reduce the need to curtail wind output on windy days when local demand is low. It has not published updated capacity figures.'),
    ],
  }),
  demo({
    id: 'demo-c2',
    slug: 'veldora-drought-monitoring-network-expands',
    category: 'climate',
    headline: 'Drought monitoring network expands to cover Veldora’s interior plains',
    summary:
      'Forty new soil-moisture stations will feed a public dashboard, giving farmers in the fictional region weekly drought indicators.',
    publishedAt: '2026-10-12T11:20:00Z',
    image: photo(196, 'Dyaa Eldin Moustafa', 'mR_HR8NZwg8', 'Sand dunes under a pale sky'),
    body: [
      p('Veldora’s fictional national weather service is installing 40 soil-moisture stations across its interior plains, according to a service announcement.'),
      p('Data will be published weekly on a public dashboard alongside rainfall and temperature anomalies.'),
    ],
  }),
  demo({
    id: 'demo-c3',
    slug: 'aurelian-factories-electric-boilers',
    category: 'climate',
    headline: 'Industrial heat: factories in the Aurelian Federation test electric boilers',
    summary:
      'Six fictional plants are trialling high-temperature electric boilers to replace gas, with results due next year.',
    publishedAt: '2026-10-11T17:00:00Z',
    image: photo(297, 'André Robillard', 'IUwLkxL49co', 'Industrial silos and pipework under a cloudy sky'),
    body: [
      p('Six manufacturing plants in the Aurelian Federation, a fictional state, are testing electric boilers for industrial process heat, according to the federation’s industry ministry.'),
      h('The challenge'),
      p('Industrial heat is often cited as one of the harder sources of emissions to cut. The trial will compare running costs, reliability and grid impact against existing gas systems.'),
    ],
  }),
  demo({
    id: 'demo-c4',
    slug: 'glacier-fed-rivers-decade-gauge-data',
    category: 'climate',
    headline: 'Glacier-fed rivers: what a decade of gauge data shows',
    summary:
      'A fictional hydrology agency’s ten-year record points to earlier spring peaks and lower late-summer flows.',
    publishedAt: '2026-10-10T14:00:00Z',
    image: photo(28, 'Jerry Adney', '_WiFMBRT7Aw', 'River valley covered in dense green forest'),
    body: [
      p('A fictional hydrology agency has published ten years of river-gauge data from glacier-fed catchments.'),
      p('The agency’s summary describes a shift towards earlier spring peaks and reduced flows in late summer, with implications for irrigation and hydropower planning.'),
    ],
  }),

  /* --------------------------------------------------------------- BUSINESS */
  demo({
    id: 'demo-b1',
    slug: 'meridian-trade-council-lowers-growth-outlook',
    category: 'business',
    headline: 'Meridian Trade Council lowers growth outlook, citing shipping costs',
    summary:
      'The fictional council’s quarterly report trims its regional forecast and flags freight prices as the main downside risk.',
    publishedAt: '2026-10-13T12:05:00Z',
    image: photo(411, 'Philipp Henzler', 'dgE3lWVyDh8', 'City skyline with high-rise towers'),
    body: [
      p('The Meridian Trade Council, a fictional economic body, has lowered its regional growth forecast in its latest quarterly report.'),
      h('Shipping costs'),
      p('The report identifies higher freight costs as the largest risk to its outlook, alongside slower investment in manufacturing.'),
      p('It notes that services exports have remained resilient.'),
    ],
  }),
  demo({
    id: 'demo-b2',
    slug: 'northmark-central-bank-holds-rates',
    category: 'business',
    headline: 'Northmark central bank holds rates steady for a third consecutive meeting',
    summary:
      'The fictional bank’s statement points to easing inflation but says it wants more evidence before cutting.',
    publishedAt: '2026-10-12T13:00:00Z',
    image: photo(238, 'Anders Jildén', 'yb0Qs65aZmc', 'Monochrome view across a dense skyline of skyscrapers'),
    body: [
      p('Northmark’s central bank — a fictional institution — has left its main interest rate unchanged, according to its policy statement.'),
      p('The statement says inflation has eased but that the committee wants to see further evidence of slowing wage growth before reducing rates.'),
    ],
  }),
  demo({
    id: 'demo-b3',
    slug: 'small-exporters-shared-logistics-hubs',
    category: 'business',
    headline: 'Small exporters turn to shared logistics hubs as freight prices swing',
    summary:
      'Pooling warehouse space and container bookings is helping some fictional firms manage volatile shipping costs.',
    publishedAt: '2026-10-11T11:30:00Z',
    image: photo(1, 'Alejandro Escamilla', 'LNRyGwIJr5c', 'Person working on a laptop at a wooden table'),
    body: [
      p('Small exporters in the fictional Meridian region are increasingly using shared logistics hubs to pool warehousing and container bookings, according to a survey published by a fictional trade association.'),
      p('The association says pooling helps smaller firms negotiate rates closer to those available to large shippers.'),
    ],
  }),
  demo({
    id: 'demo-b4',
    slug: 'orbis-grid-shareholders-approve-split',
    category: 'business',
    headline: 'Orbis Grid shareholders approve split into generation and networks companies',
    summary:
      'The fictional utility will separate its power plants from its regulated transmission business by the end of next year.',
    publishedAt: '2026-10-10T16:20:00Z',
    image: photo(180, 'Galymzhan Abdugalimov', 'ICW6QYOcdlg', 'Laptop and an open notebook on a wooden desk'),
    body: [
      p('Shareholders of Orbis Grid, a fictional utility, have approved a plan to split the company in two, according to the company’s filing.'),
      p('One company will own power generation assets; the other will run the regulated transmission network.'),
    ],
  }),

  /* --------------------------------------------------------------- SECURITY */
  demo({
    id: 'demo-sec1',
    slug: 'veldora-grid-operator-cyber-intrusion-attempt',
    category: 'security',
    headline: 'Veldora’s grid operator reports cyber intrusion attempt; services unaffected',
    summary:
      'The fictional operator says it detected and contained unauthorised access attempts on corporate systems, and that electricity supply was not disrupted.',
    publishedAt: '2026-10-13T16:30:00Z',
    isBreaking: true,
    tags: ['Cybersecurity', 'Critical infrastructure'],
    image: photo(331, 'Thong Vo', 'g28MgVK85bQ', 'Silhouette of a person standing in a large industrial hall'),
    body: [
      p('Veldora’s national grid operator, a fictional company, says it detected attempts to gain unauthorised access to its corporate IT systems, according to a short statement on its website.'),
      p('The statement says the attempts were contained, that operational systems controlling electricity supply are separated from the affected network, and that supply was not disrupted.'),
      h('What is not yet known'),
      p('The operator has not said who may be responsible or whether any data was accessed. It says it has informed the national cybersecurity agency.'),
      note('Developing story', 'This demonstration article illustrates how a developing story with limited confirmed information would be presented.'),
    ],
  }),
  demo({
    id: 'demo-sec2',
    slug: 'kestria-hospitals-restore-records-after-ransomware',
    category: 'security',
    headline: 'Kestrian hospitals restore records systems after month-long ransomware recovery',
    summary:
      'The fictional health authority says patient records are fully accessible again and has published a review of what went wrong.',
    publishedAt: '2026-10-12T10:10:00Z',
    image: photo(352, 'Caleb George', 'URmkfvtK3Qw', 'Light trails from traffic on a curving road at night'),
    body: [
      p('Hospitals in Kestria — a fictional country — have restored access to electronic patient records, a month after a ransomware attack, according to the regional health authority.'),
      h('The review'),
      p('The authority’s published review identifies an unpatched remote-access system as the initial point of entry and lists changes to backup and access controls.'),
    ],
  }),
  demo({
    id: 'demo-sec3',
    slug: 'explainer-coastal-maritime-patrol-agreement',
    category: 'security',
    headline: 'Explainer: How the Coastal Nations Forum’s maritime patrol agreement allocates responsibility',
    summary:
      'A guide to the fictional agreement’s patrol zones, information-sharing rules and limits on the use of force.',
    publishedAt: '2026-10-11T09:30:00Z',
    image: null,
    body: [
      p('The Coastal Nations Forum’s maritime patrol agreement — fictional, like the forum itself — divides responsibility for search-and-rescue and fisheries enforcement among member states.'),
      h('Patrol zones'),
      p('Each member is responsible for a defined zone, with overlapping areas handled through a shared coordination centre.'),
      h('Limits'),
      p('The agreement restricts enforcement actions to a member’s own zone unless the neighbouring state consents.'),
    ],
  }),
  demo({
    id: 'demo-sec4',
    slug: 'northmark-aurelia-drone-incident-guidance',
    category: 'security',
    headline: 'Northmark and Aurelia publish joint guidance on reporting drone incidents near infrastructure',
    summary:
      'The fictional guidance sets common definitions and a single reporting channel for sightings near airports, ports and power stations.',
    publishedAt: '2026-10-10T12:45:00Z',
    image: photo(363, 'José Martín', 'RxaN6Bbches', 'Overhead power lines and railway infrastructure'),
    body: [
      p('Defence and transport ministries in Northmark and the Aurelian Federation — both fictional — have published joint guidance on reporting drone sightings near critical infrastructure.'),
      p('The guidance introduces shared definitions so that incidents are categorised consistently across the border, and a single reporting channel for operators.'),
    ],
  }),
];

/** Curated ordering used for the demo "Most read" list. No real analytics exist yet. */
export const DEMO_MOST_READ_SLUGS: string[] = [
  'open-source-ai-audit-training-data-disclosure',
  'coastal-nations-forum-flood-warning-framework',
  'meridian-strait-navigation-accord-talks',
  'explainer-verifiable-ai-provenance-labels',
  'veldora-parliament-lobbying-meetings-disclosure',
  'kestria-wind-corridor-grid-connection',
];
