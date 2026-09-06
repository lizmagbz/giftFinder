import { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * A chave do Google AI Studio deve ser colocada no arquivo `.env` na raiz
 * do projeto, na variável GEMINI_API_KEY.
 *
 * Quem baixar o projeto (incluindo o professor) precisa:
 * 1. copiar `.env.example` para `.env`
 * 2. colar a própria chave do Google AI Studio
 * 3. reiniciar com `npx expo start`
 *
 * A chave nunca deve ser commitada. Este config só lê a variável de ambiente.
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'Gift Finder',
  slug: config.slug ?? 'gift-finder',
  extra: {
    ...config.extra,
    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  },
});
