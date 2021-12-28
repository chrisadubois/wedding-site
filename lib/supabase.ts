// TODO: I am avoiding RLS because this application does not have a true signin
// we use credential sign in
// in the future I would use the DB provider oAuth for sign in
// for now, this way, the client will have just one connection

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
