import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
console.log(process.env.REACT_APP_SANITY_PROJECT_ID);

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-03-31",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
