"use client"

import { useAuth } from "@/lib/auth"
import { canBypassProgression } from "@/lib/roles"

/** True when the signed-in user is staff and progression locks should not apply. */
export function useProgressionBypass(): boolean {
  const { user } = useAuth()
  return canBypassProgression(user?.role)
}
