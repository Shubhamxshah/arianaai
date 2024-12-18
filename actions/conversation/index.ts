'use server'

import { prisma } from '@/lib/prisma'
import { pusherServer } from '@/lib/utils'

export const onToggleRealtime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await prisma.chatRoom.update({
      where: {
        id,
      }, 
      data: {
        live: state,
      }, 
      select: {
        id: true,
        live: true, 
      },
    })

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live ? 'Realtime mode enabled' : 'Realtime mode disabled',
        chatRoom
      }
    }    
  } catch (error) {
    console.log(error);
  }
}


export const onGetConversationMode = async (id: string) => {
  try {
    const mode = await prisma.chatRoom.findUnique({
      where: {
        id,
      }, 
      select: {
        live: true,
      },
    })
    console.log(mode)
    return mode 
  } catch (error) {
    console.log(error)
  }
}

export const onGetDomainChatRooms = async (id: string) => {

}
