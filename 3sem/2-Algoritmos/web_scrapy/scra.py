from bs4 import BeautifulSoup
import requests

url = "https://www.python.org/"

req = requests.get(url)

html = BeautifulSoup(req.content, "html.parser")

news_wrapper = html.find("div", {"class": "medium-widget blog-widget"})
news = news_wrapper.div.ul.findAll("li")
data = []
for each in news:
    time = each.time.span.descendants
    text = each.a.string
    data.append({time, text})

print(data)
