
from db.db_manager_supabase import SupabaseConnector
from processor.llm_processor import LLMProcessor
import os
import pandas as pd

# Assume that the SUPABASE_URL and SUPABASE_KEY are defined in your environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

import pandas as pd
from datetime import datetime, timedelta

def filter_last_month(df):
    # Convert 'Action Date' to datetime format
    df['Action Date'] = pd.to_datetime(df['Action Date'], format='%m/%d/%Y')
    
    # Get the first and last day of the last month
    today = datetime.today()
    first_day_last_month = (today.replace(day=1) - timedelta(days=1)).replace(day=1)
    last_day_last_month = today.replace(day=1) - timedelta(days=1)
    
    # Filter the DataFrame for rows from the last month
    df_filtered = df[(df['Action Date'] >= first_day_last_month) & (df['Action Date'] <= last_day_last_month)]
    
    return df_filtered


def main():
    # Initialize the Supabase connector
    supabase_connector = SupabaseConnector(supabase_url, supabase_key)

    # Read data from the Supabase table
    table_name = "politicians"  # Replace with your actual table name
    data_path_name = './data/csv/politicians.csv'
    positions = False

    data_frame = supabase_connector.read_table(table_name)
    data_frame.to_csv(data_path_name, index=False)

    # Check if the DataFrame is not empty
    if not data_frame.empty:
        # Initialize the LLM Processor with the data from Supabase
        summarizer_agent_path = './processor/agent_prompts/summarizer.txt'
        categorizer_agent_path = './processor/agent_prompts/categorizer.txt'
        scorer_agent_path = './processor/agent_prompts/scorer.txt'
        positions_agent_path = './processor/agent_prompts/position_classifier.txt'
        llm_processor = LLMProcessor(data_path_name)
        llm_processor.summarizer_agent = llm_processor.initialize_agent(summarizer_agent_path)
        llm_processor.categorizer_agent = llm_processor.initialize_agent(categorizer_agent_path)
        llm_processor.scorer_agent = llm_processor.initialize_agent(scorer_agent_path)
        llm_processor.positions_agent = llm_processor.initialize_agent(positions_agent_path, model_name="gpt-4")
        
        ## Filter data
        llm_processor.data = filter_last_month(llm_processor.data)

        if positions:
            llm_processor.process_positions()

        # Process the data with the LLM
        llm_processor.process()
        # Optional: Do something with the results, e.g., save them to a file or database
        output_path = './llm_results.csv'

        llm_processor.data.to_csv(output_path, index=False)

    else:
        print("No data retrieved from the Supabase table.")

# If you want to perform additional processing like extraction, labeling, or rating,
# you can import and use the other classes from your project structure in a similar manner.

if __name__ == "__main__":
    main()
