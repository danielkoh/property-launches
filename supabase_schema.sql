-- Create the leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
);

-- Optional: Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Optional: Allow public inserts (anyone can register) but only authenticated users can read (or restrict reads entirely to service role)
-- CREATE POLICY "Allow public insert" ON public.leads FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow service role to read" ON public.leads FOR SELECT TO service_role USING (true);
