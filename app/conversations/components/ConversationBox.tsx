"use client";

import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();

  return <div className="">Conversation Box</div>;
};

export default ConversationBox;
