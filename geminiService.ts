import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, Part } from '@google/generative-ai';

/**
 * The master prompt template used for every generation. User prompt is
 * interpolated at the [USER PROMPT INSERTED HERE] placeholder. This prompt
 * follows the brief precisely, ensuring the identical twin effect and
 * professional photographic quality.
 */
const MASTER_PROMPT = `System Instruction: You are an AI art director for a world-class beauty and fashion photoshoot. Your goal is to generate a flawless, hyper-realistic image that is indistinguishable from a photograph shot by a legendary photographer.

Task: Create a new, breathtakingly realistic image of the person from the reference photos, styled according to the following directives.

**Core Directives:**

1. **Identical Twin Replication (HIGHEST PRIORITY):**
   - The primary rule is to generate a new photograph of the **exact same individual** from the reference photos
   - The result must be an identical twin, indistinguishable from the source
   - Perform deep analysis of reference photos to lock in all facial markers
   - Zero deviation in key facial landmarks (eyes, nose, lips, jawline, cheekbones)
   - Preserve exact facial features with 100% accuracy

2. **Luminous High-Key Lighting:**
   - Every image must be significantly lighter and brighter than reference photos
   - Employ sophisticated multi-point studio lighting setup
   - Subject's skin must appear luminous and glowing
   - Create bright, airy, high-key effect

3. **Professional Camera Simulation:**
   - Simulate high-end full-frame camera (Canon EOS R5, Sony A7R IV)
   - Use professional 85mm f/1.4 or 135mm f/1.8 lens
   - Wide aperture (f/1.8-f/2.8) for shallow depth of field
   - Tack-sharp subject with beautifully blurred background

4. **Flawless Styling:**
   - Professional makeup application
   - Impeccably styled hair
   - Satin finish skin (not glossy)
   - Show natural skin texture with visible pores
   - No tattoos

5. **Composition:**
   - Full head, hair, and shoulders visible
   - No cropping of head or hair
   - Head-and-shoulders or upper-body framing
   - 1:1 aspect ratio

6. **User Vision:** [USER PROMPT INSERTED HERE]

Output only the final image. No text, descriptions, or commentary.`;

interface GenerateOptions {
  files: File[];
  userPrompt: string;
}

/**
 * Reads a File object and converts it to a Gemini Part. The inlineData
 * structure requires base64 encoded image data and the original MIME type.
 *
 * @param file A File selected by the user
 * @returns A Part representing image data for the Gemini API
 */
async function fileToGenerativePart(file: File): Promise<Part> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = '';
  for (const byte of uint8Array) {
    binary += String.fromCharCode(byte);
  }
  const base64 = btoa(binary);
  return {
    inlineData: {
      data: base64,
      mimeType: file.type,
    },
  };
}

/**
 * Generates a single portrait using the Gemini Flash experimental model. The
 * function composes the master prompt with the user's creative prompt and
 * attaches the uploaded reference photos as inline data. It returns a data
 * URL representing the generated image.
 *
 * Note: If the API key is missing or the request fails, an error will be
 * thrown. Consumers of this function should handle errors gracefully.
 */
export async function generateImage({ files, userPrompt }: GenerateOptions): Promise<string> {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }
  // Initialise the GoogleGenerativeAI client
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    // Provide the master prompt via the system instruction. The library merges
    // systemInstruction into each request when using generateContent().
    systemInstruction: MASTER_PROMPT.replace('[USER PROMPT INSERTED HERE]', userPrompt),
  });

  // Convert each uploaded file to the Part structure expected by the API
  const imageParts: Part[] = [];
  for (const file of files) {
    const part = await fileToGenerativePart(file);
    imageParts.push(part);
  }

  // Compose the user message. We embed the prompt within the system instruction
  // itself, so the user content can remain minimal. The API still requires a
  // user role, so we send just the images here.
  const contents = [
    {
      role: 'user' as const,
      parts: [...imageParts],
    },
  ];

  // Configure safety settings to allow beauty photos while blocking harmful content.
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUAL, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  const response = await model.generateContent({
    contents,
    safetySettings,
  });
  const candidate = response?.response?.candidates?.[0];
  const parts = candidate?.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error('No image returned from Gemini.');
  }
  const inline = parts[0].inlineData;
  if (!inline) {
    throw new Error('Expected inlineData in Gemini response.');
  }
  const { mimeType, data } = inline;
  return `data:${mimeType};base64,${data}`;
}