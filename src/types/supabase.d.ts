
import { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];
export type Views = Database['public']['Views'];

export interface ForumDomain extends Tables['forum_domains']['Row'] {}
export interface Neighborhood extends Tables['neighborhoods']['Row'] {}
export interface TestResult extends Tables['test_results']['Row'] {}
export interface Profile extends Tables['profiles']['Row'] {}
export interface Appointment extends Tables['appointments']['Row'] {}
