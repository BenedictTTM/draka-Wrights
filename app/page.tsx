export default function Home() {
  return (
    <div className="paper-texture min-h-screen text-textPrimary">
      <div className="absolute inset-0 top-0 h-[600px] w-full overflow-hidden bg-cover bg-center md:h-[700px]" style={{ backgroundImage: 'url("/bg.png")' }}></div>
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-12 pt-24 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:px-10 md:pb-16 md:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-6 h-56 w-56 rounded-full bg-accent/30 blur-[110px]" />
          <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-accent/40 blur-[140px]" />
          <div className="absolute left-10 bottom-2 h-48 w-48 rounded-full bg-accent/20 blur-[130px]" />

          <svg
            className="absolute left-4 top-6 h-16 w-16 text-primary"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path d="M6 50C16 34 38 30 54 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M10 58C20 42 42 38 58 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute left-24 top-2 h-20 w-20 text-accent"
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

        <section className="relative flex flex-col gap-6 font-serif">
          <h1 className="max-w-xl text-4xl font-bold leading-[1.1] text-primary sm:text-6xl md:text-[5.5rem] tracking-tight">
            <span className="block">Awareness &</span>
            <span className="relative inline-block pb-2">
              Prevention
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M0,10 Q100,0 200,8" stroke="var(--color-accent, #c9a24a)" strokeWidth="4" fill="none" />
              </svg>
            </span>
            <span className="block italic font-medium mt-1">Together</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-textSecondary sm:text-lg mt-2 font-sans font-medium">
            Empowering our community with education and resources to foster safe and inclusive environments for all.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-2 font-sans">
            <button className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white shadow-lg transition hover:bg-primary-dark">
              Get Support
              <span className="text-xl leading-none">&#8594;</span>
            </button>
            <button className="group inline-flex items-center gap-3 font-semibold text-primary transition hover:opacity-80">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-accent/40 bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1">
                  <path d="M7 6v12l10-6L7 6z" />
                </svg>
              </span>
              Watch Video
            </button>
          </div>

          <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 md:block">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
              <path
                d="M6 52C14 34 42 30 56 12"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M12 60C20 42 48 38 62 20"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md md:max-w-lg">
            <svg
              className="absolute -right-10 top-4 h-32 w-56 rotate-6 text-accent/70"
              viewBox="0 0 280 160"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 88C52 46 98 12 150 10C202 8 232 44 256 70C280 96 264 128 220 142C176 156 126 150 82 138C38 126 -8 130 22 88Z" />
            </svg>
            <svg
              className="absolute -left-6 bottom-2 h-28 w-44 -rotate-6 text-primary/80"
              viewBox="0 0 220 130"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 72C44 32 88 8 134 14C180 20 210 58 200 94C190 130 142 120 96 112C50 104 -4 112 20 72Z" />
            </svg>

            <div className="relative">
              <img
                src="/heroi.png"
                alt="Hero"
                className="w-full h-auto drop-shadow-[0_35px_70px_rgba(0,0,0,0.2)] md:w-[115%] md:max-w-none md:-translate-x-8"
              />
            </div>

            <div className="absolute -left-10 -bottom-6 hidden md:block">
              <div className="flex items-end gap-2">
                <div className="h-12 w-8 rounded-full border-2 border-primary" />
                <div className="h-16 w-10 rounded-full border-2 border-accent" />
                <div className="h-10 w-7 rounded-full border-2 border-primary" />
              </div>
            </div>
            <div className="absolute -right-6 bottom-6">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="relative overflow-hidden bg-bgSurface px-6 py-10 md:px-10 md:py-12">
          <svg
            className="absolute -left-12 top-6 h-28 w-48 -rotate-3 text-primary/90"
            viewBox="0 0 220 130"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 72C36 32 86 8 134 14C182 20 210 54 198 90C186 126 140 120 96 112C52 104 -4 112 16 72Z" />
          </svg>
          <div className="absolute right-16 top-8 h-16 w-16 rounded-full bg-accent/15" />

          <div className="relative grid items-center gap-10 md:grid-cols-[1.05fr_1fr]">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/c1.png"
                  alt="Children at a window"
                  className="w-full rounded-[32px] border-[10px] border-borderLight shadow-[0_24px_50px_-30px_rgba(0,59,122,0.18)]"
                />
                <img
                  src="/c2.png"
                  alt="Children looking out"
                  className="absolute -right-8 top-6 w-44 rounded-[26px] border-8 border-borderLight shadow-[0_18px_40px_-24px_rgba(0,59,122,0.2)] sm:w-48"
                />
                <img
                  src="/c3.png"
                  alt="Family on a boat"
                  className="absolute -right-10 bottom-4 w-52 rounded-[28px] border-8 border-borderLight shadow-[0_18px_40px_-24px_rgba(0,59,122,0.2)] sm:w-56"
                />
                <div className="absolute -left-4 bottom-4 flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span
                      key={`dot-${index}`}
                      className="h-3 w-3 rounded-full border-2 border-accent"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-5">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                Breaking the Silence
              </span>
              <h2 className="text-3xl font-semibold leading-[1.15] text-textPrimary sm:text-4xl">
                Advocating for Change, One Voice At A Time
              </h2>
              <p className="text-sm leading-7 text-textSecondary sm:text-base">
                Our platform provides confidential reporting, educational workshops, and a supportive community 
                to address and prevent sexual harassment. We believe in creating a culture of consent and 
                respect in every workplace and educational institution.
              </p>

              <div className="flex flex-col gap-4 text-sm text-textSecondary sm:text-base">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 12C8 7 11 4 16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 12C8 17 11 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-textPrimary">Education & Training</p>
                    <p className="text-textSecondary">
                      Comprehensive programs designed to empower individuals and organizations with the 
                      knowledge to identify and prevent harassment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-textPrimary">Confidential Support</p>
                    <p className="text-textSecondary">
                      Survivor-centered resources and advocacy to provide a safe path forward for those 
                      who have experienced harassment.
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(0,59,122,0.45)] transition hover:bg-primary-dark">
                Learn More
                <span className="text-lg">&#8594;</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#ece6dc] pt-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold text-primary">5k+</p>
              <p className="text-sm text-textSecondary">People Trained</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-accent">100%</p>
              <p className="text-sm text-textSecondary">Confidentiality</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">24/7</p>
              <p className="text-sm text-textSecondary">Support Access</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-accent">50k+</p>
              <p className="text-sm text-textSecondary">Resources Shared</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="flex flex-col items-center gap-10 rounded-[32px] bg-bgSurface px-6 py-10 md:flex-row md:items-start md:px-10 md:py-12">
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-bold text-textPrimary sm:text-3xl">Get help and support</h3>
            <p className="mb-6 text-sm leading-7 text-textSecondary sm:text-base">
              Everyone responds differently to sexual harassment and other forms of sexual violence – so whatever someone feels is a valid response.
            </p>
            <p className="text-sm leading-7 text-textSecondary sm:text-base">
              If you have experienced sexual harassment or sexual violence of any kind – whether it was recently or a long time ago – Rape Crisis is here for you. We will listen to you and believe you.
            </p>
          </div>
          
          <div className="flex w-full max-w-md items-center gap-6 rounded-[24px] border border-borderLight bg-bgPrimary/70 p-6 shadow-sm md:w-auto">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h6" />
              </svg>
            </div>
            <a href="#" className="font-semibold text-primary underline transition hover:text-primary-dark">
              Get help and support after sexual harament
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
