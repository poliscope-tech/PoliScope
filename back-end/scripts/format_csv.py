import pandas as pd
from bs4 import BeautifulSoup
from io import StringIO

def clean_and_format(html_file, output_file):
    # Read HTML content from the file assumed to be HTML-like CSV
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse HTML to find tables
    soup = BeautifulSoup(html_content, 'html.parser')
    tables = soup.find_all('table')
    
    if not tables:
        print("No tables found in the HTML content.")
        return

    # Convert the first found table into a DataFrame using StringIO to handle deprecated warning
    df_html = pd.read_html(StringIO(str(tables[0])))[0]

    # Clean up the 'File #' column to remove extra characters and correct referencing
    df_html['File #'] = df_html['File #'].str.extract(r'(\d+)')
    df_html.drop(columns=['File #'], inplace=True)

    # Add an 'ID' column
    df_html.insert(0, 'ID', range(1, 1 + len(df_html)))

    # Save to a new CSV file
    df_html.to_csv(output_file, index=False)
    print(f"Data formatted and saved to {output_file}")

if __name__ == "__main__":
    # Specify the path to your HTML-like CSV file and the output CSV file
    html_file_path = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/scripts/Rafael_Mandelman2.csv'
    output_csv_path = '/Users/williammisiaszek/Code/ACCELSF/PoliScope/back-end/scripts/readyformat/output.csv'

    # Call the function with the specified paths
    clean_and_format(html_file_path, output_csv_path)
