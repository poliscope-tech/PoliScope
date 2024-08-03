import requests
from bs4 import BeautifulSoup

class MyWebScraper:
    def __init__(self, url):
        self.url = url

    def scrape(self):
        response = requests.get(self.url)
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve page with status code: {response.status_code}")

        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the element with the desired ID
        starting_element = soup.find(id='ctl00$ContentPlaceHolder1$gridDepartments$ctl00$ctl02$ctl01$ctl00')

        # Navigate to its parent element
        tbody = starting_element

        # Loop over all tr elements that are children of tbody
        for row in tbody.find_all('tr', recursive=False):
            columns = row.find_all('td')
            field_texts = [col.text.strip() for col in columns]
            print(' | '.join(field_texts))

# Usage:
url = "https://sfgov.legistar.com/PersonDetail.aspx?ID=196476&GUID=63B530EB-D641-42BB-BFEB-A1367DC844CE&Search="
scraper = MyWebScraper(url)
scraper.scrape()