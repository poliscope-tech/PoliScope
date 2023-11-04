This project will be divided into several parts: scraping, processing, frontend, and deployment. We will use Python for the backend and JavaScript for the frontend. We will also use PostgreSQL for the database.

Let's start with the project structure:

# Supabase
Docs: 
https://supabase.com/docs/reference/python/initializing

```
import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
```

# Passwords
Available on [Notion](https://www.notion.so/Passwords-053d445fed0e4fa9abad3b231de19a08?pvs=4)