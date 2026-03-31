import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectGallery from '@/components/ProjectGallery';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Hero />
      <ProjectGallery />
      <Skills />
      <Contact />
    </main>
  );
}
