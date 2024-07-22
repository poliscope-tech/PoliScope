import requests
from bs4 import BeautifulSoup
import pandas as pd

# The target URL
url = "https://sfgov.legistar.com/PersonDetail.aspx?ID=36652&GUID=14EFBAA7-E930-4706-BF21-399C01B1F1F6&Search="

# Make a request to the website
response = requests.get(url)
response.raise_for_status()  # This will raise an error if the request failed

# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Initialize a list to store all records
records = []

# Find the table containing the data (assuming it is the first table for demonstration)
# Note: You might need to update this if there are multiple tables or if the table structure differs
table = soup.find('table')  
if table:
    # Iterate over all rows in the table, skipping the header
    for row in table.find_all('tr')[1:]:  # [1:] skips the header row
        cols = row.find_all('td')
        # Make sure there are enough columns in this row
        if len(cols) >= 6:
            record = {
                'ID': cols[0].text.strip(),
                'File #': cols[1].text.strip(),
                'Action Date': cols[2].text.strip(),
                'Title': cols[3].text.strip(),
                'Vote': cols[4].text.strip(),
                'Meeting Body': cols[5].text.strip()
            }
            records.append(record)

# Convert the list of dictionaries to a pandas DataFrame
df = pd.DataFrame(records)

# Specify the filename for the Excel file
output_file = 'output.xlsx'
# Write the DataFrame to an Excel file
df.to_excel(output_file, index=False)

print(f"Scraped data has been saved to {output_file}")
