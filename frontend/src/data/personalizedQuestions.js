/**
 * Personalized Questions Utility
 * 
 * Maps user profession + domain to contextual question overrides.
 * For levels 1–10, we inject role-specific context into questions,
 * sample answers, and hints to make the learning experience relevant.
 */

// Domain display names for readable text
const domainLabels = {
  general: "general topics",
  science: "science",
  technology: "technology",
  business: "business",
  education: "education",
  healthcare: "healthcare",
  arts: "arts & creative writing",
  law: "law & compliance",
  finance: "finance & economics",
  marketing: "marketing",
  engineering: "engineering",
};

/**
 * Concept Mapping for Assessment Levels:
 * 0: Zero-Shot (Simple explanation)
 * 1: Few-Shot (Classification/Formatting)
 * 2: Persona / Role (Deep expertise)
 * 3: Delimiters & Format (Table/JSON)
 * 4: Negative Prompting / Constraints (Email/Comms)
 * 5: Instructions / Multi-Mistake (Problem/Solution)
 * 6: Code/Review / Analysis (Senior Persona)
 * 7: Structure / Template (JSON Plan)
 * 8: Analogies / Simplification (Complexity)
 * 9: Chain of Thought / Multi-Step (Prompt Chaining)
 */

const professionOverrides = {
  teacher: {
    0: {
      question: "Write a Zero-Shot prompt that asks an AI to explain what prompt engineering is in exactly 3 sentences for your class.",
      hint: "Zero-Shot means no examples. Think about how you would introduce a new term to students.",
      sampleAnswer: "You are a teacher. Explain what prompt engineering is in exactly 3 sentences for secondary school students. Focus on how it helps them get better homework help from AI.",
    },
    1: {
      question: "Write a Few-Shot prompt to classify student feedback into 'Positive', 'Neutral', or 'Needs Attention'.",
      hint: "Provide 2-3 examples of feedback and their classification first.",
      sampleAnswer: "Classify the following student feedback:\nFeedback: I loved the lab! -> Positive\nFeedback: The lecture was okay. -> Neutral\nFeedback: I don't understand the math. -> Needs Attention\nFeedback: This lesson is way too hard. ->",
    },
    2: {
      question: "Assign the AI a persona of a Senior Pedagogical Expert helping you design a curriculum for your domain.",
      hint: "Role-based prompting. Define the expertise level and specific goal.",
      sampleAnswer: "You are a Senior Pedagogical Expert with 20 years of experience in curriculum design. Help me structure a 4-week module for my students. Focus on active learning strategies and measurable outcomes.",
    },
    3: {
      question: "Create a prompt using Delimiters to summarize a teaching plan into a markdown table with columns: Topic, Activity, Duration.",
      hint: "Use triple quotes or tags to separate the plan from your instructions.",
      sampleAnswer: "Summarize the lesson plan below into a markdown table with columns: Topic, Activity, Duration.\n\n\"\"\"\n[Paste lesson plan text here]\n\"\"\"",
    },
    4: {
      question: "Write a prompt using Negative Prompting to draft a formal email to a parent declining a request without using the word 'unfortunately'.",
      hint: "Explicitly tell the AI what NOT to do to keep the tone positive and direct.",
      sampleAnswer: "Write a 100-word email to a parent declining their request for a grade change. Do not use the words 'unfortunately', 'no', or 'cannot'. Instead, explain the grading policy clearly and offer a review session.",
    },
    5: {
      question: "List 5 common mistakes teachers make when prompting AI for lesson plans, with a fix for each.",
      hint: "Ask for a structured list with problem/solution pairs.",
      sampleAnswer: "Identify 5 common mistakes teachers make when prompting for lesson plans (e.g. being too vague). For each, provide the mistake, why it fails, and a 'Fixed' prompt example.",
    },
    6: {
      question: "Act as an Academic Reviewer and analyze a student's essay for logic, evidence, and flow.",
      hint: "Senior role + specific review criteria.",
      sampleAnswer: "You are an Academic Reviewer. Analyze the following essay draft for: Logical consistency, quality of evidence, and transitions between paragraphs. Provide a score out of 10 and 3 actionable improvements.",
    },
    7: {
      question: "Generate a weekly classroom schedule in JSON format.",
      hint: "Specify the exact JSON keys you want.",
      sampleAnswer: "Generate a weekly classroom schedule in valid JSON. Use this structure: { 'day': '', 'period': '', 'subject': '', 'room': '' }. Include 5 different subjects.",
    },
    8: {
      question: "Explain a complex concept in your domain to a 5-year-old using a creative classroom analogy.",
      hint: "Simplification technique. Focus on the analogy.",
      sampleAnswer: "Explain the concept of [YOUR_TOPIC] to a 5-year-old student. Use an analogy involving a playground or a kitchen. Do not use technical jargon.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to design a final exam (Topics -> Questions -> Key).",
      hint: "Multi-step logic. Guide the AI through the process.",
      sampleAnswer: "Step 1: List 5 core topics from the syllabus. \nStep 2: For each topic, create one multiple-choice question. \nStep 3: Provide the correct answer and a 1-sentence explanation for each question.",
    }
  },

  developer: {
    0: {
      question: "Write a Zero-Shot prompt to explain what prompt engineering is for a DevOps team in 3 sentences.",
      hint: "Zero-Shot: direct instruction. Think about system inputs/outputs.",
      sampleAnswer: "You are a Lead Developer. Explain what prompt engineering is in 3 sentences to a team of DevOps engineers. Focus on how it optimizes LLM integration in our CI/CD pipeline.",
    },
    1: {
      question: "Write a Few-Shot prompt to convert natural language queries into SQL statements.",
      hint: "Provide examples of NL -> SQL mappings before the final query.",
      sampleAnswer: "Convert these queries to SQL:\nQuery: Show all users -> SELECT * FROM users;\nQuery: Users from Delhi -> SELECT * FROM users WHERE city='Delhi';\nQuery: Most recent orders ->",
    },
    2: {
      question: "Assign the AI a persona of a Staff Software Architect reviewing a system design document.",
      hint: "High seniority role. Specify the perspective (scaling, security, cost).",
      sampleAnswer: "You are a Staff Software Architect. Review the following system design for a high-traffic e-commerce platform. Focus on horizontal scalability, database sharding, and latency optimization.",
    },
    3: {
      question: "Use Delimiters to extract function names from a code snippet into a markdown list.",
      hint: "Use code blocks as delimiters. Tell the AI exactly what to extract.",
      sampleAnswer: "Extract all function names from the code block below and list them as bullet points in markdown.\n\n```\n[Paste code here]\n```",
    },
    4: {
      question: "Use Negative Prompting to refactor a function to be more efficient without using any external libraries.",
      hint: "Constraint: No libraries. Focus on vanilla implementation.",
      sampleAnswer: "Refactor the following Python function to reduce time complexity. Do not use any third-party libraries like NumPy or Pandas. Use only built-in Python 3.10 features.",
    },
    5: {
      question: "List 5 security risks in AI-generated code with a mitigation strategy for each.",
      hint: "Structured output for technical risks.",
      sampleAnswer: "List 5 security vulnerabilities commonly found in code generated by LLMs (e.g. hardcoded secrets). For each, provide the risk, an example, and a specific mitigation technique.",
    },
    6: {
      question: "Act as a Senior Security Engineer and conduct a security audit on a given API endpoint implementation.",
      hint: "Role-based technical review.",
      sampleAnswer: "You are a Senior Security Engineer. Audit the following Express.js route for security issues: SQL injection, XSS, Improper Authorization, and Rate Limiting. Suggest specific code fixes for every vulnerability found.",
    },
    7: {
      question: "Generate an API documentation schema in JSON format.",
      hint: "Template-based output.",
      sampleAnswer: "Generate a REST API documentation schema in valid JSON. Include: endpoint, method, params, and a sample 200 OK response for a 'Get User' request.",
    },
    8: {
      question: "Explain the concept of 'Recursion' or 'Pointers' using a real-world analogy a non-coder would understand.",
      hint: "Simplification. Avoid technical terms.",
      sampleAnswer: "Explain the concept of Recursion to a non-technical manager. Use an analogy from daily life (like Russian nesting dolls or a mirror). Keep it under 100 words.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to debug a crash (Logs -> Root Cause -> Fix).",
      hint: "Break the debugging process into logical steps.",
      sampleAnswer: "Step 1: Analyze the provided stack trace and list the likely failing file and line. \nStep 2: Explain the root cause of the error based on the logic. \nStep 3: Provide a corrected version of the function to prevent this crash.",
    }
  },

  marketer: {
    0: {
      question: "Write a Zero-Shot prompt for a 3-sentence ad copy explaining prompt engineering to small business owners.",
      hint: "Direct, catchy, and simple.",
      sampleAnswer: "You are a Copywriter. Write a 3-sentence ad for an AI workshop targeting small business owners. Explain how prompt engineering saves them 10 hours a week on social media.",
    },
    1: {
      question: "Write a Few-Shot prompt to generate catchy email subject lines based on a campaign theme.",
      hint: "Give 3 examples of Theme -> Subject Line.",
      sampleAnswer: "Generate subject lines:\nTheme: Summer Sale -> Hot Deals Inside! ☀️\nTheme: New Product -> Meet your new favorite tool.\nTheme: Back to School -> Ready for class?\nTheme: Black Friday ->",
    },
    2: {
      question: "Assign the AI a persona of a CMO with 15 years of experience in digital transformation.",
      hint: "Authority role. Ask for high-level strategy.",
      sampleAnswer: "You are a CMO. Create a high-level marketing strategy for a new AI startup. Focus on multi-channel acquisition, brand positioning, and customer retention metrics.",
    },
    3: {
      question: "Use Delimiters to summarize customer reviews into a markdown table with columns: Sentiment, Key Issue, Product.",
      hint: "Separate raw reviews from the instruction.",
      sampleAnswer: "Analyze the customer reviews below and summarize them into a markdown table (columns: Sentiment, Key Issue, Product).\n\n\"\"\"\n[Paste reviews here]\n\"\"\"",
    },
    4: {
      question: "Use Negative Prompting to write a social media post about AI without using the words 'revolution', 'game-changer', or 'magic'.",
      hint: "Force original writing by banning clichés.",
      sampleAnswer: "Write a LinkedIn post about how prompt engineering is a practical skill. Do not use the words 'revolution', 'disrupt', 'game-changer', 'magic', or 'unprecedented'. Focus on tangible productivity gains.",
    },
    5: {
      question: "List 5 mistakes marketers make when using AI for content creation, with a 'Better Way' for each.",
      hint: "Constructive list with comparisons.",
      sampleAnswer: "List 5 mistakes marketers make when prompting for blog content (e.g. asking for 'high quality' without defining it). For each, provide the mistake and a 'Better Way' prompt template.",
    },
    6: {
      question: "Act as a Brand Strategist and review a campaign pitch for consistency, target audience fit, and emotional impact.",
      hint: "Role-based critique.",
      sampleAnswer: "You are a Brand Strategist. Review the following campaign pitch. Evaluate it for: Brand voice consistency, resonance with the 'Gen Z' demographic, and clarity of the Call to Action (CTA).",
    },
    7: {
      question: "Generate a marketing campaign budget in JSON format.",
      hint: "Structured data for budgeting.",
      sampleAnswer: "Generate a quarterly marketing budget in valid JSON. Fields: 'channel', 'allocated_amount', 'target_leads', 'expected_roi'. Include 4 channels like 'Social Ads' and 'Email'.",
    },
    8: {
      question: "Explain the concept of 'Brand Equity' or 'SEO' using an analogy a local shop owner would understand.",
      hint: "Make it relatable to a physical business.",
      sampleAnswer: "Explain the concept of SEO to a local bakery owner. Use an analogy involving their physical storefront and a phonebook. Keep it simple and encouraging.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to plan a product launch (Teaser -> Launch -> Follow-up).",
      hint: "Sequential campaign planning.",
      sampleAnswer: "Step 1: Write a teaser tweet to build mystery. \nStep 2: Write a launch email focusing on benefits. \nStep 3: Write a follow-up LinkedIn post sharing early customer success stories.",
    }
  },

  researcher: {
    0: {
      question: "Write a Zero-Shot prompt to define prompt engineering for a research paper abstract in 3 sentences.",
      hint: "Formal, academic, and objective.",
      sampleAnswer: "You are a Research Assistant. Define prompt engineering in 3 formal sentences for an academic abstract. Focus on the optimization of Large Language Model responses through structured natural language inputs.",
    },
    1: {
      question: "Write a Few-Shot prompt to extract entities (Method, Sample Size, Result) from research abstracts.",
      hint: "Provide 2 examples of Abstract -> Entities first.",
      sampleAnswer: "Extract entities from this abstract:\n[ABSTRACT A] -> Method: Randomized Control; Size: 200; Result: Significant\n[ABSTRACT B] -> Method: Case Study; Size: 5; Result: Qualitative\n[ABSTRACT C] ->",
    },
    2: {
      question: "Assign the AI a persona of a Senior Peer Reviewer for a high-impact scientific journal.",
      hint: "Critical, rigorous persona. Define the review standards.",
      sampleAnswer: "You are a Senior Peer Reviewer for 'Nature'. Critically evaluate the following research methodology for potential biases, sample size adequacy, and statistical rigor. Provide a detailed critique.",
    },
    3: {
      question: "Use Delimiters to organize a list of citations into a markdown table (Author, Year, Main Finding).",
      hint: "Structure messy text into a clean table.",
      sampleAnswer: "Organize the citations below into a markdown table with columns: Author, Year, Main Finding.\n\n<citations>\n[Paste citations here]\n</citations>",
    },
    4: {
      question: "Use Negative Prompting to summarize a paper without using any passive voice or jargon.",
      hint: "Force active, clear writing for complex topics.",
      sampleAnswer: "Summarize the key findings of this study. Do not use passive voice. Do not use jargon like 'synergistic', 'paradigm shift', or 'utilize'. Write for an educated layperson.",
    },
    5: {
      question: "List 5 ethical risks of using AI in research, with a proposed guideline for each.",
      hint: "Structured ethical analysis.",
      sampleAnswer: "Identify 5 ethical risks of using LLMs in academic research (e.g. hallucinated citations). For each, provide the risk and a specific guideline for researchers to follow.",
    },
    6: {
      question: "Act as a Data Scientist and analyze a methodology section for statistical soundness.",
      hint: "Technical role-based review.",
      sampleAnswer: "You are a Data Scientist. Analyze the following methodology for statistical soundness. Check for: P-hacking risks, selection bias, and whether the chosen test matches the data type.",
    },
    7: {
      question: "Generate a research project timeline in JSON format.",
      hint: "Project management structure.",
      sampleAnswer: "Generate a 6-month research project timeline in valid JSON. Fields: 'phase', 'start_month', 'deliverables', 'responsible_party'.",
    },
    8: {
      question: "Explain the concept of 'Statistical Significance' using a real-world analogy a high school student would understand.",
      hint: "Simplify a hard concept without losing accuracy.",
      sampleAnswer: "Explain Statistical Significance to a high schooler. Use an analogy involving a coin toss or a sports game. Keep it under 100 words.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to conduct a Literature Review (Search -> Filter -> Synthesize).",
      hint: "Logical research workflow.",
      sampleAnswer: "Step 1: Suggest 5 keywords for a database search on [TOPIC]. \nStep 2: Explain the criteria for including or excluding a paper from the results. \nStep 3: Synthesize how these results would support a new research hypothesis.",
    }
  },

  healthcare: {
    0: {
      question: "Write a Zero-Shot prompt to explain prompt engineering to a patient in 3 sentences.",
      hint: "Empathetic, simple, and clinically appropriate.",
      sampleAnswer: "You are a Clinical Educator. Explain what prompt engineering is in 3 sentences to a patient who is curious about AI in medicine. Focus on how it helps doctors get more accurate information faster.",
    },
    1: {
      question: "Write a Few-Shot prompt to classify patient symptoms into 'Urgent', 'Routine', or 'Self-Care'.",
      hint: "Provide examples of Symptoms -> Triage Category.",
      sampleAnswer: "Triage these symptoms:\nChest pain -> Urgent\nMild cough -> Self-Care\nAnnual checkup -> Routine\nHigh fever + Confusion ->",
    },
    2: {
      question: "Assign the AI a persona of a Senior Medical Consultant with expertise in patient safety.",
      hint: "Professional authority role. Focus on safety and accuracy.",
      sampleAnswer: "You are a Senior Medical Consultant. Review the following patient discharge summary for potential errors, missing instructions, or ambiguities that could impact patient safety. Be extremely thorough.",
    },
    3: {
      question: "Use Delimiters to format a list of medications into a markdown table (Medication, Dosage, Frequency).",
      hint: "Structured clinical data formatting.",
      sampleAnswer: "Organize the medication list below into a markdown table (Medication, Dosage, Frequency).\n\n\"\"\"\n[Paste raw med list here]\n\"\"\"",
    },
    4: {
      question: "Use Negative Prompting to draft a patient email about a delayed appointment without using the word 'sorry'.",
      hint: "Focus on solutions and professionalism instead of apologies.",
      sampleAnswer: "Write an email to a patient to reschedule their appointment. Do not use the word 'sorry' or 'apologize'. Instead, state the new time, explain the focus on quality care, and provide a direct contact number for questions.",
    },
    5: {
      question: "List 5 risks of AI in clinical documentation with a mandatory check for each.",
      hint: "Safety-first structured list.",
      sampleAnswer: "Identify 5 risks when using AI for clinical notes (e.g. gender bias in notes). For each, provide the risk and a mandatory step a physician must take to verify the output.",
    },
    6: {
      question: "Act as a Medical Compliance Auditor and review a patient summary for HIPAA and documentation standards.",
      hint: "Compliance-focused role review.",
      sampleAnswer: "You are a Medical Compliance Auditor. Review the following patient summary for HIPAA compliance and clinical documentation standards. Identify any missing required fields or potential privacy risks.",
    },
    7: {
      question: "Generate a patient triage workflow in JSON format.",
      hint: "Logical data structure for healthcare.",
      sampleAnswer: "Generate a patient triage workflow in valid JSON. Structure: { 'step': '', 'action': '', 'decision_criteria': '' }. Include at least 5 steps for an ER intake.",
    },
    8: {
      question: "Explain the concept of 'Antibiotic Resistance' using an analogy a primary school child would understand.",
      hint: "Health education simplification.",
      sampleAnswer: "Explain Antibiotic Resistance to a 10-year-old. Use an analogy involving a fortress or a game of tag. Keep it clear and educational.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to create a Patient Care Plan (Diagnosis -> Goals -> Interventions).",
      hint: "Structured clinical reasoning.",
      sampleAnswer: "Step 1: Based on the symptoms provided, list 3 potential diagnoses. \nStep 2: For the primary diagnosis, define 3 SMART goals for patient recovery. \nStep 3: List 5 specific nursing interventions to achieve those goals.",
    }
  },

  "legal-finance": {
    0: {
      question: "Write a Zero-Shot prompt for a 3-sentence summary of prompt engineering for a compliance department.",
      hint: "Focus on accuracy, risk, and control.",
      sampleAnswer: "You are a Compliance Officer. Explain prompt engineering in 3 sentences for our legal department. Emphasize how structured inputs reduce the risk of AI hallucination in legal research.",
    },
    1: {
      question: "Write a Few-Shot prompt to extract key clauses (Liability, Termination, Indemnity) from contracts.",
      hint: "Provide examples of Clause Text -> Category.",
      sampleAnswer: "Classify these contract clauses:\n[TEXT A] -> Liability\n[TEXT B] -> Termination\n[TEXT C] -> Indemnity\n[TEXT D] ->",
    },
    2: {
      question: "Assign the AI a persona of a Senior Legal Partner with 20 years of experience in corporate law.",
      hint: "Rigorous, authoritative role. Focus on risk mitigation.",
      sampleAnswer: "You are a Senior Legal Partner. Review the following Master Services Agreement for hidden risks, unfavorable terms for our client, and gaps in intellectual property protection. Be precise.",
    },
    3: {
      question: "Use Delimiters to summarize financial data into a markdown table (Quarter, Revenue, Expenses).",
      hint: "Clean data structure from messy inputs.",
      sampleAnswer: "Organize the financial data below into a markdown table (Quarter, Revenue, Expenses).\n\n\"\"\"\n[Paste financial data here]\n\"\"\"",
    },
    4: {
      question: "Use Negative Prompting to write a client update about a portfolio dip without using the word 'market volatility'.",
      hint: "Avoid financial clichés to provide a clearer update.",
      sampleAnswer: "Draft a client update regarding their portfolio performance. Do not use the terms 'market volatility', 'headwinds', or 'unprecedented'. Explain the specific sector movements and our long-term strategy clearly.",
    },
    5: {
      question: "List 5 regulatory risks of using AI in finance, with a compliance check for each.",
      hint: "Risk-focused structured list.",
      sampleAnswer: "Identify 5 regulatory risks of using LLMs in financial advisory (e.g. fiduciary duty concerns). For each, provide the risk and a specific compliance check that must be performed.",
    },
    6: {
      question: "Act as a Financial Auditor and review a balance sheet for anomalies and reporting errors.",
      hint: "Precision-focused role review.",
      sampleAnswer: "You are a Financial Auditor. Analyze the following balance sheet for: Mathematical inconsistencies, unusual line items compared to last year, and missing disclosures required by GAAP.",
    },
    7: {
      question: "Generate a standard loan application structure in JSON format.",
      hint: "Standardized data schema.",
      sampleAnswer: "Generate a standard loan application data structure in valid JSON. Include fields for personal info, income verification, asset list, and credit score.",
    },
    8: {
      question: "Explain the concept of 'Inflation' or 'Compound Interest' using an analogy a student would understand.",
      hint: "Financial literacy simplification.",
      sampleAnswer: "Explain Compound Interest to a high schooler. Use an analogy involving a snowball or a growing tree. Keep it simple and use a small numeric example.",
    },
    9: {
      question: "Create a 3-step Chain of Thought prompt to conduct a Risk Assessment (Identify -> Analyze -> Mitigate).",
      hint: "Structured professional reasoning.",
      sampleAnswer: "Step 1: Identify 3 primary risks in the proposed merger. \nStep 2: Analyze the potential financial impact of each risk. \nStep 3: Propose a specific mitigation strategy for each identified risk.",
    }
  },

  other: {},
  student: {}, // Students use the default base questions
};

