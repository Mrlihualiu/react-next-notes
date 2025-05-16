import { NextResponse } from 'next/server';
import { connectionToDb } from '@/lib/utils';
import { Note } from '@/lib/models';

// 获取所有笔记
export async function GET () {
  try {
    await connectionToDb();
    const notes = await Note.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 创建笔记
export async function POST (request) {
  try {
    await connectionToDb();
    const { title, content } = await request.json();
    const note = await Note.create({ title, content });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
