export const level3Questions = [
    {
    id: 1,
    question:
        "Write a prompt that asks the AI to translate a sentence from English to French.",
    hint: "Say what to translate and into which language.",
    sampleAnswer:
        'Translate the following sentence from English to French. Only return the translation.\n\nSentence: """[paste sentence]"""',
    keyPoints: [
        "States task: translate",
        "Specifies source language",
        "Specifies target language",
        "Uses delimiters for the input",
    ],
    },
    {
    id: 2,
    question:
        "Create a prompt that translates a paragraph from English to Spanish in a friendly tone.",
    hint: "Mention the tone you want.",
    sampleAnswer:
        'Translate the paragraph below from English to Spanish. Use a friendly, casual tone.\n\nParagraph:\n"""\n[paste paragraph]\n"""',
    keyPoints: [
        "Source and target language",
        "Specifies tone (friendly)",
        "Uses delimiters for input",
    ],
    },
    {
    id: 3,
    question:
        "Write a prompt that asks the AI to translate a short text and also explain any tricky words.",
    hint: "Ask for two things: translation + word notes.",
    sampleAnswer:
        'Translate the text below into Hindi. After the translation, list any tricky words with a 1-line explanation in English.\n\nText: """[paste text]"""',
    keyPoints: [
        "Asks for translation",
        "Asks for word explanations",
        "Specifies target language",
    ],
    },
    {
    id: 4,
    question:
        "Craft a prompt that asks the AI to translate a sentence into 3 different languages at once.",
    hint: "List the 3 languages clearly.",
    sampleAnswer:
        'Translate the sentence below into French, German, and Japanese. Label each translation with the language name.\n\nSentence: "[paste sentence]"',
    keyPoints: [
        "Names 3 target languages",
        "Asks for labels per language",
        "Single source sentence",
    ],
    },
    {
    id: 5,
    question:
        "Write a prompt that translates a phrase and gives a more natural, local way to say it.",
    hint: "Ask for both literal and natural versions.",
    sampleAnswer:
        'Translate the phrase below into Italian. Give two versions:\n1. A literal translation\n2. A more natural, everyday way a local would say it\n\nPhrase: "[paste phrase]"',
    keyPoints: [
        "Specifies target language",
        "Asks for literal version",
        "Asks for natural / local version",
    ],
    },
    {
    id: 6,
    question:
        "Create a prompt that asks the AI to translate a poem while keeping its rhyme.",
    hint: "Tell the AI what to preserve.",
    sampleAnswer:
        'Translate the short poem below from English to French. Try to keep a similar rhyme scheme and feeling.\n\nPoem:\n"""\n[paste poem]\n"""',
    keyPoints: [
        "Source and target language",
        "Asks to preserve rhyme",
        "Mentions feeling / style",
    ],
    },
    {
    id: 7,
    question:
        "Write a prompt that asks the AI to act as a translator and only return the translated text.",
    hint: "Use a role and an output rule.",
    sampleAnswer:
        'You are a professional translator. Translate the following from English to German. Return ONLY the translated text — no extra explanations.\n\nText: "[paste text]"',
    keyPoints: [
        "Role: translator",
        "Specifies source and target language",
        "Output rule: only translation",
    ],
    },
    {
    id: 8,
    question:
        "Craft a prompt that translates a customer message and replies politely in the same language.",
    hint: "Two steps: translate, then reply.",
    sampleAnswer:
        'Step 1: Translate the customer message below into English so I can understand it.\nStep 2: Write a polite reply in the original language of the message.\n\nMessage: """[paste message]"""',
    keyPoints: [
        "Step 1: translation to English",
        "Step 2: polite reply",
        "Reply in original language",
    ],
    },
    {
    id: 9,
    question:
        "Write a prompt that translates a recipe into another language and keeps the steps numbered.",
    hint: "Mention the format you want kept.",
    sampleAnswer:
        'Translate the recipe below into Spanish. Keep the numbered steps and the ingredient list exactly the same format.\n\nRecipe:\n"""\n[paste recipe]\n"""',
    keyPoints: [
        "Target language",
        "Keep numbered steps",
        "Keep ingredient list format",
    ],
    },
    {
    id: 10,
    question:
        "Create a prompt that translates a short text and rates how confident the AI is in the translation.",
    hint: "Ask for translation + a confidence note.",
    sampleAnswer:
        'Translate the text below into Mandarin Chinese. After the translation, add a confidence rating from 1–10 and a 1-line note about anything that was hard to translate.\n\nText: "[paste text]"',
    keyPoints: [
        "Target language specified",
        "Asks for confidence rating",
        "Asks for note on difficulty",
    ],
    },
];
