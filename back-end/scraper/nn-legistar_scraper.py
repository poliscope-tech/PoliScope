import requests
from bs4 import BeautifulSoup

class MyWebScraper:
    def __init__(self, url):
        self.url = url
        print(f"Initialized MyWebScraper with URL: {url}")

    def scrape(self):
        # Attempt to fetch the page content
        print(f"Fetching URL: {self.url}")
        response = requests.get(self.url)
        
        # Check the status code of the response
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve page with status code: {response.status_code}")
        print("Page retrieved successfully!")

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        print("HTML content parsed successfully!")

        # Find the element with the desired ID and print debug info
        starting_element = soup.find(id='ctl00$ContentPlaceHolder1$gridDepartments$ctl00$ctl02$ctl01$ctl00')
        if starting_element is None:
            raise Exception("Failed to find the starting element with the specified ID.")
        print(f"Starting element found: {starting_element}")

        # Navigate to its parent element (assuming the target is nested correctly)
        tbody = starting_element.parent
        print(f"Navigated to parent element: {tbody.name}")

        # Loop over all tr elements that are children of tbody
        for row in tbody.find_all('tr', recursive=False):
            columns = row.find_all('td')
            field_texts = [col.text.strip() for col in columns]
            print('Scraped row:', ' | '.join(field_texts))

# Usage:
url = "https://sfgov.legistar.com/PersonDetail.aspx?ID=196476&GUID=63B530EB-D641-42BB-BFEB-A1367DC844CE&Search="
scraper = MyWebScraper(url)
scraper.scrape()
