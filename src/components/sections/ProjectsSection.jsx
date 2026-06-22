import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { projects } from '../../data/projects';
import SectionWrapper, { SectionTitle } from '../ui/SectionWrapper';
import { useModal } from '../../context/ModalContext';
import { componentMap } from '../../utils/helpers';

const componentCache = {};

async function loadComponent(name) {
  if (!componentCache[name] && componentMap[name]) {
    const mod = await componentMap[name]();
    componentCache[name] = mod.default;
  }
  return componentCache[name];
}

export default function ProjectsSection() {
  const { openModal } = useModal();
  const [loading, setLoading] = useState(null);

  const handleOpen = async (project) => {
    if (!project.component) return;
    setLoading(project.id);
    const Component = await loadComponent(project.component);
    setLoading(null);
    if (Component) {
      openModal(Component, project.title);
    }
  };

  return (
    <SectionWrapper id="projects">
      <SectionTitle subtitle="Projects" title="Holographic Portfolio" />

      <div className="content-grid content-grid--2">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="group h-full"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div
              className="card-base h-full flex flex-col transition-all duration-300 hover:border-white/20 relative overflow-hidden"
              style={{ borderColor: `${project.color}22` }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none"
                style={{ backgroundColor: project.color }}
              />

              {project.featured && (
                <span
                  className="tag tag--sm self-start mb-5"
                  style={{ backgroundColor: `${project.color}18`, color: project.color, borderColor: `${project.color}33` }}
                >
                  Featured
                </span>
              )}

              <h3 className="type-heading-md mb-4 group-hover:text-neon-cyan transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-400 type-body-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="tag-list mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="tag tag--sm">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.component && (
                  <button
                    onClick={() => handleOpen(project)}
                    disabled={loading === project.id}
                    className="btn btn--sm"
                    style={{
                      backgroundColor: `${project.color}22`,
                      color: project.color,
                      borderColor: `${project.color}33`,
                    }}
                    data-cursor="pointer"
                  >
                    <Play size={14} />
                    {loading === project.id ? 'Loading...' : 'Launch'}
                  </button>
                )}
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn--sm"
                    data-cursor="pointer"
                  >
                    <ExternalLink size={14} />
                    View
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
