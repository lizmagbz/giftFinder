import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import Constants from 'expo-constants';

import {
  GiftAiResponse,
  GiftFormData,
  GiftSuggestion,
} from '@/types/gift';

const GENERIC_ERROR = 'Algo deu errado. Tente novamente.';
const RATE_LIMIT_ERROR =
  'O Gemini ainda está no limite de uso. Espere alguns minutos e tente só uma vez.';

const GEMINI_MODEL = 'gemini-3.5-flash-lite';

const SYSTEM_PROMPT = `Você é um especialista em sugestões de presentes.

Sua tarefa é recomendar presentes atenciosos, específicos e personalizados com base nas informações fornecidas pelo usuário.

Analise juntos o relacionamento, a idade, a ocasião, os interesses, o orçamento e o estilo preferido. Não dê sugestões genéricas que serviriam para qualquer pessoa.

Regras:
- Retorne exatamente 3 recomendações de presente.
- Cada sugestão deve respeitar o orçamento selecionado e ser realista de comprar no Brasil.
- Combine com o estilo do presente (útil, criativo, personalizado, divertido, elegante ou tecnologia).
- Use os interesses para que cada ideia pareça escolhida para aquela pessoa.
- Explique com clareza por que cada presente combina com essa pessoa e com essa ocasião.
- Escreva name, reason, description e personalization em português do Brasil.
- O preço deve ser uma estimativa realista em reais (R$), dentro do orçamento.
- Não mencione que você é uma IA.
- Não inclua markdown, comentários ou qualquer texto fora do JSON.

Retorne um único objeto JSON neste formato exato:
{
  "gifts": [
    {
      "name": "Nome do presente",
      "price": "Preço aproximado",
      "reason": "Por que combina com a pessoa",
      "description": "Breve descrição do presente",
      "personalization": "Como o presente pode ser personalizado ou apresentado"
    }
  ]
}`;

type ExpoExtra = {
  geminiApiKey?: string;
};

/**
 * Lê a chave GEMINI_API_KEY do arquivo `.env` (via app.config.ts).
 *
 * Para testar o app em outra máquina, crie um `.env` na raiz com:
 * GEMINI_API_KEY=sua_chave_do_google_ai_studio
 *
 * A chave é obtida em https://aistudio.google.com/apikey
 * e nunca deve aparecer no código nem no GitHub.
 */
function getGeminiApiKey(): string {
  const extra = Constants.expoConfig?.extra as ExpoExtra | undefined;
  const apiKey = extra?.geminiApiKey?.trim();

  if (!apiKey) {
    throw new GiftGenerationError(
      'O serviço de IA ainda não está configurado. Adicione sua chave do Google AI Studio no arquivo .env e reinicie o app.',
    );
  }

  return apiKey;
}

export class GiftGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GiftGenerationError';
  }
}

function buildUserPrompt(form: GiftFormData): string {
  return [
    'Recomende 3 presentes para esta pessoa:',
    `Relacionamento: ${form.relationship}`,
    `Idade: ${form.age}`,
    `Ocasião: ${form.occasion}`,
    `Interesses: ${form.interests}`,
    `Orçamento: ${form.budget}`,
    `Estilo do presente: ${form.giftStyle}`,
  ].join('\n');
}

function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    throw new GiftGenerationError(GENERIC_ERROR);
  }

  try {
    return JSON.parse(candidate.slice(start, end + 1)) as unknown;
  } catch {
    throw new GiftGenerationError(GENERIC_ERROR);
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isGiftSuggestion(value: unknown): value is GiftSuggestion {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    isNonEmptyString(item.name) &&
    isNonEmptyString(item.price) &&
    isNonEmptyString(item.reason) &&
    isNonEmptyString(item.description) &&
    isNonEmptyString(item.personalization)
  );
}

function parseGiftResponse(text: string): GiftSuggestion[] {
  const parsed = extractJsonObject(text);

  if (typeof parsed !== 'object' || parsed === null || !('gifts' in parsed)) {
    throw new GiftGenerationError(GENERIC_ERROR);
  }

  const { gifts } = parsed as GiftAiResponse;

  if (!Array.isArray(gifts) || gifts.length < 3) {
    throw new GiftGenerationError(GENERIC_ERROR);
  }

  const validGifts = gifts.filter(isGiftSuggestion).slice(0, 3);

  if (validGifts.length < 3) {
    throw new GiftGenerationError(GENERIC_ERROR);
  }

  return validGifts;
}

function getErrorStatusCode(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    return error.statusCode;
  }

  if ('status' in error && typeof error.status === 'number') {
    return error.status;
  }

  return undefined;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function toUserFacingError(error: unknown): GiftGenerationError {
  if (error instanceof GiftGenerationError) {
    return error;
  }

  const statusCode = getErrorStatusCode(error);
  const message = getErrorMessage(error);

  if (
    statusCode === 429 ||
    /429|resource_exhausted|rate limit|quota/i.test(message)
  ) {
    return new GiftGenerationError(RATE_LIMIT_ERROR);
  }

  return new GiftGenerationError(GENERIC_ERROR);
}

/**
 * Sends the form data to Gemini and returns exactly 3 gift suggestions.
 */
export async function generateGiftSuggestions(
  form: GiftFormData,
): Promise<GiftSuggestion[]> {
  const google = createGoogleGenerativeAI({
    apiKey: getGeminiApiKey(),
  });

  try {
    const { text } = await generateText({
      model: google(GEMINI_MODEL),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(form),
      temperature: 0.7,
      maxRetries: 0,
    });

    return parseGiftResponse(text);
  } catch (error) {
    throw toUserFacingError(error);
  }
}
