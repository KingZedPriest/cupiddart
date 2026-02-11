import { createFileRoute } from '@tanstack/react-router';

// UIs
import Compose from "@/pages/Compose";
import Loading from '@/components/Loader';

export const Route = createFileRoute('/compose')({
    component: RouteComponent,
    pendingComponent: () => <Loading message='Your Canvas is Loading' />,
})

function RouteComponent() {
    return <Compose />
}
