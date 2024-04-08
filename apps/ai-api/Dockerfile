FROM python:3.9 AS development

ENV FLASK_ENV=development

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]


FROM python:3.9 AS production

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]