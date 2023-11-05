
from db.db_manager_supabase import SupabaseConnector
from processor.llm_processor import LLMProcessor
import os
import pandas as pd

# Assume that the SUPABASE_URL and SUPABASE_KEY are defined in your environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

import pandas as pd
from datetime import datetime, timedelta

def filter_last_n_months(df, column_name='Action Date', months_ago=1, date_format='%m/%d/%Y'):
    """
    Filter a DataFrame for rows from the last n months.

    Parameters:
    df (DataFrame): The DataFrame to filter.
    column_name (str): The name of the column with dates to filter by. Default is 'Action Date'.
    months_ago (int): The number of months back to filter. Default is 1 for the last month.
    date_format (str): The format of the dates in the DataFrame. Default is '%m/%d/%Y'.

    Returns:
    DataFrame: A filtered DataFrame containing only the rows from the last n months.
    """
    
    # Convert the date column to datetime format
    df[column_name] = pd.to_datetime(df[column_name], format=date_format)
    df['month'] = df[column_name].dt.month
    df['year'] = df[column_name].dt.year
    df = df[(df['month'] > 11 - months_ago) & (df['year']==2023)]
    
    return df
    

def main():
    # Initialize the Supabase connector
    supabase_connector = SupabaseConnector(supabase_url, supabase_key)

    # Read data from the Supabase table
    table_name = "politicians"  # Replace with your actual table name
    data_path_name = './data/csv/politicians.csv'
    positions = False

    # data_frame = supabase_connector.read_table(table_name)
    # data_frame.to_csv(data_path_name, index=False)

    # Check if the DataFrame is not empty
    # if not data_frame.empty:
    if True:
        
        # Initialize the LLM Processor with the data from Supabase
        summarizer_agent_path = './processor/agent_prompts/summarizer.txt'
        categorizer_big_agent_path = './processor/agent_prompts/categorizer_big.txt'
        categorizer_agent_path = './processor/agent_prompts/categorizer.txt'
        scorer_agent_path = './processor/agent_prompts/scorer.txt'
        positions_agent_path = './processor/agent_prompts/position_classifier.txt'

        llm_processor = LLMProcessor(data_path_name)
        llm_processor.summarizer_agent = llm_processor.initialize_agent(summarizer_agent_path)
        llm_processor.categorizer_big_agent = llm_processor.initialize_agent(categorizer_big_agent_path)
        llm_processor.categorizer_agent = llm_processor.initialize_agent(categorizer_agent_path)
        llm_processor.scorer_agent = llm_processor.initialize_agent(scorer_agent_path)
        llm_processor.positions_agent = llm_processor.initialize_agent(positions_agent_path, model_name="gpt-4")
        
        ## Filter data
        # Assuming you have a DataFrame 'df' with a dat63e column named 'Action Date'
        llm_processor.data = filter_last_n_months(llm_processor.data, 'Action Date', 6)  # This will filter for the last 3 months
        ## Filter on 1 politician
        llm_processor.data = llm_processor.data[llm_processor.data['name']=='Dean_Preston']
        llm_processor.data = llm_processor.data[llm_processor.data['Meeting Body'].isin(['Land Use and Transportation Committee', 'Homelessness and Behavioral Health Select Committee'])]
        print(llm_processor.data.shape, 'size after filter')

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
