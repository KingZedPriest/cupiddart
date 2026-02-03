import { createFileRoute } from '@tanstack/react-router';

// Components
import Home from "@/pages/Home";

export const Route = createFileRoute('/')({ component: Home })