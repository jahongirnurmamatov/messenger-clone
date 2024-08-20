import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
    children
}: {children:React.ReactNode}){
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                initalItems={[]}
                />
                {children}
            </div>
        </Sidebar>
    )
}