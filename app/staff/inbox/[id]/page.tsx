import { getLocalPayload } from '@/lib/payload';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const payload = await getLocalPayload();
  
  const conversation = await payload.findByID({
    collection: 'conversations',
    id: unwrappedParams.id,
  });

  if (!conversation) {
    notFound();
  }

  const messagesRef = await payload.find({
    collection: 'messages',
    where: { conversation: { equals: unwrappedParams.id } },
    sort: 'createdAt',
    limit: 100,
  });

  async function handleReply(formData: FormData) {
    'use server';
    const body = formData.get('reply') as string;
    if (!body?.trim()) return;

    const pl = await getLocalPayload();
    await pl.create({
      collection: 'messages',
      data: {
        conversation: unwrappedParams.id,
        senderType: 'staff',
        body,
      }
    });
    
    // Auto-update to HUMAN_ACTIVE
    await pl.update({
      collection: 'conversations',
      id: unwrappedParams.id,
      data: { status: 'HUMAN_ACTIVE' }
    });

    revalidatePath('/staff/inbox/' + unwrappedParams.id);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-4">
        <Link href="/staff/inbox" className="text-[#0f4d37] hover:underline text-sm font-medium">
          &larr; Back to Inbox
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200 flex flex-col h-[700px]">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 p-4 shrink-0">
          <h2 className="text-lg font-bold text-slate-800">
            {conversation.guestName || 'Anonymous Guest'}
          </h2>
          <p className="text-sm text-slate-500">Status: {conversation.status}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messagesRef.docs.map((m: any) => (
            <div key={m.id} className={"flex " + (m.senderType === 'guest' ? 'justify-start' : 'justify-end')}>
              <div className={"max-w-[70%] rounded-lg px-4 py-2 text-sm " + 
                (m.senderType === 'guest' ? 'bg-white shadow border border-slate-200 text-slate-800' :
                 m.senderType === 'staff' ? 'bg-[#0f4d37] text-white' : 'bg-slate-200 text-slate-800')}>
                <div className="text-[10px] uppercase opacity-70 mb-1 font-semibold tracking-wider">
                  {m.senderType === 'guest' ? 'Guest' : m.senderType === 'staff' ? 'Staff' : 'AI Concierge'}
                </div>
                {m.body}
              </div>
            </div>
          ))}
        </div>

        {/* Reply Area */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form action={handleReply} className="flex gap-2">
            <input
              type="text"
              name="reply"
              placeholder="Type staff reply..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0f4d37] focus:ring-1 focus:ring-[#0f4d37]"
              autoComplete="off"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-[#0f4d37] text-white font-medium text-sm rounded-lg hover:bg-[#0c402e] transition"
            >
              Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
