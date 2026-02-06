import { createFileRoute } from '@tanstack/react-router';

// UIs
import Home from "@/pages/Home";

export const Route = createFileRoute('/')({ component: Home })