// TODO: I am avoiding RLS because this application does not have a true signin
// we use credential sign in
// in the future I would use the DB provider oAuth for sign in
// for now, this way, the client will have just one connection

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rqctshjdksvhmwttkfdj.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY3MTI4MywiZXhwIjoxOTU2MjQ3MjgzfQ.XsoQHFm4BnLNWydkGEdgIwZcRn9BJ_6yEoClb34wxYI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
