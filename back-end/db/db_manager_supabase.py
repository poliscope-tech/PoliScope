from supabase import create_client
import pandas as pd

import os

class SupabaseConnector():
    def __init__(self, url, key):
        self.supabase = create_client(url, key)
    
    def read_table(self, table_name, query='*'):
        data, count = self.supabase.table(table_name).select(query, count='exact').limit(100000).execute()
        print('Pulled of size', count)
        df = pd.DataFrame(data[1])
        df.columns = [col.replace('\xa0', ' ') for col in df.columns]
        return df

    def write_rows(self, data_frame, table_name):
        self.supabase.table(table_name).insert(data_frame).execute()

if __name__=='__main__':
    supa = SupabaseConnector(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))

    df = supa.read_table('politicians')
