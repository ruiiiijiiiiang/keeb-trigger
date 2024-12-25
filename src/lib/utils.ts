import type { KeyPress, KeyType, StatsMode } from "./types.ts";
import {
  ACCURACY_THRESHOLD_MAP,
  DURATION_THRESHOLD_MAP,
  GAP_THRESHOLD_MAP,
  KEYTYPE_COLOR_MAP,
  SCALED_COLOR_MAP,
} from "./const.ts";

const sumByStatsMode = (
  keyPresses: KeyPress[],
  // Thanks claude, I'll never understand this
  field: Extract<
    keyof KeyPress,
    {
      [K in keyof KeyPress]: KeyPress[K] extends number ? K : never;
    }[keyof KeyPress]
  >,
): number => {
  return keyPresses.reduce(
    (sum: number, keyPress: KeyPress) => sum + keyPress[field],
    0,
  );
};

const computeSingleStats = (
  keyPress: KeyPress,
  statsMode: StatsMode,
): number => {
  if (!keyPress.count) {
    return 0;
  }
  switch (statsMode) {
    case "count":
      return keyPress.count;
    case "duration":
      return keyPress.totalDuration / keyPress.count;
    case "gap":
      return keyPress.totalGap / keyPress.count;
    case "accuracy":
      return keyPress.correctCount /
        (keyPress.correctCount + keyPress.falsePositiveCount);
    default:
      return 0;
  }
};

const computeGroupedStats = (
  groupedKeyPresses: KeyPress[],
  statsMode: StatsMode,
): number => {
  const totalCount = sumByStatsMode(groupedKeyPresses, "count");
  if (totalCount === 0) {
    return 0;
  }
  switch (statsMode) {
    case "count": {
      return totalCount;
    }
    case "duration": {
      const totalDuration = sumByStatsMode(groupedKeyPresses, "totalDuration");
      return totalDuration / totalCount;
    }
    case "gap": {
      const totalGap = sumByStatsMode(groupedKeyPresses, "totalGap");
      return totalGap / totalCount;
    }
    case "accuracy": {
      const totalCorrect = sumByStatsMode(groupedKeyPresses, "correctCount");
      const totalFalsePositive = sumByStatsMode(
        groupedKeyPresses,
        "falsePositiveCount",
      );
      return totalCorrect / (totalCorrect + totalFalsePositive);
    }
    default:
      return 0;
  }
};

const renderStats = (stats: number, statsMode: StatsMode): string => {
  switch (statsMode) {
    case "count":
      return stats.toString();
    case "duration":
    case "gap":
      return `${Math.round(stats)} ms`;
    case "accuracy":
      return `${(stats * 100).toFixed(0)}%`;
    default:
      return "";
  }
};

const renderSingleStats = (
  keyPress: KeyPress,
  statsMode: StatsMode,
): string => {
  const stats = computeSingleStats(keyPress, statsMode);
  return renderStats(stats, statsMode);
};

const renderGroupedStats = (
  groupedKeyPresses: KeyPress[],
  statsMode: StatsMode,
): string => {
  const stats = computeGroupedStats(groupedKeyPresses, statsMode);
  return renderStats(stats, statsMode);
};

const computeBackground = (
  stats: number,
  statsMode: StatsMode,
): string => {
  switch (statsMode) {
    case "duration":
      for (let i = 0; i < DURATION_THRESHOLD_MAP.length; i++) {
        if (stats < DURATION_THRESHOLD_MAP[i]) {
          return SCALED_COLOR_MAP[i];
        }
      }
      return "";
    case "gap":
      for (let i = 0; i < GAP_THRESHOLD_MAP.length; i++) {
        if (stats < GAP_THRESHOLD_MAP[i]) {
          return SCALED_COLOR_MAP[i];
        }
      }
      return "";
    case "accuracy":
      for (let i = 0; i < ACCURACY_THRESHOLD_MAP.length; i++) {
        if (stats > ACCURACY_THRESHOLD_MAP[i]) {
          return SCALED_COLOR_MAP[i];
        }
      }
      break;
    default:
      return "";
  }
  return "";
};

const computeSingleBackground = (
  keyPress: KeyPress,
  statsMode: StatsMode,
  keyType: KeyType,
) => {
  const stats = computeSingleStats(keyPress, statsMode);
  const background = computeBackground(stats, statsMode);
  return background || `--color-${KEYTYPE_COLOR_MAP[keyType]}-300`;
};

const computeGroupedBackground = (
  groupedKeyPresses: KeyPress[],
  statsMode: StatsMode,
): string => {
  const stats = computeGroupedStats(groupedKeyPresses, statsMode);
  const background = computeBackground(stats, statsMode);
  return background || "--color-primary-300";
};

export {
  computeGroupedBackground,
  computeSingleBackground,
  renderGroupedStats,
  renderSingleStats,
};
