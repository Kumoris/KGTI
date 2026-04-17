import { PersonalityCode } from "@/data/personalities";
import {
  Dimension,
  Level,
  Question,
  questionPool,
  dimensionMeta,
} from "@/data/questions";

export interface QuizResult {
  code: PersonalityCode;
  dimensions: {
    FI: "F" | "I";
    SC: "S" | "C";
    RE: "R" | "E";
    DN: "D" | "N";
  };
  scores: {
    FI: number;
    SC: number;
    RE: number;
    DN: number;
  };
}

interface DimState {
  score: number;
  answered: number;
  level: Level;
  done: boolean;
}

const ALL_DIMS: Dimension[] = ["FI", "SC", "RE", "DN"];

const MIN_QUESTIONS = 8;
const MAX_QUESTIONS = 16;
const CONFIDENCE_THRESHOLD = 0.75;

function getUncertainty(score: number, answered: number): number {
  if (answered === 0) return 1.0;
  const abs = Math.abs(score) / answered;
  return 1.0 - abs;
}

export class AdaptiveEngine {
  private answers: Record<string, "A" | "B"> = {};
  private dimStates: Record<Dimension, DimState> = {
    FI: { score: 0, answered: 0, level: 1, done: false },
    SC: { score: 0, answered: 0, level: 1, done: false },
    RE: { score: 0, answered: 0, level: 1, done: false },
    DN: { score: 0, answered: 0, level: 1, done: false },
  };
  private askedIds = new Set<string>();
  private questionSequence: Question[] = [];
  private phase: "seed" | "adaptive" | "done" = "seed";
  private seedIndex = 0;
  private seedOrder: Dimension[] = [];

  constructor() {
    this.seedOrder = shuffleArray([...ALL_DIMS]);
  }

  recordAnswer(qId: string, value: "A" | "B", dimension: Dimension) {
    this.answers[qId] = value;
    const ds = this.dimStates[dimension];
    ds.answered += 1;
    ds.score += value === "A" ? 1 : -1;

    const unc = getUncertainty(ds.score, ds.answered);
    if (unc < 1 - CONFIDENCE_THRESHOLD && ds.answered >= 2) {
      ds.done = true;
    }

    if (ds.answered >= 2 && !ds.done) {
      ds.level = Math.min(3, ds.level + 1) as Level;
    }
  }

  nextQuestion(): Question | null {
    const totalAnswered = Object.keys(this.answers).length;

    if (this.phase === "seed" && this.seedIndex < 4) {
      const dim = this.seedOrder[this.seedIndex];
      const qs = questionPool.filter(
        (q) => q.dimension === dim && q.level === 1 && !this.askedIds.has(q.id)
      );
      if (qs.length > 0) {
        const q = qs[Math.floor(Math.random() * qs.length)];
        this.seedIndex++;
        this.askedIds.add(q.id);
        this.questionSequence.push(q);
        return q;
      }
      this.seedIndex++;
      return this.nextQuestion();
    }

    if (this.phase === "seed") {
      this.phase = "adaptive";
    }

    if (this.phase === "adaptive") {
      if (totalAnswered >= MAX_QUESTIONS || this.isComplete()) {
        this.phase = "done";
        return null;
      }

      if (totalAnswered >= MIN_QUESTIONS && this.isComplete()) {
        this.phase = "done";
        return null;
      }

      const targetDim = this.pickMostUncertainDimension();
      if (!targetDim) {
        this.phase = "done";
        return null;
      }

      const ds = this.dimStates[targetDim];
      let level = ds.level;

      let candidates = questionPool.filter(
        (q) =>
          q.dimension === targetDim &&
          q.level === level &&
          !this.askedIds.has(q.id)
      );

      if (candidates.length === 0) {
        for (const altLevel of [2, 3, 1] as Level[]) {
          if (altLevel !== level) {
            candidates = questionPool.filter(
              (q) =>
                q.dimension === targetDim &&
                q.level === altLevel &&
                !this.askedIds.has(q.id)
            );
            if (candidates.length > 0) break;
          }
        }
      }

      if (candidates.length === 0) {
        this.dimStates[targetDim].done = true;
        return this.nextQuestion();
      }

      const q = candidates[Math.floor(Math.random() * candidates.length)];
      this.askedIds.add(q.id);
      this.questionSequence.push(q);
      return q;
    }

    return null;
  }

