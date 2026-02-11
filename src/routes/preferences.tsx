import { createFileRoute } from '@tanstack/react-router';

// UIs
import Preferences from "@/pages/Preferences";

export const Route = createFileRoute('/preferences')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: search.page as number | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Preferences />
}
