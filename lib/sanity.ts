// frontend/src/sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yc06zmeo",
  dataset: "production",
  apiVersion: "2025-05-01",
  useCdn: false,
});
