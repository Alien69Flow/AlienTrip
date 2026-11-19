/*
# Create trips, bookings, and favorites tables (single-tenant, no auth)

1. New Tables
- `trips`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `destination` (text, not null)
  - `start_date` (text, not null)
  - `end_date` (text, not null)
  - `status` (text, not null, check: planning | booked | completed, default 'planning')
  - `total_budget` (numeric, nullable)
  - `notes` (text, nullable)
  - `image` (text, nullable)
  - `created_at` (timestamp)
- `bookings`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `type` (text, not null, check: flight | stay | activity | coliving | restaurant | rental | package | transfer | train | esim | insurance)
  - `date` (text, not null)
  - `price` (numeric, not null)
  - `status` (text, not null, check: confirmed | pending | completed, default 'confirmed')
  - `image` (text, nullable)
  - `trip_id` (uuid, nullable, references trips, on delete set null) - optional link to a trip
  - `created_at` (timestamp)
- `favorites`
  - `id` (text, primary key) - client-side item id so toggling is idempotent
  - `title` (text, not null)
  - `type` (text, not null)
  - `price` (numeric, not null)
  - `image` (text, nullable)
  - `rating` (numeric, nullable)
  - `created_at` (timestamp)

2. Security
- Enable RLS on all three tables.
- Single-tenant app with no sign-in: grant and allow full CRUD to `anon` + `authenticated`.
- Separate policies per command, no FOR ALL.

3. Notes
- Bookings link to a trip via a real foreign key (`trip_id`) instead of the
  old client-side `bookingIds` array, so the relationship is queryable.
- `favorites.id` is text because it stores the listing id the frontend already generates.
- Idempotent: safe to re-run.
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'booked', 'completed')),
  total_budget numeric,
  notes text,
  image text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('flight', 'stay', 'activity', 'coliving', 'restaurant', 'rental', 'package', 'transfer', 'train', 'esim', 'insurance')),
  date text NOT NULL,
  price numeric NOT NULL,
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed')),
  image text,
  trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS favorites (
  id text PRIMARY KEY,
  title text NOT NULL,
  type text NOT NULL,
  price numeric NOT NULL,
  image text,
  rating numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON trips TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON bookings TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON favorites TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_trips" ON trips;
CREATE POLICY "anon_select_trips" ON trips FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trips" ON trips;
CREATE POLICY "anon_insert_trips" ON trips FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trips" ON trips;
CREATE POLICY "anon_update_trips" ON trips FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trips" ON trips;
CREATE POLICY "anon_delete_trips" ON trips FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_favorites" ON favorites;
CREATE POLICY "anon_select_favorites" ON favorites FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_favorites" ON favorites;
CREATE POLICY "anon_insert_favorites" ON favorites FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_favorites" ON favorites;
CREATE POLICY "anon_delete_favorites" ON favorites FOR DELETE
  TO anon, authenticated USING (true);
