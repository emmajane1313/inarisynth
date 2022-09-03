import { createClient } from "urql";
import { BASE_URL } from "./constants";

export const client = createClient({ url: BASE_URL });

