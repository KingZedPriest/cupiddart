import { createFileRoute } from '@tanstack/react-router';

// UIs
import Preferences from "@/pages/Preferences";

export const Route = createFileRoute('/preferences')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Preferences />
}
