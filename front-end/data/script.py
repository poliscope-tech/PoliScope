import csv
import json
from datetime import datetime

# Define the CSV and JSON file names
csv_file_path = 'your_file.csv'  # Replace with your CSV file name
json_file_path = 'llmResults.json'  # The JSON file will have a specific name

# Function to convert date format
def convert_date_format(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d').strftime('%m/%d/%Y')

# Read the CSV and convert it to the desired dictionary format
data = []
with open(csv_file_path, mode='r', encoding='utf-8-sig') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:
        # Transform and map CSV data to the desired JSON structure
        json_row = {
            'name': row['name'].replace('_', ' '),
            'id': int(row['ID']),
            'fileNr': int(float(row['File #'])),
            'actionDate': convert_date_format(row['Action Date']),
            'title': row['Title'],
            'vote': row['Vote'],
            'summary': row['Meeting Body'],
            'category': row['category'],
            'affordable_housing_development_score': float(row['affordable_housing_development_score'] or 0),
            'tenant_protections_score': float(row['tenant_protections_score'] or 0),
            'homelessness_and_supportive_housing_score': float(row['homelessness_and_supportive_housing_score'] or 0),
            'faster_permitting_process_and_bureaucracy_score': float(row['faster_permitting_process_and_bureaucracy_score'] or 0),
            'land_use_and_zoning_reform': float(row['land_use_and_zoning_reform_score'] or 0),
        }
        data.append(json_row)

# Wrap the data in the required export statement
json_data = {'llmResults': data}

# Write the dictionary to a JSON file
with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
    jsonfile.write('export const llmResults = ')
    jsonfile.write(json.dumps(json_data['llmResults'], indent=2))

print(f"CSV data has been successfully converted to {json_file_path}")
