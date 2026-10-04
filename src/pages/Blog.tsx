import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import type { Post } from "@/data/posts";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";
import blogHero from "@/assets/blog-hero.jpg";

const Blog = () => {
  const { data: posts, loading, error } = useFetch<Post[]>("blog-posts");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[320px] flex items-center justify-center">
        <img
          src={blogHero}
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-3">
            Our Blog
          </h1>
          <p className="text-primary-foreground/80 font-body max-w-xl mx-auto">
            Insights, trends, and best practices from the world of Agile, Scrum,
            and AI.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingState label="Loading posts…" />
          ) : error ? (
            <ErrorState message="We couldn't load the blog posts right now. Please try again later." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(posts ?? []).map((post) => (
                <article
                  key={post.slug}
                  className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow group"
                >
                  <div className="relative overflow-hidden h-48 bg-primary/10">
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center p-6">
                      <h3 className="font-heading font-semibold text-primary-foreground text-center text-sm leading-snug line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-secondary/10 text-secondary font-heading text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-secondary font-heading font-semibold text-sm hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
