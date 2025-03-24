/*
  # Create reservations table

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key)
      - `nom` (text)
      - `prenom` (text)
      - `email` (text)
      - `telephone` (text)
      - `ville` (text)
      - `created_at` (timestamp)
      - `webhook_sent` (boolean)
  2. Security
    - Enable RLS on `reservations` table
    - Add policy for inserting new reservations
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  prenom text NOT NULL,
  email text NOT NULL,
  telephone text NOT NULL,
  ville text NOT NULL,
  created_at timestamptz DEFAULT now(),
  webhook_sent boolean DEFAULT false
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all users" ON reservations
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON reservations
  FOR SELECT TO public
  USING (true);