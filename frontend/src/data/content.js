// ─── Why It Matters ───────────────────────────────────────────────────────────
export const whyItMatters = [
    {
    n: "01",
    text: "AI is only as good as the instructions you give it. Vague prompts produce vague results.",
    },
    {
    n: "02",
    text: "Companies are hiring prompt engineers at $120K–$300K salaries. It's a real, in-demand skill.",
    },
    {
    n: "03",
    text: "Whether you're a developer, marketer, writer, or student — prompt skills multiply your output.",
    },
    {
    n: "04",
    text: "As AI models grow more capable, the gap between a good and bad prompt widens dramatically.",
    },
];

// ─── Types of Prompts ────────────────────────────────────────────────────────
export const promptTypes = [
    {
    title: "Instructional Prompts",
    desc: 'Direct commands telling the AI exactly what to do. "Summarize this article in 3 bullet points" — simple, clear, action-oriented.',
    },
    {
    title: "Conversational Prompts",
    desc: "Back-and-forth dialogue where context builds over multiple turns. Great for brainstorming, coaching, and iterative refinement.",
    },
    {
    title: "Role-Based Prompts",
    desc: 'Assign the AI a persona — "You are a senior data scientist" — to shape its expertise, tone, and depth of response.',
    },
    {
    title: "Creative Prompts",
    desc: "Open-ended prompts designed for storytelling, ideation, and generating novel content. Balance freedom with enough constraints.",
    },
    {
    title: "Analytical Prompts",
    desc: "Structured prompts for data interpretation, comparison, evaluation, and critical reasoning tasks.",
    },
    {
    title: "Template Prompts",
    desc: "Reusable prompt frameworks with placeholders — fill in the blanks for consistent, repeatable results across tasks.",
    },
];

// ─── Techniques ──────────────────────────────────────────────────────────────
export const techniques = [
    {
    number: "01",
    title: "Zero-Shot Prompting",
    desc: "Ask the model to perform a task without any examples. Works best for straightforward tasks where the model has strong built-in knowledge.",
    },
    {
    number: "02",
    title: "Few-Shot Prompting",
    desc: "Provide 2–5 examples in your prompt to teach the model the pattern you want. The AI learns your desired format and style from the examples.",
    },
    {
    number: "03",
    title: "Chain-of-Thought (CoT)",
    desc: 'Ask the model to "think step by step." Breaks complex reasoning into explicit intermediate steps, dramatically improving accuracy on logic tasks.',
    },
    {
    number: "04",
    title: "Self-Consistency",
    desc: "Generate multiple reasoning paths and select the most common answer. Reduces errors by leveraging the wisdom of multiple attempts.",
    },
    {
    number: "05",
    title: "Prompt Chaining",
    desc: "Connect multiple prompts in sequence — each output feeds the next prompt. Build sophisticated multi-step workflows for complex tasks.",
    },
    {
    number: "06",
    title: "Tree of Thought",
    desc: "Explore multiple reasoning branches simultaneously, evaluate each path, and backtrack from dead ends. Advanced technique for complex problem-solving.",
    },
    {
    number: "07",
    title: "ReAct (Reason + Act)",
    desc: "Combine reasoning with action-taking. The model thinks, then acts (searches, calculates), then observes the result and continues reasoning.",
    },
    {
    number: "08",
    title: "Retrieval-Augmented Generation",
    desc: "Ground the model's responses in external data. Pull in relevant documents, databases, or web results to make outputs factual and current.",
    },
];

// ─── Applications ────────────────────────────────────────────────────────────
export const applications = [
    {
    field: "Software Development",
    example:
        "Generate code, debug errors, write tests, create documentation — all guided by precise prompts.",
    },
    {
    field: "Content & Marketing",
    example:
        "Write copy, generate ad variations, create SEO content, build email sequences at scale.",
    },
    {
    field: "Education",
    example:
        "Create personalized tutoring, generate quizzes, explain complex topics at any level.",
    },
    {
    field: "Research & Analysis",
    example:
        "Summarize papers, extract insights, compare methodologies, synthesize literature reviews.",
    },
    {
    field: "Healthcare",
    example:
        "Draft patient summaries, assist with differential diagnosis, simplify medical information.",
    },
    {
    field: "Legal & Finance",
    example:
        "Review contracts, generate compliance checklists, analyze financial reports, draft memos.",
    },
];

// ─── Challenges & Mistakes ───────────────────────────────────────────────────
export const challenges = [
    "Ambiguity — natural language is inherently imprecise, making it hard to guarantee consistent outputs.",
    "Model hallucinations — AI can generate confident but completely fabricated information.",
    "Context window limits — every model has a maximum input size, forcing trade-offs in complex tasks.",
    "Prompt injection attacks — malicious inputs can override your instructions and compromise safety.",
    "Evaluation difficulty — measuring prompt quality is subjective and context-dependent.",
    "Version sensitivity — the same prompt can produce different results across model versions.",
];

