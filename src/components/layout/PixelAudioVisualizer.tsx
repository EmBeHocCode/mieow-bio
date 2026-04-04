import { memo, useEffect, useRef } from 'react';

type PixelAudioVisualizerProps = {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  enabled: boolean;
  phase: 'idle' | 'transition' | 'paused' | 'playing';
  className?: string;
};

type BandKey = 'bass' | 'lowMid' | 'mid' | 'high';
type BandLevels = Record<BandKey, number>;
type NormalizationState = BandLevels & { mix: number; transient: number };
type RecordAnimationState = { rotation: number; pulse: number };
type IdleRenderResult = { levels: number[]; bassPulse: number; recordDrive: number };
type BackgroundCellTone = 'pink' | 'violet' | 'white' | 'cyan' | 'amber';
type BackgroundCell = {
  col: number;
  row: number;
  widthUnits: number;
  heightUnits: number;
  life: number;
  decay: number;
  peak: number;
  tone: BackgroundCellTone;
  seed: number;
};
type BackgroundMatrixState = { cells: BackgroundCell[]; frame: number };
type VisualizerConfig = {
  compactBreakpoint: number;
  blockSizeCompact: number;
  blockSizeRegular: number;
  blockGap: number;
  sidePaddingCompact: number;
  sidePaddingRegular: number;
  centerGapCompact: number;
  centerGapRegular: number;
  minHalfColumns: number;
  maxHalfColumns: number;
  topHeadroomCompact: number;
  topHeadroomRegular: number;
  baselineYOffsetCompact: number;
  baselineYOffsetRegular: number;
  maxFloorLiftRowsCompact: number;
  maxFloorLiftRowsRegular: number;
  baselineCurvePower: number;
  activeBlocksMin: number;
  activeBlocksMax: number;
  bassBoost: number;
  lowMidBoost: number;
  transientBassBoost: number;
  transientLowMidBoost: number;
  lineGlowLength: number;
  sideVariance: number;
  sideVarianceSpeed: number;
};
type VisualizerWaveTheme = {
  baselineActive: string;
  baselineIdle: string;
  baselineStrokeActive: string;
  baselineStrokeIdle: string;
  segmentLow: string;
  segmentMid: string;
  segmentHigh: string;
  segmentStroke: string;
  trailCore: string;
  trailGlow: string;
  glowBase: string;
  glowMid: string;
  glowHot: string;
};

const VISUALIZER_CONFIG: VisualizerConfig = {
  compactBreakpoint: 360,
  blockSizeCompact: 3,
  blockSizeRegular: 4,
  blockGap: 1,
  sidePaddingCompact: 4,
  sidePaddingRegular: 6,
  centerGapCompact: 8,
  centerGapRegular: 10,
  minHalfColumns: 24,
  maxHalfColumns: 32,
  topHeadroomCompact: 6,
  topHeadroomRegular: 5,
  baselineYOffsetCompact: 3,
  baselineYOffsetRegular: 4,
  maxFloorLiftRowsCompact: 2.45,
  maxFloorLiftRowsRegular: 3.24,
  baselineCurvePower: 1.72,
  activeBlocksMin: 7,
  activeBlocksMax: 12,
  bassBoost: 1.24,
  lowMidBoost: 1.08,
  transientBassBoost: 1.3,
  transientLowMidBoost: 1.12,
  lineGlowLength: 18,
  sideVariance: 0.08,
  sideVarianceSpeed: 0.07
};

const WAVE_THEME: VisualizerWaveTheme = {
  baselineActive: 'rgba(134, 101, 255, 0.86)',
  baselineIdle: 'rgba(104, 82, 194, 0.5)',
  baselineStrokeActive: 'rgba(246, 228, 255, 0.16)',
  baselineStrokeIdle: 'rgba(228, 214, 255, 0.07)',
  segmentLow: 'rgba(116, 98, 255, 0.96)',
  segmentMid: 'rgba(242, 98, 255, 0.98)',
  segmentHigh: 'rgba(255, 246, 255, 1)',
  segmentStroke: 'rgba(244, 224, 255, 0.18)',
  trailCore: 'rgba(255, 236, 252, 0.96)',
  trailGlow: 'rgba(174, 110, 255, 0.78)',
  glowBase: 'rgba(104, 82, 194, 0)',
  glowMid: 'rgba(144, 94, 255, 0.16)',
  glowHot: 'rgba(255, 116, 224, 0.2)'
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createBandLevels(value = 0): BandLevels {
  return {
    bass: value,
    lowMid: value,
    mid: value,
    high: value
  };
}

function createBackgroundMatrixState(): BackgroundMatrixState {
  return { cells: [], frame: 0 };
}

function smoothstep(min: number, max: number, value: number) {
  const normalized = clamp((value - min) / Math.max(max - min, 1e-5), 0, 1);

  return normalized * normalized * (3 - 2 * normalized);
}

function fract(value: number) {
  return value - Math.floor(value);
}

function getCellNoise(column: number, row: number, seed: number) {
  return fract(Math.sin(column * 127.1 + row * 311.7 + seed * 74.7) * 43758.5453123);
}

function getToneFill(tone: BackgroundCellTone, alpha: number) {
  switch (tone) {
    case 'white':
      return `rgba(255, 244, 250, ${alpha})`;
    case 'pink':
      return `rgba(255, 96, 222, ${alpha})`;
    case 'cyan':
      return `rgba(116, 255, 244, ${alpha})`;
    case 'amber':
      return `rgba(255, 214, 126, ${alpha})`;
    case 'violet':
    default:
      return `rgba(150, 110, 255, ${alpha})`;
  }
}

function getToneStroke(tone: BackgroundCellTone, alpha: number) {
  switch (tone) {
    case 'white':
      return `rgba(255, 249, 252, ${alpha})`;
    case 'pink':
      return `rgba(255, 214, 244, ${alpha})`;
    case 'cyan':
      return `rgba(214, 255, 248, ${alpha})`;
    case 'amber':
      return `rgba(255, 236, 182, ${alpha})`;
    case 'violet':
    default:
      return `rgba(224, 214, 255, ${alpha})`;
  }
}

function getVisualizerLayout(width: number, height: number) {
  const compact = width < VISUALIZER_CONFIG.compactBreakpoint;
  const blockSize = compact ? VISUALIZER_CONFIG.blockSizeCompact : VISUALIZER_CONFIG.blockSizeRegular;
  const blockGap = VISUALIZER_CONFIG.blockGap;
  const sidePadding = compact ? VISUALIZER_CONFIG.sidePaddingCompact : VISUALIZER_CONFIG.sidePaddingRegular;
  const topPadding = 12;
  const bottomPadding = 8;
  const recordSize = clamp(Math.floor(height * 0.42), 28, 42);
  const centerGap = recordSize + (compact ? VISUALIZER_CONFIG.centerGapCompact : VISUALIZER_CONFIG.centerGapRegular);
  const estimatedStep = blockSize + 1;
  const computedHalfColumns = Math.floor((width - sidePadding * 2 - centerGap) / (estimatedStep * 2));
  const halfColumns = clamp(computedHalfColumns, VISUALIZER_CONFIG.minHalfColumns, VISUALIZER_CONFIG.maxHalfColumns);
  const totalRows = Math.max(8, Math.floor((height - topPadding - bottomPadding + blockGap) / (blockSize + blockGap)));
  const baselineRows = 1;
  const topHeadroomRows = compact ? VISUALIZER_CONFIG.topHeadroomCompact : VISUALIZER_CONFIG.topHeadroomRegular;
  const baselineYOffset = compact
    ? VISUALIZER_CONFIG.baselineYOffsetCompact
    : VISUALIZER_CONFIG.baselineYOffsetRegular;
  const maxFloorLiftRows = compact
    ? VISUALIZER_CONFIG.maxFloorLiftRowsCompact
    : VISUALIZER_CONFIG.maxFloorLiftRowsRegular;
  const activeMaxBlocks = clamp(
    totalRows - baselineRows - topHeadroomRows - Math.ceil(maxFloorLiftRows * 0.6),
    VISUALIZER_CONFIG.activeBlocksMin,
    VISUALIZER_CONFIG.activeBlocksMax
  );

  return {
    compact,
    blockSize,
    blockGap,
    sidePadding,
    topPadding,
    bottomPadding,
    centerGap,
    recordSize,
    halfColumns,
    baselineRows,
    activeMaxBlocks,
    baselineYOffset,
    maxFloorLiftRows
  };
}

function isCompactVisualizer(width: number) {
  return width < VISUALIZER_CONFIG.compactBreakpoint;
}

function getVisualizerFrameDelay(
  phase: PixelAudioVisualizerProps['phase'],
  isPlaying: boolean,
  width: number
) {
  const compact = isCompactVisualizer(width);

  if (phase === 'playing' && isPlaying) {
    return compact ? 32 : 16;
  }

  if (phase === 'transition') {
    return compact ? 96 : 72;
  }

  if (phase === 'paused') {
    return compact ? 128 : 104;
  }

  return compact ? 180 : 144;
}

function getAverageEnergy(data: Uint8Array, start: number, end: number) {
  const safeStart = clamp(start, 0, Math.max(data.length - 1, 0));
  const safeEnd = clamp(end, safeStart + 1, data.length);
  let total = 0;

  for (let index = safeStart; index < safeEnd; index += 1) {
    total += data[index];
  }

  return total / Math.max(1, safeEnd - safeStart) / 255;
}

function getMirroredContour(index: number, halfColumns: number) {
  const coarseWave = Math.sin((index + 1) * 0.92) * 0.024;
  const fineWave = Math.sin((index + 1) * 2.18 + 0.35) * 0.012;
  const alternatingOffset = index % 4 === 0 ? 0.014 : index % 4 === 1 ? -0.008 : index % 4 === 2 ? 0.01 : -0.012;

  return clamp(1 + coarseWave + fineWave + alternatingOffset, 0.96, 1.04);
}

function getSubtleEnvelope(index: number, halfColumns: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);

  return 0.98 + ratio ** 1.6 * 0.04;
}

