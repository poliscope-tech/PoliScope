import pandas as pd
from sqlalchemy import create_engine
import glob

class XLSProcessor:
    def __init__(self, db_manager):
        self.db_manager = db_manager  # Assume db_manager is an instance of DBManager

    def read_and_load(self, directory_path, table_name):
        # Using glob to get all .xls files in the specified directory
        file_paths = glob.glob(f"{directory_path}/*.xls")
        for file_path in file_paths:
            print('running on ', file_path)
            # Reading xls file
            # data_frame = pd.read_excel(file_path, engine='xlrd')
            data_frame = pd.read_html(file_path)[0]
            fp_csv = '..' + file_path.split('.')[2] + '.csv' ## NOTE! Only works on subfolder, skipping ../
            data_frame.to_csv(fp_csv, index=False)

            # You might want to process or clean your data here
            
            # Loading data to psql
            self.db_manager.insert_data(data_frame, table_name)

class DBManager:
    def __init__(self, dbname, user, password, host):
        self.engine = create_engine(f'postgresql://{user}:{password}@{host}/{dbname}')

    def insert_data(self, data_frame, table_name='your_table_name'):
        data_frame.to_sql(table_name, self.engine, if_exists='append', index=False)  # Assume no index for simplicity

# Usage:
db_manager = DBManager(dbname='accsf_user', user='accsf_user', password='acceleranto2!', host='localhost')
xls_processor = XLSProcessor(db_manager)
xls_processor.read_and_load('../data', 'legistar_scraper')  # Provide your directory path

