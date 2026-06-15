// ─── Site Content ────────────────────────────────────────────────────────────
//
// All editable content lives here.
// When integrating a CMS, replace these exports with API calls.
//
// ─────────────────────────────────────────────────────────────────────────────

export const siteUrl = 'https://betterbydesign.ie'

export const event = {
  name: 'Better By Design',
  year: '2026',
  tagline: 'Public Service Design',
  subtag: 'Conference & Showcase',
  date: 'Thursday 18 June 2026',
  location: 'The Lighthouse, Dublin',
  ticketsUrl:
    'https://www.eventbrite.com/e/better-by-design-tickets-1988012336414?aff=oddtdtcreator',
  agendaUrl: '/?panel=agenda',
  // ─── Live stream ───────────────────────────────────────────────
  // Set isLive: true on the morning of the event to switch the site to live mode.
  // Replace liveStreamUrl with the YouTube embed URL for the stream.
  isLive: false,
  liveStreamUrl: 'https://www.youtube.com/embed/  ',
  liveStartText: '9:30am, Thursday 18 June',
  liveThumbUrl: '/images/live-thumb.webp' as string | null,
}

export const navigation = [
  { label: 'Agenda',     href: '/?panel=agenda',       external: false },
  { label: 'Keynotes',   href: '#keynotes',             external: false },
  { label: 'Themes',     href: '#themes',               external: false },
  { label: 'Panellists', href: '#panellists',           external: false },
  { label: 'Brochure',   href: 'assets/brochure.pdf',   external: true  },
]

export const partners = {
  heading: 'Partners & Supporters',
  body: 'A Shared Island event delivered by the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation in partnership with Creative Ireland, and hosted by the Institute of Designers Ireland.',
  image: '/images/partners.webp',
  imageAlt: 'Conference partners and supporting organisations',
}

export const partnerLogos = [
  { src: '/images/gov-ireland.svg',            alt: 'Government of Ireland',          href: 'https://www.gov.ie' },
  { src: '/images/shared-island.svg',          alt: 'Shared Island Initiative',       href: 'https://www.gov.ie/en/department-of-the-taoiseach/campaigns/shared-island/' },
  { src: '/images/creative-ireland.svg',       alt: 'Creative Ireland Programme',     href: 'https://www.creativeireland.gov.ie' },
  { src: '/images/better-public-services.svg', alt: 'Better Public Services',         href: 'https://www.gov.ie/en/department-of-public-expenditure-infrastructure-public-service-reform-and-digitalisation/campaigns/better-public-services/' },
  { src: '/images/idi-logo.svg',               alt: 'Institute of Designers Ireland', href: 'https://www.idi-design.ie/' },
]

// ─── Speaker Profiles ─────────────────────────────────────────────────────────
// Central registry used by agenda and speaker bio drawers.

export interface SpeakerProfile {
  slug: string
  name: string
  role: string
  organisation: string
  bio?: string
  image?: string | null
  linkedin?: string
  avatarPosition?: string
}

