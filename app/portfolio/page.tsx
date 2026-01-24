import HeroSection from '@/app/_components/HeroSection';
import ProjectsSection from '@/app/_components/ProjectsSection';
import WorksSection from '@/app/_components/WorksSection';
import ActivitySection from '@/app/_components/ActivitySection';

export default function Portfolio() {
  return (
    <main className="pt-16">
      <HeroSection />
      <div id="work">
        <ProjectsSection />
      </div>
      <WorksSection />
      <ActivitySection />
    </main>
  );
}
