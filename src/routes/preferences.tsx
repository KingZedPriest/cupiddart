import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

// UIs
import Preferences from "@/pages/Preferences";

const schema = z.object({
  page: z
    .coerce
    .number()
    .refine((val) => [1, 2, 3].includes(val), {
      message: "Invalid page",
    })
    .default(1),
});


export const Route = createFileRoute('/preferences')({
  validateSearch: zodValidator(schema),
  errorComponent: ({ error }) => (
    <div>Invalid search param: {error.message}</div>
  ),
  component: RouteComponent,
});


function RouteComponent() {
  return <Preferences />
}
