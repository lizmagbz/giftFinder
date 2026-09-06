# Gift Finder

Aplicativo em React Native (Expo) que sugere presentes personalizados com Gemini.

O fluxo é:

**entrada do usuário → Gemini → 3 sugestões personalizadas**

## Como começar

1. Instale as dependências:

```bash
npm install
```

2. Copie o arquivo de exemplo e coloque sua chave do [Google AI Studio](https://aistudio.google.com/apikey):

```bash
cp .env.example .env
```

Edite `.env` e preencha:

```
GEMINI_API_KEY=sua_chave_aqui
```

3. Inicie o projeto:

```bash
npx expo start
```

Depois de salvar a chave, reinicie o Expo (`npx expo start`) para a configuração ser lida.

## Como testar

1. Preencha relacionamento, idade, ocasião, interesses, orçamento e estilo.
2. Toque em **Encontrar presentes**.
3. Confira os 3 cards gerados pela IA.
4. Toque em **Buscar novos presentes** para ajustar os dados e gerar de novo.

## Estrutura

- `src/app/index.tsx` — tela principal
- `src/components/` — formulário, cards e loading
- `src/services/generator.ts` — chamada ao Gemini com `generateText()`
- `src/types/gift.ts` — tipos do formulário e da resposta
- `.env` — chave do Google AI Studio (não é enviada ao GitHub)