function updateNormalizer(current: number, sample: number, floor: number) {
  if (sample > current) {
    return current * 0.82 + sample * 0.18;
  }

  return Math.max(floor, current * 0.992 + sample * 0.008);
}

function normalizeAgainstReference(sample: number, reference: number) {
  return clamp(sample / Math.max(reference * 1.18, 0.085), 0, 1.2);
}

function getColumnBandWeights(index: number, halfColumns: number): BandLevels {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const edgeBias = ratio;
  const centerBias = 1 - ratio;
  const weights = {
    bass: 0.34 + edgeBias * 0.016 - centerBias * 0.008,
    lowMid: 0.3 + centerBias * 0.012 - edgeBias * 0.006,
    mid: 0.22 + centerBias * 0.008,
    high: 0.14 + edgeBias * 0.01 - centerBias * 0.004
  };
  const total = weights.bass + weights.lowMid + weights.mid + weights.high;

  return {
    bass: weights.bass / total,
    lowMid: weights.lowMid / total,
    mid: weights.mid / total,
    high: weights.high / total
  };
}

function getSpikeBandWeights(index: number, halfColumns: number): BandLevels {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const edgeBias = ratio;
  const centerBias = 1 - ratio;
  const weights = {
    bass: 0.52 + edgeBias * 0.04 - centerBias * 0.02,
    lowMid: 0.3 + centerBias * 0.02,
    mid: 0.13 - centerBias * 0.01 + edgeBias * 0.01,
    high: 0.05 - centerBias * 0.01 + edgeBias * 0.01
  };
  const total = weights.bass + weights.lowMid + weights.mid + weights.high;

  return {
    bass: weights.bass / total,
    lowMid: weights.lowMid / total,
    mid: weights.mid / total,
    high: weights.high / total
  };
}

function getSpikeAccent(index: number, halfColumns: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const coarse = Math.sin((index + 1) * 1.12) * 0.11;
  const fine = Math.sin((index + 1) * 2.84 + 0.6) * 0.05;
  const stepped = index % 4 === 0 ? 0.12 : index % 4 === 2 ? 0.05 : -0.04;
  const edgeLift = ratio ** 1.1 * 0.08;

  return clamp(0.86 + coarse + fine + stepped + edgeLift, 0.72, 1.12);
}

function getSpikeSlope(index: number, halfColumns: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);

  return 0.7 + ratio ** 1.24 * 0.38;
}

function getAverageNormalizedValue(data: ArrayLike<number>, start: number, end: number) {
  const length = typeof data.length === 'number' ? data.length : 0;
  const safeStart = clamp(start, 0, Math.max(length - 1, 0));
  const safeEnd = clamp(end, safeStart + 1, length);
  let total = 0;

  for (let index = safeStart; index < safeEnd; index += 1) {
    total += data[index] ?? 0;
  }

  return total / Math.max(1, safeEnd - safeStart);
}

function getRelativeTransient(current: number, previous: number) {
  return clamp((current - previous) / Math.max(previous * 0.9 + 0.06, 0.08), 0, 1.35);
}

function getColumnSpectrumWindow(index: number, halfColumns: number, spectrumLength: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const mappedMaxBin = Math.max(18, Math.floor(spectrumLength * 0.82));
  const spectrumRatio = 1 - ratio ** 0.86;
  const centerBin = Math.floor(spectrumRatio * mappedMaxBin);
  const windowSize = clamp(Math.round(4 + ratio * 5), 4, 10);
  const start = clamp(centerBin - Math.floor(windowSize / 2), 0, Math.max(spectrumLength - 1, 0));
  const end = clamp(start + windowSize, start + 1, spectrumLength);

  return { start, end };
}

function getWindowLowFocus(start: number, end: number, spectrumLength: number) {
  const midpoint = (start + end) / 2;
  const ratio = midpoint / Math.max(spectrumLength - 1, 1);

  return clamp(1 - ratio ** 0.82, 0.16, 1);
}

function getInnerWingRatio(index: number, halfColumns: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const easedRatio = smoothstep(0, 1, ratio);
  const bowedRise = Math.sin((easedRatio * Math.PI) / 2);
  const archedRise = Math.pow(bowedRise, 1.04);
  const shoulderLift = Math.sin(easedRatio * Math.PI) * 0.026;
  const curvedProfile = archedRise * (0.84 - archedRise * 0.11) + shoulderLift;
  const microVariation = Math.sin((index + 1) * 1.08) * 0.018 + Math.sin((index + 1) * 2.36 + 0.65) * 0.01;

  return clamp(curvedProfile + microVariation, 0, 0.73);
}

function getFloorLiftRows(index: number, halfColumns: number, maxFloorLiftRows: number) {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const easedRatio = smoothstep(0, 1, ratio);
  const parabolicLift = Math.pow(easedRatio, VISUALIZER_CONFIG.baselineCurvePower);
  const crescentLift = Math.sin((easedRatio * Math.PI) / 2);

  return clamp((parabolicLift * 0.82 + crescentLift * 0.18) * maxFloorLiftRows, 0, maxFloorLiftRows);
}

function getSideLevelVariance(index: number, halfColumns: number, frame: number, side: -1 | 1) {
  const ratio = index / Math.max(halfColumns - 1, 1);
  const primary = Math.sin(frame * VISUALIZER_CONFIG.sideVarianceSpeed + index * 0.54 + (side === -1 ? 0.7 : 2.1));
  const secondary = Math.cos(frame * (VISUALIZER_CONFIG.sideVarianceSpeed * 0.55) + index * 0.27 + (side === -1 ? 0.2 : 1.4));
  const variance = (primary * 0.68 + secondary * 0.32) * VISUALIZER_CONFIG.sideVariance * (0.88 - ratio * 0.18);

  return clamp(1 + variance, 0.9, 1.12);
}

function getWaveSegmentFill(intensity: number) {
  if (intensity > 0.72) {
    return WAVE_THEME.segmentHigh;
  }

  if (intensity > 0.36) {
    return WAVE_THEME.segmentMid;
  }

  return WAVE_THEME.segmentLow;
}

function drawWaveOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  fillStyle: string,
  strokeStyle: string,
  shouldStroke: boolean,
  alpha = 1
) {
  const previousAlpha = ctx.globalAlpha;
  const radius = Math.max(1, size * 0.44);

  ctx.globalAlpha = previousAlpha * alpha;
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
  ctx.fill();

  if (shouldStroke) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.globalAlpha = previousAlpha;
}

