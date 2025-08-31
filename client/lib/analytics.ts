export type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  meta?: Record<string, unknown>;
};

export function track(event: AnalyticsEvent) {
  try {
    // Google Analytics (gtag) compatible
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.meta,
      });
    }
  } catch (e) {
    // no-op
  } finally {
    if (process.env.NODE_ENV !== "production") {
      // Helpful during development
      console.debug("analytics", event);
    }
  }
}
