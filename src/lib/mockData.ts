
// User profiles
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'professor' | 'researcher' | 'alumni';
  subjects: string[];
  major?: string;
  school?: string;
  year?: number;
  academicGoals?: string;
  achievements?: string[];
  skills?: string[];
  availability?: string[];
  bio?: string;
}

// Resource types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'note' | 'paper' | 'book' | 'article' | 'video' | 'other';
  subject: string;
  uploadedBy: string;
  uploadDate: string;
  fileUrl: string;
  likes: number;
  downloads: number;
}

// Study Buddy Match
export interface StudyBuddy {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: 'student' | 'professor' | 'researcher' | 'alumni';
  subjects: string[];
  major?: string;
  year?: number;
  matchScore: number;
  sharedInterests: string[];
  availability: string[];
}

// Mock users
export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Aiden Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "student",
    subjects: ["Computer Science", "Mathematics", "AI"],
    major: "Computer Science",
    school: "Tech University",
    year: 3,
    academicGoals: "To specialize in AI and Machine Learning",
    bio: "Junior CS student interested in AI, ML, and web development. Looking for study partners for upcoming exams."
  },
  {
    id: "2",
    name: "Dr. Emma Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "professor",
    subjects: ["Computer Science", "AI", "Data Science"],
    school: "Tech University",
    bio: "Professor of Computer Science with focus on AI and Data Science. Open to mentoring motivated students."
  },
  {
    id: "3",
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "student",
    subjects: ["Physics", "Mathematics", "Engineering"],
    major: "Mechanical Engineering",
    school: "Tech University",
    year: 4,
    academicGoals: "To pursue a PhD in Robotics",
    bio: "Senior engineering student working on robotics projects. Looking for collaboration on final year project."
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "researcher",
    subjects: ["Biology", "Chemistry", "Medicine"],
    school: "Health Sciences Institute",
    bio: "Research assistant in the Biology department focusing on cellular biology. Looking for lab partners."
  },
  {
    id: "5",
    name: "Sophia Chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "alumni",
    subjects: ["Business", "Marketing", "Finance"],
    major: "Business Administration",
    school: "Tech University",
    bio: "Marketing Manager at TechCorp. Graduated 2 years ago. Happy to mentor students interested in marketing careers."
  },
  {
    id: "6",
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "student",
    subjects: ["Computer Science", "Web Development", "UI/UX"],
    major: "Computer Science",
    school: "Tech University",
    year: 3,
    academicGoals: "To become a full-stack developer",
    bio: "Junior CS student focusing on web technologies. Looking for project partners."
  },
  {
    id: "7",
    name: "Sarah Ahmed",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "student",
    subjects: ["Computer Science", "Cybersecurity", "Networking"],
    major: "Computer Science",
    school: "Tech University",
    year: 4,
    academicGoals: "To work in cybersecurity",
    bio: "Senior CS student with interests in network security. Looking for study groups for certification prep."
  },
  {
    id: "8",
    name: "David Lee",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "student",
    subjects: ["Computer Science", "Mobile Development", "AI"],
    major: "Software Engineering",
    school: "Tech University",
    year: 2,
    academicGoals: "To develop innovative mobile applications",
    bio: "Sophomore SE student interested in mobile app development. Looking for hackathon partners."
  }
];

// Mock resources
export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Comprehensive notes covering basic ML concepts and algorithms",
    type: "note",
    subject: "Computer Science",
    uploadedBy: "Dr. Emma Johnson",
    uploadDate: "2025-04-15",
    fileUrl: "#",
    likes: 45,
    downloads: 120
  },
  {
    id: "2",
    title: "Advanced Calculus Study Guide",
    description: "Complete study guide for the advanced calculus course",
    type: "note",
    subject: "Mathematics",
    uploadedBy: "Aiden Smith",
    uploadDate: "2025-04-10",
    fileUrl: "#",
    likes: 32,
    downloads: 87
  },
  {
    id: "3",
    title: "Quantum Physics: Latest Research Findings",
    description: "Paper discussing the latest discoveries in quantum physics",
    type: "paper",
    subject: "Physics",
    uploadedBy: "Maria Garcia",
    uploadDate: "2025-03-22",
    fileUrl: "#",
    likes: 67,
    downloads: 152
  },
  {
    id: "4",
    title: "Market Analysis Techniques",
    description: "Comprehensive guide on various market analysis methods",
    type: "article",
    subject: "Business",
    uploadedBy: "Sophia Chen",
    uploadDate: "2025-04-05",
    fileUrl: "#",
    likes: 29,
    downloads: 76
  },
  {
    id: "5",
    title: "Cell Biology Fundamentals",
    description: "Detailed notes on cell structures and functions",
    type: "note",
    subject: "Biology",
    uploadedBy: "James Wilson",
    uploadDate: "2025-03-18",
    fileUrl: "#",
    likes: 41,
    downloads: 93
  },
  {
    id: "6",
    title: "Web Development with React",
    description: "Tutorial videos on building modern web applications with React",
    type: "video",
    subject: "Computer Science",
    uploadedBy: "Marcus Johnson",
    uploadDate: "2025-04-12",
    fileUrl: "#",
    likes: 58,
    downloads: 131
  },
  {
    id: "7",
    title: "Network Security Fundamentals",
    description: "Comprehensive guide to network security principles and practices",
    type: "book",
    subject: "Computer Science",
    uploadedBy: "Sarah Ahmed",
    uploadDate: "2025-03-30",
    fileUrl: "#",
    likes: 37,
    downloads: 82
  },
  {
    id: "8",
    title: "Mobile App Development with Flutter",
    description: "Step-by-step guide to building cross-platform mobile applications",
    type: "article",
    subject: "Computer Science",
    uploadedBy: "David Lee",
    uploadDate: "2025-04-08",
    fileUrl: "#",
    likes: 26,
    downloads: 64
  }
];

