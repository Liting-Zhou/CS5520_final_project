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

# Project Proposal

### Qianyi Fu, Liting Zhou

#### App Name:

Currency Companion

#### App Description:

**Currency Companion: Your Ultimate Currency Conversion and Asset Management Tool**

Discover the power of seamless currency conversion and efficient asset management with Currency Companion, the ultimate app designed to cater to both casual users and financial enthusiasts. Whether you're a frequent traveler, a savvy investor, or just curious about global exchange rates, Currency Companion has everything you need in one sleek and user-friendly package.

FEATURES

Effortless Currency Conversion:  
Instantly convert between multiple currencies with real-time exchange rates. Simply input your amount and let Currency Companion do the rest.

Live Exchange Rates:  
Stay updated with the latest currency exchange rates. View a comprehensive list of current rates to make informed decisions on the go.

Asset Management:  
Keep track of your financial assets with ease. Monitor your investments, and get an overview of your financial asset.

Nearby Exchange Finder:  
Find the nearest currency exchange organizations with our integrated location services. Get directions and contact information for your convenience.

Anonymous and Secure:  
Use the app anonymously or create an account for personalized features.

Integrated Camera Services: Capture receipts, documents, or any important information using the camera.

Currency Companion is your reliable partner for all things currency-related. Download now and take control of your financial world, whether at home or abroad!

**Experience the future of currency management with Currency Companion. Download today and make every conversion count!**

#### App Slogan:

Currency Companion: Your Reliable Financial Ally!

#### Target Users:

Currency Companion is designed for all adults who need to convert currencies and find nearby exchange organizations. It's especially ideal for those interested in forex trading and those who regularly engage in personal asset management.


#### What problem/task(s)/need does the application help the users address?

- Users often need to convert currencies quickly, whether for travel, trading, or personal finance, and relying on outdated rates can lead to financial loss.
- Keeping up with constantly fluctuating currency exchange rates can be challenging.
- Managing multiple financial assets, especially in different currencies, can be complex and time-consuming.
- When traveling or in unfamiliar areas, finding reliable currency exchange services can be difficult.
- Keeping track of receipts, documents, and other important financial information can be challenging, especially when dealing with multiple currencies.

#### What three current apps on the app store would be your closest competitors?
- Currency
- GlobeConvert Currency & Units
- My Currency Converter & Rates

#### Why will your app be better than or different from the competitors?
- Unlike most currency conversion apps, Currency Companion offers features to track investments and get an overview of financial assets in multiple currencies.
- Includes integrated location services to find nearby currency exchange organizations, a feature not commonly found in other apps.
- Integrated camera services to capture and store important financial documents, such as receipts and invoices.

#### Go through some of the reviews of these competitors apps on app stores. What common themes do you see when you browse the reviews?
- Many users appreciate a clean, simple, and user-friendly interface. Apps like Currency and GlobeConvert Currency & Units are praised for being easy to navigate and providing quick access to conversion tools and exchange rates.
- Users value accurate and up-to-date exchange rates. Positive reviews frequently mention the reliability of these apps in providing current market rates.
- Complaints often arise when the interface is cluttered or unintuitive, making it difficult for users to find the features they need. Also Any discrepancies or delays in updating rates can lead to negative feedback, as users rely on these apps for precise conversions​. Compatibility issues with certain devices and operating systems are also mentioned.

#### What is innovative about your app idea? What will be particularly surprising or elegant about the concept?
Combining currency conversion with financial asset management is a unique feature that sets Currency Companion apart. Users can monitor their investments and track multiple currencies seamlessly. Also users can monitor their investments and track multiple currencies seamlessly. And Also the app includes a feature to locate nearby currency exchange services using integrated location services, which is not commonly found in other currency conversion apps.

#### What about your app will keep people engaged using it for a long time, even once the novelty wears off?
Users will continue to use the app to monitor and manage their financial assets. The ability to track investments and view a comprehensive financial overview in multiple currencies ensures that the app remains relevant to their financial activities. And regular updates on currency exchange rates keep users coming back to ensure they have the most accurate and timely information. This is especially important for frequent travelers, traders, and individuals with international financial interests.

#### What are the top potential weaknesses of your application idea and how will you address them?
- The accuracy of exchange rates and financial data depends on the reliability of external APIs. Any inaccuracies or delays from these sources can negatively impact the app’s performance and user trust. We will monitor API performance regularly and switch providers if necessary.
- Ensuring the app works smoothly across various devices and operating systems can be challenging, potentially leading to crashes or inconsistent performance. We will conduct extensive testing on a wide range of devices and operating systems to identify and fix compatibility issues. Use responsive design principles and adaptive layouts to ensure the app performs well on different screen sizes and resolutions. 

#### What is a third-party API you will use in the app? If you haven't finalized it what are some choices that you are considering?
https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates

#### UI sketches:

Anonymous users can use the app to browse real-time exchange rates, perform currencies conversions, find nearby currency exchange locations and calculate assets. Users need to login if they want to save any customized contents.

There will be a tab navigator at the bottom to navigate these functions.

<div style="display: flex; justify-content: space-between;">
  <img src="./UI_sketches/ER_noLogin.jpg" alt="ER no Login" style="width: 32%;"/>
  <img src="./UI_sketches/CC_noLogin.jpg" alt="CC no Login" style="width: 35%;"/>
  <img src="./UI_sketches/AM_noLogin.jpg" alt="AM no Login" style="width: 32%;"/>
</div>

<div style="page-break-after: always;"></div>

In login mode, customized data would be retrieved from, updated to or saved to database.

<div style="display: flex; justify-content: space-between;">
  <img src="./UI_sketches/ER_login.jpg" alt="ER login" style="width: 47%;"/>
  <img src="./UI_sketches/AM_login.jpg" alt="AM login" style="width: 52%;"/>
</div>

<div style="page-break-after: always;"></div>

Click the upper right button to go to the profile. There is also a tab navigator at the bottom, where users can update profile information, keep record of currency exchange (where you can use camera to capture receipts etc.), and set notification list. Users may want to know if some exchange rates exceed a threshold.

<div style="display: flex; justify-content: space-between;">
  <img src="./UI_sketches/profile.jpg" alt="Profile" style="width: 54%;"/>
  <img src="./UI_sketches/profile_notification.jpg" alt="Profile Notification" style="width: 45%;"/>
</div>

<div style="page-break-after: always;"></div>
Click an item or press "Add" button to navigate to "Detail/Add" screen.

<div style="display: flex; justify-content: space-between;">
  <img src="./UI_sketches/profile_exHistory.jpg" alt="Profile Exchange History" style="width: 50%;"/>
  <img src="./UI_sketches/profile_exHistory_detail.jpg" alt="Profile Exchange History Detail" style="width: 49%;"/>
</div>


</div>
