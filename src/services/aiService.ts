// AI Service for meeting summarization
// Supports multiple providers: Claude (Anthropic), OpenAI, OpenRouter

export interface SummaryOptions {
  style: 'brief' | 'bullet' | 'action';
  maxLength?: number;
}

export interface AIProvider {
  name: string;
  summarize: (transcript: string, options?: SummaryOptions) => Promise<string>;
}

// OpenRouter Provider (Recommended - supports multiple models)
class OpenRouterProvider implements AIProvider {
  name = 'OpenRouter';
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private model: string;

  constructor(apiKey: string, model: string = 'anthropic/claude-3-haiku') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async summarize(transcript: string, options: SummaryOptions = { style: 'brief' }): Promise<string> {
    const prompt = this.buildPrompt(transcript, options);

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': 'AI Meeting Summarizer' // Optional but recommended
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise, well-structured meeting summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private buildPrompt(transcript: string, options: SummaryOptions): string {
    const styleInstructions = {
      brief: 'Create a concise summary in paragraph form.',
      bullet: 'Create a summary using bullet points for key topics.',
      action: 'Focus on action items, decisions, and next steps.'
    };

    return `Please summarize the following meeting transcript. ${styleInstructions[options.style]}

Include:
- Key discussion points
- Important decisions made
- Action items and who is responsible
- Next steps or follow-up items

Meeting Transcript:
${transcript}

Please provide a well-structured summary:`;
  }
}

// Claude (Anthropic) Provider
class ClaudeProvider implements AIProvider {
  name = 'Claude';
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async summarize(transcript: string, options: SummaryOptions = { style: 'brief' }): Promise<string> {
    const prompt = this.buildPrompt(transcript, options);

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Using the most cost-effective model
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  private buildPrompt(transcript: string, options: SummaryOptions): string {
    const styleInstructions = {
      brief: 'Create a concise summary in paragraph form.',
      bullet: 'Create a summary using bullet points for key topics.',
      action: 'Focus on action items, decisions, and next steps.'
    };

    return `Please summarize the following meeting transcript. ${styleInstructions[options.style]}

Include:
- Key discussion points
- Important decisions made
- Action items and who is responsible
- Next steps or follow-up items

Meeting Transcript:
${transcript}

Please provide a well-structured summary:`;
  }
}

// OpenAI Provider
class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async summarize(transcript: string, options: SummaryOptions = { style: 'brief' }): Promise<string> {
    const prompt = this.buildPrompt(transcript, options);

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Cost-effective model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise, well-structured meeting summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private buildPrompt(transcript: string, options: SummaryOptions): string {
    const styleInstructions = {
      brief: 'Create a concise summary in paragraph form.',
      bullet: 'Create a summary using bullet points for key topics.',
      action: 'Focus on action items, decisions, and next steps.'
    };

    return `Please summarize the following meeting transcript. ${styleInstructions[options.style]}

Include:
- Key discussion points
- Important decisions made
- Action items and who is responsible
- Next steps or follow-up items

Meeting Transcript:
${transcript}

Please provide a well-structured summary:`;
  }
}

// Mock Provider for development/testing
class MockProvider implements AIProvider {
  name = 'Mock';

  async summarize(transcript: string, options: SummaryOptions = { style: 'brief' }): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const summaries = {
      brief: `**Meeting Summary**

This meeting covered several important topics including project timeline discussions, budget allocation reviews, and resource planning. The team identified key milestones for the upcoming quarter and discussed potential challenges that may arise during implementation.

Key decisions were made regarding vendor selection and the team agreed on a revised timeline that accommodates recent changes in project scope. Action items were assigned to various team members with clear deadlines.

The meeting concluded with plans for a follow-up session next week to review progress and address any emerging issues.`,

      bullet: `**Meeting Summary**

**Key Discussion Points:**
• Project timeline and milestone planning
• Budget allocation and resource requirements
• Vendor selection process and criteria
• Risk assessment and mitigation strategies
• Team responsibilities and assignments

**Decisions Made:**
• Approved revised project timeline
• Selected primary vendor for implementation
• Allocated additional resources to critical path items
• Established weekly check-in meetings

**Action Items:**
• Complete vendor contract negotiations (Due: Friday)
• Update project documentation (Due: Next Tuesday)
• Schedule stakeholder presentation (Due: End of week)
• Finalize resource allocation plan (Due: Monday)`,

      action: `**Action Items & Next Steps**

**Immediate Actions (This Week):**
• John: Complete market research analysis by Friday
• Sarah: Schedule stakeholder meeting for next Tuesday
• Mike: Update project timeline documentation by Thursday
• Team: Review vendor proposals and provide feedback by Wednesday

**Upcoming Milestones:**
• Week 2: Finalize vendor selection and contracts
• Week 3: Begin implementation phase
• Week 4: First progress review and stakeholder update

**Follow-up Required:**
• Weekly team check-ins every Tuesday at 2 PM
• Monthly stakeholder reviews
• Quarterly budget and timeline assessments

**Decisions Pending:**
• Final approval on budget adjustments
• Resource allocation for Q2 initiatives
• Timeline for additional feature requests`
    };

    return summaries[options.style] || summaries.brief;
  }
}

// Main AI Service
export class AIService {
  private provider: AIProvider;

  constructor(provider?: AIProvider) {
    // Default to mock provider if no provider specified
    this.provider = provider || new MockProvider();
  }

  static createOpenRouter(apiKey: string, model?: string): AIService {
    return new AIService(new OpenRouterProvider(apiKey, model));
  }

  static createClaude(apiKey: string): AIService {
    return new AIService(new ClaudeProvider(apiKey));
  }

  static createOpenAI(apiKey: string): AIService {
    return new AIService(new OpenAIProvider(apiKey));
  }

  static createMock(): AIService {
    return new AIService(new MockProvider());
  }

  async summarizeMeeting(transcript: string, options?: SummaryOptions): Promise<string> {
    if (!transcript || transcript.trim().length === 0) {
      throw new Error('Transcript cannot be empty');
    }

    try {
      return await this.provider.summarize(transcript, options);
    } catch (error) {
      console.error(`AI summarization failed with ${this.provider.name}:`, error);
      throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getProviderName(): string {
    return this.provider.name;
  }
}

// Environment-based service factory
export function createAIService(): AIService {
  const openrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const claudeKey = import.meta.env.VITE_CLAUDE_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (openrouterKey) {
    console.log('Using OpenRouter AI provider');
    // You can specify a different model here if needed
    // Popular options: 'anthropic/claude-3-haiku', 'openai/gpt-3.5-turbo', 'meta-llama/llama-2-70b-chat'
    return AIService.createOpenRouter(openrouterKey, 'anthropic/claude-3-haiku');
  } else if (claudeKey) {
    console.log('Using Claude AI provider');
    return AIService.createClaude(claudeKey);
  } else if (openaiKey) {
    console.log('Using OpenAI provider');
    return AIService.createOpenAI(openaiKey);
  } else {
    console.log('No AI API key found, using mock provider');
    return AIService.createMock();
  }
}