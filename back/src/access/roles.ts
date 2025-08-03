import { UserRole } from '../types/UserRole'
import { roleHierarchy } from '../constants/roles'

export const hasRole = (userRole: UserRole | undefined, requiredRole: UserRole): boolean => {
  if (!userRole || !requiredRole) return false

  const userIndex = roleHierarchy.indexOf(userRole)
  const requiredIndex = roleHierarchy.indexOf(requiredRole)

  if (userIndex === -1 || requiredIndex === -1) return false

  return userIndex >= requiredIndex
}
