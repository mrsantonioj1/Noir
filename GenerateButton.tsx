import React from 'react';

/**
 * Props for the GenerateButton. Accepts an onClick handler, whether it is
 * disabled, and a loading state to show spinner feedback. Any children will
 * be used as the button label.
 */
export interface GenerateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

/**
 * GenerateButton styles a standard button according to the brand palette. When
 * loading, it shows a simple spinner animation and prevents additional clicks.
 */
const GenerateButton: React.FC<GenerateButtonProps> = ({ children, loading = false, disabled, ...rest }) => {
  return (
    <button
      className={`generate-button${disabled ? ' disabled' : ''}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="spinner" aria-label="Loading" />
      ) : (
        children
      )}
    </button>
  );
};

export default GenerateButton;