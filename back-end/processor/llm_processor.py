import os
from langchain.llms.openai import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain.schema import SystemMessage
from langchain.chains import LLMChain

import pandas as pd
import numpy as np

class LLMProcessor:
    def __init__(self, data):
        self.data = pd.read_csv(data, nrows=5) ## Testing on 5 rows

    def initialize_agent(self, agent_def_path, model_name="gpt-3.5-turbo"):
        """Initialize the agent and return it."""
        ## Load prompts
        with open(agent_def_path) as f:
            system_prompt = f.read()
        
        # Setup the chat prompt with memory
        prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content=system_prompt),  # The persistent system prompt
            MessagesPlaceholder(variable_name="chat_history"),  # Where the memory will be stored
            HumanMessagePromptTemplate.from_template("{human_input}"),  # Human input
        ])

        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        llm = ChatOpenAI(
            model_name=model_name,
            temperature=0,
            request_timeout=120,
        )

        chat_llm_chain = LLMChain(
            llm=llm,
            prompt=prompt,
            verbose=True,
            memory=memory,
        )

        self.agent = chat_llm_chain
        return self.agent
    
    def run_agent(self, agent, human_input):
        """Run the provided agent using the input and return the result."""
        result = agent.predict(human_input=human_input)
        return result

    def apply_summarizer_agent(self, row):
        return self.run_agent(self.summarizer_agent, row['Title'])
    
    def apply_scorer_agent(self, row):
        return self.run_agent(self.scorer_agent, row['scorer_field'])
    
    def apply_positions_agent(self, row):
        return self.run_agent(self.positions_agent, row["position"])
    
    def process_positions(self):
        data_path_name = './data/csv/positions.csv'
        data = pd.read_csv(data_path_name)
        # Run LLM on combined fields and create summary table
        # This is a placeholder, update with actual processing logic
        ## Change to apply
        # llm_response = self.run_agent(self.agent, self.data['Title'][1])
        data['position'] = data.apply(self.apply_positions_agent, axis=1)
        return self.data

    def process(self):
        # Run LLM on combined fields and create summary table
        # This is a placeholder, update with actual processing logic
        ## Change to apply
        # llm_response = self.run_agent(self.agent, self.data['Title'][1])
        self.data['category'] = self.data.apply(self.apply_summarizer_agent, axis=1)
        # print(llm_response)

        self.data['scorer_field'] = '"' + self.data['category'] + '"' +  ', ' + '"' + self.data['Vote'] + '"' + ', ' +  '"' + self.data['Title'] +  '"'

        ## Apply on all not in 'other' category field
        self.data['score'] = self.data.apply(self.apply_scorer_agent, axis=1)

        ## Placeholder scorings
        self.data['affordable_housing_development_score'] = self.data.apply(lambda x: np.random.randint(1, 10)/10.0, axis=1)
        self.data['tenant_protections_score'] = self.data.apply(lambda x: np.random.randint(1, 10)/10.0, axis=1)
        self.data['homelessness_and_supportive_housing_score'] = self.data.apply(lambda x: np.random.randint(1, 10)/10.0, axis=1)
        self.data['faster_permitting_process_and_bureaucracy_score'] = self.data.apply(lambda x: np.random.randint(1, 10)/10.0, axis=1)
        self.data['land_use_and_zoning_reform'] = self.data.apply(lambda x: np.random.randint(1, 10)/10.0, axis=1)

        return self.data

if __name__=='__main__':

    test_processor = LLMProcessor('../data/ingest.csv')
    test_processor.initialize_agent('./agent_prompts/summarizer.txt')

    test_processor.process()

    ## 



