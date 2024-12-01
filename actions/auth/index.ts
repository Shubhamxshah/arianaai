'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { onGetAllAccountDomains } from "../settings"

export const onLoginUser = async () => {
  const session = await auth();
  if (!session?.user) redirect("/auth/signup")
  else{
    try {
        const authenticated = await prisma.user.findUnique({
          where: {
            id: session.user.id
          }, 
          select: {
            name: true,
            id: true,
          }
        })

        if (authenticated){
          const domains = await onGetAllAccountDomains()
          return {status: 200, user: authenticated, domain: domains?.domains}
        }
      } catch {
        return { status: 400}
      }
    }
}