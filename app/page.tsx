import HeroSection from '@/app/_components/HeroSection';
import ProjectsSection from '@/app/_components/ProjectsSection';
import ActivitySection from '@/app/_components/ActivitySection';

export default function Home() {
  return (
    <main className="pt-16">
      <HeroSection />
      <div id="work">
        <ProjectsSection />
      </div>
      <ActivitySection />
    </main>
  );
}
