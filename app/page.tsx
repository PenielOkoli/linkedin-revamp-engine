'use client';

import { useState, FormEvent } from 'react';

type RevampResult = {
  brand_pillars?: string[];
  positioning_statement?: string;
  headlines?: string[];
  about_section?: string;
  experience?: {
    job_title: string;
    company: string;
    bullets: string[];
  }[];
  launch_post?: string;
};

export default function IntakeForm() {
  const [isStudent, setIsStudent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [revampResult, setRevampResult] = useState<RevampResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://myselfhostedn8n.duckdns.org/webhook-test/intake', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const finalOutput = Array.isArray(data) && data[0]?.output ? data[0].output : data;
        setRevampResult(finalOutput);
      } else {
        setStatusMessage('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatusMessage('Network error. Ensure your connection is stable.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCopyPost = () => {
    if (revampResult?.launch_post) {
      navigator.clipboard.writeText(revampResult.launch_post);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (revampResult) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 p-8 md:p-16 selection:bg-blue-600">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="border-b border-gray-800 pb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Profile Revamp Ready</h1>
              <p className="text-gray-400">Review your AI-generated brand positioning, copy, and launch assets.</p>
            </div>
            <button 
              onClick={() => setRevampResult(null)} 
              className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              Start New Intake
            </button>
          </header>

          <section className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-4">Brand Pillars</h2>
              <div className="flex flex-wrap gap-3">
                {(revampResult.brand_pillars || []).map((pillar, i) => (
                  <span key={i} className="bg-blue-900/30 text-blue-300 border border-blue-800/50 px-3 py-1 rounded-full text-sm font-medium">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-4">Positioning Statement</h2>
              <p className="text-lg text-gray-200 leading-relaxed italic border-l-4 border-blue-600 pl-4">
                "{revampResult.positioning_statement || 'Positioning statement generating...'}"
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-4">Headline Options</h2>
              <ul className="space-y-3">
                {(revampResult.headlines || []).map((headline, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-gray-950 rounded border border-gray-800">
                    <span className="text-gray-600 font-mono mt-0.5">0{i + 1}</span>
                    <p className="text-gray-200 font-medium">{headline}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-4">About Section</h2>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {revampResult.about_section || 'About section generating...'}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-4">Experience Rewrite</h2>
              <div className="space-y-6">
                {(revampResult.experience || []).map((exp, i) => (
                  <div key={i} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-semibold text-white">{exp.job_title}</h3>
                    <p className="text-gray-400 mb-4">{exp.company}</p>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-300">
                      {(exp.bullets || []).map((bullet, j) => (
                        <li key={j} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {revampResult.launch_post && (
              <div className="bg-gradient-to-br from-blue-950/40 to-gray-900 border border-blue-800/40 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-semibold tracking-wider text-blue-400 uppercase">Phase 7: LinkedIn Launch Post</h2>
                  <button
                    onClick={handleCopyPost}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded transition"
                  >
                    {copied ? 'Copied!' : 'Copy Post Text'}
                  </button>
                </div>
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed bg-gray-950/60 p-4 rounded border border-gray-800 font-sans">
                  {revampResult.launch_post}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8 md:p-16 selection:bg-blue-600">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">LinkedIn Revamp Intake</h1>
          <p className="text-gray-400">Complete all required fields below to initiate your profile optimization.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Target Positioning</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="targetRoles" className="text-sm text-gray-300">Target Roles *</label>
                <input required type="text" id="targetRoles" name="targetRoles" placeholder="e.g., Senior Frontend Engineer" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
              <div className="space-y-2">
                <label htmlFor="targetIndustry" className="text-sm text-gray-300">Target Industry *</label>
                <input required type="text" id="targetIndustry" name="targetIndustry" placeholder="e.g., Web3 / Decentralized Finance" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="keySkills" className="text-sm text-gray-300">Key Skills & Emerging Proficiencies *</label>
              <input required type="text" id="keySkills" name="keySkills" placeholder="React, TypeScript, Smart Contracts..." 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="aboutHighlights" className="text-sm text-gray-300">"About" Highlights & Personality Signals *</label>
              <textarea required id="aboutHighlights" name="aboutHighlights" rows={3} placeholder="What drives you? Describe your professional mission and values..." 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </section>

          <hr className="border-gray-800" />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Verification & Assets</h2>
            
            <div className="space-y-2">
              <label htmlFor="paymentProof" className="text-sm text-gray-300">Proof of Payment File *</label>
              <input required type="file" id="paymentProof" name="paymentProof" accept="image/*,.pdf" 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer" />
            </div>

            <div className="flex items-center space-x-3 my-4">
              <input type="checkbox" id="studentClaim" onChange={(e) => setIsStudent(e.target.checked)} 
                className="w-5 h-5 bg-gray-900 border-gray-700 rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="studentClaim" className="text-sm text-gray-300">I am claiming student pricing</label>
            </div>

            {isStudent && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="studentId" className="text-sm text-gray-300">Student ID Upload *</label>
                <input required={isStudent} type="file" id="studentId" name="studentId" accept="image/*,.pdf" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer" />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="cvFile" className="text-sm text-gray-300">Upload CV / Resume (PDF Only) *</label>
              <input required type="file" id="cvFile" name="cvFile" accept=".pdf" 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer" />
            </div>

            <div className="space-y-2">
              <label htmlFor="certificates" className="text-sm text-gray-300">Certificates & Work Samples Files</label>
              <input type="file" id="certificates" name="certificates" multiple accept="image/*,.pdf,.doc,.docx" 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer" />
            </div>
          </section>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing Engine Pipeline...' : 'Submit to Engine'}
          </button>
          
          {statusMessage && (
            <div className={`p-4 rounded-md mt-4 text-sm font-medium ${statusMessage.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}