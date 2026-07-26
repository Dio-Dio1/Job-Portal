import butterfly from "../assets/logos/butterfly.jpg";
import bird from "../assets/logos/bird.jpg";

export const mockJobs = [
  {
    id: 1,
    companyId: 1,
    logo: butterfly,
    title: "Software Engineer",
    company: "Butterfly Technologies",
    location: "Remote",
    salary: "$120k - $150k",
    type: "Full-time",
    postedAt: "2 days ago",
    description:
      "Build scalable software solutions using modern technologies. You will work with a cross-functional team to deliver high-quality products used by thousands of users.",
    requirements: [
      "3+ years of experience with React and Node.js",
      "Strong understanding of REST APIs and databases",
      "Experience with Git and agile workflows",
      "Excellent communication and teamwork skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Remote-first culture",
      "Health insurance",
      "Learning budget",
    ],
  },
  {
    id: 2,
    companyId: 2,
    logo: bird,
    title: "Hardware Engineer",
    company: "Bird Labs",
    location: "Hybrid",
    salary: "$95k - $130k",
    type: "Full-time",
    postedAt: "4 days ago",
    description:
      "Design and develop next-generation embedded hardware systems for IoT devices and smart home products.",
    requirements: [
      "Degree in Electrical or Computer Engineering",
      "Experience with PCB design and prototyping",
      "Familiarity with embedded C/C++",
      "Knowledge of sensor integration",
    ],
    benefits: [
      "Hybrid work schedule",
      "Hardware lab access",
      "Conference sponsorship",
      "Annual bonus",
    ],
  },
  {
    id: 3,
    companyId: 3,
    logo: butterfly,
    title: "CottonCandy Engineer",
    company: "SweetWorks",
    location: "On-site",
    salary: "$80k - $110k",
    type: "Contract",
    postedAt: "1 week ago",
    description:
      "Create innovative candy production systems for global markets. Optimize manufacturing pipelines and quality control processes.",
    requirements: [
      "Background in food engineering or mechanical engineering",
      "Experience with production line automation",
      "Attention to detail and safety standards",
    ],
    benefits: [
      "On-site meals",
      "Performance bonuses",
      "Career growth opportunities",
    ],
  },
  {
    id: 4,
    companyId: 4,
    logo: bird,
    title: "Cement Engineer",
    company: "SolidBuild",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    postedAt: "3 days ago",
    description:
      "Develop durable construction materials for future infrastructure projects across Nepal and South Asia.",
    requirements: [
      "Civil or materials engineering degree",
      "Experience with concrete formulation",
      "Project management skills",
      "Willingness to travel occasionally",
    ],
    benefits: [
      "Remote work options",
      "Project completion bonuses",
      "Professional certifications support",
    ],
  },
];

export const mockCompanies = [
  {
    id: 1,
    name: "Butterfly Technologies",
    logo: butterfly,
    website: "butterfly.tech",
    location: "Kathmandu, Nepal",
    size: "50–200 employees",
    industry: "Technology",
    about:
      "Butterfly Technologies builds modern software products for businesses across Nepal. We focus on scalable web applications and developer-friendly tools.",
  },
  {
    id: 2,
    name: "Bird Labs",
    logo: bird,
    website: "birdlabs.io",
    location: "Lalitpur, Nepal",
    size: "20–50 employees",
    industry: "Hardware & IoT",
    about:
      "Bird Labs is an innovation studio specializing in embedded systems, smart devices, and hardware prototyping for startups and enterprises.",
  },
  {
    id: 3,
    name: "SweetWorks",
    logo: butterfly,
    website: "sweetworks.com",
    location: "Pokhara, Nepal",
    size: "100–500 employees",
    industry: "Food & Manufacturing",
    about:
      "SweetWorks is a leading confectionery manufacturer exporting premium candy products to markets worldwide.",
  },
  {
    id: 4,
    name: "SolidBuild",
    logo: bird,
    website: "solidbuild.co",
    location: "Biratnagar, Nepal",
    size: "200–500 employees",
    industry: "Construction",
    about:
      "SolidBuild develops advanced construction materials and infrastructure solutions for sustainable urban development.",
  },
];

export const getJobById = (id) =>
  mockJobs.find((job) => job.id === Number(id));

export const getCompanyById = (id) =>
  mockCompanies.find((company) => company.id === Number(id));

export const getJobsByCompanyId = (companyId) =>
  mockJobs.filter((job) => job.companyId === Number(companyId));
