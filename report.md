# AI Model & Workflow Evaluation Lab

An applied AI project by **Reza Madad**. **Phase 1: an initial small-model evaluation study.** 

## Executive summary

**The question.** How do model adaptation and explicit verification address incorrect calculations, unsupported answers and misleading citations?

**What I built.** A reproducible study of Qwen3-0.6B, LoRA/QLoRA variants and a separate verified-tool workflow, with synthetic research tasks, source-linked traces, GPU profiling and 57 regression tests.

**Three findings.** LoRA increased exact validation reference matches from 0/60 to 44/60, but arithmetic errors remained. An observed margin error passed an ID-only citation check, showing why valid references do not establish correctness. The experimental grader rejected both correct diagnostic examples, making it unsuitable as an automated release gate.

**Proposed direction.** Use verified calculations and visible source evidence for numeric answers. Keep automated judging advisory until independently calibrated. Broader model comparisons, real-report evaluation and measured operating costs are planned extensions.

*Initial synthetic-data study; no production readiness claimed.*

[View the five-minute presentation](project-brief.pptx)

## The broader goal and completed starting point

The broader goal is a reproducible lab for comparing AI models on accuracy, reliability, latency and cost per verified successful task, then testing targeted improvements.

**The completed first study covers one small model family: Qwen3-0.6B and its LoRA/QLoRA variants, alongside a separate deterministic financial-tool workflow.** All tasks and financial documents are synthetic. We did not benchmark multiple distinct frontier LLMs or measure actual production cost.

The work establishes an initial evaluation workflow: record baselines, compare adapter variants under matched generation settings, inspect failure traces, test source-bound calculation and verification, and preserve regression evidence. Cross-provider model comparisons, measured operating costs, real public reports and independent human validation are planned extensions.

Teams ultimately need evidence about task correctness, source support, failure handling, latency and the total cost of a successful answer. The framework below separates those broader goals from the narrower evidence collected in this first study.

## Evaluation goals and current evidence

- **Accuracy and grounding:** current checks are exact reference matching, AI-assisted review of test nonmatches, typed calculations and citation-ID coverage. They do not establish broad, independently human-validated accuracy or semantic citation precision.
- **Reliability and safety:** known synthetic cases exercise missing facts, abstention, tool failures, bounded retries, injection and restricted evidence. General real-world reliability remains untested.
- **Latency and resources:** current evidence includes synchronized T4 generation latency, aggregate throughput, training-memory measurements and profiling on defined workloads. No production-traffic or multi-provider serving comparison was run.
- **Cost and value:** planned measurement is total compute, retries and human-review cost divided by verified successful tasks. Only a framework and illustrative value assumptions were prepared; actual operating cost was not measured.

One motivating failure was a model calling dollar operating income an operating margin despite citing existing documents. The synthetic Aurora and Nova reports permit a direct check: Aurora’s FY2025 margin is 35 / 150 × 100 = **23.33%**; Nova’s is 14 / 140 × 100 = **10.00%**, a **13.33 percentage-point gap**.

## What was built

**Model track.** Qwen/Qwen3-0.6B, fixed revision `c1899de289a04d12100db370d81485cdf75e47ca`, was compared with LoRA and NF4 QLoRA adapters. Grouped synthetic splits contained 360 training, 60 validation and 60 test examples. Thinking was disabled and source documents were injected into prompts. This measures context-injected generation, not retrieval-enabled autonomy.

**Tool track.** A bounded Python controller selects a supported financial operation, filters company/period, retrieves with BM25, calculates with Decimal, and verifies typed source fields and arithmetic with Fraction. MCP stdio tools provide a bounded integration contract, including actual subprocess timeouts and retries. The controller is deterministic rather than a general LLM planner.

**Evidence and operations.** JSONL traces preserve prompts, supplied documents, configurations, responses, tokens, timing and errors. Frozen data, negative cases, GPU telemetry, a profiler trace and automated regression checks support reproducibility in the private experimental repository.

