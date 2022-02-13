# Queries ejecutadas
## Obtener todos los cursos
## Obtener un curso
## Alias y Fragments

Un alias nos permite dar un nombre diferente a las consultas que se realicen y de esta manera poder hacer más consultas en un solo llamado a la API. Los fragmentos permiten evitar la duplicación de código de consulta al generar objetos que se pueden llamar desde las consultas que utilicen mismos campos.

```graphql
{
  AllCourses: getCourses {
    _id
    ...comparisonFields
  }
  Course1: getCourse(id: "6208f34a67ed0dd8e9e74846") {
    _id
    ...comparisonFields
  }
  Course2: getCourse(id: "6208f75b26f03fcbd4d2a2e0") {
    ...comparisonFields
    topic
  }
}

fragment comparisonFields on Course {
  title
  description
  people {
    first_name
  }
}

```

## Resultado

```json
{
  "data": {
    "AllCourses": [
      {
        "_id": "6207bbf3212891d43d48b436",
        "title": "Sistemas I",
        "description": "C++",
        "people": [
          {
            "first_name": "Thibaud"
          },
          {
            "first_name": "Sterne"
          },
          {
            "first_name": "Gabriella"
          },
          {
            "first_name": "Delmer"
          }
        ]
      },
      {
        "_id": "6208f34a67ed0dd8e9e74846",
        "title": null,
        "description": "Java",
        "people": []
      },
      {
        "_id": "6208f75b26f03fcbd4d2a2e0",
        "title": "Sistemas III",
        "description": ".net",
        "people": []
      }
    ],
    "Course1": {
      "_id": "6208f34a67ed0dd8e9e74846",
      "title": null,
      "description": "Java",
      "people": []
    },
    "Course2": {
      "title": "Sistemas III",
      "description": ".net",
      "people": [],
      "topic": "Linea de desarrollo"
    }
  }
}
```

# Variables
## Generación de la consulta
### Query
```graphql
query GetStudentsFromCourse($course: ID!) {
  getCourse(id:$course) {
    title
    people {
      first_name
      last_name
    }
  }
}
```
### Query Variables
``` json
{
  "course": "6207bbf3212891d43d48b436"
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