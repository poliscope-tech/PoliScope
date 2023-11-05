from db.db_manager_supabase import *
import pandas as pd
import os
from sqlalchemy import create_engine

# Supabase credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

# The database URL should be in the format:
# postgresql://user:password@host:port/database
# database_url = f'{supabase_url}?apikey={supabase_key}'
# Example format (make sure to use your actual credentials)
database_url = f'postgresql://postgres.hxrggsnimtifedjvpupp:U956u9HMsiYvRf0o@aws-0-us-east-1.pooler.supabase.com:6543/postgres'


# Create an SQLAlchemy engine
engine = create_engine(database_url)
    
# Read the llm_results.csv file into a DataFrame
llm_results_df = pd.read_csv('llm_results.csv')

# Clean the DataFrame if needed (handle NaNs, format columns, etc.)
llm_results_df = llm_results_df.fillna(0.0)

# Assuming llm_results.csv is correctly formatted and ready for upload, this step may not be necessary.
llm_results_df.to_sql('llm_results', con=engine, index=False, if_exists='append')

# Write the DataFrame to the 'llm_results' table in the database
# The table_name 'llm_results' must exist in your Supabase database schema.
# supa.write_rows(llm_results_df, 'llm_results')

print('llm_results.csv data has been written to the database.')

engine.dispose()
