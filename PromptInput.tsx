import React from 'react';

/**
 * Props for the PromptInput component. Accepts the current value and a setter
 * function. This component is controlled by its parent.
 */
export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * PromptInput renders a large text area where users can describe their vision
 * for the generated portrait. It includes helpful placeholder examples and
 * character hints without imposing strict limits.
 */
const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div className="prompt-input-container">
      <textarea
        className="prompt-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Be specific: lighting, setting, mood, style, wardrobe... \nExample: Soft morning light at a Parisian café, wearing a silk dress with a wide brim hat"
        rows={4}
      />
    </div>
  );
};

export default PromptInput;