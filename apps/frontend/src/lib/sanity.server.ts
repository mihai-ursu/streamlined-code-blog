/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  // Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
  // As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
  token:
    process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

export const getClient = (preview: boolean) =>
  preview ? previewClient : sanityClient;

interface Document {
  _id: string;
}

export function overlayDrafts(docs?: Document[]) {
  const documents = docs || [];
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error("Ensure that `_id` is included in query projection");
    }

    const isDraft = doc._id.startsWith("drafts.");
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map<string, Document>());

  return Array.from(overlayed.values());
}
