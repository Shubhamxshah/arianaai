'use client'
import { onToggleRealtime, onGetConversationMode } from "@/actions/conversation"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useChatContext } from "./user-chat-context"

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  const pathname = usePathname()
  const {toast} = useToast() 
  const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {chatRoom} = useChatContext()

  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == 'true' ? false : true
      )


      if (realtime) {
        setRealtime(realtime.chatRoom.live)
        toast({
          title: 'Success',
          description: realtime.message,
        })
      }
    } catch (error){
      console.log(error)
    }
  }

  const onGetCurrentMode = async () => {
    setLoading(true)
    const mode = await onGetConversationMode(chatRoom!)
    if (mode) {
      setRealtime(mode.live)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode()
    }
  }, [chatRoom])

  const page = pathname.split('/').pop()
  const onExpand = () => setExpand((prev) => !prev)

  return {
    expand, 
    onExpand,
    page,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading,
  }
}

export default useSideBar
