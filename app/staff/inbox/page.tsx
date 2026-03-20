import { getLocalPayload } from '@/lib/payload';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const payload = await getLocalPayload();
  
  const conversations = await payload.find({
    collection: 'conversations',
    sort: '-createdAt',
    limit: 50,
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Staff Inbox</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
        <ul className="divide-y divide-slate-200">
          {conversations.docs.map((conv: any) => (
            <li key={conv.id}>
              <Link href={'/staff/inbox/' + conv.id} className="block hover:bg-slate-50 p-4 transition">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#0f4d37] truncate">
                    {conv.guestName || 'Anonymous Guest'} {conv.guestContact ? '(' + conv.guestContact + ')' : ''}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full " + 
                      (conv.status === 'PENDING_HUMAN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800')}>
                      {conv.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex text-sm text-slate-500">
                    <p>
                      {conv.summary || 'No summary available.'}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {conversations.docs.length === 0 && (
            <li className="p-4 text-slate-500 text-center">No conversations found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
