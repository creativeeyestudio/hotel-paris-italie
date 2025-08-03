import { User } from "@/types/User"

export type AccessConfig = {
  req: {
    user: User | null
  }
}