/**
 * Returns personalized questions by merging profession-specific overrides
 * with the base question set. Non-overridden questions remain unchanged.
 * 
 * @param {Array} baseQuestions - The original question array (e.g., level1Questions)
 * @param {string} profession - User's profession (student, teacher, developer, etc.)
 * @param {string} domain - User's domain focus (science, business, etc.)
 * @returns {Array} - Personalized question array
 */
export function getPersonalizedQuestions(baseQuestions, profession, domain) {
  const overrides = professionOverrides[profession] || {};
  const domainName = domainLabels[domain] || domain || "general topics";

  const conceptTags = [
    "ZERO-SHOT", "FEW-SHOT", "PERSONA", "DELIMITERS", "NEGATIVE PROMPT", 
    "INSTRUCTIONS", "CRITIQUE", "TEMPLATES", "ANALOGY", "CHAIN OF THOUGHT"
  ];

  return baseQuestions.map((q, index) => {
    const override = overrides[index];
    const concept = conceptTags[index % conceptTags.length];
    
    if (!override) {
      // Inject domain context into the hint even when there's no full override
      return {
        ...q,
        question: `[${concept}] ${q.question}`,
        hint: domain && domain !== "general"
          ? `${q.hint} Consider examples from ${domainName}.`
          : q.hint,
      };
    }

    // Merge override into question and add concept tag
    return {
      ...q,
      question: `[${concept}] ${override.question || q.question} (Focus: ${domainName})`,
      hint: override.hint || q.hint,
      sampleAnswer: override.sampleAnswer || q.sampleAnswer,
      keyPoints: override.keyPoints || q.keyPoints,
    };
  });
}


