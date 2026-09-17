const STATS = [
  { value: "2nd yr", label: "B.Tech CSE" },
  { value: "C++", label: "DSA, daily" },
  { value: "Jaipur", label: "Arya College" },
  { value: "2029", label: "Graduating" },
];

const PROJECTS = [
  {
    index: "01 / 03",
    tag: "Concept build",
    title: "Freshbites",
    body: "A restaurant concept site — menu, ordering flow, admin view. Demo-grade, not yet a live client build.",
    href: "https://github.com/Stellerboneyard/freshbites-restaurant",
  },
  {
    index: "02 / 03",
    tag: "Open slot",
    title: "Next build",
    body: "Reserved for whatever ships next — swap this card in once it's real.",
    href: "https://github.com/Stellerboneyard",
  },
  {
    index: "03 / 03",
    tag: "Open slot",
    title: "Next build",
    body: "Same here. The gallery grows as the work does.",
    href: "https://github.com/Stellerboneyard",
  },
];

const FOCUS = [
  {
    title: "Data Structures & Algorithms",
    jp: "C++",
    body: "Daily practice aimed at recall, not recognition — struggle first, pattern-tag after.",
    tag: "Ongoing",
  },
  {
    title: "Core CS Fundamentals",
    jp: "OS · DBMS · CN",
    body: "The parts most students skip until placement season, and regret skipping.",
    tag: "Ongoing",
  },
  {
    title: "Web & Systems",
    jp: "JS · Node",
    body: "Just enough to ship what gets built — this site included.",
    tag: "Maintenance",
  },
  {
    title: "RBI Grade B Prep",
    jp: "ESI · FM",
    body: "Foundation phase — economics, finance, English writing, built for the long run.",
    tag: "Primary",
  },
];

export function Sections() {
  return (
    <div className="content-layer">
      <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-28 pb-16 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-mist-soft uppercase">Chapter 00 — Hello</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] text-balance text-mist sm:text-6xl lg:text-7xl">
          Building in the open, one scroll at a time.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mist-soft sm:text-base">
          Aryan Raj — a second-year CS student in Jaipur, learning DSA in C++ and shipping small,
          honest web builds along the way.
        </p>

        {/* oversized wordmark sitting low in the scene, like a skyline
            silhouette the footage sits behind -- a fixed set of letters, not
            a 3D element, so it reads as typography laid over the video
            rather than a modeled object in it */}
        <div className="mt-auto flex items-end justify-between gap-6">
          <p className="select-none font-display text-[19vw] leading-[0.72] tracking-tight text-mist/90 sm:text-[15vw] lg:text-[13rem]">
            ARYAN
          </p>
          <div className="mb-4 hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-line bg-void/40 backdrop-blur-sm sm:flex">
            <span className="font-display text-xl text-mist">RAJ</span>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs tracking-[0.35em] text-mist-soft uppercase">Scroll to begin</p>
      </section>

      <section id="about" className="flex min-h-[100svh] flex-col justify-center px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">— About</p>
        <h2 className="mt-4 max-w-xl text-3xl leading-tight text-balance text-mist sm:text-4xl lg:text-5xl">
          Second year, first principles.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mist-soft sm:text-base">
          Sixty-some days into second year, still early — no full-stack polish, no illusions about
          that. What's here is what's actually true right now: daily DSA reps, the fundamentals
          most people cram for later, and a few builds made to learn rather than to impress.
        </p>

        <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl text-mist sm:text-3xl">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-mist-soft uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="flex min-h-[100svh] flex-col justify-center px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">— Projects</p>
        <h2 className="mt-4 max-w-xl text-3xl leading-tight text-balance text-mist sm:text-4xl">
          A small, honest gallery.
        </h2>

        <div className="mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PROJECTS.map((p) => (
            <a
              key={p.title + p.index}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between rounded-lg border border-line bg-void/45 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-mist-soft uppercase">{p.tag}</p>
                <h3 className="mt-3 font-display text-xl text-mist">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-soft">{p.body}</p>
              </div>
              <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-mist-soft uppercase group-hover:text-accent">
                {p.index}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="focus" className="flex min-h-[100svh] flex-col justify-center px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">— Focus</p>
        <h2 className="mt-4 max-w-xl text-3xl leading-tight text-balance text-mist sm:text-4xl">
          Two tracks, one discipline.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-mist-soft">
          RBI Grade B prep is the primary track right now. Engineering runs alongside it —
          tiered deliberately, not chased at equal intensity.
        </p>

        <div className="mt-10 max-w-2xl divide-y divide-line border-t border-line">
          {FOCUS.map((f) => (
            <div key={f.title} className="flex items-start justify-between gap-4 py-5 sm:gap-6">
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg text-mist sm:text-xl">
                  {f.title}
                  <span className="ml-2 text-sm text-mist-soft">{f.jp}</span>
                </h3>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-mist-soft">{f.body}</p>
              </div>
              <p className="shrink-0 pt-1 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{f.tag}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="flex min-h-[100svh] flex-col justify-center px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">Chapter 04 — Contact</p>
        <h2 className="mt-4 max-w-xl text-3xl leading-tight text-balance text-mist sm:text-5xl">
          The build doesn&apos;t stop here.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-mist-soft">
          Open to internships, collaborations, or just talking shop about DSA, RBI prep, or the
          next thing to build.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:aryanqbz@gmail.com"
            className="inline-flex items-center gap-3 rounded-full border border-line px-8 py-3.5 font-mono text-xs tracking-[0.3em] text-mist uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Email
          </a>
          <a
            href="https://github.com/Stellerboneyard"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-line px-8 py-3.5 font-mono text-xs tracking-[0.3em] text-mist uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </section>

      <footer className="flex min-h-[40svh] flex-col items-start justify-center gap-6 border-t border-line px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.35em] text-mist-soft uppercase">Aryan Raj</p>
        <p className="max-w-sm text-sm leading-relaxed text-mist-soft">
          Built with a morning-to-night video, scrubbed frame by frame as you scroll — same
          spirit as the work: early, in progress, moving anyway.
        </p>
        <p className="font-mono text-[11px] tracking-[0.2em] text-mist-soft/70 uppercase">
          © 2029 · Next.js
        </p>
      </footer>
    </div>
  );
}
