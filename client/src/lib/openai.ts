import OpenAI from "openai";
import { AnalysisResult, TreatmentPlan } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY 
});

interface AnalysisData {
  prescriptionText: string;
  symptoms: string;
  voiceTranscript: string;
  prescriptionImages?: any[];
}

export async function analyzeHealthData(data: AnalysisData): Promise<AnalysisResult> {
  try {
    const prompt = `You are a medical AI assistant specializing in both Allopathic (modern medicine) and Ayurvedic (traditional Indian medicine) treatment approaches. 

Analyze the following patient data and provide comprehensive treatment plans for both approaches:

Prescription Text: ${data.prescriptionText}
Symptoms: ${data.symptoms}
Voice Transcript: ${data.voiceTranscript}

Please provide your response in JSON format with the following structure:
{
  "allopathicPlan": {
    "type": "allopathic",
    "title": "Modern Medical Treatment Plan",
    "description": "Brief description of the allopathic approach",
    "medications": [
      {
        "name": "Medication name",
        "dosage": "Dosage amount",
        "frequency": "How often to take",
        "purpose": "What it's for"
      }
    ],
    "lifestyle": ["lifestyle recommendations"],
    "duration": "Treatment duration",
    "precautions": ["important precautions"],
    "followUp": "Follow-up recommendations"
  },
  "ayurvedicPlan": {
    "type": "ayurvedic",
    "title": "Ayurvedic Treatment Plan",
    "description": "Brief description of the ayurvedic approach",
    "medications": [
      {
        "name": "Herb/formulation name",
        "dosage": "Dosage amount",
        "frequency": "How often to take",
        "purpose": "What it's for"
      }
    ],
    "lifestyle": ["lifestyle and dietary recommendations"],
    "duration": "Treatment duration",
    "precautions": ["important precautions"],
    "followUp": "Follow-up recommendations"
  },
  "confidence": 0.85,
  "analysis": "Overall analysis of the patient's condition and treatment rationale"
}

Important guidelines:
1. Base recommendations on the provided prescription and symptoms
2. Ensure both plans are medically sound and complementary
3. Include appropriate disclaimers about consulting healthcare professionals
4. Provide practical, actionable recommendations
5. Consider herb-drug interactions between the two approaches`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant with expertise in both modern medicine and Ayurveda. Always provide balanced, evidence-based recommendations and emphasize the importance of consulting qualified healthcare professionals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      allopathicPlan: result.allopathicPlan,
      ayurvedicPlan: result.ayurvedicPlan,
      confidence: result.confidence || 0.8,
      analysis: result.analysis || "Analysis completed successfully"
    };

  } catch (error) {
    console.error("OpenAI analysis error:", error);
    throw new Error("Failed to analyze health data with AI");
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Transcription failed');
    }

    const result = await response.json();
    return result.text || '';
  } catch (error) {
    console.error("Audio transcription error:", error);
    throw new Error("Failed to transcribe audio");
  }
}
