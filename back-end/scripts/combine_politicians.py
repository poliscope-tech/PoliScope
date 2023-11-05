import pandas as pd
import os

# Define the path to the directory with CSV files
# Assuming 'scripts' and 'data/csv' directories are at the same level
csv_directory = 'data/csv/'

# Directory where the combined CSV will be saved, relative to the scripts directory
output_directory = 'data/csv/'

# List to hold dataframes
dfs = []

# Check if the CSV directory exists
if not os.path.exists(csv_directory):
    print(f"The directory {csv_directory} does not exist.")
else:
    # Loop over each file in the CSV directory
    for filename in os.listdir(csv_directory):
        if filename.endswith('.csv'):
            # Construct full file path
            file_path = os.path.join(csv_directory, filename)

            # Read the CSV file
            df = pd.read_csv(file_path)

            # Add a new column with the name of the file (excluding '.csv')
            df.insert(0, 'name', filename[:-4])

            # Append the modified dataframe to the list
            dfs.append(df)

    # Concatenate all dataframes into one
    combined_df = pd.concat(dfs, ignore_index=True)

    # Save the combined dataframe to a new CSV file in the output directory
    combined_csv_path = os.path.join(output_directory, 'politicians.csv')
    combined_df.to_csv(combined_csv_path, index=False)

    print(f"All CSV files have been combined into {combined_csv_path}")
