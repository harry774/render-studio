import PageShell from "@/components/PageShell";
import BlogSection from "@/sections/BlogSection";

const Blog = () => (
  <PageShell
    path="/blog"
    eyebrow="Journal"
    title={
      <>
        The studio <em className="text-gradient-gold not-italic font-medium">journal</em>.
      </>
    }
    intro="Industry perspectives, technical deep-dives, and lessons learned from a decade of architectural visualization."
  >
    <BlogSection />
  </PageShell>
);

export default Blog;