function drawPeakTrail(
  ctx: CanvasRenderingContext2D,
  x: number,
  topY: number,
  size: number,
  strength: number
) {
  if (strength <= 0.16) {
    return;
  }

  const lineLength = 5 + strength * VISUALIZER_CONFIG.lineGlowLength;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + size / 2, topY + size * 0.16);
  ctx.lineTo(x + size / 2, topY - lineLength);
  ctx.strokeStyle = WAVE_THEME.trailCore;
  ctx.lineWidth = Math.max(1.15, size * 0.42);
  ctx.lineCap = 'round';
  ctx.shadowBlur = 8 + strength * 12;
  ctx.shadowColor = WAVE_THEME.trailGlow;
  ctx.stroke();
  ctx.restore();
}

function buildIdleLevels(
  halfColumns: number,
  activeMaxBlocks: number,
  previousLevels: number[],
  frame: number,
  phase: PixelAudioVisualizerProps['phase']
): IdleRenderResult {
  const phaseMotion = phase === 'paused' ? 0.05 : phase === 'transition' ? 0.025 : 0.02;
  const phaseStrength = phase === 'paused' ? 0.2 : phase === 'transition' ? 0.12 : 0.09;
  const levels = new Array(halfColumns);

  for (let index = 0; index < halfColumns; index += 1) {
    const wingCurve = getInnerWingRatio(index, halfColumns);
    const arcBase = Math.max(0.02, wingCurve * (0.35 + wingCurve * 0.5));
    const drift =
      (0.5 + 0.5 * Math.sin(frame * phaseMotion + index * 0.6)) * (0.08 + wingCurve * 0.14) +
      (0.5 + 0.5 * Math.sin(frame * phaseMotion * 1.8 + index * 0.27 + 1.2)) * 0.05;
    const targetLevel = clamp(
      arcBase * phaseStrength * activeMaxBlocks + drift * phaseStrength * activeMaxBlocks,
      0,
      activeMaxBlocks * 0.18
    );
    const previousLevel = previousLevels[index] ?? 0;

    levels[index] =
      targetLevel > previousLevel
        ? previousLevel + (targetLevel - previousLevel) * 0.08
        : previousLevel * 0.92 + targetLevel * 0.08;
  }

  return {
    levels,
    bassPulse: phase === 'paused' ? 0.08 : phase === 'transition' ? 0.05 : 0.04,
    recordDrive: phase === 'paused' ? 0.1 : phase === 'transition' ? 0.06 : 0.04
  };
}

