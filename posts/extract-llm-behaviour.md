## Extracting LLM Behaviours Without Prompting

As mechanistic interpretability struggles to deliver high-level insights into large language models (LLMs), we are left asking: *How can we extract high-level concepts, such as behaviours, personalities, goals, or skills, from LLMs in an automated and systematic way?* This question explores not just what LLMs know but *how* they exhibit distinct behavioural patterns based on prompts and latent features.

One promising idea is to borrow techniques from **mutual-information (MI)-based unsupervised skill discovery**. In reinforcement learning (RL), these approaches are often used to identify latent skills or behaviours by maximising the mutual information between a sampled skill latent and the resulting state transitions. Could this method similarly be applied to LLMs to extract and condition behaviours in a structured fashion?

---

### Mutual Information-Based Skill Discovery
#### Foundations
In unsupervised skill discovery, we begin with a *skill latent vector* \( z \), sampled from a predefined distribution. The aim is to maximise the mutual information \( I(z; s') \) between the selected skill \( z \) and the resulting state transitions \( s' \):

\[ I(z; s') = H(z) - H(z | s') \]

By doing so, the learned behaviours (skills) become both distinguishable and diverse.

#### Analogous Approaches in RL
- **Meta-RL**: Embedding latent context vectors to adapt policies across tasks.
- **Goal-Conditioned RL (GCRL)**: Leveraging goal embeddings to represent target states.

These methods share a common goal: *extract structured representations of behaviours* that maximise MI while maintaining semantic coherence with the environment.

---

### Applying Skill Discovery to LLMs
#### The Hypothesis
Pretrained LLMs, exposed to vast and diverse datasets, encode **multiple distinct behavioural patterns**. These behaviours emerge based on the **prompt structure** and conditioning. For example, imagine an LLM pretrained on data from two personalities: *"happy guy"* and *"sad guy"*. If prompted specifically, the LLM exhibits behaviour consistent with one of these personalities. However, a neutral prompt might produce an averaged response between these two extremes.

The challenge becomes learning a mapping from a *latent skill vector* \( z \) to behavioural outputs such that distinct behaviours can be systematically extracted. This avoids reliance on ad-hoc prompts and instead uses structured, automated discovery.

---

### Challenges & Open Questions

1. **Large Action Space**: LLMs operate in a massive action space—continuous probabilities over tokens—making direct MI maximisation non-trivial.
   - *Key Idea*: We cannot maximise MI arbitrarily; the output must remain **semantically consistent** with the input prompt.

2. **Weight Finetuning**: Should conditioning on a new latent vector involve:
   - Finetuning all weights?
   - Adjusting only the input embedding space?
   - Selecting tokens from the original logits?

   Each approach has distinct implications:
   - Full finetuning risks overwriting pretrained knowledge.
   - Embedding-only finetuning may enable minimal deviation while conditioning on latent behaviours.
   - Logit-based selection aligns with empowerment principles—maximising mutual information under a conditioned policy.

3. **Avoiding Trivial Solutions**: How do we prevent latent skills that are trivially distinguishable but not diverse or meaningful?
   - *Entropy Regularisation*: Maximise entropy over logits to encourage diverse outputs.
   - *Weight Regularisation*: Constrain post-conditioning weight changes to ensure the model remains close to its pretrained state.
   
4. **Efficient MI Estimation**: Measuring MI is computationally expensive. Can we use contrastive methods such as **Noise-Contrastive Estimation (NCE)**?
   - Positive samples: Outputs conditioned on the same skill.
   - Negative samples: Outputs conditioned on different skills.

5. **Semantic Meaningfulness**: What guarantees that the discovered skills are *semantically meaningful*? For instance, can we identify behavioural patterns that are:
   - Diverse & distinguishable?
   - High in mutual information?
   - Minimal in deviation from pretrained outputs?

---

### A Practical Framework
The theory can be formalised as follows:

1. **Skill Latent Vector**: Introduce a latent vector \( z \) sampled from a fixed distribution.
2. **Behavioural Conditioning**: Condition the LLM on \( z \) such that \( I(z; y) \) is maximised, where \( y \) is the model's output.
3. **Regularisation**: Include constraints to:
   - Minimise deviation from the original pretrained outputs (e.g., weight regularisation).
   - Encourage output diversity (e.g., entropy maximisation).
4. **Efficient MI Maximisation**: Use NCE to estimate MI between skills and outputs efficiently:
   - Positive pairs: Outputs from the same skill latent.
   - Negative pairs: Outputs from different skill latents.

By doing so, the LLM can be systematically probed to extract behavioural dimensions encoded in its latent space.

---

### Simplified Approach: Conditioned Decoder
An alternative, simpler strategy involves introducing a **conditioned decoder**:
- Modify the decoding process to incorporate skill latents \( z \) while ensuring the output logits remain as close as possible to the original outputs.
- This maintains semantic consistency while allowing latent skill discovery.

---

### In Conclusion
LLMs are pretrained on vast corpora and implicitly encode diverse behavioural patterns. Mutual information-based unsupervised skill discovery offers a systematic approach to extract these behaviours by conditioning on latent vectors. The key challenges—MI estimation, semantic coherence, and model regularisation—can be addressed through techniques like NCE and weight constraints.

By probing latent behavioural dimensions, we open the door to a deeper understanding of LLM personalities, goals, and values, enabling more structured and interpretable model conditioning.