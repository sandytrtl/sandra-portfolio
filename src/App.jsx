import { useState, useEffect } from 'react';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import Skills   from './components/Skills';
import Projects from './components/Projects';
import Contact  from './components/Contact';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));

  useReveal();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
