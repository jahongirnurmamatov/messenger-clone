
interface IParams{
    conversationId:string;
}

const ConversationId = async({params}:{params:IParams})=>{

    return (
        <div className="">

            Conversation id
        </div>
    )
}

export default ConversationId;