function buildColumnLevels(
  data: Uint8Array,
  halfColumns: number,
  activeMaxBlocks: number,
  previousLevels: number[],
  normalizationState: NormalizationState,
  previousBands: BandLevels,
  previousSpectrum: Float32Array,
  entranceProgress: number
) {
  const rawBands: BandLevels = createBandLevels();
  const normalizedBands: BandLevels = createBandLevels();
  const compressedBands: BandLevels = createBandLevels();
  const transientBands: BandLevels = createBandLevels();
  const bedTargets: number[] = new Array(halfColumns);
  const spikeTargets: number[] = new Array(halfColumns);
  const subtleEnvelopeValues: number[] = new Array(halfColumns);
  const mirroredContourValues: number[] = new Array(halfColumns);
  const innerWingValues: number[] = new Array(halfColumns);
  const laneBedValues: number[] = new Array(halfColumns);
  const laneTransientValues: number[] = new Array(halfColumns);
  const spikeSlopeValues: number[] = new Array(halfColumns);
  const localSpectrumValues: number[] = new Array(halfColumns);
  const localTransientValues: number[] = new Array(halfColumns);
  const relativeTransientValues: number[] = new Array(halfColumns);
  const lowFocusValues: number[] = new Array(halfColumns);
  const localPresenceValues: number[] = new Array(halfColumns);
  const peakAccentValues: number[] = new Array(halfColumns);
  const bassEnd = Math.max(4, Math.floor(data.length * 0.08));
  const lowMidEnd = Math.max(bassEnd + 4, Math.floor(data.length * 0.2));
  const midEnd = Math.max(lowMidEnd + 6, Math.floor(data.length * 0.42));
  const highEnd = Math.max(midEnd + 8, Math.floor(data.length * 0.78));
  const subBassEnd = Math.max(3, Math.floor(data.length * 0.04));
  const punchBassEnd = Math.max(subBassEnd + 3, Math.floor(data.length * 0.12));

  rawBands.bass = getAverageEnergy(data, 0, bassEnd);
  rawBands.lowMid = getAverageEnergy(data, bassEnd, lowMidEnd);
  rawBands.mid = getAverageEnergy(data, lowMidEnd, midEnd);
  rawBands.high = getAverageEnergy(data, midEnd, highEnd);

  const subBass = getAverageEnergy(data, 0, subBassEnd);
  const punchBass = getAverageEnergy(data, subBassEnd, punchBassEnd);

  normalizationState.bass = updateNormalizer(normalizationState.bass, rawBands.bass, 0.09);
  normalizationState.lowMid = updateNormalizer(normalizationState.lowMid, rawBands.lowMid, 0.09);
  normalizationState.mid = updateNormalizer(normalizationState.mid, rawBands.mid, 0.08);
  normalizationState.high = updateNormalizer(normalizationState.high, rawBands.high, 0.07);

  normalizedBands.bass = normalizeAgainstReference(rawBands.bass, normalizationState.bass);
  normalizedBands.lowMid = normalizeAgainstReference(rawBands.lowMid, normalizationState.lowMid);
  normalizedBands.mid = normalizeAgainstReference(rawBands.mid, normalizationState.mid);
  normalizedBands.high = normalizeAgainstReference(rawBands.high, normalizationState.high);

  compressedBands.bass = Math.pow(normalizedBands.bass, 0.78);
  compressedBands.lowMid = Math.pow(normalizedBands.lowMid, 0.78);
  compressedBands.mid = Math.pow(normalizedBands.mid, 0.78);
  compressedBands.high = Math.pow(normalizedBands.high, 0.78);

  transientBands.bass = Math.max(0, compressedBands.bass - previousBands.bass);
  transientBands.lowMid = Math.max(0, compressedBands.lowMid - previousBands.lowMid);
  transientBands.mid = Math.max(0, compressedBands.mid - previousBands.mid);
  transientBands.high = Math.max(0, compressedBands.high - previousBands.high);

  const boostedBass = clamp(compressedBands.bass * VISUALIZER_CONFIG.bassBoost, 0, 1.52);
  const boostedLowMid = clamp(compressedBands.lowMid * VISUALIZER_CONFIG.lowMidBoost, 0, 1.38);
  const boostedTransientBass = clamp(transientBands.bass * VISUALIZER_CONFIG.transientBassBoost, 0, 1.96);
  const boostedTransientLowMid = clamp(transientBands.lowMid * VISUALIZER_CONFIG.transientLowMidBoost, 0, 1.62);

  const rawMix =
    boostedBass * 0.37 +
    boostedLowMid * 0.31 +
    compressedBands.mid * 0.2 +
    compressedBands.high * 0.12;
  const rawTransient =
    boostedTransientBass * 0.54 +
    boostedTransientLowMid * 0.28 +
    transientBands.mid * 0.14 +
    transientBands.high * 0.04;
  const bassRiseDrive = clamp(
    boostedTransientBass * 1.72 +
      boostedTransientLowMid * 1.08 +
      boostedBass * 0.28,
    0,
    1.46
  );
  const ambientMotionDrive = clamp(
    boostedBass * 0.08 +
      boostedLowMid * 0.26 +
      compressedBands.mid * 0.26 +
      compressedBands.high * 0.22,
    0,
    0.82
  );
  const sustainedBassImpact = clamp(
    Math.max(0, subBass - 0.12) * 2.8 +
      Math.max(0, punchBass - 0.1) * 2.1 +
      Math.max(0, rawBands.bass - 0.1) * 1.4,
    0,
    1.6
  );
  const bassPressure = clamp(
    Math.pow(clamp(subBass * 1.4 + punchBass * 1.05 + rawBands.lowMid * 0.4, 0, 1.8), 0.86),
    0,
    1.55
  );
  const nextPreviousSpectrum = new Float32Array(data.length);
  const maxVisibleBlocks = Math.max(4, activeMaxBlocks - 0.9);
  const introBlend = clamp(0.2 + entranceProgress * 0.8, 0.2, 1);

  for (let index = 0; index < data.length; index += 1) {
    nextPreviousSpectrum[index] = data[index] / 255;
  }

  normalizationState.mix = updateNormalizer(normalizationState.mix, rawMix, 0.16);
  normalizationState.transient = updateNormalizer(normalizationState.transient, rawTransient, 0.035);
  const globalTransientLift = clamp(rawTransient / Math.max(normalizationState.transient * 1.1, 0.04), 0, 1.3);
  const globalBassLift = clamp(
    sustainedBassImpact * 0.42 +
      bassPressure * 0.3 +
      bassRiseDrive * 0.22 +
      globalTransientLift * 0.14,
    0,
    1.25
  );

  for (let index = 0; index < halfColumns; index += 1) {
    const bedWeights = getColumnBandWeights(index, halfColumns);
    const spikeWeights = getSpikeBandWeights(index, halfColumns);
    const subtleEnvelope = getSubtleEnvelope(index, halfColumns);
    const mirroredContour = getMirroredContour(index, halfColumns);
    const innerWingRatio = getInnerWingRatio(index, halfColumns);
    const laneBed =
      boostedBass * bedWeights.bass +
      boostedLowMid * bedWeights.lowMid +
      compressedBands.mid * bedWeights.mid +
      compressedBands.high * bedWeights.high;
    const laneTransient =
      boostedTransientBass * spikeWeights.bass +
      boostedTransientLowMid * spikeWeights.lowMid +
      transientBands.mid * spikeWeights.mid +
      transientBands.high * spikeWeights.high;
    const spikeSlope = getSpikeSlope(index, halfColumns);
    const { start, end } = getColumnSpectrumWindow(index, halfColumns, data.length);
    const localSpectrum = getAverageEnergy(data, start, end);
    const previousLocalSpectrum = getAverageNormalizedValue(previousSpectrum, start, end);
    const localTransient = Math.max(0, localSpectrum - previousLocalSpectrum);
    const relativeTransient = getRelativeTransient(localSpectrum, previousLocalSpectrum);
    const lowFocus = getWindowLowFocus(start, end, data.length);
    const midFocus = clamp(1 - Math.abs(lowFocus - 0.52) * 1.4, 0.24, 1);
    const localEnergyCore = clamp(
      localSpectrum * (0.4 + lowFocus * 0.36 + midFocus * 0.06) +
        localTransient * (0.98 + lowFocus * 0.24) +
        relativeTransient * (0.46 + lowFocus * 0.22),
      0.04,
      1.8
    );
    const localPresence = clamp(
      Math.pow(localEnergyCore, 1.08) +
        Math.pow(Math.max(0, localSpectrum - 0.06), 0.92) * (0.14 + lowFocus * 0.18),
      0.1,
      1.82
    );
    subtleEnvelopeValues[index] = subtleEnvelope;
    mirroredContourValues[index] = mirroredContour;
    innerWingValues[index] = innerWingRatio;
    laneBedValues[index] = laneBed;
    laneTransientValues[index] = laneTransient;
    spikeSlopeValues[index] = spikeSlope;
    localSpectrumValues[index] = localSpectrum;
    localTransientValues[index] = localTransient;
    relativeTransientValues[index] = relativeTransient;
    lowFocusValues[index] = lowFocus;
    localPresenceValues[index] = localPresence;
  }

  const mixNormalized = clamp(rawMix / Math.max(normalizationState.mix * 1.12, 0.12), 0, 1.08);
  const transientNormalized = clamp(rawTransient / Math.max(normalizationState.transient * 1.18, 0.04), 0, 1.3);

  for (let index = 0; index < halfColumns; index += 1) {
    const subtleEnvelope = subtleEnvelopeValues[index];
    const mirroredContour = mirroredContourValues[index];
    const innerWingRatio = innerWingValues[index];
    const laneBed = laneBedValues[index];
    const laneTransient = laneTransientValues[index];
    const spikeSlope = spikeSlopeValues[index];
    const localSpectrum = localSpectrumValues[index];
    const localTransient = localTransientValues[index];
    const relativeTransient = relativeTransientValues[index];
    const lowFocus = lowFocusValues[index];
    const localPresence = localPresenceValues[index];
    const leftPresence = localPresenceValues[index - 1] ?? localPresence;
    const rightPresence = localPresenceValues[index + 1] ?? localPresence;
    const leftSpectrum = localSpectrumValues[index - 1] ?? localSpectrum;
    const rightSpectrum = localSpectrumValues[index + 1] ?? localSpectrum;
    const leftTransient = localTransientValues[index - 1] ?? localTransient;
    const rightTransient = localTransientValues[index + 1] ?? localTransient;
    const neighborPresenceAverage = leftPresence * 0.5 + rightPresence * 0.5;
    const neighborSpectrumAverage = leftSpectrum * 0.5 + rightSpectrum * 0.5;
    const neighborTransientAverage = leftTransient * 0.5 + rightTransient * 0.5;
    const presenceContrast = clamp(localPresence - neighborPresenceAverage, -0.28, 1.24);
    const spectrumContrast = clamp(localSpectrum - neighborSpectrumAverage, -0.2, 1.18);
    const transientContrast = clamp(localTransient - neighborTransientAverage, -0.18, 1.18);
    const contrastAccent = clamp(
      Math.max(0, presenceContrast) * 1.34 +
        Math.max(0, spectrumContrast) * 0.82 +
        Math.max(0, transientContrast) * 1.42 +
        relativeTransient * 0.44,
      0,
      2
    );
    const localPeakAccent = Math.pow(
      clamp(
        contrastAccent * 0.76 +
          relativeTransient * 0.36 +
          localTransient * 0.5 +
          Math.max(0, spectrumContrast) * 0.3 +
          lowFocus * 0.08 +
          (getSpikeAccent(index, halfColumns) - 0.72) * 0.14,
        0,
        2.05
      ),
      1.12
    );
    peakAccentValues[index] = localPeakAccent;
  }

  for (let index = 0; index < halfColumns; index += 1) {
    const subtleEnvelope = subtleEnvelopeValues[index];
    const mirroredContour = mirroredContourValues[index];
    const innerWingRatio = innerWingValues[index];
    const laneBed = laneBedValues[index];
    const laneTransient = laneTransientValues[index];
    const spikeSlope = spikeSlopeValues[index];
    const localSpectrum = localSpectrumValues[index];
    const localTransient = localTransientValues[index];
    const relativeTransient = relativeTransientValues[index];
    const lowFocus = lowFocusValues[index];
    const localPresence = localPresenceValues[index];
    const peakAccent = peakAccentValues[index];
    const leftPeakAccent = peakAccentValues[index - 1] ?? peakAccent;
    const rightPeakAccent = peakAccentValues[index + 1] ?? peakAccent;
    const peakDominance = clamp(
      peakAccent - (leftPeakAccent * 0.34 + rightPeakAccent * 0.34),
      0,
      1.4
    );
    const peakNeighborShadow = clamp(
      Math.max(leftPeakAccent, rightPeakAccent) * 0.22 - peakAccent * 0.08,
      0,
      0.24
    );
    const peakAccentLift = clamp(
      peakAccent * 0.78 +
        peakDominance * 0.62 +
        localTransient * 0.24 +
        relativeTransient * 0.18,
      0,
      2.2
    );
    const sustainedLowEndDrive = clamp(
      sustainedBassImpact * (0.34 + lowFocus * 0.66) +
        bassPressure * (0.28 + lowFocus * 0.52) +
        boostedLowMid * (0.08 + (1 - Math.abs(lowFocus - 0.52) * 1.4) * 0.14),
      0,
      1.9
    );
    const impactDrive = clamp(
      transientNormalized * 0.56 +
        peakAccent * 0.64 +
        peakDominance * 0.42 +
        relativeTransient * 0.22 +
        boostedBass * 0.34 +
        boostedLowMid * 0.18,
      0,
      2.15
    );
    const reboundDrive = clamp(
      localTransient * (0.84 + lowFocus * 0.14) +
        relativeTransient * (0.44 + lowFocus * 0.12) +
        peakAccent * 0.52 +
        peakDominance * 0.28 +
        Math.max(0, transientNormalized - 0.14) * 0.34,
      0,
      2.1
    );
    const centerTuck = clamp(
      0.42 +
        innerWingRatio * 0.28 +
        globalBassLift * 0.08 +
        lowFocus * 0.04 -
        peakAccent * 0.06,
      0.34,
      0.86
    );
    const innerSpikeLift = clamp(
        0.38 +
        innerWingRatio * 0.4 +
        lowFocus * 0.12 +
        globalBassLift * 0.12 +
        peakAccent * 0.2 +
        peakDominance * 0.14 +
        relativeTransient * 0.02,
      0.34,
      1.12
    );
    const dynamicCeiling =
      maxVisibleBlocks *
      clamp(
        0.24 +
          innerWingRatio * 0.34 +
          globalBassLift * (0.08 + lowFocus * 0.12) +
          relativeTransient * 0.06 +
          localPresence * 0.04 +
          peakAccent * 0.16 +
          peakDominance * 0.16,
        0.24,
      0.92
      );
    const bedEnergy = clamp(
      (mixNormalized * 0.44 + laneBed * 0.56) *
        subtleEnvelope *
        mirroredContour *
        clamp(0.98 - peakAccent * 0.24 - peakDominance * 0.12, 0.46, 0.98),
      0,
      1.05
    );
    const spikeEnergy = clamp(
      Math.pow(
        clamp(
          (transientNormalized * 0.34 + laneTransient * 0.66) *
            subtleEnvelope *
            (0.72 + peakAccent * 0.64 + peakDominance * 0.22),
          0,
          1.56
        ),
        0.9
      ),
      0,
      1.52
    );
    const bassRiseBlocks =
      Math.pow(bassRiseDrive, 0.82) *
      (activeMaxBlocks * 0.1) *
      (0.9 + subtleEnvelope * 0.08);
    const ambientBlocks =
      Math.pow(ambientMotionDrive, 0.96) *
      (activeMaxBlocks * 0.058) *
      (0.9 + mirroredContour * 0.06);
    const quietMotionBlocks =
      Math.pow(clamp(mixNormalized * 0.34 + laneBed * 0.66, 0, 1.08), 1.28) *
      (activeMaxBlocks * 0.036) *
      (0.92 + subtleEnvelope * 0.04);
    const impactBlocks =
      Math.pow(Math.max(0, impactDrive - 0.44) * 2.08, 0.68) *
      (activeMaxBlocks * 0.46) *
      (0.92 + spikeSlope * 0.18);
    const reboundBlocks =
      Math.pow(reboundDrive, 0.74) *
      (activeMaxBlocks * 0.17) *
      (0.74 + spikeSlope * 0.26);
    const remixSurgeBlocks =
      Math.pow(sustainedBassImpact, 0.72) *
      (activeMaxBlocks * 0.36) *
      (0.56 + spikeSlope * 0.42) *
      (0.44 + localPresence * 0.36 + peakAccent * 0.3);
    const bassPressureBlocks =
      Math.pow(bassPressure, 0.84) *
      (activeMaxBlocks * 0.12) *
      (0.58 + spikeSlope * 0.36);
    const lowEndLiftBlocks =
      Math.pow(sustainedLowEndDrive, 0.78) *
      (activeMaxBlocks * 0.16) *
      (0.58 + spikeSlope * 0.34);
    const peakAccentBlocks =
      Math.pow(peakAccentLift, 0.82) *
      (activeMaxBlocks * 0.24) *
      (0.82 + spikeSlope * 0.22);

    bedTargets[index] =
      (Math.pow(bedEnergy, 1.1) * (activeMaxBlocks * 0.092) +
        ambientBlocks * 0.6 +
        quietMotionBlocks * 0.6 +
        bassRiseBlocks * (0.04 + spikeSlope * 0.04) +
        bassPressureBlocks * (0.04 + lowFocus * 0.06 + localSpectrum * 0.04) +
        lowEndLiftBlocks * (0.02 + lowFocus * 0.04)) *
      clamp(1 - peakNeighborShadow * 0.14, 0.78, 1) *
      centerTuck;
    spikeTargets[index] =
      (Math.pow(spikeEnergy, 1.02) * (activeMaxBlocks * 0.44) * spikeSlope * (0.68 + localPresence * 0.2 + peakAccent * 0.12) +
        bassRiseBlocks *
          (0.04 + localTransient * 0.24 + relativeTransient * 0.18 + localSpectrum * 0.04 + peakAccent * 0.2) +
        impactBlocks * (0.06 + localPresence * 0.18 + localTransient * 0.14 + relativeTransient * 0.16 + peakAccent * 0.34 + peakDominance * 0.18) +
        reboundBlocks * (0.14 + localPresence * 0.12 + relativeTransient * 0.14 + peakAccent * 0.18 + peakDominance * 0.12) +
        remixSurgeBlocks * (0.06 + localPresence * 0.24 + lowFocus * 0.1 + peakAccent * 0.3 + peakDominance * 0.12) +
        bassPressureBlocks * (0.02 + localPresence * 0.04 + lowFocus * 0.1 + peakDominance * 0.06) +
        lowEndLiftBlocks * (0.06 + localPresence * 0.08 + lowFocus * 0.16 + relativeTransient * 0.08 + peakAccent * 0.14) +
        peakAccentBlocks * (0.34 + localPresence * 0.12 + relativeTransient * 0.16 + peakDominance * 0.32)) *
      innerSpikeLift *
      clamp(0.9 + peakAccent * 0.14 + peakDominance * 0.18 - peakNeighborShadow * 0.12, 0.74, 1.24);

    bedTargets[index] = Math.min(bedTargets[index], dynamicCeiling * 0.42);
    spikeTargets[index] = Math.min(spikeTargets[index], Math.max(0, dynamicCeiling - bedTargets[index]));
  }

  const smoothedBedTargets = bedTargets.map((value, index) => {
    const left = bedTargets[index - 1] ?? value;
    const right = bedTargets[index + 1] ?? value;
    const accent = clamp(peakAccentValues[index] / 1.8, 0, 1);
    const sideWeight = 0.08 - accent * 0.03;
    const centerWeight = 1 - sideWeight * 2;

    return left * sideWeight + value * centerWeight + right * sideWeight;
  });

  const smoothedSpikeTargets = spikeTargets.map((value, index) => {
    const left = spikeTargets[index - 1] ?? value;
    const right = spikeTargets[index + 1] ?? value;
    const accent = clamp(peakAccentValues[index] / 1.8, 0, 1);
    const sideWeight = 0.028 - accent * 0.018;
    const centerWeight = 1 - sideWeight * 2;

    return left * sideWeight + value * centerWeight + right * sideWeight;
  });

  const levels = smoothedBedTargets.map((bedLevel, index) => {
    const entranceEnvelope = clamp(introBlend * 1.08 - getInnerWingRatio(index, halfColumns) * 0.1, 0.18, 1);
    const targetLevel = clamp((bedLevel + smoothedSpikeTargets[index]) * entranceEnvelope, 0, maxVisibleBlocks);
    const previousLevel = previousLevels[index] ?? 0;
    const dropAmount = Math.max(0, previousLevel - targetLevel);
    const releaseBlend = clamp(0.28 + (dropAmount / Math.max(activeMaxBlocks, 1)) * 0.28, 0.28, 0.54);

    return targetLevel > previousLevel
      ? previousLevel + (targetLevel - previousLevel) * 0.8
      : previousLevel * (1 - releaseBlend) + targetLevel * releaseBlend;
  });

  return {
    bassPulse: rawBands.bass,
    recordDrive: clamp(
      subBass * 0.72 +
        punchBass * 0.46 +
        transientBands.bass * 0.78 +
        transientBands.lowMid * 0.22,
      0,
      1.45
    ),
    levels,
    nextPreviousBands: { ...compressedBands },
    nextPreviousSpectrum
  };
}