export const speakerProfiles: Record<string, SpeakerProfile> = {
  'charlotte-barker': {
    slug: 'charlotte-barker',
    name: 'Charlotte Barker',
    role: 'Chief Executive',
    organisation: 'The Institute of Designers in Ireland',
    image: '/images/charlotte-barker.webp',
    linkedin: 'https://www.linkedin.com/in/charlotte-barker-59588821/',
    bio: 'Charlotte is a member of the Government Forum for Digital Creative Industries and a member of An Bord for the National College of Art and Design. In 2023 Charlotte instigated the sustainability platform Design Declares and recently led Design 2035, a vision of where Irish design will be in 10 years\' time. The IDI will be leading a National Design Policy Lab programme through to 2027.',
  },
  'tania-banotti': {
    slug: 'tania-banotti',
    name: 'Tania Banotti',
    role: 'Director',
    organisation: 'Creative Ireland',
    image: '/images/tania.webp',
    linkedin: 'https://www.linkedin.com/in/tania-banotti-1060a441',
    bio: 'Tania Banotti is Director of the whole-of-government Creative Ireland Programme established in 2017, based in the Department of Culture, Communications and Sport. The goal of the programme is to embed creativity across government policy. It currently works with 8 government departments, 12 state agencies and all 31 local authorities. There are five pillars: Creative Youth, Creative Communities, Creativity, Health and Wellbeing, Creative Climate Action and Creative Industries.\n\nDesign is one of the targeted sectors under the government\'s Roadmap for the Digital Creative Industries. Creative Ireland is supporting the Institute of Designers in Ireland to make connections between policy makers in the public service and design businesses north and south over the next 3 years under the Shared Island initiative.',
  },
  'jack-chambers-td': {
    slug: 'jack-chambers-td',
    name: 'Jack Chambers TD',
    role: 'Minister for Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    organisation: '',
    image: '/images/jack-chambers.webp',
    avatarPosition: 'center 15%',
  },
  'patrick-odonovan-td': {
    slug: 'patrick-odonovan-td',
    name: 'Patrick O\'Donovan TD',
    role: 'Minister for Culture, Communications and Sport',
    organisation: '',
    image: '/images/patrick-o-donovan.webp',
    avatarPosition: 'center 15%',
  },
  'frank-feighan-td': {
    slug: 'frank-feighan-td',
    name: 'Frank Feighan TD',
    role: 'Minister of State',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: '/images/frank-td.webp',
    avatarPosition: 'center 15%',
  },
  'trevor-vaugh': {
    slug: 'trevor-vaugh',
    name: 'Trevor Vaugh',
    role: 'Public Sector Design Lead',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: '/images/trevor-vaugh.webp',
    linkedin: 'https://www.linkedin.com/in/trevorvaugh/',
    bio: 'Trevor has led the work to embed design across government. He chaired the group that created Ireland\'s first Government Design Principles — approved by Cabinet in 2022 — and subsequently led the development and delivery of the Action Plan for Designing Better Public Services.\n\nTrevor was a tenured academic in Strategic Design at Maynooth University, founding Mi:Lab — a national research lab for higher education transformation. Previously he developed innovative medical devices and holds more than 50 patents in healthcare innovation. He co-authored ARRIVE (Routledge, 2021) and has published widely on strategic design for change. Trevor presented RTÉ\'s Science to the Rescue documentary and appeared as an expert on the series The Big Life Fix. He co-developed AI voice technology for veteran journalist Charlie Bird.\n\nTrevor sits on several steering groups and advisory boards, supporting public sector design initiatives, shaping design policy and development for the OECD, World Bank, and European Commission.',
  },
  'ben-holliday': {
    slug: 'ben-holliday',
    name: 'Ben Holliday',
    role: 'Chief Design Officer',
    organisation: 'TPXimpact',
    image: '/images/ben-holliday.webp',
    linkedin: 'https://www.linkedin.com/in/beholliday/',
    bio: 'Ben Holliday is an experienced leader and Chief Design Officer at TPXimpact. With over 25 years\' experience he works with teams to support the transformation of organisations and public services. Ben previously worked in the UK government, holding key roles at the Department for Work and Pensions (DWP) and the Government Digital Service (GDS). Before this, he delivered major product and service work across the not-for-profit, arts, education, and financial sectors. In 2022, Ben published his first book, Multiplied: How Digital Transformation Can Deliver More Impact for the Public Sector.',
  },
  'prof-sabine-junginger': {
    slug: 'prof-sabine-junginger',
    name: 'Professor Sabine Junginger',
    role: 'Professor of Design & Vice Chancellor\'s Fellow',
    organisation: 'Northumbria University',
    image: '/images/sabine-junginger.webp',
    linkedin: 'https://www.linkedin.com/in/sabinejunginger/',
    bio: 'Sabine Junginger is Professor and Vice Chancellor\'s Fellow at Northumbria University in the UK. Her research focuses on human-centred design in government with a concern for policy making and policy implementation. She approaches these challenges from the lived experiences of everyday people, public servants and policy makers. She brings an international perspective drawing on her work with Swiss municipalities, Brazilian ministries and her advisory roles for experimental projects like OECD Government to Government incubator program.\n\nShe is the author of Transforming Public Services by Design – Reorienting Policies, Organizations and Services Around People (Routledge 2016) and has been an ongoing research fellow at the Hertie School, recently recognized to be the top Policy School in Germany. Her recent work engages with the challenges and implications of digital-first and digital-only public services in ageing societies. She is currently working on the 2nd edition of the Bloomsbury Handbook of Design Management.',
  },
  'aidan-oboyle': {
    slug: 'aidan-oboyle',
    name: 'Aidan O\'Boyle',
    role: 'Public Service Transformation Design Lead for Life Events',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: '/images/aidan.webp',
    linkedin: 'https://www.linkedin.com/in/aidanoboyle/',
    bio: 'Aidan has been a designer his whole career and since 2012 has specialised in applying human-centred design practices inside large publicly funded organisation to transform their services. Aidan has developed Life Events based services for the New Zealand Government. At Citizens Advice UK he established the service design team and led the design of several key services including Live Chat, a Debt Management Service, Energy Advice services, and Help to Claim Universal Credit. At Genomics England he was Principal Service Designer for the Health Care Testing service which delivered Whole Genome Sequence testing services for the NHS.',
  },
  'alison-boland': {
    slug: 'alison-boland',
    name: 'Alison Boland',
    role: 'Head of Digital Transformation',
    organisation: 'Department of Housing, Local Government and Heritage',
    image: '/images/alison.webp',
    linkedin: 'https://www.linkedin.com/in/alison-boland-3930974/',
    bio: 'Alison leads digital transformation initiatives and brings extensive experience delivering transformation programmes across the public sector. Most recently, she led the development of the Department\'s first digital strategy, Digital Strategy 2030: Sustainable Communities and Delivery of Homes, published in January 2026, which sets out a strategic vision for digital transformation, service improvement and delivery.\n\nOriginally trained as a software developer, Alison has a strong technical background, holding both a Bachelor\'s degree and a Master of Science in Software Engineering from Maynooth University. She is currently undertaking a Master of Arts in Service Design at the National College of Art and Design (NCAD), further strengthening her focus on user-centred, inclusive and outcomes-driven public services.',
  },
  'dan-eames': {
    slug: 'dan-eames',
    name: 'Dan Eames',
    role: 'Senior Digital Design Advisor',
    organisation: 'Centre for Excellence in Universal Design, National Disability Authority',
    image: '/images/dan-eames.webp',
    linkedin: '',
    bio: 'Dan is a digital designer and design advisor supporting Ireland\'s public sector organisations to embed human-centred universal design across their digital systems. With international experience in design, research, and digital innovation, he supports the creation of inclusive digital services that work for everyone.',
  },
  'kevin-horan': {
    slug: 'kevin-horan',
    name: 'Kevin Horan',
    role: 'Head of Design',
    organisation: 'Digital Team, HSE Communications and Public Affairs',
    image: '/images/kevin.webp',
    linkedin: 'https://www.linkedin.com/in/kevin-horan-96217110/',
    bio: 'Kevin works with multidisciplinary teams spanning research, design, technology, infrastructure, communications and customer experience to help people navigate their care, and the health system.',
  },
  'john-mckeon': {
    slug: 'john-mckeon',
    name: 'John McKeon',
    role: 'Secretary General',
    organisation: 'Department of Social Protection',
    image: '/images/john-mckeon.webp',
    avatarPosition: 'center 15%',
    bio: 'John McKeon joined the Department of Social Protection in October 2010 and was appointed Secretary General in July 2017.\n\nPrior to his appointment he held Assistant Secretary positions with responsibility for activation policy, the development and implementation of the Pathways to Work programme, and the modernisation of the department\'s public office (Intreo) services. He also held responsibility for staff relations and Finance, Legislation and PRSI policy.\n\nPrior to joining the department he worked for the Department of Post and Telegraphs / Telecom Éireann / Eircom over a period of 31 years most latterly as Managing Director of eircom Wholesale.',
  },
  'angela-denning': {
    slug: 'angela-denning',
    name: 'Angela Denning',
    role: 'Chief Executive',
    organisation: 'Courts Service',
    image: '/images/angela-denning.webp',
    linkedin: 'https://www.linkedin.com/company/courts-service/posts/?feedView=all',
    bio: 'Angela Denning was appointed Chief Executive in 2019 and has more than 30 years\' experience in the civil service. She has served as Deputy Master of the High Court, is a qualified barrister and has a master\'s in leadership and strategy. She leads a 10-year modernisation programme across ten programme streams aimed at improving access to justice through digital transformation and service redesign.\n\nShe has prioritised user-friendly services with a vision rooted in making justice more efficient and responsive to societal needs. She has a deep understanding of the justice sector\'s complexities and seeks to drive reform with a focus on digital enablement, simplification of procedures, and stakeholder engagement. She is a member of the Board of the Courts Service, the Public Service Data Governance Board and the Northern Ireland Courts and Tribunal Service Themis Programme Board.',
  },
  'marianne-cassidy': {
    slug: 'marianne-cassidy',
    name: 'Marianne Cassidy',
    role: 'Assistant Secretary',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: '/images/marianne.webp',
    linkedin: 'https://www.linkedin.com/in/marianne-cassidy-b05a0b4/',
    bio: 'Marianne leads the Public Service Transformation Division. She is responsible for advancing public service transformation across government, including implementation of Civil Service Renewal 2030 and shaping the next phase of public service reform. Marianne previously held senior roles with the Courts Service, the Ombudsman for Children\'s Office and the National Transport Authority.',
  },
  'dr-caoimhe-mc-mahon': {
    slug: 'dr-caoimhe-mc-mahon',
    name: 'Dr Caoimhe Mc Mahon',
    role: 'Programme Lead for the MA and Professional Diploma in Service Design',
    organisation: 'National College of Art and Design',
    image: '/images/caoimhe-mc-mahon.webp',
    linkedin: 'https://www.linkedin.com/in/caoimhe-mc-mahon-a1596226/',
    bio: 'Caoimhe also heads NCAD Design Lab: Civic, a national centre for applied design research, focused on public sector transformation and citizen participation.\n\nHer work focuses on public sector service design, and the role of human-centred, evidence-led approaches in improving public services and citizen experiences. She is particularly interested in how co-design approaches, collaborative sense-making, and experience prototyping can be embedded within public sector organisations to support service improvement for service providers and users, and build long-term capacity for innovation across the public sector.',
  },
  'malcolm-beattie': {
    slug: 'malcolm-beattie',
    name: 'Malcolm Beattie',
    role: 'Former Head of Northern Ireland Innovation Lab',
    organisation: '',
    image: '/images/malcolm-beattie.webp',
    linkedin: 'https://www.linkedin.com/in/malcolmbeattie/',
    bio: 'Malcolm Beattie is a former Civil Servant who spent 10 years as Head of the Northern Ireland Public Sector Innovation Lab. The iLab was created in 2014 to respond to challenges where effective service provision for the public has proved most difficult. Malcolm was responsible for its establishment and evolution and was at the forefront of promoting innovation in the Northern Ireland Public Sector.\n\nMalcolm has extensive experience in developing innovative solutions. He championed Service Design, Behavioural Science, Policy Innovation and Systems Modelling as fundamental tools for the design and delivery of improved public services. He maintains a close interest in public sector innovation and transformation and writes about the associated challenges facing public sector leaders as they address rising public demand and widespread calls for reform.',
  },
  'jared-gormly': {
    slug: 'jared-gormly',
    name: 'Jared Gormly',
    role: 'Head of HSE Spark Innovation Programme',
    organisation: 'HSE Spark',
    image: '/images/jared-gormly.webp',
    linkedin: 'https://www.linkedin.com/in/jaredgormly/',
    bio: 'The HSE Spark Innovation Programme is Ireland\'s national frontline healthcare innovation initiative. Since leading the programme from its early development, Jared has worked to build a culture of innovation across the Irish health service by empowering healthcare staff to identify challenges and develop practical, patient-centred solutions. The HSE Spark Programme supports clinicians and multidisciplinary teams through innovation training, design methodologies, collaboration networks and funding opportunities, helping transform ideas into impactful improvements in care delivery and service design.\n\nWith a strong focus on human-centred design and frontline-led change, Jared champions the belief that those closest to patient care are best positioned to drive meaningful healthcare innovation. Under his leadership, Spark has grown into a nationally recognised programme supporting thousands of healthcare professionals and showcasing innovation that improves patient outcomes, staff experience and system efficiency.',
  },
  'lynne-whelan': {
    slug: 'lynne-whelan',
    name: 'Lynne Whelan',
    role: 'Senior Change Management Professional',
    organisation: 'South East Technological University',
    image: '/images/lynne-whelan.webp',
    linkedin: 'https://www.linkedin.com/in/lynne-whelan-a7104019/',
    bio: 'Lynne is a specialist in organisational transformation through design, with multiple international publications on innovation and change. Her proven framework, process, and toolkits have been applied across hundreds of organisations worldwide, equipping teams to adapt with confidence, and use design to uncover opportunities and evaluate ideas for real-world impact.\n\nHer career spans a wealth of experience in both commercial and public sector settings, coupled with a strong track record in shaping process development within the design industry. In her current role as Senior Change Management Professional at SETU, Lynne works with teams and departments to turn the university\'s ambitious strategic plan into results-driven, meaningful action, through her bespoke design framework.',
  },
  'brenda-murphy': {
    slug: 'brenda-murphy',
    name: 'Brenda Murphy',
    role: 'City Innovation Broker',
    organisation: 'Belfast City Council',
    image: '/images/brenda.webp',
    avatarPosition: 'center 15%',
    linkedin: 'https://www.linkedin.com/in/brenda-murphy-20906421',
    bio: 'Brenda Murphy is an experienced innovation, stakeholder engagement, and strategic development professional with more than 25 years\' experience across local government, economic development, tourism, utilities, and customer services. She has a strong track record of building partnerships between public, private, and community stakeholders, leading complex projects, and delivering initiatives that drive innovation, growth, and customer-focused outcomes.\n\nCurrently Innovation Broker at Belfast City Council, Brenda supports business innovation and collaboration across the region. Her career includes senior roles with the Department for the Economy and Tourism Northern Ireland, where she led tourism development, visitor communications, digital platforms, operational transformation, and stakeholder engagement programmes.',
  },
  'tomas-o-ruairc': {
    slug: 'tomas-o-ruairc',
    name: 'Tomás Ó Ruairc',
    role: 'Assistant Secretary',
    organisation: 'Department of Education and Youth',
    image: '/images/tomas.webp',
    linkedin: 'https://www.linkedin.com/in/tom%C3%A1s-%C3%B3-ruairc-391a2917/',
    bio: 'His responsibilities include HR, External Staff Relations, Terms and Conditions, Initial Teacher Education policy, Strategy and Development, as well as Research, Evaluation and Knowledge Mobilisation.\n\nPrevious roles in the Department have included school transport, Irish-language policy, communications and stakeholder engagement, parents and learners, statistics and data strategy. Prior to this, he was CEO of the Teaching Council in Ireland, the statutory professional standards body for, and regulator of, the teaching profession from 2012 to 2022. He started his career as a post-primary teacher of History, Irish and Mathematics.',
  },
  'shawna-coxon': {
    slug: 'shawna-coxon',
    name: 'Shawna Coxon',
    role: 'Deputy Commissioner, Policing Operations',
    organisation: 'An Garda Síochána',
    image: '/images/shawna.webp',
    linkedin: 'https://www.linkedin.com/in/shawnacoxon',
    bio: 'Deputy Commissioner Shawna Coxon is a senior criminal justice leader with a wide range of experience obtained from serving in two countries. She is currently a Deputy Commissioner with An Garda Síochána (AGS), Ireland\'s National Police and Security Service, having taken up the role as Deputy Commissioner in 2021. AGS has approximately 18,000 personnel, and Deputy Commissioner Coxon is responsible for all policing operations in Ireland. Prior to that, she served with a large police service in Canada. Deputy Commissioner Coxon has her Master\'s in Criminology and her PhD in Criminal Law. She is also an adjunct professor who has extensively published and spoken internationally.',
  },
  'dr-rachael-singleton': {
    slug: 'dr-rachael-singleton',
    name: 'Dr Rachael Singleton',
    role: 'Behavioural Science Lecturer',
    organisation: 'Ulster University',
    image: '/images/rachel.webp',
    linkedin: 'https://www.linkedin.com/in/rachael-singleton/',
    bio: 'Rachael has worked across NI government departments in supporting the design and delivery of public policy by applying behavioural science to tackle societal, environmental and economic challenges, ranging from debtor behaviour to COVID transmission, and from net zero to business innovation. Her PhD in behavioural science and user-centred design focuses on pro-environmental behaviour change. She founded and co-chairs the international working group Behaviour Change for Sustainable Outcomes, is co-investigator on EPIC Futures NI and Future Island-Island, and leads research to embed behavioural science across the NI Civil Service.\n\nAdvisory panel member of Centre-UB, Rachael enjoys working to engage deeper understanding of human behaviour to support people and place, and working with those same people using co-design to ensure they are active in decision making and change processes that result.',
  },
  'damian-cranney': {
    slug: 'damian-cranney',
    name: 'Damian Cranney',
    role: 'Chief Executive',
    organisation: 'Big Motive',
    image: '/images/daimen.webp',
    linkedin: 'https://www.linkedin.com/in/damiancranney/',
    bio: 'Big Motive is a strategy and design firm based in Belfast and Dublin. For over 20 years, Damian has helped global brands, ambitious startups and public bodies design systems and services that enable better experience and business growth. Damian\'s role has evolved toward working alongside senior leaders, helping them turn complex challenges into design-led strategy and action. His work spans healthcare, government, sport and enterprise technology, from national health systems to global brands including Adidas, BBC and Allstate.\n\nDamian\'s conviction is that design is a strategic discipline, not a stage in the process, and that the organisations who win, treat the whole customer journey as a critical business function. Damian has advised startups and non-profits, acted as an external examiner, spoken and lectured widely, and is a past President of the Institute of Designers in Ireland.',
  },
}

