from scraper.legistar_scraper import LegistarScraper
from scraper.resolutions_scraper import ResolutionsScraper
from scraper.data_api_scraper import DataAPIScraper
from processor.llm_processor import LLMProcessor
from processor.reliability_rating import ReliabilityRating
from processor.vertical_labeler import VerticalLabeler
from processor.outcome_extractor import OutcomeExtractor
from db.db_manager import DBManager

def main():
    # Initialize scrapers
    legistar_scraper = LegistarScraper("https://sfgov.legistar.com/PersonDetail.aspx?ID=36652&GUID=14EFBAA7-E930-4706-BF21-399C01B1F1F6&Search=")
    resolutions_scraper = ResolutionsScraper("https://sfbos.org/resolutions-2023")
    data_api_scraper = DataAPIScraper("https://dev.socrata.com/")

    # Scrape data
    legistar_data = legistar_scraper.scrape()
    resolutions_data = resolutions_scraper.scrape()
    data_api_data = data_api_scraper.scrape()

    # Initialize processors
    llm_processor = LLMProcessor(legistar_data)
    reliability_rating = ReliabilityRating(resolutions_data)
    vertical_labeler = VerticalLabeler(data_api_data)
    outcome_extractor = OutcomeExtractor(legistar_data)

    # Process data
    summary = llm_processor.process()
    reliability = reliability_rating.calculate()
    vertical_label = vertical_labeler.label()
    outcomes = outcome_extractor.extract()

    # Initialize DB manager
    db_manager = DBManager("accsf_user", "accsf_user", "acceleranto2!", "localhost")

    # Insert data into DB
    db_manager.insert_data(summary)
    db_manager.insert_data(reliability)
    db_manager.insert_data(vertical_label)
    db_manager.insert_data(outcomes)

if __name__ == "__main__":
    main()
