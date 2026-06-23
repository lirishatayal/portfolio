import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { education } from '../../data/education';
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
          className="w-4 h-4 rounded-full bg-neon-purple relative z-10 shrink-0"
          whileInView={{ scale: [0, 1.4, 1] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          style={{
            boxShadow: '0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.2)',
          }}
        />
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-neon-purple/50 to-neon-cyan/20 min-h-[72px] mt-2" />
        )}
      </div>

      <div className="card-base flex-1 mb-8 md:mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-neon-purple">{item.period}</span>
          {item.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="font-mono text-xs text-slate-500">{item.location}</span>
            </>
          )}
        </div>

        <h3 className="type-heading-md mb-2 gradient-text">{item.degree}</h3>
        <p className="type-body-sm text-slate-200 leading-relaxed">{item.institution}</p>
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <SectionWrapper id="education">
      <SectionTitle subtitle="Education" title="Academic Foundation" />

      <div ref={containerRef} className="relative max-w-3xl mx-auto w-full">
        <motion.div
          className="absolute left-[7px] top-0 w-px h-full bg-space-800"
          style={{ originY: 0 }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-neon-purple to-neon-cyan"
            style={{ height: useTransform(pathProgress, (v) => `${v}%`) }}
          />
        </motion.div>

        {education.map((item, i) => (
          <TimelineNode key={item.id} item={item} index={i} total={education.length} />
        ))}
      </div>
    </SectionWrapper>
  );
}