// ─── Agenda ───────────────────────────────────────────────────────────────────

export interface AgendaItem {
  time: string
  type: 'registration' | 'break' | 'lunch' | 'welcome' | 'address' | 'ministerial' | 'keynote' | 'panel' | 'closing'
  title: string
  subtitle?: string
  moderator?: string   // speaker slug
  speakers?: string[]  // speaker slugs
}

export const agenda: AgendaItem[] = [
  {
    time: '08:30',
    type: 'registration',
    title: 'Registration',
    subtitle: 'Tea, coffee and breakfast',
  },
  {
    time: '09:30',
    type: 'welcome',
    title: 'Welcome',
    speakers: ['charlotte-barker', 'tania-banotti'],
  },
  {
    time: '09:40',
    type: 'address',
    title: 'Opening Address',
    speakers: ['jack-chambers-td'],
  },
  {
    time: '09:55',
    type: 'ministerial',
    title: 'Ministerial Welcome',
    speakers: ['patrick-odonovan-td'],
  },
  {
    time: '10:15',
    type: 'keynote',
    title: 'Keynote Speaker',
    speakers: ['trevor-vaugh'],
  },
  {
    time: '10:50',
    type: 'panel',
    title: 'Designing Digital',
    subtitle: 'Digital and Innovation at Scale',
    moderator: 'angela-denning',
    speakers: ['aidan-oboyle', 'alison-boland', 'dan-eames', 'kevin-horan', 'john-mckeon'],
  },
  {
    time: '11:30',
    type: 'break',
    title: 'Break',
  },
  {
    time: '12:00',
    type: 'keynote',
    title: 'Keynote Speaker',
    speakers: ['ben-holliday'],
  },
  {
    time: '12:30',
    type: 'panel',
    title: 'Designing How We Work',
    subtitle: 'Workforce and Organisation of the Future',
    moderator: 'marianne-cassidy',
    speakers: ['dr-caoimhe-mc-mahon', 'malcolm-beattie', 'jared-gormly', 'lynne-whelan', 'brenda-murphy'],
  },
  {
    time: '13:10',
    type: 'lunch',
    title: 'Lunch',
  },
  {
    time: '14:10',
    type: 'keynote',
    title: 'Keynote Speaker',
    speakers: ['prof-sabine-junginger'],
  },
  {
    time: '14:45',
    type: 'panel',
    title: 'Designing with Evidence',
    subtitle: 'Evidence-Informed Policies and Services',
    moderator: 'tomas-o-ruairc',
    speakers: ['shawna-coxon', 'prof-sabine-junginger', 'dr-rachael-singleton', 'damian-cranney'],
  },
  {
    time: '15:30',
    type: 'closing',
    title: 'Closing Remarks',
    speakers: ['frank-feighan-td'],
  },
]

