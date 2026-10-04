import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Play, ArrowRight } from "lucide-react";
import type { EventItem } from "@/data/events";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { data: events, loading, error } = useFetch<EventItem[]>("events");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredEvents = (events ?? []).filter((e) => e.type === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Events & Webinars
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Join our live workshops and webinars led by industry experts. Learn,
            interact, and level up your agile skills.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-muted p-1.5">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
                activeTab === "upcoming"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
                activeTab === "past"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <LoadingState label="Loading events…" />
        ) : error ? (
          <ErrorState message="We couldn't load events right now. Please try again later." />
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              No {activeTab} events
            </h3>
            <p className="text-muted-foreground">
              {activeTab === "upcoming"
                ? "Stay tuned — new events are being planned!"
                : "No past events to show yet."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
            Never Miss an Event
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to get notified about upcoming webinars, workshops, and
            community events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-heading text-sm"
            />
            <Button className="rounded-xl px-6 font-heading">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const EventCard = ({ event }: { event: EventItem }) => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
    <div className="relative overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        {event.tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-primary/90 text-primary-foreground text-xs font-heading"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>

    <div className="p-5">
      <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-snug">
        {event.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-primary shrink-0" />
          {event.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          {event.location}
        </div>
      </div>

      {event.type === "upcoming" ? (
        <a href={event.registrationLink}>
          <Button className="w-full rounded-xl font-heading group/btn">
            Register Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </a>
      ) : (
        <a href={event.recordingLink || "#"}>
          <Button
            variant="outline"
            className="w-full rounded-xl font-heading border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Recording
          </Button>
        </a>
      )}
    </div>
  </div>
);

export default Events;
