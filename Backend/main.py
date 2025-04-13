from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import hashlib
import os

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
            return {"breached": True, "count": int(count)}

    return {"breached": False, "count": 0}

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

    response = requests.get(url, headers=headers, params=querystring)
    return(response.json())
    


# @app.get("/hash/{userCredential}")
# def convert_sha1(userCredential: str):
#     # Hash the password with
#     encoded_text = userCredential.encode("utf-8")
#     hash_output = hashlib.sha1(encoded_text)
#     hex_digest = hash_output.hexdigest()
#     return {"hash": hex_digest}

# pwd = input("Enter your password: ")
# print(type(pwd))
# pwd = check_breach(pwd)
# print(pwd)