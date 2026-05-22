INSERT INTO flights (
  id,
  flight_no,
  origin,
  destination,
  departs_at,
  arrives_at,
  aircraft_type,
  status,
  base_price
)
VALUES
(
  gen_random_uuid(),
  'SB101',
  'Delhi',
  'Mumbai',
  '2026-06-01 08:00:00+05:30',
  '2026-06-01 10:15:00+05:30',
  'Airbus A320',
  'scheduled',
  4500
),

(
  gen_random_uuid(),
  'SB102',
  'Mumbai',
  'Delhi',
  '2026-06-01 13:00:00+05:30',
  '2026-06-01 15:15:00+05:30',
  'Airbus A320',
  'scheduled',
  4700
),

(
  gen_random_uuid(),
  'SB201',
  'Delhi',
  'Bangalore',
  '2026-06-02 09:00:00+05:30',
  '2026-06-02 11:45:00+05:30',
  'Boeing 737',
  'scheduled',
  6500
),

(
  gen_random_uuid(),
  'SB202',
  'Bangalore',
  'Delhi',
  '2026-06-02 16:00:00+05:30',
  '2026-06-02 18:45:00+05:30',
  'Boeing 737',
  'scheduled',
  6300
),

(
  gen_random_uuid(),
  'SB301',
  'Delhi',
  'Goa',
  '2026-06-03 07:30:00+05:30',
  '2026-06-03 10:00:00+05:30',
  'Airbus A321',
  'scheduled',
  7200
),

(
  gen_random_uuid(),
  'SB302',
  'Goa',
  'Delhi',
  '2026-06-03 18:30:00+05:30',
  '2026-06-03 21:00:00+05:30',
  'Airbus A321',
  'scheduled',
  7000
),

(
  gen_random_uuid(),
  'SB401',
  'Mumbai',
  'Bangalore',
  '2026-06-04 11:00:00+05:30',
  '2026-06-04 13:00:00+05:30',
  'Boeing 737',
  'scheduled',
  5500
),

(
  gen_random_uuid(),
  'SB402',
  'Bangalore',
  'Mumbai',
  '2026-06-04 15:00:00+05:30',
  '2026-06-04 17:00:00+05:30',
  'Boeing 737',
  'scheduled',
  5400
);

DO $$
DECLARE
    flight_record RECORD;
    row_num INT;
    seat_letter TEXT;
    seat_class seat_class;
    extra_fee NUMERIC;
BEGIN

    FOR flight_record IN SELECT id FROM flights LOOP

        FOR row_num IN 1..20 LOOP

            FOREACH seat_letter IN ARRAY ARRAY['A', 'B', 'C', 'D', 'E', 'F']
            LOOP

                IF row_num <= 2 THEN
                    seat_class := 'first';
                    extra_fee := 5000;

                ELSIF row_num <= 5 THEN
                    seat_class := 'business';
                    extra_fee := 2500;

                ELSE
                    seat_class := 'economy';
                    extra_fee := 0;
                END IF;

                INSERT INTO seats (
                    flight_id,
                    seat_number,
                    class,
                    is_available,
                    extra_fee
                )
                VALUES (
                    flight_record.id,
                    row_num || seat_letter,
                    seat_class,
                    true,
                    extra_fee
                );

            END LOOP;

        END LOOP;

    END LOOP;

END $$;