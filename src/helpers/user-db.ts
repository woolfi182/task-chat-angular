export class UserDB {
    private readonly usersDB: Map<string, Set<string>>;

    constructor() {
        this.usersDB = new Map();
    }

    addUser(user: string, id: string): void {
        if (!this.usersDB.has(user)) {
            this.usersDB.set(user, new Set(id));
            return;
        }
        this.usersDB.get(user)!.add(id);
    }

    removeUser(user: string, id: string): void {
        if (this.usersDB.has(user)) {
            this.usersDB.get(user)!.delete(id);
            return;
        }
    }

    getAll(): string[] {
        return [...this.usersDB.keys()];
    }
}