// ─── Keynotes ────────────────────────────────────────────────────────────────

export interface Keynote {
  id: number
  slug: string
  name: string
  role: string
  organisation: string
  image: string | null
}

export const keynotes: Keynote[] = [
  {
    id: 1,
    slug: 'trevor-vaugh',
    name: 'Trevor Vaugh',
    role: 'Public Sector Design Lead',
    organisation: 'DPER',
    image: '/images/trevor-vaugh.webp',
  },
  {
    id: 2,
    slug: 'ben-holliday',
    name: 'Ben Holliday',
    role: 'Chief Design Officer',
    organisation: 'TPXImpact',
    image: '/images/ben-holliday.webp',
  },
  {
    id: 3,
    slug: 'prof-sabine-junginger',
    name: 'Prof. Sabine Junginger',
    role: 'Professor of Design & Vice Chancellor\'s Fellow',
    organisation: 'Northumbria University',
    image: '/images/sabine-junginger.webp',
  },
]

// ─── Ministers ───────────────────────────────────────────────────────────────

export interface Minister {
  id: number
  slug: string
  name: string
  role: string
  organisation: string
  image: string | null
}

export const ministers: Minister[] = [
  {
    id: 1,
    slug: 'jack-chambers-td',
    name: 'Jack Chambers TD',
    role: 'Minister for Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    organisation: '',
    image: '/images/jack-chambers.webp',
  },
  {
    id: 2,
    slug: 'patrick-odonovan-td',
    name: 'Patrick O\'Donovan TD',
    role: 'Minister for Culture, Communications and Sport',
    organisation: '',
    image: '/images/patrick-o-donovan.webp',
  },
  {
    id: 3,
    slug: 'frank-feighan-td',
    name: 'Frank Feighan TD',
    role: 'Minister of State',
    organisation: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation',
    image: '/images/frank-td.webp',
  },
]

