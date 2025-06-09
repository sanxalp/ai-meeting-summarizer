/*
  # Update authentication settings

  1. Changes
    - Disable email confirmation for immediate signup access
    - Update auth settings for seamless user experience

  2. Security
    - Maintain RLS policies
    - Keep secure authentication flow
*/

-- Note: Email confirmation settings are typically configured in the Supabase dashboard
-- under Authentication > Settings > Email Auth
-- This migration serves as documentation of the required settings:

-- Email confirmation: DISABLED
-- Enable email confirmations: OFF
-- Enable phone confirmations: OFF
-- Enable phone sign-ups: OFF

-- The actual configuration needs to be done in the Supabase dashboard
-- as these settings are not controllable via SQL migrations