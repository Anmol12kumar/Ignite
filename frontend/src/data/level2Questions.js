export const level2Questions = [
    {
    id: 1,
    question:
        "Write a prompt that asks the AI to summarize a short article into 3 key points.",
    hint: "Be specific about the number of points and keep it simple.",
    sampleAnswer:
        'You are a librarian. Summarize the following article into exactly 3 key points. Keep each point to one sentence.\n\n"""\n[Paste article here]\n"""',
    keyPoints: [
        "Role: librarian",
        "Specific count: 3 points",
        "Format: one sentence each",
        "Uses delimiters for the source",
    ],
    },
    {
    id: 2,
    question:
        "Create a prompt that asks the AI to sort a list of books into Fiction or Non-Fiction.",
    hint: "Define the two categories clearly.",
    sampleAnswer:
        "Sort the following list of books into two categories: Fiction and Non-Fiction. Output as a simple list under each heading.\n\nBooks:\n- [list books here]",
    keyPoints: [
        "Two clear categories defined",
        "Simple output format",
        "Clear input section",
    ],
    },
    {
    id: 3,
    question:
        "Write a prompt that asks the AI to find the main idea of a paragraph.",
    hint: "Tell the AI exactly what to look for and how to answer.",
    sampleAnswer:
        'Read the paragraph below and tell me its main idea in one sentence.\n\nParagraph:\n"""\n[paste paragraph]\n"""',
    keyPoints: [
        "Clear task: find main idea",
        "Format: one sentence",
        "Uses delimiters for input",
    ],
    },
    {
    id: 4,
    question:
        "Create a prompt that asks the AI to extract all names of people from a passage.",
    hint: "Be clear about what you want extracted and how to list it.",
    sampleAnswer:
        'Extract all names of people mentioned in the passage below. List them as bullet points. Do not include duplicates.\n\nPassage:\n"""\n[paste passage]\n"""',
    keyPoints: [
    "Clear entity to extract: people names",
        "Output format: bullet points",
        "No duplicates rule",
    ],
    },
    {
    id: 5,
    question:
        "Write a prompt that asks the AI to recommend 3 books based on a favorite genre.",
    hint: "Treat the AI like a librarian giving advice.",
    sampleAnswer:
        "You are a friendly librarian. The reader's favorite genre is [genre]. Recommend 3 books they would enjoy. For each book, give the title, author, and a 1-sentence reason.",
    keyPoints: [
        "Role: friendly librarian",
        "Specific count: 3 books",
        "Structured info per book",
        "Includes reason for recommendation",
    ],
    },
    {
    id: 6,
    question:
        "Craft a prompt that asks the AI to rewrite a difficult paragraph in simpler words.",
    hint: "Define the audience and what to keep the same.",
    sampleAnswer:
        'Rewrite the following paragraph in simpler words for a 10th-grade student. Keep the main meaning the same and avoid difficult vocabulary.\n\nOriginal:\n"""\n[paste paragraph]\n"""',
    keyPoints: [
        "Target audience: 10th-grade student",
        "Simplification rule",
        "Preserves main meaning",
    ],
    },
    {
    id: 7,
    question:
        "Write a prompt that asks the AI to create 5 flashcards from a study topic.",
    hint: "Specify the front/back format.",
    sampleAnswer:
        "Create 5 study flashcards about [topic]. Format each as:\n\nQ: [question]\nA: [short answer]\n\nFocus on key terms and definitions.",
    keyPoints: [
        "Specific count: 5 flashcards",
        "Clear Q/A format",
        "Focus criteria defined",
    ],
    },
    {
    id: 8,
    question:
        "Create a prompt that asks the AI to answer a question only using a given document.",
    hint: "Tell the AI to stick to the source and what to do if the answer isn't there.",
    sampleAnswer:
        'Answer the question below using ONLY the document provided. If the answer is not in the document, say: "Not found in the document."\n\nDocument:\n"""\n[paste document]\n"""\n\nQuestion: [your question]',
    keyPoints: [
        "Constrains answer to source only",
        "Defines fallback for missing info",
        "Uses delimiters for the document",
    ],
    },
    {
    id: 9,
    question:
        "Write a prompt that asks the AI to compare two short summaries and pick the better one.",
    hint: "Give the AI simple criteria to judge by.",
    sampleAnswer:
        'Compare the two summaries below. Pick the one that is clearer and more accurate. Explain your choice in 2 sentences.\n\nSummary A: """[text]"""\nSummary B: """[text]"""',
    keyPoints: [
        "Clear comparison criteria: clarity & accuracy",
        "Requires a pick + reason",
        "Uses delimiters for inputs",
    ],
    },
    {
    id: 10,
    question:
        "Create a multi-step prompt that first lists the topics in an article, then writes a short note on one topic.",
    hint: "Use prompt chaining — list first, then expand.",
    sampleAnswer:
        'Step 1: Read the article below and list all the main topics it covers as a numbered list.\n\nStep 2: Pick the most important topic from the list.\n\nStep 3: Write a short study note (under 100 words) about that topic.\n\nArticle:\n"""\n[paste article]\n"""',
    keyPoints: [
        "Multi-step / chained approach",
        "Step 1: list topics",
        "Step 2: pick one",
        "Step 3: short note deliverable",
    ],
    },
];
