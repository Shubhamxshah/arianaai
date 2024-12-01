'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const onGetAllAccountDomains = async () => {
  const session = await auth()
  if (!session?.user) return 
  try {
    const domains = await prisma.user.findUnique({
      where: {
        id : session.user.id,
      }, 
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  }
                }
              }
            }
          }
        }
      }
    })
    return { ...domains}
  } catch (error) {
    console.log(error)
  }
}

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const session = await auth();
  if (!session?.user) return 
  try {
    const subscription = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      }, 
      select: {
        _count: {
          select: {
            domains: true,
          }
        },
        subscription: {
          select: {
            plan: true,
          }
        }
      }
    })

    const domainExists = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        domains: {
          some: {
            name: domain, 
          },
        },
      },
    })

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == 'STANDARD' &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == 'PRO' &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == 'ULTIMATE' &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create : {
                    welcomeMessage: 'Hey there, have a question? Text us here',
                  }
                }
              }
            }
          }
        })

        if (newDomain) {
          return {status: 200, message: 'Domain successfully added'}
        }
      }
      return {
        status: 400,
        message: 'Youve reached maximum number of domains, please upgrade your plan',
      }
    }
    return {
      status: 400,
      message: 'Domain already exists',
    }
  } catch (error) {
    console.log(error)
  }
}