// ─── Themes ──────────────────────────────────────────────────────────────────

export interface Theme {
  number: string
  title: string
  subtitle: string
  description: string
}

export const themes: Theme[] = [
  {
    number: '1',
    title: 'Principles to Practice',
    subtitle: 'Guidelines for Designing for Public Value',
    description: '',
  },
  {
    number: '2',
    title: 'Designing Digital',
    subtitle: 'Digital & Innovation at Scale',
    description: '',
  },
  {
    number: '3',
    title: 'Designing How We Work',
    subtitle: 'Workforce & Organisation of the Future',
    description: '',
  },
  {
    number: '4',
    title: 'Designing with Evidence',
    subtitle: 'Evidence-Informed Policies and Services',
    description: '',
  },
]

export const themesActionDescription =
  "Three years on from the launch of Ireland's Action Plan for Designing Better Public Services, Better By Design 2026 takes stock of what has been achieved and looks ahead. The Action Plan set a clear direction for embedding design across the public service — this conference brings together the people doing that work to share what's working, where the challenges are, and how we keep building."

export const actionPlanUrl =
  'https://www.gov.ie/en/department-of-public-expenditure-infrastructure-public-service-reform-and-digitalisation/publications/action-plan-for-designing-better-public-services/'

// ─── Panellists ──────────────────────────────────────────────────────────────

