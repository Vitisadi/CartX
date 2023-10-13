from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import json
import time

# Initialize a Selenium WebDriver (you should have ChromeDriver installed)
driver = webdriver.Chrome()

# Define the URL of the target website
url = 'https://www.target.com/s?searchTerm=icecream&tref=typeahead%7Cterm%7Cicecream%7C%7C%7Chistory?'

try:
    # Load the page
    driver.get(url)
    # Define the scroll height in pixels (adjust as needed)
    curr_height = 0
    scroll_height = 500
    item_data = []
    max_scroll_height = driver.execute_script("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );")

    # Loop through the elements and extract data
    for i in range(1, 26):  # Loop through the first 12 elements
        # Construct XPath for the product name
        xpath_name_item = f'//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/section[1]/div[1]/div[{i}]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]'
        
        # Construct XPath for the item price
        xpath_name_price = f'//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/section[1]/div[1]/div[{i}]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]/span[1]'

        if (max_scroll_height > curr_height):
            driver.execute_script(f"window.scrollBy({curr_height}, {scroll_height});")
            time.sleep(0.5)
            curr_height = curr_height + scroll_height

        try:
            # Attempt to locate the element, but with a timeout of 5 seconds
            name_element = WebDriverWait(driver, 0).until(EC.presence_of_element_located((By.XPATH, xpath_name_item)))
            price_element = WebDriverWait(driver, 0).until(EC.presence_of_element_located((By.XPATH, xpath_name_price)))

            # Extract the data
            item_name = name_element.text.strip()
            item_price = price_element.text.strip()

            # Check if both name and price are found
            if item_name and item_price:
                # Remove or replace special characters
                item_name = item_name.encode('utf-8').decode('unicode_escape')

                # Create a dictionary for each item and add it to the list
                item_data.append({
                    'item_name': name_element.text.strip(),
                    'item_price': price_element.text.strip()
                })

        except Exception as e:
            print(f"Error processing product {i}")

finally:
    # Close the WebDriver
    driver.quit()

# Save the item data as an array of objects in a JSON file
with open('target_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(item_data, json_file, indent=4, ensure_ascii=False)