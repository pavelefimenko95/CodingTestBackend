# Installation

```bash
$ npm install
```

# Running the app

```bash
$ npm run compose
```

# Test

```bash
# unit
$ npm run compose:test

# e2e
$ npm run compose:test:e2e
```


# Api documentation

**Base url**: http:/localhost:3000

## Get manufacturers

***URL*** : `/manufacturers`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
[
    {
        "id": 2,
        "name": "pl",
        "phone": "+3023423",
        "siret": 234234234,
        "createdAt": "2020-01-21T16:55:41.000Z",
        "updatedAt": "2020-01-21T16:55:41.000Z"
    },
    {
        "id": 3,
        "name": "pl",
        "phone": "+3023423",
        "siret": 234234234,
        "createdAt": "2020-01-21T16:56:14.000Z",
        "updatedAt": "2020-01-21T16:56:14.000Z"
    }
]
```

## Create manufacturer

***URL*** : `/manufacturers`

***Method*** : `POST`

#### Success Response

***Code*** : `200 OK`

**Request body example**

```json
{
	"name": "pl",
	"phone": "+3023423",
	"siret": 234234234
}
```

**Response example**

```json
{
    "id": 3,
    "name": "pl",
    "phone": "+3023423",
    "siret": 234234234,
    "updatedAt": "2020-01-21T16:56:14.769Z",
    "createdAt": "2020-01-21T16:56:14.769Z"
}
```

## Delete manufacturer

***URL*** : `/manufacturers/:id`

***Method*** : `DELETE`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
1
```

## Get cars

***URL*** : `/cars`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
[
    {
        "id": 1,
        "price": 123,
        "firstRegistrationDate": "2018-08-15T00:00:00.000Z",
        "manufacturerId": 1,
        "createdAt": "2020-01-21T16:47:17.000Z",
        "updatedAt": "2020-01-21T16:47:17.000Z"
    }
]
```

## Get car

***URL*** : `/cars/:id`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
{
    "id": 3,
    "price": 123,
    "firstRegistrationDate": "2018-08-15T00:00:00.000Z",
    "manufacturerId": 2,
    "createdAt": "2020-01-21T17:06:22.000Z",
    "updatedAt": "2020-01-21T17:06:22.000Z"
}
```

## Get car manufacturer

***URL*** : `/cars/:id/manufacturer`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
{
    "id": 2,
    "name": "pl",
    "phone": "+3023423",
    "siret": 234234234,
    "createdAt": "2020-01-21T16:55:41.000Z",
    "updatedAt": "2020-01-21T16:55:41.000Z"
}
```

## Create car

***URL*** : `/cars`

***Method*** : `POST`

#### Success Response

***Code*** : `200 OK`

**Request body example**

```json
{
	"price": 123,
	"firstRegistrationDate": "2018-08-15",
	"manufacturerId": 2
}
```

**Response example**

```json
{
    "id": 3,
    "price": 123,
    "firstRegistrationDate": "2018-08-15T00:00:00.000Z",
    "manufacturerId": 2,
    "updatedAt": "2020-01-21T17:06:22.739Z",
    "createdAt": "2020-01-21T17:06:22.739Z"
}
```

## Update car

***URL*** : `/cars`

***Method*** : `PUT`

#### Success Response

***Code*** : `200 OK`

**Request body example**

```json
{
	"id": 1,
	"price": 123123,
	"firstRegistrationDate": "2017-06-15",
	"manufacturerId": 1
}
```

**Response example**

```json
[1]
```

## Delete car

***URL*** : `/cars/:id`

***Method*** : `DELETE`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
1
```

## Get owners

***URL*** : `/owners`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
[
    {
        "id": 1,
        "name": "pavel",
        "purchaseDate": "2019-10-15T00:00:00.000Z",
        "carId": 1,
        "createdAt": "2020-01-21T16:47:31.000Z",
        "updatedAt": "2020-01-21T16:47:31.000Z"
    }
]
```

## Create manufacturer

***URL*** : `/owners`

***Method*** : `POST`

#### Success Response

***Code*** : `200 OK`

**Request body example**

```json
{
	"name": "pavel",
	"purchaseDate" : "2019-10-15",
	"carId": 1
}
```

**Response example**

```json
{
    "id": 1,
    "name": "pavel",
    "purchaseDate": "2019-10-15T00:00:00.000Z",
    "carId": 1,
    "updatedAt": "2020-01-21T16:47:31.995Z",
    "createdAt": "2020-01-21T16:47:31.995Z"
}
```

## Delete manufacturer

***URL*** : `/owners/:id`

***Method*** : `DELETE`

#### Success Response

***Code*** : `200 OK`

**Response example**

```json
1
```

## Handle outdated content

***URL*** : `/actions/handle-deprecations`

***Method*** : `GET`

#### Success Response

***Code*** : `200 OK`