import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Target, Users, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ResultHub" },
      { name: "description", content: "About the ResultHub school result checker project by Group L." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold sm:text-5xl">About ResultHub</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ResultHub is a modern student result management platform designed to make
          checking academic performance simple, secure, and beautiful.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Target, title: "Mission", desc: "Empower students with instant access to their academic data." },
            { icon: Users, title: "For Students", desc: "Designed with student feedback to feel intuitive and fast." },
            { icon: Award, title: "Quality", desc: "Built with modern web standards for reliability and accessibility." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="gradient-primary inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <b.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold">The Project</h2>
          <p className="mt-3 text-muted-foreground">
            This application is the Group L final project for the Web Development course.
            It demonstrates core React concepts including components, routing, state
            management with hooks, props, event handling, and form handling — all
            integrated with local JSON data and wrapped in a responsive, polished UI.
          </p>
          <h3 className="mt-6 font-semibold">Core Features</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>• Secure login system</li>
            <li>• Semester-by-semester results</li>
            <li>• Live GPA & CGPA calculator</li>
            <li>• Student profile management</li>
            <li>• Fully responsive design</li>
            <li>• Loading & error states</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
