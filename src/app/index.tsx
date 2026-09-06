import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GiftCard } from '@/components/GiftCard';
import { GiftForm, getGiftFormValidationMessage } from '@/components/GiftForm';
import { LoadingState } from '@/components/LoadingState';
import { colors } from '@/constants/colors';
import { GiftGenerationError, generateGiftSuggestions } from '@/services/generator';
import { EMPTY_GIFT_FORM, GiftFormData, GiftSuggestion } from '@/types/gift';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const [form, setForm] = useState<GiftFormData>(EMPTY_GIFT_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [gifts, setGifts] = useState<GiftSuggestion[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const showResults = gifts !== null && gifts.length > 0;
  const isWide = width >= 720;

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleFindGifts = async () => {
    if (isLoading) {
      return;
    }

    const message = getGiftFormValidationMessage(form);
    if (message) {
      setValidationMessage(message);
      setErrorMessage(null);
      return;
    }

    setValidationMessage(null);
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const suggestions = await generateGiftSuggestions(form);
      setGifts(suggestions);
      scrollToTop();
    } catch (error) {
      const friendlyMessage =
        error instanceof GiftGenerationError
          ? error.message
          : 'Algo deu errado. Tente novamente.';
      setErrorMessage(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindNewGifts = () => {
    setGifts(null);
    setErrorMessage(null);
    setValidationMessage(null);
    scrollToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={[
            styles.page,
            {
              paddingHorizontal: isWide ? 32 : 16,
              paddingVertical: isWide ? 36 : 16,
              justifyContent: isWide ? 'center' : 'flex-start',
            },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={[styles.sheet, isWide && styles.sheetWide]}>
            <View style={styles.ribbon} />

            {showResults ? (
              <View style={styles.sheetBody}>
                <View style={styles.hero}>
                  <View style={styles.iconMark}>
                    <Text style={styles.iconMarkText}>🎁</Text>
                  </View>
                  <Text style={styles.kicker}>Gift Finder</Text>
                  <Text style={styles.title}>Suas ideias de presente</Text>
                  <Text style={styles.subtitle}>
                    Três sugestões pensadas na pessoa que você descreveu.
                  </Text>
                </View>

                <View style={styles.cards}>
                  {gifts.map((gift, index) => (
                    <GiftCard key={`${gift.name}-${index}`} gift={gift} index={index} />
                  ))}
                </View>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleFindNewGifts}
                  style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
                  <Text style={styles.secondaryButtonText}>Buscar novos presentes</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.sheetBody}>
                <View style={styles.hero}>
                  <View style={styles.iconMark}>
                    <Text style={styles.iconMarkText}>🎁</Text>
                  </View>
                  <Text style={styles.kicker}>Ideias de presente com IA</Text>
                  <Text style={styles.title}>Gift Finder</Text>
                  <Text style={styles.tagline}>Encontre o presente perfeito</Text>
                  <Text style={styles.subtitle}>
                    Conte um pouco sobre a pessoa e vamos encontrar ideias pensadas para ela.
                  </Text>
                </View>

                <GiftForm
                  values={form}
                  onChange={setForm}
                  onSubmit={handleFindGifts}
                  isLoading={isLoading}
                  validationMessage={validationMessage}
                />

                {isLoading ? <LoadingState /> : null}

                {errorMessage ? (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  page: {
    flexGrow: 1,
    alignItems: 'center',
  },
  sheet: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.12,
        shadowRadius: 28,
      },
      android: {
        elevation: 8,
      },
      default: {
        boxShadow: '0 22px 50px rgba(58, 46, 39, 0.14)',
      },
    }),
  },
  sheetWide: {
    maxWidth: 440,
  },
  ribbon: {
    height: 6,
    backgroundColor: colors.primary,
  },
  sheetBody: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    gap: 18,
  },
  hero: {
    alignItems: 'center',
    gap: 6,
    paddingBottom: 4,
  },
  iconMark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconMarkText: {
    fontSize: 22,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.gold,
  },
  title: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 340,
  },
  cards: {
    gap: 12,
  },
  errorBox: {
    backgroundColor: colors.errorSoft,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
});
