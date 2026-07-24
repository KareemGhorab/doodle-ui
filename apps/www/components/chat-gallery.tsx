"use client";

import { FileText, Sparkles } from "lucide-react";

import {
    Attachment,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
} from "@/registry/doodle/ui/attachment";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/doodle/ui/avatar";
import {
    Bubble,
    BubbleContent,
    BubbleReactions,
} from "@/registry/doodle/ui/bubble";
import {
    Marker,
    MarkerContent,
    MarkerIcon,
} from "@/registry/doodle/ui/marker";
import {
    Message,
    MessageAvatar,
    MessageContent,
    MessageFooter,
    MessageHeader,
} from "@/registry/doodle/ui/message";
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/registry/doodle/ui/message-scroller";

/**
 * Live gallery demo for the June 2026 shadcn chat primitives,
 * restyled with Doodle UI blob corners and chalky borders.
 */
export function ChatGallery() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h3 className="font-display text-3xl">Chat</h3>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          MessageScroller, Message, Bubble, Attachment, and Marker — the
          conversation layer, wearing wobbly corners.
        </p>
      </div>

      <div className="h-[480px] overflow-hidden border-2 border-border doodle-radius-card bg-card">
        <MessageScrollerProvider>
          <MessageScroller className="h-full">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-6 p-4 md:p-6">
                <MessageScrollerItem>
                  <Marker variant="separator">
                    <MarkerContent>Today</MarkerContent>
                  </Marker>
                </MessageScrollerItem>

                <MessageScrollerItem>
                  <Message>
                    <MessageAvatar>
                      <Avatar size="sm">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@doodle"
                        />
                        <AvatarFallback>DU</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <MessageHeader>Doodle Bot</MessageHeader>
                      <Bubble>
                        <BubbleContent>
                          Hey! Want to see a hand-drawn chat bubble?
                        </BubbleContent>
                      </Bubble>
                      <MessageFooter>just now</MessageFooter>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>

                <MessageScrollerItem>
                  <Message align="end">
                    <MessageContent>
                      <Bubble align="end" variant="secondary">
                        <BubbleContent>
                          Absolutely — squiggles or it didn&apos;t happen.
                        </BubbleContent>
                        <BubbleReactions side="bottom" align="end">
                          <span aria-hidden>✏️</span>
                        </BubbleReactions>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>

                <MessageScrollerItem>
                  <Message>
                    <MessageAvatar>
                      <Avatar size="sm">
                        <AvatarFallback>DU</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <Bubble>
                        <BubbleContent>
                          Here&apos;s a scribble sketch you can attach to any
                          thread.
                        </BubbleContent>
                      </Bubble>
                      <Attachment state="done" className="mt-1">
                        <AttachmentMedia variant="icon">
                          <FileText />
                        </AttachmentMedia>
                        <AttachmentContent>
                          <AttachmentTitle>scribble-notes.pdf</AttachmentTitle>
                          <AttachmentDescription>128 KB</AttachmentDescription>
                        </AttachmentContent>
                      </Attachment>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>

                <MessageScrollerItem>
                  <Marker>
                    <MarkerIcon>
                      <Sparkles />
                    </MarkerIcon>
                    <MarkerContent>Streaming a doodle reply…</MarkerContent>
                  </Marker>
                </MessageScrollerItem>

                <MessageScrollerItem scrollAnchor>
                  <Message>
                    <MessageAvatar>
                      <Avatar size="sm">
                        <AvatarFallback>DU</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <Bubble variant="outline">
                        <BubbleContent>
                          Blob radii on bubbles, chalk outlines on attachments,
                          and Cabin Sketch nearby. Chat, but childish.
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
    </section>
  );
}
