'use server';

import { createClient } from '@supabase/supabase-js';

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function verifyPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}

export async function getProjects() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

export async function addProject(formData: FormData) {
  const supabase = getServerSupabase();
  
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const image_url = formData.get('image_url') as string;
  const github_url = formData.get('github_url') as string;
  const live_url = formData.get('live_url') as string;
  const size = formData.get('size') as string;

  const { error } = await supabase.from('projects').insert({
    title,
    description: description || null,
    image_url: image_url || null,
    github_url: github_url || null,
    live_url: live_url || null,
    size: size || 'small',
  });

  if (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = getServerSupabase();
  
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
