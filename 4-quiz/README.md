# Quiz

Time to test your understanding. Not a competition, so if you don't get it, raise your hand and we'll help you.

> Tell me and I forget. Teach me and I remember. Involve me and I learn.

Benjamin Franklin

## 1. Who's first?

What's the output?

```javascript
const fs = require('fs');

console.log('1');

fs.readFile('test.txt', 'utf8', (error, data) => {
    if (error) {
        throw error;
    }

    console.log('2');
});

console.log('3');
```

## 2. I promise...

Modify the code below to

1. `hello` function must return a promise
1. The promise should resolve 2 seconds **after** invocation of `hello`

```javascript
function hello() {
    return 'hello world';
}

module.exports = hello;
```

## 3. I promise to reject if you...

Modify the code below to

1. Reject with `"NAN"` if `number` is not a number
1. If `number` is **odd**, return a promise that's resolved 1 second later with `"odd"`
1. If `number` is **even**, return a promise that's resolved 2 second later with `"even"`

```javascript
function oddOrEven(number) {
    return /* something */;
}

module.exports = oddOrEven;
```

## 4. Convert them callbacks manually

Modify the code below to

1. create a new function `readFilePromise` to convert `readFile` to return a promise

```javascript
const fs = require('fs');

fs.readFile('test.txt', 'utf8', (error, data) => {
    if (error) {
        throw error;
    }

    console.log(data);
});
```

## 4. Convert them callbacks with promisify

Modify the code below to

1. create a new function `readFilePromise` to convert `readFile` to return a promise using `promisify`

```javascript
const fs = require('fs');

fs.readFile('test.txt', 'utf8', (error, data) => {
    if (error) {
        throw error;
    }

    console.log(data);
});
```

## 5. Amazing race repeat

Find the bug! If you already know from the race don't tell

```javascript
'use strict';

const { StandardError } = require('xen-utilities');
const animalModel = require('./models/animal');

class Animal {
    constructor(mongoConnection) {
        this.mongoConnection = mongoConnection;

        this.models = {
            Animal: this.mongoConnection.model('Animal', animalModel)
        };
        this.errorCodes = {
            ANIMAL_NOT_FOUND_ERROR: 'ANIMAL_NOT_FOUND_ERROR',
            FIND_ONE_ANIMAL_ERROR: 'FIND_ONE_ANIMAL_ERROR'
        };
    }

    async getAnimalById(id) {
        const context = { id };

        try {
            const animal = await this.models.Animal.findById(id);

            if (!animal) {
                throw new StandardError(
                    this.errorCodes.ANIMAL_NOT_FOUND_ERROR,
                    'Animal is not found',
                    null,
                    context
                );
            }

            return animal.toJSON();
        } catch (e) {
            throw new StandardError(
                this.errorCodes.FIND_ONE_ANIMAL_ERROR,
                'Find one animal error',
                e,
                context
            );
        }
    }
}

module.exports = Animal;
```
