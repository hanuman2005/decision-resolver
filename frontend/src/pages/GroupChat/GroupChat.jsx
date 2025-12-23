import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Smile, Paperclip, Image, MoreVertical, Users, Search, Phone, Video, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import chatService from '../../services/chatService';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

const GroupChat = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // Load group and messages
  useEffect(() => {
    loadGroupData();
  }, [groupId]);

  // Poll for new messages
  useEffect(() => {
    if (!group) return;

    // Fetch messages immediately
    fetchMessages();

    // Poll for new messages every 10 seconds (reduced frequency to avoid 429 errors)
    pollIntervalRef.current = setInterval(() => {
      fetchMessages();
    }, 10000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [group]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadGroupData = async () => {
    try {
      setLoading(true);
      const res = await groupService.getGroupById(groupId);
      
      if (!res.data.group) {
        toast.error('Group not found');
        navigate('/groups');
        return;
      }

      // Check if user is a member
      const isMember = res.data.group.members.some(
        m => m.userId._id === user.id || m.userId === user.id
      );

      if (!isMember) {
        toast.error('You are not a member of this group');
        navigate('/groups');
        return;
      }

      setGroup(res.data.group);
    } catch (error) {
      toast.error('Failed to load group');
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await chatService.getGroupMessages(groupId, 100, 0);
      // Response interceptor unwraps to { success: true, messages: [], count: n }
      if (res && typeof res === 'object') {
        const messageArray = res.messages || res.data?.messages || [];
        if (Array.isArray(messageArray) && messageArray.length > 0) {
          setMessages(messageArray);
        } else if (Array.isArray(messageArray)) {
          setMessages(messageArray); // Set empty array if valid but empty
        }
      }
    } catch (error) {
      // Silently handle errors during polling
      if (error.response?.status !== 429) {
        console.error('Error fetching messages:', error.message);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    try {
      setSending(true);
      await chatService.sendMessage(groupId, inputMessage);
      setInputMessage('');
      
      // Refresh messages
      await fetchMessages();
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return messageDate.toLocaleDateString();
  };

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙌'];

  if (loading) {
    return <Loading />;
  }

  if (!group) {
    return <div style={{ padding: '2rem', color: '#ffffff' }}>Group not found</div>;
  }

  const currentUser = user;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%)' }}>
      {/* Sidebar - Group Members */}
      <div style={{ 
        width: showMemberList ? '16rem' : '0', 
        background: 'rgba(92, 124, 137, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(176, 212, 221, 0.2)',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(176, 212, 221, 0.2)' }}>
          <h3 style={{ fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users className="w-5 h-5" />
            Group Members ({group.members.length})
          </h3>
        </div>
        <div style={{ padding: '0.5rem' }}>
          {group.members.map((member) => {
            const memberUser = member.userId || member;
            const memberId = memberUser._id || memberUser.id;
            const memberName = memberUser.name || memberUser.userName;
            const memberAvatar = memberUser.avatar || `https://i.pravatar.cc/150?img=${Math.random() * 70 | 0}`;
            
            return (
              <div key={memberId} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                transition: 'background 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={memberAvatar}
                    alt={memberName}
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    border: '2px solid white',
                    background: '#4db8aa'
                  }} />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontWeight: '500', color: '#ffffff', fontSize: '0.875rem' }}>{memberName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#b0d4dd' }}>
                    Online
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <div style={{ 
          background: 'rgba(92, 124, 137, 0.15)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(176, 212, 221, 0.2)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowMemberList(!showMemberList)}
              style={{
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                transition: 'background 0.2s ease',
                color: '#b0d4dd'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Users className="w-5 h-5" />
            </button>
            <div>
              <h2 style={{ fontWeight: 'bold', color: '#ffffff' }}>{group.name}</h2>
              <p style={{ fontSize: '0.875rem', color: '#b0d4dd' }}>
                {group.members.length} members
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Search className="w-5 h-5" />
            </button>
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Phone className="w-5 h-5" />
            </button>
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Video className="w-5 h-5" />
            </button>
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{ 
          flex: '1', 
          overflowY: 'auto', 
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((message) => {
            const isCurrentUser = message.userId === currentUser.id || message.userId._id === currentUser.id;
            
            return (
              <div
                key={message._id || message.id}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                  alignItems: 'flex-end'
                }}
              >
                {!isCurrentUser && (
                  <img
                    src={message.userAvatar || `https://i.pravatar.cc/150?img=${Math.random() * 70 | 0}`}
                    alt={message.userName}
                    style={{ width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
                  />
                )}
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
                  maxWidth: '70%'
                }}>
                  {!isCurrentUser && (
                    <span style={{ fontSize: '0.75rem', color: '#b0d4dd', marginBottom: '0.25rem', paddingX: '0.5rem' }}>
                      {message.userName}
                    </span>
                  )}
                  
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      background: isCurrentUser
                        ? 'linear-gradient(135deg, #4db8aa 0%, #4db8aa 100%)'
                        : 'rgba(92, 124, 137, 0.3)',
                      color: isCurrentUser ? '#ffffff' : '#b0d4dd',
                      backdropFilter: 'blur(10px)',
                      border: isCurrentUser ? 'none' : '1px solid rgba(176, 212, 221, 0.2)'
                    }}
                  >
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>{message.message}</p>
                  </div>
                  
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', paddingX: '0.5rem' }}>
                    {formatTimestamp(message.createdAt)}
                    {isCurrentUser && message.readBy && message.readBy.length > 0 && (
                      <span style={{ marginLeft: '0.25rem' }}>✓✓</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div style={{
            position: 'absolute',
            bottom: '6rem',
            left: '1rem',
            background: 'rgba(92, 124, 137, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            border: '1px solid rgba(176, 212, 221, 0.2)',
            zIndex: 10
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem' }}>
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }}
                  style={{
                    fontSize: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div style={{
          background: 'rgba(92, 124, 137, 0.15)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(176, 212, 221, 0.2)',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                flexShrink: 0,
                color: '#b0d4dd',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Smile className="w-6 h-6" />
            </button>
            
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              flexShrink: 0,
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Paperclip className="w-6 h-6" />
            </button>
            
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              flexShrink: 0,
              color: '#b0d4dd',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 124, 137, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Image className="w-6 h-6" />
            </button>
            
            <div style={{ flex: '1', position: 'relative' }}>
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid rgba(176, 212, 221, 0.2)',
                  background: 'rgba(1, 20, 37, 0.5)',
                  borderRadius: '0.75rem',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  maxHeight: '120px',
                  fontFamily: 'inherit'
                }}
                rows="1"
                onFocus={(e) => e.target.style.borderColor = 'rgba(77, 184, 170, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(176, 212, 221, 0.2)'}
                disabled={sending}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || sending}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                border: 'none',
                cursor: inputMessage.trim() === '' || sending ? 'not-allowed' : 'pointer',
                background: inputMessage.trim() === '' || sending
                  ? 'rgba(92, 124, 137, 0.3)'
                  : 'linear-gradient(135deg, #4db8aa 0%, #4db8aa 100%)',
                color: inputMessage.trim() === '' || sending ? '#94a3b8' : '#ffffff'
              }}
              onMouseEnter={(e) => {
                if (inputMessage.trim() !== '' && !sending) {
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(77, 184, 170, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default GroupChat;
