Quero que você implemente COMPLETAMENTE o trabalho final desta disciplina neste projeto React Native que já foi criado.

IMPORTANTE:

- Este projeto já existe e se chama `gift-finder`.
- NÃO crie outro projeto.
- Trabalhe diretamente na estrutura atual.
- Primeiro analise os arquivos existentes e entenda a estrutura antes de modificar qualquer coisa.
- Depois faça toda a implementação necessária.
- Quero o projeto funcionando de verdade, não apenas exemplos de código.
- Ao terminar, verifique erros de TypeScript, imports, dependências e configuração.
- Se encontrar algum problema, corrija antes de finalizar.

==================================================

1. # OBJETIVO DO TRABALHO

O trabalho final consiste em desenvolver individualmente um aplicativo em React Native que utilize uma integração com Inteligência Artificial para gerar respostas criativas, personalizadas ou úteis com base em uma entrada fornecida pelo usuário.

O princípio obrigatório é:

ENTRADA DO USUÁRIO
↓
PROCESSAMENTO POR IA
↓
RESPOSTA PERSONALIZADA GERADA PELA IA

O aplicativo também será avaliado por:

- Criatividade da ideia;
- Implementação técnica;
- Funcionamento da integração com IA;
- Organização do código;
- Usabilidade;
- Interface funcional e intuitiva;
- Código comentado e organizado.

# ================================================== 2. IDEIA DO APLICATIVO

O aplicativo será chamado:

Gift Finder

Objetivo:

Criar um aplicativo que ajude o usuário a encontrar o presente ideal para uma pessoa específica utilizando Inteligência Artificial.

O usuário fornecerá informações sobre a pessoa que receberá o presente, como:

- relacionamento;
- idade;
- ocasião;
- interesses;
- orçamento;
- estilo de presente.

A Inteligência Artificial deverá analisar essas informações e gerar 3 sugestões de presentes personalizadas.

A ideia principal NÃO é simplesmente gerar uma lista genérica.

As sugestões precisam levar em consideração as informações fornecidas pelo usuário.

Exemplo:

Se o usuário informar:

Relationship: Mother
Age: 45
Occasion: Birthday
Interests: Books, coffee and gardening
Budget: $50–$100
Gift Style: Personalized

A IA deverá sugerir presentes coerentes com esse perfil e explicar por que cada sugestão combina com a pessoa.

# ================================================== 3. TECNOLOGIAS OBRIGATÓRIAS

Utilize:

- React Native
- Expo
- TypeScript
- Expo Router
- React Hooks
- useState
- StyleSheet
- Componentização
- Vercel AI SDK
- pacote `ai`
- pacote `@ai-sdk/google`
- Gemini através do Google AI Studio
- `generateText()`

NÃO utilize OpenAI.

Quero seguir a abordagem ensinada durante as aulas da disciplina, especialmente:

`generateText()` + `@ai-sdk/google` + Gemini.

Não transforme o projeto em uma arquitetura complexa.

Não adicione:

- Firebase;
- banco de dados;
- autenticação;
- login;
- backend complexo;
- pagamentos;
- funcionalidades que não sejam necessárias para o trabalho.

O objetivo é demonstrar claramente:

React Native → entrada do usuário → IA → resultado personalizado.

# ================================================== 4. API KEY DO GOOGLE AI STUDIO

Configure o projeto para utilizar uma chave do Google AI Studio através de variável de ambiente.

Crie na raiz do projeto:

.env

Com:

GEMINI_API_KEY=

Eu vou colocar minha chave do Google AI Studio diretamente nesse arquivo.

NÃO invente uma chave.

NÃO coloque nenhuma chave diretamente no código.

Também crie:

.env.example

Com:

GEMINI_API_KEY=

E configure o `.gitignore` para garantir que `.env` nunca seja enviado para o GitHub.

A chave nunca deve:

- aparecer em arquivos `.tsx`;
- aparecer em arquivos `.ts`;
- aparecer em componentes;
- aparecer na interface;
- aparecer em mensagens de erro;
- ser commitada no GitHub.

Crie toda a configuração necessária para que a aplicação utilize corretamente essa variável.

# ================================================== 5. ESTRUTURA DO PROJETO

Organize o código de forma clara e profissional.

Utilize uma estrutura semelhante a:

app/
\_layout.tsx
index.tsx

components/
GiftForm.tsx
GiftCard.tsx
LoadingState.tsx

services/
generator.ts

types/
gift.ts

constants/
colors.ts

Adapte essa estrutura à estrutura atual do Expo Router caso necessário.

Não crie arquivos desnecessários.

