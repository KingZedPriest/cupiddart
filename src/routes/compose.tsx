import { createFileRoute } from '@tanstack/react-router';

// UIs
import Compose from "@/pages/Compose";

export const Route = createFileRoute('/compose')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Compose />
}
