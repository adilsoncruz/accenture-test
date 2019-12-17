# ACCENTURE TEST

NodeJS service with ExpressJs

## Technologies

- NodeJs, Mongo

## Dependecies

- Docker
- docker-compose

Make sure that you've these 2 tools installed beforehand.

## Testing

```bash
docker-compose up -d
```

Once built, test:

```bash
docker-compose run app yarn test
```

To check the lint:

```bash
docker-compose run app yarn lint
```
