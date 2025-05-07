
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Phone, Video, Info, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "online",
    lastMessage: "Can we meet tomorrow at the library?",
    timestamp: "12:30 PM",
    unreadCount: 2
  },
  {
    id: "2",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "offline",
    lastMessage: "Thanks for sharing your notes!",
    timestamp: "Yesterday"
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "online",
    lastMessage: "Are you attending the AI workshop?",
    timestamp: "Yesterday",
    unreadCount: 1
  },
  {
    id: "4",
    name: "Jason Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "offline",
    lastMessage: "I've added you to the study group.",
    timestamp: "Monday"
  },
  {
    id: "5",
    name: "Olivia Martinez",
    avatar: "https://i.pravatar.cc/150?img=10",
    status: "online",
    lastMessage: "Let me know when you're free this week.",
    timestamp: "Monday"
  }
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      content: "Hi! I saw that you're in the same Algorithms class as me. Would you be interested in forming a study group for the upcoming exam?",
      senderId: "1",
      timestamp: "10:30 AM"
    },
    {
      id: "m2",
      content: "Hey Sarah! Yes, I'd definitely be interested in that. The exam looks challenging!",
      senderId: "currentUser",
      timestamp: "10:35 AM"
    },
    {
      id: "m3",
      content: "Great! I've already started compiling some notes and practice problems. Would tomorrow at 3 PM work for you to meet in the library?",
      senderId: "1",
      timestamp: "10:40 AM"
    },
    {
      id: "m4",
      content: "Tomorrow at 3 works perfectly. Should I bring anything specific?",
      senderId: "currentUser",
      timestamp: "10:42 AM"
    },
    {
      id: "m5",
      content: "Just your notes and any questions you have. I'll bring my laptop and the textbook.",
      senderId: "1",
      timestamp: "10:45 AM"
    }
  ]
};

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages[mockContacts[0].id] || []);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(contact => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return contact.unreadCount && contact.unreadCount > 0;
    return true;
  });

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages(mockMessages[contact.id] || []);
    
    // Mark messages as read
    setContacts(prev => 
      prev.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;
    
    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      senderId: "currentUser",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto h-[calc(100vh-150px)] px-4 py-6">
          <div className="flex h-full border rounded-lg overflow-hidden">
            {/* Contact List */}
            <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="p-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="overflow-y-auto flex-1">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className={`p-4 hover:bg-muted cursor-pointer ${selectedContact?.id === contact.id ? 'bg-muted' : ''}`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {contact.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{contact.timestamp}</p>
                        {contact.unreadCount && contact.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium mt-1">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Area */}
            {selectedContact ? (
              <div className="hidden md:flex flex-col flex-1">
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedContact.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.status === "online" ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.senderId !== 'currentUser' && (
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-md ${
                            message.senderId === 'currentUser'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <div className={`text-xs text-muted-foreground mt-1 ${
                          message.senderId === 'currentUser' ? 'text-right' : ''
                        }`}>
                          {message.timestamp}
                        </div>
                      </div>
                      {message.senderId === 'currentUser' && (
                        <Avatar className="ml-2 h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-col flex-1 items-center justify-center text-center p-4">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground">Choose someone from your contacts to start chatting</p>
              </div>
            )}
            
            {/* Empty state for mobile */}
            <div className="flex md:hidden flex-1 items-center justify-center text-center p-4">
              <div>
                <h3 className="text-lg font-medium">Your messages</h3>
                <p className="text-muted-foreground">Select a contact to view the conversation on mobile</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
