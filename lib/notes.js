import { connectionToDb } from './utils';
import { Note } from './models';

// 获取所有笔记
export async function getAllNotes () {
  await connectionToDb();
  const notes = await Note.find({}, { _id: 0 }).lean().sort({ updatedAt: -1 });
  return notes;
}

// 获取单个笔记
export async function getNote (id) {
  await connectionToDb();

  // 先尝试通过uuid查找
  let note = await Note.findOne({ uuid: id }, { _id: 0 }).lean();

  return note;
}

// 创建笔记
export async function addNote (data) {
  await connectionToDb();
  const note = new Note(data);
  await note.save();
  return note;
}

// 更新笔记
export async function updateNote (id, data) {
  await connectionToDb();

  // 先尝试通过uuid查找并更新
  let note = await Note.findOneAndUpdate(
    { uuid: id },
    { $set: data },
    { new: true, runValidators: true }
  );

  return note;
}

// 删除笔记
export async function delNote (id) {
  await connectionToDb();

  // 先尝试通过uuid查找并删除
  let note = await Note.findOneAndDelete({ uuid: id });

  return note;
}
