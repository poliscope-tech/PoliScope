

from processor.llm_processor import LLMProcessor
import os
import pandas as pd

# Assume that the SUPABASE_URL and SUPABASE_KEY are defined in your environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

def main():
    data_path_name = 'data/positions.csv'
    # Initialize the LLM Processor with the data from Supabase
    position_agent_path = 'processor/agent_prompts/position_classifier.txt'
    llm_processor = LLMProcessor(data_path_name, position_agent_path)

    # Process the data with the LLM
    llm_processor.process()
    # Optional: Do something with the results, e.g., save them to a file or database
    output_path = 'classified_positions.csv'

    llm_processor.data.to_csv(output_path, index=False)

# If you want to perform additional processing like extraction, labeling, or rating,
# you can import and use the other classes from your project structure in a similar manner.

if __name__ == "__main__":
    main()
