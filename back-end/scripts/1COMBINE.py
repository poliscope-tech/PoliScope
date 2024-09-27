import pandas as pd
import os

#Stuck on Fixing combining politicans and making sure display. 
# Then categorizer is it working?

# Define the path to the directory with CSV files
csv_directory = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/data/csv'

# Directory where the combined CSV will be saved
output_directory = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/data/csv'

# Required columns and their new names
required_columns = {
    'ID': 'ID',
    'File #': 'File #',
    'Action Date': 'Action Date',
    'Title': 'Title',
    'Vote': 'Vote',
    'Meeting Body': 'Meeting Body'
}

# Create the CSV directory if it doesn't exist
if not os.path.exists(csv_directory):
    os.makedirs(csv_directory)
    print(f"The directory {csv_directory} has been created.")

# Create the output directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)
    print(f"The directory {output_directory} has been created.")

# List to hold dataframes
dfs = []

# Loop over each file in the CSV directory
for filename in os.listdir(csv_directory):
    if filename.endswith('.csv'):
        # Construct full file path
        file_path = os.path.join(csv_directory, filename)

        # Read the CSV file
        df = pd.read_csv(file_path)

        # Add a new column with the name of the file (excluding '.csv')
        df.insert(0, 'name', filename[:-4])

        # Rename columns to match required names
        df.rename(columns=required_columns, inplace=True)

        # Select only the required columns
        df = df[['name'] + list(required_columns.values())]

        # Append the modified dataframe to the list
        dfs.append(df)

# Concatenate all dataframes into one
if dfs:  # Check if there are any dataframes to concatenate
    combined_df = pd.concat(dfs, ignore_index=True)

    # Save the combined dataframe to a new CSV file in the output directory
    combined_csv_path = os.path.join(output_directory, 'output.csv')
    combined_df.to_csv(combined_csv_path, index=False)

    print(f"All CSV files have been combined into {combined_csv_path}")
else:
    print("No CSV files found in the directory to combine.")
