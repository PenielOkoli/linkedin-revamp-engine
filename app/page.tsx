'use client';

import { useState, FormEvent } from 'react';

export default function IntakeForm() {
  const [isStudent, setIsStudent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // This webhook URL will be replaced with your live n8n production webhook
      const response = await fetch('https://your-n8n-domain.com/webhook/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage('Intake submitted successfully. Our engine is processing your profile.');
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

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8 md:p-16 selection:bg-blue-600">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">LinkedIn Revamp Intake</h1>
          <p className="text-gray-400">Complete all required fields below to initiate your profile optimization.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Base Information */}
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

          {/* Verification & Assets */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Verification & Assets</h2>
            
            <div className="space-y-2">
              <label htmlFor="paymentProof" className="text-sm text-gray-300">Proof of Payment Link / Ref *</label>
              <input required type="text" id="paymentProof" name="paymentProof" placeholder="Transaction ID or receipt link" 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>

            <div className="flex items-center space-x-3 my-4">
              <input type="checkbox" id="studentClaim" onChange={(e) => setIsStudent(e.target.checked)} 
                className="w-5 h-5 bg-gray-900 border-gray-700 rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="studentClaim" className="text-sm text-gray-300">I am claiming student pricing</label>
            </div>

            {isStudent && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="studentId" className="text-sm text-gray-300">Student ID Link *</label>
                <input required={isStudent} type="text" id="studentId" name="studentId" placeholder="Link to student ID verification" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="cvContent" className="text-sm text-gray-300">Current CV / Resume Text (or Link) *</label>
              <textarea required id="cvContent" name="cvContent" rows={5} placeholder="Paste your current CV text or provide a Google Drive link..." 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="certificates" className="text-sm text-gray-300">Certificates & Work Samples Links</label>
              <textarea id="certificates" name="certificates" rows={2} placeholder="Links to valid certificates or portfolio..." 
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </section>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Validating Payload...' : 'Submit to Engine'}
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