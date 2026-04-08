'use server';

import { createClient } from '@supabase/supabase-js';

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Prefer service role key for admin actions to bypass RLS
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
  return createClient(url, key);
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
  const client_impact = formData.get('client_impact') as string;
  const image_url = formData.get('image_url') as string;
  const demo_url = formData.get('demo_url') as string;
  const github_url = formData.get('github_url') as string;
  const size = formData.get('size') as string;

  const { error } = await supabase.from('projects').insert({
    title,
    description: description || null,
    client_impact: client_impact || null,
    image_url: image_url || null,
    demo_url: demo_url || null,
    github_url: github_url || null,
    size: size || 'small',
  });

  if (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = getServerSupabase();
  
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const client_impact = formData.get('client_impact') as string;
  const image_url = formData.get('image_url') as string;
  const demo_url = formData.get('demo_url') as string;
  const github_url = formData.get('github_url') as string;
  const size = formData.get('size') as string;

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      description: description || null,
      client_impact: client_impact || null,
      image_url: image_url || null,
      demo_url: demo_url || null,
      github_url: github_url || null,
      size: size || 'small',
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
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
