export const SERVICES = [
  {
    id: 'research-guidance',
    title: 'Research Guidance',
    description:
      'Expert guidance through every stage of your research journey, from topic selection to methodology design.',
    icon: 'Search',
    price: 'Starting from $49',
    features: [
      'Topic selection and refinement',
      'Research question development',
      'Methodology consultation',
      'Research design review',
      'Progress check-ins',
    ],
  },
  {
    id: 'dissertation-thesis',
    title: 'Dissertation & Thesis Support',
    description:
      'Comprehensive support for your dissertation or thesis from proposal to final submission.',
    icon: 'BookOpen',
    price: 'Starting from $99',
    features: [
      'Chapter-by-chapter support',
      'Literature synthesis',
      'Methodology guidance',
      'Data interpretation',
      'Defense preparation',
    ],
  },
  {
    id: 'essay-assignment',
    title: 'Essay & Assignment Assistance',
    description:
      'Professional assistance with essays, coursework, and academic assignments across all subjects.',
    icon: 'PenTool',
    price: 'Starting from $29',
    features: [
      'Essay structuring',
      'Argument development',
      'Research integration',
      'Critical analysis',
      'Formatting & citations',
    ],
  },
  {
    id: 'literature-review',
    title: 'Literature Review Support',
    description:
      'Systematic and comprehensive literature reviews that establish a strong foundation for your research.',
    icon: 'Library',
    price: 'Starting from $59',
    features: [
      'Database searching',
      'Source evaluation',
      'Thematic synthesis',
      'Gap analysis',
      'Annotated bibliographies',
    ],
  },
  {
    id: 'proposal-writing',
    title: 'Proposal Writing Support',
    description:
      'Compelling research and grant proposals that articulate your vision and secure approval.',
    icon: 'FileText',
    price: 'Starting from $69',
    features: [
      'Research proposal drafting',
      'Grant application support',
      'Budget justification',
      'Timeline planning',
      'Ethics consideration',
    ],
  },
  {
    id: 'editing-proofreading',
    title: 'Editing & Proofreading',
    description:
      'Professional editing and proofreading to polish your academic writing to publication standard.',
    icon: 'CheckCircle',
    price: 'Starting from $19',
    features: [
      'Grammar & spelling',
      'Style consistency',
      'Clarity improvement',
      'Structure enhancement',
      'Track changes format',
    ],
  },
  {
    id: 'referencing-formatting',
    title: 'Referencing & Formatting',
    description:
      'Accurate referencing in any citation style and professional document formatting.',
    icon: 'AlignLeft',
    price: 'Starting from $15',
    features: [
      'APA, MLA, Chicago, Harvard',
      'In-text citations',
      'Reference list creation',
      'Document formatting',
      'Table of contents',
    ],
  },
  {
    id: 'statistical-analysis',
    title: 'Statistical Data Analysis',
    description:
      'Advanced statistical analysis using SPSS, R, Python, or Stata with full interpretation.',
    icon: 'BarChart2',
    price: 'Starting from $79',
    features: [
      'Descriptive statistics',
      'Inferential analysis',
      'Regression modeling',
      'SPSS / R / Python',
      'Results interpretation',
    ],
  },
  {
    id: 'presentation-preparation',
    title: 'Presentation Preparation',
    description:
      'Professional academic presentations and posters designed to impress your audience.',
    icon: 'Monitor',
    price: 'Starting from $39',
    features: [
      'PowerPoint design',
      'Academic posters',
      'Speaker notes',
      'Visual data charts',
      'Presentation coaching',
    ],
  },
]

