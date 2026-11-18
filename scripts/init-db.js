#!/usr/bin/env node

/**
 * Initialize Supabase schema for wastedape.org Phase 2
 * Usage: node scripts/init-db.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const schema = `
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  company text,
  phone text,
  service_interest text,
  source text,
  ip_address text,
  created_at timestamp DEFAULT now(),
  last_active timestamp DEFAULT now(),
  notes text,
  status text DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS downloads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  resource_name text,
  downloaded_at timestamp DEFAULT now(),
  ip_address text
);

CREATE TABLE IF NOT EXISTS consultations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  service text,
  challenge text,
  timeline text,
  submitted_at timestamp DEFAULT now(),
  status text DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_downloads_lead_id ON downloads(lead_id);
CREATE INDEX IF NOT EXISTS idx_consultations_lead_id ON consultations(lead_id);
`;

async function initDatabase() {
  console.log('🚀 Initializing wastedape.org database schema...');
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: schema });
    
    if (error) {
      console.error('❌ Schema creation error:', error);
      process.exit(1);
    }
    
    console.log('✅ Schema created successfully');
    console.log('📊 Tables created: leads, downloads, consultations');
    console.log('🔑 Indexes created for performance');
    
  } catch (err) {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  }
}

initDatabase();
