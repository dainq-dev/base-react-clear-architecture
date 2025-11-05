/**
 * Artwork configuration
 * Defines different artwork profiles with sizes and aspect ratios
 */

export interface ArtworkProfile {
  sizes: number[];
  aspectRatio: number;
  cropCode: string;
}

export type ArtworkProfileMap = Map<string, ArtworkProfile>;

const ASPECT_RATIOS = {
  HD: 16 / 9,
  ONE: 1,
  THREE_QUARTERS: 3 / 4,
  HD_ASPECT_RATIO: 16 / 9,
};

const AppIconSize = {
  DEFAULT: [48],
  SMALL: [64],
  MEDIUM: [100],
  LARGE: [200],
  XLARGE: [800],
};

const cardSizes = [525, 525, 490, 394, 738];
const brickSizes = [520, 400, 450, 450, 300];
const heroSizes = [1600, 1240, 920, 920, 490];

export type NamedProfile =
  | 'app-icon'
  | 'app-icon-large'
  | 'app-icon-medium'
  | 'app-icon-small'
  | 'card'
  | 'brick'
  | 'large-hero'
  | 'screenshot-phone';

const PROFILES: ArtworkProfileMap = new Map([
  ['app-icon', { sizes: AppIconSize.DEFAULT, aspectRatio: ASPECT_RATIOS.ONE, cropCode: 'bb' }],
  ['app-icon-large', { sizes: AppIconSize.LARGE, aspectRatio: ASPECT_RATIOS.ONE, cropCode: 'bb' }],
  ['app-icon-medium', { sizes: AppIconSize.MEDIUM, aspectRatio: ASPECT_RATIOS.ONE, cropCode: 'bb' }],
  ['app-icon-small', { sizes: AppIconSize.SMALL, aspectRatio: ASPECT_RATIOS.ONE, cropCode: 'bb' }],
  ['card', { sizes: cardSizes, aspectRatio: ASPECT_RATIOS.THREE_QUARTERS, cropCode: 'sr' }],
  ['brick', { sizes: brickSizes, aspectRatio: ASPECT_RATIOS.HD, cropCode: 'sr' }],
  ['large-hero', { sizes: heroSizes, aspectRatio: ASPECT_RATIOS.HD, cropCode: 'sr' }],
  ['screenshot-phone', { sizes: [313, 643, 313, 480, 643], aspectRatio: 20 / 9, cropCode: 'w' }],
]);

export class ArtworkConfig {
  private static profiles: ArtworkProfileMap = PROFILES;

  static set(profiles: { PROFILES: ArtworkProfileMap }): void {
    ArtworkConfig.profiles = profiles.PROFILES;
  }

  static get(profile: string): ArtworkProfile | undefined {
    return ArtworkConfig.profiles.get(profile);
  }

  static getAll(): ArtworkProfileMap {
    return ArtworkConfig.profiles;
  }
}

