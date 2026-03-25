export const stats = {
  totalStudents: "50,000+",
  totalCourses: "200+",
  successRate: "95%",
  instructors: "150+",
};

export const categories = [
  { name: "Web Development", icon: "Code", courses: 45 },
  { name: "Data Science", icon: "BarChart", courses: 32 },
  { name: "Mobile Development", icon: "Smartphone", courses: 28 },
  { name: "UI/UX Design", icon: "Palette", courses: 24 },
  { name: "Cloud Computing", icon: "Cloud", courses: 19 },
  { name: "Cybersecurity", icon: "Shield", courses: 15 },
  { name: "AI & ML", icon: "Brain", courses: 22 },
  { name: "DevOps", icon: "GitBranch", courses: 18 },
];

export const courses = [
  {
    id: 1,
    title: "Complete React Development",
    description:
      "Master React from basics to advanced concepts with hands-on projects",
    price: 2499,
    originalPrice: 4999,
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12450,
    duration: "40 hours",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Java DSA Masterclass",
    description:
      "Crack coding interviews with comprehensive Data Structures & Algorithms",
    price: 2999,
    originalPrice: 5999,
    instructor: "Michael Chen",
    rating: 4.9,
    students: 18200,
    duration: "60 hours",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    category: "Programming",
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    description:
      "Frontend + Backend mastery with MERN stack and deployment",
    price: 3499,
    originalPrice: 6999,
    instructor: "David Kumar",
    rating: 4.7,
    students: 9800,
    duration: "80 hours",
    level: "Beginner to Advanced",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    category: "Web Development",
  },
  {
    id: 4,
    title: "Python for Data Science",
    description:
      "Learn Python, NumPy, Pandas, and machine learning fundamentals",
    price: 2799,
    originalPrice: 5499,
    instructor: "Emily Watson",
    rating: 4.8,
    students: 15300,
    duration: "50 hours",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    category: "Data Science",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    description:
      "Create stunning user interfaces and experiences with Figma",
    price: 1999,
    originalPrice: 3999,
    instructor: "Priya Sharma",
    rating: 4.6,
    students: 7500,
    duration: "30 hours",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    category: "Design",
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description:
      "Master AWS services and become a certified cloud practitioner",
    price: 3299,
    originalPrice: 6499,
    instructor: "Robert Anderson",
    rating: 4.9,
    students: 11200,
    duration: "45 hours",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    category: "Cloud Computing",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "Software Engineer at Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text:
      "EduLearn transformed my career! The DSA course helped me crack my dream job at Google.",
  },
  {
    id: 2,
    name: "Anita Desai",
    role: "Full Stack Developer at Amazon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text:
      "Best investment in my career. Got placed at Amazon within 3 months!",
  },
];

export const outcomes = [
  {
    icon: "Trophy",
    title: "95% Success Rate",
    description: "Our students achieve their learning goals and career transitions"
  },
  {
    icon: "Briefcase",
    title: "10,000+ Placements",
    description: "Students placed in top companies like Google, Amazon, Microsoft"
  },
  {
    icon: "DollarSign",
    title: "40% Salary Hike",
    description: "Average salary increase after course completion"
  },
  {
    icon: "Award",
    title: "Industry Certificates",
    description: "Get recognized certifications valued by top employers"
  }
];


export const faqs = [
  {
    question: "How long do I have access to the courses?",
    answer:
      "You get lifetime access to all course materials, including updates.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes! You'll receive an industry-recognized certificate.",
  },
];

export const instructors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    students: 25000,
    courses: 12,
    rating: 4.9
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    students: 32000,
    courses: 15,
    rating: 4.8
  },
  {
    id: 3,
    name: "David Kumar",
    role: "Full Stack Architect",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    students: 18000,
    courses: 8,
    rating: 4.9
  },
  {
    id: 4,
    name: "Emily Watson",
    role: "Data Science Lead",
    company: "Meta",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    students: 22000,
    courses: 10,
    rating: 4.7
  }
];


export const mockUsers = [
  {
    id: 1,
    email: "student@edulearn.com",
    password: "password123",
    name: "Alex Kumar",
    enrolledCourses: [1, 2, 4],
    completedCourses: [1],
    progress: {
      1: 100,
      2: 65,
      4: 30,
    },
    totalHoursLearned: 124,
    certificatesEarned: 1,
    currentStreak: 15,
  },
];