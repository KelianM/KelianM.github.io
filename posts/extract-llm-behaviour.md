## Extracting LLM Behaviours Without Prompting

As mechanistic interpretability struggles to deliver high-level insights into large language models (LLMs), we are left asking: *How can we extract high-level concepts, such as behaviours, personalities, goals, or skills, from LLMs in an automated and systematic way?* This question explores not just what LLMs know but *how* they exhibit distinct behavioural patterns based on prompts and latent features.

One promising idea is to borrow techniques from **mutual-information (MI)-based unsupervised skill discovery**. In reinforcement learning (RL), these approaches are often used to identify latent skills or behaviours by maximising the mutual information between a sampled skill latent and the resulting state transitions. Could this method similarly be applied to LLMs to extract and condition behaviours in a structured fashion?

---

### Mutual Information-Based Skill Discovery
#### Foundations
In unsupervised skill discovery, we begin with a *skill latent vector* \( z \), sampled from a predefined distribution. The aim is to maximise the mutual information \( I(z; s') \) between the selected skill \( z \) and the resulting state transitions \( s' \):

\[ I(z; s') = H(z) - H(z | s') \]

By doing so, the learned behaviours (skills) become both distinguishable and diverse. Similar approaches of behaviour being conditioned on some latent have been used in other paradigms of RL as well, such as:

- **Meta-RL**: Embedding latent context vectors to adapt policies across tasks.
- **Goal-Conditioned RL (GCRL)**: Leveraging goal embeddings to represent target states.

These methods share a common goal: *extract structured representations of behaviours* that maximise MI while maintaining semantic coherence with the environment.

---

### Applying Skill Discovery to LLMs
#### The Hypothesis
Pretrained LLMs, exposed to vast and diverse datasets, encode **multiple distinct behavioural patterns**. These behaviours emerge based on the **prompt structure** and conditioning. For example, imagine an LLM pretrained on data from two personalities: *"happy guy"* and *"sad guy"*. If prompted specifically, the LLM exhibits behaviour consistent with one of these personalities. However, a neutral prompt might produce an averaged response between these two extremes.

But what if some of these behaviours are bad, and undesirable for real-life converstations? We often can't guarantee that our training data only contains behaviours we want to reproduce, which is why techniques like RLHF exist. Techniques like systems prompts or RLHF are limited because they rely on human-defined preferences or instructions, which can be inconsistent, incomplete, and fail to address all harmful behaviours in diverse contexts.

Thus, can we extract good and bad behaviours from the LLM in an unsupervised manner, avoiding human uncertainty? The challenge can be represented as learning a mapping from a *latent skill vector* \( z \) to behavioural outputs such that distinct behaviours can be systematically extracted. This avoids reliance on ad-hoc prompts and instead uses structured, automated discovery.

---

### Challenges & Open Questions

1. **Large Action Space**: LLMs operate in an immense action space—continuous probabilities over tokens—making direct MI maximisation complex. A common approach to simplify MI estimation is **Noise-Contrastive Estimation (NCE)**. However, even with a single output regressor, skills must be determined across vocabularies of tens of thousands of words, which combine into exponentially more sentences. Simplification may be necessary—perhaps narrowing the scope to the vocabulary the original LLM is likely to use (e.g., top-K sampling).

2. **Weight Finetuning**: MI-based skill learners are typically used for pretraining, but here we work with a pretrained agent. How should this influence conditioning on a new latent vector? Options include:
   - Finetuning all weights: Risks overwriting pretrained knowledge.
   - Adjusting only the input embedding space: Potentially effective but vulnerable to prompt-based attacks that directly manipulate inputs.
   - Selecting tokens from original logits: This would make the problem much more tractable, since we are only looking at model outputs. But can we obtain meangful skills just based on the logit sampling strategy?

3. **Semantic Meaningfulness**: How can we ensure discovered skills are *semantically meaningful*? For example, can we identify behavioural patterns that are:
   - Diverse and distinguishable?
   - Consistent with likely outputs from the original LLM?
   - Representing clear, meaningful behavioural classes (e.g., a skill representing "dishonest" behaviour)?
  
Perhaps we can address this with some weight regularisation during policy conditioning to keep the new weights small. This should make the response as close as possible to the original response. However, while this might guarantee a semantically coherent answer, it doesn't necessarily mean each skill will be meaningful.
---

### In Conclusion
LLMs are pretrained on vast corpora and implicitly encode diverse behavioural patterns. Mutual information-based unsupervised skill discovery offers a systematic approach to extract these behaviours by conditioning on latent vectors. The key challenges—MI estimation, semantic coherence, and model regularisation—can be addressed through techniques like NCE and weight constraints.

By probing latent behavioural dimensions, we open the door to a deeper understanding of LLM personalities, goals, and values, enabling more structured and interpretable model conditioning.