import requests
from bs4 import BeautifulSoup
import json

class DataAPIScraper:
    def __init__(self):
        self.base_url = 'https://growsf.org/people/'

    # Function to scrape a single page
    def scrape_page(self, politician):
        # Construct the full URL
        url = f"{self.base_url}{politician}"
        # Send a GET request
        response = requests.get(url)
        # If the request was successful and the page exists
        if response.ok:
            # Parse the HTML content
            soup = BeautifulSoup(response.text, 'html.parser')
            # Attempt to find the Policy positions & priorities section
            start_section = soup.find(id='policy-positions-priorities')
            end_section = soup.find(id='key-votes-and-actions')

            # Check if both sections are found
            if start_section and end_section:
                # Capture all text data after start_section and before end_section
                content = []
                for sibling in start_section.find_next_siblings():
                    # If we've reached the end_section, stop adding content
                    if sibling == end_section:
                        break
                    content.append(sibling.get_text(strip=True))
                # Combine all the text data
                policy_positions = ' '.join(content)
                return policy_positions
            else:
                return "Policy positions not found or end section not found."
        else:
            return "Page not found."
    

    def scrape(self):
        results = {}

        # Range of indices to scrape through
        # Note: You should confirm the range to avoid unnecessary requests
        politicians = [
            "aaron-peskin",
            "ahsha-safai",
            "catherine-stefani",
            "connie-chan",
            "dean-preston",
            "hillary-ronen",
            "joel-engardio",
            "matt-dorsey",
            "myrna-melgar",
            "rafael-mandelman",
            "shamann-walton",
        ]
        for politician in politicians:  # Update the range as required
            policy_positions = self.scrape_page(politician)
            if policy_positions != "Page not found.":
                # print(f"politician: {politician}, Policy Positions & Priorities: {policy_positions}\n")
                results[politician] = policy_positions
            else:
                print(f"politician: {politician} is not a valid page.\n")
        return results

scrpr = DataAPIScraper()
positions = scrpr.scrape()
with open('data/json/positions.json', 'w', encoding='utf-8') as f:
    json.dump(positions, f, ensure_ascii=False, indent=4)