export interface Track {
  key: string;
  name: string;
  url: string;
  pictures?: {
    thumbnail: string;
    medium_mobile?: string;
    large?: string;
  };
}
