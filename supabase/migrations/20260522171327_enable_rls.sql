ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reschedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
ON bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
ON bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON bookings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view passengers from their bookings"
ON passengers
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = passengers.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert passengers for their bookings"
ON passengers
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = passengers.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can access their reschedules"
ON reschedules
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = reschedules.booking_id
    AND bookings.user_id = auth.uid()
  )
);