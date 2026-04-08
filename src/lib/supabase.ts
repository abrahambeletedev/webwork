import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Project = {
  id: string;
  title: string;
  description: string | null;
  client_impact: string | null;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  demo_url: string | null;
  size: 'small' | 'large';
  created_at: string;
};
