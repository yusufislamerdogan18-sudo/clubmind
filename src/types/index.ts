/**
 * ClubMind - Shared TypeScript Data Models & Types
 */

export type DocumentCategory = 'Meeting Notes' | 'Projects' | 'Research' | 'Decisions' | 'Education';

export interface ClubDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  date: string;
  tags: string[];
  content: string;
  author?: string;
  createdAt: string;
}

export type ProjectStatus = 'completed' | 'partially completed' | 'abandoned' | 'ongoing';

export interface HistoricalProject {
  id: string;
  name: string;
  objective: string;
  originalGoals: string[];
  completedFeatures: string[];
  status: ProjectStatus;
  technologies: string[];
  plannedDuration: string;
  actualDuration: string;
  challenges: string[];
  documentedCauses: string;
  whatWentWell: string[];
  whatWentWrong: string[];
  lessonsLearned: string[];
  associatedDocIds?: string[];
  isDemo?: boolean;
}

export type LessonCategory = 
  | 'scope management'
  | 'team coordination'
  | 'technical difficulty'
  | 'time estimation'
  | 'research'
  | 'user feedback'
  | 'blockchain architecture';

export interface LessonLearned {
  id: string;
  title: string;
  lesson: string;
  projectId: string;
  projectName: string;
  evidenceOrSource: string;
  category: LessonCategory;
  confidence: 'high' | 'medium' | 'hypothesis';
  isDocumentedFact: boolean;
  practicalRecommendation: string;
  isArchived?: boolean;
}

export interface ProjectIdea {
  id: string;
  name: string;
  pitch: string;
  problem: string;
  solution: string;
  targetAudience: string;
  whyItMatters: string;
  mvpFeatures: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  techStack: string[];
  potentialRisks: string[];
  isBlockchainNecessary: boolean;
  blockchainJustification: string;
  avoidedPastPitfalls?: string[];
  builtOnPastSuccesses?: string[];
  createdAt: string;
  isCustom?: boolean;
}

export interface CriteriaScores {
  clubValue: number;          // 30%
  novelty: number;            // 25%
  feasibility: number;        // 20%
  technicalAccessibility: number; // 15%
  blockchainRelevance: number; // 10%
}

export interface CriteriaReasoning {
  clubValue: string;
  novelty: string;
  feasibility: string;
  technicalAccessibility: string;
  blockchainRelevance: string;
}

export interface HistoricalAnalysis {
  relevantProjects: string[];
  recurringProblemsWarning: string[];
  specificMitigations: string[];
  relevantLessonsExplanation: string;
}

export interface IdeaEvaluation {
  id: string;
  ideaId: string;
  ideaName: string;
  overallScore: number;
  criteriaScores: CriteriaScores;
  criteriaReasoning: CriteriaReasoning;
  strengths: string[];
  weaknesses: string[];
  implementationRisks: string[];
  recommendedImprovements: string[];
  recommendation: 'Strong Candidate' | 'Promising with Changes' | 'Needs Rework';
  historicalLessonsAnalysis: HistoricalAnalysis;
  evaluatedAt: string;
  isSimulated?: boolean;
}

export interface BlueprintTask {
  id: string;
  title: string;
  completed: boolean;
  category: 'setup' | 'core' | 'ui' | 'testing' | 'demo';
}

export interface AppliedLesson {
  lessonTitle: string;
  actionableMeasure: string;
  accepted: boolean;
}

export interface DemoScriptStep {
  timing: string;
  section: string;
  whatToSayAndShow: string;
}

export interface ProjectBlueprint {
  id: string;
  ideaId: string;
  projectName: string;
  objective: string;
  targetUser: string;
  problemStatement: string;
  coreMvpScope: string[];
  postponedFeatures: string[];
  recommendedTechStack: string[];
  milestones: { title: string; deadline: string; description: string; }[];
  tasks: BlueprintTask[];
  appliedHistoricalLessons: AppliedLesson[];
  testingChecklist: string[];
  demoScript: DemoScriptStep[];
  nextSteps: string[];
  createdAt: string;
}

export interface CriteriaWeights {
  clubValue: number;
  novelty: number;
  feasibility: number;
  technicalAccessibility: number;
  blockchainRelevance: number;
}

export interface AppSettings {
  criteriaWeights: CriteriaWeights;
  aiProvider: 'demo' | 'gemini' | 'openai';
  apiKey: string;
  isDemoMode: boolean;
}