// Mock study buddies (matches)
export const mockStudyBuddies: StudyBuddy[] = [
  {
    id: "1",
    userId: "6",
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "student",
    subjects: ["Computer Science", "Web Development", "UI/UX"],
    major: "Computer Science",
    year: 3,
    matchScore: 95,
    sharedInterests: ["Computer Science", "Web Development"],
    availability: ["Mon: 2PM-5PM", "Wed: 3PM-6PM", "Fri: 1PM-4PM"]
  },
  {
    id: "2",
    userId: "7",
    name: "Sarah Ahmed",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "student",
    subjects: ["Computer Science", "Cybersecurity", "Networking"],
    major: "Computer Science",
    year: 4,
    matchScore: 85,
    sharedInterests: ["Computer Science", "AI"],
    availability: ["Tue: 10AM-12PM", "Thu: 1PM-4PM", "Sat: 11AM-2PM"]
  },
  {
    id: "3",
    userId: "8",
    name: "David Lee",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "student",
    subjects: ["Computer Science", "Mobile Development", "AI"],
    major: "Software Engineering",
    year: 2,
    matchScore: 80,
    sharedInterests: ["Computer Science", "AI"],
    availability: ["Mon: 9AM-11AM", "Wed: 2PM-4PM", "Thu: 3PM-6PM"]
  },
  {
    id: "4",
    userId: "3",
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "student",
    subjects: ["Physics", "Mathematics", "Engineering"],
    major: "Mechanical Engineering",
    year: 4,
    matchScore: 65,
    sharedInterests: ["Mathematics"],
    availability: ["Tue: 3PM-5PM", "Fri: 10AM-1PM", "Sun: 2PM-5PM"]
  }
];

// Mock study AI responses
export const mockAIResponses = [
  {
    id: 1,
    question: "Can you help me understand linear algebra?",
    answer: "Linear algebra is a branch of mathematics that focuses on linear equations and their representations through matrices and vector spaces. The core concepts include vectors, matrices, determinants, eigenvalues, and vector spaces. Would you like me to explain any of these concepts in more depth?"
  },
  {
    id: 2,
    question: "How do I prepare for my computer science exam?",
    answer: "To prepare for your CS exam: 1) Review lecture notes and past assignments, 2) Practice with past exam questions, 3) Study key algorithms and data structures, 4) Create cheat sheets with important concepts, 5) Form study groups with classmates, 6) Take breaks and get adequate rest before the exam. What specific topics are you struggling with?"
  },
  {
    id: 3,
    question: "What are the best resources for learning React?",
    answer: "Some excellent resources for learning React include: 1) React's official documentation, 2) freeCodeCamp's React tutorials, 3) Scrimba's React course, 4) React for Beginners by Wes Bos, 5) Epic React by Kent C. Dodds, 6) Building projects to apply what you've learned. Would you like more specific recommendations based on your experience level?"
  }
];

// Get user by ID
export const getUserById = (id: string): UserProfile | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Get resources by subject
export const getResourcesBySubject = (subject: string): Resource[] => {
  return mockResources.filter(resource => 
    resource.subject.toLowerCase() === subject.toLowerCase()
  );
};

// Get study buddy matches for a user
export const getStudyBuddyMatches = (userId: string): StudyBuddy[] => {
  // In a real app, this would use an algorithm to find matches
  // For now, return mock data
  return mockStudyBuddies;
};

// Get AI response based on question
export const getAIResponse = (question: string): string => {
  // In a real app, this would call an AI service
  // For now, return a mock response based on keyword matching
  const keywords = question.toLowerCase();
  
  if (keywords.includes('linear algebra') || keywords.includes('math')) {
    return mockAIResponses[0].answer;
  } else if (keywords.includes('exam') || keywords.includes('test') || keywords.includes('study')) {
    return mockAIResponses[1].answer;
  } else if (keywords.includes('react') || keywords.includes('javascript') || keywords.includes('web')) {
    return mockAIResponses[2].answer;
  }
  
  return "I'm your study assistant! Ask me any academic question, and I'll do my best to help you understand the concept or find resources to help you learn.";
};
