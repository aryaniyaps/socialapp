import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Hero from "./hero";
import Navbar from "./navbar";
import SectionTitle from "./section-title";

export default async function LandingPage() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      <Navbar session={session!} />
      <Hero />
      <SectionTitle
        align="center"
        pretitle="Nextly Benefits"
        title=" Why should you use this landing page"
      >
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>
    </div>
  );
}
