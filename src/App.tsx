"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Footer from '@/components/Footer'
import { Cursor, ProgressBar } from '@/components/animated'

export default function App() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Header />
      <main className="max-w-3xl mx-auto px-6">
        <Hero />
        <Education />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </>
  )
}