export const ACADEMIC_LEVELS = [
  { value: 'high-school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate (Bachelor\'s)' },
  { value: 'masters', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD / Doctoral' },
  { value: 'postdoctoral', label: 'Postdoctoral' },
]

export const CITATION_STYLES = [
  { value: 'APA', label: 'APA (7th Edition)' },
  { value: 'MLA', label: 'MLA (9th Edition)' },
  { value: 'Chicago', label: 'Chicago / Turabian' },
  { value: 'Harvard', label: 'Harvard' },
  { value: 'Vancouver', label: 'Vancouver' },
  { value: 'IEEE', label: 'IEEE' },
  { value: 'Other', label: 'Other (specify in instructions)' },
]

export const FAQS = [
  {
    question: 'Is your service confidential?',
    answer:
      'Absolutely. We take privacy very seriously. All client information, project details, and communications are strictly confidential. We never share your data with third parties, and our team members sign non-disclosure agreements.',
  },
  {
    question: 'How long does it take to complete my project?',
    answer:
      'Turnaround times vary based on the complexity and scope of your project. Simple editing tasks can be completed within 24-48 hours, while comprehensive dissertation support may take several weeks. We always work to meet your stated deadline.',
  },
  {
    question: 'What academic levels do you support?',
    answer:
      'We support all academic levels from high school through postdoctoral research. Our team includes specialists with advanced degrees in various disciplines to ensure expert-level support.',
  },
  {
    question: 'How do I submit my project?',
    answer:
      'Simply fill out our request form with your project details, attach any relevant files, and submit. Our team will review your request and contact you within 2 hours with a quote and timeline.',
  },
  {
    question: 'What if I need revisions?',
    answer:
      'We offer free revisions within the scope of your original requirements. Your satisfaction is our priority, and we work with you until you are completely happy with the result.',
  },
  {
    question: 'How do I pay for services?',
    answer:
      'After receiving your personalized quote, you can pay via bank transfer, credit/debit card, or PayPal. We require a deposit for larger projects, with the balance due upon completion.',
  },
  {
    question: 'Can you work with any citation style?',
    answer:
      'Yes, our team is proficient in all major citation styles including APA, MLA, Chicago/Turabian, Harvard, Vancouver, IEEE, and more. Just specify your required style in the request form.',
  },
  {
    question: 'Do you offer discounts for returning clients?',
    answer:
      'Yes! We value long-term relationships with our clients. Returning clients receive priority support and loyalty discounts. Contact us to learn more about our loyalty program.',
  },
]

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    role: 'PhD Graduate',
    institution: 'University of Cambridge',
    content:
      'The dissertation support I received was exceptional. The team helped me navigate complex statistical analysis and structure my findings beautifully. I passed my defense with flying colors!',
    rating: 5,
    image_url: '/testimonials/sarah.jpg',
  },
  {
    id: '2',
    name: 'James Okonkwo',
    role: 'Master\'s Student',
    institution: 'London School of Economics',
    content:
      'Outstanding research guidance! They helped me refine my research question and develop a solid methodology. My supervisor was very impressed with the quality of my literature review.',
    rating: 5,
    image_url: '/testimonials/james.jpg',
  },
  {
    id: '3',
    name: 'Maria Chen',
    role: 'Undergraduate Student',
    institution: 'University of Toronto',
    content:
      'I was struggling with my thesis proposal, but the team made the process so clear and manageable. The editing service polished my writing significantly. Highly recommend!',
    rating: 5,
    image_url: '/testimonials/maria.jpg',
  },
  {
    id: '4',
    name: 'Prof. Ahmed Hassan',
    role: 'Associate Professor',
    institution: 'Cairo University',
    content:
      'Excellent statistical analysis support for my research paper. The team used R to analyze my data and provided clear interpretations. The turnaround was faster than expected.',
    rating: 5,
    image_url: '/testimonials/ahmed.jpg',
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    role: 'PhD Candidate',
    institution: 'Stanford University',
    content:
      'The proposal writing support was invaluable. My grant proposal was approved on the first submission, something I attribute largely to the professional guidance I received.',
    rating: 5,
    image_url: '/testimonials/emily.jpg',
  },
  {
    id: '6',
    name: 'Kwame Asante',
    role: 'Master\'s Graduate',
    institution: 'University of Ghana',
    content:
      'From literature review to final proofreading, the support was consistently excellent. The team is knowledgeable, responsive, and truly invested in your academic success.',
    rating: 5,
    image_url: '/testimonials/kwame.jpg',
  },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Submit Your Request',
    description:
      'Fill out our detailed request form with your project requirements, deadline, and any relevant files.',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Get Your Quote',
    description:
      'Within 2 hours, our team reviews your request and sends you a personalized quote and timeline.',
    icon: 'MessageSquare',
  },
  {
    step: 3,
    title: 'Expert Assignment',
    description:
      'We match your project with the most qualified academic expert in your specific field and level.',
    icon: 'UserCheck',
  },
  {
    step: 4,
    title: 'Collaborate & Review',
    description:
      'Work closely with your assigned expert, providing feedback and direction throughout the process.',
    icon: 'RefreshCw',
  },
  {
    step: 5,
    title: 'Receive & Approve',
    description:
      'Receive your completed work, request any revisions, and approve when fully satisfied.',
    icon: 'CheckCircle',
  },
]

export const PRICING_PLANS = [
  {
    name: 'Basic',
    description: 'For simple editing and formatting tasks',
    price: 'From $15',
    features: [
      'Proofreading & editing',
      'Referencing & formatting',
      '24-48 hour turnaround',
      '1 round of revisions',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Standard',
    description: 'For essays, assignments, and literature reviews',
    price: 'From $49',
    features: [
      'All Basic features',
      'Essay & assignment help',
      'Literature review support',
      '3-5 day turnaround',
      '2 rounds of revisions',
      'Priority email support',
    ],
    cta: 'Most Popular',
    highlighted: true,
  },
  {
    name: 'Premium',
    description: 'For dissertations, theses, and complex research',
    price: 'From $99',
    features: [
      'All Standard features',
      'Dissertation/thesis support',
      'Statistical analysis',
      'Flexible turnaround',
      'Unlimited revisions',
      '24/7 dedicated support',
      'Free plagiarism check',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
]

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]
