'use client'

import { FullConversationType } from "@/app/types";

interface ConversationListProps{
    initalItems:FullConversationType[];
}

const ConversationList:React.FC<ConversationListProps> = ({initalItems}) => {

  return <div className="">conversation list</div>;
};

export default ConversationList;
