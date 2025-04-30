from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import requests
import hashlib
import os
import random
import string

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/check/{password}")
def check_breach(password: str):
    # Step 1: Hash password with SHA-1
    sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]

    # Step 2: Call the HIBP API with the hash prefix
    url = f"https://api.pwnedpasswords.com/range/{prefix}"
    response = requests.get(url)

    # Step 3: Check if the suffix is in the results
    for line in response.text.splitlines():
        hash_suffix, count = line.split(":")
        if hash_suffix.strip().upper() == suffix:
            return {"breached": True, 
                    "count": int(count), 
                    "Brute force estimated crack time":estimate_crack_time(password), 
                    "Worst Case Dict Atk": estimate_dictionaryatk_crack_time()}

    return {"breached": False, "count": 0, "Estimated crack time": 0}

# Mehotd used to find the breaches the email has been found in
@app.get("/breach_directory/{user_email}")
def check_user_account(user_email: str):
    # Clean whitespace from email
    user_email = user_email.strip()

    # Call the RapidAPI with the email
    url = "https://breachdirectory.p.rapidapi.com/"
    querystring = {"func":"auto", "term":user_email}
    headers = {
        "x-rapidapi-key": os.getenv('RAPIDAPI_KEY'),
        "x-rapidapi-host": "breachdirectory.p.rapidapi.com"
    }

    # Build the response to the API
    response = requests.get(url, headers=headers, params=querystring)
    # Only try to return the result if the call was successful
    if response.status_code == 200:
        try:
            return response.json()
        except Exception:
            return {"error": "Invalid JSON returned", "details": response.text}
    else:
        return {"error": "Request failed", "status_code": response.status_code, "details": response.text}

#Endpoint for google custom search API

@app.get("/search_company_site")
def search_company_site(company: str, query: str = "change password"):
    """
    Search for a company's specific page using Google Custom Search API.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    cse_id = os.getenv("GOOGLE_CSE_ID")

    if not api_key or not cse_id:
        raise HTTPException(status_code=500, detail="Google API credentials are not configured.")

    search_query = f"{company} {query}"
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cse_id,
        "q": search_query,
        "num": 1
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch search results.")

    data = response.json()
    items = data.get("items")

    if not items:
        return {"message": "No results found."}

    return {
        "title": items[0].get("title"),
        "link": items[0].get("link"),
        "snippet": items[0].get("snippet")
    }
    
    
def estimate_crack_time(user_password):
    # Total Combinations = (charset size) ^ (password length)
    # Estimated Time = Total Combinations / guesses per second
    # We have to find charset size
    charset_size = 0
    has_lower_chars = any(char.islower() for char in user_password)
    has_upper_chars = any(char.isupper() for char in user_password)
    has_digits = any(char.isdigit() for char in user_password)
    has_symbol = any(not(char.isalnum()) for char in user_password)

    if has_lower_chars:
        charset_size += 26
    elif has_upper_chars :
        charset_size += 26
    elif has_digits:
        charset_size += 10
    elif has_symbol:
        charset_size += 33
    
    if charset_size == 0:
        charset_size = 26 
    
    # Need to calculate the number of possible combinations
    total_combinations = charset_size ** len(user_password)

    # Calculate the estimated time in seconds
    estimated_time = total_combinations / 1e9
    
    # No we need to convert the seconds
    return convert_seconds(estimated_time)

# Convert the seconds to the respective understandable amount
def convert_seconds(estimated_time: float):
    if estimated_time < 60: 
        return f"{estimated_time} seconds"
    elif estimated_time < 3600:
        return f"{estimated_time/60:.4} minutes"
    elif estimated_time < 86400:
        return f"{estimated_time/3600:.4f} hours"
    elif estimated_time < 31536000:
        return f"{estimated_time/864000:.2f} days"
    else:
        return f"{estimated_time/31536000:.4f} years"

# Made this method to show the worse case time for finding a password in a dictionary attack,
# don't know if its working talking about as it has nothing related to password
def estimate_dictionaryatk_crack_time(dictionary_size: int = 1_500_000_000, 
                                    guesses_per_sec: int = 1e9):
    estimated_time = dictionary_size / guesses_per_sec
    return convert_seconds(estimated_time)

class PasswordOptions(BaseModel):
    upperCase: bool
    lowerCase: bool
    digits: bool
    symbols: bool
    length: str

# Function to generate the password using parameters requested by user
@app.post('/generate_password')
async def generate_password(options: PasswordOptions):
    chars = ""
    passLength = 4 

    if options.upperCase:
        chars += string.ascii_uppercase
    if options.lowerCase:
        chars += string.ascii_lowercase
    if options.digits:
        chars += string.digits
    if options.symbols:
        chars += string.punctuation
    if options.length:
        passLength = options.length

    if not chars:
        return {"password" : "no options were selected"}
    
    password = ''.join(random.choice(chars) for _ in range(int(passLength)))
    result = check_breach(password)
    if (result['breached'] == False):
        return {"password" : password}
    else:
        generate_password(options)