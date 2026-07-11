export interface Painting {
  title: string;
  originalTitle: string;
  artist: string;
  year: string;
  style: string;
  review: string;
  imageKeywords: string;
  painting_title?: string;
}

export interface Music {
  title: string;
  composer: string;
  opus: string;
  review: string;
  searchQuery: string;
}

export interface Curation {
  quote: string;
  painting: Painting;
  music: Music;
  mood?: string;
  timestamp?: string; // used for saved gallery records
}
