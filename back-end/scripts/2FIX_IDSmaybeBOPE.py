import csv
import uuid

#STEP 2, FIX IDs PRIOR TO UPLOAD TO SUPABASE.

# Function to generate a unique ID
def generate_unique_id():
    return str(uuid.uuid4())

# Specify the CSV file paths
input_csv_path = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/data/csv/politicians.csv'
output_csv_path = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/data/csv/politicians.csv'

# Read the CSV data
with open(input_csv_path, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    data = [row for row in reader]

# Modify the data with incremental IDs
for index, row in enumerate(data, start=1):  # start=1 if you want IDs to start from 1
    row['ID'] = index  # Assign the new ID

# Write to the new CSV file with 'ID' as the first column
with open(output_csv_path, mode='w', newline='', encoding='utf-8') as outfile:
    # If you want the 'ID' field first, you can order your fields accordingly
    fieldnames = ['ID'] + [field for field in data[0] if field != 'ID']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(data)

print(f"Data with new sequential IDs has been successfully saved to {output_csv_path}")