import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  X,
  Clock,
  GraduationCap,
  MessageCircle,
  Zap,
} from "lucide-react";
import bootcampHero from "@/assets/bootcamp-hero.jpg";
import {
  heroContent,
  audienceCardsData,
  whyChooseData,
  extraSectionsContent,
} from "@/data/bootcampData";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

interface AlumniStory {
  id: number;
  name: string;
  role: string;
  company: string;
  headline: string;
  quote: string;
}

interface WeeklyModule {
  id: number;
  week: string;
  title: string;
  topics: string[];
}

interface PricingPlan {
  id: number;
  name: string;
  type: string;
  price: string;
  originalPrice?: string;
  features: { text: string; included: boolean }[];
  highlighted: boolean;
}

interface BootcampFAQ {
  id: number;
  question: string;
  answer: string;
}

const Bootcamp = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  const {
    data: alumniStories,
    loading: alumniLoading,
    error: alumniError,
  } = useFetch<AlumniStory[]>("alumni-stories");
  const {
    data: weeklyModules,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFetch<WeeklyModule[]>("weekly-modules");
  const {
    data: pricingPlans,
    loading: pricingLoading,
    error: pricingError,
  } = useFetch<PricingPlan[]>("pricing-plans");
  const {
    data: bootcampFaqs,
    loading: faqsLoading,
    error: faqsError,
  } = useFetch<BootcampFAQ[]>("bootcamp-faqs");

  const weeks = weeklyModules ?? [];
  const activeWeekData = weeks[activeWeek];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                {heroContent.titleMain}{" "}
                <span className="text-secondary">
                  {heroContent.titleHighlight}
                </span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 font-body leading-relaxed">
                {heroContent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-heading font-semibold"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {heroContent.enquireText}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-heading font-semibold"
                >
                  {heroContent.demoText}
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={bootcampHero}
                alt={heroContent.imageAlt}
                className="rounded-2xl shadow-2xl w-full object-cover max-h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {audienceCardsData.map((card) => (
              <Card
                key={card.title}
                className="text-center hover:shadow-lg transition-shadow border-border"
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                    <card.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose This Bootcamp */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-12">
            Why Choose This Bootcamp?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseData.map((item) => (
              <Card
                key={item.title}
                className="hover:shadow-lg transition-shadow border-border"
              >
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            Our Alumni Success Stories
          </h2>
          <p className="text-muted-foreground text-center mb-12 font-body">
            Discover how our programs have transformed careers
          </p>
          {alumniLoading ? (
            <LoadingState label="Loading success stories…" />
          ) : alumniError ? (
            <ErrorState message="We couldn't load alumni stories right now. Please try again later." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(alumniStories ?? []).map((story) => (
                <Card
                  key={story.name}
                  className="hover:shadow-lg transition-shadow border-border"
                >
                  <CardContent className="pt-6 pb-6 px-5">
                    <Badge className="bg-secondary/10 text-secondary font-heading text-xs mb-4 hover:bg-secondary/20">
                      {story.headline}
                    </Badge>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="font-heading font-bold text-primary text-lg">
                        {story.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-foreground mb-1">
                      {story.name}
                    </h4>
                    <p className="text-xs text-secondary font-heading mb-3">
                      {story.role} — {story.company}
                    </p>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed italic">
                      "{story.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4-Week Program */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            📘 Comprehensive 4-Week Program
          </h2>
          <p className="text-muted-foreground text-center mb-10 font-body max-w-2xl mx-auto">
            Transform into a job-ready Scrum Master or Product Owner through
            structured learning and hands-on practice.
          </p>

          {weeklyLoading ? (
            <LoadingState label="Loading program…" />
          ) : weeklyError ? (
            <ErrorState message="We couldn't load the program outline right now. Please try again later." />
          ) : activeWeekData ? (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {weeks.map((week, i) => (
                  <Button
                    key={week.week}
                    variant={activeWeek === i ? "secondary" : "outline"}
                    onClick={() => setActiveWeek(i)}
                    className="font-heading font-semibold"
                  >
                    {week.week}
                  </Button>
                ))}
              </div>

              <Card className="max-w-3xl mx-auto border-border">
                <CardContent className="p-8">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    {activeWeekData.week}: {activeWeekData.title}
                  </h3>
                  <ul className="space-y-4 mt-6">
                    {activeWeekData.topics.map((topic, i) => (
                      <li key={i} className="flex gap-3">
                        <ArrowRight className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground font-body text-sm leading-relaxed">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </section>

      {/* Career Launchpad CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            {extraSectionsContent.launchpad.title}
          </h2>
          <p className="text-primary-foreground/80 font-body mb-8 max-w-xl mx-auto">
            {extraSectionsContent.launchpad.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            {extraSectionsContent.launchpad.batches.map((batch, idx) => (
              <Card
                key={idx}
                className="bg-primary-foreground/10 border-primary-foreground/20"
              >
                <CardContent className="p-5 text-center">
                  <Clock className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <h4 className="font-heading font-semibold text-primary-foreground text-sm">
                    {batch.name}
                  </h4>
                  <p className="text-primary-foreground/70 text-xs font-body mt-1">
                    {batch.schedule}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="font-heading font-semibold"
          >
            {heroContent.enquireText}
          </Button>
        </div>
      </section>

      {/* Certification */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
            {extraSectionsContent.certification.title}
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            {extraSectionsContent.certification.description}
          </p>
          <Badge className="bg-secondary text-secondary-foreground font-heading px-4 py-1.5 text-sm">
            {extraSectionsContent.certification.badge}
          </Badge>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-center mb-12 font-body">
            Choose the perfect plan that suits your needs
          </p>
          {pricingLoading ? (
            <LoadingState label="Loading plans…" />
          ) : pricingError ? (
            <ErrorState message="We couldn't load pricing plans right now. Please try again later." />
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {(pricingPlans ?? []).map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative hover:shadow-xl transition-shadow border-border ${
                    plan.highlighted ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground font-heading">
                        Best Value
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-8 pb-6 px-6">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body mb-4">
                      {plan.type}
                    </p>
                    <div className="mb-6">
                      <span className="font-heading font-bold text-3xl text-foreground">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm ml-2 font-body">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-2">
                          {f.included ? (
                            <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`font-body text-sm ${
                              f.included
                                ? "text-foreground"
                                : "text-muted-foreground/50"
                            }`}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {plan.highlighted && (
                      <Button
                        variant="secondary"
                        className="w-full mt-6 font-heading font-semibold"
                      >
                        Enroll Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-10 font-body">
            Get all your questions answered about our Bootcamp
          </p>
          {faqsLoading ? (
            <LoadingState label="Loading FAQs…" />
          ) : faqsError ? (
            <ErrorState message="We couldn't load the FAQs right now. Please try again later." />
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {(bootcampFaqs ?? []).map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-lg border border-border px-5"
                >
                  <AccordionTrigger className="font-heading font-semibold text-foreground text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* Still Not Sure CTA */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl text-foreground mb-3">
            {extraSectionsContent.contact.title}
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            {extraSectionsContent.contact.description}
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="font-heading font-semibold"
          >
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Bootcamp;
