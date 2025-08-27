import { About } from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import Projects from "@/components/Home/Projects";


export default function Home() {
  return (
    <main className="bg-black ">
      {/* <Navbar /> */}
      <Hero />
      <About id="about" />
      <Projects id="projects" />
    </main>
  );
}
