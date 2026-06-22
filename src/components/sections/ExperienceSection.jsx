import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '../../data/experience';
import SectionWrapper, { SectionTitle } from '../ui/SectionWrapper';

function TimelineNode({ item, index, total }) {
  return (
    <motion.div
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-col items-center pt-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-neon-cyan relative z-10 shrink-0"
          whileInView={{ scale: [0, 1.4, 1] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          style={{
            boxShadow: '0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2)',
          }}
        />
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-neon-cyan/50 to-neon-purple/20 min-h-[96px] mt-2" />
        )}
      </div>

      <div className="card-base flex-1 mb-8 md:mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-neon-cyan">{item.period}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="font-mono text-xs text-slate-500">
            {item.company}
            {item.location ? `, ${item.location}` : ''}
          </span>
        </div>

        <h3 className="type-heading-md mb-3 gradient-text">{item.role}</h3>

        <p className="text-slate-400 type-body-sm mb-5 leading-relaxed">{item.description}</p>

        <ul className="space-y-3">
          {item.achievements.map((achievement) => (
            <li key={achievement} className="flex items-start gap-3 type-body-sm text-slate-300 leading-relaxed">
              <span className="text-neon-cyan mt-0.5 shrink-0">▸</span>
              {achievement}
            </li>
          ))}
        </ul>

        {item.projects?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-5">
            <p className="type-overline">Key Projects</p>
            {item.projects.map((project) => (
              <div key={project.title}>
                <h4 className="font-display text-sm font-semibold text-neon-cyan mb-3">{project.title}</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 type-body-sm text-slate-400 leading-relaxed"
                    >
                      <span className="text-neon-purple mt-0.5 shrink-0">◆</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <SectionWrapper id="experience">
      <SectionTitle subtitle="Experience" title="Journey Through Space" />

      <div ref={containerRef} className="relative max-w-3xl mx-auto w-full">
        <motion.div
          className="absolute left-[7px] top-0 w-px h-full bg-space-800"
          style={{ originY: 0 }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-neon-cyan to-neon-purple"
            style={{ height: useTransform(pathProgress, (v) => `${v}%`) }}
          />
        </motion.div>

        {experience.map((item, i) => (
          <TimelineNode key={item.id} item={item} index={i} total={experience.length} />
        ))}
      </div>
    </SectionWrapper>
  );
}
