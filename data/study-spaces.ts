import { StudySpace } from "@/types/study-space"

// Sample data - in a real app this would come from an API
export const SAMPLE_SPACES: StudySpace[] = [
  {
    id: "1",
    name: "Main Library",
    image: "/images/main-library.jpg",
    category: "Quiet spots",
    nearestStation: "Oxford Road Station",
    distance: 0.5,
    coordinates: [-2.2353, 53.4645],
    openingHours: {
      "Monday": { open: "00:00", close: "23:59" },
      "Tuesday": { open: "00:00", close: "23:59" },
      "Wednesday": { open: "00:00", close: "23:59" },
      "Thursday": { open: "00:00", close: "23:59" },
      "Friday": { open: "00:00", close: "23:59" },
      "Saturday": { open: "00:00", close: "23:59" },
      "Sunday": { open: "00:00", close: "23:59" }
    }
  },
  {
    id: "2",
    name: "Alan Gilbert Learning Commons",
    image: "/images/learning-commons.jpg",
    category: "On campus",
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.23319, 53.465052],
    openingHours: {
      "Monday": { open: "00:00", close: "23:59" },
      "Tuesday": { open: "00:00", close: "23:59" },
      "Wednesday": { open: "00:00", close: "23:59" },
      "Thursday": { open: "00:00", close: "23:59" },
      "Friday": { open: "00:00", close: "23:59" },
      "Saturday": { open: "00:00", close: "23:59" },
      "Sunday": { open: "00:00", close: "23:59" }
    }
  },
  {
    id: "3",
    name: "AMBS",
    image: "/images/ambs.jpg",
    category: "Cosy Campus Spaces",
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.237411, 53.467210],
    openingHours: {
      "Monday": { open: "08:00", close: "22:00" },
      "Tuesday": { open: "08:00", close: "22:00" },
      "Wednesday": { open: "08:00", close: "22:00" },
      "Thursday": { open: "08:00", close: "22:00" },
      "Friday": { open: "08:00", close: "22:00" },
      "Saturday": { open: "10:00", close: "18:00" },
      "Sunday": { open: "10:00", close: "18:00" }
    }
  },
  {
    id: "4",
    name: "John Rylands Library",
    image: "/images/john-rylands.jpg",
    category: "Quiet spots",
    nearestStation: "Deansgate Station",
    distance: 1.2,
    coordinates: [-2.2486, 53.4808],
    openingHours: {
      "Monday": { open: "10:00", close: "17:00" },
      "Tuesday": { open: "10:00", close: "17:00" },
      "Wednesday": { open: "10:00", close: "17:00" },
      "Thursday": { open: "10:00", close: "17:00" },
      "Friday": { open: "10:00", close: "17:00" },
      "Saturday": { open: "10:00", close: "17:00" },
      "Sunday": { open: "12:00", close: "17:00" }
    }
  },
  {
    id: "5",
    name: "Students' Union",
    image: "/images/students-union.jpg",
    category: "On campus",
    nearestStation: "Oxford Road Station",
    distance: 0.2,
    coordinates: [-2.232018, 53.464437],
    openingHours: {
      "Monday": { open: "08:00", close: "23:00" },
      "Tuesday": { open: "08:00", close: "23:00" },
      "Wednesday": { open: "08:00", close: "23:00" },
      "Thursday": { open: "08:00", close: "23:00" },
      "Friday": { open: "08:00", close: "23:00" },
      "Saturday": { open: "10:00", close: "20:00" },
      "Sunday": { open: "10:00", close: "20:00" }
    }
  },
  {
    id: "6",
    name: "Central Library",
    image: "/images/central-library.jpeg",
    category: "Quiet spots",
    nearestStation: "St Peter's Square Station",
    distance: 1.0,
    coordinates: [-2.244521, 53.477839],
    openingHours: {
      "Monday": { open: "09:00", close: "20:00" },
      "Tuesday": { open: "09:00", close: "20:00" },
      "Wednesday": { open: "09:00", close: "20:00" },
      "Thursday": { open: "09:00", close: "20:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "09:00", close: "17:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "7",
    name: "Samuel Alexander Building",
    image: "/images/samuel-alexander.jpeg",
    category: "On campus",
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.233602, 53.464441],
    openingHours: {
      "Monday": { open: "08:00", close: "22:00" },
      "Tuesday": { open: "08:00", close: "22:00" },
      "Wednesday": { open: "08:00", close: "22:00" },
      "Thursday": { open: "08:00", close: "22:00" },
      "Friday": { open: "08:00", close: "22:00" },
      "Saturday": { open: "10:00", close: "18:00" },
      "Sunday": { open: "10:00", close: "18:00" }
    }
  },
  {
    id: "8",
    name: "Joule Library",
    image: "/images/joule-library.jpg",
    category: "Quiet spots",
    nearestStation: "Oxford Road Station",
    distance: 0.6,
    coordinates: [-2.233876, 53.467433],
    openingHours: {
      "Monday": { open: "09:00", close: "21:00" },
      "Tuesday": { open: "09:00", close: "21:00" },
      "Wednesday": { open: "09:00", close: "21:00" },
      "Thursday": { open: "09:00", close: "21:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "10:00", close: "17:00" },
      "Sunday": { open: "10:00", close: "17:00" }
    }
  },
  {
    id: "9",
    name: "Christie's Bistro",
    image: "/images/christie-bistro.jpg",
    category: "Cafés",
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.233876, 53.465433],
    openingHours: {
      "Monday": { open: "09:00", close: "17:00" },
      "Tuesday": { open: "09:00", close: "17:00" },
      "Wednesday": { open: "09:00", close: "17:00" },
      "Thursday": { open: "09:00", close: "17:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "00:00", close: "00:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "10",
    name: "University Place",
    image: "/images/university-place.jpeg",
    category: "On campus",
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.233780, 53.466740],
    openingHours: {
      "Monday": { open: "08:00", close: "17:00" },
      "Tuesday": { open: "08:00", close: "17:00" },
      "Wednesday": { open: "08:00", close: "17:00" },
      "Thursday": { open: "08:00", close: "17:00" },
      "Friday": { open: "08:00", close: "17:00" },
      "Saturday": { open: "08:00", close: "17:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "11",
    name: "Nancy Rothwell Building",
    image: "/images/nancyrothwellbuilding.jpg",
    category: "On campus",
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.234088, 53.469397],
    openingHours: {
      "Monday": { open: "08:00", close: "20:00" },
      "Tuesday": { open: "08:00", close: "20:00" },
      "Wednesday": { open: "08:00", close: "20:00" },
      "Thursday": { open: "08:00", close: "20:00" },
      "Friday": { open: "08:00", close: "20:00" },
      "Saturday": { open: "00:00", close: "00:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "12",
    name: "Withington Library",
    image: "/images/withingtonlibrary.jpeg",
    category: "Quiet spots",
    nearestStation: "Withington Station",
    distance: 3.5,
    coordinates: [-2.226558, 53.435576],
    openingHours: {
      "Monday": { open: "09:00", close: "20:00" },
      "Tuesday": { open: "13:00", close: "20:00" },
      "Wednesday": { open: "09:00", close: "20:00" },
      "Thursday": { open: "00:00", close: "00:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "09:00", close: "17:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "13",
    name: "Didsbury Library",
    image: "/images/DidsburyLibrary.jpg",
    category: "Quiet spots",
    nearestStation: "Didsbury Village Station",
    distance: 4.0,
    coordinates: [-2.232188, 53.418116],
    openingHours: {
      "Monday": { open: "09:00", close: "20:00" },
      "Tuesday": { open: "09:00", close: "20:00" },
      "Wednesday": { open: "00:00", close: "00:00" },
      "Thursday": { open: "09:00", close: "17:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "09:00", close: "17:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "14",
    name: "Chapter One Books",
    image: "/images/chapter_one_books.jpg",
    category: "Cafés",
    nearestStation: "Piccadilly Station",
    distance: 1.5,
    coordinates: [-2.235113, 53.481791],
    openingHours: {
      "Monday": { open: "09:00", close: "18:00" },
      "Tuesday": { open: "09:00", close: "18:00" },
      "Wednesday": { open: "09:00", close: "18:00" },
      "Thursday": { open: "09:00", close: "18:00" },
      "Friday": { open: "09:00", close: "18:00" },
      "Saturday": { open: "09:00", close: "18:00" },
      "Sunday": { open: "09:00", close: "18:00" }
    }
  },
  {
    id: "15",
    name: "The Portico library",
    image: "/images/The Portico Library.webp",
    category: "Quiet spots",
    nearestStation: "Piccadilly Station",
    distance: 1,
    coordinates: [-2.240345, 53.479700],
    openingHours: {
      "Monday": { open: "10:00", close: "17:00" },
      "Tuesday": { open: "10:00", close: "17:00"  },
      "Wednesday": { open: "10:00", close: "17:00"  },
      "Thursday": { open: "10:00", close: "19:00"  },
      "Friday": { open: "11:00", close: "17:00" },
      "Saturday": { open: "12:00", close: "16:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
];