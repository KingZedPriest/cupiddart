import { createFileRoute } from '@tanstack/react-router';

// Components
import Compose from "@/pages/Compose";

export const Route = createFileRoute('/compose')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Compose />
}
