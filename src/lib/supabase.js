import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env file.')
  console.error('URL:', supabaseUrl ? '✅' : '❌ Missing')
  console.error('Anon Key:', supabaseAnonKey ? '✅' : '❌ Missing')
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

// Log connection info (only in development)
if (import.meta.env.DEV) {
  console.log('🔗 Connecting to Supabase...')
  console.log('URL:', supabaseUrl)
  console.log('Key format:', supabaseAnonKey.substring(0, 30) + '...')
  console.log('Key length:', supabaseAnonKey.length)
  
  // Warn if key doesn't look like a JWT token
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.warn('⚠️  Warning: Key does not start with "eyJ" (standard JWT format)')
    console.warn('   This might not be a standard Supabase anon key.')
    console.warn('   If you get connection errors, you may need to find the correct key.')
  }
}

// Create and export Supabase client
// Note: We'll try to create it even if the key format looks unusual
let supabase
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error.message)
  throw error
}

export { supabase }

