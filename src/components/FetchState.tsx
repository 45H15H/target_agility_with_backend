import { Loader2, AlertTriangle } from "lucide-react";

/** Centered spinner shown while API data is loading. */
export const LoadingState = ({ label = "Loading…" }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
    <p className="text-muted-foreground font-heading text-sm">{label}</p>
  </div>
);

/** Centered error message shown when an API request fails. */
export const ErrorState = ({
  message = "We couldn't load this content. Please try again later.",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
    <p className="text-muted-foreground font-heading text-sm max-w-md">
      {message}
    </p>
  </div>
);
