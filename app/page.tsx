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

    try {
      // Sends multipart/form-data directly to n8n webhook for binary file processing
      const response = await fetch('https://myselfhostedn8n.duckdns.org/webhook-test/intake', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatusMessage('Intake submitted successfully. Our engine is processing your assets.');
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
              <label htmlFor="cvFile" className="text-sm text-gray-300">Upload CV / Resume (PDF/Word) *</label>
              <input required type="file" id="cvFile" name="cvFile" accept=".pdf,.doc,.docx" 
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
            {isSubmitting ? 'Uploading Assets & Submitting...' : 'Submit to Engine'}
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