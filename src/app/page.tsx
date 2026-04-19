import dynamic from "next/dynamic";
import {
  getHero,
  getAbout,
  getSkills,
  getExperiences,
  getProjects,
  getContactInfo,
} from "@/lib/strapi";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

export default async function HomePage() {
  const [hero, about, skills, experiences, projects, contactInfo] =
    await Promise.all([
      getHero(),
      getAbout(),
      getSkills(),
      getExperiences(),
      getProjects(),
      getContactInfo(),
    ]);

  return (
    <>
      <Hero data={hero} />
      <About data={about} />
      <Skills data={skills.length > 0 ? skills : null} />
      <Experience data={experiences.length > 0 ? experiences : null} />
      <Projects data={projects.length > 0 ? projects : null} />
      <Contact data={contactInfo} />
    </>
  );
}