export interface Panellist {
  id: number
  slug: string
  name: string
  role: string
  organisation: string
  image: string | null
}

export const panellistsIntro =
  'Better By Design 2026 brings together practitioners, researchers and leaders from across the Irish public service and beyond — all working to make public services better through design.'

export const panellists: Panellist[] = [
  // Welcome
  { id: 1,  slug: 'charlotte-barker',     name: 'Charlotte Barker',      role: 'Chief Executive',                                               organisation: 'The Institute of Designers in Ireland',             image: '/images/charlotte-barker.webp' },
  { id: 2,  slug: 'tania-banotti',        name: 'Tania Banotti',          role: 'Director',                                                      organisation: 'Creative Ireland',                                  image: '/images/tania.webp' },
  // Panel 1 — Designing Digital
  { id: 3,  slug: 'aidan-oboyle',         name: 'Aidan O\'Boyle',         role: 'Public Service Transformation Design Lead for Life Events',      organisation: 'DPER',                                              image: '/images/aidan.webp' },
  { id: 4,  slug: 'alison-boland',        name: 'Alison Boland',          role: 'Head of Digital Transformation',                                organisation: 'Department of Housing, Local Government and Heritage', image: '/images/alison.webp' },
  { id: 5,  slug: 'dan-eames',            name: 'Dan Eames',              role: 'Senior Digital Design Advisor',                                 organisation: 'CEUD and NDA',                                      image: '/images/dan-eames.webp' },
  { id: 6,  slug: 'kevin-horan',          name: 'Kevin Horan',            role: 'Head of Design',                                                organisation: 'HSE Communications and Public Affairs',             image: '/images/kevin.webp' },
  { id: 7,  slug: 'john-mckeon',          name: 'John McKeon',            role: 'Secretary General',                                             organisation: 'Department of Social Protection',                   image: '/images/john-mckeon.webp' },
  // Panel 2 — Designing How We Work
  { id: 8,  slug: 'marianne-cassidy',     name: 'Marianne Cassidy',       role: 'Assistant Secretary',                                           organisation: 'DPER',                                              image: '/images/marianne.webp' },
  { id: 9,  slug: 'dr-caoimhe-mc-mahon',  name: 'Dr Caoimhe Mc Mahon',    role: 'Programme Lead, MA and Professional Diploma in Service Design', organisation: 'National College of Art and Design',                image: '/images/caoimhe-mc-mahon.webp' },
  { id: 10, slug: 'malcolm-beattie',      name: 'Malcolm Beattie',        role: 'Former Head of Northern Ireland Innovation Lab',                organisation: '',                                                  image: '/images/malcolm-beattie.webp' },
  { id: 11, slug: 'jared-gormly',         name: 'Jared Gormly',           role: 'Head of HSE Spark Innovation Programme',                        organisation: 'HSE Spark',                                         image: '/images/jared-gormly.webp' },
  { id: 12, slug: 'lynne-whelan',         name: 'Lynne Whelan',           role: 'Senior Change Management Professional',                         organisation: 'SETU',                                              image: '/images/lynne-whelan.webp' },
  { id: 13, slug: 'brenda-murphy',        name: 'Brenda Murphy',          role: 'City Innovation Broker',                                        organisation: 'Belfast City Council',                              image: '/images/brenda.webp' },
  // Panel 3 — Designing with Evidence
  { id: 14, slug: 'tomas-o-ruairc',       name: 'Tomás Ó Ruairc',         role: 'Assistant Secretary',                                           organisation: 'Department of Education and Youth',                 image: '/images/tomas.webp' },
  { id: 15, slug: 'shawna-coxon',         name: 'Shawna Coxon',           role: 'Deputy Commissioner, Policing Operations',                      organisation: 'An Garda Síochána',                                 image: '/images/shawna.webp' },
  { id: 16, slug: 'dr-rachael-singleton', name: 'Dr Rachael Singleton',   role: 'Behavioural Scientist Lecturer',                                organisation: 'Ulster University',                                 image: '/images/rachel.webp' },
  { id: 17, slug: 'damian-cranney',       name: 'Damian Cranney',         role: 'Chief Executive',                                               organisation: 'Big Motive',                                        image: '/images/daimen.webp' },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerDescription = {
  intro: 'A Shared Island event delivered by the ',
  org1: { label: 'Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation', href: 'https://www.gov.ie/en/organisation/department-of-public-expenditure-and-reform/' },
  mid1: ' in partnership with ',
  org2: { label: 'Creative Ireland', href: 'https://www.creativeireland.gov.ie/' },
  mid2: ', and hosted by the ',
  org3: { label: 'Institute of Designers Ireland', href: 'https://www.idi-design.ie/' },
  end: '.',
}

// ─── Social ──────────────────────────────────────────────────────────────────

export const social = [
  {
    platform: 'Instagram' as const,
    href: 'https://www.instagram.com/govie',
    label: 'Better By Design on Instagram',
  },
  {
    platform: 'LinkedIn' as const,
    href: 'https://www.linkedin.com/company/dper/posts/?feedView=all',
    label: 'Better By Design on LinkedIn',
  },
  {
    platform: 'YouTube' as const,
    href: 'https://www.youtube.com/merrionstreet',
    label: 'Better By Design on YouTube',
  },
]

export const govSocials = {
  youtube: 'https://www.youtube.com/merrionstreet',
  linkedin: 'https://www.linkedin.com/company/governmentofireland',
  instagram: 'https://www.instagram.com/govie/',
}

export const dperSocials = {
  youtube: 'https://www.youtube.com/@IRLDeptPER',
  linkedin: 'https://www.linkedin.com/company/dper/posts/?feedView=all',
  instagram: 'https://www.instagram.com/ourpublicservice/',
}
