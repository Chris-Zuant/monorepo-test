import { User } from "../types/types"

export const logUser = (user: User): void => {
    console.log(`User: ${user.name} with email ${user.email}, created at ${user.createdAt}`);
}