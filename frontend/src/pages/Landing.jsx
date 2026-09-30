import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheck, FiCpu, FiMessageSquare, FiPlus, FiStar, FiZap } from "react-icons/fi";

const agents = ["Research agent", "Writer agent", "Code agent", "Review agent"];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#20201F] px-5 py-5 text-[#F5F3ED] sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-[1440px] flex-col rounded-[28px] border border-white/10 bg-[#20201F]">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
          <Link to="/" className="flex items-center gap-2.5" aria-label="MultiAgents home">
            <img
              src="/ChatGPT_Image_Aug_1__2026__02_42_21_PM-removebg-preview.png"
              alt=""
              className="h-10 w-10 object-contain"
            />
            <span className="text-sm font-semibold tracking-tight">MultiAgents</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">How it works</a>
            <a href="#agents" className="transition hover:text-white">Agents</a>
          </nav>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#F5F3ED] px-4 py-2 text-sm font-semibold text-[#20201F] transition hover:bg-white"
          >
            Sign up <FiArrowUpRight />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 px-5 py-14 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-16 lg:py-16">
          <div className="max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Your AI team, ready to work
            </div>
            <h1 className="text-balance text-5xl font-medium leading-[.98] tracking-[-0.055em] text-[#F5F3ED] sm:text-6xl lg:text-7xl">
              Build with AI teammates, not automations.
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/60">
              Give your work to a team of focused AI agents. They research, create and collaborate so you can move from idea to done.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-[#F5F3ED] px-5 py-3 text-sm font-semibold text-[#20201F] transition hover:bg-white">
                Start building <FiArrowUpRight />
              </Link>
              <a href="#how-it-works" className="text-sm font-medium text-white/70 transition hover:text-white">See how it works</a>
            </div>
          </div>

          <div id="how-it-works" className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-8 -z-0 rounded-full bg-[#F5F3ED]/5 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#171716] p-3 shadow-2xl shadow-black/30 sm:p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/45">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#E76F51]" /><span className="h-2 w-2 rounded-full bg-[#E9C46A]" /><span className="h-2 w-2 rounded-full bg-[#65B891]" /></div>
                <span>MultiAgents workspace</span>
                <FiPlus />
              </div>
              <div className="grid gap-3 pt-3 sm:grid-cols-[150px_1fr]">
                <aside className="rounded-xl border border-white/10 bg-[#20201F] p-3 text-xs">
                  <div className="mb-5 flex items-center gap-2 font-medium text-white"><FiStar className="text-white/70" /> Your team</div>
                  <div className="space-y-2">
                    {agents.map((agent, index) => <div key={agent} className="flex items-center gap-2 text-white/55"><span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-emerald-400" : "bg-white/25"}`} />{agent}</div>)}
                  </div>
                  <div className="mt-7 border-t border-white/10 pt-3 text-white/40">Recent work</div>
                </aside>
                <div className="rounded-xl border border-white/10 bg-[#20201F] p-4">
                  <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Launch plan</p><p className="mt-1 text-xs text-white/45">4 agents collaborating</p></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-300">In progress</span></div>
                  <div className="mt-5 space-y-2.5">
                    {["Researching your audience", "Writing a clear project brief", "Preparing the first draft"].map((task, index) => <div key={task} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[.035] px-3 py-2.5 text-xs"><span className="flex items-center gap-2 text-white/70">{index < 2 ? <FiCheck className="text-emerald-400" /> : <FiMessageSquare className="text-white/40" />}{task}</span><span className="text-white/35">{index < 2 ? "Done" : "Working"}</span></div>)}
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-white/35">Ask your team anything... <FiArrowUpRight className="ml-auto text-white/70" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="agents" className="grid border-t border-white/10 text-xs text-white/45 sm:grid-cols-3">
          {["Focused agents for each task", "Context stays with your team", "One shared workspace"].map((item) => <div key={item} className="border-b border-white/10 px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">{item}</div>)}
        </div>
      </div>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.82fr_1.18fr] lg:px-16 lg:py-28">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[.18em] text-white/40">Built for momentum</p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl">
            The infrastructure behind autonomous teammates.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/60">
            A shared system that keeps every agent aligned, informed and moving your work forward.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><FiCpu className="text-white/80" /></div>
            <h3 className="mt-8 text-base font-medium">A workspace that remembers</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Every agent works from the same context, files and decisions.</p>
            <div className="mt-6 space-y-2 rounded-xl border border-white/10 bg-black/10 p-3 text-xs text-white/55">
              <div className="flex justify-between"><span>Project context</span><FiCheck className="text-emerald-400" /></div>
              <div className="flex justify-between"><span>Shared files</span><FiCheck className="text-emerald-400" /></div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><FiZap className="text-white/80" /></div>
            <h3 className="mt-8 text-base font-medium">Your work keeps moving</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Hand off tasks between teammates without losing the thread.</p>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 p-3 text-xs text-white/55">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Task routed to Review agent
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[.035] p-5 sm:col-span-2">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="text-base font-medium">Built for a team of one — or many.</p><p className="mt-2 text-sm text-white/50">Bring an idea. Your AI team handles the next step.</p></div>
              <Link to="/login" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-[#20201F]">Get started <FiArrowUpRight /></Link>
            </div>
          </article>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-white/10 px-5 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <div className="flex items-center gap-2"><img src="/ChatGPT_Image_Aug_1__2026__02_42_21_PM-removebg-preview.png" alt="" className="h-7 w-7 object-contain" /><span className="font-medium text-white/70">MultiAgents</span></div>
        <p>© 2026 MultiAgents. Built for better work.</p>
        <div className="flex gap-5"><a href="#how-it-works" className="transition hover:text-white">Product</a><Link to="/login" className="transition hover:text-white">Sign up</Link></div>
      </footer>
    </main>
  );
}