Não coloque toda a aplicação dentro de `index.tsx`.

Quero demonstrar componentização e organização.

# ================================================== 6. TELA PRINCIPAL

Crie uma interface moderna, bonita, limpa e intuitiva.

A primeira tela deve deixar muito claro:

- o nome do aplicativo;
- o que ele faz;
- o que o usuário precisa informar;
- como gerar as sugestões;
- onde aparecerão os resultados.

Utilize como título:

Gift Finder

E como subtítulo:

Find the perfect gift

Texto de apoio:

"Tell us a little about the person and we'll find thoughtful gift ideas for them."

A interface deve ter aparência de um pequeno aplicativo real, mas sem exagerar na complexidade.

# ================================================== 7. FORMULÁRIO

Crie um formulário intuitivo com os seguintes dados:

---

## Relationship

Permita selecionar:

- Friend
- Mother
- Father
- Brother
- Sister
- Partner
- Coworker
- Other

Não precisa necessariamente utilizar um dropdown tradicional.

Pode utilizar chips, cards ou botões de seleção para deixar a interface mais agradável.

---

## Age

Campo para informar a idade aproximada da pessoa.

Utilize um input adequado.

---

## Occasion

Permita selecionar:

- Birthday
- Christmas
- Graduation
- Anniversary
- Valentine's Day
- Thank You
- Other

---

## Interests

Campo de texto.

Placeholder:

"Books, photography, coffee..."

Explique visualmente que o usuário pode colocar vários interesses.

---

## Budget

Permita selecionar:

- Up to $20
- $20–$50
- $50–$100
- $100+

---

## Gift Style

Permita selecionar:

- Useful
- Creative
- Personalized
- Fun
- Elegant
- Tech

---

O formulário deve ser agradável de preencher.

Evite aparência de formulário burocrático.

Utilize espaçamento, hierarquia visual e componentes de seleção apropriados.

# ================================================== 8. VALIDAÇÃO

Antes de chamar a IA, valide os campos principais.

Os campos essenciais devem ser:

- Relationship;
- Age;
- Occasion;
- Interests;
- Budget;
- Gift Style.

Se algum campo estiver vazio:

- não faça a chamada para a IA;
- mostre uma mensagem amigável;
- indique o que precisa ser preenchido.

Não mostre erros técnicos para o usuário.

# ================================================== 9. BOTÃO PRINCIPAL

Crie um botão principal com um texto como:

Find Gifts

O botão deve ser visualmente destacado.

Enquanto a IA estiver processando:

- desabilite o botão;
- impeça múltiplos envios;
- mostre um loading;
- informe ao usuário que as sugestões estão sendo geradas.

Por exemplo:

"Finding the perfect gifts..."

# ================================================== 10. INTEGRAÇÃO COM GEMINI

Crie:

services/generator.ts

Esse arquivo será responsável pela comunicação com a Inteligência Artificial.

Utilize:

- `generateText`
- `@ai-sdk/google`

Leia a chave através da variável de ambiente configurada.

A IA deve receber todos os dados preenchidos pelo usuário.

Crie um prompt de sistema/instrução bem elaborado.

A IA deve atuar como um especialista em sugestões de presentes.

Ela deve analisar:

- relacionamento;
- idade;
- ocasião;
- interesses;
- orçamento;
- estilo de presente.

Peça para gerar EXATAMENTE 3 sugestões.

Cada sugestão deve possuir:

- `name`
- `price`
- `reason`
- `description`
- `personalization`

Exemplo de estrutura:

{
"gifts": [
{
"name": "Nome do presente",
"price": "Faixa de preço",
"reason": "Por que combina com a pessoa",
"description": "Breve descrição",
"personalization": "Como o presente pode ser personalizado"
}
]
}

A resposta deve ser previsível e fácil de transformar em componentes React Native.

Faça tratamento de erro caso a resposta da IA não venha no formato esperado.

Não mostre JSON bruto na interface.

# ================================================== 11. PROMPT DA INTELIGÊNCIA ARTIFICIAL

Crie uma instrução para o Gemini semelhante ao conceito abaixo, mas melhore conforme necessário:

"You are an expert gift recommendation assistant.

Your task is to recommend thoughtful and personalized gifts based on the user's information.

Consider the person's relationship with the user, age, occasion, interests, budget and preferred gift style.

Do not provide generic suggestions.

Return exactly 3 gift recommendations.

Each recommendation must contain:

- name
- price
- reason
- description
- personalization

The recommendations must respect the user's budget and should be realistic.

Return the result in a structured JSON format."

Adapte o prompt para obter respostas de boa qualidade.

# ================================================== 12. RESULTADOS

