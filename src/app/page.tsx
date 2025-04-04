"use client";

import Worksheet from "@/components/worksheet";

// TODO: Find a better way to initiate this
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  return <Worksheet />;
}
