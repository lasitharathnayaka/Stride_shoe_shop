import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedReleasesSection from '@/components/home/FeaturedReleasesSection';
import InnovationSection from '@/components/home/InnovationSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedReleasesSection />
      <InnovationSection />
      <NewsletterSection />
    </>
  );
}
