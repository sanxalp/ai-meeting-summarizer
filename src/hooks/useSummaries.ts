import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Summary {
  id: string;
  user_id: string;
  file_name: string;
  transcript: string;
  summary: string;
  created_at: string;
}

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSummaries();
    } else {
      setSummaries([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSummaries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSummaries(data || []);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSummary = async (fileName: string, transcript: string, summary: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('summaries')
        .insert({
          user_id: user.id,
          file_name: fileName,
          transcript,
          summary,
        })
        .select()
        .single();

      if (error) throw error;
      
      setSummaries(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating summary:', error);
      return null;
    }
  };

  const deleteSummary = async (id: string) => {
    try {
      const { error } = await supabase
        .from('summaries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSummaries(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting summary:', error);
    }
  };

  return {
    summaries,
    loading,
    createSummary,
    deleteSummary,
    refreshSummaries: fetchSummaries,
  };
}