  private isComplete(): boolean {
    return ALL_DIMS.every(
      (d) => this.dimStates[d].done || this.dimStates[d].answered >= 3
    );
  }

  private pickMostUncertainDimension(): Dimension | null {
    const candidates = ALL_DIMS.filter((d) => !this.dimStates[d].done);

    if (candidates.length === 0) return null;

    return candidates.reduce((worst, d) => {
      const ds = this.dimStates[d];
      const unc = getUncertainty(ds.score, ds.answered);
      const worstUnc = getUncertainty(
        this.dimStates[worst].score,
        this.dimStates[worst].answered
      );
      return unc > worstUnc ? d : worst;
    }, candidates[0]);
  }

  getProgress() {
    const total = Object.keys(this.answers).length;
    const dims = ALL_DIMS.map((d) => {
      const ds = this.dimStates[d];
      const unc = getUncertainty(ds.score, ds.answered);
      const meta = dimensionMeta[d];
      const side = ds.score >= 0 ? meta.sideA : meta.sideB;
      const color = ds.score >= 0 ? meta.colorA : meta.colorB;
      const confidence = ds.answered > 0 ? (1 - unc) * 100 : 0;
      return {
        dimension: d,
        label: meta.label,
        tendency: side,
        color,
        confidence,
        answered: ds.answered,
        score: ds.score,
      };
    });

    return {
      totalAnswered: total,
      estimatedTotal: this.estimateTotal(),
      dims,
    };
  }

  private estimateTotal(): number {
    const current = Object.keys(this.answers).length;
    let est = current;
    for (const d of ALL_DIMS) {
      const ds = this.dimStates[d];
      if (ds.done) continue;
      const unc = getUncertainty(ds.score, ds.answered);
      if (unc > 1 - CONFIDENCE_THRESHOLD) {
        est += Math.min(3, Math.ceil(unc * 3));
      }
    }
    return Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, est));
  }

  getFinalResult(): QuizResult {
    const dimResult = {
      FI: (this.dimStates.FI.score >= 0 ? "F" : "I") as "F" | "I",
      SC: (this.dimStates.SC.score >= 0 ? "S" : "C") as "S" | "C",
      RE: (this.dimStates.RE.score >= 0 ? "R" : "E") as "R" | "E",
      DN: (this.dimStates.DN.score >= 0 ? "D" : "N") as "D" | "N",
    };

    const code = `${dimResult.FI}${dimResult.SC}${dimResult.RE}${dimResult.DN}` as PersonalityCode;

    const normalize = (d: Dimension) => {
      const ds = this.dimStates[d];
      const maxPossible = Math.max(ds.answered, 1);
      return 50 + (ds.score / maxPossible) * 50;
    };

    return {
      code,
      dimensions: dimResult,
      scores: {
        FI: normalize("FI"),
        SC: normalize("SC"),
        RE: normalize("RE"),
        DN: normalize("DN"),
      },
    };
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function encodeResult(code: PersonalityCode): string {
  return code;
}

export function decodeResult(encoded: string): PersonalityCode | null {
  const validCodes = [
    "FSRD", "FSRN", "FSED", "FSEN",
    "FCRD", "FCRN", "FCED", "FCEN",
    "ISRD", "ISRN", "ISED", "ISEN",
    "ICRD", "ICRN", "ICED", "ICEN",
  ];
  if (validCodes.includes(encoded)) return encoded as PersonalityCode;
  return null;
}
