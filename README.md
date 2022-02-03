# Semester Project Proposal

### I am going to create an application that allows users to create a private fund/group where friends and others can invest their cryptocurrency in order to purchase and sell various NFT pieces and collections. Each user will make a return based on how much they invested in a fund. Users can create an account to be either a member or a manager. Members will have the ability to join funds with permission to invest. Managers will be able to start a fund and invite people to join and invest in their fund.

# Domain Driven Design

## Events
* account created
* account updated
* account deleted
* fund created
* fund updated
* fund deleted
* member joined fund
* manager invites member to fund
* manager removes member from fund

## Commands
* LogIn
* LogOut
* createAccount
* deleteAccount
* createFund
* deleteFund
* joinFund
* leaveFund
* inviteToFund
* removeFromFund
* modifyFund

## Entities

### Account
* account id (unique)
* username (what the member would like to be called)
* password (encrypted and used for authentication)
* sessionInfo (info of if a member is logged in)
* is manager (boolean of if the account is a manager or a member)

### Fund
* fund id (unique)
* title (the name of the fund)
* description (brief description of the fund investment strategy)
* owner id (links the fund to the manager over the fund)
* members (array of members in the fund)
* capital (array of different crypto assets in the fund)

# REST Design
## Endpoints
| Description | URL Fragment | HTTP Method | Path Parameters | Representations |
| ---------------- | ----------------------- | ----- | ---------- | -------------------- |
| create account | <code>/accounts</code> | POST | | Create Account |
| delete account | <code>/accounts/{accountId}</code> | DELETE | <code>accountId</code> | |
| log in  | <code>/accounts/{accountId}/login</code> | PUT | <code>accountId</code> | Account Log In |
| log out | <code>/accounts/{accountId}/logout</code> | PUT | <code>accountId</code> | |
| get fund | <code>/funds/{fundId}</code> | GET | <code>fundId</code> | Get Fund |
| add fund | <code>/funds</code> | POST | | Set Fund |
| edit fund | <code>/funds/{fundId}</code> | PUT | <code>fundId</code> | Set Fund |
| delete fund | <code>/funds/{fundId}</code> | DELETE | <code>fundId</code> |
| add member | <code>/funds/{fundId}/accounts/{accountId}/invite</code> | PUT | <code>fundId</code>, <code>accountId</code> | Set Fund |
| remove member | <code>/funds/{fundId}/accounts/{accountId}</code> | PUT | <code>fundId</code>, <code>accountId</code> | Set Fund |

## Representations
### Create Account
```json
{
    "username": "username",
    "password": "password-here",
    "isManager": false
}
```

### Account Log In
```json
{
    "password": "password-here"
}
```

### Get Fund
```json
{
    "fundId": 153154,
    "title": "Upcoming NFTs",
    "description": "This fund invests in minting upcoming NFTs with high growth potential",
    "ownerId": 9458763,
    "members": [],
    "captial": {
        "ETH": 152,
        "SOL": 543,
        "AVAX": 584,
        "XRP": 856
    }
}
```

### Set Fund
```json
{
    "title": "Upcoming NFTs",
    "description": "This fund invests in minting upcoming NFTs with high growth potential",
    "ownerId": 9458763,
    "members": [
        {
            "username": "username",
            "password": "password-here",
            "isManager": false
        }
    ],
    "capital": {
        "ETH": 300,
        "SOL": 500,
        "AVAX": 600,
        "XRP": 900
    }
}
```