Depois que a IA responder, mostre os 3 presentes em cards separados.

Crie um componente:

GiftCard.tsx

Cada card deve mostrar:

🎁 Nome do presente

Preço aproximado

Why it fits

Descrição

Personalization

Os cards devem ser fáceis de ler.

Não mostre a resposta como texto gigante.

Não mostre JSON.

Organize visualmente cada sugestão.

# ================================================== 13. LOADING

Crie um componente:

LoadingState.tsx

Durante a chamada:

- mostre um indicador de carregamento;
- mostre uma mensagem amigável;
- desabilite o botão.

Mensagem:

"Finding the perfect gifts..."

Pode utilizar uma animação simples caso seja realmente útil.

Não instale uma biblioteca de animação apenas por estética se não for necessária.

# ================================================== 14. ERROS

Implemente tratamento de erros.

Caso a chamada da IA falhe:

Mostre algo como:

"Something went wrong. Please try again."

Também permita que o usuário tente novamente.

Não mostre:

- stack trace;
- API key;
- mensagens internas;
- erros técnicos desnecessários.

# ================================================== 15. NOVA PESQUISA

Depois de mostrar os resultados, permita que o usuário possa voltar ao formulário e gerar novas sugestões.

Pode utilizar um botão:

"Find New Gifts"

Esse botão deve limpar ou permitir editar os dados e fazer uma nova chamada.

# ================================================== 16. DESIGN / UX

Quero uma interface realmente agradável.

Características:

- moderna;
- limpa;
- intuitiva;
- boa hierarquia visual;
- espaçamento consistente;
- bordas e cards bem definidos;
- botão principal destacado;
- campos fáceis de preencher;
- resultados fáceis de entender;
- boa experiência em telas pequenas.

Utilize uma identidade visual relacionada ao conceito de presentes.

Pode utilizar ícones do Expo Vector Icons / Ionicons se isso já estiver disponível ou se for simples adicionar.

Não exagere.

O aplicativo deve parecer profissional, mas continuar sendo claramente um projeto acadêmico desenvolvido em React Native.

Use `ScrollView` para garantir que o conteúdo funcione em telas pequenas.

Evite elementos que possam ficar cortados.

# ================================================== 17. RESPONSIVIDADE

O aplicativo deve funcionar corretamente em:

- iOS;
- Android;
- Web, quando compatível com os componentes utilizados.

Como o projeto foi criado com Expo, mantenha a compatibilidade com a estrutura existente.

Não utilize componentes exclusivamente nativos de uma plataforma sem necessidade.

# ================================================== 18. COMPONENTIZAÇÃO

Crie componentes reutilizáveis.

Por exemplo:

GiftForm
GiftCard
LoadingState

Utilize:

- props;
- interfaces;
- types;
- TypeScript.

Crie tipos para:

- dados do formulário;
- sugestão de presente;
- resposta da IA.

Evite usar `any`.

Se algum ponto realmente precisar de tratamento dinâmico, faça isso de maneira segura.

# ================================================== 19. CÓDIGO ORGANIZADO

O código deve:

- utilizar TypeScript;
- ter nomes descritivos;
- ser fácil de entender;
- ser componentizado;
- evitar repetição;
- separar UI de lógica;
- separar integração com IA da interface.

Utilize comentários apenas quando forem úteis para explicar uma decisão ou lógica importante.

Não coloque comentários óbvios como:

// cria uma variável

Quando fizer sentido, utilize JSDoc nas funções ou componentes principais.

# ================================================== 20. ESTADO DA APLICAÇÃO

Utilize React Hooks, especialmente `useState`, para controlar:

- dados do formulário;
- loading;
- resultados;
- erros.

O fluxo deve funcionar assim:

1. Usuário abre o aplicativo.
2. Preenche o formulário.
3. Clica em "Find Gifts".
4. Aplicação valida os dados.
5. Aplicação mostra loading.
6. Aplicação envia os dados para o Gemini.
7. Gemini gera 3 sugestões.
8. Aplicação recebe a resposta.
9. Aplicação interpreta a resposta.
10. Aplicação mostra os 3 GiftCards.
11. Usuário pode gerar novas sugestões.

# ================================================== 21. ARQUITETURA

Não quero uma arquitetura exageradamente complexa.

Quero algo que um aluno de React Native que acabou de concluir a disciplina consiga explicar para o professor.

O professor deve conseguir entender facilmente:

- onde está a tela;
- onde estão os componentes;
- onde está a chamada para a IA;
- onde está a API key;
- onde estão os tipos;
- como os dados passam do formulário para a IA;
- como a resposta da IA chega aos cards.

