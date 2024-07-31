<style>
@page {
  size: A4;
  margin: 1.54cm;
}

body {
  font-family: Gill Sans, sans-serif;
  font-size: 16px;
}

pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
}

code{
  background-color: #f4f4f4;
  color: #333;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

h4 {
  color:  #FF8C00; 
}
</style>

<div class="page">

# Project Design

### Qianyi Fu, Liting Zhou

#### App introduction:

The name of our application is **Currency Manager**, which is designed to do effortless currency conversion, stay updated with the latest currency exchange rates, keep track of your currencies, find the nearby currency exchange organizations, save currency exchange history and set notifications on exchange rate changes.

#### Target users:

Currency Manager is designed for all adults who need to convert currencies and find nearby exchange organizations. It's especially ideal for those interested in forex trading and those who regularly engage in currency management.

#### Test scenarios:

- **Using Live Exchange Rates and Currency Conversion:** In this scenario, the user will explore the features live exchange rates and currency conversions. The user will set up a list of preferred currencies, changing the base currency, and adding or removing currencies from the list. Also, the user will use the currency converter to switch between different currencies.
- **Managing Financial Assets and Finding Nearby Exchange Services:** In this scenario, the user will dive into the app's asset management and location services. The user will enter details about their assets, such as investments in various currencies, and then calculates the total value of their assets in a specific currency. Also, the user will use the app's nearby exchange finder to locate currency exchange organizations in their area.

#### Questions to ask after the testing:

1. Were the list of exchange rates easy to customize, e.g., change base currency, search the currency, add, and delete?
2. Was it easy to find and use the currency conversion feature?
3. Was the _Nearby Exchange Finder_ easy to locate and activate?
4. Was it easy to perform the calculation of your total assets in different currencies?
5. Did you find the integrated camera services for capturing receipts of transactions useful?
6. Were the notification settings easy to customize to your preferences?
7. Upon logging in, was it easy to save and manage your customized data?
8. How does Currency Manager compare to other currency conversion apps you have used?
9. Were there any features you found particularly useful?
10. Are there any features you feel are missing or unnecessary for your needs?
11. What could be added or improved to keep you engaged with the app over time?

#### The sketches used for testing:

Based on the feedback from project proposal, we refine the UI sketches. Please see below:

<img src="./UI_sketches/sketches_v2_1.jpg" alt="" />
<img src="./UI_sketches/sketches_v2_2.jpg" alt="" />
<img src="./UI_sketches/sketches_v2_3.jpg" alt="" />

#### User 1:

- Comments and Feedbacks:

1. Were the list of exchange rates easy to customize, e.g., change base currency, search the currency, add, and delete?  
   _It was very convenient; I could quickly find the features I needed._

2. Was it easy to find and use the currency conversion feature?  
   _It was relatively easy to find; the convert section is right in the middle at the bottom of the interface._

3. Was the _Nearby Exchange Finder_ easy to locate and activate?  
   _It was relatively easy to find, on the convert section's page._

4. Was it easy to perform the calculation of your total assets in different currencies?  
   _Very convenient, it can be found in the asset section._

5. Did you find the integrated camera services for capturing receipts of transactions useful?  
   _Quite useful, it can be used to add notes to each transaction._

6. Were the notification settings easy to customize to your preferences?  
   _It was relatively simple to modify, and I could set the alert values._

7. Upon logging in, was it easy to save and manage your customized data?  
   _Very convenient, after logging in I can check the data I saved at any time._

8. How does Currency Manager compare to other currency conversion apps you have used?  
   _The main functions are very simple and convenient, and the feature to find nearby exchanges is very useful._

9. Were there any features you found particularly useful?  
   _The features are quite practical, used frequently in everyday life scenarios._

10. Are there any features you feel are missing or unnecessary for your needs?  
    _The current features are all quite practical._

11. What could be added or improved to keep you engaged with the app over time?  
    _I hope to be able to name each transaction when recording it, which would make it easier to remember. The notification interface is a bit unclear; the current layout and display mode make the usage of this feature somewhat unclear. The Nearby Exchange Finder feature could not only be placed in the convert section but could also be made into a floating button style, allowing users to use this feature in various scenarios._

- Photo of of paper prototyping:

  <img src="./user_testing_photos/user1.jpg" alt="" />

#### User 2:

- Comments and Feedbacks:

1. Were the list of exchange rates easy to customize, e.g., change base currency, search the currency, add, and delete?  
   _Yes_

2. Was it easy to find and use the currency conversion feature?  
   _Yes, very easy_

3. Was the _Nearby Exchange Finder_ easy to locate and activate?  
   _Not very fast to find. Maybe add it to a fourth screen._

4. Was it easy to perform the calculation of your total assets in different currencies?  
   _Yes. Easy and intuitive_

5. Did you find the integrated camera services for capturing receipts of transactions useful?  
   _Yes_

6. Were the notification settings easy to customize to your preferences?  
   _Not very intuitive. But I can figure it out quickly._

7. Upon logging in, was it easy to save and manage your customized data?  
   _Yes, very easy_

8. How does Currency Manager compare to other currency conversion apps you have used?  
   _I've never used currency conversion apps._

9. Were there any features you found particularly useful?  
   _Yes, the assets management page is very cool_

10. Are there any features you feel are missing or unnecessary for your needs?  
    _All the features are necessary._

11. What could be added or improved to keep you engaged with the app over time?  
    _On the Assets screen, it's better to place the Add button next to "Your currencies...". Better change the button title to "Exchange Transaction History" in Profile page to make it clearer. The Notification page could be clearer by adding a title "Notify me when..." to the page._

- Photo of of paper prototyping:

#### User 3:

- Comments and Feedbacks:

1. Were the list of exchange rates easy to customize, e.g., change base currency, search the currency, add, and delete?  
   _Yes_

2. Was it easy to find and use the currency conversion feature?  
   _Yes_

3. Was the _Nearby Exchange Finder_ easy to locate and activate?  
   _You don't see it unless you pay attention; maybe put it in the header._

4. Was it easy to perform the calculation of your total assets in different currencies?  
   _Yes_

5. Did you find the integrated camera services for capturing receipts of transactions useful?  
   _Not quite useful. I hope it can automatically fill in all the information after I take pictures._

6. Were the notification settings easy to customize to your preferences?  
   _The rule is clear but not very friendly. Maybe change to verbal expressions and ask questions to help users define the rules, instead of just laying out empty input fields._

7. Upon logging in, was it easy to save and manage your customized data?  
   _Yes_

8. How does Currency Manager compare to other currency conversion apps you have used?  
   _I have only used the conversion feature from Alipay before. This app has many more features, some of which are useful, such as the notifications._

9. Were there any features you found particularly useful?  
   _Yes, the notifications are useful. I can get notified if some exchange rates are above my thresholds._

10. Are there any features you feel are missing or unnecessary for your needs?  
    _The features of transaction history and notifications are hidden until you click profile, maybe put them to the bottom navigator after loggin._

11. What could be added or improved to keep you engaged with the app over time?  
    _The feature of asset management and transaction record can be integrated with accounting feature, which is a feature we might use everyday._

- Photo of of paper prototyping:

  <img src="./user_testing_photos/user3.jpg" alt="" style="width:60%"/>

#### The updated sketches on the feedbacks:

#### Lessons learned and key takeaways:

</div>
