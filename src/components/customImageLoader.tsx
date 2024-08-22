import type { ImageLoaderProps } from 'next/image';
const customImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
}

export default customImageLoader