# ================================================== 22. DEPENDÊNCIAS

Verifique o `package.json`.

Instale/configure somente o que for necessário.

Principalmente:

`ai`

`@ai-sdk/google`

Não adicione bibliotecas desnecessárias.

Se uma biblioteca já existente no projeto puder ser utilizada, prefira reutilizá-la.

# ================================================== 23. SEGURANÇA DA API KEY

É extremamente importante:

`.env` deve estar no `.gitignore`.

`.env.example` deve existir.

A chave real nunca deve ser commitada.

Nunca coloque:

const apiKey = "..."

ou:

const apiKey = "AIza..."

ou qualquer chave diretamente no código.

Utilize variável de ambiente.

Eu vou colocar minha chave real no `.env`.

# ================================================== 24. GITHUB

Prepare o projeto para ser enviado ao GitHub.

Garanta que:

- `.env` esteja no `.gitignore`;
- `.env.example` esteja no projeto;
- não existam secrets no código;
- não existam arquivos desnecessários;
- o código esteja organizado.

Não faça commit automaticamente.

# ================================================== 25. VERIFICAÇÃO FINAL

Depois de implementar tudo:

1. Verifique todos os arquivos criados.
2. Verifique todos os imports.
3. Verifique TypeScript.
4. Verifique o Expo Router.
5. Verifique os componentes.
6. Verifique o formulário.
7. Verifique a validação.
8. Verifique o loading.
9. Verifique o tratamento de erros.
10. Verifique a integração com Gemini.
11. Verifique a leitura da `GEMINI_API_KEY`.
12. Verifique `.env`.
13. Verifique `.env.example`.
14. Verifique `.gitignore`.
15. Corrija qualquer erro encontrado.

Se possível, execute uma verificação de TypeScript/lint e corrija os problemas encontrados.

# ================================================== 26. COMANDOS

O projeto deve continuar podendo ser iniciado com:

npm install

e:

npx expo start

# ================================================== 27. IMPORTANTE

Não quero que você apenas me explique como fazer.

QUERO QUE VOCÊ IMPLEMENTE.

Analise o projeto atual e faça todas as alterações necessárias.

Se precisar instalar dependências, faça isso.

Se precisar criar arquivos, crie.

Se precisar modificar arquivos existentes, modifique.

Se alguma implementação inicialmente escolhida não funcionar corretamente com a versão atual do Expo/React Native do projeto, adapte para uma solução compatível sem abandonar a ideia principal.

Não substitua Gemini por OpenAI.

Não crie backend complexo.

Mantenha a solução alinhada ao conteúdo aprendido na disciplina.

# ================================================== 28. RESULTADO ESPERADO

No final quero ter um aplicativo funcional chamado:

Gift Finder

Com o seguinte fluxo:

┌─────────────────────────────┐
│ GIFT FINDER │
│ │
│ Find the perfect gift │
│ │
│ Relationship │
│ [ Mother ] [ Friend ] ... │
│ │
│ Age │
│ [ 45 ] │
│ │
│ Occasion │
│ [ Birthday ] │
│ │
│ Interests │
│ [ Books, coffee, garden ] │
│ │
│ Budget │
│ [ $50–$100 ] │
│ │
│ Gift Style │
│ [ Personalized ] │
│ │
│ [ 🎁 Find Gifts ] │
└─────────────────────────────┘

Depois da chamada:

┌─────────────────────────────┐
│ YOUR GIFT IDEAS │
│ │
│ 🎁 Gift suggestion 1 │
│ Price: $... │
│ Why it fits: ... │
│ Description: ... │
│ Personalization: ... │
│ │
│ 🎁 Gift suggestion 2 │
│ Price: $... │
│ Why it fits: ... │
│ Description: ... │
│ Personalization: ... │
│ │
│ 🎁 Gift suggestion 3 │
│ Price: $... │
│ Why it fits: ... │
│ Description: ... │
│ Personalization: ... │
│ │
│ [ Find New Gifts ] │
└─────────────────────────────┘

O mais importante é que fique evidente para o professor que existe:

ENTRADA DO USUÁRIO
→ GEMINI
→ RESPOSTA PERSONALIZADA

No final, me informe de forma objetiva:

1. Quais arquivos você criou;
2. Quais arquivos você modificou;
3. Onde está o `.env`;
4. Onde devo colocar minha chave do Google AI Studio;
5. Quais dependências foram instaladas;
6. Como iniciar o projeto;
7. Como testar a geração de presentes com IA;
8. Se existe algum ponto que eu preciso configurar manualmente.

NÃO peça para eu enviar minha API key no chat.
