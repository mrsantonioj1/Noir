import React from 'react';

/**
 * Props for the ResultDisplay component. Accepts an array of data URLs and
 * displays them in order. Each image includes a download link.
 */
export interface ResultDisplayProps {
  results: string[];
}

/**
 * ResultDisplay iterates over the generated image results and renders them
 * inside responsive cards. Users can click the download link to save the
 * portrait locally. The file name includes a timestamp and index for clarity.
 */
const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div className="results-grid">
      {results.map((dataUrl, index) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const fileName = `noir-twin-${timestamp}-${index + 1}.png`;
        return (
          <div key={index} className="result-card">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={dataUrl} alt="Generated portrait" className="result-image" />
            <a
              href={dataUrl}
              download={fileName}
              className="download-link"
            >
              Download
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ResultDisplay;