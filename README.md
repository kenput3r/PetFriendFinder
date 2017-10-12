# Pet Friend Finder

A place to find pet friends for your pets.

## Getting Started

* Sign up at [https://pet-friend-finder.herokuapp.com/](https://pet-friend-finder.herokuapp.com/)
* Add a photo of yourself to your profile
* Add your pets
* Look for pets and/or owners and start making friends!

### Prerequisites

Want your own copy? No Problem! 

Install [node.js](https://nodejs.org/en/)

```
git clone git@github.com:devolve-wtf/PetFriendFinder.git
```

Edit /config/config.json to reflect your info

```javascript
{
    "development": {
      "username": "my_user_name",
      "password": "my_password",
      "database": "my_database_name",
      "host": "my_hosts_ip",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql"
    }
  }
```

### Installing

```
cd PetFriendFinder
npm install
```

## Deployment

```
node server.js
```

## Authors

* **devolve.wtf** - *Initial work* - [devolve-wtf](https://github.com/devolve-wtf)
* **Marwa-Mahmoud** - *Initial work* - [Marwa-Mahmoud](https://github.com/Marwa-Mahmoud)
* **Moogieee** - *Initial work* - [devolve-wtf](https://github.com/Moogieee)
* **Sandro** - *Initial work* - [devolve-wtf](https://github.com/saloiofun)

## Acknowledgments
No pets were harmed during the development of this site