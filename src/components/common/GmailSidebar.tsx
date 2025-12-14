import React from 'react';

interface GmailSidebarProps {
  language: 'en' | 'zh';
  activeFolder?: 'inbox' | 'starred' | 'sent' | 'drafts';
}

export function GmailSidebar({ language, activeFolder = 'inbox' }: GmailSidebarProps) {
  const t = language === 'en' ? {
    inbox: 'Inbox',
    starred: 'Starred',
    sent: 'Sent',
    drafts: 'Drafts'
  } : {
    inbox: '收件箱',
    starred: '已加星标',
    sent: '已发送',
    drafts: '草稿'
  };

  const folders = [
    { id: 'inbox', icon: '📥', label: t.inbox },
    { id: 'starred', icon: '⭐', label: t.starred },
    { id: 'sent', icon: '📤', label: t.sent },
    { id: 'drafts', icon: '📝', label: t.drafts },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-2">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`px-4 py-3 rounded-lg font-semibold ${
              activeFolder === folder.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 opacity-50'
            }`}
          >
            {folder.icon} {folder.label}
          </div>
        ))}
      </div>
    </div>
  );
}
