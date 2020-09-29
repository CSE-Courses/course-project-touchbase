from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time

def start():
    browser = Firefox()
    time.sleep(5)
    browser.get("http://localhost:8080")
    time.sleep(1)
    if "Color Settings" in browser.page_source:
        print("Menu is already open")
        browser.close()
        return False
    browser.find_element_by_id("Logo").click()
    element_present=EC.presence_of_element_located((By.ID, "CloseSettings"))
    time.sleep(1)
    WebDriverWait(browser, 3).until(element_present)
    print("Settings menu loaded")
    browser.find_element_by_id("CloseSettings").click()
    time.sleep(2)
    if browser.find_element_by_css_selector(".mdi-close").is_displayed():
        print("Menu failed to close")
        browser.close()
        return False
    browser.close()
    return True


if __name__ == "__main__":
    assert(start()), "Settings menu load/unload failed"