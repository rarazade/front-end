import gameImg1 from '../assets/Draft_Design3.webp';
import gameImg2 from '../assets/placeholder.jpg';

export const gamesData = [
  {
    id: 1,
    title: 'Cyber Force',
    description: 'Cyber Force is a fast-paced action game set in a dystopian future where players fight rogue AI machines to restore peace.',
    platform: 'PC',
    category: 'Action',
    releaseDate: '2024-06-15',
    img: gameImg1,
    screenshots: [gameImg1, gameImg2, gameImg1],
  },
  {
    id: 2,
    title: 'Mystery Puzzle',
    description: 'Unravel ancient secrets and solve mind-bending puzzles in this mysterious puzzle adventure.',
    platform: 'PC',
    category: 'Puzzle',
    releaseDate: '2023-12-01',
    img: gameImg2,
    screenshots: [gameImg2, gameImg1],
  },
  {
    id: 3,
    title: 'Ghost Hunter',
    description: 'Become a ghost hunter and battle supernatural forces in haunted places across the world.',
    platform: 'Mobile',
    category: 'Horror',
    releaseDate: '2025-01-10',
    img: gameImg1,
    screenshots: [gameImg1, gameImg2, gameImg1],
  },
  {
    id: 4,
    title: 'Jungle Adventure',
    description: 'Embark on an epic jungle quest full of traps, treasure, and hidden secrets in this side-scrolling platformer.',
    platform: 'Mobile',
    category: 'Adventure',
    releaseDate: '2024-03-21',
    img: gameImg2,
    screenshots: [gameImg2, gameImg1],
  },
];
