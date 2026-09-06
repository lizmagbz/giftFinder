import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { GiftSuggestion } from '@/types/gift';

interface GiftCardProps {
  gift: GiftSuggestion;
  index: number;
}

/**
 * Displays one AI-generated gift suggestion in a readable card.
 */
export function GiftCard({ gift, index }: GiftCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{gift.name}</Text>
          <Text style={styles.price}>{gift.price}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Por que combina</Text>
        <Text style={styles.sectionText}>{gift.reason}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Descrição</Text>
        <Text style={styles.sectionText}>{gift.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Personalização</Text>
        <Text style={styles.sectionText}>{gift.personalization}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  section: {
    gap: 3,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
});
