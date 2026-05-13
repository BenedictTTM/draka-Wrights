BEGIN;

CREATE TABLE IF NOT EXISTS "Admin" (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Support Agent',
  status TEXT NOT NULL DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS "Setting" (
  id TEXT PRIMARY KEY DEFAULT 'default',
  "orgName" TEXT NOT NULL DEFAULT 'University of Ghana',
  "supportEmail" TEXT NOT NULL DEFAULT 'ashc@ug.edu.gh',
  "dataRetention" TEXT NOT NULL DEFAULT '1 Year'
);

CREATE TABLE IF NOT EXISTS "Report" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  anonymous BOOLEAN NOT NULL DEFAULT true,
  priority TEXT NOT NULL DEFAULT 'Medium',
  location TEXT NULL,
  incident_date TEXT NULL,
  incident_time TEXT NULL,
  is_online BOOLEAN NOT NULL DEFAULT false,
  evidence_notes TEXT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Message" (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT message_report_fk FOREIGN KEY (report_id) REFERENCES "Report"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Notification" (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
