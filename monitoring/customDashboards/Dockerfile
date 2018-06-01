FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 0
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN pip install -r requirements.txt
CMD ["sh", "import_dashboards.sh"]
