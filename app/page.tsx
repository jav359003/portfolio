import { Hero } from '@/components/sections/Hero';
import { ExperienceSection } from '@/components/sections/Experience';
import { ProjectsSection } from '@/components/sections/Projects';
import { SkillsSection } from '@/components/sections/Skills';
import { AboutSection } from '@/components/sections/About';
import { EducationSection } from '@/components/sections/Education';
import { MoreSection } from '@/components/sections/More';
import { ContactSection } from '@/components/sections/Contact';

/**
 * Section order is deliberate: a recruiter reading top-to-bottom gets
 * who → proof → work → projects → skills → story → credentials → contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="shell">
        <div className="rule" />
      </div>
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <EducationSection />
      <MoreSection />
      <ContactSection />
    </>
  );
}
