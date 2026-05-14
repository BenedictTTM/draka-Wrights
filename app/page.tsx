import Link from 'next/link';
import { ArrowRight, Play, BookOpen, Shield, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="paper-texture min-h-screen text-textPrimary overflow-x-hidden">
      <div className="absolute inset-0 top-0 h-[500px] w-full bg-cover bg-center sm:h-[600px] md:h-[700px]" style={{ backgroundImage: 'url("/bg.png")' }}></div>
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-20 pb-12 sm:px-6 sm:pt-24 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:px-8 lg:px-12 md:pb-16 md:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-12 sm:-left-24 top-6 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-accent/30 blur-[80px] sm:blur-[110px]" />
          <div className="absolute right-0 top-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/40 blur-[100px] sm:blur-[140px]" />
          <div className="absolute left-4 sm:left-10 bottom-2 h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-accent/20 blur-[90px] sm:blur-[130px]" />

          <svg
            className="absolute left-2 sm:left-4 top-4 sm:top-6 h-12 w-12 sm:h-16 sm:w-16 text-primary"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path d="M6 50C16 34 38 30 54 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M10 58C20 42 42 38 58 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute left-16 sm:left-24 top-0 sm:top-2 h-16 w-16 sm:h-20 sm:w-20 text-accent opacity-60 sm:opacity-100"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden="true"
          >
            {Array.from({ length: 12 }).map((_, index) => {
              const x = 8 + (index % 4) * 18;
              const y = 8 + Math.floor(index / 4) * 18;
              return (
                <g key={`cross-${index}`} transform={`translate(${x} ${y})`}>
                  <path d="M0 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 0V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </g>
              );
            })}
          </svg>
        </div>

        <section className="relative flex flex-col gap-5 sm:gap-6 font-serif z-10">
          <h1 className="max-w-xl text-[2.5rem] font-bold leading-[1.05] text-primary sm:text-5xl lg:text-[5.5rem] tracking-tight">
            <span className="block">Awareness &</span>
            <span className="relative inline-block pb-1 sm:pb-2">
              Prevention
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M0,10 Q100,0 200,8" stroke="var(--color-accent, #c9a24a)" strokeWidth="4" fill="none" />
              </svg>
            </span>
            <span className="block italic font-medium mt-1">Together</span>
          </h1>

          <p className="max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed text-textSecondary mt-1 sm:mt-2 font-sans font-medium">
            Empowering our community with education and resources to foster safe and inclusive environments for all.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 font-sans">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-white shadow-lg transition hover:bg-primary-dark w-full sm:w-auto justify-center text-center"
            >
              Get Support
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="group relative inline-flex items-center gap-3 font-semibold text-primary transition hover:opacity-80 w-full sm:w-auto justify-center">
              <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-[3px] border-accent/40 bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <Play className="ml-1 h-5 w-5" fill="currentColor" />
              </span>
              Watch Video
            </button>
          </div>

          <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 md:block">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
              <path d="M6 52C14 34 42 30 56 12" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 60C20 42 48 38 62 20" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </section>

        <section className="relative flex items-center justify-center mt-6 md:mt-0">
          <div className="relative w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-lg">
            <svg className="absolute -right-6 sm:-right-10 top-2 sm:top-4 h-24 w-40 sm:h-32 sm:w-56 rotate-6 text-accent/70" viewBox="0 0 280 160" fill="currentColor" aria-hidden="true">
              <path d="M22 88C52 46 98 12 150 10C202 8 232 44 256 70C280 96 264 128 220 142C176 156 126 150 82 138C38 126 -8 130 22 88Z" />
            </svg>
            <svg className="absolute -left-4 sm:-left-6 bottom-0 sm:bottom-2 h-20 w-32 sm:h-28 sm:w-44 -rotate-6 text-primary/80" viewBox="0 0 220 130" fill="currentColor" aria-hidden="true">
              <path d="M20 72C44 32 88 8 134 14C180 20 210 58 200 94C190 130 142 120 96 112C50 104 -4 112 20 72Z" />
            </svg>

            <div className="relative">
              <img
                src="/heroi.png"
                alt="Hero"
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:drop-shadow-[0_35px_70px_rgba(0,0,0,0.2)] md:w-[115%] md:max-w-none md:-translate-x-8"
              />
            </div>

            <div className="absolute -left-6 sm:-left-10 -bottom-4 sm:-bottom-6 hidden md:block">
              <div className="flex items-end gap-2">
                <div className="h-10 w-6 sm:h-12 sm:w-8 rounded-full border-2 border-primary" />
                <div className="h-14 w-8 sm:h-16 sm:w-10 rounded-full border-2 border-accent" />
                <div className="h-8 w-5 sm:h-10 sm:w-7 rounded-full border-2 border-primary" />
              </div>
            </div>
            <div className="absolute -right-4 sm:-right-6 bottom-4 sm:bottom-6">
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary" />
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-bgSurface px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
          <svg className="absolute -left-8 sm:-left-12 top-2 sm:top-6 h-20 w-36 sm:h-28 sm:w-48 -rotate-3 text-primary/90 hidden sm:block" viewBox="0 0 220 130" fill="currentColor" aria-hidden="true">
            <path d="M16 72C36 32 86 8 134 14C182 20 210 54 198 90C186 126 140 120 96 112C52 104 -4 112 16 72Z" />
          </svg>
          <div className="absolute right-8 sm:right-16 top-6 sm:top-8 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/15 hidden sm:block" />

          <div className="relative grid items-center gap-8 md:gap-12 md:grid-cols-[1.05fr_1fr]">
            <div className="relative flex items-center justify-center order-2 md:order-1 pt-6 md:pt-0">
              <div className="relative w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-md">
                <img
                  src="/c1.png"
                  alt="Children at a window"
                  className="w-full rounded-[24px] sm:rounded-[32px] border-[6px] sm:border-[10px] border-borderLight shadow-[0_15px_30px_-20px_rgba(0,59,122,0.18)]"
                />
                <img
                  src="/c2.png"
                  alt="Children looking out"
                  className="absolute -right-4 sm:-right-8 top-4 sm:top-6 w-32 sm:w-40 md:w-48 rounded-[20px] sm:rounded-[26px] border-[6px] sm:border-8 border-borderLight shadow-[0_10px_20px_-10px_rgba(0,59,122,0.2)]"
                />
                <img
                  src="/c3.png"
                  alt="Family on a boat"
                  className="absolute -right-6 sm:-right-10 bottom-2 sm:bottom-4 w-36 sm:w-44 md:w-56 rounded-[22px] sm:rounded-[28px] border-[6px] sm:border-8 border-borderLight shadow-[0_10px_20px_-10px_rgba(0,59,122,0.2)]"
                />
                <div className="absolute -left-2 sm:-left-4 bottom-2 sm:bottom-4 flex flex-wrap gap-1 sm:gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span
                      key={`dot-${index}`}
                      className="h-2 w-2 sm:h-3 sm:w-3 rounded-full border-2 border-accent"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-4 sm:gap-5 order-1 md:order-2">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent">
                Breaking the Silence
              </span>
              <h2 className="text-2xl font-semibold leading-[1.15] text-textPrimary sm:text-3xl lg:text-4xl">
                Advocating for Change, One Voice At A Time
              </h2>
              <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-textSecondary">
                Our platform provides confidential reporting, educational workshops, and a supportive community 
                to address and prevent sexual harassment. We believe in creating a culture of consent and 
                respect in every workplace and educational institution.
              </p>

              <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm lg:text-base text-textSecondary mt-2">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-textPrimary">Education & Training</p>
                    <p className="text-textSecondary mt-0.5">
                      Comprehensive programs designed to empower individuals and organizations with the 
                      knowledge to identify and prevent harassment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-accent">
                    <Shield className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-textPrimary">Confidential Support</p>
                    <p className="text-textSecondary mt-0.5">
                      Survivor-centered resources and advocacy to provide a safe path forward for those 
                      who have experienced harassment.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/procedures"
                className="mt-4 sm:mt-2 inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgba(0,59,122,0.45)] transition hover:bg-primary-dark text-center"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-6 sm:gap-8 border-t border-[#ece6dc] pt-6 sm:pt-8 text-center lg:grid-cols-4">
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-primary">5k+</p>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">People Trained</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-accent">100%</p>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">Confidentiality</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-primary">24/7</p>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">Support Access</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-accent">50k+</p>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">Resources Shared</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="flex flex-col items-center gap-8 sm:gap-10 rounded-[24px] sm:rounded-[32px] bg-bgSurface px-4 py-8 sm:px-8 sm:py-10 md:flex-row md:items-center md:px-12 md:py-12">
          <div className="flex-1 text-center md:text-left">
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-textPrimary">Get help and support</h3>
            <p className="mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed text-textSecondary">
              Everyone responds differently to sexual harassment and other forms of sexual violence – so whatever someone feels is a valid response.
            </p>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-textSecondary">
              If you have experienced sexual harassment or sexual violence of any kind – whether it was recently or a long time ago – Rape Crisis is here for you. We will listen to you and believe you.
            </p>
          </div>
          
          <div className="flex w-full md:w-[22rem] lg:w-auto items-center gap-4 sm:gap-6 rounded-[20px] sm:rounded-[24px] border border-borderLight bg-bgPrimary/70 p-4 sm:p-6 shadow-sm flex-col sm:flex-row h-full">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <Link href="/resources" className="font-semibold text-primary underline transition hover:text-primary-dark text-sm sm:text-base text-center sm:text-left">
              Get help and support after sexual harassment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
