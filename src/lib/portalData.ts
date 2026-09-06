import type { TempleId } from './data';

export interface TemplePortalData {
  id: TempleId;
  theme: {
    primary: string; // Tailwind class
    secondary: string;
    gradient: string;
  };
  hero: {
    image: string;
    tagline: string;
  };
  weather: {
    temp: string;
    condition: string;
    extra: { label: string; value: string }[];
  };
  info: {
    history: string;
    architecture: string;
    dressCode: string;
    photography: string;
    bestTime: string;
  };
  gallery: string[];
  attractions: { name: string; desc: string; dist: string }[];
  emergency: { name: string; number: string }[];
  notifications: string[];
}

export const PORTAL_DATA: Record<TempleId, TemplePortalData> = {
  somnath: {
    id: 'somnath',
    theme: {
      primary: 'saffron-500',
      secondary: 'saffron-100',
      gradient: 'from-sky-500 to-saffron-500',
    },
    hero: {
      image: '/Somnath.jpeg',
      tagline: 'First Among Twelve Holy Jyotirlingas',
    },
    weather: {
      temp: '28°C',
      condition: 'Clear',
      extra: [
        { label: 'Sea State', value: 'Safe' },
        { label: 'Humidity', value: '65%' }
      ]
    },
    info: {
      history: 'Somnath is known as the eternal shrine, rebuilt several times after destruction. It holds the revered first Jyotirlinga of Lord Shiva.',
      architecture: 'Chalukya style architecture, also known as Kailash Mahameru Prasad, completed in 1951.',
      dressCode: 'Traditional Indian attire. Shorts and sleeveless clothes are strictly prohibited.',
      photography: 'Not allowed inside the main sanctum. Mobile phones must be deposited in the cloakroom.',
      bestTime: 'October to March. Early morning or evening for Aarti.',
    },
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg'
    ],
    attractions: [
      { name: 'Bhalka Tirth', desc: 'The sacred site where Lord Krishna is believed to have been hit by an arrow.', dist: '4 km' },
      { name: 'Triveni Sangam', desc: 'Confluence of Hiran, Kapila, and Saraswati rivers.', dist: '2 km' },
      { name: 'Prabhas Museum', desc: 'Houses ancient stone sculptures and inscriptions from the original temple.', dist: '500 m' }
    ],
    emergency: [
      { name: 'Control Room', number: '+91 2876 231200' },
      { name: 'Medical Help', number: '108' },
      { name: 'Women Helpline', number: '181' }
    ],
    notifications: [
      'Sea promenade is currently open for visitors.',
      'Heavy crowds expected for Sandhya Aarti today.'
    ]
  },
  dwarka: {
    id: 'dwarka',
    theme: {
      primary: 'blue-600',
      secondary: 'blue-100',
      gradient: 'from-blue-600 to-amber-500',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Dwarakadheesh_Temple%2C_2014.jpg',
      tagline: 'The Divine Kingdom of Lord Krishna',
    },
    weather: {
      temp: '30°C',
      condition: 'Sunny',
      extra: [
        { label: 'River Level', value: 'Normal' },
        { label: 'Wind', value: '14 km/h' }
      ]
    },
    info: {
      history: 'Dwarka was the legendary capital of Lord Krishna. The current Dwarkadhish temple is believed to be over 2,000 years old.',
      architecture: 'Supported by 72 intricately carved pillars, the 5-story main shrine stands tall over Gomti Creek.',
      dressCode: 'Decent attire required. Short pants and miniskirts are not permitted.',
      photography: 'Electronic devices and cameras must be deposited before entering the Swarga Dwar.',
      bestTime: 'September to March, especially during Janmashtami.',
    },
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Shri_Jagannath_temple.jpg/1280px-Shri_Jagannath_temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg'
    ],
    attractions: [
      { name: 'Gomti Ghat', desc: 'Sacred stepped ghats leading to the Gomti river for holy dips.', dist: '200 m' },
      { name: 'Bet Dwarka', desc: 'Island believed to be the original residence of Lord Krishna.', dist: '30 km' },
      { name: 'Rukmini Temple', desc: '12th-century architectural masterpiece dedicated to Krishna’s consort.', dist: '2 km' }
    ],
    emergency: [
      { name: 'Temple Security', number: '+91 2892 234080' },
      { name: 'Medical Help', number: '108' }
    ],
    notifications: [
      'Boat services to Bet Dwarka are operating normally.',
      'VIP Entry is restricted today from 12:00 PM to 2:00 PM.'
    ]
  },
  ambaji: {
    id: 'ambaji',
    theme: {
      primary: 'red-600',
      secondary: 'red-100',
      gradient: 'from-red-600 to-amber-500',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/1280px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG',
      tagline: 'The Supreme Shakti Peeth of Arasur',
    },
    weather: {
      temp: '26°C',
      condition: 'Pleasant',
      extra: [
        { label: 'Hill Weather', value: 'Breezy' }
      ]
    },
    info: {
      history: 'One of the original 51 Shakti Peethas. Unlike other temples, there is no idol, but a holy Viso Yantra is worshiped as the deity.',
      architecture: 'Constructed of pristine white marble with golden cones on the shikhara.',
      dressCode: 'Traditional and respectful attire. Shoulders and knees must be covered.',
      photography: 'Photography is strictly prohibited inside the main temple premises.',
      bestTime: 'Navratri and Bhadarvi Poonam festivals.',
    },
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lingaraj_Temple_%2C_Bhubaneswar.jpg/1280px-Lingaraj_Temple_%2C_Bhubaneswar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ramanathaswamy_temple7.JPG/1280px-Ramanathaswamy_temple7.JPG'
    ],
    attractions: [
      { name: 'Gabbar Hill', desc: 'The original seat of Mataji, accessible via steps or ropeway.', dist: '3 km' },
      { name: 'Kumbhariya Jinalaya', desc: 'Five ancient Jain temples with intricate marble carvings.', dist: '2 km' },
      { name: 'Mansarovar', desc: 'A holy lake behind the main temple complex.', dist: '500 m' }
    ],
    emergency: [
      { name: 'Police Booth', number: '100' },
      { name: 'Trust Office', number: '+91 2749 262136' }
    ],
    notifications: [
      'Ropeway to Gabbar is active until 8 PM.',
      'Prasad counters have been shifted to Gate 3.'
    ]
  },
  pavagadh: {
    id: 'pavagadh',
    theme: {
      primary: 'purple-600',
      secondary: 'purple-100',
      gradient: 'from-purple-600 to-amber-500',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kalika_Mata_Temple%2C_Pavagarh.jpg/1280px-Kalika_Mata_Temple%2C_Pavagarh.jpg',
      tagline: 'The Sacred Summit of Maa Mahakalika',
    },
    weather: {
      temp: '22°C',
      condition: 'Cloudy',
      extra: [
        { label: 'Visibility', value: 'Low (Fog)' }
      ]
    },
    info: {
      history: 'Situated on a volcanic hill, this temple is part of the Champaner-Pavagadh Archaeological Park, a UNESCO World Heritage Site.',
      architecture: 'An ancient shrine perched atop a steep hill, recently renovated with a magnificent golden shikhara.',
      dressCode: 'Modest traditional clothing. Trekking gear is recommended for climbing the steps.',
      photography: 'Not allowed in the main sanctum. Drones are strictly prohibited around the hill.',
      bestTime: 'Monsoon or Winter (July to February). Avoid peak summer afternoons.',
    },
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/1280px-Badrinath_Temple_%2C_Uttarakhand.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg'
    ],
    attractions: [
      { name: 'Champaner Heritage Park', desc: 'UNESCO world heritage site with Islamic & Hindu architecture.', dist: '6 km' },
      { name: 'Machi Haveli', desc: 'Rest stop and viewpoint halfway up the Pavagadh hill.', dist: '2 km' },
      { name: 'Ropeway (Udan Khatola)', desc: 'Scenic cable car ride saving 250+ steep steps.', dist: '1 km' }
    ],
    emergency: [
      { name: 'Hill Rescue', number: '+91 2676 245630' },
      { name: 'Medical Help', number: '108' }
    ],
    notifications: [
      'Ropeway services are paused due to high wind speeds.',
      'Visibility is extremely low on the summit. Trek carefully.'
    ]
  }
};
