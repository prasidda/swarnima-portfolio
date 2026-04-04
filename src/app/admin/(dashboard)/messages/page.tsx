import { createClient } from "@/lib/supabase/server";
import MessagesView from "./MessagesView";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  artwork_id: string | null;
  is_read: boolean;
  created_at: string;
}

async function getMessages(): Promise<Message[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-text-primary">Messages</h1>
        <p className="text-sm text-text-secondary mt-1">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
          {unread > 0 && ` · ${unread} unread`}
        </p>
      </div>
      <MessagesView messages={messages} />
    </div>
  );
}
