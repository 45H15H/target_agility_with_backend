import { useEffect } from "react";
import { MapPin, Briefcase, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/data/jobs";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

const Careers = () => {
  const { data: jobs, loading, error } = useFetch<Job[]>("jobs");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Agile Careers
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Join our team of passionate Agile practitioners. We're building the
            future of training and transformation — and we'd love you to be part
            of it.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider text-center">
            Open Positions
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mt-2 mb-12">
            Current Openings
          </h2>

          <div className="grid gap-6">
            {loading ? (
              <LoadingState label="Loading openings…" />
            ) : error ? (
              <ErrorState message="We couldn't load job openings right now. Please try again later." />
            ) : (jobs ?? []).length === 0 ? (
              <p className="text-center text-muted-foreground">
                No open positions at the moment. Please check back soon.
              </p>
            ) : (
              (jobs ?? []).map((job) => (
                <div
                  key={job.id}
                  className="bg-card rounded-xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5" /> {job.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" /> {job.department}
                      </span>
                    </div>
                  </div>

                  <a href={job.link} className="shrink-0">
                    <Button
                      variant="secondary"
                      className="font-heading font-semibold gap-2"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
            Don't See a Role That Fits?
          </h2>
          <p className="text-muted-foreground mb-6">
            We're always on the lookout for talented people. Send us your resume
            and we'll keep you in mind for future openings.
          </p>
          <a href="#">
            <Button
              variant="default"
              size="lg"
              className="font-heading font-semibold"
            >
              Send Your Resume
            </Button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Careers;
