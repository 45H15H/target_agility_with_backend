import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  HelpCircle,
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  Award,
  Target,
  BarChart3,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

interface ApiQuiz {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  questionCount: number;
  duration: string;
  icon: string;
  link: string;
}

// Maps the icon name stored in the database to its Lucide component.
const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Award,
  Target,
  BarChart3,
  Shield,
  Users,
};

const Quizzes = () => {
  const { data: quizzes, loading, error } = useFetch<ApiQuiz[]>("quizzes");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 mb-4 font-heading">
            Free Practice Assessments
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Test Your Agile Knowledge
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Take our free practice assessments to evaluate your preparedness for
            industry-standard Scrum and Agile certifications. Timed, realistic,
            and completely free.
          </p>
        </div>
      </section>

      {/* Quiz Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-3">
            Choose an Assessment
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a certification track and start your timed practice exam.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full">
              <LoadingState label="Loading assessments…" />
            </div>
          ) : error ? (
            <div className="col-span-full">
              <ErrorState message="We couldn't load the assessments right now. Please try again later." />
            </div>
          ) : (
            (quizzes ?? []).map((quiz) => {
              const Icon = iconMap[quiz.icon] ?? ClipboardCheck;
              return (
                <div
                  key={quiz.id}
                  className="bg-card rounded-2xl border border-border p-6 flex flex-col hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-heading text-xs">
                      {quiz.shortTitle}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">
                    {quiz.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      {quiz.questionCount} Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {quiz.duration}
                    </span>
                  </div>

                  <a href={quiz.link}>
                    <Button className="w-full rounded-xl font-heading group/btn">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <BrainCircuit className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
            Want to Learn Before You Assess?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Explore our certification courses to build a strong foundation
            before taking the practice exams.
          </p>
          <a href="/#courses">
            <Button
              variant="outline"
              className="rounded-xl font-heading border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Browse Courses
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
