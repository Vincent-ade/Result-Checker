import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, Calculator, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResultHub — Check Your School Results Instantly" },
      { name: "description", content: "Secure student result portal with GPA calculator. Built by Group L." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.7 0.2 280) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.7 0.2 50) 0%, transparent 40%)",
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Group L — School Result Checker
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your academic results,<br />beautifully organized.
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Securely check your semester results, track your CGPA, and plan your academic future — all in one modern portal.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Check Results <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/gpa-calculator">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                  Try GPA Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need</h2>
          <p className="mt-4 text-muted-foreground">
            Built with the modern student in mind — fast, secure, and accessible from any device.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Secure Login", desc: "Access your results with your matric number and password — protected and private." },
            { icon: FileText, title: "Detailed Results", desc: "See semester-by-semester breakdown with grades, units, and GPA at a glance." },
            { icon: Calculator, title: "GPA Calculator", desc: "Compute your semester GPA on the fly — try different scenarios with ease." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
              <div className="gradient-primary inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-elegant">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="gradient-primary rounded-3xl px-8 py-14 text-center shadow-elegant sm:px-12">
          <GraduationCap className="mx-auto h-12 w-12 text-primary-foreground" />
          <h2 className="mt-4 text-3xl font-bold text-primary-foreground">Ready to check your results?</h2>
          <Link to="/login" className="mt-6 inline-block">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Login Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
