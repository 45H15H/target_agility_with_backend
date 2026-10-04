import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsContent } from "../data/testimonialsData";
import { useFetch } from "@/hooks/useFetch";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { data } = useFetch<Testimonial[]>("testimonials");
  const testimonials = data ?? [];

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const { subtitle, title } = testimonialsContent;

  const active = testimonials[current];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider text-center">
          {subtitle}
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mt-2 mb-12">
          {title}
        </h2>

        {active && (
          <div className="max-w-2xl mx-auto relative">
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <p className="text-foreground italic leading-relaxed mb-6">
                "{active.text}"
              </p>
              <div className="w-12 h-12 rounded-full bg-primary mx-auto flex items-center justify-center mb-3">
                <span className="text-primary-foreground font-heading font-bold">
                  {active.name.charAt(0)}
                </span>
              </div>
              <h4 className="font-heading font-semibold text-foreground">
                {active.name}
              </h4>
              <p className="text-sm text-muted-foreground">{active.role}</p>
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-secondary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
