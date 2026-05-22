-- ENUMS
CREATE TYPE flight_status AS ENUM (
  'scheduled',
  'delayed',
  'departed',
  'cancelled'
);

CREATE TYPE seat_class AS ENUM (
  'economy',
  'business',
  'first'
);

CREATE TYPE booking_status AS ENUM (
  'confirmed',
  'rescheduled',
  'cancelled'
);

-- FLIGHTS TABLE
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  flight_no VARCHAR(20) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,

  departs_at TIMESTAMPTZ NOT NULL,
  arrives_at TIMESTAMPTZ NOT NULL,

  aircraft_type VARCHAR(100) NOT NULL,

  status flight_status DEFAULT 'scheduled',

  base_price NUMERIC(10,2) NOT NULL,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- SEATS TABLE
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  flight_id UUID REFERENCES flights(id) ON DELETE CASCADE,

  seat_number VARCHAR(10) NOT NULL,

  class seat_class NOT NULL,

  is_available BOOLEAN DEFAULT true,

  extra_fee NUMERIC(10,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(flight_id, seat_number)
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  flight_id UUID REFERENCES flights(id),

  seat_id UUID REFERENCES seats(id),

  status booking_status DEFAULT 'confirmed',

  booked_at TIMESTAMPTZ DEFAULT now(),

  total_price NUMERIC(10,2) NOT NULL,

  pnr_code VARCHAR(20) UNIQUE NOT NULL,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- PASSENGERS TABLE
CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

  full_name VARCHAR(255) NOT NULL,

  passport_no VARCHAR(50) NOT NULL,

  nationality VARCHAR(100) NOT NULL,

  dob DATE NOT NULL,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- RESCHEDULES TABLE
CREATE TABLE reschedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

  old_flight_id UUID REFERENCES flights(id),

  new_flight_id UUID REFERENCES flights(id),

  requested_at TIMESTAMPTZ DEFAULT now(),

  fee_charged NUMERIC(10,2) DEFAULT 0
);

-- INDEXES
CREATE INDEX idx_flights_route
ON flights(origin, destination);

CREATE INDEX idx_bookings_user
ON bookings(user_id);

CREATE INDEX idx_seats_flight
ON seats(flight_id);