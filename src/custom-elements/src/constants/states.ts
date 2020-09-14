export const LUX_STATES = ['success', 'warning', 'danger'] as const;

export type LuxStates = typeof LUX_STATES[number];
