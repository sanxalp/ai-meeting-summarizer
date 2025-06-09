/*
  # Create summaries table for AI Meeting Summarizer

  1. New Tables
    - `summaries`
      - `id` (uuid, primary key)
      - `user_id` (text, foreign key to auth.users)
      - `file_name` (text)
      - `transcript` (text)
      - `summary` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `summaries` table
    - Add policy for authenticated users to read/write their own summaries
*/

CREATE TABLE IF NOT EXISTS summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  file_name text NOT NULL,
  transcript text NOT NULL,
  summary text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own summaries"
  ON summaries
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own summaries"
  ON summaries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own summaries"
  ON summaries
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own summaries"
  ON summaries
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS summaries_user_id_created_at_idx 
  ON summaries (user_id, created_at DESC);