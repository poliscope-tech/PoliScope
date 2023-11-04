from supabase import create_client
import pandas as pd

import os

class SupabaseConnector():
    def __init__(self, url, key):
        self.supabase = create_client(url, key)
    
    def read_table(self, table_name, query='*'):
        data, count = self.supabase.table(table_name).select(query).execute()
        return pd.DataFrame(data[1])

    def write_rows(self, data_frame, table_name):
        self.supabase.table(table_name).insert(data_frame).execute()


if __name__=='__main__':
    supa = SupabaseConnector(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))

    df = supa.read_table('aaron_peskin')

