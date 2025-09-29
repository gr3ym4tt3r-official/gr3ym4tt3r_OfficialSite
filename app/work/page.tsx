'use client'

import { ContainedPageLayout } from '@/components/layout'
import { Container, Grid, Stack, Button, Heading, DisplayHeading, SectionHeading, Text, Lead, Caption } from '@/design-system'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// This would come from a CMS or API in a real application
const projects = [
  {
    id: 1,
    title: 'GR3YM4TT3R Design System',
    description: 'A comprehensive design system built with TypeScript, React, and TailwindCSS, featuring dark/light themes and accessibility-first components.',
    category: 'Design System',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    status: 'In Progress',
    featured: true,
    image: '/placeholder-project-1.jpg',
    githubUrl: 'https://github.com/gr3ym4tt3r-official/design-system',
    liveUrl: 'https://design-system.gr3ym4tt3r.com'
  },
  {
    id: 2,
    title: 'Stoic Daily',
    description: 'A minimalist app for daily stoic philosophy practice, featuring quotes, journaling, and progress tracking.',
    category: 'Mobile App',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Expo'],
    status: 'Planning',
    featured: false,
    image: '/placeholder-project-2.jpg',
    githubUrl: 'https://github.com/gr3ym4tt3r-official/stoic-daily',
    liveUrl: null
  },
  {
    id: 3,
    title: 'Tactical Fitness Tracker',
    description: 'A fitness tracking application focused on functional movement and tactical training protocols.',
    category: 'Web App',
    technologies: ['Next.js', 'PostgreSQL', 'tRPC', 'Prisma'],
    status: 'Concept',
    featured: false,
    image: '/placeholder-project-3.jpg',
    githubUrl: null,
    liveUrl: null
  }
]

const categories = ['All', 'Design System', 'Web App', 'Mobile App']
const statuses = ['All', 'Live', 'In Progress', 'Planning', 'Concept']

interface ProjectCardProps {
  project: typeof projects[0]
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-grey-950/50 rounded-lg border border-grey-800/50 overflow-hidden hover:border-signal-red-500/30 transition-colors duration-300">
      {/* Project Image */}
      <div className="aspect-video bg-grey-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-grey-800 to-grey-900 flex items-center justify-center">
          <Caption>
            Project Preview
          </Caption>
        </div>
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-signal-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-signal-red-500 text-sm font-medium">{project.category}</span>
            <span className={`text-xs px-2 py-1 rounded ${
              project.status === 'Live' ? 'bg-green-500/10 text-green-500' :
              project.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-grey-500/10 text-grey-400'
            }`}>
              {project.status}
            </span>
          </div>
          <SectionHeading size="base" className="mb-3">
            {project.title}
          </SectionHeading>
          <Text color="secondary" className="mb-4">
            {project.description}
          </Text>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="bg-grey-800/50 text-grey-300 px-2 py-1 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 bg-transparent text-grey-100 border border-transparent rounded hover:bg-grey-800/50 hover:text-signal-red-500 transition-all duration-200 font-medium text-sm"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 bg-transparent text-grey-100 border border-grey-700 rounded hover:bg-grey-800/50 hover:border-signal-red-500 transition-all duration-200 font-medium text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  return (
    <ContainedPageLayout>
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Container size="sm">
          <Stack space="lg">
            <DisplayHeading size="xl">
              Work & Projects
            </DisplayHeading>
            <Lead color="secondary">
              A showcase of projects built with discipline, precision, and technical excellence
            </Lead>
          </Stack>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8">
        <Container size="full">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Category Filter */}
              <div>
                <Text className="mb-3 font-medium text-grey-300">
                  Category
                </Text>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Text className="mb-3 font-medium text-grey-300">
                  Status
                </Text>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-8">
        <Container size="full">
          {filteredProjects.length > 0 ? (
            <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-16">
              <Text color="secondary">
                No projects found matching the selected filters.
              </Text>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-grey-900/30 rounded-lg mt-16">
        <Container size="sm" className="text-center">
          <Stack space="lg">
            <SectionHeading size="xl">
              Have a Project in Mind?
            </SectionHeading>
            <Text color="secondary">
              Let&apos;s discuss how we can bring your vision to life with precision and excellence.
            </Text>
            <div className="mt-8">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-4 bg-signal-red-500 text-grey-950 border border-signal-red-500 rounded-lg hover:bg-red-600 hover:shadow-lg hover:shadow-signal-red-500/40 transition-all duration-200 font-medium text-base min-h-12"
              >
                Start a Project
              </a>
            </div>
          </Stack>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}