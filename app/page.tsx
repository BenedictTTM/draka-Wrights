export default function Home() {
  return (
    <div className="paper-texture min-h-screen  text-[#2f2a25]">
      <div className="absolute inset-0 top-0 h-[600px] w-full overflow-hidden bg-cover bg-center md:h-[700px]" style={{ backgroundImage: 'url("/bg.png")' }}></div>
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-12 pt-14 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:px-10 md:pb-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-6 h-56 w-56 rounded-full bg-[#f5c66d] blur-[110px]" />
          <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#f0b65a] blur-[140px]" />
          <div className="absolute left-10 bottom-2 h-48 w-48 rounded-full bg-[#f7d9a7] blur-[130px]" />

          <svg
            className="absolute left-4 top-6 h-16 w-16 text-[#1e6b5b]"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path d="M6 50C16 34 38 30 54 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M10 58C20 42 42 38 58 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute left-24 top-2 h-20 w-20 text-[#f2a12f]"
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

        <section className="relative flex flex-col gap-6">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6b5b] sm:text-sm">
            <span className="h-[2px] w-10 bg-[#f1ad3b]" />
            Safe Spaces for Everyone
          </div>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-[#1f1b17] sm:text-5xl md:text-6xl">
            Awareness <span className="text-[#f2a12f]">&</span>
            <span className="block text-[#1f1b17]">Prevention Together</span>
          </h1>

          <p className="max-w-lg text-base leading-7 text-[#5a5148] sm:text-lg">
            Join our mission to end sexual harassment through education, support services, and advocacy. 
            We provide resources for survivors and training for organizations to create safer environments.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-3 rounded-full bg-[#1e6b5b] px-6 py-3 text-sm font-semibold text-[#f7f3ec] shadow-[0_14px_30px_-18px_rgba(30,107,91,0.8)] transition hover:bg-[#175548]">
              Get Support
              <span className="text-lg">&#8594;</span>
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2a12f] text-white shadow-[0_10px_20px_-12px_rgba(242,161,47,0.9)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 6.5L18 12L8 17.5V6.5Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 md:block">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
              <path
                d="M6 52C14 34 42 30 56 12"
                stroke="#1e6b5b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M12 60C20 42 48 38 62 20"
                stroke="#1e6b5b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md md:max-w-lg">
            <svg
              className="absolute -right-10 top-4 h-32 w-56 rotate-6 text-[#f2c87b]"
              viewBox="0 0 280 160"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 88C52 46 98 12 150 10C202 8 232 44 256 70C280 96 264 128 220 142C176 156 126 150 82 138C38 126 -8 130 22 88Z" />
            </svg>
            <svg
              className="absolute -left-6 bottom-2 h-28 w-44 -rotate-6 text-[#1e6b5b] opacity-80"
              viewBox="0 0 220 130"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 72C44 32 88 8 134 14C180 20 210 58 200 94C190 130 142 120 96 112C50 104 -4 112 20 72Z" />
            </svg>

            <div className="relative">
              <img
                src="/heroimg.png"
                alt="Hero"
                className="w-[115%] max-w-none h-auto drop-shadow-[0_35px_70px_rgba(0,0,0,0.2)] md:-translate-x-8"
              />
            </div>

            <div className="absolute -left-10 -bottom-6 hidden md:block">
              <div className="flex items-end gap-2">
                <div className="h-12 w-8 rounded-full border-2 border-[#1e6b5b]" />
                <div className="h-16 w-10 rounded-full border-2 border-[#f2a12f]" />
                <div className="h-10 w-7 rounded-full border-2 border-[#1e6b5b]" />
              </div>
            </div>
            <div className="absolute -right-6 bottom-6">
              <div className="h-3 w-3 rounded-full bg-[#1e6b5b]" />
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="relative overflow-hidden  bg-white px-6 py-10  md:px-10 md:py-12">
          <svg
            className="absolute -left-12 top-6 h-28 w-48 -rotate-3 text-[#1e6b5b] opacity-90"
            viewBox="0 0 220 130"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 72C36 32 86 8 134 14C182 20 210 54 198 90C186 126 140 120 96 112C52 104 -4 112 16 72Z" />
          </svg>
          <div className="absolute right-16 top-8 h-16 w-16 rounded-full bg-[#f2a12f] opacity-15" />

          <div className="relative grid items-center gap-10 md:grid-cols-[1.05fr_1fr]">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/c1.png"
                  alt="Children at a window"
                  className="w-full rounded-[32px] border-[10px] border-[#ece6dc] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]"
                />
                <img
                  src="/c2.png"
                  alt="Children looking out"
                  className="absolute -right-8 top-6 w-44 rounded-[26px] border-8 border-[#f2f0ea] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)] sm:w-48"
                />
                <img
                  src="/c3.png"
                  alt="Family on a boat"
                  className="absolute -right-10 bottom-4 w-52 rounded-[28px] border-8 border-[#f2f0ea] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)] sm:w-56"
                />
                <div className="absolute -left-4 bottom-4 flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span
                      key={`dot-${index}`}
                      className="h-3 w-3 rounded-full border-2 border-[#f2a12f]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-5">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f2a12f]">
                Breaking the Silence
              </span>
              <h2 className="text-3xl font-semibold leading-[1.15] text-[#1f1b17] sm:text-4xl">
                Advocating for Change, One Voice At A Time
              </h2>
              <p className="text-sm leading-7 text-[#6a6158] sm:text-base">
                Our platform provides confidential reporting, educational workshops, and a supportive community 
                to address and prevent sexual harassment. We believe in creating a culture of consent and 
                respect in every workplace and educational institution.
              </p>

              <div className="flex flex-col gap-4 text-sm text-[#4f463d] sm:text-base">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2a12f]/15 text-[#1e6b5b]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 12C8 7 11 4 16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 12C8 17 11 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-[#2f2a25]">Education & Training</p>
                    <p className="text-[#6a6158]">
                      Comprehensive programs designed to empower individuals and organizations with the 
                      knowledge to identify and prevent harassment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e6b5b]/15 text-[#f2a12f]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-[#2f2a25]">Confidential Support</p>
                    <p className="text-[#6a6158]">
                      Survivor-centered resources and advocacy to provide a safe path forward for those 
                      who have experienced harassment.
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#1e6b5b] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(30,107,91,0.8)] transition hover:bg-[#175548]">
                Learn More
                <span className="text-lg">&#8594;</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#ece6dc] pt-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold text-[#1e6b5b]">5k+</p>
              <p className="text-sm text-[#7b736a]">People Trained</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#f2a12f]">100%</p>
              <p className="text-sm text-[#7b736a]">Confidentiality</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#1e6b5b]">24/7</p>
              <p className="text-sm text-[#7b736a]">Support Access</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#f2a12f]">50k+</p>
              <p className="text-sm text-[#7b736a]">Resources Shared</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="flex flex-col items-center gap-10 rounded-[32px] bg-[#f9f9e9] p-8 md:flex-row md:items-start md:p-12">
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-bold text-[#1f1b17]">Get help and support</h3>
            <p className="mb-6 text-[#5a5148]">
              Everyone responds differently to sexual harassment and other forms of sexual violence – so whatever someone feels is a valid response.
            </p>
            <p className="text-[#5a5148]">
              If you have experienced sexual harassment or sexual violence of any kind – whether it was recently or a long time ago – Rape Crisis is here for you. We will listen to you and believe you.
            </p>
          </div>
          
          <div className="flex w-full max-w-md items-center gap-6 rounded-3xl bg-white p-6 shadow-sm md:w-auto">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e6f0e0]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="#a3c585" />
                <path d="M7 11H17V13H7V11ZM7 7H17V9H7V7Z" fill="white" />
              </svg>
            </div>
            <a href="#" className="font-semibold text-[#2f2a25] underline hover:text-[#1e6b5b]">
              Get help and support after sexual harassment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
