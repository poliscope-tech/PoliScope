This project will be divided into several parts: scraping, processing, frontend, and deployment. We will use Python for the backend and JavaScript for the frontend. We will also use PostgreSQL for the database.

Let's start with the project structure:

# Supabase
Docs: 
https://supabase.com/docs/reference/python/initializing


# Passwords
Available on [Notion](https://www.notion.so/Passwords-053d445fed0e4fa9abad3b231de19a08?pvs=4)

# Access API
Replace `SUPABASE_KEY` with the actual value. 

/GET all politicians
```
curl 'https://hxrggsnimtifedjvpupp.supabase.co/rest/v1/politicians?select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"
```

/GET all positions
```
curl 'https://hxrggsnimtifedjvpupp.supabase.co/rest/v1/positions?select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"
```

You view the [database](https://supabase.com/dashboard/project/hxrggsnimtifedjvpupp/editor/28659) to see the shape of ecah of the responses