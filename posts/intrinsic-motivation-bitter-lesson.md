## Intrinsically Motivated Agents and the Bitter Lesson

Intrinsic motivation has emerged as a pivotal concept in artificial intelligence (AI) and reinforcement learning (RL), offering a framework for agents to explore and learn beyond task-specific rewards. But as we advance in modelling such behaviours, are we adhering to the broader principles of scalable learning outlined in Richard Sutton's "Bitter Lesson"?

### Understanding Intrinsic Motivation
Intrinsic motivation refers to an agent’s internal drive to engage in behaviours that are inherently rewarding, independent of external rewards. In RL, intrinsic motivation is critical for two key purposes:
1. **Exploration:** Encouraging agents to explore their environment efficiently, even when extrinsic rewards are sparse or deceptive.
2. **Open-Ended Learning:** Enabling learning without any specific goal that can be adapted to downstream tasks, creating generalised, versatile learners. A common example is an agent motivated to discover diverse skills that can later be reused.

### Forms of Intrinsic Motivation
Various intrinsic motivators have been studied in RL, each addressing different facets of exploratory behaviour:

- **Curiosity:** Often implemented in model-based approaches, curiosity aims to maximise predictive error or uncertainty. An agent driven by curiosity seeks to explore aspects of the environment that defy its current understanding.
- **Empowerment:** This concept, rooted in information theory, involves maximising an agent’s control over its environment. Empowerment focuses on acquiring states that offer the most influence over future outcomes.
- **Information Gain:** Closely related to curiosity, this focuses on acquiring data that reduces uncertainty or increases understanding of the environment.

Cognitive science suggests that humans seamlessly integrate these motivators along with others such as master, challenge, and even purpose. However, most RL implementations narrowly emphasise curiosity, overlooking the complexity of human-like motivation. This begs the question: should we unify these motivators into a general framework for self-motivated learning?

---

### The Bitter Lesson: A Call for Generality
Richard Sutton’s "Bitter Lesson" emphasises the long-term efficacy of general methods that leverage computation over domain-specific solutions. Sutton argues:

> "General methods that leverage computation are ultimately the most effective, and by a large margin."

> "The human-knowledge approach tends to complicate methods in ways that make them less suited to taking advantage of general methods leveraging computation."

This critique seems to resonate strongly with intrinsic motivation research. The proliferation of hand-crafted intrinsic reward functions—tailored to mimic human motivations—contradicts the core lesson. Such approaches may fail to scale or generalise, undermining the potential of intrinsic motivation as a universal driver for RL.

### Searching for Scalable Intrinsic Motivation
Sutton advocates for search and learning as the primary tools to achieve generality. But how do we “search” or “learn” a reward function without relying on yet another reward? This creates a circular dependency: intrinsic rewards guide exploration, but how do we validate these rewards?

One answer lies in biology. Humans and animals evolved intrinsic motivators like curiosity and empowerment over generations, guided by survival and reproduction—a form of natural selection. These motivators were not “designed” but emerged as robust solutions in a competitive landscape. Can we replicate this evolutionary paradigm in AI?

### Conclusion
Intrinsic motivation holds immense promise for creating adaptive, generalised agents. But to truly harness its potential, we must heed the Bitter Lesson: resist the temptation to over-engineer solutions and instead embrace scalable, computation-driven methods. By aligning intrinsic motivation research with Sutton’s principles, we can move closer to building agents that learn and adapt with the breadth and efficiency of natural systems.