
from db.db_manager_supabase import SupabaseConnector
from processor.llm_processor import LLMProcessor
import os
import pandas as pd

# Assume that the SUPABASE_URL and SUPABASE_KEY are defined in your environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

def main():
    # Initialize the Supabase connector
    supabase_connector = SupabaseConnector(supabase_url, supabase_key)

    # Read data from the Supabase table
    table_name = "aaron_peskin"  # Replace with your actual table name
    data_frame = supabase_connector.read_table(table_name)

    data_path_name = './data/ingest.csv'
    data_frame.to_csv(data_path_name, index=False)

    # Check if the DataFrame is not empty
    if not data_frame.empty:
        # Initialize the LLM Processor with the data from Supabase
        llm_processor = LLMProcessor(data_path_name)

        # Assuming that 'agent_prompts/summarizer.txt' contains the necessary prompt to initialize the agent
        agent_definition_path = './processor/agent_prompts/summarizer.txt'
        llm_processor.initialize_agent(agent_definition_path)

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
