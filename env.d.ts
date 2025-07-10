declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    MONGODB_DB: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    // add other env vars here if needed
  }
} 