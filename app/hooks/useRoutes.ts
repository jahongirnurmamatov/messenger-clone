import { useMemo } from "react";
import { usePathname } from "next/navigation";
import useConversation from "./useConversations";
import { HiArrowNarrowLeft, HiChat } from "react-icons/hi";
import { signOut } from "next-auth/react";

const useRoutes = ()=>{
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            active: pathname==='/conversations'||!!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiChat,
            active: pathname==='/users'
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=>signOut(),
            icon:HiArrowNarrowLeft,
        }
    ],[pathname, conversationId]);
    return routes;
}