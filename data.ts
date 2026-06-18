export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  duration: string;
  institution: string;
  grade?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string; proficiency: number }[];
}

export const personalInfo = {
  name: "Aravinthan G",
  title: "Aspiring Data Scientist & Analyst",
  tagline: "Turning Complex Data into Powerful Insights with AI",
  shortTagline: "Building high-performance machine learning models and data-driven systems.",
  about: `I am an Aspiring Data Scientist and Analyst specializing in Artificial Intelligence and Machine Learning solutions. I focus on developing deep learning pipelines, automated data analysis structures, and predictive models to solve real-world business challenges. With hands-on internship experience in data mining, statistics, and business intelligence, my goal is to deliver high-performance, data-driven solutions.`,
  contact: {
    email: "aravinthang06@gmail.com",
    phone: "+91 83444 76965",
    location: "Trichy, Tamil Nadu, India",
    github: "https://github.com/Aravinthan-G-23",
    linkedin: "https://www.linkedin.com/in/aravinthan-g-b98088281/",
  },
  stats: {
    projects: 12,
    internships: 4,
    skills: 25,
    certifications: 8,
  }
};

export const projectsData: Project[] = [
  {
    id: "hci-cursor",
    title: "Adaptive AI HCI System",
    subtitle: "Hands-Free Cursor Control",
    description: "Adaptive AI-Based Gaze and Blink Driven Human–Computer Interaction System for Hands-Free Cursor Control.",
    longDescription: "A groundbreaking human-computer interaction system utilizing facial landmark tracking and machine learning models to enable completely hands-free cursor movement and clicks using only eye gaze and blink patterns. Specifically designed to assist individuals with motor impairments.",
    overview: "This project provides an assistive technology system that maps eye movement and blink gestures to mouse actions, enabling full navigation of computer systems without physical inputs.",
    problem: "Traditional computing interfaces rely heavily on manual motor controls, creating a digital accessibility barrier for individuals suffering from severe physical disabilities or paralysis.",
    solution: "By utilizing real-time computer vision (OpenCV) and deep learning-based facial landmark points (MediaPipe), we created a low-latency gaze tracking algorithm that dynamically calibrates to user screen dimensions and supports adaptive blink filters for drag, drop, and mouse clicks.",
    features: [
      "Real-time low-latency blink gesture filter (left/right click separation)",
      "Adaptive screen edge calibration mapping face-mesh vectors to pixels",
      "Dynamic smoothing filter to prevent cursor jitter",
      "Multi-platform backend support for seamless system-level mouse events"
    ],
    technologies: ["Python", "OpenCV", "MediaPipe", "Scikit-Learn", "Tkinter", "PyAutoGUI"],
    githubUrl: "https://github.com/Aravinthan-G-23",
    featured: false
  },
  {
    id: "certiguard",
    title: "CertiGuard AI",
    subtitle: "Deep Learning Certificate Verification",
    description: "Deep learning-based certificate verification system for tampering detection and instant validation.",
    longDescription: "An advanced document validation system combining deep learning text extraction (OCR), metadata forensics, and cryptographic signatures to detect tampered certificates and verify credentials instantly.",
    overview: "CertiGuard AI was built to automate the credential verification process for HR departments and academic institutions, scanning documents for pixel manipulation, font discrepancies, and digital anomalies.",
    problem: "Academic and professional credential fraud is a growing issue, costing organizations time and money. Manual document verification is slow, prone to oversight, and insecure.",
    solution: "A neural network that analyzes document images for structural anomalies, textures, and typography. It uses OCR to pull information and checks it against a secure Mongo database, reporting a tamper-confidence score.",
    features: [
      "Convolutional Neural Network (CNN) for image manipulation checks",
      "OCR-based automated metadata extraction and cross-referencing",
      "Interactive analytics dashboard showing scan outcomes",
      "Instant verified cryptographic PDF receipts"
    ],
    technologies: ["Python", "Flask", "MongoDB", "Deep Learning", "TensorFlow", "Pandas", "ngrok"],
    githubUrl: "https://github.com/Aravinthan-G-23/CertiGuard_AI_Improved",
    featured: true
  },
  {
    id: "stock-prediction",
    title: "Stock Market Predictor",
    subtitle: "Machine Learning Forecasting",
    description: "Machine learning forecasting model utilizing historical data and sentiment analysis for market trends.",
    longDescription: "An intelligent quantitative finance tool that predicts equity price movements by training LSTM (Long Short-Term Memory) neural networks on historical stock prices combined with natural language sentiment scores extracted from financial news and social media streams.",
    overview: "The system ingests stock tickers, retrieves historic data from Yahoo Finance, downloads relevant social media/news data, processes them, and outputs next-day predictions with confidence levels.",
    problem: "Financial markets are notoriously volatile and influenced by a mix of quantitative metrics and subjective human sentiments, making purely technical analysis insufficient.",
    solution: "An integrated pipeline that extracts news articles and tweets, runs them through an NLP sentiment classifier, and feeds the sentiment index along with MACD, RSI, and SMA indicators into an LSTM model.",
    features: [
      "LSTM and XGBoost models for sequence forecasting",
      "Real-time data scraping from Twitter API and News API",
      "Technical analysis indicators (RSI, MACD, Bollinger Bands) generator",
      "Interactive Streamlit web application with dynamic chart rendering"
    ],
    technologies: ["Python", "Streamlit", "Scikit-Learn", "Pandas", "Matplotlib", "Yahoo Finance API"],
    githubUrl: "https://github.com/Aravinthan-G-23",
    featured: false
  },
  {
    id: "netflix-dashboard",
    title: "Netflix Dashboard",
    subtitle: "Content Analytics & Insights",
    description: "Interactive data visualization dashboard analyzing Netflix global content libraries and release trends.",
    longDescription: "A comprehensive analysis dashboard mapping out Netflix's library content distribution, genre saturation, rating clusters, and country production hubs over the past decade, helping uncover content strategies.",
    overview: "This project processes large dataset of Netflix titles to map viewer preference, regional catalog differences, and release velocity over time.",
    problem: "Vast amounts of media catalog data are flat and difficult to translate into actionable distribution or production choices.",
    solution: "Built a fully interactive Tableau dashboard and Python visualization notebook to cluster media by categories, run frequency mapping, and present clean visual insights.",
    features: [
      "Tableau dashboard with interactive sliders and regional choropleth maps",
      "Content growth velocity analysis (movies vs. TV shows)",
      "Word-cloud visualization of title descriptions for thematic tags",
      "Data cleaning and preprocessing pipelines in Pandas"
    ],
    technologies: ["Tableau", "Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    githubUrl: "https://github.com/Aravinthan-G-23/Netflix-Dash-Board",
    featured: true
  },
  {
    id: "twitter-sentiment",
    title: "Sentiment Analysis on X (Twitter)",
    subtitle: "Social Media NLP Analysis",
    description: "Natural Language Processing (NLP) sentiment analyzer classifying X (Twitter) micro-posts.",
    longDescription: "A high-throughput text analytics pipeline that processes live Twitter feeds, classifies public sentiment (Positive, Negative, Neutral) towards target keywords or brands, and maps temporal swings.",
    overview: "Uses text tokenization, stopwords processing, and deep neural text classification to monitor public opinion trends on social media.",
    problem: "Brands and public figures struggle to gauge real-time feedback and sentiment shift during product launches or PR events because of the sheer volume of tweets.",
    solution: "Created an NLP pipeline using NLTK and Scikit-Learn that scrapes posts, cleans them, applies TF-IDF vectorization, and predicts sentiments with an SVM/Naive Bayes classifier.",
    features: [
      "Live stream text processing with customizable filters",
      "Custom NLP tokenization and lemmatization pipeline",
      "High accuracy classification metrics with visual confusion matrix",
      "Streamlit dashboard for real-time keyword tracking"
    ],
    technologies: ["Python", "NLTK", "Scikit-Learn", "Flask", "HTML", "CSS", "Streamlit"],
    githubUrl: "https://github.com/Aravinthan-G-23/shadowfox",
    featured: true
  }
];

export const internshipsData: Internship[] = [
  {
    id: "int-shadowfox",
    company: "Shadow Fox",
    role: "Data Science Intern",
    duration: "Remote | Internship",
    description: [
      "Engineered machine learning pipelines for predictive customer modeling, improving data analysis latency by 25%.",
      "Assisted in refining data cleaning methodologies for large-scale datasets using NumPy and Pandas.",
      "Implemented and tested core regression and classification models, comparing model matrices (F1-score, ROC-AUC)."
    ],
    skills: ["Python", "Scikit-Learn", "Data Wrangling", "Pandas", "Machine Learning"]
  },
  {
    id: "int-zidio",
    company: "Zidio Development",
    role: "Data Science & Analytics Intern",
    duration: "Remote | Internship",
    description: [
      "Aggregated and analyzed system telemetry data to provide optimization reports for software workflows.",
      "Built interactive dashboards showing project health, user analytics, and conversion funnels.",
      "Collaborated with backend engineers to optimize SQL query structures, decreasing database fetch times."
    ],
    skills: ["Data Analysis", "SQL", "Tableau", "Excel", "Data Visualization"]
  },
  {
    id: "int-zaalima",
    company: "Zaalima Development",
    role: "Data Science & Machine Learning Intern",
    duration: "Remote | Internship",
    description: [
      "Developed deep learning prototypes for image categorization and feature extraction workflows.",
      "Worked on Natural Language Processing (NLP) pipelines, cleaning conversational transcripts for sentiment analysis.",
      "Integrated flask-based APIs to serve machine learning models to frontend react clients."
    ],
    skills: ["Deep Learning", "NLP", "Flask", "TensorFlow", "API Integration"]
  },
  {
    id: "int-besant",
    company: "Besant Technologies",
    role: "Data Analytics Intern",
    duration: "Onsite | Internship",
    description: [
      "Conducted extensive database schema mapping and wrote automated Excel macros to expedite report generation.",
      "Designed visual layouts for business intelligence reports using Tableau, highlighting regional sales trends.",
      "Assisted in training junior analysts in SQL fundamentals and database normalization."
    ],
    skills: ["SQL", "Microsoft Excel", "Tableau", "Data Analytics", "Reporting"]
  }
];

export const educationData: Education[] = [
  {
    id: "edu-pg",
    degree: "Master of Science",
    field: "Data Science",
    duration: "June 2025 - April 2027",
    institution: "Post Graduate Academy",
  },
  {
    id: "edu-ug",
    degree: "Bachelor of Science",
    field: "Computer Science",
    duration: "August 2021 - May 2024",
    institution: "Undergraduate University",
    grade: "First Class"
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", icon: "SiPython", proficiency: 95 },
      { name: "SQL", icon: "SiMysql", proficiency: 88 },
      { name: "HTML5", icon: "SiHtml5", proficiency: 85 },
      { name: "CSS3", icon: "SiCss3", proficiency: 80 }
    ]
  },
  {
    title: "Data Science & ML",
    skills: [
      { name: "Machine Learning", icon: "GiBrain", proficiency: 92 },
      { name: "Deep Learning", icon: "GiArtificialIntelligence", proficiency: 88 },
      { name: "NLP", icon: "GiTalk", proficiency: 85 },
      { name: "Generative AI", icon: "SiOpenai", proficiency: 82 },
      { name: "Scikit-Learn", icon: "SiScikitlearn", proficiency: 90 },
      { name: "Pandas", icon: "SiPandas", proficiency: 94 }
    ]
  },
  {
    title: "Tools & Frameworks",
    skills: [
      { name: "Tableau", icon: "SiTableau", proficiency: 85 },
      { name: "Excel", icon: "SiMicrosoftexcel", proficiency: 90 },
      { name: "Flask", icon: "SiFlask", proficiency: 82 },
      { name: "Django", icon: "SiDjango", proficiency: 78 },
      { name: "Streamlit", icon: "SiStreamlit", proficiency: 85 },
      { name: "MongoDB", icon: "SiMongodb", proficiency: 80 },
      { name: "ngrok", icon: "SiNgrok", proficiency: 75 }
    ]
  }
];
