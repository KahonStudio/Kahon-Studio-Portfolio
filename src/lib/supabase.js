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
  
  console.error('❌ Missing Supabase environment variables!')
  console.error('URL:', supabaseUrl ? '✅' : '❌ Missing')
  console.error('Anon Key:', supabaseAnonKey ? '✅' : '❌ Missing')
  
  if (isProduction) {
    console.error('')
    console.error('For GitHub Pages deployment:')
    console.error('1. Go to your repository → Settings → Secrets and variables → Actions')
    console.error('2. Add these secrets:')
    console.error('   - VITE_SUPABASE_URL')
    console.error('   - VITE_SUPABASE_ANON_KEY')
    console.error('3. Re-run the deployment workflow')
  }
  
  throw new Error(errorMessage)
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