/**
 * Returns personalized challenge questions with role-relevant scenario wrapping.
 */
export function getPersonalizedChallengeQuestions(baseQuestions, profession, domain) {
  const domainName = domainLabels[domain] || domain || "your field";

  const professionContext = {
    student: "as a student",
    teacher: "as a teacher",
    developer: "as a software developer",
    marketer: "as a marketing professional",
    researcher: "as a researcher",
    healthcare: "as a healthcare professional",
    "legal-finance": "as a legal/finance professional",
    other: "in your professional role",
  };

  const context = professionContext[profession] || "in your role";

  const conceptTags = [
    "ZERO-SHOT", "FEW-SHOT", "PERSONA", "DELIMITERS", "NEGATIVE PROMPT", 
    "INSTRUCTIONS", "CRITIQUE", "TEMPLATES", "ANALOGY", "CHAIN OF THOUGHT"
  ];

  return baseQuestions.map((q, idx) => {
    const concept = conceptTags[idx % conceptTags.length];
    return {
      ...q,
      question: `[${concept} | ${context.toUpperCase()} | ${domainName.toUpperCase()}] ${q.question}`,
    };
  });
}

/**
 * Gets a welcome message personalized to the user's role and level.
 */
export function getPersonalizedWelcome(profession, domain, experienceLevel) {
  const domainName = domainLabels[domain] || domain || "your field";
  const levelMessages = {
    beginner: "We'll start with the fundamentals and build your confidence step by step.",
    intermediate: "You're ready to dive deeper into advanced techniques.",
    advanced: "Challenge yourself with complex, real-world prompting scenarios.",
  };

  const professionMessages = {
    student: `Perfect for students in ${domainName}! These challenges will sharpen your AI skills for academic work.`,
    teacher: `Designed for educators in ${domainName}! Learn to craft prompts that help you teach, assess, and create better materials.`,
    developer: `Built for developers in ${domainName}! Master prompts that improve your coding workflows and technical documentation.`,
    marketer: `Tailored for marketers in ${domainName}! Write prompts that generate copy, campaigns, and insights faster.`,
    researcher: `Crafted for researchers in ${domainName}! Use precise prompting to accelerate literature review, analysis, and writing.`,
    healthcare: `Adapted for healthcare professionals in ${domainName}! Learn to prompt responsibly for clinical documentation and patient communication.`,
    "legal-finance": `Specialized for legal/finance professionals in ${domainName}! Master prompts for contract review, compliance, and analysis.`,
    other: `Personalized for professionals in ${domainName}! Develop prompting skills that multiply your output.`,
  };

  return {
    headline: professionMessages[profession] || professionMessages.other,
    subtext: levelMessages[experienceLevel] || levelMessages.beginner,
  };
}
