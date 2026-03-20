import { NextRequest, NextResponse } from 'next/server';
import { generateText, streamText } from 'ai';
import { getPrimaryModel } from '@/lib/ai/model-config';
import { getLocalPayload } from '@/lib/payload';
import { getConciergeSystemPrompt } from '@/lib/ai/concierge-system-prompt';
import { hotelFaqs } from '@/data/hotel-faqs';
import { escalationRules } from '@/lib/ai/escalation-rules';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId, guestName, guestContact } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const payload = await getLocalPayload();
    let currentConversationId = conversationId;

    // 1. Create or load Conversation
    if (!currentConversationId) {
      const newConv = await payload.create({
        collection: 'conversations',
        data: {
          status: 'AI_ACTIVE',
          guestName: guestName || '',
          guestContact: guestContact || '',
          unreadForStaff: false,
        },
      });
      currentConversationId = newConv.id;
    }

    // 2. Save incoming guest message
    await payload.create({
      collection: 'messages',
      data: {
        conversation: currentConversationId,
        senderType: 'guest',
        body: message,
      },
    });

    // 3. Check for obvious escalation triggers
    const isEscalation = escalationRules.triggers.some((trigger: string) => 
      message.toLowerCase().includes(trigger.toLowerCase())
    );

    // Provide context to the AI
    const systemPrompt = `
      ${getConciergeSystemPrompt()}
      
      FAQs to help you answer:
      ${hotelFaqs.map((faq: any) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}
      
      ${isEscalation ? "The user's query triggers an escalation. Politely acknowledge their request and tell them the staff will reach out. Do not attempt to confirm availability." : ""}
    `;

    // 4. Generate AI response (using standard generateText for simpler synchronous demo, 
    // though streamText is better for UI, we return JSON here to simplify widget integration 
    // since the widget is an existing simple component).
    
    // Fetch previous messages for context
    const pastMessagesDocs = await payload.find({
      collection: 'messages',
      where: {
        conversation: {
          equals: currentConversationId,
        },
      },
      sort: 'createdAt',
      limit: 20,
    });

    const aiMessagesContext = pastMessagesDocs.docs.map((doc: any) => ({
      role: doc.senderType === 'guest' ? 'user' : 'assistant',
      content: doc.body,
    })) as Array<{ role: 'user'|'assistant', content: string }>;

    // We make sure the current message is the last one if it isn't already there
    // Actually we just use aiMessagesContext directly as it includes the mesage we just inserted.

    const { text } = await generateText({
      model: getPrimaryModel(),
      system: systemPrompt,
      messages: aiMessagesContext,
    });

    // 5. Save AI response
    await payload.create({
      collection: 'messages',
      data: {
        conversation: currentConversationId,
        senderType: 'ai',
        body: text,
      },
    });

    // 6. Update conversation state if escalated
    if (isEscalation) {
      await payload.update({
        collection: 'conversations',
        id: currentConversationId,
        data: {
          status: 'PENDING_HUMAN',
          unreadForStaff: true,
          summary: 'User requested an escalation topic: ' + message.substring(0, 50),
        },
      });
    }

    return NextResponse.json({
      reply: text,
      conversationId: currentConversationId,
      isEscalated: isEscalation,
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