## Results from the first study

| Experiment | Outcome | Scope |
|---|---|---|
| Validation: base / LoRA / QLoRA | 0 / 44 / 43 exact reference matches out of 60 each | Conservative wording metric; zero matches does not mean zero correct facts |
| Selected LoRA reserved test | 44/60 exact matches | Selection used validation before the one-time original test |
| AI inspection of 16 nonmatches | Two additional passes within 0.02 percentage points; 46/60 total | AI review, not independent human review; fourteen failures remain |
| Financial workflow held-out suite | 50/50 passed | Familiar synthetic formats with unseen entities and numbers |
| Behavior held-out suite | 50/50 passed | Deterministic fixtures for comparison, cost, version conflict, injection and MCP timeout/retry |
| Regression | 57 tests passed | Local CPU tests; GitHub CPU regression and official MCP SDK checks also passed |
| Known security/fault cases | 15/15 passed | Bounded negative coverage, not a comprehensive security audit |
| Qwen diagnostic grader | All five answers marked Fail | Both correct answers rejected; grader remains advisory |
| Qwen group-relative reward smoke | Eight completions, two groups, zero optimizer updates | All-zero rewards/advantages; no learning improvement |

These are separate systems and test mixes. The 100/100 fixture score is not an LLM accuracy score or evidence of general research reliability. LoRA’s one-case validation lead over QLoRA is not statistically established superiority.

## Measured changes and unresolved errors

**Reference formatting and citation coverage.** With matched validation prompts and decoding, LoRA produced 44/60 exact normalized reference matches versus 0/60 for the base model. Required citation-ID coverage rose from 0/60 to 60/60. These are measured changes in reference compliance, not a claim that the base model had zero correct facts or that LoRA solved factual reasoning.

**The observed arithmetic failure.** The verified-tool workflow computes 23.33% and 10.00% margins, checks the 13.33 percentage-point gap and preserves operand provenance. The separate 100/100 held-out fixture score applies to this bounded deterministic workflow and its familiar synthetic formats.

**Failures that remain.** Fourteen LoRA test failures remain after the fixed tolerance is applied in AI review. The small grader rejected both correct diagnostic examples. Qwen reward sampling produced no optimizer updates. These findings direct the next experiments rather than being omitted from the comparison.

## GPU evidence

Tesla T4, FP16, batch one, fixed repeated-token inputs and sixteen generated tokens. After two warmups, thirty synchronized repeats were measured at each length.

| Input tokens | Median seconds | p95 seconds, nearest rank |
|---|---:|---:|
| 128 | 0.669 | 0.902 |
| 512 | 0.675 | 0.866 |
| 1,024 | 0.709 | 0.939 |

These are complete generation latencies, not time to first token or production traffic. A separate small Inductor tensor kernel compiled successfully; no whole-model compilation speedup is claimed. Actual production cost per verified successful task is unmeasured.

## Product decision and open gates

Continue with a supervised private pilot that exposes sources, operands and uncertainty. Use deterministic tools as the authority for financial arithmetic. Model adaptation improved reference formatting and citation coverage but left arithmetic errors. The model grader is unsuitable as the sole evaluator.

Before a production decision, obtain the second independent reviewer’s actual labels and expand blind calibration; evaluate real public reports, conflicting periods and restatements; and measure privacy controls, operating cost and service targets. All current benchmark data are synthetic. The source parser, intent rules and scoring were authored for this bounded setting.

The full experimental repository remains private. This public repository provides selected evidence, a project presentation and a browser-only calculation demonstration. That demo uses five fixed synthetic documents; it performs no model inference or live web retrieval.

[Public evidence summary](evidence.json) · [Five-minute presentation](project-brief.pptx) · [Reza Madad on LinkedIn](https://www.linkedin.com/in/reza-madad/)
