import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, travelStyle, duration, guests, startingCity } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `
You are the Chief Travel Concierge for 'See Morocco Travel', Morocco's premier luxury private travel and executive chauffeur service.
Your goal is to provide sophisticated, eloquent, expert advice and custom itinerary recommendations for high-end travelers visiting Morocco.

Tone & Persona:
- Ultra-luxurious, warm Moroccan hospitality, authoritative yet welcoming, like an Aman or Four Seasons Chief Concierge.
- Highlight See Morocco Travel's bespoke services: Private Chauffeurs (Maybach V-Class, Range Rover Autobiography, VIP Sprinter), Royal Sahara Glamping, Secret Medina Riads, and seamless Airport Transfers.
- Provide concrete travel times, secret local recommendations (e.g. sunset rooftop drinks, Berber tea, hidden artisan co-ops), and suggested pacing.

Structure your response clearly with:
1. **Personalized Welcome & Vision**
2. **Curated Luxury Itinerary Highlights** (Day by Day summary if relevant)
3. **Recommended VIP Transport & Vehicle**
4. **Insider Concierge Tips** (Best photo spots, culinary secrets, packing advice)
5. **Direct Call-to-Action to book on WhatsApp or via See Morocco Travel**
`;

    const fullPrompt = `
Traveler Request: ${prompt || 'Suggest a luxury trip to Morocco'}
Travel Style: ${travelStyle || 'Luxury & Cultural'}
Duration: ${duration || '3 to 7 Days'}
Guests: ${guests || '2 Passengers'}
Starting Location: ${startingCity || 'Marrakech'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text || 'Our concierge is tailoring your experience. Please try again.',
    });
  } catch (error: any) {
    console.error('Concierge API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to communicate with AI Concierge' },
      { status: 500 }
    );
  }
}
