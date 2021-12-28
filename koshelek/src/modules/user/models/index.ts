type TUserNameA = {
    title?: string;
    first?: string;
    last?: string;
}

class UserName {
    title?: string;
    first?: string;
    last?: string;

    constructor({...args}: TUserNameA) {
        this.title = args.title;
        this.first = args.first;
        this.last = args.last;
    }
}

type TUserLocationStreetA = {
    number?: number;
    name?: string;
}

class UserLocationStreet  {
    name?: string;
    number?: number;

    constructor({...args}: TUserLocationStreetA) {
        this.name = args.name;
        this.number = args.number;
    }
}

type TUserLocationTimezoneA = {
    offset?: string;
    description?: string;
}

class UserLocationTimezone {
    offset?: string;
    description?: string;

    constructor({...args}: TUserLocationTimezoneA) {
        this.offset = args.offset;
        this.description = args.description;
    }
}

type TUserLocationA = {
    street?: UserLocationStreet;
    city?: string;
    country?: string;
    postcode?: number;
    timezone?: UserLocationTimezone;
}

class UserLocation {
    street?: UserLocationStreet;
    city?: string;
    country?: string;
    postcode?: number;
    timezone?: UserLocationTimezone;

    constructor({...args}: TUserLocationA) {
        this.street = new UserLocationStreet({...args.street});
        this.city = args.city;
        this.country = args.country;
        this.postcode = args.postcode;
        this.timezone = args.timezone;
    }
}

type TUserDobA = {
    date?: string;
    age?: number;
}

class UserDob {
    date?: string;
    age?: number;

    constructor({...args}: TUserDobA) {
        this.date = args.date;
        this.age = args.age;
    }
}

type TUserPictureA = {
    thumbnail?: string;
}

class UserPicture {
    thumbnail?: string;

    constructor({...args}: TUserPictureA) {
        this.thumbnail = args.thumbnail;
    }
}

type TUserA = {
    gender?: string;
    name?: UserName;
    location?: UserLocation;
    email?: string;
    phone?: string;
    dob?: UserDob;
    picture?: UserPicture;
}

export class User {
    gender?: string;
    name?: UserName;
    location?: UserLocation;
    email?: string;
    phone?: string;
    dob?: UserDob;
    picture?: UserPicture;

    constructor({...args}: TUserA) {
        this.gender = args.gender;
        this.name = new UserName({...args.name});
        this.location = new UserLocation({...args.location});
        this.email = args.email;
        this.phone = args.phone;
        this.dob = new UserDob({...args.dob});
        this.picture = new UserPicture({...args.picture});
    }

    public static fromJson =({...args}: TUserA): User => {
        return new User({...args});
    }
}