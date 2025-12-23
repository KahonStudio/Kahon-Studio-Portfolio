// Quick test to see if the publishable key format works
// This will help us understand what type of key you have

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcyxjsiryjcldnppixcl.supabase.co'
const publishableKey = 'sb_publishable_FXxnfd3v3GWGgk7L3GX6xQ_8ydtNn6K'

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key format:', publishableKey.substring(0, 20) + '...')
console.log('Key length:', publishableKey.length)
console.log('\n')

try {
  const supabase = createClient(supabaseUrl, publishableKey)
  
  // Try a simple connection test
  const { data, error } = await supabase
    .from('_test')
    .select('*')
    .limit(1)
  
  if (error) {
    if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
      console.log('❌ Key format is incorrect')
      console.log('Error:', error.message)
      console.log('\nThis key format is not a standard Supabase JWT token.')
      console.log('You need to find the "anon public" key in your Supabase dashboard.')
    } else {
      console.log('✅ Connection works! (Table might not exist, but connection is OK)')
      console.log('Error:', error.message)
    }
  } else {
    console.log('✅ Connection successful!')
  }
} catch (err) {
  console.log('❌ Connection failed')
  console.log('Error:', err.message)
}


