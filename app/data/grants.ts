export interface GrantRecipient {
  name: string;
  amount: string;
  year: number;
  location: string;
  description: string;
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
      { name: 'Los Angeles Homeless Services Authority (LAHSA)', amount: '$142,500,000', year: 2025, location: 'Los Angeles, CA', description: 'Permanent supportive housing and coordinated entry system expansion.' },
      { name: 'PATH (People Assisting The Homeless)', amount: '$8,400,000', year: 2024, location: 'San Diego, CA', description: 'Rapid re-housing and supportive services for chronically homeless individuals.' },
      { name: 'Abode Services', amount: '$12,100,000', year: 2025, location: 'Alameda County, CA', description: 'Housing navigation and case management for homeless families.' }
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
      { name: 'Community HousingWorks', amount: '$12,500,000', year: 2024, location: 'San Diego, CA', description: 'Construction of 85 units of supportive housing for disabled veterans and homeless youth.' },
      { name: 'EAH Housing', amount: '$14,200,000', year: 2025, location: 'San Francisco, CA', description: 'Multifamily affordable housing rehabilitation with embedded social services.' }
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
      { name: 'California Partnership to End Domestic Violence', amount: '$750,000', year: 2025, location: 'Sacramento, CA', description: 'Statewide technical assistance and emergency housing grants for domestic violence survivors.' },
      { name: 'Center for Assault Recovery', amount: '$450,000', year: 2024, location: 'Los Angeles, CA', description: '24/7 crisis intervention, trauma counseling, and legal accompaniment.' }
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
      { name: 'San Francisco Women Against Rape', amount: '$620,000', year: 2024, location: 'San Francisco, CA', description: 'Direct crisis counseling and legal advocacy for sexual assault survivors.' },
      { name: ' Bilateral Safety Corridor Coalition', amount: '$540,000', year: 2025, location: 'San Diego, CA', description: 'Rescue and transitional support services for human trafficking victims.' }
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
      { name: 'Legal Aid Foundation of Los Angeles (LAFLA)', amount: '$2,100,000', year: 2025, location: 'Los Angeles, CA', description: 'Eviction defense and housing preservation legal services for low-income tenants.' },
      { name: 'Bay Area Legal Aid', amount: '$1,850,000', year: 2024, location: 'Oakland, CA', description: 'Legal representation for domestic violence survivors and disabled individuals denied benefits.' }
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
      { name: 'ACLU of Northern California', amount: '$250,000', year: 2025, location: 'San Francisco, CA', description: 'Voting rights protection and police accountability advocacy campaigns.' },
      { name: 'Mexican American Legal Defense and Educational Fund (MALDEF)', amount: '$300,000', year: 2024, location: 'Los Angeles, CA', description: 'Civil rights litigation and immigrant worker rights protection.' }
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
      { name: 'Disability Rights California', amount: '$850,000', year: 2025, location: 'Sacramento, CA', description: 'Protection and advocacy for individuals with developmental disabilities in institutional and community settings.' },
      { name: 'Westside Regional Center', amount: '$600,000', year: 2024, location: 'Culver City, CA', description: 'Vocational training and independent living skill support.' }
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
      { name: 'Community Action Partnership of Kern', amount: '$1,400,000', year: 2025, location: 'Bakersfield, CA', description: 'Emergency food distribution, low-income weatherization, and youth mentorship.' },
      { name: 'GRID Alternatives', amount: '$950,000', year: 2024, location: 'Oakland, CA', description: 'Clean energy job training and solar cost relief for low-income communities.' }
    ],
    sourceUrl: 'https://www.cdss.ca.gov/'
  }
];
