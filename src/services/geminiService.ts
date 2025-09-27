const LLAMA_API_KEY = 'AIzaSyBvNz44WrGqSjf_RY4L_QUYqdZhcIfTwAk';
const LLAMA_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface DocumentAnalysis {
  title: string;
  type: string;
  department: string;
  date: string;
  language: string;
  urgency: 'low' | 'medium' | 'high';
  entities: {
    names: string[];
    places: string[];
    amounts: string[];
  };
  summary: string;
  keyPoints: string[];
  analyticsReady: boolean;
}

export async function analyzeDocumentWithLLAMA(documentText: string, fileName: string): Promise<DocumentAnalysis> {
  const prompt = `You are an AI assistant that extracts structured insights from KMRL enterprise documents. Analyze this document and return a JSON object with the following structure:

{
  "title": "Document title (extract or generate from content)",
  "type": "Document type (Report, Proposal, Invoice, Audit, Compliance, etc.)",
  "department": "Relevant department (Finance, HR, Legal, Operations, etc.)",
  "date": "Document date (extract or estimate)",
  "language": "Primary language (English/Malayalam/Mixed)",
  "urgency": "Document urgency level (low/medium/high)",
  "entities": {
    "names": ["person names found"],
    "places": ["locations mentioned"],
    "amounts": ["monetary amounts or quantities"]
  },
  "summary": "Comprehensive 200-word summary",
  "keyPoints": ["3-5 most important points"],
  "analyticsReady": true/false (if document contains financial data, metrics, or quantitative information)
}

Document Name: ${fileName}

Document Content:
${documentText.slice(0, 8000)}${documentText.length > 8000 ? '...\n\n[Content truncated for processing]' : ''}`;

  try {
    const response = await fetch(`${LLAMA_API_URL}?key=${LLAMA_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`LLAMA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No response from LLAMA API');
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from LLAMA response');
    }

    const analysis: DocumentAnalysis = JSON.parse(jsonMatch[0]);
    
    // Validate and sanitize the response
    return {
      title: analysis.title || fileName,
      type: analysis.type || 'Document',
      department: analysis.department || 'General',
      date: analysis.date || new Date().toISOString().split('T')[0],
      language: analysis.language || 'English',
      urgency: ['low', 'medium', 'high'].includes(analysis.urgency) ? analysis.urgency : 'medium',
      entities: {
        names: Array.isArray(analysis.entities?.names) ? analysis.entities.names : [],
        places: Array.isArray(analysis.entities?.places) ? analysis.entities.places : [],
        amounts: Array.isArray(analysis.entities?.amounts) ? analysis.entities.amounts : []
      },
      summary: analysis.summary || 'No summary available',
      keyPoints: Array.isArray(analysis.keyPoints) ? analysis.keyPoints : [],
      analyticsReady: Boolean(analysis.analyticsReady)
    };
  } catch (error) {
    console.error('Error analyzing document with LLAMA:', error);
    throw new Error('Failed to analyze document. Please try again.');
  }
}