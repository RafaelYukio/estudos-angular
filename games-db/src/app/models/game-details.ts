export interface GameDetails {
  id: string;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: Date;
  freetogame_profile_url: string;
  minimum_system_requirements: MinimumSystemRequirements;
  screenshots: Array<Screenshots>;
}

interface MinimumSystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface Screenshots {
  id: string;
  image: string;
}
