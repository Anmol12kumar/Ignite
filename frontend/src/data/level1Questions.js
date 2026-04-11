export const level1Questions = [
    {
    id: 1,
    question:
        "Write a prompt that asks an AI to explain what prompt engineering is in exactly 3 sentences.",
    hint: "Be specific about the format and length constraint.",
    sampleAnswer:
        "You are a technical writer. Explain what prompt engineering is in exactly 3 sentences. Keep the language simple enough for a beginner to understand.",
    keyPoints: [
        "Specifies a role for the AI",
        "Clear task: explain prompt engineering",
        "Format constraint: exactly 3 sentences",
        "Audience level defined",
    ],
    },
    {
    id: 2,
    question:
        "Create a prompt that makes the AI summarize any given paragraph into bullet points.",
    hint: "Think about using delimiters to separate the instruction from the content.",
    sampleAnswer:
        'Summarize the following paragraph into concise bullet points. Each bullet should capture one key idea.\n\n"""\n[Paste paragraph here]\n"""',
    keyPoints: [
        "Uses delimiters (triple quotes) to separate content",
        "Specifies output format: bullet points",
        "Defines what each bullet should contain",
    ],
    },
    {
    id: 3,
    question:
        "Write a prompt that assigns the AI a persona of a friendly teacher explaining loops in programming to a 10-year-old.",
    hint: "Use role-based prompting and define the audience clearly.",
    sampleAnswer:
        "You are a friendly and patient elementary school teacher. Explain what loops are in programming to a 10-year-old student. Use a fun real-world analogy, avoid jargon, and keep it under 100 words.",
    keyPoints: [
        "Clear role assignment: friendly teacher",
        "Specific topic: loops in programming",
        "Target audience: 10-year-old",
        "Constraints: analogy, no jargon, word limit",
    ],
    },
    {
    id: 4,
    question:
        "Craft a prompt that asks AI to compare two programming languages (Python vs JavaScript) in a markdown table.",
    hint: "Specify the exact format and the comparison criteria.",
    sampleAnswer:
        "Compare Python and JavaScript in a markdown table with the following columns: Feature, Python, JavaScript. Include rows for: typing system, primary use case, learning curve, package manager, and community size.",
    keyPoints: [
        "Specifies output format: markdown table",
        "Defines exact columns",
        "Lists specific comparison criteria",
        "Two clear subjects to compare",
    ],
    },
    {
    id: 5,
    question:
        "Write a prompt that instructs the AI to generate a professional email declining a meeting invitation politely.",
    hint: "Define the tone, context, and any constraints.",
    sampleAnswer:
        "Write a professional email to decline a meeting invitation. The tone should be polite and appreciative. Mention that you have a scheduling conflict, suggest an alternative time next week, and keep the email under 80 words.",
    keyPoints: [
        "Clear task: decline meeting",
        "Tone specified: polite, professional",
        "Context: scheduling conflict",
        "Action item: suggest alternative",
        "Length constraint",
    ],
    },
    {
    id: 6,
    question:
        "Create a prompt that makes the AI list 5 common mistakes beginners make when writing prompts, with a fix for each.",
    hint: "Ask for structured output with both the problem and solution.",
    sampleAnswer:
        "List 5 common mistakes that beginners make when writing AI prompts. For each mistake, provide:\n1. The mistake\n2. Why it's a problem\n3. A corrected example\n\nFormat each as a numbered item with clear sub-points.",
    keyPoints: [
        "Specific count: 5 mistakes",
        "Structured output with sub-points",
        "Asks for both problem and solution",
        "Clear formatting instructions",
    ],
    },
    {
    id: 7,
    question:
        "Write a prompt that asks the AI to act as a code reviewer and find bugs in a given code snippet.",
    hint: "Assign a role and tell the AI what to look for specifically.",
    sampleAnswer:
        "You are a senior software engineer conducting a code review. Analyze the following code snippet for:\n- Syntax errors\n- Logic bugs\n- Performance issues\n- Security vulnerabilities\n\nFor each issue found, explain the problem and suggest a fix.\n\n```\n[paste code here]\n```",
    keyPoints: [
        "Role: senior software engineer",
        "Specific review criteria listed",
        "Asks for explanation + fix",
        "Uses code block delimiter",
    ],
    },
    {
    id: 8,
    question:
        "Craft a prompt that generates a daily workout plan in JSON format.",
    hint: "Specify the exact JSON structure you want.",
    sampleAnswer:
        'Generate a beginner-friendly daily workout plan in valid JSON format. Use this structure:\n{\n  "day": "Monday",\n  "focus": "Upper Body",\n  "exercises": [\n    { "name": "...", "sets": 3, "reps": 12, "rest": "60s" }\n  ],\n  "duration": "30 min"\n}\n\nInclude 5 exercises.',
    keyPoints: [
        "Output format: JSON",
        "Provides exact structure template",
        "Defines difficulty level",
        "Specifies exercise count",
    ],
    },
    {
    id: 9,
    question:
        "Write a prompt that makes the AI explain a complex topic (quantum computing) using an analogy a child would understand.",
    hint: "Constrain the explanation method and audience level.",
    sampleAnswer:
        "Explain quantum computing to a 7-year-old using a simple analogy from everyday life. Do not use any technical terms. Keep the explanation under 5 sentences and make it fun and engaging.",
    keyPoints: [
        "Specific topic: quantum computing",
        "Target audience: 7-year-old",
        "Method: everyday analogy",
        "Constraints: no jargon, sentence limit",
        "Tone: fun and engaging",
    ],
    },
    {
    id: 10,
    question:
        "Create a multi-step prompt that first brainstorms ideas for a blog post, then picks the best one, then writes an outline.",
    hint: "Use prompt chaining — break it into sequential steps.",
    sampleAnswer:
        "Step 1: Brainstorm 5 unique blog post ideas about productivity tips for remote workers.\n\nStep 2: From the 5 ideas above, select the one with the most potential for engagement. Explain why you chose it in 1 sentence.\n\nStep 3: Create a detailed outline for the selected blog post with: a compelling title, 5 main sections with subpoints, and a conclusion.",
    keyPoints: [
        "Multi-step / chained approach",
        "Each step builds on the previous",
        "Clear deliverable at each step",
        "Final output is structured outline",
    ],
    },
];
