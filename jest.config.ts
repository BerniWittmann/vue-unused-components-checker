import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['src'],
  transform: { '\\.ts$': 'ts-jest' },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
};

export default config;
