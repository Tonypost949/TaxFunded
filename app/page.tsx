'use client';

import { useState, useMemo } from 'react';
import { GRANTS_DATA, GrantItem, GrantRecipient } from './data/grants';
import { Search, Filter, Building2, Calendar, DollarSign, ExternalLink, Award, MapPin, Users, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrant, setSelectedGrant] = useState<GrantItem | null>(null);

  const categories = [
    'All',
    'Homelessness & CoC',
    'Victim Services',
    'Legal Services',
    'Activists & Civil Rights',
    'Disability Support',
    'Poverty & Community'
  ];

  const jurisdictions = ['All', 'Federal', 'California'];
  const counties = ['All', 'Los Angeles', 'San Diego', 'San Francisco', 'Alameda', 'Sacramento', 'Kern'];
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [filterUpcomingYear, setFilterUpcomingYear] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'simple-grants' | 'simple-recipients' | 'legal'>('dashboard');

  // Extract all unique recipients across all grants
  const allRecipients = useMemo(() => {
    const list: { grantTitle: string; name: string; amount: string; year: number; location: string; description: string; agency: string; jurisdiction: string; category: string }[] = [];
    GRANTS_DATA.forEach((grant) => {
      grant.recipients.forEach((rec) => {
        list.push({
          ...rec,
          grantTitle: grant.title,
          agency: grant.agency,
          jurisdiction: grant.jurisdiction,
          category: grant.category
        });
      });
    });
    return list;
  }, []);

  const filteredGrants = useMemo(() => {
    return GRANTS_DATA.filter((grant) => {
      const matchesSearch =
        grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.recipients.some(
          (r) =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.location.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesJurisdiction =
        selectedJurisdiction === 'All' || grant.jurisdiction === selectedJurisdiction || grant.jurisdiction === 'Both';

      const matchesCategory =
        selectedCategory === 'All' || grant.category === selectedCategory;

      const matchesCounty =
        selectedCounty === 'All' ||
        grant.recipients.some((r) => r.location.toLowerCase().includes(selectedCounty.toLowerCase()));

      // Check if deadline is within the next year (current date: 2026-09-02, so up to 2027-09-02)
      let matchesUpcoming = true;
      if (filterUpcomingYear) {
        const deadlineDate = new Date(grant.deadline);
        const currentDate = new Date('2026-09-02');
        const oneYearLater = new Date('2027-09-02');
        matchesUpcoming = deadlineDate >= currentDate && deadlineDate <= oneYearLater;
      }

      return matchesSearch && matchesJurisdiction && matchesCategory && matchesCounty && matchesUpcoming;
    });
  }, [searchQuery, selectedJurisdiction, selectedCategory, selectedCounty, filterUpcomingYear]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider text-blue-100">
                  TaxFunded Intelligence
                </span>
                <span className="text-xs text-blue-300">Federal & California 2024–2026 Awards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Tax-Funded Grants & Loans for Social Services, NGOs & CoCs
              </h1>
              <p className="mt-2 text-blue-200 max-w-3xl text-sm sm:text-base">
                Discover tax-funded opportunities and analyze historical recipient awards (last 2 years) for homeless services, victim advocacy, legal aid, grassroots activists, and disability support.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-right hidden lg:block">
              <div className="text-2xl font-bold text-emerald-400">$350M+</div>
              <div className="text-xs text-slate-300">Tracked Funding Database</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search grants, agencies, or recipients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
              />
            </div>

            {/* Jurisdiction Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Jurisdiction:</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {jurisdictions.map((jur) => (
                  <button
                    key={jur}
                    onClick={() => setSelectedJurisdiction(jur)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedJurisdiction === jur
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {jur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2">Focus Area:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Upcoming Deadlines Quick Toggle */}
            <div>
              <button
                onClick={() => setFilterUpcomingYear(!filterUpcomingYear)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  filterUpcomingYear
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                {filterUpcomingYear ? 'Showing Coming Up in Next Year (2026–2027)' : 'Filter Coming Up in Next Year'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            {viewMode === 'dashboard' && `Available Opportunities & Recipient Intelligence (${filteredGrants.length})`}
            {viewMode === 'simple-grants' && `Simple Grants List (${filteredGrants.length})`}
            {viewMode === 'simple-recipients' && `Simple Recipients List (${allRecipients.length})`}
          </h2>

          {/* View Mode Tabs */}
          <div className="flex flex-wrap bg-white p-1 rounded-xl shadow-sm border border-slate-200 gap-1">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Dashboard
            </button>
            <button
              onClick={() => setViewMode('simple-grants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'simple-grants' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simple Grants List
            </button>
            <button
              onClick={() => setViewMode('simple-recipients')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'simple-recipients' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simple Recipients List
            </button>
            <button
              onClick={() => setViewMode('legal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'legal' ? 'bg-indigo-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚖️ Tax-Funded Legal & Rules Hub
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        {viewMode === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGrants.map((grant) => (
              <div
                key={grant.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        grant.jurisdiction === 'Federal'
                          ? 'bg-purple-100 text-purple-800'
                          : grant.jurisdiction === 'California'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {grant.jurisdiction}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {grant.category}
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {grant.fundingType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {grant.title}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold mb-3 flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" /> {grant.agency}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                    {grant.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl mb-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Amount Range</span>
                      <span className="font-semibold text-slate-800">{grant.amountRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Deadline</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-red-500" /> {grant.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Recent Recipients Preview */}
                  <div className="border-t border-slate-100 pt-3">
                    <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-indigo-600" /> Recent Recipients (Last 2 Years):
                    </div>
                    <div className="space-y-1.5">
                      {grant.recipients.slice(0, 2).map((rec, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-indigo-50/50 px-2.5 py-1.5 rounded-lg">
                          <span className="font-medium text-slate-800 truncate max-w-[200px]" title={rec.name}>{rec.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">{rec.year}</span>
                            <span className="font-bold text-emerald-700">{rec.amount}</span>
                          </div>
                        </div>
                      ))}
                      {grant.recipients.length > 2 && (
                        <div className="text-[11px] text-slate-400 text-right pt-0.5">
                          +{grant.recipients.length - 2} more recipients
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <a
                    href={grant.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    Source Portal <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => setSelectedGrant(grant)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                  >
                    View Full Details & Who Got It
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Grants List View */}
        {viewMode === 'simple-grants' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4">Grant Title</th>
                    <th className="p-4">Agency</th>
                    <th className="p-4">Jurisdiction</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Amount Range</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGrants.map((grant) => (
                    <tr key={grant.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900 max-w-xs">
                        {grant.title}
                      </td>
                      <td className="p-4 text-slate-600 max-w-xs">{grant.agency}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                          grant.jurisdiction === 'Federal' ? 'bg-purple-100 text-purple-800' :
                          grant.jurisdiction === 'California' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {grant.jurisdiction}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{grant.category}</td>
                      <td className="p-4 font-semibold text-slate-800">{grant.amountRange}</td>
                      <td className="p-4 font-semibold text-red-600">{grant.deadline}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedGrant(grant)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Simple Recipients List View */}
        {viewMode === 'simple-recipients' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4">Recipient Name</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Award Amount</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Funding Source / Grant</th>
                    <th className="p-4">Project Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allRecipients.map((rec, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{rec.name}</td>
                      <td className="p-4 text-slate-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" /> {rec.location}
                      </td>
                      <td className="p-4 font-extrabold text-emerald-700">{rec.amount}</td>
                      <td className="p-4 font-semibold text-slate-700">{rec.year}</td>
                      <td className="p-4 text-blue-700 font-medium max-w-xs">{rec.grantTitle}</td>
                      <td className="p-4 text-slate-600 max-w-sm">{rec.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Legal & Rules Hub View */}
        {viewMode === 'legal' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-indigo-100">
                  Exclusive Regulatory Focus & Legal Citations
                </span>
                <span className="text-xs text-indigo-300">Taxpayer-Funded Compliance & Governance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Tax-Funded Grants: Legal, Regulatory & Disclosure Framework
              </h2>
              <p className="text-indigo-200 text-sm sm:text-base max-w-4xl leading-relaxed">
                Unlike private foundation grants or commercial venture capital, taxpayer-funded grants, formula allocations, and loans are governed by rigorous statutory laws, public accountability rules, transparency mandates, and strict compliance frameworks. Below are the authoritative legal citations and governing rules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    1. Statutory Authority & Appropriations
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Every federal dollar originates from Congressional appropriations under Article I, Section 9 of the U.S. Constitution, while California funds derive from legislative budget enactments and voter-approved state bond measures.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 text-slate-700 mb-4">
                    <div><strong>Federal Mandate:</strong> Anti-Deficiency Act prohibits agencies from obligating funds beyond congressional appropriations.</div>
                    <div><strong>State Mandate:</strong> California Constitution Proposition 98 & General Fund allocation rules govern social service distribution.</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg space-y-1">
                  <div><span className="font-bold text-indigo-900">Enacted / Inception Year:</span> 1789 (U.S. Const.) & Annual California Budget Enactments</div>
                  <div><span className="font-bold text-indigo-900">Cited Authority & Sources:</span> U.S. Const. art. I, § 9, cl. 7; 31 U.S.C. § 1341 (Anti-Deficiency Act); Cal. Const. art. XVI; California State Budget Act.</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    2. Uniform Guidance (2 CFR 200)
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Federal awards granted to non-profits and CoCs are governed by OMB Uniform Guidance (2 CFR 200), establishing mandatory cost principles, administrative requirements, and audit thresholds.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 text-slate-700 mb-4">
                    <div><strong>Allowable Costs:</strong> Expenses must be necessary, reasonable, and allocable to the specific grant project.</div>
                    <div><strong>Single Audit Threshold:</strong> Non-profits expending $750,000+ in federal awards annually must undergo a rigorous Single Audit.</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg space-y-1">
                  <div><span className="font-bold text-indigo-900">Enacted / Inception Year:</span> 2014 (OMB Uniform Guidance Reform, revised 2024)</div>
                  <div><span className="font-bold text-indigo-900">Cited Authority & Sources:</span> OMB Uniform Guidance, 2 C.F.R. Part 200 (Subparts E—Cost Principles & F—Audit Requirements); 24 C.F.R. Part 578 (HUD CoC Program).</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    3. Public Disclosure & Transparency Acts
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Taxpayer funding carries an absolute public right to know. Spending records, recipient names, and award amounts are legally mandated to be open to public scrutiny.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 text-slate-700 mb-4">
                    <div><strong>Federal FOIA:</strong> Freedom of Information Act guarantees public access to federal agency grant records.</div>
                    <div><strong>California Public Records Act (CPRA):</strong> Mandates state and local agencies (like CalOES and HCD) disclose subgrantee awards and expenditure reports.</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg space-y-1">
                  <div><span className="font-bold text-indigo-900">Enacted / Inception Year:</span> 1966 (FOIA, 5 U.S.C. 552) & 1968 (CPRA, Cal. Gov. Code 6250)</div>
                  <div><span className="font-bold text-indigo-900">Cited Authority & Sources:</span> Freedom of Information Act (FOIA), 5 U.S.C. § 552; California Public Records Act (CPRA), Cal. Gov. Code §§ 6250–6276.48; Federal Funding Accountability and Transparency Act (FFATA), P.L. 109-282.</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    4. Tax Status & Advocacy Restrictions
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Organizations receiving tax-funded grants must adhere to strict IRS and federal statutory restrictions regarding lobbying, political campaign intervention, and advocacy.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 text-slate-700 mb-4">
                    <div><strong>Anti-Lobbying Act:</strong> Federal grant funds cannot be used for grassroots lobbying, legislative influence, or political campaigns.</div>
                    <div><strong>501(c)(3) vs 501(c)(4):</strong> Public charities face strict limitations, whereas certain civic advocacy grants accommodate qualifying grassroots entities under strict segregation of accounts.</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg space-y-1">
                  <div><span className="font-bold text-indigo-900">Enacted / Inception Year:</span> 1954 (IRC § 501(c)(3)) & 1989 (Byrd Anti-Lobbying Amendment)</div>
                  <div><span className="font-bold text-indigo-900">Cited Authority & Sources:</span> Internal Revenue Code, 26 U.S.C. § 501(c)(3) & § 501(c)(4); Byrd Anti-Lobbying Amendment, 31 U.S.C. § 1352; IRS Revenue Ruling 2007-41.</div>
                </div>
              </div>
            </div>

            {/* Subrecipient Monitoring Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">5. Subrecipient Monitoring & Pass-Through Accountability</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                When federal agencies pass funds through state and local entities (such as HUD passing CoC funds to LAHSA or California HCD passing funds to local non-profits), pass-through entities bear strict legal responsibility for monitoring subrecipient performance, financial integrity, and regulatory compliance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800 mb-1">Risk Assessment</div>
                  <p className="text-slate-600">Pass-through entities must evaluate each subrecipient's prior audit history and financial stability.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800 mb-1">Performance Reporting</div>
                  <p className="text-slate-600">Mandatory quarterly and annual reporting on metrics, beneficiary counts, and financial draws.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800 mb-1">Corrective Action Plans</div>
                  <p className="text-slate-600">Statutory requirement to issue audit findings and enforce corrective action for non-compliant grantees.</p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 bg-indigo-50/50 p-2.5 rounded-lg space-y-1">
                <div><span className="font-bold text-indigo-900">Enacted / Inception Year:</span> 2014 (OMB Uniform Guidance § 200.331 Subrecipient Monitoring Standards)</div>
                <div><span className="font-bold text-indigo-900">Cited Authority & Sources:</span> OMB Uniform Guidance, 2 C.F.R. § 200.331–200.333 (Requirements for Pass-Through Entities); HUD Exchange CoC Program Administration Rules.</div>
              </div>
            </div>
          </div>
        )}

        {filteredGrants.length === 0 && viewMode !== 'legal' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <ShieldCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No grants found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search criteria or category filters.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedGrant && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {selectedGrant.jurisdiction}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {selectedGrant.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedGrant.title}</h2>
                  <p className="text-sm font-semibold text-blue-600 mt-1">{selectedGrant.agency}</p>
                </div>
                <button
                  onClick={() => setSelectedGrant(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full font-bold text-sm w-9 h-9 flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedGrant.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Funding Type</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedGrant.fundingType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Amount Range</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedGrant.amountRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Application Deadline</span>
                  <span className="font-bold text-red-600 text-sm">{selectedGrant.deadline}</span>
                </div>
              </div>

              {/* Eligibility */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Organization Eligibility
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGrant.eligibility.map((item, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1 rounded-xl border border-emerald-100">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Historical Recipients */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-indigo-600" /> Historical Recipients & Awards (Last 2 Years: Who Got Them)
                </h4>
                <div className="space-y-3">
                  {selectedGrant.recipients.map((rec, idx) => (
                    <div key={idx} className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2">
                        <span className="font-bold text-slate-900 text-sm">{rec.name}</span>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {rec.location}
                          </span>
                          <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-semibold">
                            {rec.year}
                          </span>
                          <span className="text-emerald-700 font-extrabold text-sm">
                            {rec.amount}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <a
                  href={selectedGrant.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Official Agency Portal <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  onClick={() => setSelectedGrant(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
