from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time
import random


def start():
  browser = Firefox()
  browser.get("http://localhost:8080/login")

  element_present = EC.presence_of_element_located((By.ID, "input-30"))
  WebDriverWait(browser, 3).until(element_present)
  browser.find_element_by_id("input-30").send_keys("ruslanab@buffalo.edu")
  browser.find_element_by_id("input-33").send_keys("1234")
  browser.find_element_by_class_name("v-btn__content").click()
  assert (browser.find_element_by_class_name(
    "success").is_displayed()), "Login success alert failed to display."

  browser.get("http://localhost:8080/login")
  element_present = EC.presence_of_element_located((By.ID, "input-30"))
  WebDriverWait(browser, 3).until(element_present)
  browser.find_element_by_id("input-30").send_keys("ruslanab@buffalo.edu")
  browser.find_element_by_id("input-33").send_keys("12345")
  browser.find_element_by_class_name("v-btn__content").click()
  assert (browser.find_element_by_class_name(
    "error").is_displayed()), "Login failure alert failed to display."
  browser.close()
  return True


if __name__ == "__main__":
  assert (start())
