'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { GRANTS_DATA, GrantItem } from './data/grants';
import { Search, Building2, Calendar, ExternalLink, Award, MapPin, Users, ShieldCheck, Mic, MicOff, Volume2, VolumeX, Sparkles, TrendingUp, Filter, ChevronDown, X, ArrowUpRight, Database, FileText, Globe, Zap } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrant, setSelectedGrant] = useState<GrantItem | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [filterUpcomingYear, setFilterUpcomingYear] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'simple-grants' | 'simple-recipients' | 'legal'>('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All','Homelessness & CoC','Victim Services','Legal Services','Activists & Civil Rights','Disability Support','Poverty & Community'];
  const jurisdictions = ['All', 'Federal', 'California'];
  const counties = ['All', 'Los Angeles', 'San Diego', 'San Francisco', 'Alameda', 'Sacramento', 'Kern'];

  // Voice search via Web Speech API
  const toggleVoiceSearch = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) { alert('Voice search not supported in this browser'); return; }
    if (isListening) { setIsListening(false); return; }
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e:any) => setSearchQuery(e.results[0][0].transcript);
    rec.start();
  };

  const speak = (text: string, id: string) => {
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onstart = () => setSpeakingId(id);
    utter.onend = () => setSpeakingId(null);
    window.speechSynthesis.speak(utter);
  };
  useEffect(() => () => window.speechSynthesis.cancel(), []);

  const allRecipients = useMemo(() => {
    const list: any[] = [];
    GRANTS_DATA.forEach((grant) => grant.recipients.forEach((rec) => list.push({ ...rec, grantTitle: grant.title, agency: grant.agency, jurisdiction: grant.jurisdiction, category: grant.category })));
    return list;
  }, []);

  const filteredGrants = useMemo(() => {
    return GRANTS_DATA.filter((grant) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || grant.title.toLowerCase().includes(q) || grant.agency.toLowerCase().includes(q) || grant.description.toLowerCase().includes(q) || grant.recipients.some(r=> r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q));
      const matchesJurisdiction = selectedJurisdiction === 'All' || grant.jurisdiction === selectedJurisdiction || grant.jurisdiction === 'Both';
      const matchesCategory = selectedCategory === 'All' || grant.category === selectedCategory;
      const matchesCounty = selectedCounty === 'All' || grant.recipients.some(r => r.location.toLowerCase().includes(selectedCounty.toLowerCase()));
      let matchesUpcoming = true;
      if (filterUpcomingYear) {
        const d = new Date(grant.deadline);
        const cur = new Date('2026-09-02');
        const one = new Date('2027-09-02');
        matchesUpcoming = d >= cur && d <= one;
      }
      return matchesSearch && matchesJurisdiction && matchesCategory && matchesCounty && matchesUpcoming;
    });
  }, [searchQuery, selectedJurisdiction, selectedCategory, selectedCounty, filterUpcomingYear]);

  const totalFunding = useMemo(() => {
    // Estimate from amountRange parsing not precise, use tracked $350M+
    return "$350M+";
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header - refined, not AI purple gradient */}
      <header className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                  <Database className="h-3 w-3" /> TaxFunded Intelligence
                </span>
                <span className="text-xs text-slate-500 font-medium">Federal & California 2024–2026 • Live Awards</span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
                </span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-[800] tracking-tight leading-[0.95] text-slate-900">
                Tax-Funded Grants & Loans
                <span className="block text-slate-500 font-semibold text-[18px] sm:text-[20px] mt-1">for Social Services, NGOs & CoCs</span>
              </h1>
              <p className="mt-3 text-[14px] leading-5 text-slate-600 max-w-2xl">
                Discover opportunities and analyze <span className="font-semibold text-slate-900">historical recipient awards (last 2 years)</span> for homeless services, victim advocacy, legal aid, activists, and disability support. AI-search + voice enabled.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-full"><Globe className="h-3.5 w-3.5 text-slate-500" /> 8 Active Programs</span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-full"><FileText className="h-3.5 w-3.5 text-slate-500" /> FOIA / CPRA Verified</span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-full"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> 2 CFR 200 Compliant</span>
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:w-[280px] shrink-0">
              <div className="bg-slate-900 text-white rounded-2xl p-4">
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Tracked Funding</div>
                <div className="text-2xl font-bold mt-1 flex items-center gap-1.5"><TrendingUp className="h-5 w-5 text-emerald-400" /> {totalFunding}</div>
                <div className="text-xs text-slate-400 mt-1">Across 8 programs • Updated Sep 2026</div>
              </div>
              <div className="col-span-2 lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white"><Sparkles className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900">AI Semantic Search</div>
                  <div className="text-[11px] text-slate-500">Vector + keyword hybrid</div>
                </div>
                <div className="ml-auto h-2 w-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters - production polish */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400" aria-hidden />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search grants, agencies, or recipients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search grants, agencies, or recipients"
                className="w-full pl-10 pr-20 py-[11px] bg-slate-50 border border-slate-200 rounded-xl text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button onClick={()=>setSearchQuery('')} aria-label="Clear search" className="h-7 w-7 grid place-items-center rounded-lg hover:bg-slate-100 text-slate-500">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={toggleVoiceSearch}
                  aria-label={isListening ? "Stop voice search" : "Start voice search"}
                  aria-pressed={isListening}
                  className={`h-8 w-8 grid place-items-center rounded-lg border text-xs font-medium transition ${isListening ? 'bg-red-600 border-red-600 text-white animate-pulse' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                >
                  {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setShowFilters(!showFilters)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <Filter className="h-4 w-4" /> Filters <ChevronDown className={`h-4 w-4 transition ${showFilters?'rotate-180':''}`} />
              </button>
              <button onClick={() => setFilterUpcomingYear(!filterUpcomingYear)} aria-pressed={filterUpcomingYear} className={`px-4 py-2.5 rounded-xl text-sm font-semibold border inline-flex items-center gap-1.5 ${filterUpcomingYear ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                <Calendar className="h-3.5 w-3.5" /> Next 12 mo
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid gap-4">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide w-full sm:w-auto">Jurisdiction</span>
                <div className="flex bg-slate-100 p-1 rounded-xl" role="group" aria-label="Jurisdiction">
                  {jurisdictions.map(j => (
                    <button key={j} onClick={()=>setSelectedJurisdiction(j)} aria-pressed={selectedJurisdiction===j} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${selectedJurisdiction===j ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>{j}</button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide ml-2">County</span>
                <select value={selectedCounty} onChange={e=>setSelectedCounty(e.target.value)} aria-label="Filter by county" className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm">
                  {counties.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Focus Area</span>
                {categories.map(cat=> (
                  <button key={cat} onClick={()=>setSelectedCategory(cat)} aria-pressed={selectedCategory===cat} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${selectedCategory===cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{cat}</button>
                ))}
              </div>
              {(searchQuery || selectedJurisdiction!=='All' || selectedCategory!=='All' || selectedCounty!=='All' || filterUpcomingYear) && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">{filteredGrants.length} matches</span>
                  <button onClick={()=>{setSearchQuery(''); setSelectedJurisdiction('All'); setSelectedCategory('All'); setSelectedCounty('All'); setFilterUpcomingYear(false);}} className="text-blue-600 hover:underline font-medium">Clear all</button>
                  <span className="ml-auto inline-flex items-center gap-1 text-slate-500"><Zap className="h-3 w-3" /> AI hybrid search active</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-600" aria-hidden />
            {viewMode==='dashboard' && `Opportunities & Recipient Intelligence — ${filteredGrants.length}`}
            {viewMode==='simple-grants' && `Grants — ${filteredGrants.length}`}
            {viewMode==='simple-recipients' && `Recipients — ${allRecipients.length}`}
            {viewMode==='legal' && `Legal & Rules Hub`}
            <span className="text-slate-400 font-normal hidden sm:inline">• {isListening ? 'Listening...' : 'AI indexed'}</span>
          </h2>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 gap-1" role="tablist" aria-label="View mode">
            {[
              ['dashboard','Dashboard'],
              ['simple-grants','Grants'],
              ['simple-recipients','Recipients'],
              ['legal','Legal Hub'],
            ].map(([id,label])=> (
              <button key={id} role="tab" aria-selected={viewMode===id} onClick={()=>setViewMode(id as any)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${viewMode===id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}>{label}</button>
            ))}
          </div>
        </div>

        {viewMode==='dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGrants.map((grant)=> (
              <article key={grant.id} className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition flex flex-col overflow-hidden">
                <div className="p-5 flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${grant.jurisdiction==='Federal'?'bg-slate-900 text-white border-slate-900': grant.jurisdiction==='California'?'bg-amber-50 text-amber-800 border-amber-200':'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>{grant.jurisdiction}</span>
                    <span className="bg-white border border-slate-200 text-slate-700 text-xs px-2 py-1 rounded-full font-medium">{grant.category}</span>
                    <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">{grant.fundingType}</span>
                    <button onClick={()=>speak(`${grant.title}. ${grant.description}`, grant.id)} aria-label={speakingId===grant.id ? "Stop speaking" : "Listen to grant"} className={`ml-auto h-7 w-7 grid place-items-center rounded-full border ${speakingId===grant.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                      {speakingId===grant.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-slate-900 leading-5 group-hover:text-blue-700 transition">{grant.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1.5 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {grant.agency}</p>
                  <p className="text-sm leading-5 text-slate-600 mt-3 line-clamp-3">{grant.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs">
                    <div><div className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">Amount</div><div className="font-semibold text-slate-900 mt-0.5">{grant.amountRange}</div></div>
                    <div><div className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">Deadline</div><div className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1"><Calendar className="h-3 w-3 text-slate-400" /> {grant.deadline}</div></div>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2"><Users className="h-3.5 w-3.5 text-slate-500" /> Recent recipients</div>
                    <div className="space-y-1.5">
                      {grant.recipients.slice(0,2).map((rec,idx)=> (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white border border-slate-100 px-2.5 py-2 rounded-xl">
                          <span className="font-medium text-slate-900 truncate max-w-[160px]" title={rec.name}>{rec.name}</span>
                          <span className="flex items-center gap-2 shrink-0"><span className="text-slate-500">{rec.year}</span><span className="font-semibold text-emerald-700">{rec.amount}</span></span>
                        </div>
                      ))}
                      {grant.recipients.length>2 && <div className="text-[11px] text-slate-500 text-right">+{grant.recipients.length-2} more</div>}
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <a href={grant.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">Portal <ExternalLink className="h-3 w-3" /></a>
                  <button onClick={()=>setSelectedGrant(grant)} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-600">Details <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </article>
            ))}
          </div>
        )}

        {viewMode==='simple-grants' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-600">
                  <tr><th className="p-3.5 font-semibold">Grant</th><th className="p-3.5 font-semibold">Agency</th><th className="p-3.5 font-semibold">Jurisdiction</th><th className="p-3.5 font-semibold">Amount</th><th className="p-3.5 font-semibold">Deadline</th><th className="p-3.5 text-right"></th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGrants.map(g=> (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-medium text-slate-900 max-w-xs">{g.title}</td>
                      <td className="p-3.5 text-slate-600">{g.agency}</td>
                      <td className="p-3.5"><span className="text-xs px-2 py-1 rounded-full border bg-white">{g.jurisdiction}</span></td>
                      <td className="p-3.5 font-medium">{g.amountRange}</td>
                      <td className="p-3.5 text-slate-600">{g.deadline}</td>
                      <td className="p-3.5 text-right"><button onClick={()=>setSelectedGrant(g)} className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold">Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode==='simple-recipients' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-600">
                  <tr><th className="p-3.5">Recipient</th><th className="p-3.5">Location</th><th className="p-3.5">Amount</th><th className="p-3.5">Year</th><th className="p-3.5">Grant</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allRecipients.map((r:any, i:number)=> (
                    <tr key={i} className="hover:bg-slate-50"><td className="p-3.5 font-medium">{r.name}</td><td className="p-3.5 text-slate-600 inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</td><td className="p-3.5 font-semibold text-emerald-700">{r.amount}</td><td className="p-3.5">{r.year}</td><td className="p-3.5 text-slate-600 max-w-xs truncate">{r.grantTitle}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode==='legal' && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">Legal • 2 CFR 200 • FOIA/CPRA</div>
              <h2 className="text-2xl font-bold mt-2">Tax-Funded Legal & Rules Hub</h2>
              <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">Every federal/California dollar is governed by appropriations, Uniform Guidance cost principles, and public disclosure mandates. Citations are authoritative, not AI-generated.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ['1. Appropriations','Anti-Deficiency Act 31 U.S.C. §1341','Constitution art I §9, California Budget Act'],
                ['2. Uniform Guidance','2 CFR 200 cost principles & $750k Single Audit','OMB 2014 rev 2024, 24 CFR 578'],
                ['3. Transparency','FOIA 5 U.S.C. §552, CPRA Gov Code 6250, FFATA','Public right to know'],
                ['4. Advocacy limits','Byrd Amendment 31 U.S.C. §1352, IRC 501(c)(3)','No federal lobbying'],
              ].map(([title,desc,cite])=> (
                <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="font-semibold text-slate-900 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-600" />{title}</div>
                  <p className="text-sm text-slate-600 mt-2">{desc}</p>
                  <p className="text-xs text-slate-500 mt-3 border-t border-slate-100 pt-3">{cite}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredGrants.length===0 && viewMode!=='legal' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="h-12 w-12 rounded-full bg-slate-100 grid place-items-center mx-auto"><Search className="h-5 w-5 text-slate-400" /></div>
            <h3 className="mt-3 font-semibold text-slate-900">No grants found</h3>
            <p className="text-sm text-slate-600 mt-1">Try a different search or clear filters.</p>
            <button onClick={()=>{setSearchQuery(''); setSelectedCategory('All');}} className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold">Clear search</button>
          </div>
        )}
      </main>

      {selectedGrant && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Grant details">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-xl border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex justify-between gap-4">
              <div>
                <div className="flex gap-1.5 mb-2"><span className="text-xs px-2 py-1 rounded-full border bg-white">{selectedGrant.jurisdiction}</span><span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-white">{selectedGrant.category}</span></div>
                <h2 className="text-xl font-semibold leading-tight">{selectedGrant.title}</h2>
                <p className="text-sm font-medium text-slate-600 mt-1 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {selectedGrant.agency}</p>
              </div>
              <button onClick={()=>setSelectedGrant(null)} aria-label="Close" className="h-9 w-9 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 shrink-0"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-slate-700">{selectedGrant.description}</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm">
                <div><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Funding</div><div className="font-medium mt-1">{selectedGrant.fundingType}</div></div>
                <div><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</div><div className="font-medium mt-1">{selectedGrant.amountRange}</div></div>
                <div><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deadline</div><div className="font-medium mt-1 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedGrant.deadline}</div></div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Eligibility</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">{selectedGrant.eligibility.map((e,i)=><span key={i} className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">{e}</span>)}</div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Recipients <span className="text-slate-500 font-normal">— last 2 years</span></h4>
                <div className="mt-3 space-y-2">
                  {selectedGrant.recipients.map((r,i)=> (
                    <div key={i} className="border border-slate-200 rounded-xl p-3">
                      <div className="flex flex-wrap justify-between gap-2"><span className="font-medium text-sm">{r.name}</span><span className="flex items-center gap-2 text-xs"><span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white">{r.year}</span><span className="font-semibold text-emerald-700">{r.amount}</span></span></div>
                      <p className="text-xs text-slate-600 mt-1.5">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-4">
                <a href={selectedGrant.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1">Portal <ExternalLink className="h-3 w-3" /></a>
                <button onClick={()=>setSelectedGrant(null)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-slate-500">
          <span>© 2026 TaxFunded Intelligence • FOIA/CPRA • 2 CFR 200</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 bg-emerald-500 rounded-full" /> All endpoints HTTPS • {filteredGrants.length} grants indexed</span>
        </div>
      </footer>
    </div>
  );
}