function drawWaveGlow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bassPulse: number,
  active: boolean
) {
  const glowStrength = active ? clamp(0.08 + bassPulse * 0.18, 0.08, 0.26) : 0.05;
  const baseGradient = ctx.createLinearGradient(0, height * 0.48, 0, height);
  baseGradient.addColorStop(0, WAVE_THEME.glowBase);
  baseGradient.addColorStop(0.58, `rgba(144, 94, 255, ${glowStrength * 0.74})`);
  baseGradient.addColorStop(1, `rgba(255, 116, 224, ${glowStrength * 0.76})`);

  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, height * 0.46, width, height * 0.54);

  const leftGlow = ctx.createRadialGradient(width * 0.23, height * 0.78, 0, width * 0.23, height * 0.78, width * 0.28);
  leftGlow.addColorStop(0, `rgba(255, 138, 236, ${glowStrength})`);
  leftGlow.addColorStop(0.42, `rgba(144, 94, 255, ${glowStrength * 0.6})`);
  leftGlow.addColorStop(1, 'rgba(144, 94, 255, 0)');

  const rightGlow = ctx.createRadialGradient(width * 0.77, height * 0.78, 0, width * 0.77, height * 0.78, width * 0.28);
  rightGlow.addColorStop(0, `rgba(255, 138, 236, ${glowStrength})`);
  rightGlow.addColorStop(0.42, `rgba(144, 94, 255, ${glowStrength * 0.6})`);
  rightGlow.addColorStop(1, 'rgba(144, 94, 255, 0)');

  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, height * 0.38, width * 0.52, height * 0.62);
  ctx.fillStyle = rightGlow;
  ctx.fillRect(width * 0.48, height * 0.38, width * 0.52, height * 0.62);
}

