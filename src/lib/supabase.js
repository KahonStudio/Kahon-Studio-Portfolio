import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const isProduction = import.meta.env.PROD
  const errorMessage = isProduction
    ? 'Missing Supabase configuration. Please check GitHub Secrets in repository settings.'
    : 'Missing Supabase environment variables. Please check your .env file.'
  
  throw new Error(errorMessage)
}

// Create and export Supabase client
let supabase
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  throw error
}

export { supabase }

