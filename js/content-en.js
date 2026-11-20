/* =========================================================
   Ever Intelligent — English content for the AI needs check
   This file is loaded only on the English page (/en/).
   The Chinese version lives in js/main.js.
   ========================================================= */

window.SITE_TEXT_EN = {
  ROLES: [
    { id: 'biz', label: 'Business owner / manager' },
    { id: 'solo', label: 'Professional / freelancer / student' },
    { id: 'newbie', label: "I'm new to AI and just curious" },
  ],

  PAINS: {
    biz: {
      question: 'Got it. What would your company most like to improve right now?',
      options: [
        {
          label: 'Repetitive admin and reports take too long',
          title: 'Start by automating one recurring report',
          why: 'Repetitive, rule-based work is the best fit for AI, and the time saved is easy to see.',
          steps: [
            'List the 3 documents or reports your team produces every week',
            'Pick the one with the most fixed format and have AI draft it',
            'Have a colleague review it and track how much time each draft saves',
          ],
        },
        {
          label: "We can't keep up with customer questions",
          title: 'Build an FAQ reply assistant first',
          why: 'Most customer questions fall into a handful of themes. Organize those and replies get much faster.',
          steps: [
            'Collect the 20 most common recent questions and their standard answers',
            'Use AI to draft replies from that material, with a person approving each one',
            'Add new questions every month to steadily widen what it can handle',
          ],
        },
        {
          label: 'Marketing content takes too long to produce',
          title: 'Build a content workflow, not one-off posts',
          why: 'Set your brand voice and formats first, and AI output becomes consistent and usable.',
          steps: [
            'Gather 3–5 past pieces you like as templates',
            "Ask AI to draft next week's posts in that voice",
            'Pick and polish the drafts, and feed your usual edits back to the AI',
          ],
        },
        {
          label: "We want to adopt AI but don't know where to start",
          title: 'Start with a workflow audit',
          why: "Without a clear goal yet, the most effective first step is finding out where time actually goes.",
          steps: [
            'Ask each colleague to note the 3 tasks that take most of their week',
            'Circle the ones that are repetitive and follow a set process',
            'Pilot the smallest of those first',
          ],
        },
      ],
    },
    solo: {
      question: 'Great. What kind of work would you most like AI to help with?',
      options: [
        {
          label: 'Writing: emails, reports, proposals',
          title: 'Use AI as your writing partner',
          why: 'Writing is where AI is most mature. You can start today and feel the difference right away.',
          steps: [
            'Before your next email, list the key points and ask AI for a draft',
            'Tell it who the reader is and the tone you want (for example: to my manager, concise and formal)',
            'Save the versions you are happy with to reuse as examples',
          ],
        },
        {
          label: 'Organizing information, summaries and notes',
          title: 'Use AI as an information assistant',
          why: 'AI can produce a first summary of long documents, meeting notes or research in seconds.',
          steps: [
            'Paste in a long document and ask for the 5 key points',
            'Follow up with "What should I pay special attention to?"',
            'Always check important figures and conclusions against the original',
          ],
        },
        {
          label: 'Learning a new skill or preparing for an exam',
          title: 'Let AI be your one-on-one tutor',
          why: 'AI can explain things at your level and quiz you, which makes learning much more efficient.',
          steps: [
            'Tell AI your level and goal, and ask for a study plan',
            'When a concept is unclear, ask it to explain with an everyday example',
            'After each section, ask for a 5-question quiz to check your understanding',
          ],
        },
        {
          label: 'Starting a side business or personal brand',
          title: 'Use AI to go from idea to first version faster',
          why: 'Time is the scarcest thing early on. AI helps you get to a testable first version quickly.',
          steps: [
            'Talk through your skills and ideas with AI and narrow them to 3 directions',
            'Pick one and ask AI to draft an introduction and a content outline',
            'Publish something small first, watch the response, then adjust',
          ],
        },
      ],
    },
    newbie: {
      question: 'Welcome! Which of these sounds most like you?',
      options: [
        {
          label: "I've never used it and don't know what AI can do",
          title: 'Start by simply chatting with AI',
          why: "You don't need to learn anything technical. Asking questions like you would in a text message is the best way in.",
          steps: [
            'Pick a free AI chat tool and sign up',
            'Ask it something you genuinely want to know today',
            'Follow up with "Can you make that simpler?" and see how it adapts',
          ],
        },
        {
          label: "I've tried it, but the answers weren't very useful",
          title: 'Learn to ask clearly',
          why: 'The quality of AI answers depends mostly on how much context and how specific a request you give it.',
          steps: [
            'Include three things: who you are, what you need, and the format you want',
            "If you're not happy, say what's wrong and ask it to try again",
            'Save prompts that work well and build your own prompt notes',
          ],
        },
        {
          label: "I'm worried about privacy or wrong information",
          title: 'Build safe habits',
          why: 'That concern is reasonable. Once you know the boundaries, you can use AI with confidence.',
          steps: [
            "Don't enter ID numbers, passwords, account numbers or other sensitive data",
            'Double-check important facts and figures with a reliable source',
            'Treat AI as an assistant, not an authority: it drafts, you decide',
          ],
        },
        {
          label: 'I want to keep up, but there is too much information',
          title: 'Focus on one tool for one use',
          why: "You don't need to follow every headline. Getting good at one tool beats trying a little of everything.",
          steps: [
            'Choose one AI chat tool and ignore the others for now',
            'Pick one weekly task and use AI for it every time',
            'After two weeks, decide whether to expand',
          ],
        },
      ],
    },
  },

  EXPERIENCE: {
    question: 'How often do you (or your team) use AI today?',
    options: [
      { id: 'none', label: 'Almost never', tip: "You're just starting out, so keep every step as small as possible and aim for a quick win first." },
      { id: 'some', label: 'Occasionally, still learning', tip: 'You already have a foundation. The key now is turning scattered experiments into a regular habit.' },
      { id: 'often', label: 'Regularly', tip: "You're already comfortable, so you can go straight to linking several steps into a complete workflow." },
    ],
  },

  PACE: {
    question: 'Last question: how would you prefer to move forward?',
    options: [
      { id: 'self', label: "I'd like to try it myself first", service: 'Tool selection and training', serviceNote: 'Start with the steps above, and come to us when you get stuck choosing tools or learning how to use them.' },
      { id: 'guide', label: "I'd like someone to guide me", service: 'AI needs assessment', serviceNote: 'One conversation to map out your situation and build a starting plan made for you.' },
      { id: 'fast', label: 'I want to see results quickly', service: 'Workflow automation', serviceNote: 'We build a first version for this exact problem and prove it with real results.' },
      { id: 'team', label: 'I want my whole team to learn', service: 'Team training and coaching', serviceNote: 'Hands-on workshops designed for your team, with ongoing support after rollout.' },
    ],
  },

  UI: {
    hello: "Hi! I'm the AI advisor assistant 👋 I'll ask you 4 quick questions to find the right starting point for you with AI.",
    firstQ: 'First, which of these best describes you?',
    thanks: "Thanks for your answers! Based on your situation, here's what we recommend:",
    resultTag: 'Your AI starting plan',
    serviceFit: 'Recommended service: ',
    book: 'Book a consultation',
    again: 'Start over',
    formRole: { biz: 'Business owner / manager', solo: 'Professional / freelancer / student', newbie: 'New to AI' },
    formWrap: (title, label) => 'AI needs check result: ' + title + ' (' + label + ')',
    invalid: 'Please enter your name and a valid email address.',
    sending: 'Sending…',
    sent: "Thanks! We've received your request and will reply by email within two business days.",
    failed: 'Something went wrong. Please try again later, or email us at everintelligent.tw@gmail.com.',
  },
};
