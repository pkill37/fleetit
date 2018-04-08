FROM python:3.6
ENV PYTHONUNBUFFERED 0
WORKDIR /usr/src/app
ADD requirements.txt /usr/src/app
RUN pip install -r requirements.txt
ADD main.py /usr/src/app/
CMD ["python", "main.py"]