function createBackgroundCell(columns: number, rows: number): BackgroundCell {
  const widthUnits = Math.random() < 0.82 ? 1 : Math.random() < 0.95 ? 2 : 3;
  const heightUnits = Math.random() < 0.88 ? 1 : 2;
  const maxCol = Math.max(0, columns - widthUnits);
  const maxRow = Math.max(0, rows - heightUnits);
  const toneRoll = Math.random();

  return {
    col: Math.floor(Math.random() * (maxCol + 1)),
    row: Math.floor(Math.random() * (maxRow + 1)),
    widthUnits,
    heightUnits,
    life: 1,
    decay: 0.02 + Math.random() * 0.024,
    peak: 0.18 + Math.random() * 0.24,
    tone:
      toneRoll > 0.93 ? 'white' : toneRoll > 0.74 ? 'cyan' : toneRoll > 0.54 ? 'amber' : toneRoll > 0.28 ? 'pink' : 'violet',
    seed: Math.random() * Math.PI * 2
  };
}

function drawBackgroundMatrix(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bassPulse: number,
  active: boolean,
  state: BackgroundMatrixState,
  compact: boolean
) {
  const { sidePadding, topPadding, bottomPadding } = getVisualizerLayout(width, height);
  const insetX = Math.max(1, sidePadding - 4);
  const insetTop = Math.max(1, topPadding - 8);
  const insetBottom = Math.max(1, bottomPadding - 6);
  const regionWidth = Math.max(24, width - insetX * 2);
  const regionHeight = Math.max(24, height - insetTop - insetBottom);
  const cellWidth = compact ? 12 : 10;
  const cellHeight = compact ? 12 : 10;
  const cellGap = compact ? 4 : 3;
  const columns = Math.max(4, Math.ceil((regionWidth + cellGap) / (cellWidth + cellGap)));
  const rows = Math.max(3, Math.ceil((regionHeight + cellGap) / (cellHeight + cellGap)));
  const gridWidth = columns * (cellWidth + cellGap) - cellGap;
  const gridHeight = rows * (cellHeight + cellGap) - cellGap;
  const gridX = insetX;
  const gridY = insetTop;

  state.frame += compact ? 0.6 : 1;
  const time = state.frame * 0.018;

  if (active) {
    const spawnChance = 0.05 + bassPulse * 0.035;
    const primaryLimit = compact ? 7 : 14;
    const secondaryLimit = compact ? 4 : 8;

    if (state.cells.length < primaryLimit && Math.random() < spawnChance) {
      state.cells.push(createBackgroundCell(columns, rows));
    }

    if (state.cells.length < secondaryLimit && Math.random() < spawnChance * 0.42) {
      state.cells.push(createBackgroundCell(columns, rows));
    }
  } else if (state.cells.length < 6 && Math.random() < 0.024) {
    state.cells.push(createBackgroundCell(columns, rows));
  }

  state.cells = state.cells
    .map((cell) => ({ ...cell, life: cell.life - cell.decay }))
    .filter((cell) => cell.life > 0);

  ctx.save();
  ctx.beginPath();
  ctx.rect(insetX, insetTop, regionWidth, regionHeight);
  ctx.clip();

  ctx.fillStyle = `rgba(88, 58, 150, ${active ? 0.12 : 0.08})`;
  ctx.fillRect(insetX, insetTop, regionWidth, regionHeight);

  const clusterSpecs: Array<{ x: number; y: number; radius: number; tone: BackgroundCellTone; strength: number }> = compact
    ? [
        {
          x: gridX + gridWidth * 0.28,
          y: gridY + gridHeight * 0.3,
          radius: gridWidth * 0.2,
          tone: 'amber',
          strength: active ? 0.58 : 0.42
        },
        {
          x: gridX + gridWidth * 0.52,
          y: gridY + gridHeight * 0.62,
          radius: gridWidth * 0.26,
          tone: 'pink',
          strength: active ? 0.68 : 0.48
        },
        {
          x: gridX + gridWidth * 0.76,
          y: gridY + gridHeight * 0.34,
          radius: gridWidth * 0.2,
          tone: 'cyan',
          strength: active ? 0.52 : 0.36
        }
      ]
    : [
        { x: gridX + gridWidth * (0.18 + Math.sin(time * 0.7) * 0.05), y: gridY + gridHeight * (0.22 + Math.cos(time * 0.8) * 0.05), radius: gridWidth * 0.2, tone: 'amber', strength: 0.66 },
        { x: gridX + gridWidth * (0.42 + Math.cos(time * 0.46 + 0.9) * 0.08), y: gridY + gridHeight * (0.58 + Math.sin(time * 0.52 + 0.2) * 0.08), radius: gridWidth * 0.24, tone: 'pink', strength: 0.78 },
        { x: gridX + gridWidth * (0.74 + Math.sin(time * 0.56 + 1.4) * 0.06), y: gridY + gridHeight * (0.36 + Math.cos(time * 0.62 + 0.5) * 0.09), radius: gridWidth * 0.22, tone: 'cyan', strength: 0.62 },
        { x: gridX + gridWidth * (0.86 + Math.cos(time * 0.4 + 2.2) * 0.04), y: gridY + gridHeight * (0.76 + Math.sin(time * 0.51 + 0.8) * 0.05), radius: gridWidth * 0.16, tone: 'pink', strength: 0.54 }
      ];

  for (const cluster of clusterSpecs) {
    const clusterGradient = ctx.createRadialGradient(cluster.x, cluster.y, 0, cluster.x, cluster.y, cluster.radius);
    clusterGradient.addColorStop(0, getToneFill(cluster.tone, (active ? 0.12 : 0.08) * cluster.strength));
    clusterGradient.addColorStop(0.4, getToneFill(cluster.tone, (active ? 0.06 : 0.035) * cluster.strength));
    clusterGradient.addColorStop(1, getToneFill(cluster.tone, 0));
    ctx.fillStyle = clusterGradient;
    ctx.fillRect(cluster.x - cluster.radius, cluster.y - cluster.radius, cluster.radius * 2, cluster.radius * 2);
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const x = gridX + col * (cellWidth + cellGap);
      const y = gridY + row * (cellHeight + cellGap);
      const noiseA = getCellNoise(col, row, 0.13);
      const noiseB = getCellNoise(col, row, 0.71);
      const pulse = 0.5 + 0.5 * Math.sin(state.frame * 0.028 + row * 0.44 + col * 0.31 + noiseB * Math.PI * 2);
      let clusterEnergy = 0;
      let dominantTone: BackgroundCellTone = row < rows * 0.24 ? 'amber' : col > columns * 0.72 ? 'cyan' : 'pink';

      for (const cluster of clusterSpecs) {
        const centerX = x + cellWidth / 2;
        const centerY = y + cellHeight / 2;
        const distance = Math.hypot(centerX - cluster.x, centerY - cluster.y);
        const influence = Math.max(0, 1 - distance / cluster.radius) ** 1.7 * cluster.strength;

        clusterEnergy += influence;
        if (influence > 0.34) {
          dominantTone = cluster.tone;
        }
      }

      const sparkle = noiseA > 0.95 ? 0.28 + pulse * 0.22 : noiseA > 0.88 ? 0.12 + pulse * 0.1 : 0;
      const accent = clamp(clusterEnergy * (0.68 + pulse * 0.24) + sparkle, 0, 1.08);
      const tileAlpha = active ? 0.24 + noiseB * 0.06 : 0.18 + noiseB * 0.04;
      const fillStyle =
        accent > 0.88
          ? getToneFill('white', 0.88 + (accent - 0.88) * 0.24)
          : accent > 0.5
            ? getToneFill(dominantTone, 0.42 + accent * 0.4)
            : accent > 0.24
              ? getToneFill(dominantTone, 0.18 + accent * 0.18)
              : `rgba(${88 + noiseA * 26}, ${54 + noiseB * 20}, ${128 + noiseA * 38}, ${tileAlpha})`;
      const strokeStyle =
        accent > 0.5
          ? getToneStroke(dominantTone, 0.18 + accent * 0.24)
          : `rgba(176, 126, 255, ${0.06 + pulse * 0.022})`;

      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, cellWidth, cellHeight);

      if (accent > 0.42 || (row + col) % 2 === 0) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1);
      }
    }
  }

  if (!compact) {
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const x = gridX + col * (cellWidth + cellGap);
        const y = gridY + row * (cellHeight + cellGap);
        const noise = getCellNoise(col, row, 0.37);
        const tinyDot =
          noise > 0.972
            ? 0.6 + 0.4 * Math.sin(state.frame * 0.11 + col * 0.9 + row * 0.6)
            : 0;

        if (tinyDot <= 0.08) {
          continue;
        }

        ctx.fillStyle = getToneFill(noise > 0.985 ? 'white' : noise > 0.98 ? 'amber' : 'pink', tinyDot * 0.78);
        ctx.fillRect(Math.floor(x + cellWidth * 0.34), Math.floor(y + cellHeight * 0.34), 2, 2);
      }
    }
  }

  for (const cell of state.cells) {
    const x = gridX + cell.col * (cellWidth + cellGap);
    const y = gridY + cell.row * (cellHeight + cellGap);
    const w = cell.widthUnits * cellWidth + (cell.widthUnits - 1) * cellGap;
    const h = cell.heightUnits * cellHeight + (cell.heightUnits - 1) * cellGap;
    const fade = Math.sin(cell.life * Math.PI);
    const shimmer = 0.72 + 0.28 * Math.sin(state.frame * 0.12 + cell.seed);
    const alpha = cell.peak * fade * shimmer;

    ctx.fillStyle = getToneFill(cell.tone, alpha);
    ctx.strokeStyle = getToneStroke(cell.tone, alpha * 0.72);
    ctx.lineWidth = 1;
    ctx.shadowBlur = compact ? 0 : 8;
    ctx.shadowColor = getToneFill(cell.tone, alpha * 0.48);
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }
  ctx.shadowBlur = 0;

  ctx.restore();
}

