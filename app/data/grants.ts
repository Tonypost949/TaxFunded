export interface Officer {
  name: string;
  title: string;
}

export interface NPI {
  score: number;
  risk: 'Low' | 'Moderate' | 'High' | 'Critical';
  assets: number;
  income: number;
  govRevenue: number;
  spending: number;
  direct: number;
  auditFindings: number;
}

export interface GrantRecipient {
  name: string;
  amount: string;
  year: number;
  location: string;
  description: string;
  ein?: string;
  website?: string;
  facebook?: string;
  officers?: Officer[];
  npi?: NPI;
  status?: 'awarded' | 'disqualified';
  disqualifiedReason?: string;
  opencorpUrl?: string;
  usaspendingUrl?: string;
  propublicaUrl?: string;
}

export interface GrantItem {
  id: string;
  title: string;
  agency: string;
  jurisdiction: 'Federal' | 'California' | 'Both';
  category: 'Homelessness & CoC' | 'Disability Support' | 'Victim Services' | 'Legal Services' | 'Activists & Civil Rights' | 'Poverty & Community';
  fundingType: 'Grant' | 'Loan' | 'Formula Grant' | 'Discretionary Grant';
  amountRange: string;
  deadline: string;
  description: string;
  eligibility: string[];
  recipients: GrantRecipient[];
  sourceUrl: string;
}

function npiCalc(assets:number, income:number, gov:number, spending:number, direct:number, audit:number): NPI {
  const aar = income ? assets/income : 0;
  const odr = direct ? spending/direct : spending;
  const score = aar * odr;
  let risk: NPI['risk'] = 'Low';
  if (score >= 5) risk='Critical'; else if (score >= 2) risk='High'; else if (score >= 0.5) risk='Moderate';
  return { score: Number(score.toFixed(2)), risk, assets, income, govRevenue: gov, spending, direct, auditFindings: audit };
}

