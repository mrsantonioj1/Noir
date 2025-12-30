import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import GenerateButton from './components/GenerateButton';
import ResultDisplay from './components/ResultDisplay';
import PricingSection from './components/PricingSection';
import { generateImage } from './services/geminiService';

/**
 * Main application component. This orchestrates the high‑level user flow: uploading images,
 * entering a creative prompt, generating a new portrait via Gemini, and showing results.
 */
const App: React.FC = () => {
  // List of uploaded images. We store the File objects to send directly to the API.
  const [files, setFiles] = useState<File[]>([]);
  // The creative prompt provided by the user. Drives the AI stylisation.
  const [prompt, setPrompt] = useState('');
  // Array of generated images as data URLs. New generations are prepended to keep latest at top.
  const [results, setResults] = useState<string[]>([]);
  // Boolean indicating whether the AI generation is currently running.
  const [loading, setLoading] = useState(false);
  // Error message if generation fails. Displayed above the generate button.
  const [error, setError] = useState<string | null>(null);

  /**
   * Handler for initiating the image generation process. Calls the Gemini service and
   * updates the results state with the returned image. If an error occurs, it
   * surfaces a user friendly message.
   */
  const handleGenerate = async () => {
    if (!files.length) return;
    setError(null);
    setLoading(true);
    try {
      const image = await generateImage({ files, userPrompt: prompt });
      // Prepend the new result so the newest appears at the top.
      setResults((prev) => [image, ...prev]);
    } catch (err: unknown) {
      console.error(err);
      setError('Something went wrong while generating your twin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header with logos */}
      <header className="header">
        <div className="logo-area">
          <img src="/logo.svg" alt="NOIR TWIN logo" className="logo-icon" />
          <img src="/logo-text.svg" alt="NOIR TWIN" className="logo-text" />
        </div>
        <p className="tagline">Luxury AI Portraiture – For the culture, by the culture</p>
      </header>

      {/* Main content sections */}
      <main className="main-content">
        <section className="upload-section">
          <h2>Upload Photos</h2>
          <ImageUploader files={files} setFiles={setFiles} />
        </section>

        <section className="prompt-section">
          <h2>Your Vision</h2>
          <PromptInput value={prompt} onChange={setPrompt} />
        </section>

        <section className="generate-section">
          {error && <p className="error-message">{error}</p>}
          <GenerateButton
            onClick={handleGenerate}
            disabled={loading || !files.length}
            loading={loading}
          >
            Generate Image
          </GenerateButton>
        </section>

        <section className="results-section">
          {results.length > 0 && <h2>Your Twins</h2>}
          <ResultDisplay results={results} />
        </section>

        <section className="pricing-section">
          <h2>Choose Your Plan</h2>
          <PricingSection />
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} NOIR TWIN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;