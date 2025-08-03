import { UserRole } from "./UserRole"

export type User = {
  id: string
  email: string
  role: UserRole // adapte selon ce que ton roleField contient
}