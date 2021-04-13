import { createClient } from '@supabase/supabase-js';
import { supabseConfig } from './env';

export const supabase = createClient(supabseConfig.URL, supabseConfig.KEY);
