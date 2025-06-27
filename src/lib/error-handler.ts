import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    // Prismaエラーの処理
    if (error.message.includes('P2002')) {
      return NextResponse.json(
        { error: 'このデータは既に登録されています' },
        { status: 400 }
      );
    }
    
    if (error.message.includes('P2025')) {
      return NextResponse.json(
        { error: '指定されたデータが見つかりません' },
        { status: 404 }
      );
    }
  }

  // 予期しないエラー
  return NextResponse.json(
    { error: 'サーバーエラーが発生しました' },
    { status: 500 }
  );
}