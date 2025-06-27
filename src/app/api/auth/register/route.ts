import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { validateEmail, validatePassword, validateName } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // IPアドレスによるレート制限
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, remainingAttempts } = checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000); // 1時間に3回まで
    
    if (!allowed) {
      return NextResponse.json(
        { error: "登録試行回数の上限に達しました。しばらくしてからお試しください。" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, name, profession } = body;

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードは必須です" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "パスワードは6文字以上128文字以下で入力してください" },
        { status: 400 }
      );
    }

    if (name && !validateName(name)) {
      return NextResponse.json(
        { error: "名前に使用できない文字が含まれています" },
        { status: 400 }
      );
    }

    // 既存ユーザーチェック
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 }
      );
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "",
        profession: profession || "デザイナー"
      },
      select: {
        id: true,
        email: true,
        name: true,
        profession: true
      }
    });

    return NextResponse.json({
      message: "ユーザー登録が完了しました",
      user
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "登録中にエラーが発生しました" },
      { status: 500 }
    );
  }
}