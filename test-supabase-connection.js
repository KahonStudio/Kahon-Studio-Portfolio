// Test script to verify Supabase connection
// Run this with: node test-supabase-connection.js
// Make sure you have your .env file set up first

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('Anon Key:', supabaseAnonKey ? '✅ Found' : '❌ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing environment variables!')
  console.error('Please check your .env file.')
  process.exit(1)
}

try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  console.log('\n📡 Testing connection...')
  
  // Test a simple query (this will work even if tables don't exist)
  const { data, error } = await supabase
    .from('_test_connection')
    .select('*')
    .limit(1)
  
  if (error) {
    // If table doesn't exist, that's okay - connection still works
    if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
      console.log('✅ Connection successful!')
      console.log('   (Table doesn\'t exist, but connection works)')
    } else {
      console.error('❌ Connection error:', error.message)
      process.exit(1)
    }
  } else {
    console.log('✅ Connection successful!')
  }
  
  console.log('\n🎉 Your Supabase connection is working!')
  console.log('You can now use Supabase in your React components.')
  
} catch (error) {
  console.error('\n❌ Error:', error.message)
  console.error('\nPossible issues:')
  console.error('1. Wrong URL format')
  console.error('2. Wrong anon key format')
  console.error('3. Network connection issues')
  process.exit(1)
}

