import { NextRequest, NextResponse } from "next/server";
import { getForumPostById } from "../../../../../models/forum.models";
import {
  getCommentById,
  postComment,
} from "../../../../../models/comments.models";



export async function POST(req: any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const commentReq = await req.json();
    await getForumPostById(id);
    const commId = await postComment(
      id,
      typeof commentReq === "string" ? commentReq : JSON.stringify(commentReq)
    ); //returns comment ID of inserted comment
    const comment = await getCommentById(id, commId); 
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
