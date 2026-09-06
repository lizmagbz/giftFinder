export const RELATIONSHIP_OPTIONS = [
  'Amigo(a)',
  'Mãe',
  'Pai',
  'Irmão',
  'Irmã',
  'Parceiro(a)',
  'Colega de trabalho',
  'Outro',
] as const;

export const OCCASION_OPTIONS = [
  'Aniversário',
  'Natal',
  'Formatura',
  'Aniversário de relacionamento',
  'Dia dos Namorados',
  'Agradecimento',
  'Outro',
] as const;

export const BUDGET_OPTIONS = [
  'Até R$ 50',
  'R$ 50–R$ 150',
  'R$ 150–R$ 300',
  'Acima de R$ 300',
] as const;

export const GIFT_STYLE_OPTIONS = [
  'Útil',
  'Criativo',
  'Personalizado',
  'Divertido',
  'Elegante',
  'Tecnologia',
] as const;

export type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];
export type Occasion = (typeof OCCASION_OPTIONS)[number];
export type Budget = (typeof BUDGET_OPTIONS)[number];
export type GiftStyle = (typeof GIFT_STYLE_OPTIONS)[number];

export interface GiftFormData {
  relationship: Relationship | '';
  age: string;
  occasion: Occasion | '';
  interests: string;
  budget: Budget | '';
  giftStyle: GiftStyle | '';
}

export interface GiftSuggestion {
  name: string;
  price: string;
  reason: string;
  description: string;
  personalization: string;
}

export interface GiftAiResponse {
  gifts: GiftSuggestion[];
}

export const EMPTY_GIFT_FORM: GiftFormData = {
  relationship: '',
  age: '',
  occasion: '',
  interests: '',
  budget: '',
  giftStyle: '',
};
