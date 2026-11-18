# Frontier AI Evaluation Lab

An applied AI project by **Reza Madad**. 

## The product problem

A small model answered a financial comparison by calling operating income in dollars an operating margin. Its document IDs existed, but the numeric interpretation was wrong. The project investigates whether model adaptation and explicit tool verification can address this failure.

The example companies, Aurora AI and Nova Cloud, and all financial documents are synthetic. Aurora’s FY2025 operating margin is 35 / 150 × 100 = **23.33%**. Nova’s is 14 / 140 × 100 = **10.00%**, a **13.33 percentage-point gap**.

## What was built

**Model track.** Qwen/Qwen3-0.6B, fixed revision `c1899de289a04d12100db370d81485cdf75e47ca`, was compared with LoRA and NF4 QLoRA adapters. Grouped synthetic splits contained 360 training, 60 validation and 60 test examples. Thinking was disabled and source documents were injected into prompts. This measures context-injected generation, not retrieval-enabled autonomy.

**Tool track.** A bounded Python controller selects a supported financial operation, filters company/period, retrieves with BM25, calculates with Decimal, and verifies typed source fields and arithmetic with Fraction. MCP stdio tools provide a bounded integration contract, including actual subprocess timeouts and retries. The controller is deterministic rather than a general LLM planner.

**Evidence and operations.** JSONL traces preserve prompts, supplied documents, configurations, responses, tokens, timing and errors. Frozen data, negative cases, GPU telemetry, a profiler trace and automated regression checks support reproducibility in the private experimental repository.

## Actual results

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
