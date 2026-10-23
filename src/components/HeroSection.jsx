import Slider from './Slider';

function HeroSection({ featuredProduct }) {
  return (
    <div className="mb-12 sm:mb-16">
      <Slider 
        imageSrc="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1740" 
        featuredProduct={featuredProduct}
      />
    </div>
  );
}

export default HeroSection;
