FROM python:3

WORKDIR /usr/src/app

RUN apt-get -y update && apt-get -y install build-essential python-dev

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src ./

CMD [ "uwsgi", "--http-socket", ":5000", "--master", "--module", "app:app", "--processes", "2", "--threads", "4"]