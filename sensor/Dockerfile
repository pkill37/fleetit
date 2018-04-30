FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 0
WORKDIR /usr/src/app
ADD requirements.txt /usr/src/app
RUN pip install -r requirements.txt
ADD main.py runs.json wait-for /usr/src/app/
CMD ["python", "main.py"]
