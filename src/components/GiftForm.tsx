import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/constants/colors';
import {
  BUDGET_OPTIONS,
  GIFT_STYLE_OPTIONS,
  GiftFormData,
  OCCASION_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from '@/types/gift';

interface GiftFormProps {
  values: GiftFormData;
  onChange: (values: GiftFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  validationMessage: string | null;
}

interface ChipGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T | '';
  onChange: (value: T) => void;
  disabled: boolean;
}

/**
 * Returns a friendly message when required fields are missing or invalid.
 */
export function getGiftFormValidationMessage(form: GiftFormData): string | null {
  const missing: string[] = [];

  if (!form.relationship) missing.push('Relacionamento');
  if (!form.age.trim()) missing.push('Idade');
  if (!form.occasion) missing.push('Ocasião');
  if (!form.interests.trim()) missing.push('Interesses');
  if (!form.budget) missing.push('Orçamento');
  if (!form.giftStyle) missing.push('Estilo do presente');

  if (missing.length > 0) {
    return `Preencha: ${missing.join(', ')}.`;
  }

  const age = Number.parseInt(form.age.trim(), 10);
  if (!Number.isInteger(age) || age < 1 || age > 120) {
    return 'Informe uma idade realista entre 1 e 120.';
  }

  return null;
}

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  disabled,
}: ChipGroupProps<T>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((option) => {
          const selected = option === value;

          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onChange(option)}
              style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
              ]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Gift profile form with chip selectors and text fields.
 */
export function GiftForm({
  values,
  onChange,
  onSubmit,
  isLoading,
  validationMessage,
}: GiftFormProps) {
  const update = <K extends keyof GiftFormData>(key: K, value: GiftFormData[K]) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <View style={styles.form}>
      <ChipGroup
        label="Relacionamento"
        options={RELATIONSHIP_OPTIONS}
        value={values.relationship}
        onChange={(relationship) => update('relationship', relationship)}
        disabled={isLoading}
      />

      <View style={styles.field}>
        <Text style={styles.label}>Idade</Text>
        <Text style={styles.hint}>A idade aproximada já é o suficiente.</Text>
        <TextInput
          value={values.age}
          onChangeText={(age) => update('age', age)}
          placeholder="45"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          maxLength={3}
          editable={!isLoading}
          style={[styles.input, styles.ageInput]}
        />
      </View>

      <ChipGroup
        label="Ocasião"
        options={OCCASION_OPTIONS}
        value={values.occasion}
        onChange={(occasion) => update('occasion', occasion)}
        disabled={isLoading}
      />

      <View style={styles.field}>
        <Text style={styles.label}>Interesses</Text>
        <Text style={styles.hint}>Liste vários interesses, separados por vírgula.</Text>
        <TextInput
          value={values.interests}
          onChangeText={(interests) => update('interests', interests)}
          placeholder="Livros, fotografia, café..."
          placeholderTextColor={colors.textSecondary}
          multiline
          editable={!isLoading}
          style={[styles.input, styles.multiline]}
        />
      </View>

      <ChipGroup
        label="Orçamento"
        options={BUDGET_OPTIONS}
        value={values.budget}
        onChange={(budget) => update('budget', budget)}
        disabled={isLoading}
      />

      <ChipGroup
        label="Estilo do presente"
        options={GIFT_STYLE_OPTIONS}
        value={values.giftStyle}
        onChange={(giftStyle) => update('giftStyle', giftStyle)}
        disabled={isLoading}
      />

      {validationMessage ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{validationMessage}</Text>
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={isLoading}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.submitButton,
          pressed && !isLoading && styles.pressed,
          isLoading && styles.submitDisabled,
        ]}>
        <Text style={styles.submitText}>
          {isLoading ? 'Buscando presentes...' : 'Encontrar presentes'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.text,
  },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.surfaceMuted,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  ageInput: {
    width: 92,
  },
  multiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  messageBox: {
    backgroundColor: colors.errorSoft,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageText: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 2,
  },
  submitDisabled: {
    opacity: 0.65,
  },
  submitText: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.55,
  },
});
