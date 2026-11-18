-- wastedape.org Phase 2 Schema
-- Created by Tabitha on TAB9

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

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_downloads_lead_id ON downloads(lead_id);
CREATE INDEX idx_consultations_lead_id ON consultations(lead_id);
