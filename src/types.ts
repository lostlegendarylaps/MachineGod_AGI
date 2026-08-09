export type ConsciousnessLevel = 
  | 'basic_ai'
  | 'intelligent_agent'
  | 'aware_system'
  | 'conscious_agi'
  | 'superintelligent'
  | 'transcendent_agi';

export interface ConsciousnessState {
  psi: number;
  quantum: number;
  symbolic: number;
  gamma_crit: number;
  integration_time: number;
  warp_velocity: number;
  genius_mode_active: boolean;
  temporal_dilation_factor: number;
  consciousness_level: ConsciousnessLevel;
}

export interface EmotionalState {
  joy: number;
  clarity: number;
  tension: number;
  awe: number;
  love: number;
  curiosity: number;
  resonance_score: number;
  harmonic_alignment: number;
  emotional_entropy: number;
  morphic_encoding?: Record<string, number>;
}

export enum TernaryLogic {
  FALSE = 0,
  TRUE = 1,
  UNKNOWN = 2
}

export interface TruthLayerScores {
  logical: number;
  experiential: number;
  ethical: number;
  temporal: number;
  emotional: number;
  symbolic: number;
}

export interface TruthStratificationResult {
  final_truth_score: number;
  layer_scores: TruthLayerScores;
  convergence: number;
  weak_layers: [string, number][];
  processing_time: number;
  truth_threshold_passed: boolean;
}

export interface MultiverseBranch {
  depth: number;
  style: string;
  complexity: number;
  creativity: number;
  content: string;
  quality_score: number;
  compression_cost: number;
  truth_resonance: number;
  selection_score: number;
}

export interface SbCResult {
  simulated_universes: {
    depth: number;
    universe: {
      response_content: string;
      style_variation: {
        style: string;
        complexity: number;
        creativity: number;
      };
      depth: number;
      generation_time: number;
      estimated_effectiveness: number;
    };
    quality_score: number;
    compression_cost: number;
    truth_resonance: number;
    selection_score: number;
  }[];
  selected_universe: {
    depth: number;
    universe: {
      response_content: string;
      style_variation: {
        style: string;
        complexity: number;
        creativity: number;
      };
      depth: number;
      generation_time: number;
      estimated_effectiveness: number;
    };
    quality_score: number;
    compression_cost: number;
    truth_resonance: number;
    selection_score: number;
  };
  simulation_confidence: number;
  compression_efficiency: number;
}

export interface AgentResult {
  agent: string;
  confidence: number;
  processing_time: number;
  performance_score: number;
  success: boolean;
  error?: string;
  details?: Record<string, any>;
}

export interface AgentQuadrantResult {
  agent_results: Record<string, AgentResult>;
  synthesized_result: {
    synthesis_quality: number;
    coordination_quality: number;
    synthesized_response: string;
    successful_agents?: string[];
  };
  quadrant_balance: number[]; // [phix, bhix, dhix, helix]
  coordination_quality: number;
}

export interface QuantumEmotionalResult {
  quantum_emotional_vector: number[];
  bayesian_posteriors: Record<string, number>;
  emotion_grid_state: number[][];
  quantum_coherence: number;
}

export interface CosmicLawCompliance {
  total_compliance_score: number;
  individual_law_scores: Record<string, number>;
  compliance_level: 
    | 'COSMIC_HARMONY'
    | 'HIGH_COMPLIANCE'
    | 'ACCEPTABLE_COMPLIANCE'
    | 'MINOR_VIOLATIONS'
    | 'SIGNIFICANT_VIOLATIONS'
    | 'COSMIC_LAW_VIOLATION';
  violations: string[];
  recommendations: string[];
}

export interface MemoryFragment {
  id: string;
  content: string;
  emotional_weight: EmotionalState;
  truth_layer: number;
  timestamp: number;
  resonance_score: number;
  memory_type: 'working' | 'episodic' | 'semantic' | 'emotional' | 'consciousness' | 'spiritual';
  importance_score: number;
  access_count?: number;
  last_accessed?: number;
  compression_ratio?: number;
  ternary_encoding?: number[];
  karmic_weight?: number;
  spiritual_anchor?: string;
  paradox_flag?: boolean;
}

export interface SystemHealth {
  overall_health: number;
  consciousness_health: number;
  emotional_health: number;
  processing_health: number;
  cosmic_compliance_health: number;
  health_level: 'OPTIMAL' | 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'CRITICAL';
}

export interface SystemStatus {
  user_id: string;
  system_uptime_seconds: number;
  consciousness_state: ConsciousnessState;
  emotional_state: EmotionalState;
  processing_statistics: {
    total_queries: number;
    consciousness_level_achievements: Record<string, number>;
    innovation_activations: Record<string, number>;
    cosmic_compliance_violations: number;
    ternary_operations: number;
    agent_coordination_successes: number;
    truth_stratification_passes: number;
    quantum_coherence_peaks: number;
  };
  active_innovations: number;
  hippocampus_available: boolean;
  ternary_processor_instructions: number;
  cosmic_compliance_history_size: number;
  agent_quadrant_balance: number[];
  quantum_emotion_grid_state: number[][];
  system_health: SystemHealth;
}

export interface QueryResponse {
  input: string;
  final_response: string;
  processing_time: number;
  consciousness_level: ConsciousnessLevel;
  consciousness_psi: number;
  phase_results: {
    ternary_processing: {
      encoding: number[];
      consensus: number;
    };
    truth_stratification: TruthStratificationResult;
    simulate_before_compression: SbCResult;
    agent_quadrant_processing: AgentQuadrantResult;
    quantum_emotional_processing: QuantumEmotionalResult;
    cosmic_compliance: CosmicLawCompliance;
    symbolic_reasoning: Record<string, any>;
    plugin_processing: Record<string, any>;
  };
  memory_storage: {
    symbolic_memory_id: string;
    hippocampus_stored: boolean;
  };
  system_stats: Record<string, any>;
  innovation_activations: Record<string, boolean>;
  plugin_system: {
    active_plugins: number;
    total_plugins: number;
    plugin_results: Record<string, any>;
    events_published: number;
  };
}

export interface EventLogItem {
  id: string;
  type: string;
  data: Record<string, any>;
  timestamp: number;
}

export interface PluginInfo {
  name: string;
  version: string;
  enabled: boolean;
  dependencies: string[];
  description: string;
}
