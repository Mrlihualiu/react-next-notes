export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('请配置 MONGODB_URI 环境变量');
}

// 全局缓存连接（Serverless 环境适配）
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectionToDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mo) => {
      console.log('✅ MongoDB 连接成功');
      return mo;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

