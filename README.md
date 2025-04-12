# 🛡️ Credential Exposure Checker

A web-based tool that checks if user credentials (usernames, emails, or passwords) have been exposed in public data breaches. It leverages APIs like [Have I Been Pwned](https://haveibeenpwned.com/) to inform users and help them take action. This can be built using **React** for a responsive UI and a **Python-based backend** (e.g., FastAPI or Flask).

---

## 🧰 Tools & Technologies Used

### Frontend
- <img alt="React" width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> React.js  
- <img alt="JavaScript" width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" /> JavaScript  
- <img alt="CSS" width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" /> CSS  

### Backend
- <img alt="Python" width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" /> Python (with [FastAPI](https://fastapi.tiangolo.com/) or [Flask](https://flask.palletsprojects.com/))  
- Credential Breach APIs:
  - [Have I Been Pwned (HIBP)](https://haveibeenpwned.com/API/v3)
  - [DeHashed API](https://www.dehashed.com/)
  - [BreachDirectory API](https://breachdirectory.org/)

---

## 🔐 Security & Privacy Features

- K-Anonymity Model (used by HIBP to protect sensitive queries)
- HTTPS encryption
- OAuth for secure authentication
- `.env` files for managing secrets securely

---

## 💡 Additional Features (Planned / In Development)

- If credentials are found in a breach:
  - Generate strong backups or recommendations for updated credentials
  - Password strength feedback and breach time estimation

---

## ✅ What Problem Does It Solve?

This tool addresses the **growing threat of credential stuffing and identity theft** by:

- Informing users when their credentials have been leaked
- Encouraging users to take immediate security actions
- Educating about password hygiene and security best practices

