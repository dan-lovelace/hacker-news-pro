import { z } from "zod";

import { IParsable, Listing, listingTypes, TListing } from ".";

export type TComments = {
  kind: string;
  data: TCommentsData;
};

export type TCommentsData = {
  /**
   * Hash to the next item
   */
  after: string | null;

  /**
   * Hash to the previous item
   */
  before: string | null;

  /**
   * List of comments
   */
  children: TCommentsDataChild[] | string;

  /**
   * Number of listing results
   */
  dist: number | null;
};

export type TCommentsDataChild = {
  kind: string;
  data: TCommentsDataChildData;
};

export type TCommentsDataChildData = {
  author?: string;
  body?: string;
  body_html?: string;
  created_utc?: number;
  id?: string;
  permalink?: string;
  replies?: TCommentReplies | string;
  ups?: number;
};

export type TCommentReplies = {
  kind: string;
  data: TCommentsData;
};

const CommentReply: z.ZodType<TCommentsDataChildData> = z.lazy(() =>
  z.object({
    author: z.string().optional(),
    body: z.string().optional(),
    body_html: z.string().optional(),
    created_utc: z.number().optional(),
    id: z.string().optional(),
    permalink: z.string().optional(),
    replies: z.union([CommentReplies, z.string()]),
    ups: z.number().optional(),
  })
);

const CommentReplies: z.ZodType<TCommentReplies | string | undefined> = z.lazy(
  () =>
    z
      .object({
        kind: z.string(),
        data: z.object({
          after: z.string().or(z.null()),
          before: z.string().or(z.null()),
          children: z.array(
            z.object({
              kind: z.string(),
              data: CommentReply,
            })
          ),
          dist: z.number().or(z.null()),
        }),
      })
      .or(z.string())
      .optional()
);

export class Comments implements IParsable<TListing, TComments> {
  parse(json: any): { post: TListing; comments: TComments } {
    if (json.length < 2) {
      throw new Error("Invalid comments json");
    }

    const [postJson, commentsJson] = json;
    const post = new Listing().parse(postJson);
    const shape = z.object({
      kind: z.string(),
      data: z.object({
        after: z.string().or(z.null()),
        before: z.string().or(z.null()),
        children: z.array(
          z.object({
            kind: z.enum(listingTypes),
            data: CommentReply,
          })
        ),
        dist: z.number().or(z.null()),
      }),
    });

    return { post, comments: shape.parse(commentsJson) };
  }
}