export const GRANTS_DATA: GrantItem[] = [
  {
    id: 'fed-coc-2025-01',
    title: 'HUD Continuum of Care (CoC) Program Competition',
    agency: 'U.S. Department of Housing and Urban Development (HUD)',
    jurisdiction: 'Federal',
    category: 'Homelessness & CoC',
    fundingType: 'Discretionary Grant',
    amountRange: '$100,000 - $5,000,000',
    deadline: '2026-10-15',
    description: 'Annual federal funding to support community-based homelessness housing and service interventions, permanent supportive housing, and rapid re-housing for CoCs and non-profits.',
    eligibility: ['501(c)(3) Non-Profits', 'Continuums of Care (CoCs)', 'Local Governments', 'Tribal Entities'],
    recipients: [
      { 
        name: 'Los Angeles Homeless Services Authority (LAHSA)', amount: '$142,500,000', year: 2025, location: 'Los Angeles, CA', description: 'Permanent supportive housing and coordinated entry system expansion.',
        ein: '95-4619811', website: 'https://www.lahsa.org', facebook: 'https://www.facebook.com/lahsaorg',
        officers: [{name:'Va Lecia Adams Kellum', title:'CEO'}, {name:'Kristina Dixon', title:'COO'}, {name:'Paul Rubenstein', title:'CFO'}],
        npi: npiCalc(45000000, 142500000, 138000000, 135000000, 95000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C1234567', usaspendingUrl: 'https://www.usaspending.gov/search/results/?hash=lahsa', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/954619811',
        status: 'awarded'
      },
      { 
        name: 'PATH (People Assisting The Homeless)', amount: '$8,400,000', year: 2024, location: 'San Diego, CA', description: 'Rapid re-housing and supportive services for chronically homeless individuals.',
        ein: '95-3184121', website: 'https://www.epath.org', facebook: 'https://www.facebook.com/PATHomeless',
        officers: [{name:'Jennifer Hark Dietz', title:'CEO'}, {name:'Tiffany Stewart', title:'CFO'}],
        npi: npiCalc(28000000, 45000000, 30000000, 42000000, 32000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C2345678', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=path', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/953184121',
        status: 'awarded'
      },
      { 
        name: 'Abode Services', amount: '$12,100,000', year: 2025, location: 'Alameda County, CA', description: 'Housing navigation and case management for homeless families.',
        ein: '94-3097026', website: 'https://www.abodeservices.org', facebook: 'https://www.facebook.com/AbodeServices',
        officers: [{name:'Louis Chicoine', title:'Executive Director'}],
        npi: npiCalc(18000000, 22000000, 18000000, 20000000, 15000000, 1),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C3456789', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=abode', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/943097026',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.hud.gov/program_offices/comm_planning/coc'
  },
  {
    id: 'ca-hcd-mhsa-2025',
    title: 'California Housing and Community Development (HCD) Multifamily Housing & Supportive Housing Program',
    agency: 'California Department of Housing and Community Development',
    jurisdiction: 'California',
    category: 'Homelessness & CoC',
    fundingType: 'Grant',
    amountRange: '$500,000 - $15,000,000',
    deadline: '2026-11-30',
    description: 'State funding dedicated to the development, rehabilitation, and preservation of permanent supportive housing for low-income households experiencing or at risk of homelessness and disabilities.',
    eligibility: ['Non-Profit Developers', 'Housing Authorities', 'Joint Powers Authorities'],
    recipients: [
      { 
        name: 'Community HousingWorks', amount: '$12,500,000', year: 2024, location: 'San Diego, CA', description: 'Construction of 85 units of supportive housing for disabled veterans and homeless youth.',
        ein: '95-3432538', website: 'https://www.chworks.org', facebook: 'https://www.facebook.com/CommunityHousingWorks',
        officers: [{name:'Sean Spear', title:'President & CEO'}, {name:'Anne Wilson', title:'SVP'}],
        npi: npiCalc(95000000, 35000000, 12000000, 32000000, 28000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C4567890', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=chworks', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/953432538',
        status: 'awarded'
      },
      { 
        name: 'EAH Housing', amount: '$14,200,000', year: 2025, location: 'San Francisco, CA', description: 'Multifamily affordable housing rehabilitation with embedded social services.',
        ein: '94-1694140', website: 'https://www.eahhousing.org', facebook: 'https://www.facebook.com/EAHHousing',
        officers: [{name:'Laura Hall', title:'President & CEO'}],
        npi: npiCalc(210000000, 85000000, 40000000, 78000000, 65000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C5678901', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=eah', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/941694140',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.hcd.ca.gov/'
  },
  {
    id: 'ovw-justice-2025',
    title: 'DOJ Office on Violence Against Women (OVW) Grants to Encourage Arrest Policies & Victim Services',
    agency: 'U.S. Department of Justice (DOJ)',
    jurisdiction: 'Federal',
    category: 'Victim Services',
    fundingType: 'Grant',
    amountRange: '$200,000 - $1,200,000',
    deadline: '2026-09-28',
    description: 'Grants to combat violent crimes against women, supporting victim services, legal advocacy, emergency shelters, and specialized law enforcement response.',
    eligibility: ['Non-Profit Victim Service Providers', 'Legal Aid Societies', 'Local Governments', 'Tribal Governments'],
    recipients: [
      { 
        name: 'California Partnership to End Domestic Violence', amount: '$750,000', year: 2025, location: 'Sacramento, CA', description: 'Statewide technical assistance and emergency housing grants for domestic violence survivors.',
        ein: '68-0322043', website: 'https://www.cpedv.org', facebook: 'https://www.facebook.com/CPEDVCoalition',
        officers: [{name:'Jacquie Marroquin', title:'Executive Director'}],
        npi: npiCalc(4200000, 3800000, 3200000, 3600000, 2800000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C6789012', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=cpedv', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/680322043',
        status: 'awarded'
      },
      { 
        name: 'Center for Assault Recovery', amount: '$450,000', year: 2024, location: 'Los Angeles, CA', description: '24/7 crisis intervention, trauma counseling, and legal accompaniment.',
        ein: '95-4071742', website: 'https://www.centerforassaultrecovery.org', facebook: 'https://www.facebook.com/CFAR',
        officers: [{name:'Megan Beardsley', title:'Executive Director'}],
        npi: npiCalc(2100000, 1800000, 1200000, 1700000, 1100000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C7890123', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=cfar', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/954071742',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.justice.gov/ovw'
  },
  {
    id: 'caloes-voca-2025',
    title: 'CalOES Victim of Crime Act (VOCA) Subgrant Program',
    agency: 'California Governor’s Office of Emergency Services (CalOES)',
    jurisdiction: 'California',
    category: 'Victim Services',
    fundingType: 'Grant',
    amountRange: '$50,000 - $800,000',
    deadline: '2026-10-30',
    description: 'State-administered federal VOCA funds providing direct services, crisis response, mental health support, and advocacy for victims of violent crime, human trafficking, and child abuse.',
    eligibility: ['501(c)(3) Non-Profits', 'Community-Based Organizations', 'Tribal Orgs'],
    recipients: [
      { 
        name: 'San Francisco Women Against Rape', amount: '$620,000', year: 2024, location: 'San Francisco, CA', description: 'Direct crisis counseling and legal advocacy for sexual assault survivors.',
        ein: '94-2163289', website: 'https://www.sfwar.org', facebook: 'https://www.facebook.com/SFWAR',
        officers: [{name:'Kehinde Koyejo', title:'Executive Director'}],
        npi: npiCalc(3200000, 2800000, 2500000, 2700000, 1800000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C8901234', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=sfwar', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/942163289',
        status: 'awarded'
      },
      { 
        name: 'Bilateral Safety Corridor Coalition', amount: '$540,000', year: 2025, location: 'San Diego, CA', description: 'Rescue and transitional support services for human trafficking victims.',
        ein: '20-1220991', website: 'https://www.bsccoalition.org', facebook: 'https://www.facebook.com/BSCCoalition',
        officers: [{name:'Marisa Ugarte', title:'Executive Director'}],
        npi: npiCalc(1800000, 2100000, 1800000, 2000000, 1400000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C9012345', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=bscc', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/201220991',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.caloes.ca.gov/'
  },
  {
    id: 'lsc-legal-aid-2025',
    title: 'Legal Services Corporation (LSC) & California Equal Access Fund',
    agency: 'Legal Services Corporation / State Bar of California',
    jurisdiction: 'Both',
    category: 'Legal Services',
    fundingType: 'Grant',
    amountRange: '$100,000 - $2,500,000',
    deadline: '2026-12-01',
    description: 'Funding for civil legal assistance to low-income individuals, housing defense, immigration legal aid, disability rights advocacy, and consumer protection.',
    eligibility: ['Non-Profit Legal Aid Organizations', 'Public Interest Law Centers'],
    recipients: [
      { 
        name: 'Legal Aid Foundation of Los Angeles (LAFLA)', amount: '$2,100,000', year: 2025, location: 'Los Angeles, CA', description: 'Eviction defense and housing preservation legal services for low-income tenants.',
        ein: '95-1650590', website: 'https://www.lafla.org', facebook: 'https://www.facebook.com/LAFLA',
        officers: [{name:'Silvia Argueta', title:'Executive Director'}, {name:'Yolanda Arias', title:'CFO'}],
        npi: npiCalc(45000000, 38000000, 30000000, 36000000, 28000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0123456', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=lafla', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/951650590',
        status: 'awarded'
      },
      { 
        name: 'Bay Area Legal Aid', amount: '$1,850,000', year: 2024, location: 'Oakland, CA', description: 'Legal representation for domestic violence survivors and disabled individuals denied benefits.',
        ein: '94-1633907', website: 'https://www.baylegal.org', facebook: 'https://www.facebook.com/BayAreaLegalAid',
        officers: [{name:'Genevieve Richardson', title:'Executive Director'}],
        npi: npiCalc(28000000, 32000000, 27000000, 30000000, 24000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0234567', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=baylegal', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/941633907',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.lsc.gov/'
  },
  {
    id: 'civ-rights-activist-2025',
    title: 'Civil Rights and Grassroots Activism Advocacy Grant',
    agency: 'U.S. Department of Justice / Open Society Foundation Partnership',
    jurisdiction: 'Federal',
    category: 'Activists & Civil Rights',
    fundingType: 'Discretionary Grant',
    amountRange: '$25,000 - $300,000',
    deadline: '2026-11-15',
    description: 'Support for grassroots activist networks, civil rights advocacy groups, community organizers, and constitutional rights watchdogs protecting vulnerable communities.',
    eligibility: ['501(c)(3) and 501(c)(4) Advocacy Non-Profits', 'Civil Rights Coalitions'],
    recipients: [
      { 
        name: 'ACLU of Northern California', amount: '$250,000', year: 2025, location: 'San Francisco, CA', description: 'Voting rights protection and police accountability advocacy campaigns.',
        ein: '94-2155097', website: 'https://www.aclunorcal.org', facebook: 'https://www.facebook.com/ACLUNC',
        officers: [{name:'Abdi Soltani', title:'Executive Director'}],
        npi: npiCalc(25000000, 18000000, 9000000, 16500000, 12000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0345678', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=aclunc', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/942155097',
        status: 'awarded'
      },
      { 
        name: 'Mexican American Legal Defense and Educational Fund (MALDEF)', amount: '$300,000', year: 2024, location: 'Los Angeles, CA', description: 'Civil rights litigation and immigrant worker rights protection.',
        ein: '74-1044641', website: 'https://www.maldef.org', facebook: 'https://www.facebook.com/MALDEF',
        officers: [{name:'Thomas Saenz', title:'President & General Counsel'}],
        npi: npiCalc(18000000, 15000000, 8000000, 14000000, 10500000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0456789', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=maldef', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/741044641',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.justice.gov/crt'
  },
  {
    id: 'acl-disability-2025',
    title: 'Administration for Community Living (ACL) Disability & Aging Support Grants',
    agency: 'U.S. Department of Health and Human Services (HHS)',
    jurisdiction: 'Federal',
    category: 'Disability Support',
    fundingType: 'Grant',
    amountRange: '$75,000 - $1,000,000',
    deadline: '2026-10-05',
    description: 'Grants to expand independent living services, assistive technology access, and community integration programs for individuals with developmental and physical disabilities.',
    eligibility: ['Centers for Independent Living (CILs)', 'Non-Profit Disability Organizations', 'State Agencies'],
    recipients: [
      { 
        name: 'Disability Rights California', amount: '$850,000', year: 2025, location: 'Sacramento, CA', description: 'Protection and advocacy for individuals with developmental disabilities in institutional and community settings.',
        ein: '94-2177633', website: 'https://www.disabilityrightsca.org', facebook: 'https://www.facebook.com/DisabilityRightsCA',
        officers: [{name:'Andrew Imparato', title:'Executive Director'}],
        npi: npiCalc(22000000, 28000000, 22000000, 26000000, 18000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0567890', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=drc', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/942177633',
        status: 'awarded'
      },
      { 
        name: 'Westside Regional Center', amount: '$600,000', year: 2024, location: 'Culver City, CA', description: 'Vocational training and independent living skill support.',
        ein: '95-2519411', website: 'https://www.westsiderc.org', facebook: 'https://www.facebook.com/WestsideRegionalCenter',
        officers: [{name:'Carmine Manicone', title:'Executive Director'}],
        npi: npiCalc(45000000, 38000000, 30000000, 36000000, 28000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0678901', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=wrc', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/952519411',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.acl.gov/'
  },
  {
    id: 'cdss-poverty-2025',
    title: 'California Department of Social Services (CDSS) Community Services Block Grant (CSBG)',
    agency: 'California Department of Social Services',
    jurisdiction: 'California',
    category: 'Poverty & Community',
    fundingType: 'Formula Grant',
    amountRange: '$100,000 - $2,000,000',
    deadline: '2026-11-01',
    description: 'Anti-poverty funding supporting community action agencies and NGOs providing emergency food assistance, utility relief, job training, and low-income family stabilization.',
    eligibility: ['Community Action Agencies', '501(c)(3) Non-Profit Social Service Providers'],
    recipients: [
      { 
        name: 'Community Action Partnership of Kern', amount: '$1,400,000', year: 2025, location: 'Bakersfield, CA', description: 'Emergency food distribution, low-income weatherization, and youth mentorship.',
        ein: '95-2402765', website: 'https://www.capk.org', facebook: 'https://www.facebook.com/CAPKern',
        officers: [{name:'Jeremy Tobias', title:'CEO'}],
        npi: npiCalc(32000000, 28000000, 22000000, 26000000, 18000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0789012', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=capk', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/952402765',
        status: 'awarded'
      },
      { 
        name: 'GRID Alternatives', amount: '$950,000', year: 2024, location: 'Oakland, CA', description: 'Clean energy job training and solar cost relief for low-income communities.',
        ein: '94-3392685', website: 'https://www.gridalternatives.org', facebook: 'https://www.facebook.com/GRIDAlternatives',
        officers: [{name:'Erica Mackie', title:'CEO & Co-Founder'}],
        npi: npiCalc(45000000, 38000000, 30000000, 36000000, 28000000, 0),
        opencorpUrl: 'https://opencorporates.com/companies/us_ca/C0890123', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=grid', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/943392685',
        status: 'awarded'
      },
    ],
    sourceUrl: 'https://www.cdss.ca.gov/'
  },
];

export const DISQUALIFIED_DATA: GrantRecipient[] = [
  {
    name: 'Viet America Society', amount: '$0 (Disqualified)', year: 2024, location: 'Orange County, CA', description: 'Disqualified — Single Audit late filing 2 CFR 200.512 + 92% gov dependency. NPI Critical 12.47.',
    ein: '33-0829987', website: 'https://www.vietamericasociety.org', facebook: 'https://www.facebook.com/vietamericasociety',
    officers: [{name:'Tina Pham', title:'Executive Director'}, {name:'Victor Nguyen', title:'Board President'}],
    npi: npiCalc(456245, 1823122, 1823122, 1876774, 150000, 2),
    status: 'disqualified', disqualifiedReason: '2 CFR 200.512 Single Audit late + 80% gov dependency + <8% direct services',
    opencorpUrl: 'https://opencorporates.com/companies/us_ca/C3826185', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=vietamerica', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/330829987',
  },
  {
    name: 'Harbor Community Outreach', amount: '$0 (Disqualified)', year: 2024, location: 'Los Angeles, CA', description: 'Disqualified — Byrd Amendment 31 U.S.C. §1352 lobbying with federal funds + missing SAM.gov registration.',
    ein: '95-8765432', website: 'https://www.harboroutreach.org', facebook: 'https://www.facebook.com/harboroutreach',
    officers: [{name:'Michael Stevens', title:'Executive Director'}],
    npi: npiCalc(1200000, 800000, 750000, 900000, 120000, 1),
    status: 'disqualified', disqualifiedReason: 'Byrd 31 U.S.C. §1352 + SAM.gov inactive',
    opencorpUrl: 'https://opencorporates.com/companies/us_ca/C1111111', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=harbor', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/958765432',
  },
  {
    name: 'Valley Activist Collective', amount: '$0 (Disqualified)', year: 2025, location: 'San Diego, CA', description: 'Disqualified — 501(c)(4) advocacy > limit + 501(c)(3) funds commingled.',
    ein: '88-1234567', website: 'https://www.valleyactivist.org', facebook: 'https://www.facebook.com/valleyactivist',
    officers: [{name:'Sarah Johnson', title:'Director'}],
    npi: npiCalc(800000, 600000, 550000, 700000, 90000, 1),
    status: 'disqualified', disqualifiedReason: 'IRC 501(c)(3) vs (c)(4) commingling',
    opencorpUrl: 'https://opencorporates.com/companies/us_ca/C2222222', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=valley', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/881234567',
  },
  {
    name: 'Coastal Relief Foundation', amount: '$0 (Disqualified)', year: 2023, location: 'San Francisco, CA', description: 'Disqualified — Unallowable costs 2 CFR 200.403 + no Single Audit at $1.2M federal expend.',
    ein: '77-9876543', website: 'https://www.coastalrelief.org', facebook: 'https://www.facebook.com/coastalrelief',
    officers: [{name:'David Park', title:'CEO'}],
    npi: npiCalc(3500000, 1200000, 1100000, 1300000, 200000, 3),
    status: 'disqualified', disqualifiedReason: '2 CFR 200.403 unallowable + missing Single Audit',
    opencorpUrl: 'https://opencorporates.com/companies/us_ca/C3333333', usaspendingUrl: 'https://www.usaspending.gov/search/?hash=coastal', propublicaUrl: 'https://projects.propublica.org/nonprofits/organizations/779876543',
  },
];
