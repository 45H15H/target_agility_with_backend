import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import type { Post } from "@/data/posts";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, loading, error } = useFetch<Post[]>("blog-posts");
  const post = (posts ?? []).find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingState label="Loading post…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorState message="We couldn't load this post right now. Please try again later." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-4">
          Post Not Found
        </h1>
        <Link
          to="/blog"
          className="text-secondary font-heading font-semibold hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const related = (posts ?? []).filter((p) => p.slug !== slug).slice(0, 3);

  // Simple markdown-ish rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### "))
        return (
          <h3
            key={i}
            className="font-heading font-semibold text-xl text-foreground mt-6 mb-2"
          >
            {line.replace("### ", "")}
          </h3>
        );
      if (line.startsWith("## "))
        return (
          <h2
            key={i}
            className="font-heading font-bold text-2xl text-foreground mt-8 mb-3"
          >
            {line.replace("## ", "")}
          </h2>
        );
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
        if (match)
          return (
            <li key={i} className="ml-4 mb-2 text-muted-foreground">
              <strong className="text-foreground">{match[1]}</strong> —{" "}
              {match[2]}
            </li>
          );
      }
      if (line.startsWith("- "))
        return (
          <li key={i} className="ml-4 mb-1 text-muted-foreground">
            {line.replace("- ", "")}
          </li>
        );
      if (line.match(/^\d+\. \*\*/)) {
        const match = line.match(/^\d+\. \*\*(.+?)\*\* — (.+)/);
        if (match)
          return (
            <li
              key={i}
              className="ml-4 mb-2 text-muted-foreground list-decimal"
            >
              <strong className="text-foreground">{match[1]}</strong> —{" "}
              {match[2]}
            </li>
          );
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-secondary font-heading font-semibold text-sm hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <article className="bg-card rounded-xl border border-border p-8 md:p-12">
            <span className="inline-block bg-secondary/10 text-secondary font-heading text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <div className="prose max-w-none">
              {renderContent(post.content)}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">
                Related Posts
              </h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <span className="text-xs text-secondary font-heading font-semibold">
                      {r.category}
                    </span>
                    <h4 className="font-heading font-medium text-sm text-foreground group-hover:text-secondary transition-colors line-clamp-2 mt-1">
                      {r.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {r.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
