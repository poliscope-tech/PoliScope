import os
from langchain.llms.openai import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain.schema import SystemMessage
from langchain.chains import LLMChain

import pandas as pd

class LLMProcessor:
    def __init__(self, data):
        self.data = pd.read_csv(data, nrows=5) ## Testing on 5 rows

    def initialize_agent(self, agent_def_path):
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
            model_name='gpt-3.5-turbo',
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
    
    def run_agent(self, agent, human_input):
        """Run the provided agent using the input and return the result."""
        result = agent.predict(human_input=human_input)
        return result

    def apply_run_agent(self, row):
        return self.run_agent(self.agent, row['Title'])

    def process(self):
        # Run LLM on combined fields and create summary table
        # This is a placeholder, update with actual processing logic

        ## Change to apply
        # llm_response = self.run_agent(self.agent, self.data['Title'][1])
        self.data['llm_response'] = self.data.apply(self.apply_run_agent, axis=1)
        # print(llm_response)


        return self.data

if __name__=='__main__':

    test_processor = LLMProcessor('../data/csv/Ahsha_Safai.csv')
    test_processor.initialize_agent('./agent_prompts/summarizer.txt')

    test_processor.process()

    ## 



