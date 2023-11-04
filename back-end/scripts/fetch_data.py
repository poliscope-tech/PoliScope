import os
from supabase import create_client, Client

url: str = "https://hxrggsnimtifedjvpupp.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cmdnc25pbXRpZmVkanZwdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMzU5NDYsImV4cCI6MjAxNDcxMTk0Nn0.eAZYkghBmpIVkED5QWvjcMyFvsfcpgiyFSNADV3AGEA"
supabase: Client = create_client(url, key)

response = supabase.table('aaron_peskin').select("*").execute()
print(response.data)