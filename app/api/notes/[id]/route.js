import { NextResponse } from 'next/server';
import { connectionToDb } from '@/lib/utils';
import { Note } from '@/lib/models';

// 获取单个笔记
export async function GET (request, { params }) {
  try {
    await connectionToDb();
    const { id } = params;

    // 先尝试通过uuid查找
    let note = await Note.findOne({ uuid: id });

    // 如果没找到，尝试通过_id查找（如果id是有效的ObjectId）
    if (!note && mongoose.Types.ObjectId.isValid(id)) {
      note = await Note.findById(id);
    }

    if (!note) {
      return NextResponse.json({ error: '笔记未找到' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 更新笔记
export async function PUT (request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await request.json();

    // 先尝试通过uuid查找并更新
    let note = await Note.findOneAndUpdate(
      { uuid: id },
      { $set: data },
      { new: true, runValidators: true }
    );

    // 如果没找到，尝试通过_id查找并更新
    if (!note && mongoose.Types.ObjectId.isValid(id)) {
      note = await Note.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
    }

    if (!note) {
      return NextResponse.json({ error: '笔记未找到' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 删除笔记
export async function DELETE (request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // 先尝试通过uuid查找并删除
    let note = await Note.findOneAndDelete({ uuid: id });

    // 如果没找到，尝试通过_id查找并删除
    if (!note && mongoose.Types.ObjectId.isValid(id)) {
      note = await Note.findByIdAndDelete(id);
    }

    if (!note) {
      return NextResponse.json({ error: '笔记未找到' }, { status: 404 });
    }

    return NextResponse.json({ message: '笔记已成功删除' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
