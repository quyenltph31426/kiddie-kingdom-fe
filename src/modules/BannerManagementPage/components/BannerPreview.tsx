import type { IBanner } from '@/api/banner/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  banner: IBanner;
  className?: string;
};

const BannerPreview = ({ banner, className }: Props) => {
  if (!banner.isActive) return null;

  const content = (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <Image
        src={banner.image}
        alt={banner.title}
        width={1200}
        height={400}
        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h3 className="font-bold text-xl">{banner.title}</h3>
        {banner.subtitle && <p className="mt-1 font-medium text-sm">{banner.subtitle}</p>}
        {banner.description && <p className="mt-1 text-sm opacity-90">{banner.description}</p>}
      </div>
    </div>
  );

  if (banner.link) {
    return (
      <Link href={banner.link} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
};

export default BannerPreview;
