import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Download,
  CheckCircle,
  FileText,
  Users,
  Target,
} from "lucide-react";
import { interviewGuides, type InterviewGuide } from "@/data/interviewGuides";
import { useToast } from "@/hooks/use-toast";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/FetchState";

const categoryLabels: Record<string, { label: string; icon: typeof BookOpen }> =
  {
    "scrum-master": { label: "Scrum Master", icon: Users },
    "product-owner": { label: "Product Owner", icon: Target },
    "agile-coach": { label: "Agile Coach", icon: TrendingUp },
  };

const InterviewQuestions = () => {
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const {
    data: guides,
    loading,
    error,
  } = useFetch<InterviewGuide[]>("interview-guides");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName) newErrors.name = "Full name is required.";
    else if (trimmedName.length > 100)
      newErrors.name = "Name must be under 100 characters.";

    if (!trimmedEmail) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
      newErrors.email = "Enter a valid email.";
    else if (trimmedEmail.length > 255)
      newErrors.email = "Email must be under 255 characters.";

    if (!trimmedPhone) newErrors.phone = "Phone number is required.";
    else if (!/^[+\d][\d\s\-()]{6,19}$/.test(trimmedPhone))
      newErrors.phone = "Enter a valid phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDownloadClick = (guide: InterviewGuide) => {
    setSelectedGuide(guide);
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "" });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast({
      title: "Download started!",
      description: `Your "${selectedGuide?.title}" guide is downloading.`,
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedGuide(null);
    setSubmitted(false);
  };

  const availableGuides = (guides ?? []).filter((g) => !g.comingSoon);
  const comingSoonGuides = (guides ?? []).filter((g) => g.comingSoon);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 mb-4 font-heading">
            Student Resource
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Agile &amp; Product Interview
            <br />
            Mastery Hub
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Your comprehensive resource for mastering interviews in Scrum
            Master, Product Owner, and Agile coaching roles. Access expert
            guides, practice scenarios, and proven strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <BookOpen className="h-5 w-5" />
              <span className="font-heading font-medium">22+ Topics</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <TrendingUp className="h-5 w-5" />
              <span className="font-heading font-medium">
                Many Career Paths
              </span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Clock className="h-5 w-5" />
              <span className="font-heading font-medium">Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-3">
            Choose Your Interview Guide
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select the role you're preparing for and access comprehensive,
            structured content designed to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full">
              <LoadingState label="Loading guides…" />
            </div>
          ) : error ? (
            <div className="col-span-full">
              <ErrorState message="We couldn't load the interview guides right now. Please try again later." />
            </div>
          ) : (
            <>
              {availableGuides.map((guide) => {
                const catInfo = categoryLabels[guide.category];
                const CatIcon = catInfo.icon;
                return (
                  <div
                    key={guide.id}
                    className="bg-card rounded-2xl border border-border p-6 flex flex-col hover:shadow-lg hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CatIcon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="font-heading text-xs"
                      >
                        {catInfo.label}
                      </Badge>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {guide.description}
                    </p>
                    <Button
                      onClick={() => handleDownloadClick(guide)}
                      className="w-full rounded-xl font-heading group/btn"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Now
                    </Button>
                  </div>
                );
              })}

              {/* Coming Soon cards */}
              {comingSoonGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-muted/50 rounded-2xl border border-border/50 p-6 flex flex-col items-center justify-center text-center opacity-70"
                >
                  <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {guide.description}
                  </p>
                  <Badge variant="outline" className="font-heading">
                    Coming Soon
                  </Badge>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Download Modal */}
      <Dialog open={modalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-foreground text-center">
                  Get Your Copy
                </DialogTitle>
                <p className="text-muted-foreground text-sm text-center mt-1">
                  Fill in your details to download{" "}
                  <span className="font-semibold text-foreground">
                    {selectedGuide?.title}
                  </span>
                  .
                </p>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="font-heading text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1.5 rounded-xl"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="font-heading text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1.5 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-heading text-sm">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1.5 rounded-xl"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-xl font-heading mt-2"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Submit &amp; Download
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Download Started!
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Your{" "}
                <span className="font-semibold text-foreground">
                  {selectedGuide?.title}
                </span>{" "}
                is downloading. Check your email for the guide link as well.
              </p>
              <Button
                variant="outline"
                onClick={handleClose}
                className="rounded-xl font-heading"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewQuestions;
