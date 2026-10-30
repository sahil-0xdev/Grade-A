/**
 * LocalStorage and Demo Data Persistence Service
 * Completely self-contained - zero external cloud dependency.
 */

import { DEMO_STUDENTS, INITIAL_INTERVENTIONS } from '../data/demoStudents';
import { DEFAULT_THRESHOLDS, DEFAULT_WEIGHTS } from './riskService';

const KEYS = {
  STUDENTS: 'grade_a_students_v1',
  IS_DEMO_DATA: 'grade_a_is_demo_v1',
  INTERVENTIONS: 'grade_a_interventions_v1',
  SETTINGS: 'grade_a_settings_v1',
  ACADEMIC_META: 'grade_a_meta_v1'
};

const DEFAULT_META = {
  institutionName: "Oakridge Academy & Science Institute",
  academicTerm: "Fall 2026 / Term 1",
  activeRole: "Academic Coordinator",
  activeUser: "Ms. Elena Vance"
};

/**
 * Load students from localStorage or seed initial synthetic data.
 */
export function getStoredStudents() {
  try {
    const raw = localStorage.getItem(KEYS.STUDENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error reading students from localStorage, fallback to demo data:", err);
  }

  // Seed default demo students
  setStoredStudents(DEMO_STUDENTS, true);
  return DEMO_STUDENTS;
}

/**
 * Save students to localStorage.
 */
export function setStoredStudents(students, isDemo = false) {
  try {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
    localStorage.setItem(KEYS.IS_DEMO_DATA, JSON.stringify(isDemo));
  } catch (err) {
    console.error("Error saving students to localStorage:", err);
  }
}

/**
 * Check if the active dataset is synthetic demo data.
 */
export function isDemoDataActive() {
  try {
    const raw = localStorage.getItem(KEYS.IS_DEMO_DATA);
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (err) {
    // fallback
  }
  return true;
}

/**
 * Load interventions or seed defaults.
 */
export function getStoredInterventions() {
  try {
    const raw = localStorage.getItem(KEYS.INTERVENTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error reading interventions from localStorage:", err);
  }

  // Seed default interventions
  setStoredInterventions(INITIAL_INTERVENTIONS);
  return INITIAL_INTERVENTIONS;
}

/**
 * Save interventions.
 */
export function setStoredInterventions(interventions) {
  try {
    localStorage.setItem(KEYS.INTERVENTIONS, JSON.stringify(interventions));
  } catch (err) {
    console.error("Error saving interventions to localStorage:", err);
  }
}

/**
 * Add or update a single intervention.
 */
export function saveIntervention(intervention) {
  const current = getStoredInterventions();
  const index = current.findIndex(item => item.id === intervention.id);

  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...intervention };
  } else {
    updated = [intervention, ...current];
  }

  setStoredInterventions(updated);
  return updated;
}

/**
 * Delete an intervention.
 */
export function deleteIntervention(id) {
  const current = getStoredInterventions();
  const updated = current.filter(item => item.id !== id);
  setStoredInterventions(updated);
  return updated;
}

/**
 * Load configurable thresholds and weights.
 */
export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading settings, using defaults:", err);
  }

  const defaults = {
    thresholds: DEFAULT_THRESHOLDS,
    weights: DEFAULT_WEIGHTS
  };
  setStoredSettings(defaults);
  return defaults;
}

/**
 * Save settings.
 */
export function setStoredSettings(settings) {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error("Error saving settings:", err);
  }
}

/**
 * Load academic metadata (institution name, term, etc.).
 */
export function getStoredMeta() {
  try {
    const raw = localStorage.getItem(KEYS.ACADEMIC_META);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    // fallback
  }
  return DEFAULT_META;
}

/**
 * Save academic metadata.
 */
export function setStoredMeta(meta) {
  try {
    localStorage.setItem(KEYS.ACADEMIC_META, JSON.stringify(meta));
  } catch (err) {
    console.error("Error saving metadata:", err);
  }
}

/**
 * Reset everything back to the pristine synthetic demo dataset and default configurations.
 */
export function resetToDemoData() {
  try {
    localStorage.removeItem(KEYS.STUDENTS);
    localStorage.removeItem(KEYS.IS_DEMO_DATA);
    localStorage.removeItem(KEYS.INTERVENTIONS);
    localStorage.removeItem(KEYS.SETTINGS);
    localStorage.removeItem(KEYS.ACADEMIC_META);

    setStoredStudents(DEMO_STUDENTS, true);
    setStoredInterventions(INITIAL_INTERVENTIONS);
    setStoredSettings({
      thresholds: DEFAULT_THRESHOLDS,
      weights: DEFAULT_WEIGHTS
    });
    setStoredMeta(DEFAULT_META);

    return {
      students: DEMO_STUDENTS,
      interventions: INITIAL_INTERVENTIONS,
      settings: { thresholds: DEFAULT_THRESHOLDS, weights: DEFAULT_WEIGHTS },
      meta: DEFAULT_META,
      isDemo: true
    };
  } catch (err) {
    console.error("Error resetting demo data:", err);
    throw err;
  }
}
