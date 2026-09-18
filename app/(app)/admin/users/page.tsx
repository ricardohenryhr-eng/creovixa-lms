import { getAllProfiles, getCourses, getEnrollmentSummary, getCurrentProfile } from "@/lib/queries"
import { isSuperAdminEmail } from "@/lib/roles"
import { UsersManager } from "@/components/admin/users-manager"

export const dynamic = "force-dynamic"

export default async function UsersPage() {
  const [profiles, courses, summary, me] = await Promise.all([
    getAllProfiles(),
    getCourses(),
    getEnrollmentSummary(),
    getCurrentProfile(),
  ])

  return (
    <UsersManager
      profiles={profiles}
      courses={courses.map((c) => ({ id: c.id, title: c.title, category: c.category }))}
      summary={summary}
      canMakeAdmins={isSuperAdminEmail(me?.email)}
      meEmail={me?.email ?? ""}
    />
  )
}
