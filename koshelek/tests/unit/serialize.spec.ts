import {IModel, Serialize} from "@/api/serialize";

describe('Serializer test', () => {
  it('Serialize json (Simple model)', () => {
      class Friend {
          name?: string;

          constructor(name?: string) {
              this.name = name;
          }
      }

      type TUserArg = {
          name?: string;
          friends?: Array<string>;
      }

      class User implements IModel<User> {
          name?: string;
          friends?: Friend[] | undefined;

          constructor({...args}: TUserArg) {
              this.name = args.name;
              this.friends = args.friends?.map(friend => new Friend(friend))
          }

          fromJson({...args}: TUserArg): User {
              return new User({...args});
          }
      }

      const json = `{
        "name": "Ivan",
        "friends": [
            "Sergey",
            "Petr",
            "Vasyl"
        ]
      }`

      const user = new User({
          name: 'Ivan',
          friends: [
              'Sergey',
              'Petr',
              'Vasyl',
          ]
      });

      const model = new Serialize<User, User>({
          schema: new User({}),
          json,
      }).getModel();

      expect(model)
          .toStrictEqual(user);
  });

  it('Serialize json (Complex model)', () => {
      type TUserArgs = {
          name?: string;
          age?: number;
          friends?: Array<TFriendArgs>;
      }

      type TFriendArgs = {
          name?: string;
          age?: number;
          dateAdded?: string;
      }

      class Friend implements IModel<Friend, TFriendArgs> {
          name?: string;
          age?: number;
          dateAdded?: string;

          constructor({...args}: TFriendArgs) {
              this.name = args.name;
              this.age = args.age;
              this.dateAdded = args.dateAdded;
          }

          fromJson({...args}: TFriendArgs): Friend {
              return new Friend({...args});
          }

      }

      class User implements IModel<User, TUserArgs> {
         name?: string;
         age?: number;
         friends?: Array<Friend> | undefined;

         constructor({...args}: TUserArgs) {
             this.name = args.name;
             this.age = args.age;
             this.friends = args.friends?.map(friend => new User({...friend}));
         }

          fromJson({...args}: TUserArgs): User {
              return new User({...args});
          }
     }

     const json = `{
        "name": "Ivan",
        "age": 24,
        "friends": [
            {
                "name": "Sergey",
                "age": 31,
                "dateAdded": "19.09.1997"
            },
            {
                "name": "Peter",
                "age": 18,
                "dateAdded": "19.09.2001"
            }
        ]
     }`;

     const user = new User({
         name: 'Ivan',
         age: 24,
         friends: [
             {
                 name: "Sergey",
                 age: 31,
                 dateAdded: "19.09.1997",
             },
             {
                 name: "Peter",
                 age: 18,
                 dateAdded: "19.09.2001",
             },
         ],
     });

     const model = new Serialize<User, User>({
         schema: new User({}),
         json: json,
     }).getModel();

      expect(model)
          .toStrictEqual(user);
  });
})
