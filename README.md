### Qianyi Fu, Liting Zhou

### 1. Data model (at least 3 collections)

Collections: users  
Subcollections: transactions, notifications  
Example:

```
users:
    user1:
        name: "user1"
        email: "email1"
        password: "password1"
        image: "image1"
        ratesBase: "CAD"
        myRates:
            ["USD", "CNY"]
        assetsBase: "USD"
        myAssets:
            [{currency: "GBP", amount: "100"}, {currency: "EUR", amount: "200"}]
        transactions:
            transaction1:
                id: "transaction1"
                date: "2024-08-06"
                description: "Travel"
                location:"Vancouver"
                fromCurrency: "CAD"
                toCurrency: "USD"
                fromAmount: "100"
                toAmount: "90"
        notifications:
            notification1:
                fromCurrency: "CAD"
                toCurrency: "USD"
                thresholdRate: "0.8"
    user2:
```

### 2. which of the CRUD operations are implemented on which collections

Users Collection:

- Write Profile to DB
- Read Profile from DB
- Update Profile in DB
- Update customized list of currencies to DB
- Read customized list of currencies from DB
- Update assets detail and base currency to DB
- Read assets detail and base currency from DB

Transactions Subcollection:

- Write Transactions to DB
- Read Transactions from DB
- Update Transactions in DB
- Delete Transaction from DB

Notifications Subcollection:

- Write Notifications to DB
- Read Notifications from DB
- Update Notifications in DB
- Delete Notifications from DB

### 3. current state of the application

### 4. screenshots (at least 1)

### 5. contributions

#### Qianyi Fu

#### Liting Zhou
