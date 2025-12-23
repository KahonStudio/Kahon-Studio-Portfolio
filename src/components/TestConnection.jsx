// Test component to verify Supabase connection
// Add this temporarily to your App.jsx to test the connection
// Remove it after confirming everything works

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const TestConnection = () => {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState(null)
  const [tablesStatus, setTablesStatus] = useState('Checking...')

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Basic connection
        const { error: connError } = await supabase
          .from('_test')
          .select('*')
          .limit(1)

        if (connError) {
          if (
            connError.code === 'PGRST116' || 
            connError.code === '42P01' ||
            connError.message.includes('does not exist') ||
            connError.message.includes('Could not find the table')
          ) {
            setStatus('✅ Connected!')
            setError(null)
          } else {
            throw connError
          }
        } else {
          setStatus('✅ Connected!')
        }

        // Test 2: Check if actual tables exist
        const tablesToCheck = ['projects', 'contacts', 'team_members']
        const existingTables = []

        for (const table of tablesToCheck) {
          try {
            const { error: tableError } = await supabase
              .from(table)
              .select('id')
              .limit(1)
            
            if (!tableError) {
              existingTables.push(table)
            }
          } catch (err) {
            // Table doesn't exist or error accessing it
          }
        }

        if (existingTables.length === 0) {
          setTablesStatus('No tables found. Please run database/schema.sql in Supabase SQL Editor.')
        } else if (existingTables.length < tablesToCheck.length) {
          setTablesStatus(`Found ${existingTables.length}/${tablesToCheck.length} tables: ${existingTables.join(', ')}`)
        } else {
          setTablesStatus(`✅ All tables found: ${existingTables.join(', ')}`)
        }

      } catch (err) {
        setError(err.message)
        setStatus('❌ Connection Failed')
        setTablesStatus('Error checking tables')
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: 'var(--navy)',
      border: '1px solid var(--green)',
      padding: '1rem',
      borderRadius: '0.25rem',
      color: 'var(--slate-lighter)',
      fontFamily: 'SF Mono, monospace',
      fontSize: '0.875rem',
      zIndex: 9999,
      maxWidth: '350px'
    }}>
      <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
        Supabase Connection Test
      </div>
      <div style={{ color: status.includes('✅') ? 'var(--green)' : 'var(--slate)', marginBottom: '0.5rem' }}>
        {status}
      </div>
      <div style={{ 
        color: tablesStatus.includes('✅') ? 'var(--green)' : tablesStatus.includes('No tables') ? '#ffa500' : 'var(--slate)',
        fontSize: '0.75rem',
        marginTop: '0.5rem',
        lineHeight: '1.4'
      }}>
        {tablesStatus}
      </div>
      {error && (
        <div style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.75rem' }}>
          Error: {error}
        </div>
      )}
    </div>
  )
}

export default TestConnection
