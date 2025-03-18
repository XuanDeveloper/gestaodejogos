/*
  # Initial Schema Setup for Game Rental System

  1. Tables
    - games: Stores game information
    - customers: Stores customer information
    - rentals: Stores rental transactions
    - settings: Stores system settings like late fees

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  platform text NOT NULL,
  genre text NOT NULL,
  age_rating text NOT NULL,
  daily_rate decimal(10,2) NOT NULL,
  weekly_rate decimal(10,2) NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid REFERENCES games(id) NOT NULL,
  customer_id uuid REFERENCES customers(id) NOT NULL,
  rental_date timestamptz NOT NULL DEFAULT now(),
  due_date timestamptz NOT NULL,
  return_date timestamptz,
  total_amount decimal(10,2) NOT NULL,
  late_fees decimal(10,2),
  status text NOT NULL CHECK (status IN ('active', 'returned', 'overdue')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  late_fee_daily_rate decimal(10,2) NOT NULL DEFAULT 5.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated users full access to games"
  ON games FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to customers"
  ON customers FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to rentals"
  ON rentals FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to settings"
  ON settings FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rentals_updated_at
  BEFORE UPDATE ON rentals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();