import pandas as pd
from datetime import datetime

def clean_and_prepare_csv(file_path):
    """
    Clean and prepare the CSV file for processing.
    
    Parameters:
    file_path (str): The path to the CSV file to clean.
    
    Returns:
    DataFrame: A cleaned DataFrame.
    """
    # Load the CSV
    df = pd.read_csv(file_path)
    
    # Standardize column names: Replace non-breaking spaces with regular spaces
    df.columns = df.columns.str.replace('\xa0', ' ').str.strip()

    # Print column names for debugging
    print("Cleaned column names:", df.columns.tolist())

    # Drop any rows where 'Action Date' or 'Title' are missing
    df_cleaned = df.dropna(subset=['Action Date', 'Title'])

    # Ensure the 'Action Date' column is properly formatted
    df_cleaned.loc[:, 'Action Date'] = pd.to_datetime(df_cleaned['Action Date'], format='%m/%d/%Y', errors='coerce')

    # Drop rows where 'Action Date' couldn't be parsed properly
    df_cleaned = df_cleaned.dropna(subset=['Action Date'])
    
    return df_cleaned

def filter_last_n_months(df, column_name='Action Date', months_ago=1):
    """
    Filter a DataFrame for rows from the last n months.
    
    Parameters:
    df (DataFrame): The DataFrame to filter.
    column_name (str): The name of the column with dates to filter by. Default is 'Action Date'.
    months_ago (int): The number of months back to filter. Default is 6 months.
    
    Returns:
    DataFrame: A filtered DataFrame containing only the rows from the last n months.
    """
    # Get the current date and subtract the given number of months
    current_date = datetime.now()
    date_n_months_ago = current_date - pd.DateOffset(months=months_ago)
    
    # Filter the DataFrame to only include rows where the 'Action Date' is greater than or equal to the calculated date
    df_filtered = df[df[column_name] >= date_n_months_ago]
    
    return df_filtered

def main():
    # Define the path to your specific CSV file
    file_path = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/DeanPrestonready copy.csv'

    # Step 1: Clean and load the CSV data
    df_cleaned = clean_and_prepare_csv(file_path)
    print("Cleaned data shape:", df_cleaned.shape)

    # Step 2: Filter the data for the last 6 months
    df_filtered = filter_last_n_months(df_cleaned, 'Action Date', months_ago=6)
    print("Data size after filtering:", df_filtered.shape)

    # Step 3: Save the filtered data for processing
    data_path_name = './DeanPrestonready_filtered.csv'
    df_filtered.to_csv(data_path_name, index=False)  # Save the filtered data for processing
    
    # Step 4: Initialize and use LLMProcessor to process the filtered data
    from processor.llm_processor import LLMProcessor  # Ensure correct import
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
    
    # Process the data with the LLM
    llm_processor.process()

    # Save the final processed data
    output_path = './DeanPrestonready_final.csv'
    llm_processor.data.to_csv(output_path, index=False)
    print("Final data saved to", output_path)

if __name__ == "__main__":
    main()