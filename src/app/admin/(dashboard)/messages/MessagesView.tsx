"use client";

import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  artwork_id: string | null;
  is_read: boolean;
  created_at: string;
}

export default function MessagesView({ messages }: { messages: Message[] }) {
  const router = useRouter();

  const toggleRead = async (msg: Message) => {
    const supabase = createClient();
    await supabase
      .from("messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);
    router.refresh();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Message deleted");
      router.refresh();
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 bg-bg-secondary rounded-xl border border-border">
        <Mail size={32} className="mx-auto text-text-secondary/40 mb-3" />
        <p className="text-text-secondary">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-5 rounded-xl border transition-colors ${
            msg.is_read
              ? "bg-bg-secondary border-border"
              : "bg-accent-light/30 border-accent/20"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-text-primary">{msg.name}</span>
                {!msg.is_read && (
                  <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-2">{msg.email}</p>
              <p className="text-sm text-text-primary leading-relaxed">
                {msg.message}
              </p>
              <p className="text-xs text-text-secondary mt-3">
                {new Date(msg.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => toggleRead(msg)}
                className="p-2 text-text-secondary hover:text-accent transition-colors rounded-lg hover:bg-bg-tertiary"
                title={msg.is_read ? "Mark as unread" : "Mark as read"}
              >
                {msg.is_read ? <Mail size={16} /> : <MailOpen size={16} />}
              </button>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="p-2 text-text-secondary hover:text-red-400 transition-colors rounded-lg hover:bg-bg-tertiary"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
