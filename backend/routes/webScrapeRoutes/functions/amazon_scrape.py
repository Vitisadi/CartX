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
url = 'https://www.amazon.com/s?k=cream&crid=2M3KHPMAMLXS5&sprefix=cream%2Caps%2C68&ref=nb_sb_noss_1'

try:
    # Load the page
    driver.get(url)
    # Define the scroll height in pixels (adjust as needed)
    curr_height = 0
    scroll_height = 600
    item_data = []
    max_scroll_height = driver.execute_script("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );")

    # Loop through the elements and extract data
    for i in range(3, 10):
        xpath_item_name = f'//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[{i}]/div/div/div/div/div/div/div[2]/div[1]/h2/a/span'
        xpath_item_dollar = f'//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[{i}]/div/div/div/div/div/div/div[2]/div[3]/div[1]/a/span[1]/span[2]/span[2]'
        xpath_item_cents = f'//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[{i}]/div/div/div/div/div/div/div[2]/div[3]/div[1]/a/span[1]/span[2]/span[3]'

        if (max_scroll_height > curr_height):
            driver.execute_script(f"window.scrollBy({curr_height}, {scroll_height});")
            time.sleep(2)
            curr_height = curr_height + scroll_height

        try:
            # Attempt to locate the element, but with a timeout of 5 seconds
            name_element = WebDriverWait(driver, 0).until(EC.presence_of_element_located((By.XPATH, xpath_item_name)))
            dollar_element = WebDriverWait(driver, 0).until(EC.presence_of_element_located((By.XPATH, xpath_item_dollar)))
            cents_element = WebDriverWait(driver, 0).until(EC.presence_of_element_located((By.XPATH, xpath_item_cents)))

            # Extract the data
            item_name = name_element.text.strip()
            item_dollar = dollar_element.text.strip()
            item_cents = cents_element.text.strip()
            

            # Check if both name and price are found
            if item_name and item_dollar and item_cents:
                # Remove or replace special characters
                item_name = item_name.encode('utf-8').decode('unicode_escape')

                # Create a dictionary for each item and add it to the list
                item_data.append({
                    'item_name': name_element.text.strip(),
                    'item_price': dollar_element.text.strip() + "." + cents_element.text.strip()
                })

        except Exception as e:
            print(f"Error processing product {i}")

finally:
    # Close the WebDriver
    driver.quit()

# Save the item data as an array of objects in a JSON file
with open('amazon_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(item_data, json_file, indent=4, ensure_ascii=False)