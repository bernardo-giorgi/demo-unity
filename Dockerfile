FROM cypress/included:10.11.0

WORKDIR /tests

COPY . .

RUN npm install

RUN chmod +x /tests/scripts/main-entrypoint

ENTRYPOINT ["/tests/scripts/main-entrypoint"]