function drawCenterRecord(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bassPulse: number,
  recordDrive: number,
  active: boolean,
  state: RecordAnimationState
) {
  const { bottomPadding, recordSize } = getVisualizerLayout(width, height);
  const radius = recordSize / 2;
  const centerX = Math.floor(width / 2);
  const centerY = height - bottomPadding + radius * 0.08;

  state.pulse = active ? state.pulse * 0.76 + recordDrive * 0.24 : state.pulse * 0.84;
  state.rotation = (state.rotation + (active ? 0.95 + state.pulse * 6.8 : 0)) % 360;

  const glowAlpha = active ? clamp(0.14 + bassPulse * 0.3 + state.pulse * 0.16, 0.14, 0.42) : 0.08;
  const scale = active ? 0.98 + state.pulse * 0.1 : 0.96;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);

  const glowGradient = ctx.createRadialGradient(0, -radius * 0.18, radius * 0.15, 0, 0, radius * 1.45);
  glowGradient.addColorStop(0, `rgba(255, 116, 224, ${glowAlpha})`);
  glowGradient.addColorStop(0.55, `rgba(160, 96, 255, ${glowAlpha * 0.46})`);
  glowGradient.addColorStop(1, 'rgba(160, 96, 255, 0)');

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.48, 0, Math.PI * 2);
  ctx.fill();

  const discGradient = ctx.createRadialGradient(-radius * 0.18, -radius * 0.26, radius * 0.12, 0, 0, radius);
  discGradient.addColorStop(0, 'rgba(76, 56, 112, 0.96)');
  discGradient.addColorStop(0.2, 'rgba(18, 13, 34, 0.98)');
  discGradient.addColorStop(0.62, 'rgba(6, 5, 15, 0.98)');
  discGradient.addColorStop(1, 'rgba(30, 18, 50, 0.98)');

  ctx.shadowBlur = active ? 10 + state.pulse * 10 : 4;
  ctx.shadowColor = `rgba(255, 92, 214, ${glowAlpha * 0.78})`;
  ctx.fillStyle = discGradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 0.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.rotate((state.rotation * Math.PI) / 180);

  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  for (let grooveIndex = 0; grooveIndex < 3; grooveIndex += 1) {
    const grooveRadius = radius * (0.46 + grooveIndex * 0.16);

    ctx.beginPath();
    ctx.arc(0, 0, grooveRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 245, 252, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius * 0.74, 0);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.beginPath();
  ctx.arc(radius * 0.44, -radius * 0.1, radius * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const labelGradient = ctx.createRadialGradient(-radius * 0.08, -radius * 0.1, radius * 0.04, 0, 0, radius * 0.34);
  labelGradient.addColorStop(0, 'rgba(255, 236, 250, 0.98)');
  labelGradient.addColorStop(0.55, 'rgba(255, 92, 214, 0.95)');
  labelGradient.addColorStop(1, 'rgba(138, 92, 255, 0.92)');

  ctx.fillStyle = labelGradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(18, 12, 34, 0.98)';
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1.8, radius * 0.07), 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  columnLevels: number[] | null,
  bassPulse: number,
  active: boolean,
  recordDrive: number,
  recordState: RecordAnimationState,
  backgroundState: BackgroundMatrixState,
  compactVisual: boolean
) {
  ctx.clearRect(0, 0, width, height);
  drawWaveGlow(ctx, width, height, bassPulse, active);
  drawBackgroundMatrix(ctx, width, height, bassPulse, active, backgroundState, compactVisual || !active);

  const {
    blockSize,
    blockGap,
    centerGap,
    sidePadding,
    halfColumns,
    baselineRows,
    activeMaxBlocks,
    baselineYOffset,
    maxFloorLiftRows
  } =
    getVisualizerLayout(width, height);
  const centerX = Math.floor(width / 2);
  const shouldStrokeBlocks = blockSize >= 3;
  const baselineBottomInset = 1;
  const baselineY = height - baselineBottomInset + baselineYOffset;
  const leftInnerX = Math.floor(centerX - centerGap / 2 - blockSize);
  const rightInnerX = Math.floor(centerX + centerGap / 2);
  const halfSpan = Math.max(0, leftInnerX - sidePadding);

  ctx.imageSmoothingEnabled = false;
  ctx.shadowBlur = active ? (compactVisual ? 6 + bassPulse * 4 : 10 + bassPulse * 6) : 0;
  ctx.shadowColor = active ? 'rgba(255, 92, 214, 0.24)' : 'transparent';

  for (let index = 0; index < halfColumns; index += 1) {
    const positionRatio = index / Math.max(halfColumns - 1, 1);
    const centerBias = 1 - positionRatio;
    const baseExtraBlocks = active ? clamp(columnLevels?.[index] ?? 0, 0, activeMaxBlocks) : 0;
    const offset = Math.round((halfSpan * index) / Math.max(halfColumns - 1, 1));
    const leftX = leftInnerX - offset;
    const rightX = rightInnerX + offset;
    const floorLiftRows = getFloorLiftRows(index, halfColumns, maxFloorLiftRows);
    const floorLiftPixels = floorLiftRows * (blockSize + blockGap);
    const columnBaseY = baselineY - floorLiftPixels;
    const leftVariance = active ? getSideLevelVariance(index, halfColumns, backgroundState.frame, -1) : 1;
    const rightVariance = active ? getSideLevelVariance(index, halfColumns, backgroundState.frame, 1) : 1;
    const stacks = [
      { x: leftX, extraBlocks: clamp(baseExtraBlocks * leftVariance, 0, activeMaxBlocks) },
      { x: rightX, extraBlocks: clamp(baseExtraBlocks * rightVariance, 0, activeMaxBlocks) }
    ];

    for (const stack of stacks) {
      for (let baselineIndex = 0; baselineIndex < baselineRows; baselineIndex += 1) {
        const y = Math.floor(columnBaseY - (baselineIndex + 1) * (blockSize + blockGap) + blockGap);

        drawWaveOrb(
          ctx,
          stack.x,
          y,
          blockSize,
          active ? WAVE_THEME.baselineActive : WAVE_THEME.baselineIdle,
          active ? WAVE_THEME.baselineStrokeActive : WAVE_THEME.baselineStrokeIdle,
          shouldStrokeBlocks
        );
      }

      if (stack.extraBlocks <= 0) {
        continue;
      }

      const fullBlocks = Math.floor(stack.extraBlocks);
      const fractionalBlock = stack.extraBlocks - fullBlocks;

      for (let blockIndex = 0; blockIndex < fullBlocks; blockIndex += 1) {
        const y = Math.floor(columnBaseY - (blockIndex + baselineRows + 1) * (blockSize + blockGap) + blockGap);
        const intensity = fullBlocks <= 1 ? 0 : blockIndex / Math.max(fullBlocks - 1, 1);
        const highlightBoost = bassPulse * centerBias * 0.16;

        drawWaveOrb(
          ctx,
          stack.x,
          y,
          blockSize,
          getWaveSegmentFill(intensity + highlightBoost),
          WAVE_THEME.segmentStroke,
          shouldStrokeBlocks
        );
      }

      if (fractionalBlock > 0.03 && fullBlocks < activeMaxBlocks) {
        const y = Math.floor(columnBaseY - (fullBlocks + baselineRows + 1) * (blockSize + blockGap) + blockGap);
        const intensity =
          fullBlocks <= 0 ? 0 : (fullBlocks + Math.min(fractionalBlock, 0.75)) / Math.max(fullBlocks + 1, 1);
        const highlightBoost = bassPulse * centerBias * 0.14;

        drawWaveOrb(
          ctx,
          stack.x,
          y,
          blockSize,
          getWaveSegmentFill(intensity + highlightBoost),
          WAVE_THEME.segmentStroke,
          shouldStrokeBlocks,
          clamp(0.28 + fractionalBlock * 0.78, 0.28, 0.96)
        );
      }

      drawPeakTrail(
        ctx,
        stack.x,
        Math.floor(columnBaseY - (stack.extraBlocks + baselineRows) * (blockSize + blockGap) + blockGap),
        blockSize,
        clamp(stack.extraBlocks / Math.max(activeMaxBlocks, 1), 0, 1)
      );
    }
  }

  ctx.shadowBlur = 0;
  drawCenterRecord(ctx, width, height, bassPulse, recordDrive, active, recordState);
}

