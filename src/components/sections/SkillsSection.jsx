import { skillCategories } from '../../data/skills';
import SectionWrapper, { SectionTitle, SectionIntro } from '../ui/SectionWrapper';
import SkillCategoryCard from './SkillCategoryCard';

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle subtitle="Skills" title="Technical Expertise" />

      <SectionIntro>
        Core technologies and tools I use to build fast, scalable, and user-focused web
        applications.
      </SectionIntro>

      <div className="skills-categories">
        {skillCategories.map((category, i) => (
          <SkillCategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
