This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Here's a student-friendly overview of StudyMapper's key features:

# 🎓 StudyMapper Features

## 📍 Find Study Spaces Easily
- See all study spaces around University of Manchester on an interactive map
- Get real-time updates on which spaces are open right now
- Check closing times so you don't arrive at a closed location

## 📱 Smart Location Features 
- Find out which study space is closest to you
- Get walking distances to each location
- See your nearest train/metro station for each space
- Open directions directly in Google Maps

## 🔍 Quick Search & Filters
- Search for specific study spaces by name
- Filter to show only currently open spaces
- View study space ratings from other students
- See detailed opening hours for each location

## 💡 Smart Features
- Real-time updates of open/closed status
- Highlights the nearest study space to you
- Works great on both phone and computer
- Easy-to-read space details with photos

## ⭐ Special Spaces
Some notable locations include:
- [Main Library](app/page.tsx) (24/7 access)
- [Alan Gilbert Learning Commons](app/page.tsx) (24/7 access)
- John Rylands Library (historic building)
- AMBS (Business School library)
- [Central Library](app/page.tsx) (city center location)

*Designed to help University of Manchester students find their perfect study spot quickly and easily!*

Here's a summary of the main features of the study space finder application:

1. Interactive Map:

1. Displays study spaces as markers on a Mapbox-powered map
2. Custom styling for a visually appealing map design
3. Markers change color based on the open/closed status of spaces
4. Allows users to click on markers to select a study space



2. Sidebar:

1. Lists all available study spaces
2. Provides a search functionality to filter spaces by name
3. Includes an open/closed filter to show only currently open spaces
4. Displays real-time information about each space (name, rating, open status, etc.)
5. Shows the current date and time
6. Responsive design that can be toggled on mobile devices



3. Study Space Cards:

1. Display detailed information about each study space
2. Show open/closed status and opening hours
3. Include an expandable section for full opening hours
4. Provide a direct link to open the location in Google Maps
5. Highlight the nearest study space to the user



4. User Location Features:

1. Allows users to get their current location
2. Displays user location on the map
3. Calculates and displays distances to study spaces from the user's location
4. Identifies and highlights the nearest study space



5. Time-based Information:

1. Real-time updates of open/closed status for each space
2. Displays current time and updates it every minute
3. Shows "open until" time for currently open spaces



6. Responsive Design:

1. Adapts to different screen sizes (mobile, tablet, desktop)
2. Collapsible sidebar for mobile views
3. Full-width map on mobile devices



7. Additional UI Features:

1. Ability to reload the map
2. Glassmorphism styling for a modern look
3. Custom scrollbar styling
4. Accessibility features (e.g., aria labels, semantic HTML)



8. Data Management:

1. Handles a collection of study spaces with detailed information
2. Sorts spaces by distance when user location is available





This application provides a comprehensive solution for students or individuals looking for study spaces, combining location-based services, real-time information, and an intuitive user interface.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
