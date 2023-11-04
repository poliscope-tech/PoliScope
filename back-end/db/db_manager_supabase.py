from supabase import create_client

import os

class SupabaseConnector():
    def __init__(self, url, key):
        self.supabase = create_client(url, key)
    
    def read_table(self, table_name, query='*'):
        data = self.supabase.table(table_name).select(query).execute()
        return data

    def write_rows(self, data_frame, table_name):
        self.supabase.table(table_name).insert(data_frame).execute()



supa = SupabaseConnector(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))