// ─── Common Beginner Mistakes ───────────────────────────────────────────────
export const beginnerMistakes = [
    'Being too vague — "Write something about marketing" gives the AI nothing specific to work with.',
    "Overloading a single prompt — cramming 5 tasks into one prompt when they should be separate.",
    "Ignoring the system prompt — not setting context, role, or constraints at the start.",
    "Not iterating — accepting the first output instead of refining the prompt through multiple tries.",
    "Copy-pasting blindly — using prompts from the internet without understanding why they work.",
    "Forgetting output format — not specifying if you want a list, JSON, paragraph, or table.",
];

// ─── Best Practices ──────────────────────────────────────────────────────────
export const bestPractices = [
    {
    rule: "Be specific",
    detail:
        'Replace "tell me about dogs" with "List 5 hypoallergenic dog breeds under 15kg, with temperament and grooming needs."',
    },
    {
    rule: "Set the role",
    detail:
        'Start with "You are a [role] with expertise in [domain]" to anchor the model\'s perspective and vocabulary.',
    },
    {
    rule: "Define the format",
    detail:
        "Explicitly request JSON, markdown tables, bullet points, or numbered steps — don't leave it to chance.",
    },
    {
    rule: "Add constraints",
    detail:
        "Set word limits, tone guidelines, audience level, and what NOT to include. Constraints sharpen output.",
    },
    {
    rule: "Iterate relentlessly",
    detail:
        "Treat your first prompt as a draft. Analyze the output, identify gaps, and refine. 3–5 iterations is normal.",
    },
    {
    rule: "Use delimiters",
    detail:
        "Wrap input data in triple quotes, XML tags, or markdown code blocks to separate instructions from content.",
    },
    {
    rule: "Give examples",
    detail:
        "When the desired output format is complex, show one example of what a perfect response looks like.",
    },
    {
    rule: "Break complex tasks",
    detail:
        "Split a big job into subtasks. Chain prompts where each handles one clear step.",
    },
];

// ─── History Timeline ────────────────────────────────────────────────────────
export const timeline = [
    {
    year: "2018",
    event:
        "GPT-1 released by OpenAI — 117M parameters. Researchers begin experimenting with natural language task instructions.",
    },
    {
    year: "2019",
    event:
        'GPT-2 shows emergent abilities. "Prompt" as a concept gains traction in NLP research circles.',
    },
    {
    year: "2020",
    event:
        "GPT-3 launches with 175B parameters. Few-shot prompting is demonstrated — prompt engineering is born as a discipline.",
    },
    {
    year: "2022",
    event:
        "Chain-of-Thought prompting paper published. ChatGPT launches and prompt engineering enters mainstream awareness.",
    },
    {
    year: "2023",
    event:
        "Prompt engineering becomes a formal job role. Techniques like Tree of Thought, ReAct, and RAG mature rapidly.",
    },
    {
    year: "2024–25",
    event:
        "Multi-modal prompting (text + image + audio). Automated prompt optimization tools emerge. The field accelerates.",
    },
];

// ─── Future Trends ───────────────────────────────────────────────────────────
export const futureTrends = [
    {
    title: "Auto-Prompt Optimization",
    desc: "AI systems that automatically refine and improve prompts — but understanding the fundamentals will remain essential for oversight.",
    },
    {
    title: "Multi-Modal Prompting",
    desc: "Combining text, images, audio, and video in prompts. New modalities mean new prompting strategies to master.",
    },
    {
    title: "Agent-Based Systems",
    desc: "Prompts that orchestrate multiple AI agents working together. Prompt engineers will design entire agent workflows.",
    },
    {
    title: "Domain-Specific Prompting",
    desc: "Specialized techniques for medicine, law, finance, and science — each field developing its own best practices.",
    },
];

// ─── How We Help Steps ───────────────────────────────────────────────────────
export const howWeHelpSteps = [
    {
    step: "01",
    title: "Create your account",
    desc: "Sign up in seconds. Your progress, scores, and badges are saved to your profile.",
    },
    {
    step: "02",
    title: "Pick a topic",
    desc: "Choose from any concept — zero-shot, chain-of-thought, prompt chaining, and more.",
    },
    {
    step: "03",
    title: "Play the quiz",
    desc: "Answer questions, solve prompt challenges, and get instant feedback on your choices.",
    },
    {
    step: "04",
    title: "Level up & compete",
    desc: "Earn XP for every correct answer. Climb the leaderboard. Unlock advanced challenges.",
    },
];

// ─── Navigation Links ────────────────────────────────────────────────────────
export const navLinks = [
    { label: "What", href: "#what" },
    { label: "Techniques", href: "#techniques" },
    { label: "Learn", href: "#how-we-help" },
];
