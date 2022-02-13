# Mutations
## Variables
### Query
```graphql
mutation addPersonToSystems1($course: ID!, $person: ID!) {
  addPeople(courseID:$course, personID: $person) {
    _id
    title
  }
}
```
### Query Variables
``` json
{
  "course": "6207bbf3212891d43d48b436",
  "person": "61fd0caeb40c915dde709579"
}
```

## Resultado

```json
{
  "data": {
    "getCourse": {
      "title": "Sistemas I",
      "people": [
        {
          "first_name": "Thibaud",
          "last_name": "Lembke"
        },
        {
          "first_name": "Sterne",
          "last_name": "Ofen"
        },
        {
          "first_name": "Gabriella",
          "last_name": "Salan"
        },
        {
          "first_name": "Delmer",
          "last_name": "Folkerd"
        },
        {
          "first_name": "Drusy",
          "last_name": "Roskelly"
        }
      ]
    }
  }
}
```