export const PixelAudioVisualizer = memo(function PixelAudioVisualizer({
  analyser,
  isPlaying,
  enabled,
  phase,
  className
}: PixelAudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const levelsRef = useRef<number[]>([]);
  const recordStateRef = useRef<RecordAnimationState>({ rotation: 0, pulse: 0 });
  const backgroundMatrixRef = useRef<BackgroundMatrixState>(createBackgroundMatrixState());
  const phaseFrameRef = useRef(0);
  const phaseRef = useRef<PixelAudioVisualizerProps['phase']>('idle');
  const entranceProgressRef = useRef(0);
  const normalizationRef = useRef<NormalizationState>({
    bass: 0.12,
    lowMid: 0.12,
    mid: 0.1,
    high: 0.09,
    mix: 0.18,
    transient: 0.05
  });
  const previousBandsRef = useRef<BandLevels>(createBandLevels());
  const previousSpectrumRef = useRef<Float32Array>(new Float32Array(0));

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || typeof window === 'undefined') {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { width, height };
      const { halfColumns, activeMaxBlocks } = getVisualizerLayout(width, height);
      const idleResult = buildIdleLevels(halfColumns, activeMaxBlocks, [], 0, 'idle');

      levelsRef.current = idleResult.levels;
      recordStateRef.current = { rotation: 0, pulse: 0 };
      backgroundMatrixRef.current = createBackgroundMatrixState();
      phaseFrameRef.current = 0;
      phaseRef.current = 'idle';
      entranceProgressRef.current = 0;
      previousBandsRef.current = createBandLevels();
      previousSpectrumRef.current = new Float32Array(0);
      const compactVisual = isCompactVisualizer(width);
      drawFrame(
        ctx,
        width,
        height,
        idleResult.levels,
        idleResult.bassPulse,
        false,
        idleResult.recordDrive,
        recordStateRef.current,
        backgroundMatrixRef.current,
        compactVisual
      );
    };

    resizeCanvas();

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resizeCanvas();
          })
        : null;

    observer?.observe(container);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const clearScheduledFrame = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    clearScheduledFrame();

    if (!enabled) {
      const { width, height } = sizeRef.current;
      const { halfColumns, activeMaxBlocks } = getVisualizerLayout(width, height);
      const idleResult = buildIdleLevels(halfColumns, activeMaxBlocks, levelsRef.current, 0, 'idle');

      levelsRef.current = idleResult.levels;
      recordStateRef.current = { rotation: 0, pulse: 0 };
      backgroundMatrixRef.current = createBackgroundMatrixState();
      phaseFrameRef.current = 0;
      phaseRef.current = 'idle';
      entranceProgressRef.current = 0;
      previousBandsRef.current = createBandLevels();
      previousSpectrumRef.current = new Float32Array(0);
      const compactVisual = isCompactVisualizer(width);
      drawFrame(
        ctx,
        width,
        height,
        idleResult.levels,
        idleResult.bassPulse,
        false,
        idleResult.recordDrive,
        recordStateRef.current,
        backgroundMatrixRef.current,
        compactVisual
      );
      return;
    }

    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const scheduleNextFrame = (delayMs: number) => {
      if (delayMs <= 20) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        frameRef.current = window.requestAnimationFrame(render);
      }, delayMs);
    };

    const render = () => {
      const { width, height } = sizeRef.current;
      const { halfColumns, activeMaxBlocks } = getVisualizerLayout(width, height);
      const compactVisual = isCompactVisualizer(width);
      const phaseChanged = phaseRef.current !== phase;

      if (phaseChanged) {
        const previousPhase = phaseRef.current;

        phaseRef.current = phase;
        phaseFrameRef.current = 0;

        if (phase === 'transition') {
          previousBandsRef.current = createBandLevels();
          previousSpectrumRef.current = new Float32Array(0);
          normalizationRef.current = {
            bass: 0.12,
            lowMid: 0.12,
            mid: 0.1,
            high: 0.09,
            mix: 0.18,
            transient: 0.05
          };
          entranceProgressRef.current = 0;
        } else if (phase === 'playing' && (previousPhase === 'transition' || previousPhase === 'idle')) {
          entranceProgressRef.current = 0;
        }
      } else {
        phaseFrameRef.current += 1;
      }

      let bassPulse = 0.04;
      let recordDrive = 0.04;
      let levels = levelsRef.current;
      const displayActive = phase !== 'idle';

      if (phase === 'playing' && isPlaying && analyser && data) {
        entranceProgressRef.current = clamp(entranceProgressRef.current + 0.085, 0, 1);
        analyser.getByteFrequencyData(data);
        const nextFrame = buildColumnLevels(
          data,
          halfColumns,
          activeMaxBlocks,
          levelsRef.current,
          normalizationRef.current,
          previousBandsRef.current,
          previousSpectrumRef.current,
          entranceProgressRef.current
        );

        bassPulse = nextFrame.bassPulse;
        recordDrive = nextFrame.recordDrive;
        levels = nextFrame.levels;
        levelsRef.current = levels;
        previousBandsRef.current = nextFrame.nextPreviousBands;
        previousSpectrumRef.current = nextFrame.nextPreviousSpectrum;
      } else {
        if (phase !== 'paused') {
          previousBandsRef.current = createBandLevels();
          previousSpectrumRef.current = new Float32Array(0);
        }

        const idleResult = buildIdleLevels(
          halfColumns,
          activeMaxBlocks,
          levelsRef.current,
          phaseFrameRef.current,
          phase
        );

        bassPulse = idleResult.bassPulse;
        recordDrive = idleResult.recordDrive;
        levels = idleResult.levels;
        levelsRef.current = levels;
      }

      drawFrame(
        ctx,
        width,
        height,
        levels,
        bassPulse,
        displayActive,
        recordDrive,
        recordStateRef.current,
        backgroundMatrixRef.current,
        compactVisual
      );
      scheduleNextFrame(getVisualizerFrameDelay(phase, isPlaying, width));
    };

    render();

    return () => {
      clearScheduledFrame();
    };
  }, [analyser, enabled, isPlaying, phase]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] ${className ?? ''}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%)]" />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
});

PixelAudioVisualizer.displayName = 'PixelAudioVisualizer';
